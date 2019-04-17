<template>
  <div>
    <div style="min-height:300px;">
      <el-table
        :data="myTask"
        style="width: 100%;"
        type="flex"
        :header-cell-style="{background:'#eff0f1'}"
      >
        <el-table-column prop="task.institution_name" label="请求者"></el-table-column>
        <el-table-column prop="task.name" label="标题"></el-table-column>
        <el-table-column prop="task.time_limitation" label="时间限制"></el-table-column>
        <el-table-column prop="task.area" label="相关领域"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link v-bind:to="'/worker-answer/'+scope.row.task.id">
              <el-button size="small" type="text">继续任务</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WorkerMyTask",
  data() {
    return {
      myTask: []
    };
  },
  methods: {},
  mounted() {
    axios({
      method: "get",
      url: "/api/personal-task/find-my-task"
    })
      .then(response => {
        console.log("response:", response);
        this.myTask = response.data.tasks;
      })
      .catch(response => {
        console.log("error:", response);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
