<template>
    <div style="width:75%; margin:auto">
      <h1 style="text-align:center">{{taskInfo.name}}</h1>
      <div v-for="(item,index) in tmpList" :key="index" style="margin-top:50px; border:blue 1px solid; padding:20px; border-radius:10px">
        <component :is="qtype" :qtmp="item" :ref="index"></component>
      </div>
      <div style="text-align:right; margin-top:20px">
        <el-button type="primary" @click="submitAnswer">提交答案</el-button>
      </div>
    </div>
</template>

<script>
import QuestionVer1 from '@/components/QuestionVer1'
import QuestionVer2 from '@/components/QuestionVer2'
import QuestionVer3 from '@/components/QuestionVer3'
import QuestionVer4 from '@/components/QuestionVer4'
import axios from 'axios'
export default {
  data() {
    return {
        qtype:'',
        tmpList:[],
        ansList:[],
        taskInfo:{}
    };
  },
  components:{
      QuestionVer1,
      QuestionVer2,
      QuestionVer3,
      QuestionVer4
  },
  methods:{
    submitAnswer(){
      for(let i=0; i<this.tmpList.length; ++i){
        let tem=this.$refs[i][0].opt;
        this.ansList.push(tem);
      }
      console.log(this.ansList)
    }
  },
  mounted(){
      axios.get("/api/task/read-resource", {params: {taskId: "75"}})
      .then(response => {
        let res=response.data
        let urls = res.urls;
        let opts = res.opts;
        let desc=res.desc;
        for(let i=0; i<urls.length; ++i){
            let tmp={
                desc: desc,
                opts: opts,
                text: urls[i].text
            }
            this.tmpList.push(tmp);
        }
      })
      .catch(response => {
        alert("error");
      });

      axios.get("/api/task/find-by-id",{params: {id: "75"}})
      .then(response=>{
        // console.log(response.data);
        this.qtype='question'+'-'+response.data.task.type;
        this.taskInfo=response.data.task;
      })

  }
};
</script>
