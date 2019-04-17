<template>
  <el-collapse-item>
    <template slot="title">
      <el-row style="width:100%;padding-left:30px">
        <el-col :span="6">
          <!-- <i class="el-icon-circle-plus"></i>上海某公司 -->
          {{taskInfo.area || "无"}}
        </el-col>
        <el-col :span="6">{{taskInfo.name}}</el-col>
        <el-col :span="3">666</el-col>
        <el-col :span="3">¥{{taskInfo.reward}}/条</el-col>
        <el-col :span="3">{{taskInfo.start_time}}</el-col>
        <el-col :span="3">
          <el-button type="warning" @click="gotoAnswer">接受任务</el-button>
        </el-col>
      </el-row>
    </template>
    <div style="padding-left:30px;">
      <el-row style="margin-top:20px;">
        <el-col :span="6">分配时间：{{taskInfo.time_limitation}}分钟</el-col>
        <el-col :span="6">过期时间：{{taskInfo.end_time}}</el-col>
        <el-col :span="6">资格要求：等级大于2</el-col>
        <el-col :span="6">你的等级：1</el-col>
      </el-row>
      <p>描述：</p>
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: "TaskForWorker",
  props:{
    taskInfo: Object,
  },
  data() {
    return {
      // taskInfo: {
      //   tid: "1",
      //   requester: "上海某公司",
      //   title: "图片标注",
      //   num: 666,
      //   reward: 0.5,
      //   desc: "图片标注",
      //   createTime: "2018",
      //   ddl: "2019",
      //   allocateTime: 60,
      //   qualification: "天才"
      // }
    };
  },
  methods:{
    gotoAnswer(){
      console.log(this.taskInfo)
      this.$router.push({
        path:'/QList',
        query:{
          tid:this.taskInfo.id
        }
      })
    }
  },
  mounted:function(){
    console.log(this.taskInfo);
  }
};
</script>
