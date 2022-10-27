<template>
  <section class="section">
    <span>Location {{ locationId }}</span>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Location',

  data(): {
    locationId: string | null
  } {
    return {
      locationId: null,
    }
  },

  beforeMount() {
    const { locationId } = this.$route.params
    this.locationId = locationId
  },

  methods: {},
})
</script>
