<template>
  <el-container>
    <el-header style="padding: 0; height: 80px">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="width: 10%; padding: 0">
          <WorkerAsideNav/>
        </el-aside>
        <el-main style="padding: 0; background-color: #efefef; padding-bottom: 50px; padding-top: 10px">
          <div style="padding-left:20px;padding-right:20px; background-color: white; width: 70%; margin-top: 35px; margin-left: 30px; float: left; border-radius: 5px">
            <task-list-for-worker ></task-list-for-worker>
          </div>
          <div style="width: 21%; font-size: 16pt; margin-top: 35px; float: left; margin-left: 30px; border-radius: 5px">
            <div style="text-align: left; padding: 20px; background-color: white; border-radius: 5px">
              <el-row style="font-size: 18pt"><strong>说明</strong></el-row>
              <el-row style="margin-top: 15px; font-size: 14pt">欢迎来到任务广场，我们根据您的专业领域，信誉等级，做题数量等指标为您精选出了以下任务，祝您答题愉快！！！</el-row>
            </div>

            <div style="text-align: left; padding: 20px; background-color: white; border-radius: 5px; margin-top: 20px">
              <el-row style="margin-top: 15px; font-size: 18pt">
                <el-row>
                  <strong>您的认证</strong>
                </el-row>
                <el-row style="margin-top: 20px; font-size: 16pt">
                  <el-col :span="6">
                    <strong>资格</strong>
                  </el-col>
                  <el-col :span="18" style="text-align: left">
                    <el-tag v-for="(item,index) in JSON.parse(userInfo.workArea)" style="margin-left: 10px" :key="index">
                      {{item}}
                    </el-tag>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px; font-size: 16pt">
                  <el-col :span="10">
                    <strong>信誉评级</strong>
                  </el-col>
                  <el-col :span="14" style="text-align: right; padding-right: 8px">
                    {{userInfo.credit}}级
                  </el-col>
                </el-row>
                <el-row style="margin-top: 15px; font-size: 16pt">
                  <el-col :span="10">
                    <strong>更多信息</strong>
                  </el-col>
                  <el-col :span="14" style="text-align: right; padding-right: 8px">
                    <el-button type="primary" style="padding: 5px; padding-left: 10px; padding-right: 10px; font-size: 12pt; top: -3px; left: 3px; position: relative">查看</el-button>
                  </el-col>
                </el-row>
              </el-row>

            </div>

          </div>
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
  import WorkerAsideNav from '@/components/public/WorkerAsideNav'
  import Footer from '@/components/public/Footer'

  import WorkerMyTask from '@/components/worker/ReceivedTaskfForWorker'
  import TaskListForWorker from "@/components/worker/TaskListForWorker";
  import axios from "axios";
  import { mapState } from "vuex";

  export default {
    components:{
      TaskListForWorker,
      WorkerMyTask,
      CommonHeadNav,
      WorkerAsideNav,
      Footer
    },
    name: "WokerTaskPlayground",
    data(){
      return{
        userInfo:{}
      }
    },
    mounted() {
      axios({
        method: "get",
        url: "/api/worker/find-myself"
      }).then(response => {
        //console.log("load succeed");
        //console.log(response);
        this.userInfo = response.data.worker;
        console.log(this.userInfo);
      });
    }
  }
</script>

<style scoped>

</style>
