import { Feature } from 'GeoJSON'

export interface KataYAML {
  // eslint-disable-next-line
  [key: string]: any
}

export interface TippecanoeFeature extends Feature {
  tippecanoe: {
    layer?: string,
    minzoom?: number,
    maxzoom?: number,
  };
}
