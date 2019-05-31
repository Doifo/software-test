<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="rgba(0,0,0,.85)"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%"
  >
    <el-row class="debugBox" style="height: 100%">
      <div style="color: white">Header,所有身份共用一个header，至少要包含以下元素，任务广场，首页，登陆登陆</div>
    </el-row>
  </el-menu>
</template>

<script>
  export default {
    name: "CommonHeaderNav",
    props:{
      path:String,
      title:String
    },
    data(){
      return {
        activeIndex2: '1',
      }
    }
  }
</script>

<style scoped>
  .debugBox{
    border: 1px solid black;
  }

</style>

