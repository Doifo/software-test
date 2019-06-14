<template>
  <div>

    <HomePageNav/>
    <el-row style="background-color: #efefef">
      <el-col :offset="2" :span="20" style="background-color: white">
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
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入真实姓名" style="width:80%"></el-input>
              </el-form-item>


              <div v-if="worker">
                <el-form-item label="学历" prop="workerReg.education">
                  <el-select v-model="formData.workerReg.education">
                    <el-option v-for="education in educations" :key="education" :value="education"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="提现方式" prop="workerReg.withdrawnMethod">
                  <el-select v-model="formData.workerReg.withdrawnMethod">
                    <el-option v-for="method in methods" :key="method" :value="method"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业" prop="workerReg.major">
                  <el-input
                    v-model="formData.workerReg.major"
                    placeholder="请输入您的专业"
                    style="width:80%"
                  ></el-input>
                </el-form-item>
                <el-form-item label="所属机构" prop="workerReg.institution">
                  <el-input
                    v-model="formData.workerReg.institution"
                    placeholder="请输入您的所属机构"
                    style="width:80%"
                  ></el-input>
                </el-form-item>
                <el-form-item label="擅长领域" prop="workerReg.workArea">
                  <el-select v-model="formData.workerReg.workArea[1]">
                    <el-option v-for="major in filterMajor" :key="major" :value="major"></el-option>
                  </el-select>
                  <el-select v-model="formData.workerReg.workArea[2]">
                    <el-option v-for="major in filterMajor" :key="major" :value="major"></el-option>
                  </el-select>
                  <el-select v-model="formData.workerReg.workArea[3]">
                    <el-option v-for="major in filterMajor" :key="major" :value="major"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-select v-model="formData.workerReg.major2">
                    <el-option
                      v-for="major in filterMajor"
                      :key="major"
                      :value="major"
                    ></el-option>
                  </el-select>
                  <el-select v-model="formData.workerReg.major3">
                    <el-option v-for="major in filterMajor" :key="major" :value="major"></el-option>
                  </el-select> -->
              </div>


              <div v-if="requester">

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
                <el-form-item label="支付方式" prop="requesterReg.payMethod">
                  <el-select v-model="formData.requesterReg.payMethod">
                    <el-option v-for="method in methods" :key="method" :value="method"></el-option>
                  </el-select>
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
    HomePageNav,
    Footer
  },
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
          major: "",
          education: "",
          institution:"",
          workArea: {
            1:"",
            2:"",
            3:""
          },
        },
        requesterReg: {
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "密码长度不小于6位",
            trigger: "blur"
          }
        ],
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
          major: [
            { required: true, message: "请输入您的专业", trigger: "blur" }
          ],
          // workArea: [
          //   { required: true, message: "请选择您的擅长领域", trigger: "change" }
          // ],
          withdrawnMethod:[
            { required: true, message: "请选择您的提现方式", trigger: "change" }
          ],
          institution:[
            { required: true, message: "请输入您的所属机构", trigger: "blur" }
          ]
        },
        requesterReg: {
          institutionName: [
            { required: true, message: "请输入您所在的机构", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入您的地址", trigger: "blur" }
          ],
          payMethod:[
            { required: true, message: "请选择您的支付方式", trigger: "change" }
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
      methods:["支付宝","微信"],
      educations: [
        "小学",
        "初中",
        "高中",
        "专科",
        "本科",
        "硕士",
        "博士",
      ],
      majors: [
        "计算机",
        "医药",
        "教育",
        "财经",
        "政法",
        "科研",
        "公益",
        "音乐",
        "设计",
        "行政",
        "交通"
      ]
    };
  },
  computed: {
    filterMajor() {
      let index1 = this.majors.indexOf(this.formData.workerReg.workArea[1]);
      let index2 = this.majors.indexOf(this.formData.workerReg.workArea[2]);
      let index3 = this.majors.indexOf(this.formData.workerReg.workArea[3]);
      if (index1 > -1) this.majors.splice(index1, 1);
      if (index2 > -1) this.majors.splice(index2, 1);
      if (index3 > -1) this.majors.splice(index3, 1);
      return this.majors
    },
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
      this.$refs["login"].validate(valid => {
        if (valid) {
          this.$options.methods.workerRegister.call(this);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitRequester(formName) {
      this.$refs["login"].validate(valid => {
        if (valid) {
          this.$options.methods.reqRegister.call(this);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    workerRegister() {
      if(this.formData.password != this.formData.re_password){
        this.$message.error('两次密码不一致')
        return
      }
      if(this.formData.workerReg.workArea[3] == "" && this.formData.workerReg.workArea[1] == "" && this.formData.workerReg.workArea[2] == ""){
        this.$message.error('请至少选择一项擅长领域')
        return
      }
      
      //console.log(JSON.stringify(this.formData.workerReg.workArea))
      
      
      let param = new URLSearchParams();
      param.append("eMail", this.formData.email);
      param.append("password", this.formData.password);
      param.append("username", this.formData.username);
      param.append("name", this.formData.name);
      param.append("teleNumber", this.formData.teleNumber);
      param.append("withdrawnMethod", this.formData.workerReg.withdrawnMethod);
      param.append("education", this.formData.workerReg.education);
      param.append("workArea", JSON.stringify(this.formData.workerReg.workArea));
      param.append("age", this.formData.age);
      param.append("gender", this.formData.gender);
      param.append("major", this.formData.workerReg.major);
      param.append('institution',this.formData.workerReg.institution)
      
      axios({
        method: "post",
        url: "/api/register-as-worker",
        data: param
      })
        .then(response => {
          //console.log(response);
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
      if(this.formData.password != this.formData.re_password){
        this.$message.error('两次密码不一致')
        return
      }

      let param = new URLSearchParams();
      param.append("eMail", this.formData.email);
      param.append("password", this.formData.password);
      param.append("username", this.formData.username);
      param.append("name", this.formData.name);
      param.append("teleNumber", this.formData.teleNumber);
      param.append(
        "institutionName",
        this.formData.requesterReg.institutionName
      );
      param.append("address", this.formData.requesterReg.address);
      param.append("payMethod", this.formData.requesterReg.payMethod);
      param.append("gender", this.formData.gender);
      param.append("age", this.formData.age);
      //console.log(param);
      axios({
        method: "post",
        url: "/api/register-as-requester",
        data: param
      })
        .then(response => {
          //console.log(response);
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
};
</script>

<style scoped>
.picture {
  width: 400px;
}

.picture img {
  width: 100%;
  height: auto;
}
</style>
