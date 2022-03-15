import path, { dirname } from 'path'
import fs from 'fs'

import metadata from '../lib/metadata'
import { getMaxZoom, getMinZoom } from '../lib/lib'
import Table from 'cli-table'


const document = (source: string, destination: string) => {
  let sourcePath = path.resolve(process.cwd(), source)
  let destinationPath = path.resolve(process.cwd(), destination)

  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (destination.match(/^\//)) {
    destinationPath = destination
  }

  if (!fs.existsSync(sourcePath) || !fs.existsSync(dirname(destinationPath))) {
    throw `${sourcePath}: No such file or directory`
  }

  const layers = metadata(sourcePath)

  const maxzoom = getMaxZoom(layers)
  const minzoom = getMinZoom(layers)

  const zoomRange = Array.from({ length: (maxzoom - minzoom + 1) }, (_, i) => `${minzoom + i}`)

  const table = new Table({
    head: ['layer', 'properties', ...zoomRange],
    style: { head: [] },
    colAligns: ['left', 'left', 'middle']
  })

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    const zoomLevels = []
    for (let i = minzoom; i <= maxzoom; i++) {
      if (layer.minzoom >= minzoom && layer.maxzoom <= maxzoom) {
        zoomLevels.push('*')
      }
    }
    table.push([layers[i].id, Object.keys(layers[i].fields).join(', '), ...zoomLevels])
  }

  return table.toString()
}

export default document
