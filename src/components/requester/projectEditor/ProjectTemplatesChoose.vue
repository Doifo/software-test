<template>
  <div class="RequesterCreate">
    <!-- <RequesterHomepageTopbar></RequesterHomepageTopbar> -->
    <!--主体部分-->
    <div style="width:75%;margin:0 auto;font-size:18px;">
      <p style="color:#5a9ef7; text-align:center; font-size: 16pt; padding: 0">
        <strong>选择可自定义的模板-启动新项目</strong>
      </p>
      <el-tabs
        v-model="activeName"
        tab-position="left"
        @tab-click="handleClick"
        style="margin-top: 10px;"
      >
        <el-tab-pane label="视觉" style="min-height:500px" disabled="">
        </el-tab-pane>
        <!--物体检测-->
        <el-tab-pane label="二分问题" name="ver1-tmp1" style="min-height:500px;" class=''>
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
        <el-tab-pane label="物体检测" name="ver2-tmp3">
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


        <el-tab-pane label="语义" style="min-height:500px;" disabled="">
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
          </div>
        </el-tab-pane>

        <el-tab-pane label="包含问题" name="ver4-tmp6">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>包含问题</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>请指句中是否含有敏感信息</p>
              </div>
            </div>
            <question-ver4 :qtmp="templates['tmp6']"></question-ver4>
          </div>
        </el-tab-pane>

        <el-tab-pane label="文本分类" name="ver4-tmp7">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>文本分类</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>请指以下文本属于哪一类</p>
              </div>
            </div>
            <question-ver4 :qtmp="templates['tmp7']"></question-ver4>
          </div>
        </el-tab-pane>

        <el-tab-pane label="对话收集" name="ver5-tmp8">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>对话收集</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>请根据语境和对话给出回答</p>
              </div>
            </div>
            <question-ver5 :qtmp="templates['tmp8']"></question-ver5>
          </div>
        </el-tab-pane>

        <el-tab-pane label="问卷" style="min-height:500px;" disabled="">
        </el-tab-pane>
        <el-tab-pane label="调查问卷" name="ver6-tmp9">
          <div class="preview_box">
            <div class="reminder">
              <div class="reminder_title" @click="showReminder">
                <p>
                  <b>调查问卷（点击展开）</b>
                </p>
              </div>
              <div class="reminder-content" v-if="ifReminder">
                <p>参与问卷调查</p>
              </div>
            </div>
            <div style="text-align:center;">
              <p>请点击下面的链接完成问卷</p>
              <p> <a href="http://www.ringsurvey.com/">调查问卷</a></p>
              <p><el-input style="width:60%" v-model="responseGuid" placeholder="请输入responseGuid"></el-input></p>
              
           
              
            </div>
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
import QuestionVer1 from "@/components/questions/QuestionVer1";
import QuestionVer2 from "@/components/questions/QuestionVer2";
import QuestionVer3 from "@/components/questions/QuestionVer3";
import QuestionVer4 from "@/components/questions/QuestionVer4";
import QuestionVer5 from "@/components/questions/QuestionVer5";
import QuestionVer6 from "@/components/questions/QuestionVer6";
export default {
  components: {
    QuestionVer1,
    QuestionVer2,
    QuestionVer3,
    QuestionVer4,
    QuestionVer5,
    QuestionVer6
  },
  data() {
    return {
      responseGuid:'',
      templates: {
        tmp1: {
          desc: "请问此图中是否含有人脸?",
          opts: [
            { content: "是", isEdit: false },
            { content: "否", isEdit: false }
          ],
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553590617718&di=accf7a96bf02a04228a10fea868c0ab2&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwto7dfkvqwb4en3q_4b902c3d9f8abab8.jpg"
        },
        tmp2: {
          desc: "请判断此图中动物的类别",
          opts: [
            { content: "猫", isEdit: false },
            { content: "狗", isEdit: false },
            { content: "鸟", isEdit: false },
            { content: "熊猫", isEdit: false }
          ],
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553590617718&di=accf7a96bf02a04228a10fea868c0ab2&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwto7dfkvqwb4en3q_4b902c3d9f8abab8.jpg"
        },
        tmp3: {
          desc: "请用矩形框出对应的物体",
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
          desc: "请画出对应物体的边缘",
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
          text: "three.js难道不应该被归到图形学的领域吗？"
        },
        tmp6: {
          desc: "请指句中是否含有敏感信息",
          opts: [
            { content: "是", isEdit: false },
            { content: "否", isEdit: false },
          ],
          text: "three.js难道不应该被归到图形学的领域吗？"
        },
        tmp7: {
          desc: "请为以下文本进行归类",
          opts: [
            { content: "新闻", isEdit: false },
            { content: "广告", isEdit: false },
            { content: "期刊", isEdit: false },
            { content: "报告", isEdit: false },
          ],
          text: "three.js难道不应该被归到图形学的领域吗？"
        },
        tmp8: {
          desc: "请根据语境和意图给出回答",
          opts: [
          ],
          text: "three.js难道不应该被归到图形学的领域吗？",
          context:'你非常认真写代码，但发现最后那些只会写文档的人却可以轻松拿了比你高的分数',
          intent:'你想表达你的不满'
        },
        tmp9:{
          desc:"请点击链接完成问卷"
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
      //console.log(tab, event);
    },
    showReminder() {
      this.ifReminder = !this.ifReminder;
    },
    submitForm: function() {
      let fst = 0;
      let lst = this.activeName.indexOf("-");
      let qtype = this.activeName.substring(fst, lst);
      fst = lst + 1;
      let qtmpIndex = this.activeName.substring(fst);
      //console.log('activte:',this.activeName)
      let form = {
        formType: "projectTemplate",
        para: {
          qtype: qtype,
          qtmp: this.templates[qtmpIndex]
        }
      };
      this.$emit("submitForm", form);
    },
    // newProject() {
    //   this.$router.push({
    //     name: "RequesterEditProject",
    //     params: {
    //       type: this.activeName
    //     }
    //   });
    // }
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
  padding: 0;
  margin-bottom: 20px;
  text-align: center;
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
  .debugBox{
    border: 1px solid black;
  }
</style>
