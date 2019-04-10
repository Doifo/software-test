<template>
  <div>
    <worker-header></worker-header>
    <div style="padding-left:50px;padding-right:50px">
      <p style="margin-top:30px;margin-bottom:30px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>视觉判断</el-breadcrumb-item>
          <el-breadcrumb-item>问卷调查</el-breadcrumb-item>
          <el-breadcrumb-item>语言分析</el-breadcrumb-item>
          <el-breadcrumb-item>其他</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <p style="color:#1471eb;border-left:2px solid #1471eb;padding-left:10px;">众包任务</p>
      <el-tabs value="first" type="card">
        <el-tab-pane label="所有任务" name="first">
          <task-list-for-worker></task-list-for-worker>
        </el-tab-pane>
        <el-tab-pane label="已参与任务" name="second">
          <worker-task-participated></worker-task-participated>
        </el-tab-pane>
        <el-tab-pane label="考试练习" name="third"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";
import WorkerAllTask from "@/components/WorkerAllTask";
import WorkerTaskParticipated from "@/components/WorkerTaskParticipated";
import TaskListForWorker from "@/components/TaskListForWorker";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "WorkerTask",
  computed: {
    ...mapState({
      allTaskList: state => state.Worker.allTaskList
    })
  },
  data() {
    return {
      //allTaskList:[],
    };
  },
  components: {
    WorkerHeader,
    WorkerAllTask,
    WorkerTaskParticipated,
    TaskListForWorker
  },
  mounted: function() {
    this.$store.dispatch("Worker/initAllTaskList");
    // axios.get('/api/task/find-all').then(response=>{
    //   console.log(response.data);
    //   this.allTaskList=response.data.tasks;
    // });
  }
};
</script>
