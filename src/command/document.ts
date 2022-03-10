import { Command } from 'commander'

const program = new Command()

program
  .name('document')
  .arguments('<source> [destination]')
  .description('output the metadata from the <source>')
  .action((source: string, destination: string) => {
    console.log(source)
    console.log(destination)
  })

export default program
