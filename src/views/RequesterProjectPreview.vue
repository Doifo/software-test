<template>
  <el-container>
    <el-header style="padding: 0; height: 80px">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="width: 10%; padding: 0">
          <RequesterAsideNav/>
        </el-aside>
        <el-main style="padding: 0; background-color: #efefef">
          <el-col :span="16" style="margin-left: 40px" >
            <div style="width: 100%; margin: auto">
              <QuestionListPreview  @taskInfoLoaded="getTaskInfo" :tid="taskId"/>
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
  import CommonHeadNav from '@/components/public/CommonHeaderNav'
  import RequesterAsideNav from '@/components/public/RequesterAsideNav'
  import Footer from '@/components/public/Footer'
  import QuestionListPreview from '@/components/requester/projectEditor/QuestionListPreview'

  import axios from 'axios'

  export default {
    name: "RequesterProjectPreview",
    components:{
      CommonHeadNav,
      RequesterAsideNav,
      Footer,
      QuestionListPreview
    },
    data(){
      return{
        taskId:parseInt(this.$route.params.tid),
        taskInfo:{}
      }
    },
    methods:{
      getTaskInfo(data){
        this.taskInfo=data;
        console.log(data);
        alert(data.name);
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
