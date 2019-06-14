<template>
  <div style="padding-bottom: 30px">
    <el-row>
      <el-col :span="12" :offset="2" style="background-color: #efefef; padding: 20px; height: 350px">
        <el-row>
          <div style="text-align: center">
            <div style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>{{qtmp.desc}}</strong>
            </div>
          </div>
        </el-row>
        <el-row style="margin-top: 20px">
          <div style="">
              <img style="width: 256px; height: 256px" :src="qtmp.url">
          </div>
        </el-row>
      </el-col>
      <el-col :span="8" style="border: #efefef 2px solid; height:350px; padding: 20px">
          <el-scrollbar style="height: 100%">
            <div style="font-size:16pt; text-align:center; padding-bottom: 20px; border-bottom: #efefef 2px solid">
              <strong>选项</strong>
            </div>
            <el-radio-group v-model="opt" style="width: 100%">
              <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:20px; border-bottom: #efefef 2px solid; padding: 0">
                <el-col :span="9" :offset="3" style="text-align:left">
                  <el-radio :label="index" style="font-size:16pt">
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
          </el-scrollbar>
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
      };
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

<style>
  .el-scrollbar{
    height:100%;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>

