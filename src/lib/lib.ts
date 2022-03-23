// eslint-disable-next-line
export const getMinZoom = (layers: any[]) => {
  const map = layers.map((layer) => {
    return layer.minzoom
  })

  return Math.min(...map)
}

// eslint-disable-next-line
export const getMaxZoom = (layers: any[]) => {
  const map = layers.map((layer) => {
    return layer.maxzoom
  })

  return Math.max(...map)
}
