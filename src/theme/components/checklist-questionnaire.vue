<template>
  <div>
    <el-row>
      <el-col :sm="24">
        <question v-for="question in questionnaire" :question.sync="question" :key="question.id"></question>
        <question :question.sync="emptyQuestion"></question>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col } from 'element-ui'
  import Question from './checklist-question.vue'

  export default {
    data () {
      return {
        emptyQuestion: { id: 0, code: '', title: '', answerType: 'stringAnswer' },
        questionnaire: [
          { id: 1, code: 'name', title: 'What\'s your name?', answerType: 'stringAnswer' },
          { id: 2, code: 'hairColor', title: 'What\'s your hair color?', answerType: 'stringAnswer' }
        ]
      }
    },
    components: {
      'question': Question,
      'el-row': Row,
      'el-col': Col
    },
    methods: {
      questionChanged () {
        console.log('question changed')
      }
    },
    watch: {
      // emptyQuestion: {
      //   handler: function (newValue, oldValue) {
      //     console.log('handler')
      //     this.questionnaire.push(newValue)
      //   },
      //   deep: true
      // }
    }
  }
</script>

<style scoped>
    
</style>
