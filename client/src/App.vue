<template>
  <div id="app">
    <div class="layout">
        <Menu mode="horizontal" active-name="1">
            <div class="layout-logo">Hacktivoverflow</div>
            <div class="layout-nav">
                <Menu-item name="1">
                    <router-link to="/questions">Question</router-link>
                </Menu-item>

                <Menu-item name="2">
                  <router-link v-if="isLogin == false" to="/users/signin">Sign In</router-link>
                  <router-link v-else to="/myquestions">My Q</router-link>
                </Menu-item>

                  <Menu-item name="3">
                    <router-link v-if="isLogin == false" to="/users/signup">Sign Up</router-link>
                    <el-button v-else  type="primary" @click="signOut">Logout</el-button>
                  </Menu-item>

                  <el-input
                  class="layout-search"
                  placeholder="Question"
                  icon="search"
                  v-model="search"
                  >
                </el-input>


            </div>

        </Menu>
        <div class="layout-header">
            <router-link v-if="isLogin" to="/questions/ask"><el-button type="primary">Ask Question</el-button></router-link>

        </div>

    </div>

    <router-view
    @ifExist="ifExist"
    @updatedQuestion="updateListQuestions"
    @loaded="getQuestions(false)"
    @loadedMine="getQuestions(true)"
    :questions="questions"/>
  </div>
</template>

<script>
import {Menu, Breadcrumb} from 'iview'
import localUrl from './constant'
export default {
  data(){
    return {
      search : '',
      isLogin : false,
      questions : []
    }
  },
  methods : {
    getQuestions(isMine){
      var self = this
      self.questions = []
      if(isMine){
        axios.get(`${localUrl}/myquestions`,{headers: {'token': window.localStorage.getItem('token')}})
        .then(function (response) {
          if (response.data.success == true){
            self.questions = response.data.questions
            console.log(self.questions);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
      axios.get(`${localUrl}/questions`)
      .then(function (response) {

        if (response.data.success == true){
          self.questions = response.data.questions
          console.log(self.questions);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      }
    },
    updateListQuestions(newQuestion) {
      console.log('question baru ', newQuestion);
      return this.questions.push(newQuestion);
    },
    search(){
      console.log('search');
    },
    ifExist(){
      if (localStorage.getItem("token") === null) {
          this.isLogin = false
      }else {
          this.isLogin = true
      }
    },
    signOut(){
				window.localStorage.removeItem('token')
        this.ifExist()

		}
  },
  mounted(){
    this.ifExist()
  }
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #fafafa;
    }
    .layout-logo{
        width: 140px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 3px;
        left: 20px;
        font-size: 25px;
        color: #ff6f00;
    }
    .layout-search{
      width: 110px;
      height: 30px;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 10px 0px 10px 10px;
    }
</style>
