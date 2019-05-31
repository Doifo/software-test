<template>
  <div>
    <worker-header></worker-header>
      <div class="container">
    <el-row class="worker-content-header">
      <el-col :span="3">ID</el-col>
      <el-col :span="3">工人姓名</el-col>
      <el-col :span="6">邮箱</el-col>
      <el-col :span="3">
        等级
        <i ></i>
      </el-col>
      <el-col :span="3">
        账户余额
        <i></i>
      </el-col>
      <el-col :span="6">操作</el-col>
    </el-row>
    <el-collapse style="min-height:250px;border-bottom:none;">
      <worker-for-admin v-for="(item) in showedList" :key="item.id" :workerInfo="item"></worker-for-admin>
    </el-collapse>
     <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="allWorkerList.length"
        :current-page.sync="curPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>  
  </div>
    
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader"
import axios from "axios";
import WorkerForAdmin from "@/components/admin/WorkerForAdmin";

export default {
  name: "AdminWorker",
  computed: {
    // ...mapState({
    //   allWorkerList: state => state.admin.allWorkerList
    // }),
    showedList(){
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      let tem=this.allWorkerList.slice(fst,lst);
      return tem;
    }
  },
  data() {
    return {
      curPage:1,
      pageSize: 4,
      allWorkerList:[],
      // workerList:[{
      //   id:"1",
      //   name: "Xiaoming",
      //   level: "5",
      //   eMail: "123456789@qq.com",
      //   major:"软件工程",
      //   education: "本科",
      //   workArea: "******",
      //   age: "20",
      //   value:"15",
      //   balance:"78",
      // },
      // ],
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
    axios.get("/api/worker/find-all")
    .then(response => {
      console.log(response.data);
      this.allWorkerList=response.data.workers;
    })
    .catch(response => {} );
  },
  components: {
    WorkerForAdmin ,
    WorkerHeader,
    
    
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

.container{
  width:98%;
  margin:20px auto;
  min-height:400px
}
</style>


