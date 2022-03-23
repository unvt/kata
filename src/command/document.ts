import path from 'path'
import fs from 'fs'

import metadata from '../lib/metadata'
import { getMaxZoom, getMinZoom } from '../lib/lib'
import Table from 'cli-table'

const document = (source: string, destination?: string) => {
  let sourcePath = path.resolve(process.cwd(), source)

  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (!fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  const layers = metadata(sourcePath)

  const maxzoom = getMaxZoom(layers)
  const minzoom = getMinZoom(layers)

  const zoomRange = Array.from(
    { length: maxzoom - minzoom + 1 },
    (_, i) => `${minzoom + i}`,
  )

  const head = ['layer', 'properties', ...zoomRange]
  const rows = []

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    const zoomLevels = []
    for (let i = minzoom; i <= maxzoom; i++) {
      if (layer.minzoom >= minzoom && layer.maxzoom <= maxzoom) {
        zoomLevels.push('*')
      }
    }
    rows.push([
      layers[i].id,
      Object.keys(layers[i].fields).join(', '),
      ...zoomLevels,
    ])
  }

  if (destination) {
    let table = `<table><tr><th>${head.join('</th><th>')}</th></tr>`
    for (let i = 0; i < rows.length; i++) {
      table = table + `<tr><td>${rows[i].join('</td><td>')}</td></tr>`
    }
    table = table + '</table>'

    return table
  } else {
    const table = new Table({
      head: head,
      style: { head: [] },
      colAligns: ['left', 'left', 'middle'],
    })

    table.push(...rows)

    return table.toString()
  }
}

export default document
