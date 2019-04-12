<template>
  <div style="width:75%;margin:0 auto;">
    <div>{{msg}}</div>
    <el-button @click="submitForm">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "ProjectLayoutEdit",
  data() {
    return {
      msg: "问题布局设计界面"
    };
  },
  methods: {
    submitForm: function() {
        let para={
            formType:'layout',
            msg:this.msg,
        }
        this.$emit('submitForm',para);
    }
  }
};
</script>
