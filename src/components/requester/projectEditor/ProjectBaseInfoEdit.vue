<template>
  <div style="width:75%;margin:0 auto;" class="RequesterEditProject">
    <el-row style="padding: 20px">
      <el-col :span="8" :offset="8">
        <strong style="color: #5a9ef7; font-size: 20pt">编辑项目的基本信息</strong>
      </el-col>
    </el-row>
    <el-form
    ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
      label-position="left"
      style="border:1px solid #ccc;"
    >
      <el-form-item label="项目名称：" prop="name" style="margin-top:20px;">
        <el-input placeholder="请输入标题" v-model="form.name" style="width:60%"></el-input>
      </el-form-item>
      <p class="line">描述项目</p>
      <el-form-item label="描述：" prop="desc">
        <el-input
          placeholder="请输入描述信息"
          v-model="form.desc"
          style="width:60%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型：">
          <span style="color:#606266">{{project_type}}</span>
      </el-form-item>-->
      <p class="line">设置调查</p>
      <el-form-item label="每份奖励" prop="reward">
        <el-input-number
          v-model="form.reward"
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
      <el-form-item label="推荐完成时间" prop="time_limitation">
        <el-input-number
          v-model="form.time_limitation"
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
      <el-form-item label="项目有效期" prop="limi_value">
        <!--限制：开始日期不能小于当前日期-->
        <div class="block">
          <!--{{limi_value}}-->
          <!-- <el-date-picker
            v-model="limi_value"
            :picker-options="pickerOptions1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>-->
          <el-date-picker
            v-model="form.limi_value"
            type="date"
            :picker-options="pickerOptions1"
            placeholder="选择结束时间"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="自动支付时间" prop="pay_time">
        <el-input-number
          v-model="form.pay_time"
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
      <el-form-item label="推荐领域" prop="area">
        <el-select v-model="form.area" filterable placeholder="请选择" style="width:40%;">
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
      <el-form-item label="发布任务份数" prop="population">
        <el-input-number
          v-model="form.population"
          type="number"
          :min="3"
          :max="10"
          style="min-width:80px;!important width:20%;margin-right:10px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="等级要求" prop="level">
        <el-input-number
          v-model="form.level"
          type="number"
          :min="0"
          :max="5"
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
          v-model="form.min_age"
          type="number"
          :min="0"
          style="min-width:30px;!important width:20%;margin-right:10px"
        ></el-input-number>
        <span style="margin-right:10px;">至</span>
        <el-input-number
          v-model="form.max_age"
          :min="form.min_age"
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
      rules: {
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入项目描述", trigger: "blur" }],
        reward: [{ required: true, message: "请选择每份奖励", trigger: "blur" }],
        time_limitation: [{ required: true, message: "请选择推荐时间", trigger: "blur" }],
        limi_value: [{ required: true, message: "请选择项目有效时间", trigger: "blur" }],
        pay_time: [{ required: true, message: "请选择自动支付时间", trigger: "blur" }],
        area: [{ required: true, message: "请选择推荐领域", trigger: "change" }],
        population:[{ required: true, message: "请选择任务数量", trigger: "blur" }],
        level:[{ required: true, message: "请选择等级限制", trigger: "blur" }],
      },
      //form element
      form: {
        name: "",
        desc: "",
        projectType: "",
        reward: 0,
        level: 0,
        limi_value: "",
        time_limitation: 0,
        pay_time: 0,
        area: "",
        usage: "教育",
        population: 0,
        min_age: 0,
        max_age: 0
      }, //form element end
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
  watch: {
    formMinAge(val) {
      if (this.form.max_age < val) {
        this.form.max_age = val;
      }
    }
  },
  computed:{
    formMinAge(){
      return this.form.min_age
    }
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
      let day = new Date(Date.now());
      let nowstartTime =
        day.getFullYear() +
        "-" +
        (day.getMonth() + 1) +
        "-" +
        day.getDate() +
        " 00:00:00";
      let form = {
        formType: "baseInfo",
        para: {
          name: this.form.name,
          description: this.form.desc,
          reward: this.form.reward,
          status: 0,
          // type:this.projectType,
          restrictions: this.form.level,
          startTime: nowstartTime,
          endTime: dateToString(this.form.limi_value),
          level: 0,
          timeLimitation: this.form.time_limitation,
          payTime: this.form.pay_time,
          area: this.form.area,
          minAge: this.form.min_age,
          maxAge: this.form.max_age,
          population: this.form.population,
          usage:this.usage
        }
      };
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("submitForm", form);
          //this.$options.methods.workerRegister.call(this);
        } else {
          console.log("error submit!!");
          return 
        }
      });
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
