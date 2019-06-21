<template>
  <div style="border: #efefef 2px solid; padding-top: 40px; padding-bottom: 40px">
    <el-row>
      <el-col :span="10" :offset="2" style="background-color: #efefef; padding: 20px; height: 390px">
        <el-row>
          <el-col :span="18">
            <el-input v-if="isEditDesc" v-model="qtmp.desc"></el-input>
            <div v-else style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>
                {{qtmp.desc}}
              </strong>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              size="mini"
              @click="editDesc"
              v-if="isEditDesc"
              style=""
              plain
            >确认</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="editDesc"
              v-else
              style=""
              plain
            >编辑</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <div style="text-align: center">
              <img style="width: 256px; height: 256px" :src="qtmp.url">
          </div>
        </el-row>
      </el-col>
      <el-col :span="10" style="border: #efefef 2px solid; height: 390px">
        <el-row style="height: 200px; border-bottom: #efefef 2px solid; padding-left: 40px">
          <el-scrollbar style="height: 100%">
            <div style="font-size:16pt; padding: 20px; padding-left:0; text-align: left">
              <strong>编辑选项</strong>
            </div>
            <el-radio-group v-model="opt" style="width: 100%">
              <el-row v-for="(item,index) in qtmp.opts" :key="index">
                <el-col :span="9" :offset="3" style="text-align:left">
                  <el-input v-model="item.content" v-if="item.isEdit"></el-input>
                  <el-radio :label="index" v-else style="font-size:16pt">
                    <span style="font-size:16pt">{{item.content}}</span>
                  </el-radio>
                </el-col>
                <el-col :span="3" :offset="2">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="editOpt(index)"
                    style="padding: 2px"
                    plain
                    v-if="item.isEdit"
                  >确认</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="editOpt(index)"
                    style="padding: 2px"
                    plain
                    v-else
                  >编辑</el-button>
                </el-col>
                <el-col :span="3" :offset="1">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="deleteOpt(index)"
                    style="padding: 2px"
                    plain
                  >删除</el-button>
                </el-col>
              </el-row>
              <el-row style="padding-bottom: 20px; text-align: center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addOpt"
                  style="padding: 3px; margin-top:0px"
                  plain
                >添加</el-button>
            </el-row>
            </el-radio-group>
          </el-scrollbar>
        </el-row>
        <el-row style="padding-left: 40px">
          <div style="font-size:16pt; margin-top:10px; text-align: left">
            <strong>批量导入图片</strong>
          </div>
        </el-row>
        <el-row style="padding-left: 40px">
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
            >请按模板格式上传utf-8格式的txt文件</div>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            <el-button size="mini" type="primary" style="margin-top:10px; padding:5px" plain>点击上传</el-button>
          </el-upload>
          <a href="/static/template3.txt" download="template.txt">
            <el-button size="mini" type="primary"  plain style="margin-left:107px;margin-top:10px;padding:5px">模板下载</el-button>
          </a>
        </el-row>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="8" :offset="8">
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >编辑完成并保存</el-button>
        <el-button @click="test1">测试</el-button>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    qtmp: Object,
    taskId: Number
  },
  data() {
    return {
      msg: "child",
      isEditDesc: false,
      // desc: "请在此处编辑你的问题描述",
      // opts: [
      //   { content: "选项111111111", isEdit: false },
      //   { content: "选项2", isEdit: false },
      //   { content: "选项3", isEdit: false },
      //   { content: "选项4", isEdit: false }
      // ],
      opt: 0,
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
      this.qtmp.opts.push({ content: tem, isEdit: false });
    },
    deleteOpt(index) {
      this.qtmp.opts.splice(index, 1);
    },
    editOpt(index) {
      this.qtmp.opts[index].isEdit = !this.qtmp.opts[index].isEdit;
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
    console.log(this.qtmp);
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

