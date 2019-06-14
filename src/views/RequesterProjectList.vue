<template>
  <el-container>
    <el-header style="padding: 0; height: 80px">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="width: 10%; padding: 0">
          <RequesterAsideNav/>
        </el-aside>
        <el-main style="padding: 0; background-color: #efefef">
          <el-col :span="20" :offset="2" style="height: 550px; padding: 20px; background-color: white">
            <div class="container">
              <el-row class="task-title" style="padding-bottom: 20px">
                <el-col :span="5" :offset="1"><strong>相关领域</strong></el-col>
                <el-col :span="5" :offset="1"><strong>标题</strong></el-col>
                <el-col :span="5" :offset="1"><strong>时间</strong></el-col>
                <el-col :span="5" :offset="1"><strong>操作</strong></el-col>
              </el-row>
              <task-for-requester v-for="task in showedTasks" :key="task.id" :task="task"></task-for-requester>
            </div>
          </el-col>
          <el-col :span="20" :offset="2" style="background-color: white; padding-top: 20px">
            <p style="text-align:center;">
              <el-pagination
                background
                @current-change="changePage"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="myTaskList.length"
              ></el-pagination>
            </p>
          </el-col>
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="padding: 0">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
  import CommonHeadNav from '@/components/public/CommonHeaderNav'
  import RequesterAsideNav from '@/components/public/RequesterAsideNav'
  import Footer from '@/components/public/Footer'

  import TaskForRequester from "@/components/requester/TaskForRequester"
  import axios from "axios"
  export default {
    name: "RequesterProjectList",
    components:{
      TaskForRequester,
      CommonHeadNav,
      RequesterAsideNav,
      Footer
    },
    computed:{
      showedTasks() {
        if(!this.myTaskList) return this.myTaskList;
        let begin = this.pageSize * (this.currentPage - 1);
        let end = this.pageSize * this.currentPage;
        console.log(this.myTaskList[0]);
        return this.myTaskList.slice(begin, end);
      }
    },
    data(){
      return{
        myTaskList:[],
        currentPage:1,
        pageSize:10
      }
    },
    methods:{
      changePage(page) {
        //console.log(page);
        this.currentPage = page;
      }
    },
    mounted() {
      axios.get('/api/task/find-my-task').then(response=>{
        if(response.data.message === 'there is no task published by you'){
          this.myTaskList = []
        }else{
          this.myTaskList=response.data.tasks;
        }
      })
    }
  }
</script>

<style scoped>

</style>
