<template>
  <div>
    <el-row class="task-content-header">
      <el-col :span="4">相关领域</el-col>
      <el-col :span="4">标题</el-col>
      <el-col :span="3">
        数量
      </el-col>
      <el-col :span="3">
        奖励
      </el-col>
      <el-col :span="6">
        创建时间
      </el-col>
      <el-col :span="3">操作</el-col>
    </el-row>
    <el-collapse style="min-height:450px;border-bottom:none;">
      <task-for-worker v-for="item in showedList" :key="item.id" :taskInfo="item" style="margin-top: 10px; padding-bottom: 10px"></task-for-worker>
    </el-collapse>
    <div class="pages" style="padding: 0px">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="allTaskList.length"
        :current-page.sync="curPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!-- <el-button @click="test">测试</el-button> -->
  </div>
</template>

<script>
import TaskForWorker from "@/components/worker/TaskForWorker";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "TaskListForWorker",
  computed: {
    ...mapState({
    allTaskList: state => state.Worker.allTaskList
    }),
    
    showedList() {
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      let tem=this.allTaskList.slice(fst,lst);
      
      return tem;
      //return this.allTaskList;
    }
  },
  data() {
    return {
      //allTaskList: [],
      curPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.curPage = val;
      alert(val);
    },
    test() {
      console.log(this.allTaskList);
    }
  },
  props:{
    
  },
  mounted() {
    this.$store.dispatch("Worker/initAllTaskList");
  },
  components: {
    TaskForWorker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-content-header {
  background: white;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  font-weight: bold;
}

.pages {
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>


