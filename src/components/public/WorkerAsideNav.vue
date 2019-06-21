<template>
  <div style="background-color: #34495e; height: 100%">
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#34495e" router>
      <el-menu-item index="/worker/information" style="color: white">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/worker/taskPlayground" style="color: white">
        <i class="el-icon-goods"></i>
        <span slot="title">任务广场</span>
      </el-menu-item>
      <el-menu-item index="/worker/task" style="color: white">
        <i class="el-icon-star-on"></i>
        <span slot="title">我的任务</span>
      </el-menu-item>
      <el-menu-item index="/worker/transaction" style="color: white">
        <i class="el-icon-view"></i>
        <span slot="title">交易明细</span>
      </el-menu-item>
      <el-menu-item index="/worker/qualification" style="color: white">
        <i class="el-icon-view"></i>
        <span slot="title">数据统计</span>
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
  name: "WorkerAsideNav"
};
</script>

<style scoped>
</style>
