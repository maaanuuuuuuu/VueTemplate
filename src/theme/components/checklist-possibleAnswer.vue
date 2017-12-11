<template>
  <el-row :gutter="5" class="possibleAnswerRow">
    <el-col :sm="2" class="answerButtons">
        <el-button icon="el-icon-rank" :disabled="isDisabled" class="draggableHandle" size="mini"></el-button>
    </el-col>
    <el-col :sm="2" class="answerButtons" >
      <el-button icon="el-icon-delete" :disabled="isDisabled" @click="possibleAnswerDelete" size="mini"></el-button>
    </el-col>
    <el-col :sm="7">
        <el-input placeholder="code" v-model.trim="answer.code" size="mini" @focus="codeFocus" class="possibleAnswerCodeInputField"></el-input>
    </el-col>
    <el-col :sm="11">
      <el-input placeholder="New possible answer" v-model.trim="answer.title" size="mini" :disabled="isDisabled" ></el-input>
    </el-col>
    <el-col :sm="2" class="answerButtons">
        <el-checkbox v-model="isConditionalQuestionsDisplayChecked" size="mini" :disabled="isDisabled" border></el-checkbox>
    </el-col>
  </el-row>
</template>

<script>
  import { Row, Col, Button, Input, Checkbox } from 'element-ui'

  export default {
    data () {
      return {
        // code: this.answer.code,
        // title: this.answer.title,
        isConditionalQuestionsDisplayChecked: false
      }
    },
    props: {
      answer: { // answer in props allows communication between parent and child
        default: {},
        type: Object
      },
      isDisabled: {
        default: false,
        type: Boolean
      }
    },
    components: {
      'el-button': Button,
      'el-input': Input,
      'el-checkbox': Checkbox,
      'el-row': Row,
      'el-col': Col
    },
    methods: {
      possibleAnswerDelete () {
        this.$emit('possibleAnswerDelete', this.answer)
      },
      codeFocus () {
        this.$emit('answerFocus', this.answer)
      },
      conditionalQuestionsDisplayChecked (value) {
        this.$emit('conditionalQuestionsDisplayChecked', value, this.answer.code)
      }
    },
    watch: {
      // title: function (newValue, oldValue) {
      //   this.answer.title = newValue
      // },
      // code: function (newValue, oldValue) {
      //   this.answer.code = newValue
      // },
      isConditionalQuestionsDisplayChecked: function (newValue, oldValue) {
        this.answer.isConditionalQuestionsDisplayChecked = newValue
        this.conditionalQuestionsDisplayChecked(newValue)
      }
    }
  }
</script>

<style scoped>
    .possibleAnswerRow {
        padding-top: 5px;
    }
    .answerButtons .el-button--mini {
        padding: 7px 5px;
    }
    .answerButtons .el-checkbox--mini {
        padding: 5px 10px 0px 10px;
    }
</style>
