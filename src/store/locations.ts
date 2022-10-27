import { $axios } from '~/utils/api'

interface LoadLocationsParams {
  name?: string
  type?: string
  dimension?: string
}

const locationPath = '/api/location'

export const state = () => ({})

export const actions = {
  async loadLocations(
    _store: any,
    params: LoadLocationsParams
  ): Promise<UniverseLocationResponse> {
    console.log('caiu')
    const queryParams = []

    if (params?.name) queryParams.push(`name=${params?.name}`)
    if (params?.type) queryParams.push(`type=${params?.type}`)
    if (params?.dimension) queryParams.push(`dimension=${params?.dimension}`)

    const url = `${locationPath}${
      queryParams.length ? `?${queryParams.join('&')}` : ''
    }`

    const response: UniverseLocationResponse = await $axios.$get(url)

    return response
  },
}
