<template>
    <div>
        <p style="text-align:right">时间：
            <el-date-picker 
            size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </p>
        <el-row class="task-content-header">
            <el-col :span="6">请求者</el-col>
            <el-col :span="5">项目名称</el-col>
            <el-col :span="3">奖励</el-col>
            <el-col :span="4">参与时间</el-col>
            <el-col :span="4">剩余时间</el-col>
            <el-col :span="2">操作</el-col>
        </el-row>

        <el-row class="task-participated-item">
            <el-col :span="6">南京某有限公司</el-col>
            <el-col :span="5">产品评价分类</el-col>
            <el-col :span="3">审核中</el-col>
            <el-col :span="4">2019-1-1 10：10：10</el-col>
            <el-col :span="4">10：00</el-col>
            <el-col :span="2"><span class="operate-continue">继续完成</span></el-col>
        </el-row>

        <el-row class="task-participated-item">
            <el-col :span="6">南京某有限公司</el-col>
            <el-col :span="5">产品评价分类</el-col>
            <el-col :span="3">审核中</el-col>
            <el-col :span="4">2019-1-1 10：10：10</el-col>
            <el-col :span="4">10：00</el-col>
            <el-col :span="2"><span class="operate-delete">删除</span></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'WorkerTaskParticipated',
    data () {
        return {
        
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-content-header{
    background:#eff0f1;
    height:50px;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding-left: 30px;
    font-weight: bold;
}

.task-participated-item{
    padding-left: 30px;
    font-size: 13px;
    padding-top:15px;
    padding-bottom:15px;
    border-bottom:1px solid #ccc;
}

.operate-continue{
    color:green;
}

.operate-delete{
    color:orange;
}
</style>
