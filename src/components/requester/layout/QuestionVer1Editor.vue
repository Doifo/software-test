<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="20">
            <el-input v-if="isEditDesc" v-model="desc"></el-input>
            <div v-else>{{desc}}</div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="mini" @click="editDesc" v-if="isEditDesc">确认</el-button>
            <el-button type="primary" size="mini" @click="editDesc" v-else>编辑</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <div>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/api/upload"
              :data="para"
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
              <div class="el_upload_tip">批量导入图片的url,请上传utf-8编码的txt文件</div>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div>选项</div>
        <el-radio-group v-model="opt" style="width: 100%">
          <el-row v-for="(item,index) in opts" :key="index" style="margin-top:10px">
            <el-col :span="9" :offset="3" style="text-align:left">
              <el-input v-model="item.content" v-if="item.isEdit"></el-input>
              <el-radio :label="index" v-else>{{item.content}}</el-radio>
            </el-col>
            <el-col :span="3" :offset="2">
              <el-button
                type="primary"
                size="mini"
                @click="editOpt(index)"
                style="padding: 0px"
                v-if="item.isEdit"
              >确认</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="editOpt(index)"
                style="padding: 0px"
                v-else
              >编辑</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                type="primary"
                size="mini"
                @click="deleteOpt(index)"
                style="padding: 0px"
              >删除</el-button>
            </el-col>
          </el-row>
          <el-button type="primary" size="mini" @click="addOpt">添加</el-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">编辑完成并保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditDesc: false,
      desc: "请在此处编辑你的问题描述",
      opts: [
        { content: "选项111111111", isEdit: false },
        { content: "选项2", isEdit: false },
        { content: "选项3", isEdit: false },
        { content: "选项4", isEdit: false }
      ],
      para: {
        desc:"",
        opts:""
      },
      opt: 0,
      fileList:[]
    };
  },
  methods: {
    editDesc() {
      this.isEditDesc = !this.isEditDesc;
    },
    addOpt() {
      let n = this.opts.length + 1;
      let tem = "选项" + n;
      this.opts.push({ content: tem, isEdit: false });
    },
    deleteOpt(index) {
      this.opts.splice(index, 1);
    },
    editOpt(index) {
      this.opts[index].isEdit = !this.opts[index].isEdit;
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
      this.para.desc=this.desc;
      this.para.opts=JSON.stringify(this.opts);
      this.$refs.upload.submit();
        //this.$refs.upload.clearFiles();
    },
    submitSuccess(response, file, fileList){
      alert("上传成功");
      this.$refs.upload.clearFiles();
    }

  }
};
</script>