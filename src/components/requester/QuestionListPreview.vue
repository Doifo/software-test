<template>
  <div style="width:75%; margin:auto">
    <h1 style="text-align:center">{{taskInfo.name}}</h1>
    <div
      v-for="(item,index) in tmpList"
      :key="index"
      style="margin-top:50px; border:blue 1px solid; padding:20px; border-radius:10px"
    >
      <component :is="qtype" :qtmp="item" :ref="index"></component>
    </div>
    <div style="text-align:right; margin-top:20px">
      <el-button type="primary" @click="submitAnswer">模拟提交</el-button>
    </div>
  </div>
</template>

<script>
import QuestionVer1 from "@/components/QuestionVer1";
import QuestionVer2 from "@/components/QuestionVer2";
import QuestionVer3 from "@/components/QuestionVer3";
import QuestionVer4 from "@/components/QuestionVer4";
import axios from "axios";
export default {
  props: {
    tid: Number
  },
  data() {
    return {
      //tid:83,
      qtype: "",
      tmpList: [],
      ansList: [],
      taskInfo: {}
    };
  },
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4
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
      console.log(this.ansList);
    },
    test() {
      axios
        .get("/api/answer/find-my-answer")
        .then(response => {
          console.log(response.data);
        })
        .catch(response => {
          alert("error");
        });
    }
  },
  mounted(){
    alert(this.tid);
      axios
        .get("/api/task/find-by-id", { params: { id: this.tid } })
        .then(response => {
          // console.log(response.data);
          this.qtype = "question" + "-" + response.data.task.type;
          this.taskInfo = response.data.task;
          axios
            .get("/api/task/read-resource", { params: { taskId: this.tid } })
            .then(response => {
              let res = response.data;
              let urls = res.urls;
              let opts = res.opts;
              let desc = res.desc;
              for (let i = 0; i < urls.length; ++i) {
                let tmp = {};
                if (this.qtype == "question-ver4") {
                  tmp = {
                    desc: desc,
                    opts: opts,
                    text: urls[i].text,
                    index: urls[i].index
                  };
                } else {
                  tmp = {
                    desc: desc,
                    opts: opts,
                    url: urls[i].url,
                    index: urls[i].index
                  };
                }
                this.tmpList.push(tmp);
              }
            })
            .catch(response => {
              alert("error");
            });
        });
  }
};
</script>
