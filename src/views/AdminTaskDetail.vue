<template>
  <div style="background-color: #efefef; margin: 0; padding: 0">
    <question-list-preview :tid="taskId"></question-list-preview>
  </div>
</template>

<script>
import axios from "axios";
import QuestionListPreview from '@/components/requester/projectEditor/QuestionListPreview'
export default {
  name: "AdminTaskDetail",
  data() {
    return {
      taskId: parseInt(this.$route.params.tid),
      taskDetail: {
        urls: [],
        opts: [],
        desc: ""
      },
      option: ""
    };
  },
  components:{
    QuestionListPreview
  },
  mounted() {
    alert("mounted");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#admin-task-detail{
    width: 70%;
    margin: 0 auto;
}

.task-pic{
    height: 80px;
    width: auto;
}

.title{
    background: #eff0f1;
    font-weight: bold;
    padding: 10px;
}
</style>
