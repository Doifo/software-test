<template>
  <div>
    <worker-header></worker-header>
    <div style="width:70%;margin:0 auto;">
      <p style="color:#1471eb;font-size:20px;margin-top:50px;">编辑项目</p>
      <el-form ref="form" :model="form" label-width="100px" style="border:1px solid #ccc;">
        <el-form-item label="项目名称：" style="margin-top:20px;">
          <el-input></el-input>
        </el-form-item>
        <p class="line">描述项目</p>
        <el-form-item label="标题：">
          <el-input placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input placeholder="请输入描述信息" ></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="选择题" value="选择题"></el-option>
            <el-option label="图片圈注" value="图片圈注"></el-option>
          </el-select>
        </el-form-item>
        <p class="line">设置调查</p>
        <el-form-item label="每题奖励：">
          <el-input placeholder="元"></el-input>
        </el-form-item>
        <el-form-item label="受访者人数：">
          <el-input placeholder="人"></el-input>
        </el-form-item>
        <el-form-item label="完成期限：">
          <el-input placeholder="天"></el-input>
        </el-form-item>
        <p class="line">工人要求</p>
        <el-form-item label="学历">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <p style="text-align:right"><el-button type="primary">完成</el-button></p>
    </div>

  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";

export default {
  name: "RequesterEditproject",
  data() {
    return {
        form:{
            ragion:"",
        }
    };
  },
  components: {
    "worker-header": WorkerHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.line{
    background:#ccc;
    font-weight: bold;
    padding: 10px;
}

.el-input{
    width: 50%;
}

</style>
