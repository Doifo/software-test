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

      <el-tabs value="first" type="card" @tab-click="handleClick" style="margin-top:10px;">
        <el-tab-pane label="个人信息" name="first" style="padding-left:20px;">
          <p>
            <span>登录名：</span>
            <span>{{userName}}</span>
          </p>
          <p>
            <span>性别：</span>
            <span>{{gender}}</span>
          </p>
          <p>
            <span>年龄：</span>
            <span>{{age}}</span>
          </p>
          <p>
            <span>所在公司：</span>
            <span>{{group}}</span>
          </p>
          <p>
            <span>手机号码：</span>
            <span>{{phone}}</span>
          </p>
          <p>
            <span>联系邮箱：</span>
            <span>{{email}}</span>
          </p>
          <p>
            <span>学历：</span>
            <span>{{grade}}</span>
          </p>
          <p>
            <span>毕业院校：</span>
            <span>{{school}}</span>
          </p>
          <p>
            <span>联系地址：</span>
            <span>{{address}}</span>
          </p>
          <el-button type="primary" @click="confirmupdate" style="margin:0 auto;display:block;">修改</el-button>
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
            :data="tableData"
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
      userName: "1",
      gender: "2",
      age: "3",
      group: "4",
      phone: "5",
      email: "6",
      grade: "7",
      school: "8",
      address: "9"
    };
  },
  components: {
    "worker-header": WorkerHeader
  },
  mounted: function() {
    axios({
      method: "get",
      url: "/api/requester/find-myself",
    }).then(response=>{
      alert("OK");
      this.userName=response.data.requester.username;
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
