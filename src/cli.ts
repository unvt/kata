#!/usr/bin/env node

import { Command } from 'commander'
import document from './command/document'
import filter from './command/filter'

const program = new Command()
const version = require('../package.json').version

program
  .version(version, '-v, --version', 'output the version number')
  .addCommand(document)
  .addCommand(filter)

program.parse(process.argv)
