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
      

      <el-col :span="14" style="padding-top:50px;padding-right:30px;padding-left:90px">
        <template>
          <el-form label-width="80px" :model="formData" :rules="rules" ref="login">
            <el-form-item label="身份">
              <el-select v-model="formData.status" placeholder="请选择身份" style="width:80%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户名" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                style="width:80%"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="re_password">
              <el-input
                v-model="formData.re_password"
                placeholder="请重复输入密码"
                style="width:80%"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入真实姓名" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="teleNumber">
              <el-input v-model="formData.teleNumber" placeholder="请输入您的手机号码" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="formData.age" placeholder="请输入您的年龄" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="formData.gender">
                <el-option v-for="gender in genders" :key="gender" :value="gender"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="worker">
              <el-form-item label="学历" prop="workerReg.education">
                <el-select v-model="formData.workerReg.education">
                  <el-option v-for="education in educations" :key="education" :value="education"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地点" prop="workerReg.workArea">
                <el-input
                  v-model="formData.workerReg.workArea"
                  placeholder="请输入您的工作地点"
                  style="width:80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="专业" prop="workerReg.major">
                <el-select v-model="formData.workerReg.major">
                  <el-option v-for="major in majors" :key="major" :value="major"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="requester">
              <el-form-item label="研究领域" prop="requesterReg.research_field">
                <el-input
                  v-model="formData.requesterReg.research_field"
                  placeholder="请输入您的研究方向"
                  style="width:80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="机构" prop="requesterReg.institutionName">
                <el-input
                  v-model="formData.requesterReg.institutionName"
                  placeholder="请输入您的所在机构"
                  style="width:80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="requesterReg.address">
                <el-input
                  v-model="formData.requesterReg.address"
                  placeholder="请输入您的住址"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button
                style="width:300px;"
                type="primary"
                v-show="worker"
                @click="submitWorker"
              >注册</el-button>
              <el-button
                style="width:300px;display:inline-block;margin-left:0"
                type="primary"
                v-show="requester"
                @click="submitRequester"
              >注册</el-button>

              <el-button
                style="width:300px;display:inline-block;margin-left:0"
                type="primary"
                disabled
                v-show="!(worker || requester)"
              >注册</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-col>

      <el-col :span="10">
        <div class="picture">
          <img :src="signup">
        </div>
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
      formData: {
        status: "",
        username: "",
        email: "",
        password: "",
        re_password: "",
        name: "",
        teleNumber: "",
        age: "",
        gender: "",

        workerReg: {
          withdrawnMethod: "",
          education: "",
          workArea: "",
          major: ""
        },
        requesterReg: {
          research_field: "",
          institutionName: "",
          address: "",
          payMethod: ""
        }
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱形式不合法",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        re_password: [
          { required: true, message: "请重复密码", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入您的真实姓名", trigger: "blur" }
        ],
        teleNumber: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "手机号码形式不合法",
            trigger: "blur"
          }
        ],
        age: [
          { required: true, message: "请输入您的年龄", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入合法的数字",
            trigger: "blur"
          }
        ],
        gender: [
          { required: true, message: "请选择您的性别", trigger: "change" }
        ],
        workerReg: {
          education: [
            { required: true, message: "请选择您的学历", trigger: "change" }
          ],
          workArea: [
            { required: true, message: "请输入您的工作地点", trigger: "blur" }
          ],
          major: [
            { required: true, message: "请选择您的专业", trigger: "change" }
          ]
        },
        requesterReg:{
          research_field: [
            { required: true, message: "请输入您的研究领域", trigger: "blur" }
          ],
          institutionName: [
            { required: true, message: "请输入您所在的机构", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入您的地址", trigger: "blur" }
          ],
        }
      },
      options: [
        {
          value: "worker",
          label: "worker"
        },
        {
          value: "requester",
          label: "requester"
        }
      ],
      genders: ["男", "女"],
      educations: [
        "小学",
        "初中",
        "高中",
        "专科",
        "本科",
        "硕士",
        "博士",
        "无"
      ],
      majors: [
        "计算机/互联网/通信",
        "生产/工艺/制造",
        "医疗/护理/制药",
        "金融/银行/投资/保险",
        "商业/服务业/个人经营",
        "文化/广告/传媒",
        "娱乐/艺术/表演",
        "律师/法务",
        "教育/培训",
        "公务员/行政/事业单位",
        "模特",
        "空姐",
        "学生",
        "其他"
      ]
    };
  },
  computed: {
    worker() {
      if (this.formData.status == "worker") {
        return true;
      } else {
        return false;
      }
    },
    requester() {
      if (this.formData.status == "requester") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    submitWorker(formName) {
      this.$refs['login'].validate(valid => {
        if (valid) {
          this.$options.methods.workerRegister.call(this);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitRequester(formName) {
      this.$refs['login'].validate(valid => {
        if (valid) {
          this.$options.methods.reqRegister.call(this);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // inputLegal() {
    //   if (this.formData.username == "") {
    //     this.$message.error("请输入用户名");
    //   } else if (this.formData.email == "") {
    //     this.$message.error("请输入邮箱");
    //   } else if (this.formData.password == "") {
    //     this.$message.error("请输入密码");
    //   } else if (this.formData.re_password == "") {
    //     this.$message.error("请确认密码");
    //   } else if (this.formData.password != this.formData.re_password) {
    //     this.$message.error("两次密码不一致");
    //   } else {
    //     return true;
    //   }
    //   return false;
    // },
    workerRegister() {
      //if (!this.$options.methods.inputLegal.call(this)) return;

      let param = new URLSearchParams();
      param.append("username", this.formData.username);
      param.append("eMail", this.formData.email);
      param.append("password", this.formData.password);
      param.append("name", this.formData.name);
      param.append("teleNumber", this.formData.teleNumber);
      param.append("withdrawnMethod", this.formData.workerReg.withdrawnMethod);
      param.append("education", this.formData.workerReg.education);
      param.append("workArea", this.formData.workerReg.workArea);
      param.append("age", this.formData.age);
      param.append("gender", this.formData.gender);
      param.append("major", this.formData.workerReg.major);
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
      //if (!this.$options.methods.inputLegal.call(this)) return;

      let param = new URLSearchParams();
      param.append("username", this.formData.username);
      param.append("eMail", this.formData.email);
      param.append("password", this.formData.password);
      param.append("name", this.formData.name);
      param.append("teleNumber", this.formData.teleNumber);
      param.append("research_field", this.formData.requesterReg.research_field);
      param.append(
        "institutionName",
        this.formData.requesterReg.institutionName
      );
      param.append("address", this.formData.requesterReg.address);
      param.append("payMethod", "");
      param.append("gender", this.formData.gender);
      param.append("age", this.formData.age);
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
    }
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
