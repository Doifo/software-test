<template>
  <div style="padding: 20px; padding-top: 40px; padding-bottom: 40px; border: #efefef 2px solid">
    <el-row>
      <el-col :span="13" :offset="1">
        <el-row>
          <el-col :span="20">
            <el-input v-if="isEditDesc" v-model="qtmp.desc"></el-input>
            <div v-else style="font-size:16pt;word-wrap:break-word;padding-top:2pt">
              <strong>{{qtmp.desc}}</strong>
            </div>
            <div style="margin-top: 45px; font-size: 16pt">
              <strong>语境:</strong>{{qtmp.context}}
            </div>
            <div style="margin-top: 25px; font-size: 16pt">
              <strong>意图:</strong>{{qtmp.intent}}
            </div>
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
        <el-row style="margin-top: 30px">
          <el-col :span="20">
            <el-input
              placeholder="请输入内容"
              v-model="ansInput"
              clearable
              style="border: 0; border-bottom: 1px"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3}"
            >
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
        </el-row>
      </el-col>
      <el-col :span="10" style="padding-left: 40px">
        <el-col :span="20" style="text-align: left; font-size: 16pt">
          <div style="font-size:16pt; margin-top:10px; text-align: left">
            <strong>文本批量导入</strong>
          </div>
          <div>
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
              style="text-align: left"
            >
              <div
                class="el_upload_tip"
                style="font-size:14pt; margin-top:10px"
              >请按模板上传utf-8格式的txt文件</div>
              <el-button size="mini" type="primary" style="margin-top:10px; padding:5px" plain>点击上传</el-button>
            </el-upload>
            <div style="text-align: left; font-size: 16pt; margin-top: 10px">
              <strong>模板说明: </strong>
            </div>
            <div style="text-align: left; font-size: 14pt; margin-top: 7px">
              <strong>ontext: </strong>语境信息
            </div>
            <div style="text-align: left; font-size: 14pt">
              <strong>intent: </strong>话语意图
            </div>
            <div style="text-align: left; font-size: 14pt">
              <strong>index: </strong>题号（对应用）
            </div>
            <div style="text-align: left; margin-top: 10px">
              <a href="/static/label.txt" download="template.txt" style="text-align: left">
                <el-button size="mini" type="primary" style="padding: 5px; margin-top:10px" plain>模板下载</el-button>
              </a>
            </div>
          </div>
        </el-col>
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
        ansInput:'',
        //text: "?????????????????????????????????????????",
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
      alert('hello');
      console.log(this.qtmp);
      alert("ver5 is mounted");
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
