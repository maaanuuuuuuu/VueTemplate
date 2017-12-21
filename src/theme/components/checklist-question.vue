<template>
  <div v-show="question.displayed">
    <el-row :gutter="5" class="questionInputRow">
      <el-col :sm="1">
        <el-button icon="el-icon-rank" :disabled="isDisabled" class="draggableHandle"></el-button>
       </el-col>
      <el-col :sm="1">
        <el-button icon="el-icon-delete" :disabled="isDisabled" @click="questionDelete"></el-button>
      </el-col>
      <el-col :sm="0">
        <el-input 
          placeholder="code"
          v-model="question.code"
          @input="codeInput"
          @change="codeChange"
          class="codeInputField">
        </el-input>
      </el-col>
      <el-col :sm="16">
        <el-autocomplete 
          placeholder="Create a new question" 
          v-model="question.title"
          @input="titleInput"
          :fetch-suggestions="querySearch" 
          :trigger-on-focus="false" 
          @select="questionSelected"
          class="titleInputField">
        </el-autocomplete>
      </el-col>
      <el-col :sm="5">
        <el-select v-model="question.answerType" :disabled="isDisabled" placeholder="Type of answer">
          <el-option label="Text" value="stringAnswer"></el-option>
          <el-option label="Text Area" value="longStringAnswer"></el-option>
          <el-option label="Number" value="numberAnswer"></el-option>
          <el-option label="Choice" value="choiceAnswer"></el-option>
          <el-option label="Multiple Choice" value="multipleChoiceAnswer"></el-option>
          <el-option label="Upload File" value="fileAnswer"></el-option>
          <el-option label="Date" value="dateAnswer"></el-option>
        </el-select>
      </el-col>
      <el-col :sm="1">
        <el-checkbox-button v-model="question.isMandatory" class="mandatoryButton" :disabled="isDisabled" >*</el-checkbox-button>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="possibleAnswersRow">
      <el-col :sm="14">
        &zwnj;
      </el-col>
      <el-col v-show="question.possibleAnswers !== undefined && question.possibleAnswers.length > 0" :sm="10" class="possibleAnswersContainer">
        <vue-draggable
          v-model="question.possibleAnswers"
          :options="{handle: '.draggableAnswersHandle', group: 'answers', ghostClass: 'sortGhost'}">
          <possibleAnswer
            v-for="(possibleAnswer, index) in question.possibleAnswers"
            :key="possibleAnswer.code"
            :id="'possibleAnswer-'+index"
            :answer.sync="possibleAnswer"
            v-on:possibleAnswerDelete="deletePossibleAnswer"
            v-on:conditionalQuestionsDisplayChecked="toogleConditionalQuestions">
          </possibleAnswer>
        </vue-draggable>
        <possibleAnswer
          class="newPossibleAnswer"
          v-if="question.answerType === 'choiceAnswer' || question.answerType === 'multipleChoiceAnswer' "
          :answer.sync="emptyPossibleAnswer"
          v-on:answerInput="newAnswerInput"
          :isDisabled="true"
          >
        </possibleAnswer>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="conditionalQuestionsRow">
      <el-alert 
        v-if="question.conditionalQuestions !== undefined && question.conditionalQuestions.length > 0 && conditionsAnswersChecked !== undefined && conditionsAnswersChecked.length > 0"
        :title="'Conditional questions printed if the answer with the code '+ conditionsAnswersChecked+ ' is selected'"
        type="info"
        :closable="false"
        show-icon>
      </el-alert>
      <vue-draggable
        v-model="question.conditionalQuestions"
        :options="{handle: '.draggableHandle', group: 'questions', ghostClass: 'sortGhost'}"
        class="questionsContainer">
        <checklist-question
          v-for="(conditionalQuestion, index) in question.conditionalQuestions"
          :question="conditionalQuestion"
          :key="conditionalQuestion.id"
          :id="'question'+question.code+'-'+index"
          v-on:questionDelete="newConditionalQuestionDelete"
          >
        </checklist-question>
      </vue-draggable>
      <checklist-question 
        v-if="conditionsAnswersChecked !== undefined && conditionsAnswersChecked.length > 0" 
        :question="emptyQuestion"
        v-on:questionInput="newConditionalQuestionInput"
        :isDisabled="true"
        class="emptyQuestionContainer"></checklist-question>
    </el-row>
  </div>
</template>
<style scoped>
  .el-autocomplete {
    display: block;
  }
  .el-select {
    display: block;
  }
  .el-button {
    padding: 12px 15px;
    margin-left: 0px;
  }
  .possibleAnswersRow {
    padding-top: 10px;
    margin-left: 0px!important;  /* to rpevent ugly element negative margins */
    margin-right: 0px!important;  /* to rpevent ugly element negative margins */
  }
  .possibleAnswersContainer {
    padding-bottom: 10px;
    background: rgba(71,143,192, 0.2);
  }
  .conditionalQuestionsRow {
    margin-left: 0px!important; /* to rpevent ugly element negative margins */
    margin-right: 0px!important; /* to rpevent ugly element negative margins */
    background: rgba(71,143,192, 0.2);
    /*background: linear-gradient( rgba(71,143,192,0), rgba(71,143,192, 0.2));*/
  }
  .conditionalQuestionsRow .questionInputRow {
    padding-left: 12px;
    padding-right: 12px;
  }
  .questionInputRow {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
  }
  .questionInputRow .el-button--default {
    padding: 12px 27%;
  }
  .sortGhost {
    background-color: rgba(0, 0, 255, 0.2);
  }
