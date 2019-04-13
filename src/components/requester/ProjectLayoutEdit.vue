<template>
  <div style="width:75%;margin:auto">

    <question-ver1-editor :qtmp="qtmp" ref="ver1" :taskId="taskId"></question-ver1-editor>

    <div style="text-align:right; width:75%; margin:auto">
      <el-button @click="submitForm" type="primary" style="margin-top:20px">下一步</el-button>
    </div>
  </div>
</template>

<script>
import QuestionVer1Editor from "@/components/requester/layout/QuestionVer1Editor";
export default {
  name: "ProjectLayoutEdit",
  props: {
    //qtype: String,
    //qtmp:Object
  },
  data() {
    return {
      msg:'parent',
      
      taskId:62,
      qtype:'ver1',
      qtmp: {
        desc: "请判断此图中的人的职业",
        opts: [
          { content: "学生", isEdit: false },
          { content: "教官", isEdit: false },
          { content: "历史老师", isEdit: false },
          { content: "军人", isEdit: false }
        ],
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555094734309&di=07cbcb8b48caf576f0a15a3a82eb5a6e&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F96b2b684gy1fdoq0sis5mj20go0godhw.jpg"
      }
    }
  },
  components: {
    QuestionVer1Editor
  },
  methods: {
    submitForm: function() {
      let form = {
        formType: "layout",
        para: { msg: this.msg }
      };
      this.$refs[this.qtype].submitUpload();
      this.$emit("submitForm", form);
    }
  }
};
</script>
