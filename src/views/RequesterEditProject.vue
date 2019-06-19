<template>
  <el-container>
    <el-header style="height: 80px; padding: 0">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="padding: 0; width: 10%">
          <RequesterAsideNav/>
        </el-aside>
        <el-main style="padding: 0">
          <div>
            <el-row style="border: #efefef 2px solid">
              <el-col :span="2" :offset="3">
                <p style="color: #5a9ef7 ;font-size:20px;margin-top:50px;">
                  <strong>模板选择</strong>
                </p>
              </el-col>
              <el-col :span="2">
                <p style="color: #5a9ef7;font-size:20px;margin-top:50px;">
                  <strong>编辑项目</strong>
                </p>
              </el-col>
              <el-col :span="2">
                <p style="color: #5a9ef7;font-size:20px;margin-top:50px;">
                  <strong>设计布局</strong>
                </p>
              </el-col>

              <el-col :span="2">
                <p style="color: #5a9ef7;font-size:20px;margin-top:50px;">
                  <strong>项目预览</strong>
                </p>
              </el-col>

<!--              <el-col :span="2" :offset="8">-->
<!--                <p @click="cancel" style="color:#5a9ef7;font-size:20px;margin-top:50px;cursor:pointer">-->
<!--                  <strong>取消创建</strong>-->
<!--                </p>-->
<!--              </el-col>-->
            </el-row>
            <project-templates-choose @submitForm="handleSubmitForm" v-if="step===0"></project-templates-choose>
            <project-base-info-edit @submitForm="handleSubmitForm" v-if="step===1"></project-base-info-edit>
            <project-layout-edit
              :qtype="qtype"
              :qtmp="qtmp"
              :taskId="taskId"
              @submitForm="handleSubmitForm"
              v-if="step===2"
              class=""
              style="padding: 15px"
            ></project-layout-edit>
            <project-preview @submitForm="handleSubmitForm" :taskId="taskId" v-if="step===3"></project-preview>
          </div>
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="padding: 0">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
import CommonHeadNav from '@/components/public/CommonHeaderNav'
import RequesterAsideNav from '@/components/public/RequesterAsideNav'
import Footer from '@/components/public/Footer'

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
    ProjectTemplatesChoose,
    ProjectBaseInfoEdit,
    ProjectLayoutEdit,
    ProjectPreview,
    CommonHeadNav,
    RequesterAsideNav,
    Footer
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
