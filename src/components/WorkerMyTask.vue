<template>
  <div>
    <div style="min-height:300px;">
      <el-table
        :data="myTasks"
        style="width: 100%;"
        type="flex"
        :header-cell-style="{background:'#eff0f1'}"
      >
        <el-table-column prop="username" label="请求者"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="task_type" label="类型"></el-table-column>
        <el-table-column label="数量">
          <template slot-scope='scope'>
            {{scope.row.end-scope.row.begin+1}}
          </template>
        </el-table-column>
        <el-table-column prop="created_time" label="创建时间"></el-table-column>
        <el-table-column prop="deadline" label="结束时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link v-bind:to="'/WQList?stid='+scope.row.id">
              <el-button size="small" type="text" v-show="scope.row.is_finished == '0'">继续任务</el-button>
            </router-link>
            <span v-show="scope.row.is_finished != '0'" style="color:green;font-size:12px">已完成</span>
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
      myTasks: [],
      theTasks: []
    };
  },
  methods: {},
  mounted() {
    axios({
      method: "get",
      url: "/api/sub-task/find-my-sub-task"
    })
      .then(response => {
        this.myTasks = response.data.Subtasks;
        console.log("my-sub-task:", this.myTasks);

        // for (let myTask of this.myTasks) {
        //   let param = new URLSearchParams();
        //   console.log(myTask.taskId)
        //   param.append('id', 103);
        //   axios({
        //     method: "get",
        //     url: "/api/task/find-by-id",
        //     data: param,
        //   }).then(response => {
        //     console.log(response);
        //   });
        // }
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
