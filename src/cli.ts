#!/usr/bin/env node

import { Command } from 'commander'
import document from './command/document'
import filter from './command/filter'

const documentCommand = new Command()
  .name('document')
  .arguments('<source> [destination]')
  .description('output the metadata from the <source>')
  .action((source: string, destination: string) => {
    const table = document(source, destination)
    console.log(table.toString())
  })

const filterCommand = new Command()
  .name('document')
  .arguments('<source> [destination]')
  .description('output the metadata from the <source>')
  .action((source: string, destination: string) => {
    const res = filter(source, destination)
    console.log(res)
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
