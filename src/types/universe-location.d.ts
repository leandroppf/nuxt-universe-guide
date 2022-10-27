interface UniverseLocation {
  id: number
  name: string
  type: string
  dimention: string
  residents: string[]
  url: string
  created: string
}

interface UniverseLocationResponse {
  info: ResponseInfo
  results: UniverseLocation[]
}
