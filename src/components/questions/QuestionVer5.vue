<template>
  <div style>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row>
          <el-col :span="19">
            <div style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>{{qtmp.desc}}</strong>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 30px">
          <div>
            <div><strong>语境: </strong>{{qtmp.context}}</div>
            <div style="margin-top: 20px"><strong>意图: </strong>{{qtmp.intent}}</div>
          </div>
        </el-row>
      </el-col>
<!--      <el-col :span="10">-->
<!--        <div style="font-size:18pt; text-align:center">选项</div>-->
<!--        <el-radio-group v-model="opt" style="width: 100%">-->
<!--          <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:12px">-->
<!--            <el-col :span="9" :offset="3" style="text-align:left">-->
<!--              <el-input v-model="item.content" v-if="item.isEdit"></el-input>-->
<!--              <el-radio :label="index" v-else style="font-size:20pt">-->
<!--                <span style="font-size:16pt">{{item.content}}</span>-->
<!--              </el-radio>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-radio-group>-->
<!--      </el-col>-->
    </el-row>
    <el-row style="margin-top: 40px">
      <el-col :span="18" :offset="3">
        <el-input
          placeholder="请输入内容"
          v-model="ansInput"
          clearable
          style="border: 0; border-bottom: 1px"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from "axios/index";

  export default {
    props: {
      qtmp: Object,
      prevAns:Object
    },
    data() {
      return {
        msg: "child",
        isEditDesc: false,
        //text: "?????????????????????????????????????????",
        // desc: "请在此处编辑你的问题描述",
        // opts: [
        //   { content: "选项111111111", isEdit: false },
        //   { content: "选项2", isEdit: false },
        //   { content: "选项3", isEdit: false },
        //   { content: "选项4", isEdit: false }
        // ],
        ansInput:''
      };
    },
    methods: {
      getAns() {
        let tem = {
          index: this.qtmp.index,
          ans: this.ansInput
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

<style scoped>
  .el-button {
    font-size: 16pt;
  }
</style>
