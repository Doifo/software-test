<template>
  <div>
    <el-row class="task-content-header">
      <el-col :span="6">请求者</el-col>
      <el-col :span="6">标题</el-col>
      <el-col :span="3">
        数量
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :span="3">
        奖励
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :span="3">
        创建时间
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :span="3">操作</el-col>
    </el-row>
    <el-collapse style="min-height:250px;border-bottom:none;">
      <task-for-worker v-for="(item) in showedList" :key="item.id" :taskInfo="item"></task-for-worker>
    </el-collapse>
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="allTaskList.length"
        :current-page.sync="curPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import TaskForWorker from "@/components/TaskForWorker";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "TaskListForWorker",
  computed: {
    ...mapState({
      allTaskList: state => state.Worker.allTaskList
    }),
    showedList(){
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      let tem=this.allTaskList.slice(fst,lst);
      return tem;
    }
  },
  data() {
    return {
      curPage:1,
      pageSize: 10
    };
  },
  methods:{
    handleCurrentChange(val){
      this.curPage=val;
      alert(val);
    }
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
  background: #eff0f1;
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


