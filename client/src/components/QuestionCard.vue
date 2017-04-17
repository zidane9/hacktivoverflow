<template>
  <div>
  <div style="background:#eee;padding: 20px">
      <Card :bordered="false">
          <p slot="title">{{question.title}}</p>
          <p>{{question.post}}</p>
          <router-link :to="'/questions/'+question._id">
            <Button type="primary" shape="circle" icon="ios-search">Details Question</Button>
          </router-link>
      </Card>
  </div>
</div>
</template>

<script>
export default {
  props : ['title','post', 'question'],
  data(){
    return {
      page: 1
    }
  }
}
</script>

<style lang="css">
</style>
