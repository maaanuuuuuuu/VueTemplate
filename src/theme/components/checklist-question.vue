<template>
  <div>
    <el-row :gutter="20">
      <el-col :sm="2">
        <el-button icon="el-icon-rank"></el-button>
        <el-button icon="el-icon-delete"></el-button>
      </el-col>
      <el-col :sm="2">
        <el-input placeholder="code" v-model.trim="code"></el-input>
      </el-col>
      <el-col :sm="14">
        <el-autocomplete placeholder="What's your question ?" v-model.lazy.trim="title" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="questionSelected"></el-autocomplete>
      </el-col>
      <el-col :sm="5">
        <el-select v-model="answerType" placeholder="Type of answer" @change="answerTypeChanged">
          <el-option label="Text" value="stringAnswer"></el-option>
          <el-option label="Number" value="numberAnswer"></el-option>
          <el-option label="Choice" value="choiceAnswer"></el-option>
          <el-option label="Upload File" value="fileAnswer"></el-option>
        </el-select>
      </el-col>
      <el-col :sm="1">
        <el-button class="mandatoryButton">*</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="possibleAnswersRow">
      <el-col :sm="18">
        &zwnj;
      </el-col>
      <el-col :sm="6">
        <div v-for="possibleAnswer in possibleAnswers" :key="possibleAnswer.code">
          <possibleAnswer :answer="possibleAnswer"></possibleAnswer>
        </div>
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
  .el-button.mandatoryButton {
    font-size: 32px;
    line-height: 0.85;
    height: 40px;
  }
  .possibleAnswersRow {
    padding-top: 10px;
  }
</style>
<script>
  import { Row, Col, Button, Input, Autocomplete, Select, Option } from 'element-ui'
  import PossibleAnswer from './checklist-possibleAnswer.vue'

  export default {
    props: ['question'],
    data () {
      return {
        questionLibrary: [],
        answerLibrary: [],
        code: '',
        title: '',
        answerType: '',
        possibleAnswers: []
      }
    },
    methods: {
      querySearch (queryString, callback) {
        var questionLibrary = this.questionLibrary
        var results = queryString ? questionLibrary.filter(this.createFilter(queryString)) : questionLibrary
        // call callback function to return suggestions
        results = results.map(function (question) { return { value: question.title, model: question } })
        callback(results)
      },
      createFilter (queryString) {
        return (questionLibrary) => {
          return (questionLibrary.tags.indexOf(queryString.toLowerCase()) !== -1)
        }
      },
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
                title: 'male',
                code: 'male'
              },
              {
                title: 'female',
                code: 'female'
              },
              {
                title: 'transgender',
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
                title: 'yes',
                code: 'yes'
              },
              {
                title: 'no',
                code: 'no'
              }
            ]
          },
          { id: 7, code: 'ethicalLabourStandardsAttach', title: 'Please attach', answerType: 'fileAnswer', tags: ['attach', 'file', 'upload'] }
        ]
      },
      questionSelected (question) {
        console.log('questionSelected')
        question = question.model
        this.code = question.code
        this.answerType = question.answerType
        this.possibleAnswers = []
        if (question.answerType === 'choiceAnswer') {
          for (var i = 0; i < question.possibleAnswers.length; i++) {
            this.possibleAnswers.push(question.possibleAnswers[i])
          }
        }
      },
      answerTypeChanged (selectedValue) {
        console.log('answerTypeChanged')
        if (selectedValue === 'choiceAnswer') {
          console.log('print the options creator form')
        }
      }
    },
    watch: {
      title: function (newValue, oldValue) {
        // console.log(this.title)
        // console.log(oldValue + '=>' + newValue)
        // if (this.newValue !== this.title) {
        //   console.log('changed the value')
        // }
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
      'possibleAnswer': PossibleAnswer
    },
    mounted () {
      this.questionLibrary = this.loadAllQuestions()
      this.code = this.question.code
      this.title = this.question.title
      this.answerType = this.question.answerType
      this.possibleAnswers = this.question.possibleAnswers
    }
  }
</script>
