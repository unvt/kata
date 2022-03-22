#!/usr/bin/env node

import path, { dirname } from 'path'
import fs from 'fs'

import { Command } from 'commander'
import document from './command/document'
import filter from './command/filter'

const documentCommand = new Command()
  .name('document')
  .arguments('<source> [destination]')
  .description('output the metadata from the <source>')
  .action((source: string, destination: string) => {

    let destinationPath

    if (destination) {
      destinationPath = path.resolve(process.cwd(), destination)

      if (destination.match(/^\//)) {
        destinationPath = destination
      }

      if (!fs.existsSync(dirname(destinationPath))) {
        throw `${destinationPath}: No such file or directory`
      }
    }

    const table = document(source, destination)

    if (destinationPath) {
      fs.writeFileSync(destinationPath, table)
    } else {
      console.log(table)
    }
  })

const filterCommand = new Command()
  .name('filter')
  .arguments('<source>')
  .description('output the ndjson from the <source>')
  .action(async (source: string) => {
    const geojsons = await filter(source)
    for (let i = 0; i < geojsons.length; i++) {
      console.log(JSON.stringify(geojsons[i]))
    }
  })


const program = new Command()
const version = require('../package.json').version

try {
  program
    .version(version, '-v, --version', 'output the version number')
    .addCommand(documentCommand)
    .addCommand(filterCommand)

  program.parse(process.argv)
} catch(e) {
  console.error(e)
  process.exit(1)
}
