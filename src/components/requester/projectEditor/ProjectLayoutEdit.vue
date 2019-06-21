<template>
  <div style="width:75%;margin:auto">

    <el-row style="padding: 20px; padding-top: 0">
      <el-col :span="8" :offset="8">
        <strong style="color: #5a9ef7; font-size: 20pt">编辑问题模板的布局</strong>
      </el-col>
    </el-row>
    <question-ver1-editor :qtmp="qtmp" ref="ver1" :taskId="taskId" v-if="qtype=='ver1'"></question-ver1-editor>
    <question-ver2-editor :qtmp="qtmp" ref="ver2" :taskId="taskId" v-if="qtype=='ver2'"></question-ver2-editor>
    <question-ver3-editor :qtmp="qtmp" ref="ver3" :taskId="taskId" v-if="qtype=='ver3'"></question-ver3-editor>
    <question-ver4-editor :qtmp="qtmp" ref="ver4" :taskId="taskId" v-if="qtype=='ver4'"></question-ver4-editor>
    <question-ver5-editor :qtmp="qtmp" ref="ver5" :taskId="taskId" v-if="qtype=='ver5'"></question-ver5-editor>
    <question-ver6-editor :qtmp="qtmp" ref="ver6" :taskId="taskId" v-if="qtype=='ver6'"></question-ver6-editor>
    <div style="text-align:right; margin:auto">
      <el-button @click="submitForm" type="primary" style="margin-top:20px">下一步</el-button>
    </div>
  </div>
</template>

<script>
import QuestionVer1Editor from "@/components/requester/questionEditor/QuestionVer1Editor";
import QuestionVer2Editor from "@/components/requester/questionEditor/QuestionVer2Editor";
import QuestionVer3Editor from "@/components/requester/questionEditor/QuestionVer3Editor";
import QuestionVer4Editor from "@/components/requester/questionEditor/QuestionVer4Editor";
import QuestionVer5Editor from "@/components/requester/questionEditor/QuestionVer5Editor";
import QuestionVer6Editor from "@/components/requester/questionEditor/QuestionVer6Editor";
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
    QuestionVer5Editor,
    QuestionVer6Editor
  },
  methods: {
    submitForm: function() {
      let form = {
        formType: "layout",
        para: { msg: this.msg }
      };
      this.$refs[this.qtype].submitUpload();
      setTimeout(()=>{
        this.$emit("submitForm", form);
      },3000)
      //this.$emit("submitForm", form);
    }
  },
};
</script>
