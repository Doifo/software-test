<template>
  <div>
    <el-row class="task-item">
      <el-col :span="5" :offset="1">{{task.institution_name}}</el-col>
      <el-col :span="5" :offset="1">{{taskName}}</el-col>
      <el-col :span="5" :offset="1">{{task.type}}</el-col>
      <el-col :span="5" :offset="1">
        <el-button @click="dialogVisible = true" size="small">查看详情</el-button>
      </el-col>
    </el-row>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="50%">
      <el-row>
        <span class="dialog-span">请求者：</span>
        {{task.institution_name}}
      </el-row>
      <el-row>
        <span class="dialog-span">任务标题：</span>
        {{task.name}}
      </el-row>
      <el-row>
        <span class="dialog-span">相关领域：</span>
        {{task.area}}
      </el-row>
      <el-row>
        <span class="dialog-span">任务类型：</span>
        {{task.type}}
      </el-row>
      <el-row>
        <span class="dialog-span">时间范围：</span>
        {{task.start_time}} 至 {{task.end_time}}
      </el-row>
      <el-row>
        <span class="dialog-span">年龄范围：</span>
        {{task.min_age}} 至 {{task.max_age}}岁
      </el-row>
      <el-row>
        <span class="dialog-span">任务描述：</span>
        {{task.description}}
      </el-row>
      <el-row></el-row>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认通过</el-button>
        <router-link v-bind:to="'/admin-task-detail/' + task.id" target="_blank">
          <el-button type="primary" @click="dialogVisible = false;">查看问卷详情</el-button>
        </router-link>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TaskForAdmin",
  data() {
    return {
      dialogVisible: false,
      taskName: ""
    };
  },
  props: {
    task: Object
  },
  mounted() {
    //console.log(this.task);
    if (this.task.name.length >= 10) {
      this.taskName = this.task.name.slice(0, 10) + " ...";
    } else {
      this.taskName = this.task.name.slice(0, 10);
    }
  },
  methods: {}
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
