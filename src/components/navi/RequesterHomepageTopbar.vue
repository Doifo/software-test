<template>

<div>
  <div class="title" >
    <el-row>
      <el-col :span="6">
      <span style="font-size:20px;color:#303133;padding:20px 0 0 20px;">众包任务平台</span>
    </el-col>
    <el-col :span="16"><p></p></el-col>
    <el-col :span="2">
        <el-dropdown @command="handleCommand">
          <el-button type="text" style="color:#606266;width:100%;">
            <span>{{user.username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </el-col>
    </el-row>
  </div>
    <div class="topbar">
       <el-row>
        <el-col :span="4">
                <div class="topbar_title"></div>
            </el-col>
        <el-col :span="18">
            <el-menu :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                     router
                    background-color="#1C2541"
                    text-color="#fff"
                    active-text-color="#fff">
                <el-menu-item index="">首页</el-menu-item>
                <el-menu-item index="requester_create">创建</el-menu-item>
                <el-menu-item index="requester_manage">管理</el-menu-item>

            </el-menu>
        </el-col>
      <el-col :span="2">
        <!--<el-button type="text" style="color:#ffffff;width:100%;height:60px" @click="informationPage">
          <span>{{user.username}}</span>
        </el-button>-->
        
      </el-col>
      <!--
        <el-col :span="3">
          <el-button type="text" style="color:#ffffff;width:100%;height:60px" @click="informationPage">
            <span>{{user.username}}</span>
          </el-button>
        </el-col>

        <el-col :span="1" style = "background-color:#313233">
          <el-button type="text" style="color:#ffffff;width:100%;height:60px" @click="logout">
            <span>退出</span>
          </el-button>
        </el-col>
        -->
         </el-row>
    </div>
</div>
</template>

<script>
    export default {
        methods: {
          informationPage(){
            this.$router.push('/requester-information')
          },
          logout(){
            this.$store.commit('UserLogout');
            this.$router.replace('/login')
          },
          handleSelect(key, keyPath) {
            console.log(this);
            console.log(key,keyPath);
          },
          handleCommand(command) {
            if(command === 'info'){
              this.informationPage();
            }
            else{
              this.logout();
            }
          }
        },
        computed:{
            activeIndex(){
                    return this.$route.path.replace('/','');
            }
        },
        data(){
            return{
              user:{
                username:this.$store.state.username,
              },
              logo:require('../../../static/logo_white.png')
            }
        }
    }
</script>


<style>
.topbar{
    background-color: #1C2541;
    color: #fff;
    height: 60px;
}
.el-menu-item.is-active {
   background-color: #1471EB !important;
}
.topbar_title{

    color: #fff;

    margin-left:50px;
    margin-top: 13px;
    font-size: 70%;
}
.topbar_control{
    font-size: 120%;
}
.topbar_user{
    /*margin-top:23px;  */
    font-size: 15px;
    font-weight: 200;
    background-color: rgba(0,0,0,0);
    color: #fff;
    border: none;
}
.topbar_user user{
    padding-right: 20px;

}
.topbar_user user:hover{
   cursor:pointer;
   color: rgb(121, 185, 245)
}

</style>

