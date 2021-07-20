const axios = require('axios').default;
const chalk = require('chalk');
const commander = require('commander');

const program = new commander.Command();
program.option('-c, --country <value>', 'Country', "");
program.parse();
var cliOptions = program.opts();

function CliUsage() {
  console.log("Usage:");
  console.log("corona -c/--country <name>");
}

if ( cliOptions.country != '' ) {
  var options = {
    method: 'get',
    url: 'https://disease.sh/v3/covid-19/countries/' + cliOptions.country,
  };

  axios.request(options).then(function (response) {
      console.log(chalk.green('cases: ') + chalk.yellow(response.data.cases));
      console.log(chalk.green("today's cases: ") + chalk.yellow(response.data.todayCases));
      console.log(chalk.green('deaths: ') + chalk.yellow(response.data.deaths));
      console.log(chalk.green("today's deaths: ") + chalk.yellow(response.data.todayDeaths));
      console.log(chalk.green('Recovered: ') + chalk.yellow(response.data.recovered));
      console.log(chalk.green("Today's recovers: ") + chalk.yellow(response.data.todayRecovered));
      console.log(chalk.green('Active: ') + chalk.yellow(response.data.active));
      console.log(chalk.green('Critical: ') + chalk.yellow(response.data.critical));
  }).catch(function (error) {
      console.error(chalk.red('Error: ' + error.response.data.message));
  });
} else {
  CliUsage();
  process.exit(1);
}