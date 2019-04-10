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
          <p style="font-size:18px;padding-left:25px;">登录</p>
        </div>
      </el-col>
      <el-col :span="6" style>
        <div>
          <p style="font-size:14px;text-align:right;padding-right:15px;">立即</p>
        </div>
      </el-col>
      <el-col :span="4" style>
        <div>
          <router-link to="/register">
            <el-button @click="register">注册</el-button>
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
          <el-form label-width="100px">
            <el-form-item label="登录身份">
              <el-select v-model="status" placeholder="请选择">
                <el-option
                  v-for="singleStatus in statuses"
                  :key="singleStatus"
                  :value="singleStatus"
                  @click="test"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="email" placeholder="请输入用户名" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="pwd" placeholder="请输入密码" style="width:60%"></el-input>
            </el-form-item>
          </el-form>
          <el-col>
            <div style="padding-left:70px;padding-top:24px">
              <el-button
                style="width:300px;display:block;margin-top:5px;"
                type="primary"
                @click="loginWorker"
                v-show="worker"
              >worker登录</el-button>

              <el-button
                style="width:300px;margin-top:5px;display:block;margin-left:0px"
                type="primary"
                @click="loginRequester"
                v-show="requester"
              >requester登录</el-button>

              <el-button
                style="width:300px;margin-top:5px;display:block;margin-left:0px"
                type="primary"
                v-show="admin"
              >admin登录</el-button>

              <el-button
                style="width:300px;margin-top:5px;display:block;margin-left:0px"
                type="primary"
                disabled
                v-show="!(worker || requester || admin)"
              >登录</el-button>
            </div>
          </el-col>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

let self = this;
export default {
  data() {
    return {
      status: "",
      statuses: ["worker", "requester", "admin"],
      email: "",
      pwd: "",
      role: "",
      wrong_pwd: "",
      button_disabled: false,
      radio: false,
      logo: require("../../static/logo_black.png"),
      signup: require("../../static/signup.png"),
      form: {},
      username: "",
      password: ""
    };
  },
  computed: {
    worker(){
      if(this.status == "worker"){
        return true;
      }else{
        return false;
      }
    },
    requester(){
      if(this.status == "requester"){
        return true;
      }else{
        return false;
      }
    },
    admin(){
      if(this.status == "admin"){
        return true;
      }else{
        return false;
      }
    },
  },
  methods: {
    
    register() {
      this.$router.push("/register");
    },
    loginRequester: function() {
      let that = this;
      this.button_disabled = true;
      this.role = "ROLE_REQUESTER";
      if (this.email == "") {
        this.$message({
          message: "请输入用户名",
          type: "warning"
        });
      } else if (this.pwd == "") {
        this.$message("请输入密码");
      } else {
        let param = new URLSearchParams();
        let self = this;
        param.append("username", this.email);
        param.append("password", this.pwd);
        param.append("role", this.role);
        axios({
          method: "post",
          url: "/api/login",
          data: param
        })
          .then(function(response) {
            console.log("first:" + response);
            if (response.data.code[0] == "2") {
              let token = response.data.X_Auth_Token;
              that.$store.commit("UserLogin", token);
              that.wrong_pwd = "";
              console.log(that.$store.state.token);
              axios.defaults.headers.common["X_Auth_Token"] =
                that.$store.state.token;
              axios
                .get("/api/requester/find-myself")
                .then(function(response) {
                  console.log(response);
                  let username = response.data.requester.username;
                  let user_information = {
                    username: ""
                  };
                  user_information.username = username;
                  that.$store.commit("UserInfo", user_information);
                  that.$router.replace("/requester-information");
                  that.button_disabled = false;
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else if (response.data.code[0] == "4") {
              that.wrong_pwd = "用户名或密码错误";
              that.button_disabled = false;
            } else if (response.data.code[0] == "5") {
              that.wrong_pwd("服务器错误");
              that.button_disabled = false;
            }
          })
          .catch(function(error) {
            alert(error);
            token_pointer.button_disabled = false;
          });
      }
    },
    loginWorker: function() {
      let that = this;
      this.button_disabled = true;
      this.role = "ROLE_WORKER";
      if (this.email == "") {
        this.$message({
          message: "请输入用户名",
          type: "warning"
        });
      } else if (this.pwd == "") {
        this.$message("请输入密码");
      } else {
        let param = new URLSearchParams();
        param.append("username", this.email);
        param.append("password", this.pwd);
        param.append("role", this.role);
        axios({
          method: "post",
          url: "/api/login",
          data: param
        })
          .then(function(response) {
            if (response.data.code[0] == "2") {
              console.log("first:" + response.data);
              let token = response.data.X_Auth_Token;
              that.$store.commit("UserLogin", token);
              that.wrong_pwd = "";
              console.log(that.$store.state.token);
              axios.defaults.headers.common["X_Auth_Token"] =
                that.$store.state.token;
              axios
                .get("/api/worker/find-myself")
                .then(function(response) {
                  console.log(response);
                  let username = response.data.worker.username;
                  let user_information = {
                    username: ""
                  };
                  user_information.username = username;
                  that.$store.commit("UserInfo", user_information);
                  that.$router.replace("/homepage");
                  that.button_disabled = false;
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else if (response.data.code[0] == "4") {
              that.wrong_pwd = "用户名或密码错误";
              that.button_disabled = false;
            } else if (response.data.code[0] == "5") {
              that.wrong_pwd("服务器错误");
              that.button_disabled = false;
            }
          })
          .catch(function(error) {
            alert(error);
          });
      }
    },
    forget() {
      this.$prompt("请输入邮箱", "找回密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  
};
</script>

<style>
.picture {
  padding: 120px;
  padding-left: 170px;
  transform: scale(1.5);
}

.picture img {
  width: 80%;
  height: auto;
}
</style>
