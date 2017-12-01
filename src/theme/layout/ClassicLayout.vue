<template>
  <div id="app">
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <section class="main-section section">
          <div class="container content">
            <router-view></router-view>
          </div>
        </section>
      </el-main>
      <el-footer>
        <app-footer></app-footer>
      </el-footer>
    </el-container>
  </div>
</template>
<style lang="css">
  @import '~element-ui/lib/theme-chalk/index.css';
</style>
<script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
  import { Container, Header, Main, Footer } from 'element-ui'

  export default {
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter,
      'el-container': Container,
      'el-header': Header,
      'el-main': Main,
      'el-footer': Footer
    }
  }
</script>
