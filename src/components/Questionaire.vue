<template>
  <div style="border:1px solid #ccc;">
    <el-row
      style="background:#f0f0f0;height:50px;display:flex;flex-direction:row;align-items:center;font-size:14px;justify-content:space-around"
    >
      <span>请求者：上海某企业</span>
      <span>奖励：0.5/题</span>
      <span>持续时间：xxx</span>
      <span>资格要求：2</span>
    </el-row>
    <div style="padding:30px;">
      <p style="color:#1471eb;margin:0">第{{nowIndex+1}}题</p>
      <el-row>
        <el-col :span="12">
          <p>{{desc}}</p>
          <img style="width: 400px" :src="url">
        </el-col>
        <el-col :span="9" :offset="3">
          <p>选项</p>
          <el-radio-group v-model="opt" style="width: 100%">
            <el-row v-for="(item,index) in opts" :key="index" style="margin-top:20px">
              
                <el-radio :label="index">{{item.content}}</el-radio>
              
            </el-row>
          </el-radio-group>
        </el-col>
      </el-row>
      <p style="text-align:right">
        <el-button type="primary" v-show="!begin" @click="preQuestion">上一题</el-button>
        <el-button type="primary" v-show="!end" @click="nextQuestion">下一题</el-button>
        <el-button type="primary" v-show="end">提交</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import QuestionVer1 from "@/components/QuestionVer1";
import axios from "axios";

export default {
  components: {
    QuestionVer1,
  },
  data() {
    return {
      questions: ["question-ver1"],
      qTemplate: {},
      urls: [],
      opts: [],
      desc: "",
      url: "",
      num: 0,
      nowIndex: 0,
      opt: ""
    };
  },
  methods: {
    nextQuestion() {
      this.nowIndex++;
      this.url = this.urls[this.nowIndex].url;
    },
    preQuestion() {
      this.nowIndex--;
      this.url = this.urls[this.nowIndex].url;
    }
  },
  computed: {
    begin() {
      if (this.nowIndex == 0) {
        return true;
      } else {
        return false;
      }
    },
    end() {
      if (this.nowIndex == this.num - 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    axios
      .get("/api/task/read-resource", {
        params: {
          taskId: "75"
        }
      })
      .then(response => {
        this.qTemplate = response.data;
        this.urls = this.qTemplate.urls;
        this.opts = this.qTemplate.opts;
        this.desc = this.qTemplate.desc;
        this.num = this.urls.length;
        this.url = this.urls[0].url;
      })
      .catch(response => {
        alert("error");
      });
  }
};
</script>

<style>
</style>

