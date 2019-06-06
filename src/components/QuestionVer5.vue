<template>
  <div style>
    <el-row>
      <el-col :span="12">
        <p>请点击下面的链接完成问卷</p>
        <p><a :href="url">调查问卷</a></p>
      </el-col>
      <el-col :span="12">
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import {encryptBy,decryptBy} from 'des.js'

export default {
  props: {
    qtmp: Object,
    taskId: Number
  },
  data() {
    return {
      msg: "child",
      isEditDesc: false,
      //text: "?????????????????????????????????????????",
      // desc: "请在此处编辑你的问题描述",
      // opts: [
      //   { content: "选项111111111", isEdit: false },
      //   { content: "选项2", isEdit: false },
      //   { content: "选项3", isEdit: false },
      //   { content: "选项4", isEdit: false }
      // ],
      opt: 0,
      url:""
    };
  },
  methods: {
    getAns(){
      let tem={
        index:this.qtmp.index,
        ans:this.opt
      }
      return tem;
    },
    trans(){
      var tid_=encryptBy(this.taskId);
      var wid_=encryptBy(this.wid)
    }
  },
  mounted: function() {
    axios
      .get("/api/worker/find-myself")
      .then(response => {
        this.wid = response.data.worker.id;
        
      });
    axios
      .get("/api/task/find-by-id", { params: { id: this.taskId } })
      .then(response => {
        this.url = response.data.task.resourceLink;
        console.log(this.url,"url")
      });
  }
};
</script>

<style scoped>
.el-button {
  font-size: 16pt;
}
</style>

