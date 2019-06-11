<template>
  <div style>
    <el-row>
      <div style="width:50%;margin:50px 30px;;">
        <p><a href="http://www.ringsurvey.com/platform">请点击链接进入问卷创建界面</a></p>
        <el-input v-model="file" placeholder="请将完成问卷后所给的链接填入此处"></el-input>
        <!--<p style="float:right;"><el-button type="primary" @click="submit()">保存</el-button></p>-->
      </div>
    </el-row>
    <!-- <el-row>
      <el-col :span="8" :offset="8">
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >编辑完成并保存</el-button>
        <el-button @click="test1">测试</el-button>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    qtmp: Object,
    taskId: Number
  },
  data() {
    return {
      msg: "child",
      file:""
    };
  },
  methods: {
    submitUpload() {
      //alert('OK');
      let formData = new FormData();
      formData.append("url", this.file);
      formData.append("taskId", this.taskId);
      axios
        .post("/api/task/add-resource-from-url", formData)
        .then(response => {
          alert("上传成功");
        })
        .catch(response => {
          alert("error");
        });
      console.log(this.file);
      console.log(this.qtmp,this.taskId);
    }
  },
  mounted: function() {
    console.log(this.qtmp);
  }
};
</script>

<style scoped>
.el-button {
  font-size: 16pt;
}
</style>

