import { assert } from 'chai'
import { getMinZoom, getMaxZoom } from '../src/lib/lib'

const layers = [
  {
    id: 'first-layer',
    description: '',
    minzoom: 8,
    maxzoom: 12,
    fields: {
      city: 'String',
      prefecture: 'String',
    },
  },
  {
    id: 'second-layer',
    description: '',
    minzoom: 3,
    maxzoom: 14,
    fields: {
      city: 'String',
      prefecture: 'String',
    },
  },
]

describe('test the `lib.ts`.', () => {
  it('should get the minzoom from layers', () => {
    assert.deepEqual(3, getMinZoom(layers))
  })

  it('should get the maxzoom from layers', () => {
    assert.deepEqual(14, getMaxZoom(layers))
  })
})
