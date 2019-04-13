<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div>{{template.desc}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <div style="height: 300px; overflow: hidden">
              <img style="width: 400px; border:blue 1px solid" :src="template.url">
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div>选项</div>
        <el-radio-group v-model="opt" style="width: 100%">
          <el-row v-for="(item,index) in template.opts" :key="index" style="margin-top:20px">
            <el-col :span="9" :offset="3" style="text-align:left">
              <el-radio :label="index">{{item.content}}</el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    template:Object
    // url:String,
    // desc:String,
    // opts:Array
  },
  data() {
    return {
      // desc: "请在此处编辑你的问题描述",
      // opts: [
      //   { content: "选项111111111", isEdit: false },
      //   { content: "选项2", isEdit: false },
      //   { content: "选项3", isEdit: false },
      //   { content: "选项4", isEdit: false }
      // ],
      opt: 0
    };
  },
  methods: {
  }
};
</script>