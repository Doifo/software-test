<template>
  <div style="width:75%;margin:0 auto;" class="RequesterEditProject">
    <el-form label-width="140px" label-position="left" style="border:1px solid #ccc;">
      <el-form-item label="项目名称：" style="margin-top:20px;">
        <el-input placeholder="请输入标题" v-model="name" style="width:60%"></el-input>
      </el-form-item>
      <p class="line">描述项目</p>
      <el-form-item label="描述：">
        <el-input
          placeholder="请输入描述信息"
          v-model="desc"
          style="width:60%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型：">
          <span style="color:#606266">{{project_type}}</span>
      </el-form-item>-->
      <p class="line">设置调查</p>
      <el-form-item label="每份奖励">
        <el-input-number
          v-model="reward"
          :precision="2"
          type="number"
          :step="0.1"
          :min="0"
          style="min-width:80px;!important width:20%;margin-right:10px"
        ></el-input-number>元
        <el-popover
          placement="right-start"
          title="属性说明"
          width="200"
          trigger="hover"
          content="回答每个问题（注意：不是每个项目）参与者可以获得的报酬"
        >
          <i class="el-icon-info" slot="reference" style="padding-left:20px;color:#909399"></i>
        </el-popover>
      </el-form-item>
      <el-form-item label="推荐完成时间">
        <el-input-number
          v-model="time_limitation"
          :precision="2"
          :min="0"
          type="number"
          style="min-width:80px;!important width:20%;margin-right:10px"
        ></el-input-number>小时
        <el-popover
          placement="right-start"
          title="属性说明"
          width="200"
          trigger="hover"
          content="推荐参与者从开始答题到提交项目的时间"
        >
          <i class="el-icon-info" slot="reference" style="padding-left:20px;color:#909399"></i>
        </el-popover>
      </el-form-item>
      <el-form-item label="项目有效期">
        <!--限制：开始日期不能小于当前日期-->
        <div class="block">
          <!--{{limi_value}}-->
          <el-date-picker
            v-model="limi_value"
            :picker-options="pickerOptions1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="自动支付时间">
        <el-input-number
          v-model="pay_time"
          :precision="2"
          type="number"
          style="min-width:80px;!important width:20%;margin-right:10px"
          :max="72"
          :min="0"
        ></el-input-number>小时
        <el-popover
          placement="right-start"
          title="属性说明"
          width="200"
          trigger="hover"
          content="参与者完成项目后多久系统自动支付酬金给参与者（不超过72小时）"
        >
          <i class="el-icon-info" slot="reference" style="padding-left:20px;color:#909399"></i>
        </el-popover>
      </el-form-item>
      <p class="line">工人要求</p>
      <el-form-item label="推荐领域">
        <el-select v-model="area" filterable placeholder="请选择" style="width:40%;">
          <el-option
            v-for="item in condition_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-popover
          placement="right-start"
          title="属性说明"
          width="200"
          trigger="hover"
          content="参与者需要拥有哪些领域的知识才能更好地参与该项目（多选）"
        >
          <i class="el-icon-info" slot="reference" style="padding-left:20px;color:#909399"></i>
        </el-popover>
      </el-form-item>
      <el-form-item label="发布任务份数">
        <el-input-number
          v-model="population"
          type="number"
          :min="3"
          style="min-width:80px;!important width:20%;margin-right:10px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="等级要求">
        <el-input-number
          v-model="level"
          type="number"
          :min="0"
          style="min-width:80px;!important width:20%;margin-right:10px"
        ></el-input-number>
        <el-popover
          placement="right-start"
          title="属性说明"
          width="200"
          trigger="hover"
          content="参与者需要多高的等级才能更好地完成项目"
        >
          <i class="el-icon-info" slot="reference" style="padding-left:20px;color:#909399"></i>
        </el-popover>
      </el-form-item>
      <el-form-item label="年龄要求">
        <el-input-number
          v-model="min_age"
          type="number"
          :min="0"
          style="min-width:30px;!important width:20%;margin-right:10px"
        ></el-input-number>
        <span style="margin-right:10px;">至</span>
        <el-input-number
          v-model="max_age"
          :min="0"
          style="min-width:80px;!important width:20%;margin-right:10px"
        ></el-input-number>
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
      //form element
      name: "",
      desc: "",
      projectType: "",
      reward: 0,
      level: 0,
      limi_value: 0,
      time_limitation: 0,
      pay_time: 0,
      area: "",
      usage: 0,
      population:0,
      min_age: 0,
      max_age: 0, //form element end
      project_type: "",
      condition_options: [
        {
          value: "计算机",
          label: "计算机"
        },
        {
          value: "医药",
          label: "医药"
        },
        {
          value: "教育",
          label: "教育"
        },
        {
          value: "财经",
          label: "财经"
        },
        {
          value: "政法",
          label: "政法"
        },
        {
          value: "科研",
          label: "科研"
        },
        {
          value: "公益",
          label: "公益"
        },
        {
          value: "音乐",
          label: "音乐"
        },
        {
          value: "设计",
          label: "设计"
        },
        {
          value: "行政",
          label: "行政"
        },
        {
          value: "交通",
          label: "交通"
        }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        }
      }
    };
  },
  methods: {
    /*dateToString: function(draftTimeV) {
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
    },*/
    submitForm: function() {
      function dateToString(draftTimeV) {
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
      }
      //console.log(this.limi_value);
      let form = {
        formType: "baseInfo",
        para: {
          name: this.name,
          description: this.desc,
          reward: this.reward,
          status: 0,
          // type:this.projectType,
          restrictions: "无限制",
          timeLimitation: this.timeLimitation,
          startTime: dateToString(this.limi_value[0]),
          endTime: dateToString(this.limi_value[1]),
          level: this.level,
          payTime: this.pay_time,
          area: this.area,
          usage: this.usage,
          minAge: this.min_age,
          maxAge: this.max_age,
          allNumber: 300,
          population: this.population
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

<style>
.RequesterEditProject .el-form-item__label {
  padding-left: 30px;
}
</style>