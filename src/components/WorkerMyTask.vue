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
        <el-table-column label="数量">
          <template slot-scope='scope'>
            {{scope.row.end-scope.row.nowBegin+1}}
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"></el-table-column>
        <el-table-column prop="deadline" label="结束时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link v-bind:to="'/WQList?stid='+scope.row.id">
              <el-button size="small" type="text" v-show="scope.row.isFinished == '0'">继续任务</el-button>
            </router-link>
            <span v-show="scope.row.isFinished == '1'" style="color:green;font-size:12px">已完成</span>
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
    axios.get('/api/sub-task/find-my-sub-task')
      .then(response => {
        
        this.myTasks = response.data.Subtasks;
        //console.log("my-sub-task:", this.myTasks);
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
