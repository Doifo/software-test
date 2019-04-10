<template>
  <div>
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
          共用金额：
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
              <span class="label-span">邮箱：</span>
              <span class="text-span">{{userInfor.email}}</span>
            </p>
            <p>
              <span class="label-span">研究领域：</span>
              <span class="text-span">{{userInfor.reaserch_field}}</span>
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
            <el-form-item label="年龄">
              <el-input v-model="userInfor.age"></el-input>
            </el-form-item>
            <el-form-item label="研究领域">
              <el-input v-model="userInfor.reaserch_field"></el-input>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input v-model="userInfor.institutionName"></el-input>
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

        <el-tab-pane label="充值" name="second">
          <el-form ref="form" label-width="80px" :model="sizeForm">
            <el-form-item label="选择金额">
              <el-radio-group v-model="sizeForm.chooseMoney">
                <el-radio border label="￥50"></el-radio>
                <el-radio border label="￥100"></el-radio>
                <el-radio border label="￥500"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="输入金额">
              <el-input v-model="sizeForm.money" style="width:150px;" placeholder="￥"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click.prevent>充值</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="交易历史" name="third">
          <el-table style="width: 100%;" type="flex" :header-cell-style="{background:'#eff0f1'}">
            <el-table-column prop="time" label="订单编号"></el-table-column>
            <el-table-column prop="time" label="订单金额"></el-table-column>
            <el-table-column prop="time" label="购买金额"></el-table-column>
            <el-table-column prop="time" label="订单状态"></el-table-column>
            <el-table-column prop="time" label="发票状态"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";
import axios from "axios";

export default {
  name: "RequesterInformation",
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
        reaserch_field: "",
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
      payMethods: ["支付宝", "微信支付"]
    };
  },
  components: {
    "worker-header": WorkerHeader
  },
  methods: {
    loadInfor: function() {
      axios({
        method: "get",
        url: "/api/requester/find-myself"
      }).then(response => {
        this.userInfor.username = response.data.requester.username;
        this.userInfor.name = response.data.requester.name;
        this.userInfor.gender = response.data.requester.gender;
        this.userInfor.age = response.data.requester.age;
        this.userInfor.teleNumber = response.data.requester.teleNumber;
        this.userInfor.email = response.data.requester.email;
        this.userInfor.eMail = response.data.requester.eMail;
        this.userInfor.address = response.data.requester.address;
        this.userInfor.requesterId = response.data.requester.requesterId;
        this.userInfor.balance = response.data.requester.balance;
        this.userInfor.reaserch_field = response.data.requester.research_field;
        this.userInfor.institutionName =
          response.data.requester.institutionName;
        this.userInfor.payMethod = response.data.requester.payMethod;
      });
    },
    uploadInfor:function(){
      let newInfor = {};
      newInfor.username = this.userInfor.username;
      newInfor.name = this.userInfor.name;
      newInfor.teleNumber = this.userInfor.teleNumber;
      newInfor.eMail = this.userInfor.email;
      newInfor.reaserch_field = this.userInfor.reaserch_field;
      newInfor.institutionName = this.userInfor.institutionName;
      newInfor.address = this.userInfor.address;
      newInfor.payMethod = this.userInfor.payMethod;
      newInfor.gender = this.userInfor.gender;
      newInfor.age = this.userInfor.age;

      axios.put("/api/requester/update",newInfor
      ).then(response => {
        console.log("success");
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
      this.$options.methods.loadInfor.call(this);
    },
    
  },
  mounted: function() {
    this.$options.methods.loadInfor.call(this);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
