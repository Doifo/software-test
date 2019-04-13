<template>
  <div>
    <RequesterHomepageTopbar></RequesterHomepageTopbar>
    <el-row>
      <el-col :span="2" :offset="3">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">模板选择</p>
      </el-col>
      <el-col :span="2">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">编辑项目</p>
      </el-col>
      <el-col :span="2">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">设计布局</p>
      </el-col>
      <el-col :span="2">
        <p style="color:#1471eb;font-size:20px;margin-top:50px;">预览并完成</p>
      </el-col>
    </el-row>
    <project-templates-choose @submitForm="handleSubmitForm" v-show="step==0"></project-templates-choose>
    <project-base-info-edit @submitForm="handleSubmitForm" v-show="step==1"></project-base-info-edit>
    <project-layout-edit :qtype="qtype" :qtmp="qtmp" @submitForm="handleSubmitForm" v-show="step==2"></project-layout-edit>
    <project-preview @submitForm="handleSubmitForm" v-show="step==3"></project-preview>
  </div>
</template>

<script>
import RequesterHomepageTopbar from '@/components/navi/RequesterHomepageTopbar.vue';
import ProjectBaseInfoEdit from "@/components/requester/ProjectBaseInfoEdit"
import ProjectLayoutEdit from "@/components/requester/ProjectLayoutEdit"
import ProjectPreview from "@/components/requester/ProjectPreview"
import ProjectTemplatesChoose from '@/components/requester/ProjectTemplatesChoose'
import axios from "axios"

export default {
  name: "RequesterEditproject",
  data() {
    return {
      step: 2,
      taskId: 62,
      baseInfo:{},
      qtype:"ver1",
      qtmp:{},
    };
  },
  components: {
    RequesterHomepageTopbar,
    ProjectTemplatesChoose,
    ProjectBaseInfoEdit,
    ProjectLayoutEdit,
    ProjectPreview
  },
  methods: {
    handleSubmitForm: function(form) {
      if(form.formType=='projectTemplate'){        
        this.baseInfo['type']=form.para.qtype;    
        this.qtype=form.para.qtype;
        this.qtmp=form.para.qtmp;
        console.log(this.qtype);
        console.log(this.qtmp);
        this.step=1;
      }
      else if(form.formType=='baseInfo'){
        for(let key in form.para){
          this.baseInfo[key]=form.para[key];
        }
        console.log(this.baseInfo);

        let para = new URLSearchParams();
        for(let key in form.para){
          para.append(key,form.para[key]);
        }
        alert('该项目被分配到的taskId为'+this.taskId)
        // axios.post('/api/task/add',para).then(response=>{
        //   alert("提交成功");
        //   //console.log(response.data);
        //   this.taskId=response.data.taskId;
        // }).catch(response=>{
        //   alert("error");
        // })
        this.step=2;
      }
      else if(form.formType=='layout'){
        this.step=3;
      }
      else{
        alert('保存')
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
</style>
