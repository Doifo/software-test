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
              <!--answerver0-5-->
            <div style="width: 100%; margin: auto">
              <div style="width: 100%; margin: 20px;text-align:center;padding:20px;background-color:#fff;border-radius:4px">
              <p>请点击下面的链接完成问卷</p>
              <p><a :href="this.mainTaskInfo.resourceLink">调查问卷</a></p>
              <el-input v-model="responseGuid" placeholder="请输入responseGuid"></el-input>
                </div>
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
                  {{mainTaskInfo.name}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>请求机构</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{mainTaskInfo.institutionName}}
                </el-col>
              </el-row>
            </el-row>
            <el-row style="background-color: white; margin-top: 15px; width: 100%; border-radius: 5px; padding: 20px">
              <el-row>
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>涉及领域</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{mainTaskInfo.area}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <strong style="font-size: 16pt">任务描述</strong>
                <el-input type="textarea" style="margin-top: 15px;" :autosize="{ minRows: 2, maxRows: 2}"  v-model="mainTaskInfo.description" readonly></el-input>

              </el-row>
            </el-row>
            <el-row style="background-color: white; margin-top: 15px; width: 100%; border-radius: 5px; padding: 20px">
              <el-row>
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>每题奖励</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  ￥{{mainTaskInfo.reward}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="12" style="font-size: 16pt; text-align: left">
                  <strong>题目总数</strong>
                </el-col>
                <el-col :span="10" style="font-size: 16pt; text-align: right">
                  {{mainTaskInfo.numberOfQuestions}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="10" style="font-size: 16pt; text-align: left">
                  <strong>截止时间</strong>
                </el-col>
                <el-col :span="12" style="font-size: 12pt; text-align: right">
                  {{mainTaskInfo.endTime}}
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
      judgeList:[],
      mainTaskInfo:{},
      responseGuid:''
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
    shoudShow(index){
      let fst=(this.curPage-1)*this.pageSize;
      let lst=this.curPage*this.pageSize;
      return index >= fst && index < lst;


    },
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
              
                  this.ansList.push(this.responseGuid);
                 //console.log(JSON.stringify(this.ansList),"1") 
                let answerString="[{'ans':0, 'index': 1}]"
                console.log(answerString,"answerString")

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
                console.log(para,"para")
                if(this.taskInfo.type != 0){
                  para.append("isCorrect",JSON.stringify(this.judgeList))
                }
                console.log(
                  this.taskInfo.taskId,
                  dateStr,
                  JSON.stringify(this.ansList),
                  this.taskInfo.id,
                  this.taskInfo.nowBegin,
                  parseInt(this.taskInfo.nowBegin) + parseInt(num.value - 1)
                );
                alert("OK");
                axios
                  .post("/api/answer/update", para)
                  .then(response => {
                    alert("提交成功");
                    this.$router.push("/worker/task");
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

        axios
          .get("/api/task/find-by-id", { params: {id:this.taskInfo.taskId} })
          .then(response=>{
            console.log("66666");
            console.log(response.data);
            this.mainTaskInfo=response.data.task;
          });

        
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
