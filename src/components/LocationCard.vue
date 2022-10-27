<template>
  <div class="column">
    <div class="card card_container has-background-grey">
      <header class="card-header">
        <p class="card-header-title has-text-white has-text-weight-bold">
          {{ location.name }}
        </p>
      </header>
      <div
        class="card-content card_body has-background-grey is-flex is-flex-direction-column is-justify-content-space-between"
      >
        <div class="is-flex is-flex-direction-column">
          <span class="is-size-6 has-text-grey-lighter has-text-weight-bold">
            Location type
          </span>
          <span class="is-size-6 has-text-black-ter has-text-weight-bold">
            {{ location.type }}
          </span>
          <span class="is-size-6 has-text-grey-lighter has-text-weight-bold">
            Location dimension
          </span>
          <span class="is-size-6 has-text-black-ter has-text-weight-bold">
            {{ location.dimension }}
          </span>
        </div>
        <span class="is-size-6 has-text-grey-lighter has-text-weight-bold">
          Residents: {{ location.residents.length }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LocationCard',
  props: {
    location: {
      type: Object as () => UniverseLocation,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.card_container {
  .card_body {
    height: 14rem;
  }
}
</style>
