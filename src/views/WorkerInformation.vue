<template>
  <div>
    <!--导航-->
    <worker-header></worker-header>
    <div style="width:70%;margin:0 auto; margin-top:50px;">
      <div style="background:#fffaf7;border:1px solid #ccc;padding-left:20px;">
        <p><span style="font-weight:bold;">Sunny</span> <span style="background:#db4946;color:white;font-weight:bold;margin-left:20px;border-radius:2px;">LV.1</span> </p>
        <p style="font-size:13px;">工人ID：  <span>A2345</span></p>
        <p style="font-size:13px;">共赚金额：  <span style="color:#db4946">￥50</span></p>
      </div>
      
      <el-tabs value="first" type="card" @tab-click="handleClick" style="margin-top:10px;">
        <el-tab-pane label="个人信息" name="first" style="padding-left:20px;">
          <p>
            <span>登录名：</span>
            <span></span>
          </p>
          <p>
            <span>性别：</span>
            <span> </span>
          </p>
          <p >
            <span>出生年月：</span>
            <span> </span>
          </p>
          <p>
            <span>所在公司：</span>
            <span> </span>
          </p>
          <p>
            <span>手机号码：</span>
            <span> </span>
          </p>
          <p>
            <span>联系邮箱：</span>
            <span> </span>
          </p>
          <p>
            <span>学历：</span>
            <span> </span>
          </p>
          <p>
            <span>毕业院校：</span>
            <span> </span>
          </p>
          <p>
            <span>联系地址：</span>
            <span> </span>
          </p>
          <el-button type="primary" @click="confirmupdate" style="margin:0 auto;display:block;">修改</el-button>
        </el-tab-pane>

        <el-tab-pane label="我的任务" name="second">

          <p>时间：
            <el-date-picker 
            size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </p>  
          
          <div style="min-height:300px;">
            <el-table :data="tableData" style="width: 100%;" type="flex" :header-cell-style="{background:'#eff0f1'}">
              <el-table-column prop="time" label="请求者"></el-table-column>
              <el-table-column prop="time" label="项目名称"></el-table-column>
              <el-table-column prop="time" label="奖励"></el-table-column>
              <el-table-column prop="time" label="参与时间"></el-table-column>
              <el-table-column prop="time" label="操作"></el-table-column>
            </el-table>
          </div>

          <div class="pages" style="display:flex;flex-direction:row;justify-content:center;margin-bottom:100px;">
            
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10,20, 40]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="10"
            style="display:inline-block"
            >
            </el-pagination>
          </div>
      

        </el-tab-pane>
    
      </el-tabs>
    </div>
      
    
  </div>
</template>

<script>
  //import axios from 'axios'
  import WorkerHeader from '@/components/WorkerHeader.vue'
  
  export default {
    
    components:{
      'worker-header':WorkerHeader,
    },
    methods: {
      back(){
        this.$router.push('worker_task_square')
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      handleChange(val){
        console.log(val);
      },
      confirmupdate(){

      },
      handleCurrentChange(){

      },
      handleClick(){

      },
      handleSizeChange(){

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
        tableData: [{
            date: '**软件公司',
            name: '产品评价分类',
            address: '审核中',
            time:'2019-2-1'
          }, {
            date: '**软件公司',
            name: '产品评价分类',
            address: '审核中',
            time:'2019-2-1'
          }, {
            date: '**软件公司',
            name: '产品评价分类',
            address: '审核中',
            time:'2019-2-1'
          }, {
            date: '**软件公司',
            name: '产品评价分类',
            address: '审核中',
            time:'2019-2-1'
          }]
      }
    },
    /*
    created()
    {
      function dateToString(datetime){
        let date = datetime.slice(0,10);
        let time = datetime.slice(11,19)
        return date + ' ' + time;
      }
      let task_id = this.$route.query.task_id;
      let that=this;
      let param = new URLSearchParams();
      param.append('id',task_id);
      axios.get('/api/task/find-by-id',
        {params:{'id': task_id}})
        .then(function (response) {
          let task = response.data.task;
          task.start_time = dateToString(task.start_time);
          task.end_time = dateToString(task.end_time);
          that.task = task;
          that.$forceUpdate();
        })
        .catch(function (error) {
          console.log(error);
        });
      axios.get('/api/question/see-all-question',
        {params:{'taskId': task_id}})
        .then(function (response) {
          let questions = response.data.Questions;
          if(questions.length >= 5){
            that.questions = questions.slice(0,5);
            console.log(that.questions);
          }
          else{
            that.questions = questions;
          }
          for (let i = 0; i < that.questions.length; i++) {
            that.question_index[that.questions[i].question.id] = i + 1;
            let an_answer = {
              type: that.questions[i].question.type,
              radio: '',
              checkList: [],
              open_answer: '',
            }
            that.answer.push(an_answer);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
*/
  }
</script>

<style scoped>

</style>
