<template>
  <div style="width:75%;margin:0 auto;">
    {{msg}}
    <el-button @click="submitForm">完成</el-button>
  </div>
</template>

<script>
export default {
  name: "ProjectPreview",
  data() {
    return {
      msg: "预览界面"
    };
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
