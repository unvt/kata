import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
import filter from '../src/command/filter'
import { KataYAML, TippecanoeFeature } from '../src/lib/interfaces'

describe('test the filter command.', () => {
  it('should get the metadatas.', async () => {
    const geojsons = await filter(path.join(__dirname, './data/kata.yml'))

    assert.deepEqual('this is a point', geojsons[0].features[0].properties.name)
    assert.deepEqual(
      'this is a polygon',
      geojsons[0].features[1].properties.name,
    )
    assert.deepEqual('hello world', geojsons[1].features[0].properties.title)
    assert.deepEqual(
      'This is a geojson on the gist.github.com',
      geojsons[2].features[0].properties.title,
    )

    assert.deepEqual(8, geojsons[0].features[0].tippecanoe.minzoom)
    assert.deepEqual(14, geojsons[0].features[0].tippecanoe.maxzoom)

    assert.deepEqual(2, geojsons[1].features[0].tippecanoe.minzoom)
    assert.deepEqual(10, geojsons[1].features[0].tippecanoe.maxzoom)
  })

  it('should have correct layer name as expected.', async () => {
    const geojsons = await filter(path.join(__dirname, './data/kata.yml'))

    const keys = Object.keys(
      YAML.load(
        fs.readFileSync(path.join(__dirname, './data/kata.yml'), 'utf8'),
      ) as KataYAML,
    )

    for (let i = 0; i < geojsons.length; i++) {
      for (let j = 0; j < geojsons[i].features.length; j++) {
        const feature: TippecanoeFeature = geojsons[i].features[j]
        assert.deepEqual(keys[i], feature.tippecanoe.layer)
      }
    }
  })
})
