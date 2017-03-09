# scores-cli
Get sports scores from your favorite teams and leagues!

##Installation

To install `scores` command line program, run:

```bash
npm install scores-cli -g
```
Additionally, you need to make an account at mysportsfeeds.com (don't worry, it's free!), and input your login info for mysportsfeeds when the cli prompts you. The cli uses [keytar](https://github.com/atom/node-keytar) to save your password, so you should only be prompted once.

## Usage
```bash
$ scores --help

Usage: scores [options]
    
Get sports scores from your favorite teams and leagues

Options:

  -h, --help                          output usage information
  -v, --version                       output the version number
  -l, --league <league abbreviation>  Scores for a specific league
  -t, --team <team name>              Score for a specific team
  -d, --date <date as YYY-MM-DD>      Scores for a specific date
```

## Try It!

If you'd like to try it out before installing, you can check it out [here](https://scores-cli.herokuapp.com/)!
