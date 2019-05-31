<template>
  <div>
    <worker-header></worker-header>
    <div class="container">
      <el-row class="task-title">
        <el-col :span="5" :offset="1">相关领域</el-col>
        <el-col :span="5" :offset="1">标题</el-col>
        <el-col :span="5" :offset="1">时间</el-col>
        <el-col :span="5" :offset="1">操作</el-col>
      </el-row>
      <task-for-admin v-for="task in showedTasks" :key="task.id" :task="task"></task-for-admin>
    </div>
    <p style="text-align:center;">
      <el-pagination
        background
        @current-change="changePage"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="tasks.length"
      ></el-pagination>
    </p>
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";
import TaskForAdmin from "@/components/admin/TaskForAdmin";
import axios from "axios";

export default {
  name: "AdminTask",
  data() {
    return {
      tasks: [],
      currentPage: 1,
      pageSize: 5
    };
  },
  components: {
    WorkerHeader,
    TaskForAdmin
  },
  mounted() {

    axios
      .get("/api/admin/find-unreviewed-task")
      .then(response => {
        //console.log("task:", response);
        this.tasks = response.data.tasks;
      })
      .catch(response => {
        console.log("error:", response);
      });

  },
  methods: {
    changePage(page) {
      //console.log(page);
      this.currentPage = page;
    }
  },
  computed: {
    showedTasks() {
      let begin = this.pageSize * (this.currentPage - 1);
      let end = this.pageSize * this.currentPage;
      return this.tasks.slice(begin, end);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-title {
  background: #eff0f1;
  height: 40px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
}

.container {
  width: 80%;
  margin: 20px auto;
  min-height: 400px;
}
</style>
