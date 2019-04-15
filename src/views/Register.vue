<template>
  <div>
    <el-row
      style="border-bottom:1px solid #ccc;display:flex;flex-direction:row;align-items:center;"
    >
      <el-col :span="4">
        <div>
          <p
            style="font-size:30px;font-weight:bold;color:rgb(59,94,135);text-align:right;padding-right:20px;border-right:1.5px solid #ccc;"
          >众包平台</p>
        </div>
      </el-col>

      <el-col :span="10">
        <div>
          <p style="font-size:18px;padding-left:20px;">注册账号</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <p style="font-size:14px;text-align:right;padding-right:15px;">我已注册，现在就</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <router-link to="/login">
            <el-button>登录</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10">
        <div class="picture">
          <img :src="signup">
        </div>
      </el-col>

      <el-col :span="14" style="padding-top:50px;padding-right:30px;padding-left:90px">
        <template>
          <el-form label-width="80px">
            <el-form-item label="身份">
              <el-select v-model="status" placeholder="请选择身份" style="width:80%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="username" placeholder="请输入用户名" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="email" placeholder="请输入邮箱" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" placeholder="请输入密码" style="width:80%" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="re_password" placeholder="请重复输入密码" style="width:80%" show-password></el-input>
            </el-form-item>
          </el-form>

          <el-col>
            <div style="padding-top:24px;text-align:center;width:80%;">
              <el-button
                style="width:300px;"
                type="primary"
                v-show="worker"
                @click="workerRegister"
              >注册</el-button>
              <el-button
                style="width:300px;display:inline-block;margin-left:0"
                type="primary"
                v-show="requester"
                @click="reqRegister"
              >注册</el-button>
              
              <el-button
                style="width:300px;display:inline-block;margin-left:0"
                type="primary"
                disabled
                v-show="!(worker || requester)"
              >注册</el-button>
            </div>
          </el-col>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      signup: require("../../static/signup.png"),
      options: [
        {
          value: "worker",
          label: "worker"
        },
        {
          value: "requester",
          label: "requester"
        },
      
      ],
      status: "",
      username: "",
      email: "",
      password: "",
      re_password: ""
    };
  },
  computed: {
    worker() {
      if (this.status == "worker") {
        return true;
      } else {
        return false;
      }
    },
    requester() {
      if (this.status == "requester") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    inputLegal() {
      if (this.username == "") {
        this.$message.error("请输入用户名");
      } else if (this.email == "") {
        this.$message.error("请输入邮箱");
      } else if (this.password == "") {
        this.$message.error("请输入密码");
      } else if (this.re_password == "") {
        this.$message.error("请确认密码");
      } else if (this.password != this.re_password) {
        this.$message.error("两次密码不一致");
      } else {
        return true;
      }
      return false;
    },
    workerRegister() {
      if (!this.$options.methods.inputLegal.call(this)) return;

      let param = new URLSearchParams();
      param.append("username", this.username);
      param.append("eMail", this.email);
      param.append("password", this.password);
      param.append("name", "");
      param.append("teleNumber", "");
      param.append("withdrawnMethod", "");
      param.append("education", "");
      param.append("workArea", "");
      param.append("age", 0);
      param.append("gender", "");
      param.append("major", "");
      axios({
        method: "post",
        url: "/api/register-as-worker",
        data: param
      })
        .then(response => {
          console.log(response);
          if (response.data.code[0] == "2") {
            this.$message("注册成功！");
            this.$router.replace("/login");
          } else if (response.data.message == "user has existed") {
            this.$message("该邮箱已被注册");
          } else if (response.data.code == "400") {
          } else if (response.data.code == "500") {
            this.$message("服务器错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reqRegister() {
      if (!this.$options.methods.inputLegal.call(this)) return;

      let param = new URLSearchParams();
      param.append("username", this.username);
      param.append("eMail", this.email);
      param.append("password", this.password);
      param.append("name", "");
      param.append("teleNumber", "");
      param.append("research_field", "");
      param.append("institutionName", "");
      param.append("address", "");
      param.append("payMethod", "");
      param.append("gender", "");
      param.append("age", 0);
      console.log(param);
      axios({
        method: "post",
        url: "/api/register-as-requester",
        data: param
      })
        .then(response => {
          console.log(response);
          if (response.data.code[0] == "2") {
            this.$message("注册成功！");
            this.$router.replace("/login");
          } else if (response.data.message == "user has existed") {
            this.$message("该邮箱已被注册");
          } else if (response.data.code == "400") {
          } else if (response.data.code == "500") {
            this.$message("服务器错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
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

.picture img {
  width: 90%;
  height: auto;
}
</style>
