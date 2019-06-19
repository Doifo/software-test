<template>
  <div style="background-color: #efefef">
    <common-head-nav style="width: 100%"></common-head-nav>
    <div style="background-color: #efefef; padding: 0; width: 45%; padding-left: 400px">
      <div  style="padding-top: 50px">
        <question-list-preview :tid="taskId"></question-list-preview>
      </div>
    </div>
    <Footer style="width: 100%"></Footer>
  </div>
</template>

<script>
import axios from "axios";
import QuestionListPreview from '@/components/requester/projectEditor/QuestionListPreview'
import CommonHeadNav from '@/components/public/CommonHeaderNav'
import Footer from '@/components/public/Footer'
export default {
  name: "AdminTaskDetail",
  data() {
    return {
      taskId: parseInt(this.$route.params.id),
      taskDetail: {
        urls: [],
        opts: [],
        desc: ""
      },
      option: ""
    };
  },
  components:{
    QuestionListPreview,
    CommonHeadNav,
    Footer
  },
  mounted() {
    alert("mounted");
    alert(taskId);
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
