<template>
  <el-collapse-item>
    <template slot="title">
      <el-row style="width:100%;padding-left:30px">
        <el-col :span="6">
          <!-- <i class="el-icon-circle-plus"></i>上海某公司 -->
          {{taskInfo.area || "无"}}
        </el-col>
        <el-col :span="6">{{taskInfo.name}}</el-col>
        <el-col :span="3">{{minNumber}}</el-col>
        <el-col :span="3">¥{{taskInfo.reward}}/条</el-col>
        <el-col :span="3">{{taskInfo.start_time}}</el-col>
        <el-col :span="3">
          <el-button type="warning" @click.stop="confirmAdd">接受任务</el-button>
        </el-col>
      </el-row>
    </template>
    <div style="padding-left:30px;">
      <el-row style="margin-top:20px;">
        <el-col :span="8">分配时间：{{taskInfo.time_limitation}}分钟</el-col>
        <el-col :span="8">过期时间：{{taskInfo.end_time}}</el-col>
        <el-col :span="8">资格要求：{{taskInfo.restrictions}}</el-col>
      </el-row>
      <p>描述：{{taskInfo.description}}</p>
    </div>
  </el-collapse-item>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskForWorker",
  props: {
    taskInfo: Object
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
      minNumber:0
    };
  },
  methods: {
    confirmAdd() {
      this.$prompt("请选择要接受的题目数量", "选择题数", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: "输入不合法"
      })
        .then(num => {
          console.log("taskInfo:", num.value);

          if (num.value > this.minNumber) {
            this.$alert("超出题目数量", "警告", {
              confirmButtonText: "重新选择",
              callback: action => {
                this.confirmAdd();
              }
            });
          } else {
            this.$confirm("确定接受任务吗？", "接受任务", {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                let param = new URLSearchParams();
                param.append("number_wanted", num.value);
                param.append("task_id", this.taskInfo.id);
                param.append("created_time", this.taskInfo.start_time);
                param.append("deadline", this.taskInfo.end_time);
                
                axios
                  .post("/api/sub-task/add", param)
                  .then(response => {
                    this.$alert("接受任务成功", "接受", {
                      confirmButtonText: "确定",
                      callback: action => {
                        this.$router.go(0);
                      }
                    });
                  })
                  .catch(response => {
                    console.log("error:", response);
                  });
              })
              .catch(() => {
                console.log("cancel");
              });
          }
        })
        .catch(() => {});
    },
    gotoAnswer() {
      console.log(this.taskInfo);
      this.$router.push({
        path: "/QList",
        query: {
          tid: this.taskInfo.id
        }
      });
    }
  },
  mounted: function() {
    console.log("one task answer", this.taskInfo.answer);
    let minNumber = 65525;
    let restQuestion = JSON.parse(this.taskInfo.rest_of_question)
    for(let key in restQuestion){
      for(let item of restQuestion[key]){
        if(minNumber > item.end - item.begin + 1){
          minNumber = item.end - item.begin + 1
        }
      }
    }
    console.log(minNumber)
    this.minNumber = minNumber
  }
};
</script>
