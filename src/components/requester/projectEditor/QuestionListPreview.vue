<template>
  <div>
    <div
      v-for="(item,index) in showedQuestions"
      :key="index"
      style="margin-top:50px; border: #efefef 2px solid; padding:20px; padding-top:30px; border-radius:10px; background-color: white"
    >
      <component :is="qtype" :qtmp="item" :ref="index"></component>
    </div>
    <p style="text-align:center"><el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="tmpList.length"
      :current-page.sync="curPage"
      @current-change="handleCurrentChange"
    ></el-pagination></p>
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
  props: {
    tid: Number
  },
  data() {
    return {
      //tid:83,
      qtype: "",
      tmpList: [],
      ansList: [],
      taskInfo: {},
      pageSize:2,
      curPage:1
    };
  },
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4,
    QuestionVer5
  },
  computed: {
    showedQuestions() {
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      let tem=this.tmpList.slice(fst,lst);
      
      return tem;
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.curPage = val;
      //alert(val);
    },
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
      //console.log(this.ansList);
    },
    test() {
      axios
        .get("/api/answer/find-my-answer")
        .then(response => {
          //console.log(response.data);
        })
        .catch(response => {
          alert("error");
        });
    }
  },
  mounted() {
    //alert(this.tid);
    axios
      .get("/api/task/find-by-id", { params: { id: this.tid } })
      .then(response => {
        // console.log(response.data);
        this.qtype = "question" + "-" + response.data.task.type;
        this.taskInfo = response.data.task;
        this.$emit("taskInfoLoaded",this.taskInfo);
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
              } else if(this.qtype=="question-ver5"){
                tmp={
                  desc: desc,
                  opts: opts,
                  context: urls[i].context,
                  intent: urls[i].intent,
                  index: urls[i].index
                };
              }
              else {
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
<style>
  .el-scrollbar{
    height:100%;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>
