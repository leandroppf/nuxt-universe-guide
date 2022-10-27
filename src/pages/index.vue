<template>
  <section class="section">
    <b-field label="Nome">
      <b-input
        v-model="search"
        icon="magnify"
        class="mb-6"
        lazy
        @input="filterLocations"
      />
    </b-field>

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
        :loading="loadingLocations"
      >
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </LocationCard>
    </div>

    <b-pagination
      v-model="page"
      :total="responseInfo.count"
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
    locations: UniverseLocation[]
    loadingLocations: boolean
    responseInfo: ResponseInfo
    page: number
    search: string
  } {
    return {
      locations: [],
      loadingLocations: true,
      responseInfo: {} as ResponseInfo,
      page: 1,
      search: '',
    }
  },

  beforeMount() {
    this.fetchLocations()
  },

  methods: {
    async fetchLocations(page?: number, search?: string) {
      try {
        this.loadingLocations = true
        const params = {} as any
        if (page) params.page = page
        if (search) params.search = search

        const response: UniverseLocationResponse = await this.$store.dispatch(
          'locations/loadLocations',
          params
        )
        this.locations = response.results
        this.responseInfo = response.info
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
  },
})
</script>
