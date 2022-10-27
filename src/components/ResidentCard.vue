<template>
  <div class="column">
    <div class="card card_container has-background-grey">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="resident.image" :alt="resident.name" />
        </figure>
      </div>
      <div class="card-content card_body">
        <p class="title is-5 has-text-white has-text-weight-bold">
          {{ resident.name }}
        </p>
        <p class="has-text-white">
          <b-icon
            icon="circle"
            size="is-small"
            :type="resident.status === 'Alive' ? 'is-success' : 'is-danger'"
          />
          {{ resident.status }} - {{ resident.species }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ResidentCard',
  props: {
    resident: {
      type: Object as () => Resident,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.card_container {
  transition: all 200ms;

  &:hover {
    margin-top: -0.5rem;
  }

  .card_body {
    height: 10rem;
  }
}
</style>
