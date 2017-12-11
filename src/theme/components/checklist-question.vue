<template>
  <div v-show="question.displayed">
    <el-row :gutter="20" class="questionInputRow">
      <el-col :sm="1">
        <el-button icon="el-icon-rank" :disabled="question.isDisabled" class="draggableHandle"></el-button>
       </el-col>
      <el-col :sm="1">
        <el-button icon="el-icon-delete" :disabled="question.isDisabled" @click="questionDelete"></el-button>
      </el-col>
      <el-col :sm="2">
        <el-input 
          placeholder="code"
          v-model="question.code"
          @focus="codeFocus"
          @change="codeChange"
          class="codeInputField">
        </el-input>
      </el-col>
      <el-col :sm="14">
        <el-autocomplete 
          placeholder="Create a new question" 
          :disabled="question.isDisabled"
          v-model="question.title" 
          :fetch-suggestions="querySearch" 
          :trigger-on-focus="false" 
          @select="questionSelected">
        </el-autocomplete>
      </el-col>
      <el-col :sm="5">
        <el-select v-model="question.answerType" :disabled="question.isDisabled" placeholder="Type of answer">
          <el-option label="Text" value="stringAnswer"></el-option>
          <el-option label="Number" value="numberAnswer"></el-option>
          <el-option label="Choice" value="choiceAnswer"></el-option>
          <el-option label="Upload File" value="fileAnswer"></el-option>
        </el-select>
      </el-col>
      <el-col :sm="1">
        <el-checkbox-button class="mandatoryButton" :disabled="question.isDisabled" >*</el-checkbox-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="possibleAnswersRow">
      <el-col :sm="12">
        &zwnj;
      </el-col>
      <el-col :sm="12" class="possibleAnswersContainer">
        <vue-draggable v-model="question.possibleAnswers" :options="{handle: '.draggableHandle'}">
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
          v-if="question.answerType === 'choiceAnswer'"
          :answer.sync="emptyPossibleAnswer"
          v-on:answerFocus="newAnswerFocus"
          :isDisabled="true"
          >
        </possibleAnswer>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="conditionalQuestionsRow">
      <checklist-question
        v-for="conditionalQuestion in question.conditionalQuestions"
        :question="conditionalQuestion"
        :key="conditionalQuestion.id"
        >
      </checklist-question>
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
  }
  .possibleAnswersContainer {
    margin-bottom: 10px;
  }
