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
        <el-main style="padding: 0; background-color: #efefef">
          <div style="width: 90%; padding: 20px; margin: auto; background-color: white; font-size: 16pt; margin-top: 40px">
            <div style="margin: auto; text-align: center">
              欢迎来到任务广场，我们根据您的专业领域，信誉等级，做题数量等指标为您精选出了以下任务，祝您答题愉快！！！
            </div>
          </div>
          <div style="padding-left:20px;padding-right:20px; background-color: white; width: 90%; margin: auto; margin-top: 20px">
            <task-list-for-worker ></task-list-for-worker>
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
    name: "WokerTaskPlayground"
  }
</script>

<style scoped>

</style>
