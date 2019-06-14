<template>
  <div style="background-color: #34495e; height: 100%">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#34495e"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/requester/information" style="color: white">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/requester/project/edit" style="color: white">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">创建任务</span>
      </el-menu-item>
      <el-menu-item index="/requester/project/list" style="color: white">
        <i class="el-icon-star-on"></i>
        <span slot="title">我的任务</span>
      </el-menu-item>
      <el-menu-item index="4" style="color: white">
        <i class="el-icon-view"></i>
        <span slot="title">交易明细</span>
      </el-menu-item>
      <el-menu-item index="5" style="color: white">
        <i class="el-icon-document"></i>
        <span slot="title">帮助中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "RequesterAsideNav",
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
