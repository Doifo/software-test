<template>
  <div>
    <!--导航-->
    <worker-header></worker-header>
    <div style="width:70%;margin:0 auto; margin-top:50px;">
      <div style="background:#fffaf7;border:1px solid #ccc;padding-left:20px;">
        <p>
          <span style="font-weight:bold;">Sunny</span>
          <span
            style="background:#db4946;color:white;font-weight:bold;margin-left:20px;border-radius:2px;"
          >LV.1</span>
        </p>
        <p style="font-size:13px;">
          工人ID：
          <span>A2345</span>
        </p>
        <p style="font-size:13px;">
          共赚金额：
          <span style="color:#db4946">￥50</span>
        </p>
      </div>

      <el-tabs value="first" type="card" style="margin-top:10px;">
        <el-tab-pane label="个人信息" name="first" style="padding-left:20px;">
          <div id="information" v-show="!change">
            <p>
              <span class="label-span">用户名：</span>
              <span class="text-span">{{userInfor.username}}</span>
            </p>
            <p>
              <span class="label-span">电话号码：</span>
              <span class="text-span">{{userInfor.teleNumber}}</span>
            </p>
            <p>
              <span class="label-span">职业：</span>
              <span class="text-span">{{userInfor.major}}</span>
            </p>
            <p>
              <span class="label-span">教育水平：</span>
              <span class="text-span">{{userInfor.education}}</span>
            </p>
            <p>
              <span class="label-span">工作地址：</span>
              <span class="text-span">{{userInfor.workArea}}</span>
            </p>
            <p>
              <span class="label-span">性别：</span>
              <span class="text-span">{{userInfor.gender}}</span>
            </p>
            <p>
              <span class="label-span">学校：</span>
              <span class="text-span">{{userInfor.school}}</span>
            </p>
            <p>
              <span class="label-span">联系地址：</span>
              <span class="text-span">{{userInfor.address}}</span>
            </p>
            <p>
              <span class="label-span">年龄：</span>
              <span class="text-span">{{userInfor.age}}</span>
            </p>
            <hr style="border:none;background:#ccc;height:1.5px">
            <p>
              <span class="label-span">邮箱：</span>
              <span class="text-span">{{userInfor.email}}</span>
            </p>
            <p>
              <span class="label-span">等级：</span>
              <span class="text-span">{{userInfor.level}}</span>
            </p>
            <p>
              <span class="label-span">经验值：</span>
              <span class="text-span">{{userInfor.xp}}</span>
            </p>
            <p>
              <span class="label-span">账户余额：</span>
              <span class="text-span">{{userInfor.balance}}</span>
            </p>
            
            <el-button type="primary" @click="changeInfor" style="margin:0 auto;display:block;">修改</el-button>
          </div>
          <el-form v-show="change" :label-position="'left'" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="userInfor.username"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userInfor.gender">
                <el-option v-for="gender in genders" :key="gender" :value="gender"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="userInfor.teleNumber"></el-input>
            </el-form-item>
            <el-form-item label="职业">
              <el-input v-model="userInfor.major"></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-input v-model="userInfor.school"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="userInfor.age"></el-input>
            </el-form-item>
            <el-form-item label="教育水平">
              <el-input v-model="userInfor.education"></el-input>
            </el-form-item>
            <el-form-item label="工作地址">
              <el-input v-model="userInfor.workArea"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="userInfor.address"></el-input>
            </el-form-item>
            
            <p style="text-align:center">
              <el-button type="primary" @click="cancelChange">取消修改</el-button>
              <el-button type="primary" @click="changeEnsure">确认修改</el-button>
            </p>
          </el-form>
          
        </el-tab-pane>

        <el-tab-pane label="我的任务" name="second">
          <p>
            时间：
            <el-date-picker
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </p>

          <div style="min-height:300px;">
            <el-table
              :data="tableData"
              style="width: 100%;"
              type="flex"
              :header-cell-style="{background:'#eff0f1'}"
            >
              <el-table-column prop="time" label="请求者"></el-table-column>
              <el-table-column prop="time" label="项目名称"></el-table-column>
              <el-table-column prop="time" label="奖励"></el-table-column>
              <el-table-column prop="time" label="参与时间"></el-table-column>
              <el-table-column prop="time" label="操作"></el-table-column>
            </el-table>
          </div>

          <div
            class="pages"
            style="display:flex;flex-direction:row;justify-content:center;margin-bottom:100px;"
          >
            <el-pagination
              background
              :page-sizes="[10,20, 40]"
              :page-size="10"
              layout="sizes, prev, pager, next"
              :total="10"
              style="display:inline-block"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'
