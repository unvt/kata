import { assert } from 'chai'
import path from 'path'
import filter from '../src/command/filter'

describe('test the filter command.', () => {

  it('should get the metadatas.', async () => {
    const geojsons = filter(path.join(__dirname, './data/kata.yml'))

    assert.deepEqual('this is a point', geojsons[0].features[0].properties.name)
    assert.deepEqual('this is a polygon', geojsons[0].features[1].properties.name)
    assert.deepEqual('hello world', geojsons[1].features[0].properties.title)

    assert.deepEqual(8, geojsons[0].tippecanoe.minzoom)
    assert.deepEqual(14, geojsons[0].tippecanoe.maxzoom)

    assert.deepEqual(2, geojsons[1].tippecanoe.minzoom)
    assert.deepEqual(10, geojsons[1].tippecanoe.maxzoom)
  })
})
