<template>
  <div>
    <!--导航-->
    <worker-header></worker-header>
    <div style="width:70%;margin:0 auto; margin-top:50px;">
      <div style="background:#fffaf7;border:1px solid #ccc;padding-left:20px;">
        <p>
          <span style="font-weight:bold;">{{userInfor.username}}</span>
          
        </p>
        <p style="font-size:13px;">
          工人ID：
          <span>{{userInfor.id}}</span>
        </p>
        <p style="font-size:13px;">
          账户余额：
          <span style="color:#db4946">￥{{userInfor.balance}}</span>
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
              <span class="label-span">姓名：</span>
              <span class="text-span">{{userInfor.name}}</span>
            </p>
            <p>
              <span class="label-span">提现方式：</span>
              <span class="text-span">{{userInfor.withdrawnMethod}}</span>
            </p>
            <p>
              <span class="label-span">电话号码：</span>
              <span class="text-span">{{userInfor.teleNumber}}</span>
            </p>
            <p>
              <span class="label-span">专业：</span>
              <span class="text-span">{{userInfor.major}}</span>
            </p>
            <p>
              <span class="label-span">教育水平：</span>
              <span class="text-span">{{userInfor.education}}</span>
            </p>
            <p>
              <span class="label-span">擅长领域：</span>
              <span class="text-span" v-for="area in areas" :key="area">{{area}}&nbsp;&nbsp;&nbsp;</span>
            </p>
            <p>
              <span class="label-span">性别：</span>
              <span class="text-span">{{userInfor.gender}}</span>
            </p>
            <p>
              <span class="label-span">年龄：</span>
              <span class="text-span">{{userInfor.age}}</span>
            </p>
            <p>
              <span class="label-span">所属机构：</span>
              <span class="text-span">{{userInfor.institution}}</span>
            </p>
            <hr style="border:none;background:#ccc;height:1.5px">
            <p>
              <span class="label-span">邮箱：</span>
              <span class="text-span">{{userInfor.email}}</span>
            </p>
            
            <el-button type="primary" @click="changeInfor" style="margin:0 auto;display:none;">修改</el-button>
          </div>
          <el-form v-show="change" :label-position="'left'" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="userInfor.username"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="userInfor.teleNumber"></el-input>
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="userInfor.major"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userInfor.gender">
                <el-option v-for="gender in genders" :key="gender" :value="gender"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="userInfor.age"></el-input>
            </el-form-item>
            <!-- <el-form-item label="教育水平">
              <el-input v-model="userInfor.education"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="工作地址">
              <el-input v-model="userInfor.workArea"></el-input>
            </el-form-item> -->
            
            <p style="text-align:center">
              <el-button type="primary" @click="cancelChange">取消修改</el-button>
              <el-button type="primary" @click="changeEnsure">确认修改</el-button>
            </p>
          </el-form>
          
        </el-tab-pane>

        <el-tab-pane label="我的任务" name="second">
          <worker-my-task></worker-my-task>
        </el-tab-pane>  
      </el-tabs>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'
import WorkerHeader from "@/components/WorkerHeader.vue";
import WorkerMyTask from '@/components/WorkerMyTask.vue'
import axios from 'axios'

export default {
  
  components: {
    "worker-header": WorkerHeader,
    "worker-my-task":WorkerMyTask,
  },
  methods: {
    loadInfor: function() {
      axios({
        method: "get",
        url: "/api/worker/find-myself"
      }).then(response => {
        this.userInfor = response.data.worker;
        console.log(this.userInfor)
        let areas = JSON.parse(this.userInfor.workArea);
        for(let key in areas){
          this.areas.push(areas[key])
        }
        //console.log(this.areas)
        this.change = false;
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
        console.log(response.data.message);
        this.$options.methods.loadInfor.call(this);
      });
    },
    cancelChange: function() {
      this.$options.methods.loadInfor.call(this);
    },
    changeInfor: function() {
      this.change = true;
    },
    changeEnsure: function() {
      this.$options.methods.uploadInfor.call(this);
    },
  },
  data() {
    return {
      areas:[],
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
