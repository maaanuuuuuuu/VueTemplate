<template>
  <div>
    <el-row>
      <el-col :sm="24">
        <vue-draggable
          v-model="questionnaire"
          :options="{handle: '.draggableHandle', group: 'questions', ghostClass: 'sortGhost'}"
          class="questionsContainer">
          <question v-for="(question, index) in questionnaire" :question="question" :key="question.id" :id="'question-'+index" v-on:questionDelete="deleteQuestion" class="question"></question>
        </vue-draggable>
        <question :question="emptyQuestion" v-on:questionFocus="newQuestionFocus" :isDisabled="true" class="emptyQuestionContainer"></question>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .emptyQuestionContainer {
    margin-top: 15px
  }
  .questionsContainer .question {
    margin-top: 10px;
  }
  .sortGhost {
    background-color: rgba(0, 0, 255, 0.2);
  }
</style>

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
          {
            id: 1,
            displayed: true,
            code: 'SSI-1',
            title: 'Project / Site Name',
            answerType: 'stringAnswer',
            isMandatory: true,
            tags: [
              'site',
              'project'
            ]
          },
          {
            id: 2,
            displayed: true,
            code: 'SSI-2',
            title: 'Supervisor / Foreman at the time of this inspection',
            answerType: 'stringAnswer',
            isMandatory: false,
            tags: [
              'owner',
              'overseer'
            ]
          },
          {
            id: 11,
            displayed: true,
            code: 'SSI-11',
            title: 'Number of workers',
            answerType: 'numberAnswer',
            isMandatory: false,
            tags: [
              'End',
              'Deadline'
            ]
          },
          {
            id: 3,
            displayed: true,
            code: 'SSI-3',
            title: 'Select site weather conditions at time of this inspection (select all that apply)',
            answerType: 'multipleChoiceAnswer',
            isMandatory: true,
            possibleAnswers: [
              {
                title: 'Clear Sky',
                code: 'SSI-3-1'
              },
              {
                title: 'Cloudy',
                code: 'SSI-3-2'
              },
              {
                title: 'Raining',
                code: 'SSI-3-3'
              },
              {
                title: 'Windy',
                code: 'SSI-3-4'
              },
              {
                title: 'Hazy',
                code: 'SSI-3-5'
              },
              {
                title: 'Snow/Hail',
                code: 'SSI-3-6'
              },
              {
                title: 'OTHER',
                code: 'SSI-3-7'
              }
            ],
            conditionalQuestions: [
              {
                id: 10,
                displayed: false,
                code: 'SSI-10',
                title: 'Upload a photo (if appropriate)',
                answerType: 'fileAnswer',
                isMandatory: true,
                answerConditions: ['SSI-3-7']
              }
            ]
          },
          {
            id: 4,
            displayed: true,
            code: 'SSI-4',
            title: 'Minimum temperature today?',
            answerType: 'stringAnswer',
            isMandatory: false,
            tags: [
              'degrees',
              'rise',
              'ambient'
            ]
          },
          {
            id: 5,
            displayed: true,
            code: 'SSI-5',
            title: 'Maximum temperature today?',
            answerType: 'stringAnswer',
            isMandatory: false,
            tags: [
              'rise',
              'degrees',
              'high',
              'ambient'
            ]
          },
          {
            id: 6,
            displayed: true,
            code: 'SSI-6',
            title: 'Current activities being undertaken on site (select all that apply)',
            answerType: 'multipleChoiceAnswer',
            isMandatory: true,
            tags: [
              'mission',
              'labour',
              'work',
              'project',
              'facility'
            ],
            possibleAnswers: [
              {
                title: 'General',
                code: 'SSI-6-1'
              },
              {
                title: 'Abatement',
                code: 'SSI-6-2'
              },
              {
                title: 'Demolition',
                code: 'SSI-6-3'
              },
              {
                title: 'Pile Driving',
                code: 'SSI-6-4'
              },
              {
                title: 'Formwork',
                code: 'SSI-6-5'
              },
              {
                title: 'Reinforce Steel',
                code: 'SSI-6-6'
              },
              {
                title: 'Steel Erection',
                code: 'SSI-6-7'
              },
              {
                title: 'Mechanical',
                code: 'SSI-6-8'
              },
              {
                title: 'Electrical',
                code: 'SSI-6-9'
              },
              {
                title: 'Plumbing',
                code: 'SSI-6-10'
              },
              {
                title: 'Glazing',
                code: 'SSI-6-11'
              },
              {
                title: 'Roofing',
                code: 'SSI-6-12'
              },
              {
                title: 'Drywall',
                code: 'SSI-6-13'
              },
              {
                title: 'Painting',
                code: 'SSI-6-14'
              },
              {
                title: 'Sitework',
                code: 'SSI-6-15'
              },
              {
                title: 'Excavation',
                code: 'SSI-6-16'
              },
              {
                title: 'Underground Work',
                code: 'SSI-6-17'
              },
              {
                title: 'Stair Installation',
                code: 'SSI-6-18'
              },
              {
                title: 'Cleanup',
                code: 'SSI-6-19'
              },
              {
                title: 'OTHER',
                code: 'SSI-6-20'
              }
            ]
          },
          {
            id: 7,
            displayed: true,
            code: 'SSI-7',
            title: 'Are first aid facilities to be inspected in this audit? ',
            answerType: 'choiceAnswer',
            isMandatory: true,
            tags: [
              'support',
              'help',
              'assistance'
            ],
            possibleAnswers: [
              {
                title: 'Yes',
                code: 'SSI-7-1'
              },
              {
                title: 'No',
                code: 'SSI-7-2'
              },
              {
                title: 'N/A',
                code: 'SSI-7-3'
              }
            ]
          },
          {
            id: 8,
            displayed: true,
            code: 'SSI-8',
            title: 'Any further comments or recommendations arising from this inspection? ',
            answerType: 'textAreaAnswer',
            isMandatory: false,
            tags: [
              'discussion',
              'feedback',
              'requests'
            ]
          },
          {
            id: 9,
            displayed: true,
            code: 'SSI-9',
            title: 'Date completed',
            answerType: 'dateAnswer',
            isMandatory: true,
            tags: [
              'End',
              'Deadline'
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
          component.$el.querySelector('#question-' + (component.questionnaire.length - 1) + ' .titleInputField input').focus()
        })
      },
      deleteQuestion (question) {
        this.questionnaire.splice(this.questionnaire.indexOf(question), 1)
      }
    }
    // watch: { // c'est plus propre d'enlever les answerConditions d'une question à la racine, mais je suis a peu près sur que ça sert à rien
    //   questionnaire (newValue, oldValue) {
    //     // a new question has arrived in the questionnaire, it's either new or it comes from a conditional question container of an existing question
    //     if (newValue.length > oldValue.length) { // question dragged into conditionalquestions
    //       let questionBeingMoved = newValue.filter(v => !oldValue.includes(v)) // array diff
    //       let index = newValue.indexOf(questionBeingMoved[0])
    //       this.questionnaire[index].answerConditions = []
    //     }
    //   }
    // }
  }
</script>
