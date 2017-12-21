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
        <question :question="emptyQuestion" v-on:questionInput="newQuestionInput" :isDisabled="true" class="emptyQuestionContainer"></question>
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
            id: 12,
            displayed: true,
            code: 'SSI-12',
            title: 'Example of a lot of conditional questions',
            answerType: 'choiceAnswer',
            isMandatory: false,
            possibleAnswers: [
              {
                title: 'Choice with conditional questions',
                code: 'SSI-12-1',
                mandatoryObservation: false
              },
              {
                title: 'The other choice',
                code: 'SSI-12-2',
                mandatoryObservation: false
              }
            ],
            conditionalQuestions: [
              {
                id: 13,
                displayed: false,
                code: 'SSI-13',
                title: 'Again a choice with conditional questions',
                answerType: 'choiceAnswer',
                isMandatory: false,
                answerConditions: ['SSI-12-1']
              },
              {
                id: 14,
                displayed: false,
                code: 'SSI-14',
                title: 'The other question',
                answerType: 'choiceAnswer',
                isMandatory: false,
                answerConditions: ['SSI-12-2']
              }
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
                code: 'SSI-3-1',
                mandatoryObservation: false
              },
              {
                title: 'Cloudy',
                code: 'SSI-3-2',
                mandatoryObservation: false
              },
              {
                title: 'Raining',
                code: 'SSI-3-3',
                mandatoryObservation: false
              },
              {
                title: 'Windy',
                code: 'SSI-3-4',
                mandatoryObservation: false
              },
              {
                title: 'Hazy',
                code: 'SSI-3-5',
                mandatoryObservation: false
              },
              {
                title: 'Snow/Hail',
                code: 'SSI-3-6',
                mandatoryObservation: false
              },
              {
                title: 'OTHER',
                code: 'SSI-3-7',
                mandatoryObservation: true
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
                code: 'SSI-6-1',
                mandatoryObservation: false
              },
              {
                title: 'Abatement',
                code: 'SSI-6-2',
                mandatoryObservation: false
              },
              {
                title: 'Demolition',
                code: 'SSI-6-3',
                mandatoryObservation: false
              },
              {
                title: 'Pile Driving',
                code: 'SSI-6-4',
                mandatoryObservation: false
              },
              {
                title: 'Formwork',
                code: 'SSI-6-5',
                mandatoryObservation: false
              },
              {
                title: 'Reinforce Steel',
                code: 'SSI-6-6',
                mandatoryObservation: false
              },
              {
                title: 'Steel Erection',
                code: 'SSI-6-7',
                mandatoryObservation: false
              },
              {
                title: 'Mechanical',
                code: 'SSI-6-8',
                mandatoryObservation: false
              },
              {
                title: 'Electrical',
                code: 'SSI-6-9',
                mandatoryObservation: false
              },
              {
                title: 'Plumbing',
                code: 'SSI-6-10',
                mandatoryObservation: false
              },
              {
                title: 'Glazing',
                code: 'SSI-6-11',
                mandatoryObservation: false
              },
              {
                title: 'Roofing',
                code: 'SSI-6-12',
                mandatoryObservation: false
              },
              {
                title: 'Drywall',
                code: 'SSI-6-13',
                mandatoryObservation: false
              },
              {
                title: 'Painting',
                code: 'SSI-6-14',
                mandatoryObservation: false
              },
              {
                title: 'Sitework',
                code: 'SSI-6-15',
                mandatoryObservation: false
              },
              {
                title: 'Excavation',
                code: 'SSI-6-16',
                mandatoryObservation: false
              },
              {
                title: 'Underground Work',
                code: 'SSI-6-17',
                mandatoryObservation: false
              },
              {
                title: 'Stair Installation',
                code: 'SSI-6-18',
                mandatoryObservation: false
              },
              {
                title: 'Cleanup',
                code: 'SSI-6-19',
                mandatoryObservation: false
              },
              {
                title: 'OTHER',
                code: 'SSI-6-20',
                mandatoryObservation: true
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
                code: 'SSI-7-1',
                mandatoryObservation: false
              },
              {
                title: 'No',
                code: 'SSI-7-2',
                mandatoryObservation: false
              },
              {
                title: 'N/A',
                code: 'SSI-7-3',
                mandatoryObservation: true
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
      newQuestionInput (question) {
        this.questionnaire.push(question) // a new question is being created
        this.emptyQuestion = {
          ...emptyQuestionTemplate // clone object
        }
        this.$nextTick().then(function (component) { // ot getElements in the Dom to put the focus on the newly created question we have to wait until the Dom has been updated
          // focus on last element from questionnaire
          component.$el.querySelector('.emptyQuestionContainer .codeInputField input').value = ''
          component.$el.querySelector('.emptyQuestionContainer .titleInputField input').value = ''
  
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
