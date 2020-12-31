#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");

const newYearsCard = require("../lib/index");

const cli = meow(
  `
  ${chalk.blueBright("Usage")}
    $ newYearsCard <options>

  ${chalk.blueBright("Options")}
    -n , --name <your name>     Include your name

  ${chalk.blueBright("Examples")}
    $ newYearsCard
    $ newYearsCard -n John
`,
  {
    flags: {
      name: {
        type: "string",
        alias: "n",
      },
      // secret option
      random: {
        type: "boolean",
        alias: "r",
      },
    },
  }
);
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/

newYearsCard(cli.input[0], cli.flags);
