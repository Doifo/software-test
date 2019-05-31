<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="2">
        <el-row>
          <el-col :span="19" :offset="5">
            <div style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>{{qtmp.desc}}</strong>
            </div>
          </el-col>
        </el-row>
        <div style="width: 420px; height: 420px; position: relative; margin-top:20px">
          <img
            style="position: absolute; left: 0px"
            width="400"
            height="400"
            :src="qtmp.url"
          >
          <canvas
            width="400"
            height="400"
            style="border: blue 1px solid; margin: 0px; position: absolute; left: 0px"
            ref="myCanvas"
          ></canvas>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="font-size:18pt; text-align:center">
          <strong>类别</strong>
        </div>
        <el-radio-group v-model="opt" style="width: 100%" :fill="qtmp.opts[opt].color">
          <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:30px">
            <el-col :span="9" :offset="3" style="text-align:left">
              <el-radio-button
                :label="index"
                style="font-size:20pt; padding:0; padding-top:5px; padding-left:3px; padding-right:3px"
                border
              >
                <span style="font-size:16pt; margin-top:15px">{{item.content}}</span>
              </el-radio-button>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  props:{
    qtmp:Object,
    prevAns:Object
  },
  data() {
    return {
      isEditDesc: false,
      opt: 0,
      startPos: { x: 0, y: 0 },
      endPos: { x: 0, y: 0 },
      points: [],
      pointsCollection:[],
      isDrawing: false
    };
  },
  methods: {
    closePoly() {
      //alert('Close')
      let ctx = this.$refs.myCanvas.getContext("2d");
      ctx.closePath();
      ctx.stroke();
      alert("Close");
    },
    drawPath() {
      let ctx = this.$refs.myCanvas.getContext("2d");
      ctx.lineWidth = "3";
      ctx.strokeStyle = this.qtmp.opts[this.opt].color;
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; ++i) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      //ctx.closePath();
      ctx.stroke();
    },
    distance(x1, y1, x2, y2) {
      let dx = x2 - x1;
      let dy = y2 - y1;
      return dx * dx + dy * dy;
    },
    test(){
      console.log(this.pointsCollection);
    },
    getAns(){
      let tem={
        index:this.qtmp.index,
        ans:this.pointsCollection
      };
      return tem;
    },
    // cancel() {
    //   this.$refs.myCanvas.getContext("2d").clearRect(0, 0, 400, 400);
    //   this.startPoints.pop();
    //   this.endPoints.pop();
    //   this.drawAll();
    // },
    // drawAll() {
    //   for (let i = 0; i < this.startPoints.length; ++i) {
    //     let w = this.endPoints[i].x - this.startPoints[i].x;
    //     let h = this.endPoints[i].y - this.startPoints[i].y;
    //     this.$refs.myCanvas
    //       .getContext("2d")
    //       .strokeRect(this.startPoints[i].x, this.startPoints[i].y, w, h);
    //   }
    // }
    prevAnsRender() {
      if (this.prevAns!=undefined) {
        this.pointsCollection = this.prevAns.ans;
        this.drawAll();
        this.pointsCollection = [];
      }
    }
  },
  mounted: function() {
    this.prevAnsRender();
    for(let i=0; i<this.qtmp.opts.length; ++i){
      let tem=[];
      this.pointsCollection.push(tem);
    }
    this.$refs.myCanvas.onmousedown = e => {
      let ctx = this.$refs.myCanvas.getContext("2d");
      console.log("down");
      if (this.isDrawing == false) {
        alert("开始画点");
        this.isDrawing = true;
        let point = {
          x: e.layerX,
          y: e.layerY
        };
        this.points.push(point);
        // ctx.beginPath();
        // ctx.moveTo(e.layerX,e.layerY);
      } else {
        let point = {
          x: e.layerX,
          y: e.layerY
        };
        let point0 = {
          x: this.points[0].x,
          y: this.points[0].y
        };
        if (this.distance(point0.x, point0.y, point.x, point.y) < 16) {
          this.drawPath();
          this.closePoly();
          this.isDrawing = false;
          let temStr=JSON.stringify(this.points);
          let tem=JSON.parse(temStr);
          this.pointsCollection[this.opt].push(tem);
          this.points = [];
        } else {
          //alert(this.distance(point0.x, point0.y, point.x, point.y));
          this.points.push(point);
          this.drawPath();
        }
        // ctx.lineTo(e.layerX,e.layerY);
        // ctx.stroke();
      }
      this.startPos.x = e.layerX;
      this.startPos.y = e.layerY;
      this.isDrag = true;
    };

    // this.$refs.myCanvas.onmousemove = e => {
    //   if (this.isDrag == true) {
    //     console.log("move");
    //     this.$refs.myCanvas.getContext("2d").clearRect(0, 0, 400, 400);
    //     this.endPos.x = e.layerX;
    //     this.endPos.y = e.layerY;
    //     let width = this.endPos.x - this.startPos.x;
    //     let height = this.endPos.y - this.startPos.y;
    //     this.$refs.myCanvas
    //       .getContext("2d")
    //       .strokeRect(this.startPos.x, this.startPos.y, width, height);
    //     this.drawAll();
    //     // for(let i=0; i<this.startPoints.length; ++i){
    //     //   let w=this.endPoints[i].x-this.startPoints[i].x;
    //     //   let h=this.endPoints[i].y-this.startPoints[i].y;
    //     //   this.$refs.myCanvas
    //     //   .getContext("2d")
    //     //   .strokeRect(this.startPoints[i].x, this.startPoints[i].y, w, h);
    //     // }
    //   }
    // };

    // this.$refs.myCanvas.onmouseup = e => {
    //   console.log("up");
    //   this.endPos.x = e.layerX;
    //   this.endPos.y = e.layerY;
    //   this.isDrag = false;
    //   let width = this.endPos.x - this.startPos.x;
    //   let height = this.endPos.y - this.startPos.y;
    //   this.$refs.myCanvas
    //     .getContext("2d")
    //     .strokeRect(this.startPos.x, this.startPos.y, width, height);
    //   let tem1 = {
    //     x: this.startPos.x,
    //     y: this.startPos.y
    //   };
    //   let tem2 = {
    //     x: this.endPos.x,
    //     y: this.endPos.y
    //   };
    //   this.startPoints.push(tem1);
    //   this.endPoints.push(tem2);
    //   console.log(this.startPoints);
    //   console.log(this.endPoints);
    // };
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
