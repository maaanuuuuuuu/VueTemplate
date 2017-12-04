<template>
  <el-menu class="el-menu" mode="horizontal" @select="handleSelect" :router="true">
    <el-menu-item v-for="(section, title) in sections" :index="section.id" :key="section.id" >
      {{ section.title }}
    </el-menu-item>
  </el-menu>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Menu, MenuItem } from 'element-ui'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    data () {
      return {
        sections: [
          {id: 'home', title: 'Home', href: '/'},
          {id: 'layouts', title: 'Layouts', href: '/layouts'},
          {id: 'components', title: 'Components', href: '/components'},
          {id: 'sandbox', title: 'Sandbox', href: '/sandbox'},
          {id: 'notfound', title: 'Not found', href: '/notfound'}
        ]
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    components: {
      'el-menu': Menu,
      'el-menu-item': MenuItem
    }
  }
</script>
