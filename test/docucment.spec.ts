import { assert } from 'chai'
import path from 'path'
import metadata from '../src/lib/metadata'

describe('parse the metadata.', () => {

  it('should get the metadatas.', async () => {
    const layers = metadata(path.join(__dirname, './data/metadata.json'))

    assert.deepEqual(1, layers.length)
  })

  it('should get the metadatas from mbtiles.', async () => {
    const layers = metadata(path.join(__dirname, './data/pref.mbtiles'))

    assert.deepEqual(1, layers.length)
  })

  it('should get the id from a layer.', async () => {
    const layers = metadata(path.join(__dirname, './data/metadata.json'))

    assert.deepEqual('japanese-admins', layers[0].id)
  })
})
