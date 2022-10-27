import { $axios } from '~/utils/api'

interface LoadLocationsParams {
  search?: string
  page?: number
}

interface LoadLocationByIdParams {
  id: number | string
}

const locationPath = '/api/location'

export const state = () => ({})

export const actions = {
  async loadLocations(
    _store: any,
    params: LoadLocationsParams
  ): Promise<UniverseLocationResponse> {
    const queryParams = []

    if (params?.page) queryParams.push(`page=${params?.page}`)
    if (params?.search) {
      queryParams.push([`name=${params?.search}`].join('&'))
    }

    const url = `${locationPath}${
      queryParams.length ? `?${queryParams.join('&')}` : ''
    }`

    const response: UniverseLocationResponse = await $axios.$get(url)

    return response
  },

  async loadLocationById(
    _store: any,
    params: LoadLocationByIdParams
  ): Promise<UniverseLocation> {
    const url = [locationPath, params?.id].join('/')

    const response: UniverseLocation = await $axios.$get(url)

    return response
  },
}
