<template>
  <div>
    <el-row class="worker-content-header">
      <el-col :span="6">工人姓名</el-col>
      <el-col :span="6">邮箱</el-col>
      <el-col :span="3">
        等级
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :span="3">
        经验值
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :span="3">
        账户余额
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :span="3">操作</el-col>
    </el-row>
    <el-collapse style="min-height:250px;border-bottom:none;">
      <worker-for-admin v-for="(item) in showedList" :key="item.id" :workerInfo="item"></worker-for-admin>
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
import WorkerForAdmin from "@/components/WorkerForAdmin";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "WorkerListForAdmin",
  computed: {
    ...mapState({
      allWorkerList: state => state.Admin.allWorkerList
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
      pageSize: 4
    };
  },
  methods:{
    handleCurrentChange(val){
      this.curPage=val;
      alert(val);
    }
  },
  mounted() {
    this.$store.dispatch("Worker/initAllWorkerList");
  },
  components: {
    WorkerForAdmin 
  }
};
</script>

<style scoped>
.worker-content-header {
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