import WorkerHeader from "@/components/WorkerHeader.vue";
import axios from 'axios'

export default {
  components: {
    "worker-header": WorkerHeader
  },
  methods: {
    loadInfor: function() {
      axios({
        method: "get",
        url: "/api/worker/find-myself"
      }).then(response => {
        console.log(response)
        this.userInfor.id = response.data.worker.id;
        this.userInfor.username = response.data.worker.username;
        this.userInfor.name = response.data.worker.name;
        this.userInfor.teleNumber = response.data.worker.teleNumber;
        this.userInfor.eMail = response.data.worker.eMail;
        this.userInfor.balance = response.data.worker.balance;
        this.userInfor.withdrawnMethod = response.data.worker.withdrawnMethod;
        this.userInfor.gender = response.data.worker.gender;
        this.userInfor.age = response.data.worker.age;
        this.userInfor.email = response.data.worker.email;
        this.userInfor.address = response.data.worker.address;
        this.userInfor.xp = response.data.worker.xp;
        this.userInfor.level = response.data.worker.level;
        this.userInfor.school = response.data.worker.school;
        this.userInfor.education = response.data.worker.education;
        this.userInfor.major = response.data.worker.major;
        this.userInfor.workArea = response.data.worker.workArea;
      });
    },
    uploadInfor: function() {
      let param = new URLSearchParams();
      param.append("teleNumber", this.userInfor.teleNumber);
      param.append("username", this.userInfor.username);
      param.append("name", this.userInfor.name);
      param.append("eMail", this.userInfor.eMail);
      param.append("withdrawnMethod", this.userInfor.withdrawnMethod);
      param.append("education", this.userInfor.education);
      param.append("workArea", this.userInfor.workArea);
      param.append("major", this.userInfor.major);
      param.append("gender", this.userInfor.gender);
      param.append("age", this.userInfor.age);

      axios({
        method: "put",
        url: "/api/worker/update",
        data: param
      }).then(response => {
        console.log("put succeed");
        this.$options.methods.loadInfor.call(this);
      });
    },
    cancelChange: function() {
      this.change = false;
      this.$options.methods.loadInfor.call(this);
    },
    changeInfor: function() {
      this.change = true;
    },
    changeEnsure: function() {
      this.change = false;
      this.$options.methods.uploadInfor.call(this);
      //this.$options.methods.loadInfor.call(this);
    },

  },
  data() {
    return {
      change: false,
      userInfor: {
        id:"",
        username: "",
        name: "",
        teleNumber: "",
        eMail: "",
        balance: "",
        withdrawnMethod:"",
        education:"",
        workArea:"",
        age: "",
        xp:"",
        gender: "",
        major:"",
        school:"",
        level:"",
        workerId:"",
        email: "",
      },
      genders: ["男", "女"],

      activeName: ["1"],
      user: {},
      page: 1,
      help_page_menu: "0.0",
      input_search: "",
      input_advice: "",
      task: {},
      accepted: 0,
      questions: [],
      answer: [],
      question_index: [],
      tableData: [
        {
          date: "**软件公司",
          name: "产品评价分类",
          address: "审核中",
          time: "2019-2-1"
        },
        {
          date: "**软件公司",
          name: "产品评价分类",
          address: "审核中",
          time: "2019-2-1"
        },
        {
          date: "**软件公司",
          name: "产品评价分类",
          address: "审核中",
          time: "2019-2-1"
        },
        {
          date: "**软件公司",
          name: "产品评价分类",
          address: "审核中",
          time: "2019-2-1"
        }
      ]
    };
  },
  mounted(){
    this.$options.methods.loadInfor.call(this);
  }
  
};
</script>

<style scoped>
.el-input {
  width: 500px;
}

.label-span {
  width: 100px;
  display: inline-block;
  color: #666;
}

.text-span {
  color: #333;
  font-size: 14px;
}
</style>
