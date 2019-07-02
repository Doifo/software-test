<template>
  <div>
    <div style="min-height:540px">
      <el-table
        :data="showedTasks"
        style="width: 100%; background-color: white"
        type="flex"
        stripe
        border
        :header-cell-style="{background:'white'}"
      >
        <el-table-column prop="username" label="请求者"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">{{scope.row.end-scope.row.nowBegin+1}}</template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"></el-table-column>
        <el-table-column prop="deadline" label="结束时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link v-bind:to="'/worker/task/answer?stid='+scope.row.id" target="_blank">
              <el-button size="small" type="text" v-show="scope.row.isFinished == '0' && scope.row.taskType != 'ver6'">继续任务</el-button>
            </router-link>
            <router-link v-bind:to="'/worker/task/answer/questionnaire?stid=' +scope.row.id" target="_blank">
              <el-button size="small" type="text" v-show="scope.row.isFinished == '0'&& scope.row.taskType == 'ver6'">继续任务</el-button>
            </router-link>
            <span v-show="scope.row.isFinished == '1'" style="color:green;font-size:12px">已完成</span>
            <span v-show="scope.row.isFinished == '-1'" style="color:red;font-size:12px">过期</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p style="text-align:center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="tasks.length"
        :current-page.sync="curPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </p>
  </div>
</template>

<script>
import axios from "axios/index";
export default {
  name: "WorkerMyTask",
  data() {
    return {
      // myTasks: [],
      theTasks: [],
      pageSize:10,
      curPage:1,

    };
  },
  props:{
    tasks:Array,
  },
  methods: {
    handleCurrentChange(val){
       this.curPage = val;
    }
  },
  computed:{
    showedTasks(){
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      let tem=this.tasks.slice(fst,lst);
      
      console.log(tem,"tem");
      return tem;
    }
  },
  mounted() {
    // axios
    //   .get("/api/sub-task/find-my-sub-task")
    //   .then(response => {
    //     this.myTasks = response.data.Subtasks;
    //     //console.log("my-sub-task:", this.myTasks);
    //   })
    //   .catch(response => {
    //     console.log("error:", response);
    //   });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
