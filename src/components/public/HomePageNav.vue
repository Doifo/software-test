<template>
  <el-row class="homePageNav">
    <el-col :span="8" :offset="1" class="title" style="font-size: 20pt">
      <a>众 测 平 台</a>
    </el-col>
    <el-col :span="14">
      <div style="text-align:right;padding-right:30px;">
        <router-link to="/register">
          <el-button style="padding: 8px; padding-left:15px; padding-right:15px; font-size: 16pt">注 册</el-button>
        </router-link>
        <router-link to="/login">
          <el-button style="margin-left: 20px; padding: 8px; padding-left: 15px; padding-right: 15px; font-size: 16pt">登 录</el-button>
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
      name: "HomePageNav"
  }
</script>

<style scoped>
  .homePageNav {
    background-color: #1c2541;
    display: flex;
    align-items: center;
    height: 80px;
    padding: 20px;
  }
  .title {
    padding-left: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
    color: rgb(255, 255, 255);
  }
</style>
