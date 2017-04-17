<template>
  <el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="vote">
          <a @click="vote(1,answer._id)"><i class="el-icon-caret-top"></i></a>
          <span style="line-height: 36px;">{{answer.votes}}</span>
          <a @click="vote(-1,answer._id)"><i class="el-icon-caret-bottom"></i></a>
          <a href="#"><i class="el-icon-check"></i></a>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <p>{{answer.answer}}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10" :offset="14">
        <div class="grid-content bg-purple">
          <h5>{{answer.user.username}}</h5>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import localUrl from '../constant'
export default {
  props: ['answer'],
  // data() {
  //
  // },
  // computed: {
  //   totalVote: function() {
  //     return data.reduce((total, value) => {
  //       return total + value.number
  //     }, 0)
  //   }
  // },
  methods: {
    vote(number, answerId) {
      let id = this.$route.params.id
      let self = this;
      axios.post(`${localUrl}/questions/${id}/answers/votes`, {
        answer: answerId,
        number,
      },{headers: {'token': window.localStorage.getItem('token')}})
        .then(response => {
          console.log(response.data)
          self.$emit('voteAdded')
        })
        .catch(error => {
          alert('error, see console')
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
