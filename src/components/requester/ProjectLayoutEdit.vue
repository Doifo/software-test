<template>
  <div style="width:75%;margin:auto">

    <question-ver1-editor :qtmp="qtmp" ref="ver1" :taskId="taskId" v-if="qtype=='ver1'"></question-ver1-editor>
    <question-ver2-editor :qtmp="qtmp" ref="ver2" :taskId="taskId" v-if="qtype=='ver2'"></question-ver2-editor>
    <question-ver3-editor :qtmp="qtmp" ref="ver3" :taskId="taskId" v-if="qtype=='ver3'"></question-ver3-editor>
    <question-ver4-editor :qtmp="qtmp" ref="ver4" :taskId="taskId" v-if="qtype=='ver4'"></question-ver4-editor>
    <question-ver5-editor :qtmp="qtmp" ref="ver5" :taskId="taskId" v-if="qtype=='ver5'"></question-ver5-editor>
    <div style="text-align:right; width:75%; margin:auto">
      <el-button @click="submitForm" type="primary" style="margin-top:20px">下一步</el-button>
    </div>
  </div>
</template>

<script>
import QuestionVer1Editor from "@/components/requester/layout/QuestionVer1Editor";
import QuestionVer2Editor from "@/components/requester/layout/QuestionVer2Editor";
import QuestionVer3Editor from "@/components/requester/layout/QuestionVer3Editor";
import QuestionVer4Editor from "@/components/requester/layout/QuestionVer4Editor";
import QuestionVer5Editor from "@/components/requester/layout/QuestionVer5Editor";
export default {
  name: "ProjectLayoutEdit",
  props: {
    qtype: String,
    qtmp:Object,
    taskId:Number
  },
  data() {
    return {
      //taskId:75,
      msg:'parent',
      // qtype:'ver4',
      // qtmp: {
      //   desc: "请判断此图中的人的职业",
      //   opts: [
      //     { content: "学生", isEdit: false },
      //     { content: "教官", isEdit: false },
      //     { content: "历史老师", isEdit: false },
      //     { content: "军人", isEdit: false }
      //   ],
      //   url:
      //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555094734309&di=07cbcb8b48caf576f0a15a3a82eb5a6e&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F96b2b684gy1fdoq0sis5mj20go0godhw.jpg"
      // }
    }
  },
  components: {
    QuestionVer1Editor,
    QuestionVer2Editor,
    QuestionVer3Editor,
    QuestionVer4Editor,
    QuestionVer5Editor
  },
  methods: {
    submitForm: function() {
      let form = {
        formType: "layout",
        para: { msg: this.msg }
      };
      console.log(this.qtype,this.$refs[this.qtype]);
      
      this.$refs[this.qtype].submitUpload();
      this.$emit("submitForm", form);
    }
  }
};
</script>
