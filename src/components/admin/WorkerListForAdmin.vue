<template>
  <div>
    <el-row class="worker-content-header">
      <el-col :span="3">ID</el-col>
      <el-col :span="3">工人姓名</el-col>
      <el-col :span="3">邮箱</el-col>
      <el-col :span="3">
        等级
        <i ></i>
      </el-col>
      <el-col :span="3">
        经验值
        <i></i>
      </el-col>
      <el-col :span="3">
        账户余额
        <i></i>
      </el-col>
      <el-col :span="6">操作</el-col>
    </el-row>
    <el-collapse style="min-height:250px;border-bottom:none;">
      <worker-for-admin v-for="(item) in workerList" :key="item.id" :workerInfo="item"></worker-for-admin>
    </el-collapse>
    <!-- <div class="pages">
      <el-pagination
        background
        questionEditor="prev, pager, next"
        :page-size="pageSize"
        :total="allTaskList.length"
        :current-page.sync="curPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
import WorkerForAdmin from "@/components/admin/WorkerForAdmin";
import axios from "axios/index";
import { mapState } from "vuex/types";

export default {
  name: "WorkerListForAdmin",
  computed: {
    ...mapState({
      allWorkerList: state => state.admin.allWorkerList
    }),
    showedList(){
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      console.log(allWorkerList);
      let tem=this.allWorkerList.slice(fst,lst);
      return tem;
    }
  },
  data() {
    return {
      curPage:1,
      pageSize: 4,
      workerList:[{
        id:"1",
        name: "Xiaoming",
        level: "5",
        eMail: "123456789@qq.com",
        major:"软件工程",
        education: "本科",
        workArea: "******",
        age: "20",
        value:"15",
        balance:"78",
      },{
        id:"2",
        name: "Xiaoming",
        level: "1",
        eMail: "5435@qq.com",
        major:"软件工程",
        education: "本科",
        workArea: "******",
        age: "18",
        value:"15",
        balance:"110",
      },{
        id:"3",
        name: "Alice",
        level: "9",
        eMail: "12346789@qq.com",
        major:"软件工程",
        education: "本科",
        workArea: "******",
        age: "13",
        value:"18",
        balance:"89",
      },
      {
        id:"4",
        name: "Ben",
        level: "10",
        eMail: "1234569@qq.com",
        major:"软件工程",
        education: "本科",
        workArea: "******",
        age: "17",
        value:"13",
        balance:"86",
      },
      ],
    };
  },
  methods:{
    handleCurrentChange(val){
      this.curPage=val;
      //alert(val);
    }
  },
  mounted() {
    //this.$store.dispatch("Admin/initAllWorkerList");
    axios.get("/api/worker/find-myself")
    .then(response => {
      console.log("response:",response);
    });
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


