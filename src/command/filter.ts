import fs from 'fs'
import YAML from 'js-yaml'
import path from 'path'
import fetch from 'node-fetch'
import { KataYAML, TippecanoeFeature } from '../lib/interfaces'

const filter = async (source: string) => {
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

    let geojson

    if (src.match(/^https?:\/\//)) {
      const res = await fetch(src)
      geojson = await res.json()
    } else {
      let srcPath = path.resolve(basedir, src)
      if (src.match(/^\//)) {
        srcPath = src
      }

      geojson = JSON.parse(fs.readFileSync(srcPath, 'utf8'))
    }

    geojson.features.forEach((feature: TippecanoeFeature) => {
      feature.tippecanoe = {}
      feature.tippecanoe.layer = key
    })

    if (typeof features.minzoom !== 'undefined' && features.minzoom >= 0) {
      geojson.features.forEach((feature: TippecanoeFeature) => {
        feature.tippecanoe.minzoom = features.minzoom
      })
    }

    if (typeof features.maxzoom !== 'undefined' && features.maxzoom >= 0) {
      geojson.features.forEach((feature: TippecanoeFeature) => {
        feature.tippecanoe.maxzoom = features.maxzoom
      })
    }

    for (const prop in features.properties) {
      for (let i = 0; i < geojson.features.length; i++) {
        const property = `geojson.features[i].${features.properties[prop]}`
        geojson.features[i].properties[prop] = eval(property)
      }
    }

    geojsons.push(geojson)
  }

  return geojsons
}

export default filter
