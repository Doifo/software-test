<template>
  <div class="RequesterCreate">
    <!-- <RequesterHomepageTopbar></RequesterHomepageTopbar> -->
    <!--主体部分-->
    <div style="width:75%;margin:0 auto;font-size:18px;">
      <p style="color:#1873EB; text-align:center">
        <b>选择可自定义的模板-启动新项目</b>
      </p>
      <el-tabs
        v-model="activeName"
        tab-position="left"
        @tab-click="handleClick"
        style="margin-top: 10px;"
      >
        <!--物体检测-->
        <el-tab-pane label="二分问题" name="ver1-tmp1" style="min-height:500px;">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>二分问题说明（点击展开）</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>根据图片和问题描述回答是或否</p>
              </div>
            </div>

            <question-ver1 :qtmp="templates['tmp1']"></question-ver1>
          </div>
          <!--preview_box end-->
        </el-tab-pane>

        <!--物体识别-->
        <el-tab-pane label="物体识别" name="ver1-tmp2">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>物体识别（点击展开）</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>请为图片选择正确的标签</p>
              </div>
            </div>
            <question-ver1 :qtmp="templates['tmp2']"></question-ver1>
          </div>
          <!--preview_box end-->
        </el-tab-pane>

        <!--物体检测-->
        <el-tab-pane label="物体识别" name="ver2-tmp3">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>物体检测（点击展开）</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>请用矩形方框标出对应的物体</p>
              </div>
            </div>
            <question-ver2 :qtmp="templates['tmp3']"></question-ver2>
          </div>
          <!--preview_box end-->
        </el-tab-pane>

         <!--物体检测-->
        <el-tab-pane label="边缘标注" name="ver3-tmp4">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>边缘标注（点击展开）</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>为不同类别的物体标注边缘</p>
              </div>
            </div>
            <question-ver3 :qtmp="templates['tmp4']"></question-ver3>
          </div>
          <!--preview_box end-->
        </el-tab-pane>

        <!--情感分析-->
        <el-tab-pane label="情感分析" name="ver4-tmp5">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>情感分析</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>分析文字中蕴含的感情倾向</p>
              </div>
            </div>
            <question-ver4 :qtmp="templates['tmp5']"></question-ver4>
            <!--主体-->
            <!-- <div class="preview_content">
              <template>
                <div>
                  <el-form :model="question_answer" ref="question_answer">
                    <el-col :span="12">
                      <el-form-item label="这段文字蕴含的感情是什么？">
                        <el-input
                          type="textarea"
                          placeholder="请输入文档地址"
                          v-model="question_content"
                          style="width:90%"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <p style="margin-top:0px;">选项：</p>
                      <el-form-item
                        v-for="(domain, index) in question_answer.domains"
                        :label="'选项' + index"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :rules="{
                                required: true, message: '选项不能为空', trigger: 'blur'
                                }"
                      >
                        <el-input v-model="domain.value" style="width:60%"></el-input>&nbsp;
                        <el-button>删除</el-button>
                      </el-form-item>

                      <el-form-item>
                        <el-button>新增选项</el-button>
                        <el-button>重置</el-button>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
              </template>
            </div>-->
          </div>
          <!--preview_box end-->
        </el-tab-pane>

      </el-tabs>

      <div style="float:right;margin-bottom: 40px;">
        <el-button type="primary" @click="submitForm">下一步</el-button>
      </div>
    </div>
    <!--主体部分end-->
  </div>
</template>

