<template>
  <section class="section">
    <div class="columns is-multiline">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        class="column is-one-quarter"
        :location="location"
      >
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </LocationCard>
    </div>

    <b-pagination />
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
  } {
    return {
      locations: [],
      loadingLocations: true,
      responseInfo: {} as ResponseInfo,
    }
  },

  beforeMount() {
    this.fetchLocations()
  },

  methods: {
    async fetchLocations() {
      try {
        const response: UniverseLocationResponse = await this.$store.dispatch(
          'locations/loadLocations'
        )
        this.locations = response.results
        this.responseInfo = response.info
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingLocations = false
      }
    },
  },
})
</script>
