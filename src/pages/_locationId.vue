<template>
  <section class="section">
    <b-button
      class="mb-3"
      type="is-light"
      icon-left="chevron-left"
      @click="goBack"
    >
      Voltar
    </b-button>
    <div v-if="loadingLocation" class="mb-6">
      <b-skeleton width="40%" :active="loadingLocation"></b-skeleton>
      <b-skeleton width="20%" :active="loadingLocation"></b-skeleton>
      <b-skeleton width="20%" :active="loadingLocation"></b-skeleton>
    </div>
    <div v-else class="mb-6">
      <h2 class="title is-5 mb-0">
        {{ location.name }} - {{ location.dimension }}
      </h2>
      <span>{{ location.type }}</span>
      <br />
      <span class="is-size-7"
        >População: {{ location?.residents?.length }}</span
      >
    </div>

    <div v-if="loadingLocation" class="columns is-multiline">
      <div
        v-for="(item, index) in Array.from(Array(20).keys())"
        :key="index"
        class="column is-one-quarter"
      >
        <b-skeleton
          size="is-large"
          :active="loadingLocation"
          height="18rem"
        ></b-skeleton>
      </div>
    </div>
    <div v-else class="columns is-multiline">
      <ResidentCard
        v-for="resident in residents"
        :key="resident.id"
        class="column is-one-quarter"
        :resident="resident"
        @click="handleClickLocation(location.id)"
      >
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </ResidentCard>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import ResidentCard from '~/components/ResidentCard.vue'

export default Vue.extend({
  name: 'Location',
  components: {
    ResidentCard,
  },

  data(): {
    locationId: string | null
    loadingLocation: boolean
    location: UniverseLocation
    residents: Resident[]
  } {
    return {
      locationId: null,
      loadingLocation: true,
      location: {} as UniverseLocation,
      residents: [],
    }
  },

  beforeMount() {
    const { locationId } = this.$route.params
    this.locationId = locationId
    this.fetchLocationById(locationId)
  },

  methods: {
    goBack() {
      this.$router.push('/')
    },

    async fetchLocationById(id: string | number) {
      try {
        this.loadingLocation = true

        const response: UniverseLocation = await this.$store.dispatch(
          'locations/loadLocationById',
          { id }
        )
        this.location = response
        await this.fetchResidents()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        this.loadingLocation = false
      }
    },

    async fetchResidents() {
      try {
        let residentsRequest = []
        let requestsMounted = 0

        for (const residentUrl of this.location?.residents) {
          residentsRequest.push(this.$axios.$get(residentUrl))
          requestsMounted++

          if (requestsMounted % 20 === 0) {
            const responses: Resident[] = await Promise.all(residentsRequest)
            residentsRequest = []
            this.residents.push(...responses)
          }
        }

        if (residentsRequest.length) {
          const responses: Resident[] = await Promise.all(residentsRequest)
          this.residents.push(...responses)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  },
})
</script>