<script>
// import RequesterHomepageTopbar from '@/components/RequesterNavi/RequesterHomepageTopbar.vue';
import QuestionVer1 from "@/components/QuestionVer1";
import QuestionVer2 from "@/components/QuestionVer2";
import QuestionVer3 from "@/components/QuestionVer3";
import QuestionVer4 from "@/components/QuestionVer4";
export default {
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4
  },
  data() {
    return {
      templates: {
        tmp1: {
          desc: "此图中是否含有人脸",
          opts: [
            { content: "是", isEdit: false },
            { content: "否", isEdit: false }
          ],
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555094734309&di=07cbcb8b48caf576f0a15a3a82eb5a6e&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F96b2b684gy1fdoq0sis5mj20go0godhw.jpg"
        },
        tmp2: {
          desc: "请判断此图中的人的职业",
          opts: [
            { content: "学生", isEdit: false },
            { content: "教官", isEdit: false },
            { content: "历史老师", isEdit: false },
            { content: "军人", isEdit: false }
          ],
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555094734309&di=07cbcb8b48caf576f0a15a3a82eb5a6e&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F96b2b684gy1fdoq0sis5mj20go0godhw.jpg"
        },
        tmp3: {
          desc: "请在此处编辑你的问题描述",
          opts: [
            { content: "猫", isEdit: false, color: "#FFF200" },
            { content: "狗", isEdit: false, color: "#FF0000" },
            { content: "猪", isEdit: false, color: "#006AFF" },
            { content: "人", isEdit: false, color: "#00FF48" }
          ],
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553590617718&di=accf7a96bf02a04228a10fea868c0ab2&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwto7dfkvqwb4en3q_4b902c3d9f8abab8.jpg"
        },
        tmp4: {
          desc: "请在此处编辑你的问题描述",
          opts: [
            { content: "猫", isEdit: false, color: "#FFF200" },
            { content: "狗", isEdit: false, color: "#FF0000" },
            { content: "猪", isEdit: false, color: "#006AFF" },
            { content: "人", isEdit: false, color: "#00FF48" }
          ],
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553590617718&di=accf7a96bf02a04228a10fea868c0ab2&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwto7dfkvqwb4en3q_4b902c3d9f8abab8.jpg"
        },
        tmp5: {
          desc: "请分析这这句话中的情感倾向",
          opts: [
            { content: "高兴", isEdit: false },
            { content: "伤心", isEdit: false },
            { content: "愤怒", isEdit: false }
          ],
          text: "皇军给了你多少好处？"
        }
      },
      activeName: "ver1-tmp1",
      ifReminder: false,
      question_answer: {
        domains: [
          {
            value: ""
          },
          {
            value: ""
          },
          {
            value: ""
          }
        ]
      },
      question_content: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      this.ifReminder = false;
      console.log(tab, event);
    },
    showReminder() {
      this.ifReminder = !this.ifReminder;
    },
    submitForm: function() {
      alert("OK");
      let fst = 0;
      let lst = this.activeName.indexOf("-");
      let qtype = this.activeName.substring(fst, lst);
      fst = lst + 1;
      let qtmpIndex = this.activeName.substring(fst);
      let form = {
        formType: "projectTemplate",
        para: {
          qtype: qtype,
          qtmp: this.templates[qtmpIndex]
        }
      };
      this.$emit("submitForm", form);
    },
    newProject() {
      this.$router.push({
        name: "RequesterEditProject",
        params: {
          type: this.activeName
        }
      });
    }
  }
};
</script>

<style>
p,
ul {
  color: #606266;
}
.RequesterCreate .el-button--primary {
  color: #fff;
}
.RequesterCreate .el-tabs__nav-scroll {
  border: 1px solid #dcdfe6;
  /* min-height: 480px; */
  /* margin-right: 20px; */

  padding-right: 40px;
}
.RequesterCreate .el-tabs__active-bar {
  background-color: #fff;
}
.RequesterCreate .el-tabs__nav-wrap::after {
  background-color: #fff;
}
.preview_box {
  border: 1px solid #dcdfe6;
  min-height: 480px;
  padding: 0 30px;
  margin-bottom: 20px;
}
.reminder {
  padding: 30px 0;
}
.reminder_title {
  height: 50px;
  background-color: #5a9ef7;
}
.reminder_title p {
  color: #fff;
  margin-left: 15px;
  font-size: 16px;
  padding-top: 15px;
}
.reminder-content {
  font-size: 15px;
  min-height: 80px;
  border: 1px solid #5a9ef7;
  padding-left: 15px;
}
.preview_content {
  min-height: 300px;
  padding: 10px 40px 40px 40px;
}
.el-radio {
  padding-bottom: 20px;
}
</style>