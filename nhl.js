const moment = require('moment');
const request = require('request');
const league = require('./league');

class nhl extends league {
  constructor() {
    super();
  }

  getScores(team, date, callback) {
    let url = 'https://www.mysportsfeeds.com/api/feed/pull/nhl/2016-2017-regular/scoreboard.json?fordate=';
    if (date)
      url = url.concat(moment(date).format('YYYYMMDD'));
    else
      url = url.concat(moment().format('YYYYMMDD'));
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

module.exports = nhl;