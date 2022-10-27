<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand is-align-items-center">
        <a class="navbar-item" href="/">
          <img src="~assets/rickAndMorty.png" alt="Rick and Morty" />
        </a>

        <h1 class="title is-5 mb-0">Rick and Morty Universe Guide</h1>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UniverseGuide',
}
</script>
