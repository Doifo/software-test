<template>
  <el-collapse-item>
    <template slot="title">
      <el-row style="width:100%;padding-left:30px">
        <el-col :span="3">{{workerInfo.id}}</el-col>
        <el-col :span="6">{{workerInfo.name}}</el-col>
        <el-col :span="3">{{workerInfo.eMail}}</el-col>
        <el-col :span="3">{{workerInfo.level}}</el-col>
        <el-col :span="6">
          <button v-bind:class="{back:ensure}" type="warning" @click.stop>警告</button>
          <button v-bind:class="{back:ensure}" type="warning" @click.stop>封禁</button>
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
      ensure:false,
      workerInfo: {
          id:"1",
        name: "Xiaoming",
        level: "9",
        eMail: "123456789@qq.com",
        major:"软件工程",
        education: "本科",
        workArea: "******",
        age: "20",
       }
    };
  },
  mounted:function(){
  console.log(this.workerInfo);
  }
};
</script>

<style>
.back{
  background:red;
}
</style>
