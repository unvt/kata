# @unvt/kata
A vector tile design information processing tool

![social preview image](https://repository-images.githubusercontent.com/444034465/7ae06a50-1966-4332-ba12-1ed457e12b63)

## About the social preview image
The [social preview image](https://repository-images.githubusercontent.com/444034465/7ae06a50-1966-4332-ba12-1ed457e12b63) is [Writing Box with Cranes, Pines, Plum Blossoms, and Characters](https://www.metmuseum.org/art/collection/search/44917).

## Features

* Retrieve metadata from `metadata.json` and display layer information on standard output.
* Generate ndjson from a YAML configuration file and pass it to `tippecanoe` as an option.

Example of the YAML config for `kata filter` command.

```
features1:
  source: ./test1.geojson
  properties:
    name: properties["name:ja"]
  minzoom: 8
  maxzoom: 14
features2:
  source: https://gist.githubusercontent.com/miya0001/56c3dc174f5cdf1d9565cbca0fbd3c48/raw/c13330036d28ef547a8a87cb6df3fa12de19ddb6/test.geojson
  properties:
    title: properties.label
  minzoom: 2
  maxzoom: 10
```

## Install

```
$ npm install -g @unvt/kata
```

## How to use

```
$ kata help
Usage: kata [options] [command]

Options:
  -v, --version                    output the version number
  -h, --help                       display help for command

Commands:
  document <source> [destination]  output the metadata from the <source>
  filter <source>                  output the ndjson from the <source>
  help [command]                   display help for command
```

## Development

```
$ git clone https://github.com/unvt/kata
$ cd kata
$ npm install
$ npm run build
```

Then run:

```
$ npm run command help
```

Or

```
$ npm install -g .
$ kata help
```

## License

MIT
