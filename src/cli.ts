#!/usr/bin/env node

import {Command} from 'commander';
import chalk from 'chalk';
import {parse} from 'csv-parse/sync';
import {stringify} from 'csv-stringify/sync';
import path from 'node:path';
import fs from 'node:fs';
import {City, Facilities, Offer, OfferType} from "./types/types.js";
import {
  generateRandomBool,
  generateRandomIntegerInRange,
  generateRandomString,
  getRandomElementFromEnum
} from "./basicTypesRandomGenerator.js";

const program = new Command();

program
  .name(chalk.blue('npx tsx cli.ts'))
  .usage(chalk.cyanBright('[options]'))
  .option('--version', chalk.blueBright('выводит информацию о версии приложения'))
  .option('--import', chalk.blueBright('выводит список предложений об аренде'))
  .option('--generate <args...>', chalk.blueBright('генерирует n случайных предложений об аренде и записывает их в файл filepath'));

program.parse(process.argv);

main(program);

async function main(args: Command) {
  const options = args.opts();

  if (options.version) {
    console.log(JSON.parse(fs.readFileSync('package.json', 'utf8')).version);
  }
  if (options.import) {
    importHandler();
  }

  if (options.generate) {
    await generateHandler(...(options.generate as [string, string, string]));
  }
}

function importHandler() {
  const tsvParsed = parse(
    fs.readFileSync(path.join('src', 'mocks', 'generated_offers.tsv'), 'utf8'),
    {delimiter: '\t'}) as string[][];

  let offerFieldNames = Object.keys(generateRandomOffer());
  for (let i = 1; i < tsvParsed.length; ++i) {
    let offerValues = tsvParsed[i].map(v => JSON.parse(v));
    let offerKeyValuePairs = offerFieldNames.map((n, i) => ([n, offerValues[i]]));
    let offer = Object.fromEntries(offerKeyValuePairs);
    offer.publicationDate = new Date(offer.publicationDate);
    console.log(offer);
  }
}

async function generateHandler(n: string, filepath: string, url: string) {
  let nInt = parseInt(n);

  const writeStream = fs.createWriteStream(filepath, 'utf8');
  writeStream.on('finish', () => console.log('Запись завершена'));
  writeStream.on('error', (err) => console.log('Ошибка при записи: ' + err));

  writeStream.write(stringify([Object.keys(generateRandomOffer())], {delimiter: '\t'}));
  for (let i = 0; i < nInt; ++i) {
    let offer = generateRandomOffer();
    if (!writeStream.write(stringify([Object.values(offer).map(v => JSON.stringify(v))], {delimiter: '\t'}))) {
      await new Promise(res => writeStream.once('drain', res));
    }
  }

  writeStream.end();
}


function generateRandomOffer(): Offer {
  return {
    name: generateRandomString(5),
    description: generateRandomString(10),
    publicationDate: new Date(+new Date() + generateRandomIntegerInRange(-50000, 50000)),
    city: getRandomElementFromEnum(City),
    preview: generateRandomString(10),
    photos: [generateRandomString(10), generateRandomString(10)],
    isPremium: generateRandomBool(),
    isFavorite: generateRandomBool(),
    rating: generateRandomIntegerInRange(1, 5),
    type: getRandomElementFromEnum(OfferType),
    roomCount: generateRandomIntegerInRange(1, 5),
    guestCount: generateRandomIntegerInRange(1, 10),
    cost: generateRandomIntegerInRange(10000, 500000),
    facilities: [getRandomElementFromEnum(Facilities), getRandomElementFromEnum(Facilities)],
    author: generateRandomString(10),
    commentsCount: generateRandomIntegerInRange(1, 100),
    coordinates: {longitude: Math.random() * 60, latitude: Math.random() * 60}
  };
}


