<template>
  <div id="admin-task-detail">
    <!-- <h2 style="text-align:center">任务详情</h2>
    <p class="title">问题描述</p>
    <p>{{taskDetail.desc}}</p>
    <p class="title">选项</p>
    <el-row v-for="opt in taskDetail.opts" :key="opt.content">{{opt.content}}</el-row>
    <p class="title">图片</p>
    <img v-for="url in taskDetail.urls" :key="url.url" :src="url.url" class="task-pic"> -->
    <question-list-preview :tid="taskId"></question-list-preview>
  </div>
</template>

<script>
import axios from "axios";
import QuestionListPreview from '@/components/requester/QuestionListPreview'
export default {
  name: "AdminTaskDetail",
  data() {
    return {
      taskId: this.$route.params.id,
      taskDetail: {
        urls: [],
        opts: [],
        desc: ""
      },
      option: ""
    };
  },
  props:{
    QuestionListPreview
  },
  mounted() {
    axios
      .get("/api/task/read-resource", {
        params: {
          taskId: 1
        }
      })
      .then(response => {
        this.taskDetail = response.data;
        console.log(this.taskDetail);
      })
      .catch(response => {
        alert("error");
      });
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
