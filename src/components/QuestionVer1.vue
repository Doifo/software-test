<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="19" :offset="5">
            <div style="font-size:16pt;word-wrap:break-word;padding-top:2pt">{{qtmp.desc}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <div style="height: 300px; overflow: hidden">
              <img style="width: 400px" :src="qtmp.url">
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div style="font-size:18pt; text-align:center">选项</div>
        <el-radio-group v-model="opt" style="width: 100%">
          <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:12px">
            <el-col :span="9" :offset="3" style="text-align:left">
              <el-radio :label="index" style="font-size:20pt">
                <span style="font-size:16pt">{{item.content}}</span>
              </el-radio>
            </el-col>
          </el-row>
          <!-- <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:20px">
            <el-col :span="9" :offset="3" style="text-align:left">
              <el-radio :label="index">{{item.content}}</el-radio>
            </el-col>
          </el-row> -->
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    qtmp:Object,
    prevAns:Object
    // url:String,
    // desc:String,
    // opts:Array,
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
    getAns(){
      let tem={
        index:this.qtmp.index,
        ans:this.opt
      }
      return tem;
    },
    prevAnsRender() {
      if (this.prevAns != undefined) {
        this.opt = this.prevAns.ans;
        //this.drawAll();
        //this.pointsCollection = [];
      }
    }
  },
  mounted: function() {
    this.prevAnsRender();
    // console.log(this.qtmp);
  }
};
</script>

