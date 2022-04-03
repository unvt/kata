import { Feature } from 'GeoJSON'

export interface KataFeture {
  source: string;
  minzoom?: number;
  maxzoom?: number;
  properties?: {
    [key: string]: any
  }
}

export interface KataYAML {
  [key: string]: KataFeture
}

export interface TippecanoeFeature extends Feature {
  tippecanoe: {
    layer?: string
    minzoom?: number
    maxzoom?: number
  }
}
