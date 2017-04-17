<template>
  <div>
  <div style="background:#eee;padding: 20px">
      <Card :bordered="false">
          <p slot="title">{{question.title}}</p>
          <p>{{question.post}}</p>
          <div>
          <router-link :to="'/questions/'+question._id">
            <Button type="primary" shape="circle" icon="ios-search">Details Question</Button>
          </router-link>
          <Button @click="remove(question)" type="error">Delete Question</Button>
        </div>
      </Card>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import localUrl from '../constant'

export default {
  props : ['title','post', 'question'],
  data() {
    return{
      isLogin: false
    }
  },
  methods : {
    remove(question){
      let x = confirm('Are you sure?');
      if(x) {
        // console.log('q---',question._id);
        let self = this;
      axios.delete(`${localUrl}/questions/${question._id}`,
        {headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        if (res.data.success){
             self.$message('Your question is deleted on Hacktivoverflow');
            //  console.log('ayo ',res.data.data);
             self.$emit('questionRemoved')
        }else {
            this.$message.error('Oops, sepertinya ada yang salah');
        }
      })
      .catch((err) => {
        console.log(err);
        this.$message.error('Oops, sepertinya ada yang salah');
      })
    }
    },
    ifExist(){
      if (localStorage.getItem("token") === null) {
          this.isLogin = false
      }else {
          this.isLogin = true
      }
    }
  },
  created() {
    this.ifExist()
  }
}
</script>

<style lang="css">
</style>
