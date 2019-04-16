<template>
    <!--导航-->
  <div>
    <worker-header></worker-header>
    <el-main style="width:80%; margin:0 auto;margin-top:30px;">

      <el-row>
        <el-col :span="6" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              0
            </p>
            <p class="task-card-word">
              任务放弃率(%)
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              100
            </p>
            <p class="task-card-word">
              任务批准率(%)
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              0
            </p>
            <p class="task-card-word">
              任务拒绝率(%)
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              90
            </p>
            <p class="task-card-word">
              任务提交率(%)
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              0
            </p>
            <p class="task-card-word">
              任务退回率(%)
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              10
            </p>
            <p class="task-card-word">
              批准的任务总数(%)
            </p>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>




<script>
  import axios from 'axios'
  import WorkerHeader from '@/components/WorkerHeader.vue'

  export default {
    components:{
      'worker-header':WorkerHeader
    },
    methods: {
      
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      handleChange(val){
        console.log(val);
      }
    },
    data () {
      return {
        activeName:['1'],
        user: {
        },
        page: 1,
        help_page_menu: "0.0",
        input_search: '',
        input_advice: '',
        task: {},
        accepted:0,
        questions: [],
        answer:[],
        question_index:[],
    
      }
    },

  }
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
    
}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ecedf0;
  }
  .bg-purple {
    background: #edeef0;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 250px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .task-card{
    background-color:#ececec;
    border:1px solid #ccc;
  }

  .task-card-num{
    font-size:80px;
    color:#f9c597;
    text-align:center;
    padding-top:60px;
    margin:10px;
  }

  .task-card-word{
    
    font-size:20px;
    color:rgb(0,0,0);
    text-align:center;
    padding-top:1px;
    padding-bottom:60px;
  }
</style>
