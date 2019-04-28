<template>
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
    <h3>任务答案：</h3>
    <el-collapse>
      <el-collapse-item
        v-for="answer in answers"
        :key="answer.id"
      >
        <template slot="title">
          <span class="title">Worker ID：{{answer.workerId}}</span>
        </template>
        <el-row>
          <el-col
            style="padding:5px;"
            :span="4"
            v-for="oneanswer in JSON.parse(answer.answer)"
            :key="oneanswer.index "
          >
            <el-collapse >
              <el-collapse-item v-bind:title="'第'+ oneanswer.index + '题'">
                <component :is="type" :answer="oneanswer" :taskId="id"></component>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import axios from "axios";
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
      task: {},
      
    };
  },
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4
  },
  methods: {},
  mounted() {
    axios
      .get("/api/answer/find-by-task-id", {
        params: { taskId: this.id }
      })
      .then(response => {
        this.answers = response.data.Answers;
      });
    axios
      .get("/api/task/read-resource", { params: { taskId: this.id } })
      .then(response => {
        this.task = response.data;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  background: #ccc;
  padding: 5px;
}

#requester-answer {
  width: 90%;
  margin: 0 auto;
}
.opts {
  list-style: none;
  padding: 0px;
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

.title{
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
}
</style>
