<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <router-link to="/" exact>
            <img src="http://bit.ly/vue-img"
              alt="Vue SPA" />
          </router-link>
          <router-link to="/" class="navbar-item">
            Home
          </router-link>
          <router-link to="{ name: 'routeExample', params: { id: 'section1'} }" class="navbar-item">
            Section1
          </router-link>
          <router-link :to="{ name: 'routeExample', params: { id: 'section2'} }" class="navbar-item">
            Section2
          </router-link>
          <router-link to="/logout" class="navbar-item">
            Logout
          </router-link>
        </div>
    </nav>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>