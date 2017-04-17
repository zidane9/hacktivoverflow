<template>
<div>
  <el-row v-if="question">
    <el-col :span="14" :offset="2">

      <el-row :gutter="20">
        <h1>{{question.title}}</h1>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="vote">
            <a @click="vote(1)" ><i class="el-icon-caret-top"></i></a>
            <span style="line-height: 36px;">{{question.votes}}</span>
            <a @click="vote(-1)"><i class="el-icon-caret-bottom"></i></a>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <p>{{question.post}}</p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10" :offset="14">
          <div class="grid-content bg-purple">
            <h5>{{question.author.username}}</h5>
          </div>
        </el-col>
      </el-row>
    </el-col>

    <Answers @voteAdded="fetchData" :answers="question.answers" />

  </el-row>
  <AnswerPost v-if="isLogin" :questionId="this.$route.params.id"
  @answerAdded="fetchData"/>
</div>
</template>

<script>
import Answers from './Answers.vue'
import AnswerPost from './AnswerPost.vue'
import localUrl from '../constant'

export default {
  data() {
    return{
      question: null,
      isLogin: false
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  // computed: {
  //   totalVote: function() {
  //     return data.reduce((total, value) => {
  //       return total + value.number
  //     }, 0)
  //   }
  // },
  methods: {
    vote(number) {
      let id = this.$route.params.id
      axios.post(`${localUrl}/questions/${id}/votes`, {
        number
      },{headers: {'token': window.localStorage.getItem('token')}})
        .then(response => {
          console.log(response.data)
          this.fetchData()
        })
        .catch(error => {
          alert('error, see console')
          console.log(error)
        })
    },
    fetchData() {
      let id = this.$route.params.id
      let self = this
      axios.get(`${localUrl}/questions/${id}`)
        .then(response => {
          console.log(response.data)
          self.question = response.data
        })
        .catch(error => {
          alert('error, see console')
          console.log(error)
        })
    },
    ifExist(){
      if (localStorage.getItem("token") === null) {
          this.isLogin = false
      }else {
          this.isLogin = true
      }
    }
    // updateListAnswers(updatedQuestion) {
    //   console.log('answer baru ', updatedQuestion.answers[updatedQuestion.answers.length-1]);
    //   return this.question.answers.push(updatedQuestion.answers[updatedQuestion.answers.length-1]);
    // },
  },
  components: {
    Answers,
    AnswerPost
  },
  created() {
    this.fetchData()
    this.ifExist()
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
