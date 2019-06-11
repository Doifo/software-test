<template>
  <div>
    <!-- <RequesterHomepageTopbar></RequesterHomepageTopbar> -->
    <worker-header></worker-header>
    <el-row>
      <el-col :span="2" :offset="3">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">模板选择</p>
      </el-col>
      <el-col :span="4">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">编辑项目&设计布局</p>
      </el-col>

      <el-col :span="2">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">预览并完成</p>
      </el-col>

      <el-col :span="2" :offset="8">
        <p @click="cancel" style="color:#1471eb;font-size:20px;margin-top:50px;cursor:pointer">取消创建</p>
      </el-col>
    </el-row>
    <project-templates-choose @submitForm="handleSubmitForm" v-if="step==0" class="debugBox"></project-templates-choose>
    <project-base-info-edit @submitForm="handleSubmitForm" v-if="step==1"></project-base-info-edit>

    <project-layout-edit
      :qtype="qtype"
      :qtmp="qtmp"
      :taskId="taskId"
      @submitForm="handleSubmitForm"
      v-if="step==2"
      class="debugBox"
      style="padding: 15px"
    ></project-layout-edit>

    <project-preview @submitForm="handleSubmitForm" :taskId="taskId" v-if="step==3"></project-preview>
    <div v-if="step==4" style="padding-left:160px;">
        <p>请点击下面的链接完成问卷</p>
        <p><a :href="url">调查问卷</a></p>
        <el-button type="primary" @click="submitAnswer">模拟提交</el-button>
    </div>
  </div>
</template>

<script>
//import RequesterHomepageTopbar from '@/components/navi/RequesterHomepageTopbar.vue';
import WorkerHeader from "@/components/WorkerHeader";
import ProjectBaseInfoEdit from "@/components/requester/projectEditor/ProjectBaseInfoEdit";
import ProjectLayoutEdit from "@/components/requester/projectEditor/ProjectLayoutEdit";
import ProjectPreview from "@/components/requester/projectEditor/ProjectPreview";
import ProjectTemplatesChoose from "@/components/requester/projectEditor/ProjectTemplatesChoose";
import axios from "axios";

export default {
  name: "RequesterEditproject",
  data() {
    return {
      step: 0,
      taskId: 0,
      baseInfo: {},
      qtype: "ver1",
      qtmp: {},
      url:''
    };
  },
  components: {
    //RequesterHomepageTopbar,
    ProjectTemplatesChoose,
    ProjectBaseInfoEdit,
    ProjectLayoutEdit,
    ProjectPreview,
    WorkerHeader
  },
  methods: {
    submitAnswer() {
      this.$router.replace("/requester-information")
    },
    cancel() {
      console.log("ss");
      this.$router.go(0);
    },
    handleSubmitForm: function(form) {
      if (form.formType == "projectTemplate") {
        this.baseInfo["type"] = form.para.qtype;
        this.qtype = form.para.qtype;
        this.qtmp = form.para.qtmp;
        // console.log(this.qtype);
        // console.log(this.qtmp);
        this.step = 1;
      } else if (form.formType == "baseInfo") {
        this.step = 2;
        for (let key in form.para) {
          this.baseInfo[key] = form.para[key];
        }

        let para = new URLSearchParams();
        for (let key in form.para) {
          para.append(key, form.para[key]);
        }
        para.append("type", this.qtype);
        
        axios
          .post("/api/task/add", para)
          .then(response => {
            alert("提交成功");
            this.taskId = response.data.taskId;
            console.log(response)
            alert("该项目被分配到的taskId为" + this.taskId);
          })
          .catch(response => {
            alert("error");
          });
      } else if (form.formType == "layout") {
        if(this.qtype=="ver6"){
          this.step=4;
          axios
          .get("/api/task/find-by-id", { params: { id: this.taskId } })
          .then(response => {
            this.url = response.data.task.resourceLink;
            console.log(this.url,"url")
          });
          
        }
        else this.step = 3;
      } else {
        this.$router.go(0)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  background: #ccc;
  font-weight: bold;
  padding: 10px;
}

.el-input {
  width: 50%;
}

.debugBox{
  border: 1px solid black;
}
</style>
