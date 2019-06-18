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
        <el-main style="padding: 30px; background-color: #efefef">
          <div style="width: 75%; float: left; background-color: white; border-radius: 5px">
            <div v-show="tabState==='unfinished'">
              <worker-my-task :tasks='myTasksUnfinished'></worker-my-task>
            </div>
            <div v-show="tabState==='finished'">
              <worker-my-task :tasks='myTasksFinished'></worker-my-task>
            </div>
            <div v-show="tabState==='overDue'">
              <worker-my-task :tasks='myTasksOverdue'></worker-my-task>
            </div>
          </div>
          <div style="width: 23%; float: left; margin-left: 20px">
            <div style="padding: 20px; background-color: white; border-radius: 5px">
              <el-row style="font-size: 18pt"><strong>统计</strong></el-row>
              <el-row style="font-size: 16pt; margin-top: 15px">
                <el-col :span="6"><strong>待完成</strong></el-col>
                <el-col :span="18" style="text-align: right">{{myTasksUnfinished.length}}</el-col>
              </el-row>
              <el-row style="font-size: 16pt; margin-top: 10px">
                <el-col :span="6"><strong>已完成</strong></el-col>
                <el-col :span="18" style="text-align: right">{{myTasksFinished.length}}</el-col>
              </el-row>
              <el-row style="font-size: 16pt; margin-top: 10px">
                <el-col :span="6"><strong>已过期</strong></el-col>
                <el-col :span="18" style="text-align: right">{{myTasksOverdue.length}}</el-col>
              </el-row>
            </div>
            <div style="padding: 20px; background-color: white; margin-top: 20px; border-radius: 5px">
              <el-row style="font-size: 18pt"><strong>切换显示</strong></el-row>
              <el-row style="margin-top: 15px">
                <el-button type="primary" size="mini" @click="changeTab('unfinished')">待完成</el-button>
                <el-button type="success" size="mini" style="margin-left: 5px" @click="changeTab('finished')">已完成</el-button>
                <el-button type="danger" size="mini" style="margin-left: 5px" @click="changeTab('overDue')">已过期</el-button>
              </el-row>
            </div>

            <div style="padding: 20px; background-color: white; margin-top: 20px; border-radius: 5px">
              <el-row style="font-size: 16pt">
                <el-col :span="12">
                  <span>
                    <strong>任务广场</strong>
                  </span>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <router-link to="/worker/taskPlayground">
                    <el-button type="primary" size="mini" style="font-size: 14pt; padding-top: 5px; padding-bottom: 5px">前往</el-button>
                  </router-link>
                </el-col>
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
import CommonHeadNav from "@/components/public/CommonHeaderNav";
import WorkerAsideNav from "@/components/public/WorkerAsideNav";
import Footer from "@/components/public/Footer";

import WorkerMyTask from "@/components/worker/ReceivedTaskfForWorker";
import TaskListForWorker from "@/components/worker/TaskListForWorker";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "WorkerTask",
  computed: {
    ...mapState({
      allTaskList: state => state.Worker.allTaskList
    })
  },
  data() {
    return {
      //allTaskList:[],
      myTasksId: [],
      myTasks:[],
      myTasksUnfinished:[],
      myTasksFinished:[],
      myTasksOverdue:[],
      tabState:"unfinished"
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

    axios
      .get("/api/sub-task/find-my-sub-task")
      .then(response => {
        this.myTasks = response.data.Subtasks;
        //console.log("my-sub-task:", this.myTasks);
        for (let mytask of this.myTasks) {
          if (mytask.isFinished == "0") {
            this.myTasksUnfinished.push(mytask)
          } else if (mytask.isFinished == "1") {
            this.myTasksFinished.push(mytask)
          } else if (mytask.isFinished == "-1") {
            this.myTasksOverdue.push(mytask)
          }
        }
      })
      .catch(response => {
        console.log("error:", response);
      });
    // axios.get('/api/task/find-all').then(response=>{
    //   console.log(response.data);
    //   this.allTaskList=response.data.tasks;
    // });
  },
  methods: {
    changeTab(name){
      this.tabState=name;
    },
    showMyTasks(tasks) {
      console.log("tasks:", tasks);
      this.myTasksId = tasks;
    }
  }
};
</script>
