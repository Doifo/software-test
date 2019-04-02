<template>
  <div>
    <el-row class="homepage">
      <el-col span="8" class="title">众测平台</el-col>
      <el-col span="16">
        <div style="text-align:right;padding-right:30px;">
          <router-link to="/register">
            <el-button>注册</el-button>
          </router-link>
          <router-link to="/login">
            <el-button>登录</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <div style="background:rgb(59,94,135);padding-top:100px;">
        <p style="font-size:45px;color:rgb(255,255,255);margin:0px;padding-left:150px;">众包任务平台</p>
        <p
          style="font-size:25px;color:rgb(255,255,255);padding-left:150px;padding-top:30px;padding-bottom:120px"
        >问卷调查、语言处理、视觉处理、数据采集，让数据更智能！</p>
      </div>
    </el-row>

    <el-row>
      <el-col :span="8" style="padding-left:10px;padding-top:10px">
        <div class="first">
          <img :src="main">
        </div>
      </el-col>
      <el-col :span="15" style="padding-left:16px;padding-top:16px;padding-right:16px">
        <div>
          <p style="font-size:22px;padding-left:190px;padding-top:11px;font-weight:bold">了解众包任务平台</p>
          <p
            style="font-size:18px;padding-top:10px;line-height:40px"
          >众包平台是一个众包市场，使个人和企业更容易将他们的流程和工作外包给可以虚拟执行这些任务的分布式员工。这可能包括从进行简单的数据验证和研究到更主观的任务，如调查参与，内容审核等等。使公司能够利用全国员工的集体智慧，技能和洞察力来简化业务流程，增强数据收集和分析，并加速机器学习开发。</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <p style="font-size:22px;padding-left:720px;font-weight:bold;padding-bottom:10px">三大优势</p>
    </el-row>

    <el-row>
      <el-col :span="8" style="background:#f0f0f0">
        <p style="font-size:15px;padding-left:100px;font-weight:bold;padding-top:20px">优化效率</p>
        <p
          style="font-size:15px;padding-left:100px;padding-right:45px;padding-bottom:40px;line-height:30px"
        >适合在您需要手动处理的工作流程中执行简单重复的工作。使用外包做任务可快速完成工作，同时为公司腾出时间和资源，因此内部员工可以专注于更高价值的工作。</p>
      </el-col>
      <el-col :span="8" style="background:#f0f0f0">
        <p style="font-size:15px;padding-left:100px;font-weight:bold;padding-top:20px">增加灵活性</p>
        <p
          style="font-size:15px;padding-left:100px;padding-right:50px;padding-bottom:40px;line-height:30px"
        >扩大和缩小员工队伍并不是最容易的事情。通过访问全球，按需，24*7全天候的员工队伍，众包平台使企业和组织能够在需要时轻松快速的完成工作而无需动态扩展内部员工队伍。</p>
      </el-col>
      <el-col :span="8" style="background:#f0f0f0">
        <p style="font-size:15px;padding-left:100px;font-weight:bold;padding-top:20px">降低成本</p>
        <p
          style="font-size:15px;padding-left:100px;padding-right:70px;padding-bottom:40px;line-height:30px"
        >众包平台提供了一种有效管理和雇佣和管理临时员工的人工和间接成本的方法。通过在按任务付费模型上利用分布式工作人员的技能，实现仅通过专门团队可能无法实现的结果。</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      main: require("../../static/main.png")
    };
  },
  components: {}
};
</script>

<style>
.homepage {
  background-color: #1c2541;
  display: flex;
  align-items: center;
  height: 60px;
}
.title {
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
  color: rgb(255, 255, 255);
}
.login {
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
  padding: 10px;
  padding-top: 7px;
  padding-bottom: 7px;
  background: #eff0f1;
  cursor: pointer;
}
.register {
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
  padding: 10px;
  padding-top: 7px;
  padding-bottom: 7px;
  background: #eff0f1;
  cursor: pointer;
}

.first {
  padding: 90px;
  padding-left: 150px;
}
</style>
