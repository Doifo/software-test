<template>
  <div>
    <div style="min-height:300px;">
      <el-table
        :data="myTasks"
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
            <router-link v-bind:to="'/QList?tid='+scope.row.task.id">
              <el-button size="small" type="text" >继续任务</el-button>
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
      myTasks: []
    };
  },
  methods: {
    gotoAnswer(){
      console.log(this.taskInfo)
      this.$router.push({
        path:'/QList',
        query:{
          tid:this.taskInfo.id
        }
      })
    }
  },
  mounted() {
    axios({
      method: "get",
      url: "/api/personal-task/find-my-task"
    })
      .then(response => {
        console.log("response:", response);
        this.myTasks = response.data.tasks;
        let tasksId = [];
        for(let task in this.myTasks){
          tasksId.push(this.myTasks[task].task.id);
        }
        this.$emit("getMyTasks",tasksId);
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
