<template>
  <div>
    <el-row>
      <HomePageNav/>
    </el-row>

    <el-row style="height: 650px; background-color: #efefef">

      <el-col style="background-color: white; margin-top: 120px">
        <el-col :span="10" style="background-color: white;">
          <div class="picture">
            <img :src="signup" alt="">
          </div>
        </el-col>
        <el-col :span="14" style="padding-top:50px;padding-right:30px;padding-left:90px;background-color: white">
          <template>
            <el-form label-width="100px" style="width:80%;padding-top:50px;">
              <el-form-item label="登录身份">
                <el-select v-model="status" placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="singleStatus in statuses"
                    :key="singleStatus"
                    :value="singleStatus"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="email" placeholder="请输入注册邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input show-password v-model="pwd" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-form>
            <el-col>
              <div style="width:80%">
                <p style="text-align:center">
                  <el-button
                    style="width:300px;"
                    type="primary"
                    @click="loginWorker"
                    v-show="worker"
                  >登录</el-button>
                </p>

                <p style="text-align:center">
                  <el-button
                    style="width:300px;"
                    type="primary"
                    @click="loginRequester"
                    v-show="requester"
                  >登录</el-button>
                </p>

                <p style="text-align:center">
                  <el-button style="width:300px;" type="primary" v-show="admin" @click="loginAdmin">登录</el-button>
                </p>
                <p style="text-align:center">
                  <el-button
                    style="width:300px;"
                    type="primary"
                    disabled
                    v-show="!(worker || requester || admin)"
                  >登录</el-button>
                </p>
              </div>
            </el-col>
          </template>
        </el-col>
      </el-col>
    </el-row>
    <Footer style="height: 60px"/>
  </div>
</template>

<script>
import axios from "axios";
import HomePageNav from '@/components/public/HomePageNav'
import Footer from '@/components/public/Footer'

export default {
  components:{
    Footer,
    HomePageNav
  },
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
      password: "",
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
    admin() {
      if (this.status == "admin") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    loginRequester: function() {
      let that = this;

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

        param.append("username", this.email);
        param.append("password", this.pwd);
        param.append("role", this.role);
        axios({
          method: "post",
          url: "/api/login",
          data: param
        })
          .then(function(response) {
            //console.log(response);
            if (response.data.code[0] == "2") {
              let token = response.data.X_Auth_Token;
              that.$store.commit("UserLogin", token);
              that.wrong_pwd = "";
              //console.log(that.$store.state.token);
              axios.defaults.headers.common["X_Auth_Token"] =
                that.$store.state.token;
              axios
                .get("/api/requester/find-myself")
                .then(function(response) {
                  //console.log(response);
                  let username = response.data.requester.username;
                  let user_information = {
                    username: ""
                  };
                  user_information.username = username;
                  that.$store.commit("UserInfo", user_information);
                  that.$router.replace("/requester/information");
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else if (response.data.code[0] == "4") {
              that.$message.error("用户名或密码错误");
            } else if (response.data.code[0] == "5") {
              that.$message.error("服务器错误");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    loginWorker: function() {
      let that = this;

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
              //console.log("first:" + response.data);
              let token = response.data.X_Auth_Token;
              that.$store.commit("UserLogin", token);
              that.wrong_pwd = "";
              //console.log(that.$store.state.token);
              axios.defaults.headers.common["X_Auth_Token"] =
                that.$store.state.token;
              axios
                .get("/api/worker/find-myself")
                .then(function(response) {
                  //console.log(response);
                  let username = response.data.worker.username;
                  let user_information = {
                    username: ""
                  };
                  user_information.username = username;
                  that.$store.commit("UserInfo", user_information);
                  that.$router.replace("/worker/information");
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else if (response.data.code[0] == "4") {
              that.$message.error("用户名或密码错误");
              // that.button_disabled = false;
            } else if (response.data.code[0] == "5") {
              that.$message.error("服务器错误");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    loginAdmin: function() {
      let that = this;

      this.role = "ROLE_ADMIN";
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
            //console.log(response);
            if (response.data.code[0] == "2") {
              let token = response.data.X_Auth_Token;
              that.$store.commit("UserLogin", token);
              that.wrong_pwd = "";
              //console.log(that.$store.state.token);
              axios.defaults.headers.common["X_Auth_Token"] =
                that.$store.state.token;
              that.$router.replace("/admin-task");
            } else if (response.data.code[0] == "4") {
              that.$message.error("用户名或密码错误");
            } else if (response.data.code[0] == "5") {
              that.$message.error("服务器错误");
            }
          })
          .catch(function(error) {
            console.log(error);
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
  }
};
</script>

<style scoped>
.picture {
  /*padding: 120px;*/
  padding-left: 170px;
  transform: scale(1);
  padding-top: 30px;
}


.picture img {
  width: 80%;
  height: auto;
}
</style>
