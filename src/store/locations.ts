import { $axios } from '~/utils/api'

interface LoadLocationsParams {
  search?: string
  page?: number
}

interface LoadLocationByIdParams {
  id: number | string
}

interface LocationState {
  page: number
  search: string
  universeLocationResponse: UniverseLocationResponse
}

const locationPath = '/api/location'

export const state = (): LocationState => ({
  page: 1,
  search: '',
  universeLocationResponse: {} as UniverseLocationResponse,
})

export const actions = {
  async loadLocationsCached(
    store: any,
    params: LoadLocationsParams
  ): Promise<void> {
    if (Object.keys(store.state.universeLocationResponse).length) return
    await store.dispatch('loadLocations', params)
  },

  async loadLocations(store: any, params: LoadLocationsParams): Promise<void> {
    const queryParams = []

    if (params?.page) queryParams.push(`page=${params?.page}`)
    if (params?.search) {
      queryParams.push([`name=${params?.search}`].join('&'))
    }

    const url = `${locationPath}${
      queryParams.length ? `?${queryParams.join('&')}` : ''
    }`

    const response: UniverseLocationResponse = await $axios.$get(url)

    store.commit('setUniverseLocationResponse', { response })
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

export const mutations = {
  setPage(state: LocationState, { page }: { page: number }) {
    state.page = page
  },

  setSearch(state: LocationState, { search }: { search: string }) {
    state.search = search
  },

  setUniverseLocationResponse(
    state: LocationState,
    { response }: { response: UniverseLocationResponse }
  ) {
    state.universeLocationResponse = response
  },
}
