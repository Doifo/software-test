<template>
  <div>
    <worker-header></worker-header>
    <div style="width:70%;margin:0 auto; margin-top:50px;">
      <div style="background:#fffaf7;border:1px solid #ccc;padding-left:20px;">
        <p>
          <span style="font-weight:bold;">{{userInfor.username}}</span>
          <!-- <span
            style="background:#db4946;color:white;font-weight:bold;margin-left:20px;border-radius:2px;"
          >LV.1</span>-->
        </p>
        <p style="font-size:13px;">
          账户余额：
          <span style="color:#db4946">￥ {{userInfor.balance}}</span>
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
              <span class="label-span">机构名称：</span>
              <span class="text-span">{{userInfor.institutionName}}</span>
            </p>
            <p>
              <span class="label-span">支付方式：</span>
              <span class="text-span">{{userInfor.payMethod}}</span>
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
              <span class="label-span">联系地址：</span>
              <span class="text-span">{{userInfor.address}}</span>
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
            <el-form-item label="性别">
              <el-select v-model="userInfor.gender">
                <el-option v-for="gender in genders" :key="gender" :value="gender"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="userInfor.age"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="userInfor.teleNumber"></el-input>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input v-model="userInfor.institutionName"></el-input>
            </el-form-item>
            <el-form-item label="研究领域">
              <el-input v-model="userInfor.researchField"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="userInfor.address"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="userInfor.payMethod">
                <el-option v-for="pay in payMethods" :key="pay" :value="pay"></el-option>
              </el-select>
            </el-form-item>
            <p style="text-align:center">
              <el-button type="primary" @click="cancelChange">取消修改</el-button>
              <el-button type="primary" @click="changeEnsure">确认修改</el-button>
            </p>
          </el-form>
        </el-tab-pane>

        <!-- <el-tab-pane label="交易历史" name="third">
          <el-table style="width: 100%;" type="flex" :header-cell-style="{background:'#eff0f1'}">
            <el-table-column prop="time" label="订单编号"></el-table-column>
            <el-table-column prop="time" label="订单金额"></el-table-column>
            <el-table-column prop="time" label="购买金额"></el-table-column>
            <el-table-column prop="time" label="订单状态"></el-table-column>
            <el-table-column prop="time" label="发票状态"></el-table-column>
          </el-table>
        </el-tab-pane> -->

        <el-tab-pane label="我的任务" name="forth">
          <div class="container">
            <el-row class="task-title">
              <el-col :span="5" :offset="1">相关领域</el-col>
              <el-col :span="5" :offset="1">标题</el-col>
              <el-col :span="5" :offset="1">时间</el-col>
              <el-col :span="5" :offset="1">操作</el-col>
            </el-row>
            <task-for-requester v-for="task in showedTasks" :key="task.id" :task="task"></task-for-requester>
          </div>
          <p style="text-align:center;">
            <el-pagination
              background
              @current-change="changePage"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="myTaskList.length"
            ></el-pagination>
          </p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";
import axios from "axios";
import TaskForRequester from "@/components/TaskForRequester";

export default {
  computed:{
    showedTasks() {
      
      if(!this.myTaskList) return this.myTaskList
      let begin = this.pageSize * (this.currentPage - 1);
      let end = this.pageSize * this.currentPage;
      console.log(this.myTaskList[0])
      return this.myTaskList.slice(begin, end);
    }
  },
  data() {
    return {
      sizeForm: {
        money: "",
        chooseMoney: ""
      },
      change: false,
      userInfor: {
        username: "",
        name: "",
        teleNumber: "",
        researchField: "",
        institutionName: "",
        address: "",
        payMethod: "",
        gender: "",
        age: "",
        balance: "",
        email: "",
        eMail: "",
        requesterId: ""
      },
      genders: ["男", "女"],
      payMethods: ["支付宝", "微信支付"],
      myTaskList:[],
      currentPage:1,
      pageSize:5
    };
  },
  components: {
    "worker-header": WorkerHeader,
    TaskForRequester
  },
  methods: {
    loadInfor: function() {
      axios({
        method: "get",
        url: "/api/requester/find-myself"
      }).then(response => {
        console.log("load succeed");
        //console.log(response);
        this.userInfor = response.data.requester;
        this.change = false;
      });
    },
    uploadInfor: function() {
      let param = new URLSearchParams();
      param.append("teleNumber", this.userInfor.teleNumber);
      param.append("username", this.userInfor.username);
      param.append("name", this.userInfor.name);
      param.append("eMail", this.userInfor.eMail);
      param.append("researchField", this.userInfor.researchField);
      param.append("institutionName", this.userInfor.institutionName);
      param.append("address", this.userInfor.address);
      param.append("payMethod", this.userInfor.payMethod);
      param.append("gender", this.userInfor.gender);
      param.append("age", this.userInfor.age);
      console.log("params:", JSON.stringify(param));

      axios({
        method: "put",
        url: "/api/requester/update",
        data: param
      }).then(response => {
        console.log("put succeed");
        this.$options.methods.loadInfor.call(this);
      });
    },
    cancelChange() {
      this.$options.methods.loadInfor.call(this);
    },
    changeInfor: function() {
      this.change = true;
    },
    changeEnsure: function() {
      this.$options.methods.uploadInfor.call(this);
    },
    changePage(page) {
      //console.log(page);
      this.currentPage = page;
    }
  },
  mounted: function() {
    this.$options.methods.loadInfor.call(this);
    axios.get('/api/task/find-my-task').then(response=>{
      if(response.data.message == 'there is no task published by you'){
        this.myTaskList = []
      }else{
        this.myTaskList=response.data.tasks;
      }
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  min-height: 300px;
}
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
