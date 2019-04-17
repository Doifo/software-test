<template>
  <div style="width:75%;margin:0 auto;">
    <question-list-preview :tid="taskId"></question-list-preview>
    <el-button @click="submitForm">完成</el-button>
  </div>
</template>

<script>
import QuestionListPreview from '@/components/requester/QuestionListPreview'

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
