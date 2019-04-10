<template>
  <el-collapse>
    <el-collapse-item>
      <template slot="title">
        <el-row style="width:100%;padding-left:30px">
          <el-col :span="6">
            <!-- <i class="el-icon-circle-plus"></i>上海某公司 -->
            {{taskInfo.requester}}
          </el-col>
          <el-col :span="6">{{taskInfo.title}}</el-col>
          <el-col :span="3">{{taskInfo.num}}</el-col>
          <el-col :span="3">{{taskInfo.reward}}</el-col>
          <el-col :span="3">{{taskInfo.createTime}}</el-col>
          <el-col :span="3">
            <el-button type="warning" @click.stop>接受任务</el-button>
          </el-col>
        </el-row>
      </template>
      <div style="padding-left:30px;">
        <el-row style="margin-top:20px;">
          <el-col :span="6">分配时间：{{taskInfo.allocateTime}}分钟</el-col>
          <el-col :span="6">过期时间：{{taskInfo.ddl}}</el-col>
          <el-col :span="6">资格要求：等级大于2</el-col>
          <el-col :span="6">你的等级：1</el-col>
        </el-row>
        <p>描述：{{taskInfo.desc}}</p>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "TaskForWorker",
  data() {
    return {
      taskInfo: {
        tid: "1",
        requester: "上海某公司",
        title: "图片标注",
        num: 666,
        reward: 0.5,
        desc: "图片标注",
        createTime: "2018",
        ddl: "2019",
        allocateTime: 60,
        qualification: "天才"
      }
    };
  }
};
</script>
