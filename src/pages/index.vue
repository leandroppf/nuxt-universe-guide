<template>
  <section class="section">
    <b-field label="Nome">
      <b-input v-model="search" icon="magnify" lazy @input="filterLocations" />
    </b-field>

    <div v-if="loadingLocations" class="mb-6">
      <b-skeleton width="20%" :active="loadingLocations" />
    </div>
    <div v-else class="mb-6">
      <span class="is-size-7">
        Regiões conhecidas: {{ responseInfo?.count }}
      </span>
    </div>

    <div v-if="loadingLocations" class="columns is-multiline">
      <div
        v-for="(item, index) in Array.from(Array(20).keys())"
        :key="index"
        class="column is-one-quarter"
      >
        <b-skeleton
          size="is-large"
          :active="loadingLocations"
          height="18rem"
        ></b-skeleton>
      </div>
    </div>
    <div v-else class="columns is-multiline">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        class="column is-one-quarter"
        :location="location"
        @click="handleClickLocation(location.id)"
      >
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </LocationCard>
    </div>

    <b-pagination
      v-model="page"
      :total="responseInfo?.count"
      :per-page="20"
      :range-after="3"
      :range-before="3"
      order="is-centered"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @change="handleLocationChangePage"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import LocationCard from '~/components/LocationCard.vue'

export default Vue.extend({
  name: 'Locations',
  components: {
    LocationCard,
  },

  data(): {
    loadingLocations: boolean
  } {
    return {
      loadingLocations: true,
    }
  },

  computed: {
    locations() {
      return this.$store.state.locations.universeLocationResponse?.results
    },

    responseInfo() {
      return this.$store.state.locations.universeLocationResponse?.info
    },

    page: {
      get() {
        return this.$store.state.locations.page
      },
      set(newPage) {
        this.$store.commit('locations/setPage', { page: newPage })
      },
    },

    search: {
      get() {
        return this.$store.state.locations.search
      },
      set(newSearch) {
        this.$store.commit('locations/setSearch', { search: newSearch })
      },
    },
  },

  beforeMount() {
    this.fetchLocations(this.page, this.search, true)
  },

  methods: {
    async fetchLocations(page?: number, search?: string, cache?: boolean) {
      try {
        this.loadingLocations = true
        const params = {} as any
        if (page) params.page = page
        if (search) params.search = search

        const loadFunction = cache ? 'loadLocationsCached' : 'loadLocations'
        await this.$store.dispatch(`locations/${loadFunction}`, params)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        this.loadingLocations = false
      }
    },

    async handleLocationChangePage(page: number) {
      this.page = page
      await this.fetchLocations(page, this.search)
    },

    async filterLocations(search: string) {
      this.page = 1
      this.search = search
      await this.fetchLocations(this.page, search)
    },

    handleClickLocation(locationId: number) {
      this.$router.push(`/${locationId}`)
    },
  },
})
</script>
