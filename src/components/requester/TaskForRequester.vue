<template>
  <div>
    <el-row class="task-item">
      <el-col :span="5" :offset="1">{{task.area}}</el-col>
      <el-col :span="5" :offset="1">{{taskName}}</el-col>
      <el-col :span="5" :offset="1">{{task.timeLimitation}} 天</el-col>
      <el-col :span="5" :offset="1">
        <el-button @click="dialogVisible = true" size="small">查看详情</el-button>
      </el-col>
    </el-row>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="50%">
      <el-row>
        <span class="dialog-span">任务标题：</span>
        {{task.name}}
      </el-row>
      <el-row>
        <span class="dialog-span">相关领域：</span>
        {{task.area}}
      </el-row>
      <el-row>
        <span class="dialog-span">题目数量：</span>
        {{task.numberOfQuestions}}
      </el-row>
      <el-row>
        <span class="dialog-span">奖励/题：</span>
        {{task.reward}}
      </el-row>
      <el-row>
        <span class="dialog-span">份数：</span>
        {{task.population}}
      </el-row>
      <el-row>
        <span class="dialog-span">时间范围：</span>
        {{task.startTime}} 至 {{task.endTime}}
      </el-row>

      <el-row>
        <span class="dialog-span">年龄范围：</span>
        {{task.minAge}} 至 {{task.maxAge}}岁
      </el-row>
      <el-row>
        <span class="dialog-span">任务描述：</span>
        {{task.description}}
      </el-row>
      <el-row></el-row>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <router-link v-bind:to="'/requester-answer/'  + task.id + '/' +task.type" target="_blank">
          <el-button type="primary" @click="getAns">查看答案</el-button>
        </router-link>
        <router-link v-bind:to="'/requester/project/preview/' + task.id" target="_blank">
          <el-button type="primary" @click="dialogVisible = false">查看详情</el-button>
        </router-link>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios/index";

export default {
  name: "TaskForAdmin",
  data() {
    return {
      dialogVisible: false,
      taskName: "",
      ans: {}
    };
  },
  props: {
    task: Object
  },
  mounted() {
    if (this.task.name.length >= 10) {
      this.taskName = this.task.name.slice(0, 10) + " ...";
    } else {
      this.taskName = this.task.name.slice(0, 10);
    }
    
  },
  methods: {
    getAns() {
      axios
        .get("/api/answer/find-by-task-id", {
          params: { taskId: this.task.id }
        })
        .then(response => {
          console.log(response.data.Answers);
        });
      //console.log(this.task);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-item {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
  font-size: 13px;
}

.el-dialog .el-row {
  font-size: 15px;
  line-height: 30px;
}

.dialog-span {
  width: 100px;
  display: inline-block;
  text-align: right;
  margin-right: 10px;
}
</style>
