<template>
    <!--导航-->
  <div>
    <worker-header></worker-header>
    <el-main style="width:80%; margin:0 auto;margin-top:30px;">

      <el-row>
        <el-col :span="6" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              {{myInfor.credit}}
            </p>
            <p class="task-card-word">
              信誉度(5)
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              {{myInfor.correctNumberAnswered}}
            </p>
            <p class="task-card-word">
              正确问题数
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              {{myInfor.allNumberAnswered}}
            </p>
            <p class="task-card-word">
              全部问题数
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              {{myInfor.overtimeNumber}}
            </p>
            <p class="task-card-word">
              超时任务次数
            </p>
          </div>
        </el-col>

        <el-col :span="6" :offset="3" style=" ">
          <div class="task-card">
            <p class="task-card-num">
              {{parseInt(myInfor.correctNumberAnswered/myInfor.allNumberAnswered*100)}}
            </p>
            <p class="task-card-word">
              任务正确率(%)
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
        myInfor:[]
      }
    },
    mounted(){
       axios({
        method: "get",
        url: "/api/worker/find-myself"
      }).then(response => {
        //console.log(response.data)
        this.myInfor = response.data.worker
      })
    }

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
