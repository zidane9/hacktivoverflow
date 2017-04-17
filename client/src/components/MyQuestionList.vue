<template>
  <div>
  <my-question-card @questionRemoved="questionIsRemove" v-for="question in questions" key="index" :question="question"></my-question-card>
</div>
</template>

<script>
import MyQuestionCard from './MyQuestionCard.vue'

export default {
  components : {
    MyQuestionCard
  },
  props: ['questions'],
  // data(){
  //   return {
  //   }
  // },
  methods : {
    questionIsRemove(){
      this.$emit('loadedMine')
    }
  },
  mounted(){
    this.$emit('loadedMine')
  }
}
</script>

<style lang="css">
</style>
