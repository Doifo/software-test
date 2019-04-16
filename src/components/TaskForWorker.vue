<template>
  <el-collapse-item>
    <template slot="title">
      <el-row style="width:100%;padding-left:30px">
        <el-col :span="6">{{taskInfo.area || "无"}}</el-col>
        <el-col :span="6">{{taskInfo.name}}</el-col>
        <el-col :span="3">{{taskInfo.time_limitation}}</el-col>
        <el-col :span="3">¥{{taskInfo.reward}}/条</el-col>
        <el-col :span="3">{{taskInfo.institution_name}}</el-col>
        <el-col :span="3">
          <el-button type="warning" @click.stop="confirmAdd">接受任务</el-button>
        </el-col>
      </el-row>
    </template>
    <div style="padding-left:30px;">
      <el-row style="margin-top:20px;">
        <el-col :span="6">开始时间：{{taskInfo.start_time}}分钟</el-col>
        <el-col :span="6">过期时间：{{taskInfo.end_time}}</el-col>
        <el-col :span="6">资格要求：{{taskInfo.level}}</el-col>
      </el-row>
      <p>描述：{{taskInfo.description}}</p>
    </div>
  </el-collapse-item>
</template>

<script>
import axios from "axios";
export default {
  name: "TaskForWorker",
  props: {
    taskInfo: Object
  },
  data() {
    return {
      // taskInfo: {
      //   tid: "1",
      //   requester: "上海某公司",
      //   title: "图片标注",
      //   num: 666,
      //   reward: 0.5,
      //   desc: "图片标注",
      //   createTime: "2018",
      //   ddl: "2019",
      //   allocateTime: 60,
      //   qualification: "天才"
      // }
    };
  },
  methods: {
    confirmAdd() {
      this.$confirm("确定接受任务吗？", "接受任务", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //this.$options.methods.addToMyTask.call(this);
          let param = new URLSearchParams();
          param.append("taskId", this.taskInfo.id);
          axios({
            method: "post",
            url: "/api/personal-task/add",
            data: param
          })
            .then(response => {
              console.log("response:", response);
            })
            .catch(response => {
              console.log("error:", response);
            });
          this.$message.success("接受成功");
        })
        .catch(() => {});
    },
    
  },
  mounted: function() {}
};
</script>