</style>
<script>
  import { Row, Col, Button, Input, Autocomplete, Select, Option, CheckboxButton, Alert } from 'element-ui'
  import draggable from 'vuedraggable'

  import PossibleAnswer from './checklist-possibleAnswer.vue'
  import ChecklistQuestion from './checklist-question.vue'

  const emptyPossibleAnswerTemplate = {title: '', code: '', mandatoryObservation: false}
  const emptyQuestionTemplate = { id: 0, code: '', title: '', answerType: 'stringAnswer', displayed: true }

  export default {
    name: 'checklist-question', // mandatory to be able to do recursive components
    props: {
      question: { // question in props allows communication between parent and child
        default () {
          return {
            title: '',
            code: '',
            answerType: 'stringAnswer',
            possibleAnswers: [],
            conditionalQuestions: [],
            answerConditions: [],
            displayed: true
          }
        },
        type: Object
      },
      isDisabled: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        emptyQuestion: {
          ...emptyQuestionTemplate // clone object
        },
        questionLibrary: [],
        conditionsAnswersChecked: [],
        emptyPossibleAnswer: {
          ...emptyPossibleAnswerTemplate // clone object
        }
      }
    },
    methods: {
      // function that fetches the question library
      loadAllQuestions () {
        return [
          {
            id: 1,
            code: 'SSI-1',
            title: 'Project / Site Name',
            answerType: 'text',
            tags: [
              'site',
              'project'
            ]
          },
          {
            id: 2,
            code: 'SSI-2',
            title: 'Supervisor / Foreman at the time of this inspection',
            answerType: 'text',
            tags: [
              'owner',
              'overseer'
            ]
          },
          {
            id: 3,
            code: 'SSI-3',
            title: 'Select site weather conditions at time of this inspection (select all that apply)',
            answerType: 'multipleChoiceAnswer',
            tags: [
              'meteorology',
              'forecasts'
            ],
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
            ]
          },
          {
            id: 4,
            code: 'SSI-4',
            title: 'Minimum temperature today?',
            answerType: 'text',
            tags: [
              'degrees',
              'rise',
              'ambient'
            ]
          },
          {
            id: 5,
            code: 'SSI-5',
            title: 'Maximum temperature today?',
            answerType: 'text',
            tags: [
              'rise',
              'degrees',
              'high',
              'ambient'
            ]
          },
          {
            id: 6,
            code: 'SSI-6',
            title: 'Current activities being undertaken on site (select all that apply)',
            answerType: 'multipleChoiceAnswer',
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
            code: 'SSI-7',
            title: 'Are first aid facilities to be inspected in this audit? ',
            answerType: 'choicelist',
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
                mandatoryObservation: false
              }
            ]
          },
          {
            id: 8,
            code: 'SSI-8',
            title: 'Any further comments or recommendations arising from this inspection? ',
            answerType: 'textarea',
            tags: [
              'discussion',
              'feedback',
              'requests'
            ]
          },
          {
            id: 9,
            code: 'SSI-9',
            title: 'Date completed',
            answerType: 'date',
            tags: [
              'End',
              'Deadline'
            ]
          },
          {
            id: 10,
            code: 'SSI-10',
            title: 'Upload photo (if appropriate)',
            answerType: 'attachedfile',
            tags: [
              'File',
              'Evidence'
            ]
          },
          {
            id: 11,
            code: 'SSI-11',
            title: 'Number of workers',
            answerType: 'number',
            tags: [
              'End',
              'Deadline'
            ]
          }
        ]
      },
      // the actual search inside the question library
      querySearch (queryString, callback) {
        var questionLibrary = this.questionLibrary
        var results = queryString ? questionLibrary.filter(this.tagFilter(queryString)) : questionLibrary
        // call callback function to return suggestions
        results = results.map(function (question) { return { value: question.title, model: question } }) // value seems to be a mandatory propoerty to pass the title to print to the autocomplete component
        callback(results)
      },
      // checks if a query is inside the tag array of a question
      tagFilter (queryString) {
        return (questionLibrary) => {
          return (questionLibrary.tags.indexOf(queryString.toLowerCase()) !== -1)
        }
      },
      // checks if a query is inside the code array of a question
      codeFilter (queryString) {
        return (questionLibrary) => {
          return (questionLibrary.code === queryString.toLowerCase())
        }
      },
      // a question from the library was selected, let's prefill the fields
      questionSelected (question) {
        question = question.model ? question.model : question
        this.question.code = question.code
        this.question.answerType = question.answerType
        this.question.title = question.title

        this.question.possibleAnswers = []
        if (question.answerType === 'choiceAnswer' || question.answerType === 'multipleChoiceAnswer') {
          for (var i = 0; i < question.possibleAnswers.length; i++) {
            this.question.possibleAnswers.push(question.possibleAnswers[i])
          }
        }
      },
      deletePossibleAnswer (possibleAnswer) {
        this.question.possibleAnswers.splice(this.question.possibleAnswers.indexOf(possibleAnswer), 1)
      },
      // action events
      codeInput () {
        this.$emit('questionInput', this.question)
      },
      titleInput () {
        this.$emit('questionInput', this.question)
      },
      questionDelete () {
        this.$emit('questionDelete', this.question)
      },
      codeChange (value) {
        // if the code corresponds to an existing question from the library and the other fields are empty, set the fields accordingly
        let questionLibrary = this.questionLibrary
        let results = value ? questionLibrary.filter(this.codeFilter(value)) : questionLibrary
        if (results.length === 1) {
          // one question was found in the library
          let result = results[0]
          this.questionSelected(result)
        }
      },
      newAnswerInput (possibleAnswer) {
        this.question.possibleAnswers.push(possibleAnswer) // a new possible answer is being created
        this.emptyPossibleAnswer = {
          ...emptyPossibleAnswerTemplate // clone object
        }

        this.$nextTick().then(function (component) { // to getElements in the Dom to put the focus on the newly created answer we have to wait until the Dom has been updated
          // focus on last element from possibleAnswers
          component.$el.querySelector('.newPossibleAnswer .possibleAnswerCodeInputField input').value = ''
          component.$el.querySelector('.newPossibleAnswer .possibleAnswerTitleInputField input').value = ''
          component.$el.querySelector('#possibleAnswer-' + (component.question.possibleAnswers.length - 1) + ' .possibleAnswerTitleInputField input').focus()
        })
      },
      toogleConditionalQuestions (value, possibleAnswerCode) {
        if (value) {
          this.conditionsAnswersChecked.push(possibleAnswerCode)
        } else {
          this.conditionsAnswersChecked.splice(this.conditionsAnswersChecked.indexOf(possibleAnswerCode), 1)
        }
      },
      newConditionalQuestionInput (emptyQuestion) {
        emptyQuestion.answerConditions = this.question.conditionsAnswersChecked
        if (this.question.conditionalQuestions === undefined) {
          this.question.conditionalQuestions = []
        }
        this.question.conditionalQuestions.push(emptyQuestion)

        this.emptyQuestion = {
          ...emptyQuestionTemplate // clone object
        }
        this.$nextTick().then(function (component) { // ot getElements in the Dom to put the focus on the newly created question we have to wait until the Dom has been updated
          // focus on last element from questionnaire
          component.$el.querySelector('.emptyQuestionContainer .codeInputField input').value = ''
          component.$el.querySelector('.emptyQuestionContainer .titleInputField input').value = ''
          component.$el.querySelector('#question' + component.question.code + '-' + (component.question.conditionalQuestions.length - 1) + ' .titleInputField input').focus()
        })
      },
      newConditionalQuestionDelete (questionToDelete) {
        this.question.conditionalQuestions.splice(this.question.conditionalQuestions.indexOf(questionToDelete), 1)
      }
    },
    watch: {
      conditionsAnswersChecked: function (newValue, oldValue) {
        if (this.question.conditionalQuestions !== undefined) {
          for (let i = 0; i < this.question.conditionalQuestions.length; i++) {
            let conditionalQuestion = this.question.conditionalQuestions[i]
            // complicated array comparison
            if (conditionalQuestion.answerConditions !== undefined && newValue !== undefined && conditionalQuestion.answerConditions.length === newValue.length && conditionalQuestion.answerConditions.every(function (element, index) { // table comparison
              return element === newValue[index]
            })) {
              conditionalQuestion.displayed = true
            } else {
              conditionalQuestion.displayed = false
            }
          }
        }
      },
      'question.conditionalQuestions': {
        handler: function (newValue, oldValue) { // a new question has been dragged into the condionalquestions of this question
          if (newValue.length > oldValue.length) { // question dragged into conditionalquestions
            let questionBeingMoved = newValue.filter(v => !oldValue.includes(v)) // array diff
            let index = newValue.indexOf(questionBeingMoved[0])
            this.question.conditionalQuestions[index].answerConditions = this.conditionsAnswersChecked
          }
        }
      }
    },
    components: {
      'el-button': Button,
      'el-input': Input,
      'el-row': Row,
      'el-col': Col,
      'el-autocomplete': Autocomplete,
      'el-select': Select,
      'el-option': Option,
      'el-checkbox-button': CheckboxButton,
      'el-alert': Alert,
      'possibleAnswer': PossibleAnswer,
      'checklist-question': ChecklistQuestion,
      'vue-draggable': draggable
    },
    mounted () {
      this.questionLibrary = this.loadAllQuestions()
    }
  }
</script>

