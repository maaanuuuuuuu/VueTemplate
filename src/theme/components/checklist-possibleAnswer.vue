<template>
  <el-row :gutter="5" class="possibleAnswerRow">
    <el-col :sm="2" class="answerButtons">
        <el-button icon="el-icon-rank" :disabled="isDisabled" class="draggableAnswersHandle" size="mini"></el-button>
    </el-col>
    <el-col :sm="2" class="answerButtons" >
      <el-button icon="el-icon-delete" :disabled="isDisabled" @click="possibleAnswerDelete" size="mini"></el-button>
    </el-col>
    <el-col :sm="0">
        <el-input placeholder="code" v-model.trim="answer.code" size="mini" @focus="codeFocus" class="possibleAnswerCodeInputField"></el-input>
    </el-col>
    <el-col :sm="18">
      <el-input placeholder="New possible answer" v-model.trim="answer.title" size="mini" @focus="titleFocus" class="possibleAnswerTitleInputField"></el-input>
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
      titleFocus () {
        this.$emit('answerFocus', this.answer)
      },
      conditionalQuestionsDisplayChecked (value) {
        this.$emit('conditionalQuestionsDisplayChecked', value, this.answer.code)
      }
    },
    watch: {
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
      padding-left: 1%;
      margin-left: 0px!important;  /* to rpevent ugly element negative margins */
      margin-right: 0px!important;  /* to rpevent ugly element negative margins */
    }
    .answerButtons .el-button--mini {
        padding: 7px 27%;
    }
    .answerButtons .el-checkbox--mini {
        padding: 5px 15% 0px 15%;
    }
    .sortGhost {
      background-color: rgba(0, 0, 255, 0.2);
    }
</style>
