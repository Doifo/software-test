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
        <el-main
          style="background-color: #efefef; padding-left: 0; padding-right: 0;  padding-top: 50px; padding-bottom: 50px"
        >
          <div
            style="width: 65%; margin-left: 60px; float:left; height: 600px; background-color: white; border-radius: 5px"
          >
            <el-table
              :data="transactionList"
              style="width: 100%; font-size: 16pt"
              stripe
              border
              v-show="tabState==='交易记录'"
            >
              <el-table-column prop="id" label="订单号" width="200"></el-table-column>
              <el-table-column prop="taskId" label="项目编号" width="200"></el-table-column>
              <el-table-column prop="value" label="付款" width="200"></el-table-column>
              <el-table-column prop="time" label="支付时间"></el-table-column>
            </el-table>
            <el-table
              :data="withdrawalRecordList"
              style="width: 100%; font-size: 16pt"
              stripe
              border
              v-show="tabState==='提现记录'"
            >
              <el-table-column prop="id" label="订单号" width="200"></el-table-column>
              <el-table-column prop="value" label="金额" width="200"></el-table-column>
              <el-table-column prop="type" label="提现方式" width="200"></el-table-column>
              <el-table-column prop="time" label="支付时间"></el-table-column>
            </el-table>
          </div>
          <div style="width: 25%; margin-left: 40px; float:left;">
            <div style="background-color: white; padding: 20px; border-radius: 5px">
              <el-row style="font-size: 18pt">
                <strong>选择视图</strong>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-button type="success" @click="changeTabState('交易记录')">交易记录</el-button>
                <el-button type="primary" @click="changeTabState('提现记录')">提现记录</el-button>
              </el-row>
            </div>
            <div
              style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 15px"
            >
              <el-row style="font-size: 18pt">
                <strong>账号信息</strong>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="12" style="font-size: 16pt">
                  <strong>支付方式</strong>
                </el-col>
                <el-col :span="12" style="text-align: right">{{userInfo.payMethod}}</el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="12" style="font-size: 16pt">
                  <strong>账户余额</strong>
                </el-col>
                <el-col :span="12" style="text-align: right">{{userInfo.balance}}</el-col>
              </el-row>
            </div>
            <div
              style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 15px"
            >
              <el-row style="font-size: 16pt; margin-top: 10px">
                <el-col :span="12">
                  <strong>我要提现</strong>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <el-button type="primary" style="font-size: 12pt" size="mini" @click="getMoney">确定</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
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
import CommonHeadNav from "@/components/public/CommonHeaderNav";
import RequesterAsideNav from "@/components/public/RequesterAsideNav";
import Footer from "@/components/public/Footer";
import axios from "axios";

export default {
  components: {
    CommonHeadNav,
    RequesterAsideNav,
    Footer
  },
  name: "RequesterTransaction",
  data() {
    return {
      transactionList: [],
      withdrawalRecordList: [],
      userInfo: {},
      tabState: "交易记录"
    };
  },
  methods: {
    changeTabState(name) {
      this.tabState = name;
    },
    getMoney() {
      this.$prompt("请输入提现金额", "提现", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(^[1-9]\d*$)|(^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$)/,
        inputErrorMessage: "请输入合法金额"
      })
        .then(({ value }) => {
          this.$confirm("确认提现吗？", "提现", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //console.log(value)
              if (value > this.userInfo.balance) {
                this.$message.error("超出可提现金额");
                return this.getMoney();
              } else {
                let param = new URLSearchParams();
                param.append("requesterId", this.userInfo.requesterId);
                param.append("value", value);
                param.append("type", this.userInfo.payMethod);
                axios
                  .post("/api/requester/withdrawal-information", param)
                  .then(response => {
                    this.$alert("提现成功", "提现", {
                      confirmButtonText: "确定",
                      callback: action => {
                        this.$router.go(0);
                      }
                    });
                  });
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  },
  mounted() {
    axios
      .get("/api/requester/view-transaction-info")
      .then(response => {
        //console.log(response.data);
        this.transactionList = response.data.transaction_info;
        //console.log("my-sub-task:", this.myTasks);
      })
      .catch(response => {
        console.log("error:", response);
      });

    axios({
      method: "get",
      url: "/api/requester/find-myself"
    }).then(response => {
      //console.log("load succeed");
      //console.log(response);
      this.userInfo = response.data.requester;
      console.log(this.userInfo);
      axios
        .get("/api/requester/withdrawal-information", {
          params: { requesterId: this.userInfo.requesterId }
        })
        .then(response => {
          //console.log(response.data);
          this.withdrawalRecordList = response.data.withdrawal_information;
          console.log(this.withdrawalRecordList);
          //console.log("my-sub-task:", this.myTasks);
        })
        .catch(response => {
          console.log("error:", response);
        });
    });
  }
};
</script>

<style scoped>
</style>
