<template>
  <el-container style="padding: 0">
    <el-header style="padding: 0; height: 80px">
      <CommonHeadNav/>
    </el-header>
    <el-main style="padding: 0">
      <el-container>
        <el-aside style="padding: 0; width: 10%">
          <RequesterAsideNav/>
        </el-aside>
        <el-main style="background-color: #efefef; padding-left: 0; padding-right: 0;  padding-top: 150px; padding-bottom: 150px">

          <el-row style="background-color: white; padding: 20px">
            <el-col :span="20" :offset="4">
              <el-row id="information" v-show="!change">
                <el-col :span="12">
                  <p>
                    <span class="label-span">用户ID：</span>
                    <span class="text-span">{{userInfor.requesterId}}</span>
                  </p>
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
                </el-col>
                <el-col :span="12">
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
                    <span class="label-span">邮箱：</span>
                    <span class="text-span">{{userInfor.email}}</span>
                  </p>
                  <p>
                    <span class="label-span">账户余额：</span>
                    <span class="text-span">￥ {{userInfor.balance}}</span>
                  </p>
                </el-col>
              </el-row>

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

              <el-row>
                <el-col :span="4" :offset="8">
                  <el-button type="primary" @click="changeInfor" style="margin:0 auto;">修改</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

<!--            <el-tabs value="first" type="card" style="margin-top:10px;">-->
<!--              <el-tab-pane label="个人信息" name="first" style="padding-left:20px;">-->
<!--                -->
<!--              </el-tab-pane>-->

<!--              &lt;!&ndash; <el-tab-pane label="交易历史" name="third">-->
<!--                <el-table style="width: 100%;" type="flex" :header-cell-style="{background:'#eff0f1'}">-->
<!--                  <el-table-column prop="time" label="订单编号"></el-table-column>-->
<!--                  <el-table-column prop="time" label="订单金额"></el-table-column>-->
<!--                  <el-table-column prop="time" label="购买金额"></el-table-column>-->
<!--                  <el-table-column prop="time" label="订单状态"></el-table-column>-->
<!--                  <el-table-column prop="time" label="发票状态"></el-table-column>-->
<!--                </el-table>-->
<!--              </el-tab-pane> &ndash;&gt;-->
<!--              <el-tab-pane label="我的任务" name="forth">-->
<!--              </el-tab-pane>-->
<!--            </el-tabs>-->
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="padding: 0">
      <Footer/>
    </el-footer>
  </el-container>
<!--    <worker-header></worker-header>-->
</template>

<script>
import TaskForRequester from "@/components/requester/TaskForRequester";

import CommonHeadNav from '@/components/public/CommonHeaderNav'
import RequesterAsideNav from '@/components/public/RequesterAsideNav'
import Footer from '@/components/public/Footer'

import axios from "axios";

export default {
  computed:{
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
    };
  },
  components: {
    TaskForRequester,
    CommonHeadNav,
    RequesterAsideNav,
    Footer
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
    }
  },
  mounted: function() {
    this.$options.methods.loadInfor.call(this);

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
#information p{
  margin-top: 30px;
}

.label-span {
  font-weight: bold;
  width: 100px;
  display: inline-block;
  color: #666;
}

.text-span {
  color: #333;
  font-size: 14px;
}
</style>
