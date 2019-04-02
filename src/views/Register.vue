<template>
  <div>
    <el-row style="border-bottom:1px solid #ccc;display:flex;flex-direction:row;align-items:center;">
      <el-col span="4">
        <div>
          <p style="font-size:30px;font-weight:bold;color:rgb(59,94,135);text-align:right;padding-right:20px;border-right:1.5px solid #ccc;">众包平台</p>
        </div>
      </el-col>

      <el-col span="10">
        <div>
          <p style="font-size:18px;padding-left:20px;">注册账号</p>
        </div>
      </el-col>
      <el-col span="6" style="">
        <div>
          <p style="font-size:14px;text-align:right;padding-right:15px;">我已注册，现在就</p>
        </div>
      </el-col>
      <el-col span="4" style="">
        <div>
          <router-link to="/login">
            <el-button>登录</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="10">
        <div class="picture">
          <img :src="signup">
        </div>
      </el-col>

      <el-col span="14" style="padding-top:50px;padding-right:30px;padding-left:90px">
        <template>
          <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="身份">
              <el-select v-model="value" placeholder="请选择身份" style="width:80%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="username" placeholder="请设置用户名" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="number" placeholder="可用户登录和找回密码" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" placeholder="请输入密码" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="code" placeholder="请输入验证码" style="width:40%"></el-input>
            </el-form-item>
          </el-form>
          <el-radio style="padding-left:10px" v-model="radio" label="1">我已看过并同意《用户注册协议》</el-radio>
          <el-col>
            <div style="padding-top:24px;text-align:center;width:80%;">
              <router-link to>
                <el-button
                  style="width:300px;"
                  type="primary"
                >注册</el-button>
              </router-link>
            </div>
          </el-col>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signup: require("../../static/signup.png"),
      radio: "1",
      options: [
        {
          value: "选项1",
          label: "worker"
        },
        {
          value: "选项2",
          label: "requester"
        },
        {
          value: "选项3",
          label: "administrator"
        }
      ],
      value: ""
    };
  },
  components: {}
};
</script>

<style>
.picture {
  padding: 120px;
  padding-left: 170px;
  transform: scale(1.5);
}

.picture img{
  width: 90%;
  height: auto;
}
</style>
