<template>
  <div style="width:75%;margin:0 auto;">
    <el-form label-width="100px" style="border:1px solid #ccc;">
      <el-form-item label="项目名称：" style="margin-top:20px;">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <p class="line">描述项目</p>
      <el-form-item label="描述：">
        <el-input v-model="desc" placeholder="请输入描述信息"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="projectType" placeholder="请选择">
          <el-option label="选择题" value="选择题"></el-option>
          <el-option label="图片圈注" value="图片圈注"></el-option>
        </el-select>
      </el-form-item>
      <p class="line">设置调查</p>
      <el-form-item label="每题奖励：">
        <el-input v-model="reward" placeholder="元"></el-input>
      </el-form-item>
      <el-form-item label="截止日期：">
        <!-- <el-date-picker v-model="end_time"></el-date-picker> -->
        <el-input type="date" v-model="end_time" placeholder="天"></el-input>
      </el-form-item>
      <p class="line">工人要求</p>
      <el-form-item label="学历">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <p style="text-align:right">
      <el-button type="primary" @click="submitForm">下一步</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: "ProjectBaseInfoEdit",
  data() {
    return {
      name: "",
      desc: "",
      projectType: "",
      reward: 0,
      end_time: ""
    };
  },
  methods: {
    dateToString: function(draftTimeV) {
      // console.log(draftTimeV);
      draftTimeV = draftTimeV + "";
      let date = "";
      let month = new Array();
      month["Jan"] = 1;
      month["Feb"] = 2;
      month["Mar"] = 3;
      month["Apr"] = 4;
      month["May"] = 5;
      month["Jun"] = 6;
      month["Jul"] = 7;
      month["Aug"] = 8;
      month["Sep"] = 9;
      month["Oct"] = 10;
      month["Nov"] = 11;
      month["Dec"] = 12;
      let str = draftTimeV.split(" ");
      date = str[3] + "-";
      date = date + month[str[1]] + "-" + str[2] + " " + str[4];
      return date;
    },
    submitForm: function() {
      let form = {
        formType: 'baseInfo',
        para: {
          name: this.name,
          description: this.desc,
          reward: this.reward,
          status:0,
          type:this.projectType,
          restrictions:'你妈的',
          start_time: this.dateToString(new Date()),
          end_time: this.dateToString(new Date(this.end_time)),
          level:0,
          time_limitation:0,
          pay_time:0,
          area:'计算机',
          usage:'无',
          min_age:0,
          max_age:0
        }
      };
      this.$emit("submitForm", form);
    }
  }
};
</script>


<style scoped>
.line {
  background: #ccc;
  font-weight: bold;
  padding: 10px;
}

.el-input {
  width: 50%;
}
</style>