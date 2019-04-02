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
          <p style="font-size:18px;padding-left:25px;">登录</p>
        </div>
      </el-col>
      <el-col span="6" style="">
        <div>
          <p style="font-size:14px;text-align:right;padding-right:15px;">立即</p>
        </div>
      </el-col>
      <el-col span="4" style="">
        <div>
          <router-link to="/register">
            <el-button>注册</el-button>
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
            <el-form-item label="用户名">
              <el-input v-model="username" placeholder="请输入用户名" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="padding-top:20px">
              <el-input v-model="password" placeholder="请输入密码" style="width:60%"></el-input>
            </el-form-item>
          </el-form>
          <el-radio style="padding-left:10px;padding-top:10px" v-model="radio" label="1">记住我</el-radio>
          <el-col>
            <div style="padding-left:70px;padding-top:24px">
              <router-link to="/homepage">
                <el-button
                  style="width:300px"
                  type="primary"
                >登录</el-button>
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
      radio: "1"
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
  width: 80%;
  height: auto;
}
</style>
