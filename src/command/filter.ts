import fs from 'fs'
import YAML from 'js-yaml'
import path from 'path'

interface KataYAML {
  [key: string]: any;
}

const filter = (source: string) => {
  let sourcePath = path.resolve(process.cwd(), source)

  if (source.match(/^\//)) {
    sourcePath = source
  }

  const basedir = path.dirname(sourcePath)

  const json = YAML.load(fs.readFileSync(sourcePath, 'utf8')) as KataYAML

  const geojsons = []

  for (const key in json) {
    const features = json[key]
    const src = features.source

    let srcPath = path.resolve(basedir, src)
    if (src.match(/^\//)) {
      srcPath = src
    }

    const geojson = JSON.parse(fs.readFileSync(srcPath, 'utf8'))
    geojson.tippecanoe = {}

    if (String(features.minzoom).length && features.minzoom >= 0) {
      geojson.tippecanoe.minzoom = features.minzoom
    }

    if (String(features.maxzoom).length && features.maxzoom >= 0) {
      geojson.tippecanoe.maxzoom = features.maxzoom
    }

    for (const prop in features.properties) {
      for (let i = 0;  i < geojson.features.length; i++) {
        const property = `geojson.features[i].${features.properties[prop]}`
        geojson.features[i].properties[prop] = eval(property)
      }
    }

    geojsons.push(geojson)
  }

  return geojsons
}

export default filter
