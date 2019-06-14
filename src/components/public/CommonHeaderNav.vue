<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="rgba(0,0,0,.85)"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%"
  >
    <el-row class="debugBox" style="height: 100%; color: white; padding: 10px">
      <el-col :span="5" style="font-size: 20pt; color: white; text-align: center; margin-top:10px">
        <div>众 测 平 台</div>
      </el-col>
      <el-col :offset="1" :span="12" style="text-align: center; font-size: 16pt">
        <el-row>欢&nbsp;&nbsp;迎&nbsp;&nbsp;回&nbsp;&nbsp;来&nbsp;&nbsp;!!!</el-row>
        <el-row>{{username}}</el-row>
      </el-col>
      <el-col :offset="1" :span="2" style="font-size: 16pt; margin-top: 13px">
        <a :href="urlToPersonalSpace">个人中心</a></el-col>
      <el-col :span="2" style="font-size: 16pt; margin-top: 13px">
        <a href="/" @click="logout">退出登陆</a>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
  export default {
    name: "CommonHeaderNav",
    computed:{
    },
    data() {
      return {
        urlToPersonalSpace:"",
        worker: false,
        requester: false,
        admin: false,
        username:window.localStorage.getItem('username')
      };
    },
    methods: {
      logout(e) {
        e.preventDefault();
        console.log("logout");
        this.$store.commit("UserLogout");
        this.$router.replace("/");
      }
    },
    mounted: function() {
      let path = window.location.pathname;
      //let buttons = document.getElementsByClassName("nav-button");
      if (path.indexOf("worker") !== -1) {
        this.worker = true;
      }

      else if (path.indexOf("requester") !== -1) {
        //this.requester = true;
        this.urlToPersonalSpace="/requester/information"
      }

      else if (path.indexOf("admin") !== -1) {
        this.admin = true;
      }
    }
  }
</script>

<style scoped>
  .debugBox{
    border: 1px solid black;
  }
  a{
    text-decoration: none;
  }

  a:visited{
    color: white;
  }

</style>

