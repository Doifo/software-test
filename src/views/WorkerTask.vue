<template>
  <div>
    <worker-header></worker-header>
    <div style="padding-left:50px;padding-right:50px">
      
      <p style="color:#1471eb;border-left:2px solid #1471eb;padding-left:10px;margin-top:50px">众包任务</p>
      <el-tabs value="first" type="card">
        <el-tab-pane label="所有任务" name="first">
          <task-list-for-worker ></task-list-for-worker>
        </el-tab-pane>
        <el-tab-pane label="已参与任务" name="second">
          <worker-my-task ></worker-my-task>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import WorkerMyTask from '@/components/WorkerMyTask'
import WorkerHeader from "@/components/WorkerHeader";
import TaskListForWorker from "@/components/TaskListForWorker";
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
    WorkerHeader,
    TaskListForWorker,
    WorkerMyTask
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
