<template>
    <div>
        <h3>These components are eather created by the team or unmodified ElementUI components</h3>
        <el-row :gutter="20">
            <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <login></login>
            </el-col>
            <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Card name</span>
                    <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
                  </div>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{'List item ' + o }}
                  </div>
                </el-card>
            </el-col>
            <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Login from './login.vue'
    import { Row, Col, Card } from 'element-ui'

    export default {
      computed: {
        ...mapGetters(['isAuthenticated'])
      },
      components: {
        'el-row': Row,
        'el-col': Col,
        'el-card': Card,
        'login': Login,
        'card': Card
      }
    }
</script>

<style scoped>
    
</style>