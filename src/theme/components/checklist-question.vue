<template>
  <div>
    <el-row :gutter="20" class="questionInputRow">
      <el-col :sm="1">
        <el-button icon="el-icon-rank" :disabled="isDisabled" class="draggableHandle"></el-button>
       </el-col>
      <el-col :sm="1">
        <el-button icon="el-icon-delete" :disabled="isDisabled" @click="questionDelete"></el-button>
      </el-col>
      <el-col :sm="2">
        <el-input 
          placeholder="code"
          v-model="code"
          @focus="codeFocus"
          @change="codeChange"
          class="codeInputField">
        </el-input>
      </el-col>
      <el-col :sm="14">
        <el-autocomplete 
          placeholder="Create a new question" 
          :disabled="isDisabled" v-model="title" 
          :fetch-suggestions="querySearch" 
          :trigger-on-focus="false" 
          @select="questionSelected">
        </el-autocomplete>
      </el-col>
      <el-col :sm="5">
        <el-select v-model="answerType" :disabled="isDisabled" placeholder="Type of answer">
          <el-option label="Text" value="stringAnswer"></el-option>
          <el-option label="Number" value="numberAnswer"></el-option>
          <el-option label="Choice" value="choiceAnswer"></el-option>
          <el-option label="Upload File" value="fileAnswer"></el-option>
        </el-select>
      </el-col>
      <el-col :sm="1">
        <el-checkbox-button class="mandatoryButton" :disabled="isDisabled" >*</el-checkbox-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="possibleAnswersRow">
      <el-col :sm="18">
        &zwnj;
      </el-col>
      <el-col :sm="6" class="possibleAnswersContainer">
        <vue-draggable v-model="possibleAnswers" :options="{handle: '.draggableHandle'}">
          <possibleAnswer
            v-for="(possibleAnswer, index) in possibleAnswers"
            :key="possibleAnswer.code"
            :answer.sync="possibleAnswer"
            v-on:possibleAnswerDelete="deletePossibleAnswer">
          </possibleAnswer>
        </vue-draggable>
        <possibleAnswer v-if="question.answerType === 'choiceAnswer'" :answer.sync="emptyPossibleAnswer"></possibleAnswer>
      </el-col>
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

  const emptyPossibleAnswerTemplate = {title: '', code: ''}

  export default {
    props: {
      question: { // question in props allows communication between parent and child
        default: {},
        type: Object
      },
      isDisabled: {
        default: false,
        type: Boolean
      },
      emptyPossibleAnswer: {
        default () {
          return {
            ...emptyPossibleAnswerTemplate // clone object
          }
        },
        type: Object
      }
    },
    data () {
      return {
        questionLibrary: [],
        answerLibrary: [],
        title: this.question.title,
        code: this.question.code,
        answerType: this.question.answerType,
        possibleAnswers: this.question.possibleAnswers
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
        this.code = question.code
        this.answerType = question.answerType
        this.title = question.title

        this.possibleAnswers = []
        if (question.answerType === 'choiceAnswer') {
          for (var i = 0; i < question.possibleAnswers.length; i++) {
            this.possibleAnswers.push(question.possibleAnswers[i])
          }
        }
      },
      deletePossibleAnswer (possibleAnswer) {
        this.possibleAnswers.splice(this.possibleAnswers.indexOf(possibleAnswer), 1)
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
        console.log(results)
        if (results.length === 1) {
          // one question was found in the library
          let result = results[0]
          this.questionSelected(result)
        }
      }
    },
    // update the value of the question prop for the parent component
    watch: {
      title: function (newValue, oldValue) {
        this.question.title = newValue
      },
      code: function (newValue, oldValue) {
        this.question.code = newValue
      },
      answerType: function (newValue, oldValue) {
        this.question.answerType = newValue
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
      'vue-draggable': draggable
    },
    mounted () {
      this.questionLibrary = this.loadAllQuestions()
    }
  }
</script>
