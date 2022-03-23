import fs from 'fs'

import sqlite from 'better-sqlite3'

const metadata = (file: string) => {
  let layers

  try {
    const metadata = JSON.parse(fs.readFileSync(file, 'utf-8'))
    layers = JSON.parse(metadata.json)
  } catch(e) {
    const db = new sqlite(file)
    const metadata = db.prepare("SELECT value FROM metadata where name='json'").all();
    layers = JSON.parse(metadata[0].value)
  }

  return layers.vector_layers
}

export default metadata
