<template>
  <div style="margin:auto">
    <div
      v-for="(ans,index) in qtmp.prevAnsList"
      :key="index"
      style="margin-bottom:50px; border:#efefef 4px solid; padding:20px; border-radius:10px"
    >
      <h2>第{{index+1}}份参考答案</h2>
      <component :is="qtmp.qtype" :qtmp="qtmp.baseTmp" :ref="index" :prevAns="ans"></component>
      <el-row style="margin-top: 20px">
        <el-col :span="9" style="text-align: right">
          <strong>请判断正误</strong>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-radio-group v-model="qtmp.acList[index]">
            <el-radio :label="0">错误</el-radio>
            <el-radio :label="1">正确</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:50px; border:#efefef 4px solid; padding:20px; border-radius:10px">
      <h2>你的答案</h2>
      <component :is="qtmp.qtype" :qtmp="qtmp.baseTmp" ref="qta"></component>
      <el-button @click="getAns">测试</el-button>
    </div>
    <!-- <div style="text-align:right; margin-top:20px">
      <el-button type="primary" @click="submitAnswer">提交答案</el-button>
      <el-button @click="test">测试</el-button>
    </div> -->
  </div>
</template>

<script>
import QuestionVer1 from "@/components/questions/QuestionVer1";
import QuestionVer2 from "@/components/questions/QuestionVer2";
import QuestionVer3 from "@/components/questions/QuestionVer3";
import QuestionVer4 from "@/components/questions/QuestionVer4";
import QuestionVer5 from "@/components/questions/QuestionVer5";
import axios from "axios/index";
export default {
  props:{
    qtmp: Object,
  },
  data() {
    return {
      qtype: "",
      tmpList: [],
      ansList: [],
      tfList: [],
      taskInfo: {},
      judgeList:[]
    };
  },
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4,
    QuestionVer5
  },
  methods: {
    dateToString(draftTimeV) {
      draftTimeV = draftTimeV + "";
      let date = "";
      let month = new Array();
      month["Jan"] = 1;
      month["Feb"] = 2;
      month["Mar"] = 3;
      month["Apr"] = 4;
      month["May"] = 5;
      month["Jun"] = 6;
      month["Jul"] = 7;
      month["Aug"] = 8;
      month["Sep"] = 9;
      month["Oct"] = 10;
      month["Nov"] = 11;
      month["Dec"] = 12;
      let str = draftTimeV.split(" ");
      date = str[3] + "-";
      date = date + month[str[1]] + "-" + str[2] + " " + str[4];
      return date;
    },
    submitAnswer() {
      for (let i = 0; i < this.tmpList.length; ++i) {
        let tem = this.$refs[i][0].getAns();
        this.ansList.push(tem);
      }
      // console.log(this.ansList);
      // console.log(this.tmpList);
      let date = new Date();
      let dateStr = this.dateToString(date);
      let para = new URLSearchParams();
      para.append("task_id", this.taskInfo.id);
      para.append("answer_time", dateStr);
      para.append("answer", JSON.stringify(this.ansList));
      axios
        .post("/api/answer/add", para)
        .then(response => {
          alert("提交成功");
          //console.log(response.data);
          console.log(response.data);
        })
        .catch(response => {
          alert("error");
        });
    },
    getAns() {
      let tem=this.$refs['qta'].getAns();
      console.log(tem);
      return tem;
    },
    getJudges(){
      return this.qtmp.acList;
    },
    test(){
      axios.get('/api/answer/find-my-answer').then(response=>{
        console.log(response.data);
      }).catch(response=>{
        alert('error');
      })
    },
  },
  mounted() {
    //console.log(this.qtmp);
    //alert(this.qtmp.prevAnsList.length);
    console.log("aclist:"+this.qtmp.acList);
    console.log(this.qtmp);
  }
};
</script>
