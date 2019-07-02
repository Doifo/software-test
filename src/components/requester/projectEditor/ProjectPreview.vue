<template>
  <div style="width:75%;margin:0 auto; padding: 40px; border: #efefef 2px solid">
<!--    <question-list-preview :tid="taskId"></question-list-preview>-->
    <el-row style="text-align: center">
      <strong style="font-size: 24pt">恭 喜 你 ！！！</strong>
    </el-row>
    <el-row style="text-align: center; font-size: 20pt; margin-top: 20px">
      您已完成创建任务的所有步骤
    </el-row>
    <el-row style="text-align: center; font-size: 20pt; margin-top: 20px">
      您的项目已经成功创建
    </el-row>
    <el-row style="text-align: center; font-size: 20pt; margin-top: 20px">
      你可以在我的任务界面查看项目的详细信息
    </el-row>
    <el-row style="text-align: center; font-size: 20pt; margin-top: 20px">
      在项目被完成后你可以选择导出答案
    </el-row>
    <el-row style="text-align: center; font-size: 20pt; margin-top: 20px">
      您可以点击下方的预览任务进行快速预览
    </el-row>
    <el-row style="text-align: center; font-size: 20pt; margin-top: 20px">
      你也可以点击完成按钮结束编辑
    </el-row>
    <el-row>
      <router-link v-bind:to="'/requester/project/preview/' +taskId" target="_blank">
        <el-button type="primary" @click="dialogVisible = false">查看详情</el-button>
      </router-link>
      <el-button @click="submitForm">完成</el-button>
    </el-row>

  </div>
</template>

<script>
import QuestionListPreview from '@/components/requester/projectEditor/QuestionListPreview'

export default {
  props:{
    taskId:Number
  },
  name: "ProjectPreview",
  data() {
    return {
      msg: "预览界面"
    };
  },
  components:{
    QuestionListPreview
  },
  methods: {
    submitForm: function() {
      let para = {
        formType: "save",
        msg: this.msg
      };
      this.$emit("submitForm", para);
    }
  }
};
</script>
