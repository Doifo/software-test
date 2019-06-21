<template>
  <el-container>
    <el-header style="height: 80px; padding: 0">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="padding: 0; width: 10%">
          <RequesterAsideNav/>
        </el-aside>
        <el-main style="padding: 0; padding-bottom: 50px">
          <div id="requester-answer">
            <h3>任务描述：</h3>
            <p>{{task.desc}}</p>
            <h3>任务选项：</h3>
            <ul class="opts">
              <li
                v-for="opt in task.opts"
                :key="opt.content"
                v-bind:style="{background:opt.color}"
              >{{opt.content}}</li>
            </ul>
            <h3>任务状态：</h3>
            <p>{{taskStatus}}</p>
            <el-row v-for="(ansList, index) in answers" :key="index" style="margin-top: 15px; width: 60%">
              <el-row><strong style="font-size: 16pt">第{{index+1}}份数据集</strong></el-row>
              <el-row style="margin-top: 10px; font-size: 14pt">
                <el-col :span="3">收集进度:</el-col>
                <el-col :span="21">
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="ansProgress[index]*100"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px; font-size: 14pt" v-show="isFinished==true">
                <el-col :span="3">准确率:</el-col>
                <el-col :span="21">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="parseInt(correctListRate[index]*100)" status="success"></el-progress>
                </el-col>
              </el-row>
              <el-row>
                <el-button type="text" @click="exportAns(index)">导出答案</el-button>
              </el-row>
            </el-row>
            <el-row style="margin-top: 15px; width: 60%">
              <el-row><strong style="font-size: 16pt">验证校验集</strong></el-row>
              <el-row style="margin-top: 10px; font-size: 14pt">
                <el-col :span="3">收集进度:</el-col>
                <el-col :span="21">
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="valProgress*100"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px; font-size: 14pt" v-show="isFinished==true">
                <el-col :span="3">准确率:</el-col>
                <el-col :span="21">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
                </el-col>
              </el-row>
              <el-row>
                <el-row>
                  <el-button type="text" @click="exportAns(2)">导出答案</el-button>
                </el-row>
              </el-row>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="padding: 0">
      <Footer/>
    </el-footer>
  </el-container>
</template>


<script>

import axios from "axios";
import CommonHeadNav from '@/components/public/CommonHeaderNav'
import RequesterAsideNav from '@/components/public/RequesterAsideNav'
import Footer from '@/components/public/Footer'

import QuestionVer1 from "@/components/answer/QuestionType1.vue";
import QuestionVer2 from "@/components/answer/QuestionType2.vue";
import QuestionVer3 from "@/components/answer/QuestionType3.vue";
import QuestionVer4 from "@/components/answer/QuestionType4.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      type: "question-" + this.$route.params.type,
      answers: [],
      valList: [],
      correctListRate:[],
      task: {},
      isFinished:false,
      taskInfo:{}
    };
  },
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4,
    CommonHeadNav,
    RequesterAsideNav,
    Footer
  },
  computed:{
    ansProgress(){
      let ret=[];
      for(let i=0; i<this.answers.length; ++i){
        let rate=parseFloat(0);
        let cnt=parseInt(0);
        for(let j=0; j<this.answers[i].length; ++j){
          if(this.answers[i][j].isFinished===true){
            cnt=cnt+1;
          }
        }
        rate=cnt/this.answers[i].length;
        ret.push(rate);
      }
      return ret;
    },
    valProgress(){
      let rate=parseFloat(0);
      let cnt=parseInt(0);
      for(let i=0; i<this.valList.length; ++i){
        if(this.valList[i].isFinished===true){
          cnt=cnt+1;
        }
      }
      return rate=cnt/this.valList.length;
    },
    taskStatus(){
      if(this.taskInfo.status==0){
        return "答案收集中"
      }
      else if(this.taskInfo.status==1){
        return "答案审核中"
      }
      else{
        return "已完成"
      }
    }
  },
  methods: {
    exportAns(index) {
      let params = new URLSearchParams();
      params.append("taskId", this.id);
      axios.post("/api/task/answer-file", params).then(response => {
        axios.get("/api/task/answer-file",{params:{taskId:this.id,no:index}}).then(response => {
          const content = response.data;
          const blob = new Blob([content]);
          const fileName = "data.txt";
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        });
      });
    }
  },
  mounted() {
    axios
      .get("/api/task/read-resource", { params: { taskId: this.id } })
      .then(response => {
        this.task = response.data;
        console.log(this.task);
      });
    axios.get('/api/task/find-answer-by-id',{params:{taskId: this.id}})
      .then(response=>{
        let tem=JSON.parse(response.data.answer);
        for(let i=0; i<tem.length-1; ++i){
          this.answers.push(tem[i]);
        }
        this.valList=tem[tem.length-1];
      });
    axios.get('/api/task/correct-rate',{params:{taskId: this.id}})
      .then(response=>{
        if(response.data.code==200) {
          this.correctListRate = response.data.correctRate;
          this.isFinished=true;
        }else {
          this.isFinished=false
        }
      });
    axios.get('/api/task/find-by-id',{params:{id: this.id}})
      .then(response=>{
        console.log("666");
        this.taskInfo=response.data.task;
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  background: #ccc;
  padding: 5px;
}

#requester-answer {
  width: 90%;
  margin: 0 auto;
}
.opts {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  display: inline;
}

.opts li {
  width: 80px;
  margin: 5px;
  font-size: 15px;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
}

.title {
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
}
</style>
