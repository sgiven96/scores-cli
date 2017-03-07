const program = require('commander');
const btoa = require('btoa');
var League = require('./nba');

function printScores(games) {
  for (var i = 0; i < games.length; i++) {
    console.log(games[i].awayTeam + ' @ ' + games[i].homeTeam);
    if(games[i].isUnplayed) {
      console.log(games[i].time);
    }
    else {
      console.log(games[i].awayScore + ' - ' + games[i].homeScore);
    }
    if(games[i].isInProgress) {
      console.log('In Progress');
    }
    else if(!games[i].isUnplayed){
      console.log('Final');
    }
  }
}

program
  .version('1.0.0')
  .description('Get sports scores from your favorite teams and leagues')
  .option('-l, --league <required>','Scores for a specific league')
  .option('-t, --team <required>..<required>','Score for a specific team')
  .option('-d, --date <required>','Scores for a specific date')
  .parse(process.argv);

if (program.league) {
  League = require('./' + program.league);
}

var league = new League(btoa('bdevore:password'));
league.getScores(program.team, program.date, printScores);