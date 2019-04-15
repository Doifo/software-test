<template>
  <el-collapse-item>
    <template slot="title">
      <el-row style="width:100%;padding-left:30px">
        <el-col :span="3">{{workerInfo.id}}</el-col>
        <el-col :span="3">{{workerInfo.name}}</el-col>
        <el-col :span="6">{{workerInfo.eMail}}</el-col>
        <el-col :span="3">{{workerInfo.level}}</el-col>
        <el-col :span="3">{{workerInfo.balance}}</el-col>
        <el-col :span="6">
          <el-button v-bind:class="{back:ensureone}" type="warning" @click.stop="warningone">警告</el-button>
          <el-button v-bind:class="{back:ensuretwo}" type="warning" @click.stop="warningtwo">封禁</el-button>
        </el-col>
      </el-row>
    </template>
    <div style="padding-left:30px;">
      <el-row style="margin-top:20px;">
        <el-col :span="6">工人职业：{{workerInfo.major}}</el-col>
        <el-col :span="6">教育水平：{{workerInfo.education}}</el-col>
        <el-col :span="6">工作地址:{{workerInfo.workArea}}</el-col>
        <el-col :span="6">年龄:{{workerInfo.age}}</el-col>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>

export default {
  name: "WorkerForAdmin",
  props:{
    workerInfo: Object,
  },
  data() {
    return {
      ensureone:false,
      ensuretwo:false,
      option:""
    };
  },
  methods:{
    warningone(){
      alert("您正在对该工人进行警告！")
      this.ensureone = true;
      console.log(this.ensureone)
    },
    warningtwo(){
      alert("您正在对该工人进行封禁！")
      this.ensuretwo = true;
      console.log(this.ensuretwo)
    }
  },
  mounted:function(){
 
  }
};
</script>

<style>
.back{
  background:red;
}
</style>
