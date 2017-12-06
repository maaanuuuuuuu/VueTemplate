<template>
  <div>
    <el-row>
      <el-col :sm="24">
        <vue-draggable v-model="questionnaire" :options="{handle: '.draggableHandle'}">
          <question v-for="(question, index) in questionnaire" :question.sync="question" :key="question.id" :id="'question-'+index" v-on:questionDelete="deleteQuestion"></question>
        </vue-draggable>
        <question :question.sync="emptyQuestion" v-on:questionFocus="newQuestionFocus" :isDisabled="true"></question>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col } from 'element-ui'
  import draggable from 'vuedraggable'
  
  import Question from './checklist-question.vue'

  const emptyQuestiontemplate = { id: 0, code: '', title: '', answerType: 'stringAnswer' }

  export default {
    data () {
      return {
        emptyQuestion: {
          ...emptyQuestiontemplate // clone object
        },
        questionnaire: [
          { id: 1, code: 'name', title: 'What\'s your name?', answerType: 'stringAnswer', isMandatory: true },
          { id: 2, code: 'hairColor', title: 'What\'s your hair color?', answerType: 'stringAnswer', isMandatory: false }
        ]
      }
    },
    components: {
      'question': Question,
      'el-row': Row,
      'el-col': Col,
      'vue-draggable': draggable
    },
    methods: {
      questionChanged () {
        console.log('question changed')
      },
      newQuestionFocus (question) {
        this.questionnaire.push(question) // a new question is being created
        this.emptyQuestion = {
          ...emptyQuestiontemplate // clone object
        }
        this.$nextTick().then(function (component) { // ot getElements in the Dom to put the focus on the newly created question we have to wait until the Dom has been updated
          // focus on last element from questionnaire
          document.getElementById('question-' + (component.questionnaire.length - 1)).getElementsByClassName('codeInputField')[0].getElementsByTagName('input')[0].focus()
        })
      },
      deleteQuestion (question) {
        this.questionnaire.splice(this.questionnaire.indexOf(question), 1)
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
