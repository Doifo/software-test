<template>
  <el-container>
    <el-header style="padding: 0; height: 80px">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="width: 10%; padding: 0">
          <WorkerAsideNav/>
        </el-aside>
        <el-main style="padding: 0; background-color: #efefef">
          <el-col :span="16" style="margin-left: 40px" >
            <div style="width: 100%; margin: auto">
              <div
                v-for="(item,index) in showedList"
                :key="index"
                style="margin-top:50px; padding:20px; border-radius:10px; background-color: white; padding-top: 40px"
              >
                <component :is="qtype" :qtmp="item" :ref="index"></component>
              </div>
              <p style="text-align:center">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="pageSize"
                  :total="tmpList.length"
                  :current-page.sync="curPage"
                  @current-change="handleCurrentChange"
                ></el-pagination>
              </p>
            </div>
          </el-col>
          <el-col :span="6" style="margin-left: 20px">
            <el-row style="background-color: white; margin-top: 50px; width: 100%; border-radius: 5px; padding: 20px">
              <el-row>
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>项目编号</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{taskInfo.id}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>项目名称</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{taskInfo.name}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>请求机构</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{taskInfo.institutionName}}
                </el-col>
              </el-row>
            </el-row>
            <el-row style="background-color: white; margin-top: 15px; width: 100%; border-radius: 5px; padding: 20px">
              <el-row>
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>涉及领域</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{taskInfo.area}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <strong style="font-size: 16pt">任务描述</strong>
                <el-input type="textarea" style="margin-top: 15px;" :autosize="{ minRows: 2, maxRows: 2}"  v-model="taskInfo.description" readonly></el-input>

              </el-row>
            </el-row>
            <el-row style="background-color: white; margin-top: 15px; width: 100%; border-radius: 5px; padding: 20px">
              <el-row>
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>每题奖励</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  ￥{{taskInfo.reward}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>题目总数</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{taskInfo.numberOfQuestions}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="10" style="font-size: 16pt; text-align: left">
                  <strong>截止时间</strong>
                </el-col>
                <el-col :span="12" style="font-size: 12pt; text-align: right">
                  {{taskInfo.endTime}}
                </el-col>
              </el-row>
            </el-row>
            <el-row style="background-color: white; margin-top: 15px; width: 100%; border-radius: 5px; padding: 10px">
              <div style="text-align:left;">
                <el-button type="primary" @click="submitAnswer">提交答案</el-button>
                <!-- <el-button @click="test">测试</el-button> -->
              </div>
            </el-row>
          </el-col>
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="padding: 0">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
import QuestionVer0 from "@/components/questions/QuestionVer0";
import QuestionVer1 from "@/components/questions/QuestionVer1";
import QuestionVer2 from "@/components/questions/QuestionVer2";
import QuestionVer3 from "@/components/questions/QuestionVer3";
import QuestionVer4 from "@/components/questions/QuestionVer4";
import QuestionVer5 from "@/components/questions/QuestionVer5";

import CommonHeadNav from '@/components/public/CommonHeaderNav'
import WorkerAsideNav from '@/components/public/WorkerAsideNav'
import Footer from '@/components/public/Footer'

import axios from "axios/index";
export default {
  data() {
    return {
      qtype: "",
      tmpList: [],
      ansList: [],
      taskInfo: {},
      pageSize:2,
      curPage:1,
    };
  },
  components: {
    QuestionVer0,
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4,
    QuestionVer5,

    CommonHeadNav,
    WorkerAsideNav,
    Footer
  },
  computed:{
    showedList() {
      let fst=this.pageSize*(this.curPage-1);
      let lst=this.pageSize*this.curPage;
      let tem=this.tmpList.slice(fst,lst);
      
      return tem;
      //return this.allTaskList;
    }
  },
  methods: {
    handleCurrentChange(val){
      this.curPage = val;
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
      this.$prompt("请选择提交的题目数量", "选择题数", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: "输入不合法"
      })
        .then(num => {
          console.log("taskInfo:", num.value);
          if (
            parseInt(num.value) >
            parseInt(this.taskInfo.end) - parseInt(this.taskInfo.nowBegin) + 1
          ) {
            this.$alert("超出题目数量", "警告", {
              confirmButtonText: "重新选择",
              callback: action => {
                this.submitAnswer();
              }
            });
          } else {
            this.$confirm("确定提交吗？", "提交", {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                for (let i = 0; i < num.value; ++i) {
                  let tem = this.$refs[i][0].getAns();
                  this.ansList.push(tem);
                }
                let date = new Date();
                let dateStr = this.dateToString(date);
                let para = new URLSearchParams();
                para.append("taskId", this.taskInfo.taskId);
                para.append("answerTime", dateStr);
                para.append("answer", JSON.stringify(this.ansList));
                para.append("subtaskId", this.taskInfo.id);
                para.append("beginAt", this.taskInfo.nowBegin);
                para.append(
                  "endAt",
                  parseInt(this.taskInfo.nowBegin) + parseInt(num.value - 1)
                );
                console.log(
                  this.taskInfo.taskId,
                  dateStr,
                  JSON.stringify(this.ansList),
                  this.taskInfo.id,
                  this.taskInfo.nowBegin,
                  parseInt(this.taskInfo.nowBegin) + parseInt(num.value - 1)
                );
                axios
                  .post("/api/answer/update", para)
                  .then(response => {
                    alert("提交成功");
                    this.$router.push("/worker-task");
                    console.log(response.data);
                  })
                  .catch(response => {
                    alert("error");
                  });
              })
              .catch(() => {
                console.log("cancel");
              });
          }
        })
        .catch(() => {});
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
  mounted() {
    let stid = this.$route.query.stid;
    alert(stid);
    axios
      .get("/api/sub-task/find-by-sub-task-id", { params: { id: stid } })
      .then(response => {
        this.taskInfo = response.data.Subtask;
        console.log(this.taskInfo);
        if (this.taskInfo.type == 0) {
          //普通的答题任务
          this.qtype = "question" + "-" + response.data.Subtask.taskType;
          alert("OK");
          axios
            .get("/api/sub-task/read-subtask-resource", {
              params: { subtaskId: stid }
            })
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
                } else if (this.qtype == "question-ver5") {
                  tmp = {
                    desc: desc,
                    opts: opts,
                    context: urls[i].context,
                    intent: urls[i].intent,
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
        } else {
          //审核型任务
          this.qtype = "question" + "-ver" + 0;
          let checkType = "question" + "-" + response.data.Subtask.taskType;
          console.log(response.data);
          alert("审核模式");
          axios
            .get("/api/sub-task/read-subtask-resource", {
              params: { subtaskId: stid }
            })
            .then(response => {
              let res = response.data;
              let urls = res.urls;
              let opts = res.opts;
              let desc = res.desc;
              axios
                .get("/api/answer/find-by-subtask-id", {
                  params: { subtaskId: stid, taskId: this.taskInfo.taskId }
                })
                .then(response => {
                  //alert('OJBK');
                  for (let i = 0; i < urls.length; ++i) {
                    let baseTmp = {};
                    if (this.qtype == "question-ver4") {
                      baseTmp = {
                        desc: desc,
                        opts: opts,
                        text: urls[i].text,
                        index: urls[i].index
                      };
                    } else {
                      baseTmp = {
                        desc: desc,
                        opts: opts,
                        url: urls[i].url,
                        index: urls[i].index
                      };
                    }
                    let tmp = {};
                    tmp.baseTmp = baseTmp;
                    tmp.qtype = checkType;
                    tmp.prevAnsList = [];
                    tmp.acList=[];

                    let ansList = JSON.parse(response.data.answers);
                    //console.log(ansList);
                    //alert(ansList.length);
                    for (let k = 0; k < ansList.length; ++k) {
                      tmp.prevAnsList.push(ansList[k][i]);
                      tmp.acList.push(0);
                    }
                    this.tmpList.push(tmp);
                  }
                });
            })
            .catch(response => {
              alert("error");
            });
        }
      });
  }
};
</script>

<style scoped>
.el-button {
  font-size: 16pt;
}
.debugBox {
  border: 1px solid black;
}
</style>
