<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <router-link to="/news/all" exact>
            <img src="http://bit.ly/vue-img"
              alt="Vue SPA" />
          </router-link>
          <router-link to="/news/all" class="navbar-item">
              Home
          </router-link>
          <router-link to="/news/economy" class="navbar-item">
              Economy
          </router-link>
          <router-link :to="{ name: 'news', params: { id: 'politics'} }" class="navbar-item">
              Politics
          </router-link>
          <router-link to="/login" class="navbar-item">
              <span v-if="isAuthenticated">Logout</span><span v-else>Login</span>
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