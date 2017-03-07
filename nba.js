const request = require('request');
const moment = require('moment');

class nba {

  constructor(key) {
    this.key = key;
  }

  scanForTeam(team, data) {
    let match = false;
    team = team.toLowerCase();
    match |= (team == data.Name.toLowerCase());
    match |= (team == data.City.toLowerCase());
    match |= (team == data.Abbreviation.toLowerCase());
    return match;
  }

  getGames(body, team) {
    let games = [];
    let scoreboard = JSON.parse(body).scoreboard.gameScore;
    for (var i = 0; i < scoreboard.length; i++) {
      let g = scoreboard[i];
      if (team) {
        if (!this.scanForTeam(team, g.game.awayTeam) && !this.scanForTeam(team, g.game.homeTeam)) {
          continue;
        }
      }
      let game = {
        awayTeam: g.game.awayTeam.Name,
        homeTeam: g.game.homeTeam.Name,
        homeScore: g.homeScore,
        awayScore: g.awayScore,
        isUnplayed: g.isUnplayed == 'true' ? true : false,
        inProgress: g.isInProgress == 'true' ? true : false,
        time: g.game.time
      };
      games.push(game)
    }
    return games;
  }

  getScores(team, date, callback) {
    let url = 'https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/scoreboard.json?fordate=';
    if (date)
      url = url.concat(moment(date).format('YYYYMMDD'));
    else
      url = url.concat(moment().format('YYYYMMDD'));
    console.log(url);
    let options = {
      url: url,
      headers: {
        "Authorization": "Basic " + this.key
      }
    }
    request(options, (error, response, body) => {
      if (!error) {
        let games = this.getGames(body, team);
        callback(games);
      }
    });
  }
}

module.exports = nba;