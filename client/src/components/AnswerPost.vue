<template lang="html">
<div class="">
  <el-row>
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple">
        <h5>Post Answer</h5>
        <el-form label-width="120px">
        <el-form-item label="Answer">
          <el-input type="textarea" v-model="answerInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postAnswer">Post Your Answer</el-button>
        </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

</div>
</template>

<script>
import axios from 'axios'
import localUrl from '../constant'

export default {
  props : ['questionId'],
  data(){
    return {
      answerInput: ''
    }
  },
  methods: {
    postAnswer(){
      let id = this.$route.params.id
      let self = this;
      // console.log(self.questionId);
      axios.post(`${localUrl}/questions/${self.questionId}/answers`, {
        answer   : self.answerInput
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        if (res.data.success){
             self.$message('Your answer is post on Hacktivoverflow');
             console.log('ayo ',res.data.data);
             self.$emit('answerAdded', res.data.data)
            //  self.$router.push(`/questions/${self.questionId}`)
             self.answerInput = ''
        }else {
            this.$message.error('Oops, sepertinya ada yang salah');
        }
      })
      .catch((err) => {
        console.log(err);
        this.$message.error('Oops, sepertinya ada yang salah');
      })
    }
  }
}
</script>

<style lang="css">

</style>
