<template>
  <div>
  <question-card v-for="question in questions" key="index" :question="question"></question-card>
</div>
</template>

<script>
import QuestionCard from './QuestionCard.vue'

export default {
  components : {
    QuestionCard
  },
  props: ['questions'],
  // data(){
  //   return {
  //   }
  // },
  methods : {

  },
  mounted(){
    this.$emit('loaded')
  }
}
</script>

<style lang="css">
</style>
