<template>
  <div style="background-color: white; padding-bottom: 30px">
    <el-row>
      <el-col :span="12" :offset="2" style="text-align: center; background-color: #efefef; height: 350px; padding: 20px">
        <el-row>
          <div style="text-align: center">
            <div style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>{{qtmp.desc}}</strong>
            </div>
          </div>
        </el-row>
        <div style="width: 256px; height: 256px; position: relative; margin-top:20px; left: 74px">
          <img style="position: absolute; left: 0px" width="256" height="256" :src="qtmp.url">
          <canvas
            width="256"
            height="256"
            style="margin: 0px; position: absolute; left: 0px"
            ref="myCanvas"
          ></canvas>
        </div>
      </el-col>
      <el-col :span="8" style="border: #efefef 2px solid; height:350px; padding: 20px">
        <el-scrollbar>
          <div style="font-size:16pt; text-align:center; padding-bottom: 20px; border-bottom: #efefef 2px solid">
            <strong>类别</strong>
          </div>
          <el-radio-group v-model="opt" style="width: 100%" :fill="qtmp.opts[opt].color">
            <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:10px; border-bottom: #efefef 2px solid; padding-bottom: 10px">
              <el-col :span="9" :offset="3" style="text-align:left">
                <el-radio-button
                  :label="index"
                  style="font-size:16pt; padding:0; padding-left:3px; padding-right:3px"
                  border
                >
                  <span style="font-size:16pt; margin-top:15px">{{item.content}}</span>
                </el-radio-button>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  props: {
    qtmp: Object,
    prevAns: Object
  },
  data() {
    return {
      isEditDesc: false,
      // qtmp:{
      //   desc:'请在此处编辑你的问题描述',
      //   opts:[ { content: '猫', isEdit: false, color:'#FFF200' },
      //   { content: '狗', isEdit: false, color:'#FF0000'},
      //   { content: '猪', isEdit: false, color:'#006AFF' },
      //   { content: '人', isEdit: false, color:'#00FF48'}],
      //   url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553590617718&di=accf7a96bf02a04228a10fea868c0ab2&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwto7dfkvqwb4en3q_4b902c3d9f8abab8.jpg'
      // },
      rectCollection: [],
      opt: 0,
      startPos: { x: 0, y: 0 },
      endPos: { x: 0, y: 0 },
      startPoints: [],
      endPoints: [],
      isDrag: false
    };
  },
  methods: {
    cancel() {
      this.$refs.myCanvas.getContext("2d").clearRect(0, 0, 400, 400);
      this.startPoints.pop();
      this.endPoints.pop();
      this.drawAll();
    },
    drawAll() {
      let ctx = this.$refs.myCanvas.getContext("2d");
      for (let i = 0; i < this.rectCollection.length; ++i) {
        // let w = this.endPoints[i].x - this.startPoints[i].x;
        // let h = this.endPoints[i].y - this.startPoints[i].y;
        let tem = this.rectCollection[i];
        for (let j = 0; j < tem.length; ++j) {
          ctx.strokeStyle = this.qtmp.opts[i].color;
          ctx.strokeRect(tem[j].x, tem[j].y, tem[j].w, tem[j].h);
        }
        // this.$refs.myCanvas
        //   .getContext("2d")
        //   .strokeRect(this.startPoints[i].x, this.startPoints[i].y, w, h);
      }
    },
    test() {
      // console.log(this.rectCollection);
      this.drawAll();
      console.log(this.rectCollection);
    },
    getAns() {
      let tem = {
        index: this.qtmp.index,
        ans: this.rectCollection
      };
      return tem;
    },
    prevAnsRender() {
      if (this.prevAns!=undefined) {
        this.rectCollection = this.prevAns.ans;
        this.drawAll();
        this.rectCollection = [];
      }
    }
  },
  mounted: function() {
    this.prevAnsRender();

    for (let i = 0; i < this.qtmp.opts.length; ++i) {
      let tem = [];
      this.rectCollection.push(tem);
    }

    this.$refs.myCanvas.onmousedown = e => {
      console.log("down");
      this.startPos.x = e.layerX;
      this.startPos.y = e.layerY;
      this.isDrag = true;
    };

    this.$refs.myCanvas.onmousemove = e => {
      if (this.isDrag == true) {
        console.log("move");
        let ctx = this.$refs.myCanvas.getContext("2d");
        ctx.clearRect(0, 0, 400, 400);
        this.endPos.x = e.layerX;
        this.endPos.y = e.layerY;
        let width = this.endPos.x - this.startPos.x;
        let height = this.endPos.y - this.startPos.y;
        // this.$refs.myCanvas
        //   .getContext("2d")
        ctx.strokeStyle = this.qtmp.opts[this.opt].color;
        ctx.strokeRect(this.startPos.x, this.startPos.y, width, height);
        this.drawAll();
        // for(let i=0; i<this.startPoints.length; ++i){
        //   let w=this.endPoints[i].x-this.startPoints[i].x;
        //   let h=this.endPoints[i].y-this.startPoints[i].y;
        //   this.$refs.myCanvas
        //   .getContext("2d")
        //   .strokeRect(this.startPoints[i].x, this.startPoints[i].y, w, h);
        // }
      }
    };

    this.$refs.myCanvas.onmouseup = e => {
      console.log("up");
      this.endPos.x = e.layerX;
      this.endPos.y = e.layerY;
      this.isDrag = false;
      let width = this.endPos.x - this.startPos.x;
      let height = this.endPos.y - this.startPos.y;
      this.$refs.myCanvas
        .getContext("2d")
        .strokeRect(this.startPos.x, this.startPos.y, width, height);
      let tem1 = {
        x: this.startPos.x,
        y: this.startPos.y
      };
      let tem2 = {
        x: this.endPos.x,
        y: this.endPos.y
      };
      let tem = {
        x: this.startPos.x,
        y: this.startPos.y,
        w: tem2.x - tem1.x,
        h: tem2.y - tem1.y
      };
      this.rectCollection[this.opt].push(tem);
      this.startPoints.push(tem1);
      this.endPoints.push(tem2);
      this.drawAll();
    };
    // this.$refs.myCanvas.onmousemove=function(e){
    //   console.log("move");
    // };
    // this.$refs.myCanvas.onmouseup=function(e){
    //   console.log("up");
    // };
    // this.$refs.myCanvas.onmouseout=function(e){
    //   console.log("out");
    // };
    // var ctx = this.$refs.myCanvas.getContext("2d");
    // ctx.strokeRect(100, 100, 100, 100);
  }
};
</script>

<style scoped>
.el-button {
  font-size: 16pt;
}
</style>
