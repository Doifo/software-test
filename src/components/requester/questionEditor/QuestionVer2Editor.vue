<template>
  <div style="padding: 20px; padding-top: 40px; padding-bottom: 40px; border: #efefef 2px solid" >
    <el-row>
      <el-col :span="10" :offset="2" style="background-color: #efefef; height: 390px">
        <el-row style="padding: 20px">
          <el-col :span="18">
            <el-input v-if="isEditDesc" v-model="qtmp.desc"></el-input>
            <div v-else style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>{{qtmp.desc}}</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="mini" @click="editDesc" plain v-if="isEditDesc">确认</el-button>
            <el-button type="primary" size="mini" @click="editDesc" plain v-else>编辑</el-button>
          </el-col>
        </el-row>
        <div style="width: 256px; height: 256px; position: relative; left: 78px">
          <img style="position: absolute; left: 0px" width="256" height="256" :src="qtmp.url">
          <canvas
            width="256"
            height="256"
            style="border: blue 1px solid; margin: 0px; position: absolute; left: 0px"
            ref="myCanvas"
          ></canvas>
        </div>
      </el-col>
      <el-col :span="10" style="border: #efefef 2px solid; height: 390px">
        <el-row style="height: 200px; border-bottom: #efefef 2px solid; padding-left: 20px">
          <el-scrollbar style="height: 100%">
            <div style="font-size:16pt; text-align: left; padding: 20px; padding-bottom: 10px">
              <strong>编辑选项</strong>
            </div>
            <el-radio-group v-model="opt" style="width: 100%" :fill="qtmp.opts[opt].color">
                <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top: 10px">
                  <el-col :span="6" :offset="2" style="text-align:left">
                    <el-input v-model="item.content" v-if="item.isEdit"></el-input>
                    <el-radio-button
                      :label="index"
                      v-else
                      style="font-size:16pt; padding:0; padding-top:5px; padding-left:3px; padding-right:3px"
                      border
                    >
                      <span style="font-size:16pt; margin-top:15px">{{item.content}}</span>
                    </el-radio-button>
                  </el-col>
                  <el-col :span="2" :offset="3 "style="margin-top: 7px">
                    <el-color-picker v-model="item.color"></el-color-picker>
                  </el-col>
                  <el-col :span="3" :offset="2" style="margin-top: 5px">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="editOpt(index)"
                      style="padding: 2px; margin-top:8px"
                      plain
                      v-if="item.isEdit"
                    >确认</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="editOpt(index)"
                      style="padding: 2px; margin-top:8px"
                      plain
                      v-else
                    >编辑</el-button>
                  </el-col>
                  <el-col :span="3" :offset="1" style="margin-top: 5px">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteOpt(index)"
                      style="padding: 2px; margin-top:8px"
                      plain
                    >删除</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :offset="10">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="addOpt"
                      style="padding: 3px; margin-top:20px"
                      plain
                    >添加</el-button>
                  </el-col>
                </el-row>
              </el-radio-group>
          </el-scrollbar>
        </el-row>
        <el-row>

          <el-col :span="20" style="padding-left: 40px">
            <div style="font-size:16pt; margin-top:10px; text-align: left;">
              <strong>批量导入图片</strong>
            </div>
            <el-upload
              class="upload-demo"
              ref="upload"
              action
              :http-request="myUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="submitSuccess"
              :before-remove="beforeRemove"
              :multiple="false"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
            >
              <div
                class="el_upload_tip"
                style="font-size:14pt; margin-top:10px"
              >
                请按模板格式上传utf-8格式的txt
              </div>
              <el-button size="mini" type="primary" style="margin-top:10px; padding:5px" plain>点击上传</el-button>
            </el-upload>
            <a href="/static/label.txt" download="template.txt">
              <el-button size="mini" type="primary" style="margin-left:87px;margin-top:10px; padding: 5px" plain>模板下载</el-button>
            </a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import axios from "axios";

export default {
  props: {
    taskId: Number,
    qtmp: Object
  },
  data() {
    return {
      isEditDesc: false,
      // qtmp: {
      //   desc: "请在此处编辑你的问题描述",
      //   opts: [
      //     { content: "猫", isEdit: false, color: "#FFF200" },
      //     { content: "狗", isEdit: false, color: "#FF0000" },
      //     { content: "猪", isEdit: false, color: "#006AFF" },
      //     { content: "人", isEdit: false, color: "#00FF48" }
      //   ],
      //   url:
      //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553590617718&di=accf7a96bf02a04228a10fea868c0ab2&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwto7dfkvqwb4en3q_4b902c3d9f8abab8.jpg"
      // },
      rectCollection: [],
      opt: 0,
      startPos: { x: 0, y: 0 },
      endPos: { x: 0, y: 0 },
      startPoints: [],
      endPoints: [],
      isDrag: false,
      fileList: []
    };
  },
  methods: {
    editDesc() {
      this.isEditDesc = !this.isEditDesc;
    },
    addOpt() {
      let n = this.qtmp.opts.length + 1;
      let tem = "选项" + n;
      this.qtmp.opts.push({ content: tem, isEdit: false, color: "#006AFF" });
      let temRects = [];
      this.rectCollection.push(temRects);
    },
    editOpt(index) {
      this.qtmp.opts[index].isEdit = !this.qtmp.opts[index].isEdit;
    },
    deleteOpt(index) {
      this.qtmp.opts.splice(index, 1);
    },
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitSuccess(response, file, fileList) {
      alert("上传成功");
      this.$refs.upload.clearFiles();
    },
    myUpload: function(params) {
      //alert('OK');
      let formData = new FormData();
      formData.append("file", params.file);
      formData.append("description", this.qtmp.desc);
      formData.append("options", JSON.stringify(this.qtmp.opts));
      formData.append("taskId", this.taskId);
      axios
        .post("/api/task/add-resource", formData)
        .then(response => {
          alert("上传成功");
        })
        .catch(response => {
          alert("error");
        });
      console.log(this.qtmp.desc);
    }
  },
  mounted: function() {
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
  .debugBox{
    border: 1px solid black;
  }
</style>
