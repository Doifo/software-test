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
          <div style="padding-left:50px;padding-right:50px">

            <p style="color:#1471eb;border-left:2px solid #1471eb;padding-left:10px;margin-top:50px">众包任务</p>
            <el-tabs value="first" type="card" style="background-color: white">
              <el-tab-pane label="待完成" name="first">
                <worker-my-task ></worker-my-task>
              </el-tab-pane>
              <el-tab-pane label="已完成" name="second">
                <worker-my-task ></worker-my-task>
              </el-tab-pane>
              <el-tab-pane label="已过期" name="third">
                <worker-my-task ></worker-my-task>
              </el-tab-pane>
            </el-tabs>
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
    name: "WorkerTask",
    computed: {
      ...mapState({
        allTaskList: state => state.Worker.allTaskList
      }),

    },
    data() {
      return {
        //allTaskList:[],
        myTasksId:[],
      };
    },
    components: {
      TaskListForWorker,
      WorkerMyTask,
      CommonHeadNav,
      WorkerAsideNav,
      Footer
    },
    mounted: function() {
      this.$store.dispatch("Worker/initAllTaskList");

      // axios.get('/api/task/find-all').then(response=>{
      //   console.log(response.data);
      //   this.allTaskList=response.data.tasks;
      // });
    },
    methods:{
      showMyTasks(tasks){
        console.log("tasks:",tasks)
        this.myTasksId = tasks;
      }
    }
  };
</script>
