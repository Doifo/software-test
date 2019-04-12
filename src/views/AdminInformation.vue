<template>
  <div>
    <!--导航-->
    <worker-header></worker-header>
    <div style="width:70%;margin:0 auto; margin-top:50px;">
      <div style="background:#fffaf7;border:1px solid #ccc;padding-left:20px;">
        <p><span style="font-weight:bold;">Admin</span> <span style="background:#db4946;color:white;font-weight:bold;margin-left:20px;border-radius:2px;">LV.1</span> </p>
        <p style="font-size:13px;">AdminID：  <span>12345</span></p>
      </div>
      
      <el-tabs value="first" type="card" @tab-click="handleClick" style="margin-top:10px;">
        <el-tab-pane label="个人信息" name="first" style="padding-left:20px;">
          <p>
            <span>姓名：</span>
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
            <span>工作时长：</span>
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
          <el-button type="primary" @click="confirmupdate" style="margin:0 auto;display:block;">修改</el-button>
        </el-tab-pane>
    
      </el-tabs>
    </div>
      
    
  </div>
</template>

<script>
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
      }
    },
  }
</script>

<style scoped>

</style>
