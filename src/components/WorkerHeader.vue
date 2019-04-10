<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col class="header-title">众测平台</el-col>
      <el-col class="user-button">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            username<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span v-show="worker">
              <router-link to="/worker-information" style="text-decoration:none;"> <el-dropdown-item>个人中心</el-dropdown-item></router-link> 
            </span>
            <span v-show="requester">
              <router-link to="/requester-information" style="text-decoration:none;"> <el-dropdown-item>个人中心</el-dropdown-item></router-link> 
            </span>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <el-row class="worker-nav">
      <el-col :span="7" :offset="2"> 
        <router-link to="/"><button class="nav-button">首页</button></router-link>
        <span v-show="worker">
          <router-link to="/worker-task"><button class="nav-button" >任务</button></router-link>
          <router-link to="/worker-statistic"><button class="nav-button" >统计</button></router-link>
          <router-link to="/worker-qualification"><button class="nav-button">资格</button></router-link>
        </span>
        <span v-show="requester">
          <router-link to="/requester-edit-project"><button class="nav-button">创建</button></router-link>
          <router-link to="/"><button class="nav-button">管理</button></router-link>
        </span>

      </el-col>

      
      <el-col :span="7" class="input">
        <input type="text" class="search-input" placeholder="搜索任务......">
        <span class="search-icon"><img  src="../assets/search.png" alt=""></span>
      </el-col>
      
      <el-col :span="8"><button class="search-button">筛选</button></el-col>
        
    </el-row>
  </div>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      worker:false,
      requester:false,
      admin:false,
      
    }
  },
  methods:{
    activate:function(ev){
      console.log(ev.target.childNodes);
      let buttons = ev.target.childNodes;
      window.location.pathname
    },
  },
  mounted:function(){
    let path = window.location.pathname;
    let buttons = document.getElementsByClassName("nav-button"); 
    if(path.indexOf("worker") != -1){
      this.worker = true;

      if(path == "/worker-task"){
        buttons[1].style.background = "#1471eb";
      }else if(path == "/worker-statistic"){
        buttons[2].style.background = "#1471eb";
      }else if(path == '/worker-qualification'){
        buttons[3].style.background = "#1471eb";
      }
    }else if(path.indexOf("requester") != -1){
      this.requester = true;
      
      if(path == '/requester-edit-project'){
        buttons[4].style.background = "#1471eb";
      }
    }else if(path.indexOf("admin") != -1){
      this.admin = true;
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dropdown-link{
    cursor:pointer;
  }

  .header-title{
    padding-left: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
  }
  
  .user-button{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .worker-nav{
    background-color:#1c2541;
    display: flex;
    align-items: center;
  }

  .nav-button{
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    padding: 15px;
    cursor: pointer;
  }

  .nav-button:hover{
    background-color:#1471eb;
  }

  .search-button{
    border-radius: 5px;
    border: 1px solid #000;
    font-size: 15px;
    padding: 10px;
    padding-top: 7px;
    padding-bottom:7px;
    background: #eff0f1;
  }

  .input{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 35px;
  }

  .search-input{
    border: none;
    height: 100%;
    box-sizing: border-box;
    width: 80%;
    padding-left: 20px;
  }

  .search-icon{
    background: #1471eb;
    height: 100%;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-icon img{
    width: auto;
    height: 60%;
  }

  
</style>
