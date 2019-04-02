<template>
  <div>
    <worker-header></worker-header>
    <el-row>
      <el-col :span="14" style="padding:50px;">
        <div>
          <p class="statistic-title">总览</p>
          <p class="statistic-title">任务状态（最近45天内提交的任务）</p>
          <el-table
            :data="taskStatus"
            style="width: 100%;"
            :header-cell-style="{background:'#eff0f1'}"
          >
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="num" label="提交数量"></el-table-column>
            <el-table-column prop="approvement" label="批准"></el-table-column>
            <el-table-column prop="refused" label="被拒绝"></el-table-column>
            <el-table-column prop="approving" label="待批准"></el-table-column>
            <el-table-column prop="money" label="金额"></el-table-column>
            <el-table-column prop="award" label="奖励"></el-table-column>
            <el-table-column prop="earnings" label="总收益"></el-table-column>
          </el-table>
        </div>

        <div>
          <p class="statistic-title">按期间计算的总收入</p>
          <el-table
            :data="earningsInSection"
            style="width: 100%;"
            :header-cell-style="{background:'#eff0f1'}"
          >
            <el-table-column prop="date" label="年"></el-table-column>
            <el-table-column prop="earnings" label="收入"></el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="10" style="padding:50px;">
        <div>
          <p class="statistic-title">可用收益</p>
          <div class="card">
            <p style="width:100%">
              可用于转移
              <span style="float:right">0.00</span>
            </p>
            <el-button type="primary">提现</el-button>
          </div>
        </div>

        <div>
          <p class="statistic-title">任务概述</p>
          <div class="card">
            <p style="width:100%">
              批准
              <span style="float:right">0.00</span>
            </p>
            <p style="width:100%">
              批准率
              <span style="float:right">0.00%</span>
            </p>
            <hr style="width:100%;border:none;height:1.5px;background-color:#ccc">
            <p style="width:100%">
              待批准
              <span style="float:right">0.00</span>
            </p>
            <hr style="width:100%;border:none;height:1.5px;background-color:#ccc">
            <p style="width:100%">
              被批准
              <span style="float:right">0.00</span>
            </p>
            <p style="width:100%">
              拒绝率
              <span style="float:right">0.00%</span>
            </p>
          </div>
        </div>

        <div>
          <p class="statistic-title">迄今为止的收益</p>
          <el-table
            :data="allEarnings"
            style="width: 100%;"
            :header-cell-style="{background:'#eff0f1'}"
          >
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="earnings" label="收入"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";

export default {
  name: "WorkerStatistic",
  data() {
    return {
      taskStatus: [
        {
          date: "02-14 — 03-02",
          num: "0",
          approvement: "0",
          refused: "0",
          approving: "0",
          money: "0",
          award: "0",
          earnings: "0"
        }
      ],
      earningsInSection: [
        {
          date: "2019",
          earnings: "0.00"
        },
        {
          date: "2018",
          earnings: "0.00"
        }
      ],
      allEarnings: [
        {
          type: "批准的任务",
          earnings: "0.00"
        },
        {
          type: "奖金",
          earnings: "0.00"
        },
        {
          type: "总收入",
          earnings: "0.00"
        }
      ]
    };
  },
  components: {
    "worker-header": WorkerHeader
  }
};
</script>

<style>
.statistic-title {
  color: #1471eb;
}

.card {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
