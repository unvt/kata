import { Feature } from 'geojson'

export interface KataFeature {
  source: string;
  minzoom?: number;
  maxzoom?: number;
  properties?: {
    [key: string]: string | number
  }
}

export interface KataYAML {
  [key: string]: KataFeature
}

export interface TippecanoeFeature extends Feature {
  tippecanoe: {
    layer?: string
    minzoom?: number
    maxzoom?: number
  }
}
