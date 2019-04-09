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
              <span>登录名：</span>
              <span>{{userInfor.userName}}</span>
            </p>
            <p>
              <span>性别：</span>
              <span>{{userInfor.gender}}</span>
            </p>
            <p>
              <span>年龄：</span>
              <span>{{userInfor.age}}</span>
            </p>
            <p>
              <span>所在公司：</span>
              <span>{{userInfor.group}}</span>
            </p>
            <p>
              <span>手机号码：</span>
              <span>{{userInfor.phone}}</span>
            </p>
            <p>
              <span>联系邮箱：</span>
              <span>{{userInfor.email}}</span>
            </p>
            <p>
              <span>学历：</span>
              <span>{{userInfor.grade}}</span>
            </p>
            <p>
              <span>毕业院校：</span>
              <span>{{userInfor.school}}</span>
            </p>
            <p>
              <span>联系地址：</span>
              <span>{{userInfor.address}}</span>
            </p>
            <el-button type="primary" @click="changeInfor" style="margin:0 auto;display:block;">修改</el-button>
          </div>
          <el-form v-show="change" :label-position="'left'"  label-width="80px">
            <el-form-item label="登录名">
              <el-input v-model="userInfor.userName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userInfor.gender">
                <el-option
                  v-for="gender in genders"
                  :key="gender"
                  :value="gender"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="userInfor.age"></el-input>
            </el-form-item>
            <el-form-item label="所在公司">
              <el-input v-model="userInfor.group"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="userInfor.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="userInfor.email"></el-input>
            </el-form-item>
            <el-form-item label="学历">
              <el-input v-model="userInfor.grade"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校">
              <el-input v-model="userInfor.school"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="userInfor.address"></el-input>
            </el-form-item>
            <p style="text-align:center"><el-button type="primary" @click="change = !change">确认修改</el-button></p>
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
          <el-table
            
            style="width: 100%;"
            type="flex"
            :header-cell-style="{background:'#eff0f1'}"
          >
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
        userName: "1",
        gender: "2",
        age: "3",
        group: "4",
        phone: "5",
        email: "6",
        grade: "本科",
        school: "同济",
        address: "9"
      },
      genders:["男","女"],
    };
  },
  components: {
    "worker-header": WorkerHeader
  },
  methods: {
    changeInfor: function() {
      this.change = true;
    }
  },
  mounted: function() {
    axios({
      method: "get",
      url: "/api/requester/find-myself"
    }).then(response => {
      this.userInfor.userName=response.data.requester.username;
      this.userInfor.gender = response.data.requester.gender;
      this.userInfor.age=response.data.requester.age;
      this.userInfor.group=response.data.requester.institutionName;
      this.userInfor.phone=response.data.requester.teleNumber;
      this.userInfor.email=response.data.requester.eMail;
      // this.userInfo.grade=
      // this.school=
      this.userInfor.address=response.data.requester.address;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input{
  width: 500px;
}
</style>
