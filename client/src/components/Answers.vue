<template>
  <el-col :span="14" :offset="2">
    <el-tabs type="card">
      <el-tab-pane label="votes" />
      <el-tab-pane label="oldest" />
      <el-tab-pane label="active" />
    </el-tabs>
    <Answer
      v-for="(answer, index) in answers"
      :answer="answer"
      @voteAdded="addVote"
      key="index">
    </Answer>
  </el-col>
</template>

<script>
import Answer from './Answer.vue'

export default {
  props: ['answers'],
  // data() {
  //   return {
  //
  //   }
  // },
  components: {
    Answer
  },
  methods: {
    addVote(){
      this.$emit('voteAdded');
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
