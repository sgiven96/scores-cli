const readlineSync = require('readline-sync');
const btoa = require('btoa');
const keytar = require('keytar');

class league {

  constructor() {
    let key = keytar.getPassword('scores-cli', 'MySportsFeeds');
    if (!key) {
      let username = readlineSync.question('MySportsFeeds Username: ');
      let password = readlineSync.question('MySportsFeeds Password: ', {
        hideEchoBack: true
      });
      key = btoa(`${username}:${password}`);
      keytar.addPassword('scores-cli', 'MySportsFeeds', key);
    }
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
}

module.exports = league;