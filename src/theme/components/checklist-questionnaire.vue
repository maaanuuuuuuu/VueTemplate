<template>
  <div>
    <el-row>
      <el-col :sm="24">
        <vue-draggable v-model="questionnaire" :options="{handle: '.draggableHandle'}">
          <question v-for="(question, index) in questionnaire" :question="question" :key="question.id" :id="'question-'+index" v-on:questionDelete="deleteQuestion"></question>
        </vue-draggable>
        <question :question="emptyQuestion" v-on:questionFocus="newQuestionFocus" :isDisabled="true"></question>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Row, Col } from 'element-ui'
  import draggable from 'vuedraggable'
  
  import Question from './checklist-question.vue'

  const emptyQuestionTemplate = { id: 0, code: '', title: '', answerType: 'stringAnswer', displayed: true }

  export default {
    data () {
      return {
        emptyQuestion: {
          ...emptyQuestionTemplate // clone object
        },
        questionnaire: [
          { id: 1, displayed: true, code: 'name', title: 'What\'s your name?', answerType: 'stringAnswer', isMandatory: true },
          { id: 2, displayed: true, code: 'hairColor', title: 'What\'s your hair color?', answerType: 'stringAnswer', isMandatory: false },
          { id: 3,
            code: 'ethicalLabourStandards',
            displayed: true,
            title: 'Do you have a policy defining your approach to labour standards and ethical trading?',
            answerType: 'choiceAnswer',
            isMandatory: true,
            possibleAnswers: [
              {
                title: 'yes we do',
                code: 'yes',
                isConditionalQuestionsDisplayChecked: false
              },
              {
                title: 'no we don\'t',
                code: 'no',
                isConditionalQuestionsDisplayChecked: false
              }
            ],
            conditionalQuestions: [
              {
                id: 4,
                displayed: false,
                code: 'policyDescription',
                title: 'What kind of policy ?',
                answerType: 'stringAnswer',
                isMandatory: true,
                answerConditions: ['yes']
              },
              {
                id: 5,
                code: 'policyExcuse',
                displayed: false,
                title: 'Why is that ?',
                answerType: 'stringAnswer',
                isMandatory: true,
                answerConditions: ['no']
              },
              {
                id: 6,
                code: 'policyWorkshop',
                displayed: false,
                title: 'Do you want to attend a workshop on labour standards and ethical trading?',
                answerType: 'choiceAnswer',
                isMandatory: false,
                possibleAnswers: [
                  {
                    title: 'hell yeah',
                    code: 'yes',
                    isConditionalQuestionsDisplayChecked: false
                  },
                  {
                    title: 'no thanks',
                    code: 'no',
                    isConditionalQuestionsDisplayChecked: false
                  }
                ],
                conditionalQuestions: [
                  {
                    id: 7,
                    displayed: false,
                    code: 'policyWorkshopEmail',
                    title: 'What\'s your email adress?',
                    answerType: 'stringAnswer',
                    isMandatory: true,
                    answerConditions: ['yes']
                  }],
                answerConditions: ['yes', 'no'] // yes or no as the parent is a single choice answer
              }
            ]
          }
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
          ...emptyQuestionTemplate // clone object
        }
        this.$nextTick().then(function (component) { // ot getElements in the Dom to put the focus on the newly created question we have to wait until the Dom has been updated
          // focus on last element from questionnaire
          component.$el.querySelector('#question-' + (component.questionnaire.length - 1) + ' .codeInputField input').focus()
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
