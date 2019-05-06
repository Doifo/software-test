<template>
  <div id="type2">
    <img :src="url">
    <canvas
      width="120"
      height="120"
      style="margin: 0px; position: absolute; top: 0px"
      ref="canvas"
    ></canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      task: {},
      url: ""
    };
  },
  props:{
    answer: Object,
    taskId: String
  },
  methods: {

  },
  mounted(){
    axios
      .get("/api/task/read-resource", { params: { taskId: this.taskId } })
      .then(response => {
        this.task = response.data;
        this.url = response.data.urls[this.answer.index - 1].url;
        console.log(this.answer);

        let oGC = this.$refs.canvas.getContext("2d");
        this.answer.ans.forEach((points, index) => {
          oGC.strokeStyle = this.task.opts[index].color;
          if(points.length == 0) return;
          oGC.strokeRect(points[0].x/10*3,points[0].y/10*3,points[0].w/10*3,points[0].h/10*3)
          // oGC.beginPath();
          // if (points.length == 0) return;
          // oGC.moveTo((points[0][0].x / 10) * 3, (points[0][0].y / 10) * 3);
          // for (let i = 1; i < points[0].length; i++) {
          //   oGC.lineTo((points[0][i].x / 10) * 3, (points[0][i].y / 10) * 3);
          // }
          // oGC.closePath();
          // oGC.stroke();
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#type2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #ccc;
  position: relative;
}
img {
  width: 120px;
  height: 120px;
}
</style>
