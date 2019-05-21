<template>
  <div style>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="14">
            <el-input v-if="isEditDesc" v-model="qtmp.desc"></el-input>
            <div v-else style="font-size:16pt;word-wrap:break-word;padding-top:2pt">{{qtmp.desc}}</div>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              size="mini"
              @click="editDesc"
              v-if="isEditDesc"
              style="padding:8px"
              plain
            >确认</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="editDesc"
              v-else
              style="padding:8px"
              plain
            >编辑</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <div>
            <div style="height: 300px; width: 400px; overflow:hidden; border:blue 1px solid; ">
              <img style="width: 400px;" :src="qtmp.url">
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
                style="font-size:14pt; margin-top:20px"
              >批量导入图片的url,请上传utf-8编码的txt文件</div>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              <el-button size="mini" type="primary" style="margin-top:10px; padding:5px" plain>点击上传</el-button>
            </el-upload>
            <a href="/static/label.txt" download="template.txt">
              <el-button size="mini" style="color:#1471eb;margin-left:130px;margin-top:10px">模板下载</el-button>
            </a>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div style="font-size:24pt; text-align:center; margin-top:10px">选项</div>
        <el-radio-group v-model="opt" style="width: 100%">
          <el-row v-for="(item,index) in qtmp.opts" :key="index" style="margin-top:12px">
            <el-col :span="9" :offset="3" style="text-align:left">
              <el-input v-model="item.content" v-if="item.isEdit"></el-input>
              <el-radio :label="index" v-else style="font-size:20pt">
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
            <el-col :span="3">
              <el-button
                type="primary"
                size="mini"
                @click="deleteOpt(index)"
                style="padding: 2px"
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
</style>

