#!/usr/bin/env node

import {Command, program} from 'commander';
import chalk from 'chalk';
import {parse} from 'csv-parse/sync';
import path from 'node:path';
import fs from 'node:fs';

program
  .name(`${chalk.green.bold('tsx') } ${ chalk.blue('cli.ts')}`)
  .usage(chalk.cyanBright('[options]'))
  .option('--version', chalk.blueBright('выводит информацию о версии приложения'))
  .option('--import', chalk.blueBright('выводит список предложений об аренде'))
  .helpOption('-h, --help', chalk.blueBright('выводит это сообщение'));

program.parse();


main(program);

async function main(args: Command) {
  const options = args.opts();

  if (process.argv.length <= 2) {
    args.help();
  }
  if (options.version) {
    console.log(JSON.parse(fs.readFileSync('package.json', 'utf8')).version);
  }
  if (options.import) {
    const jsonObj = parse(
      fs.readFileSync(path.join('src', 'mocks', 'offers.tsv'), 'utf8'),
      {delimiter: '\t',});

    console.log(jsonObj);
  }
}

