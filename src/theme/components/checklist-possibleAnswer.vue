<template>
  <el-row :gutter="20" class="possibleAnswerRow">
    <el-col :sm="4" class="answerButtons">
      <i class="el-icon-rank"></i>
      <i class="el-icon-delete"></i>
    </el-col>
    <el-col :sm="9">
      <el-input placeholder="Write the answer" v-model.trim="answer.title" size="mini" ></el-input>
    </el-col>
    <el-col :sm="9">
        <el-input placeholder="code" v-model.trim="answer.code" size="mini" ></el-input>
    </el-col>
    <el-col :sm="2" class="answerButtons">
      <i class="el-icon-arrow-down"></i>
    </el-col>
  </el-row>
</template>

<script>
  import { Row, Col, Button, Input } from 'element-ui'

  export default {
    props: ['answer'],
    components: {
      'el-button': Button,
      'el-input': Input,
      'el-row': Row,
      'el-col': Col
    }
  }
</script>

<style scoped>
    .possibleAnswerRow {
        padding-top: 5px;
    }
    .answerButtons {
        line-height: 1.9;
    }
</style>