</style>
<script>
  import { Row, Col, Button, Input, Autocomplete, Select, Option, CheckboxButton } from 'element-ui'
  import draggable from 'vuedraggable'

  import PossibleAnswer from './checklist-possibleAnswer.vue'
  import ChecklistQuestion from './checklist-question.vue'

  const emptyPossibleAnswerTemplate = {title: '', code: ''}

  export default {
    name: 'checklist-question', // mandatory to be able to do recursive components
    props: {
      question: { // question in props allows communication between parent and child
        default: {},
        type: Object
      },
      isDisabled: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        questionLibrary: [],
        // title: this.question.title,
        // code: this.question.code,
        // answerType: this.question.answerType,
        // possibleAnswers: this.question.possibleAnswers,
        // conditionalQuestions: this.question.conditionalQuestions || [],
        // answerConditions: [],
        // displayed: this.question.displayed,
        // conditionsMetToDisplay: this.isDisplayed,
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
          { id: 1, code: 'name', title: 'What\'s your name?', answerType: 'stringAnswer', tags: ['name', 'person'] },
          { id: 2, code: 'age', title: 'What\'s your age?', answerType: 'numberAnswer', tags: ['age', 'person'] },
          { id: 3,
            code: 'gender',
            title: 'What\'s your gender?',
            answerType: 'choiceAnswer',
            tags: ['gender', 'person'],
            possibleAnswers: [
              {
                title: 'a male person',
                code: 'male'
              },
              {
                title: 'a female person',
                code: 'female'
              },
              {
                title: 'a transgender person',
                code: 'transgender'
              }
            ]},
          { id: 4, code: 'size', title: 'What\'s your size (in cm)?', answerType: 'numberAnswer', tags: ['size', 'tall', 'person'] },
          { id: 5, code: 'size', title: 'What\'s your number?', answerType: 'numberAnswer', tags: ['number', 'phone', 'contact', 'person'] },
          { id: 6,
            code: 'ethicalLabourStandards',
            title: 'Do you have a policy defining your approach to labour standards and ethical trading?',
            answerType: 'choiceAnswer',
            tags: ['policy', 'labour', 'standards', 'ethical', 'trading'],
            possibleAnswers: [
              {
                title: 'yes please',
                code: 'yes'
              },
              {
                title: 'no thanks',
                code: 'no'
              }
            ]
          },
          { id: 7, code: 'ethicalLabourStandardsAttach', title: 'Please attach', answerType: 'fileAnswer', tags: ['attach', 'file', 'upload'] }
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
        if (question.answerType === 'choiceAnswer') {
          for (var i = 0; i < question.possibleAnswers.length; i++) {
            this.question.possibleAnswers.push(question.possibleAnswers[i])
          }
        }
      },
      deletePossibleAnswer (possibleAnswer) {
        this.question.possibleAnswers.splice(this.question.possibleAnswers.indexOf(possibleAnswer), 1)
      },
      // action events
      codeFocus () {
        this.$emit('questionFocus', this.question)
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
      newAnswerFocus (possibleAnswer) {
        this.question.possibleAnswers.push(possibleAnswer) // a new possible answer is being created
        this.emptyPossibleAnswer = {
          ...emptyPossibleAnswerTemplate // clone object
        }
        this.$nextTick().then(function (component) { // to getElements in the Dom to put the focus on the newly created answer we have to wait until the Dom has been updated
          // focus on last element from possibleAnswers
          component.$el.querySelector('#possibleAnswer-' + (component.possibleAnswers.length - 1) + ' .possibleAnswerCodeInputField input').focus()
        })
      },
      toogleConditionalQuestions (value, possibleAnswerCode) {
        if (value) {
          this.conditionsAnswersChecked.push(possibleAnswerCode)
        } else {
          this.conditionsAnswersChecked.splice(this.conditionsAnswersChecked.indexOf(possibleAnswerCode), 1)
        }
      }
    },
    // update the value of the question prop for the parent component
    watch: {
      // title: function (newValue, oldValue) {
      //   this.question.title = newValue
      // },
      // displayed: function (newValue, oldValue) {
      //   this.question.displayed = newValue
      // },
      // code: function (newValue, oldValue) {
      //   this.question.code = newValue
      // },
      // answerType: function (newValue, oldValue) {
      //   this.question.answerType = newValue
      // },
      // possibleAnswers: {
      //   handler: function (newValue, oldValue) {
      //     this.question.possibleAnswers = newValue
      //   },
      //   deep: true // means that the watcher is triggered even when a property of the possible answers is modified. Should slow the performance
      // },
      // conditionalQuestions: {
      //   handler: function (newValue, oldValue) {
      //     console.log('conditionalQuestions')
      //     console.log(newValue)
      //     console.log(oldValue)
      //     this.question.conditionalQuestions = newValue
      //   },
      //   deep: true // means that the watcher is triggered even when a property of the possible answers is modified. Should slow the performance
      // },
      // answerConditions: {
      //   handler: function (newValue, oldValue) {
      //     this.question.answerConditions = newValue
      //   },
      //   deep: true // means that the watcher is triggered even when a property of the possible answers is modified. Should slow the performance
      // },
      conditionsAnswersChecked: function (newValue, oldValue) {
        for (let i = 0; i < this.question.conditionalQuestions.length; i++) {
          let conditionalQuestion = this.question.conditionalQuestions[i]
          // complicated array comparison
          if (conditionalQuestion.answerConditions.length === newValue.length && conditionalQuestion.answerConditions.every(function (element, index) { // table comparison
            return element === newValue[index]
          })) {
            conditionalQuestion.displayed = true
          } else {
            conditionalQuestion.displayed = false
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
      'possibleAnswer': PossibleAnswer,
      'checklist-question': ChecklistQuestion,
      'vue-draggable': draggable
    },
    mounted () {
      this.questionLibrary = this.loadAllQuestions()
    }
  }
</script>
