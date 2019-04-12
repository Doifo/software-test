<template>
<div class="RequesterCreate">
    <!-- <RequesterHomepageTopbar></RequesterHomepageTopbar> -->
     <!--主体部分-->
    <div style="width:70%;margin:0 auto; margin-top:50px;font-size:18px;">
        <p style="color:#1873EB">
            <b>选择可自定义的模板-启动新项目</b>
        </p>
        <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick" style="margin-top: 10px;">
            <!--图片标记-->
        <el-tab-pane label="图片标记" name="ImageTag" style="min-height:500px;" >
            <div class="preview_box">
                <div class="reminder">
                    <div class="reminder_title" @click="showReminder">
                        <p><b>图片标记说明（点击展开）</b></p>
                    </div>
                    <div class="reminder-content" v-if="ifReminder">
                        <p>根据图片中的内容为图片选出合适的标签</p>
                    </div>
                </div>
                <!--主体-->   
                <div class="preview_content">
                    <template>
                    <div>
                        <el-form :model="question_answer" ref="question_answer"  >
                        <el-col :span="12">
                        <el-form-item 
                        :rules="{
                            required: true, message: '选项不能为空', trigger: 'blur'
                            }"
                            >
                            <el-input 
                                style="width:90%"
                                placeholder="请在此处编辑你的问题描述">
                            </el-input>
                            <div style="margin-top: 30px;">
                            <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="/api/upload"
                            >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">批量导入图片的url,请上传utf-8编码的txt文件</div>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </div>
                        </el-form-item>
                            </el-col>
                            <!--选项-->
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
                            <el-input v-model="domain.value" style="width:60%"></el-input> &nbsp; <el-button>删除</el-button>
                        </el-form-item>
                        
                        <el-form-item>
                            <el-button >新增选项</el-button>
                            <el-button>重置</el-button>
                        </el-form-item>
                        </el-col>
                        </el-form>
                    </div>
                    </template>
                </div>
            </div><!--preview_box end-->
        </el-tab-pane>

         <!--多边形-->
        <el-tab-pane label="多边形" name="ImagePolygon">
            <div class="preview_box">
                <div class="reminder">
                    <div class="reminder_title" @click="showReminder">
                        <p><b>多边形（点击展开）</b></p>
                    </div>
                    <div class="reminder-content" v-if="ifReminder">
                        <p>根据题目要求框出图片中的正确部分</p>
                    </div>
                </div>
                <!--主体-->   
                <div class="preview_content">
                    <template>
                    <div>
                        <el-form :model="question_answer" ref="question_answer"  >
                            <el-col :span="3"><p></p></el-col>
                            <el-col :span="18">
                            <el-form-item 
                            :rules="{
                                required: true, message: '选项不能为空', trigger: 'blur'
                                }"
                                >
                                <el-input 
                                    placeholder="请在此处编辑你的问题描述">
                                </el-input>
                                <div style="margin-top: 30px;">
                                <el-upload
                                class="upload-demo"
                                ref="upload"
                                action="/api/upload"
                                >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">批量导入图片的url,请上传utf-8编码的txt文件</div>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </div>
                            </el-form-item>
                            </el-col>
                            
                        <el-col :span="3"></el-col>
                        </el-form>
                    </div>
                    </template>
                </div>
            </div><!--preview_box end-->
        </el-tab-pane>

        <!--情绪检测-->
        <el-tab-pane label="情绪检测" name="SentimentDetection">
            <div class="preview_box">
                <div class="reminder">
                    <div class="reminder_title" @click="showReminder">
                        <p><b>情绪检测（点击展开）</b></p>
                    </div>
                    <div class="reminder-content" v-if="ifReminder">
                        <p>分析文字中蕴含的感情</p>
                    </div>
                </div>
                <!--主体-->   
                <div class="preview_content">
                    <template>
                        <div>
                            <el-form :model="question_answer" ref="question_answer"  >
                            <el-col :span="12">
                                <el-form-item 
                                label="这段文字蕴含的感情是什么？">
                                <el-input
                                type="textarea"
                                placeholder="请输入文档地址"
                                v-model="question_content"
                                style="width:90%">
                                </el-input>
                                </el-form-item>
                                </el-col>
                                <!--选项-->
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
                                <el-input v-model="domain.value" style="width:60%"></el-input> &nbsp; <el-button>删除</el-button>
                            </el-form-item>
                            
                            <el-form-item>
                                <el-button>新增选项</el-button>
                                <el-button>重置</el-button>
                            </el-form-item>
                            </el-col>
                            </el-form>
                        </div>
                        </template>
                </div>
            </div><!--preview_box end-->
        </el-tab-pane>

        <!--情感分析-->
        <el-tab-pane label="情感分析" name="EmotionAnalysis">
           <div class="preview_box">
                <div class="reminder">
                    <div class="reminder_title" @click="showReminder">
                        <p><b>情感分析（点击展开）</b></p>
                    </div>
                    <div class="reminder-content" v-if="ifReminder">
                        <p>分析文字表达的情感倾向是积极、消极还是中立</p>
                    </div>
                </div>
                <!--主体-->   
                <div class="preview_content">
                    <template>
                        <div>
                            <el-row style="margin:20px 40px;">
                                    <ElCol :span="16">
                                        <div class="questions">
                                            <div style="height:20px;"></div>
                                            <p style="font-size:15px;">这句话的感情倾向是什么？</p>
                                            <div style="height:10px;"></div>
                                            <el-input
                                                type="textarea"
                                                :rows="1"
                                                placeholder="请输入内容"
                                                v-model="question_content"
                                                style="width:80%">
                                            </el-input>
                                            
                                    </div>
                                    </ElCol>
                                    <el-col :span="8">
                                        <div class="options" style="padding-top:20px;">
                                            <p>选项：</p>
                                            <el-radio-group v-model="question_answer" style="padding-left:15px;">
                                                <el-radio :label="1" >积极</el-radio><br>
                                                <el-radio :label="2">消极</el-radio><br>
                                                <el-radio :label="3">中立</el-radio>
                                            </el-radio-group>
                                            
                                        </div>
                                    </el-col>
                                </el-row>
                        </div>
                        </template>
                </div>
            </div><!--preview_box end-->
        </el-tab-pane>

        <!--文件分类-->
         <el-tab-pane label="文件分类" name="DocumentClassification">
              <div class="preview_box">
                <div class="reminder">
                    <div class="reminder_title" @click="showReminder">
                        <p><b>文件分类（点击展开）</b></p>
                    </div>
                    <div class="reminder-content" v-if="ifReminder">
                        <p>辨别文件内容的类别（医学、生物、艺术，etc.）</p>
                    </div>
                </div>
                <!--主体-->   
                <div class="preview_content">
                     <template>
                        <div>
                            <el-form :model="question_answer" ref="question_answer"  >
                            <el-col :span="12">
                                <el-form-item 
                                label="请为文档选择正确的类别">
                                <el-input
                                type="textarea"
                                placeholder="请输入文档地址"
                                v-model="question_content"
                                style="width:90%">
                                </el-input>
                                </el-form-item>
                                </el-col>
                                <!--选项-->
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
                                <el-input v-model="domain.value" style="width:60%"></el-input> &nbsp; <el-button>删除</el-button>
                            </el-form-item>
                            
                            <el-form-item>
                                <el-button>新增选项</el-button>
                                <el-button>重置</el-button>
                            </el-form-item>
                            </el-col>
                            </el-form>
                        </div>
                    </template>
                </div>
            </div><!--preview_box end-->
         </el-tab-pane>
          <!--<el-tab-pane label="语义分析" name="sixth">配置管理</el-tab-pane>-->
    </el-tabs>

    <div style="float:right;margin-bottom: 40px;">
        <el-button type="primary" @click="newProject">创建项目</el-button>
    </div>

    </div> <!--主体部分end-->
     
</div>
   
</template>

<script>
// import RequesterHomepageTopbar from '@/components/RequesterNavi/RequesterHomepageTopbar.vue';

export default { 
  data() {
      return {
        activeName: 'ImageTag',
        ifReminder:false,
         question_answer: {
          domains: [{
            value: ''
          },
          {
            value: ''
          },
          {
            value: ''
          }],
        },
        question_content:'',
      };
    },
    methods: {
     handleClick(tab, event) {
          this.ifReminder=false;
        console.log(tab, event);
      },
      showReminder(){
          this.ifReminder=!this.ifReminder;
      },
      newProject(){
          this.$router.push({
          name: 'RequesterEditProject',
          params: {
            type:this.activeName
          }
        })
      }
    },
    computed:{
      
    }
}
</script>

<style>
p,ul{
    color:#606266
}
.RequesterCreate .el-button--primary{
    color:#fff;
}
.RequesterCreate .el-tabs__nav-scroll{
    border:1px solid #DCDFE6;
    min-height:480px;
    margin-right:20px;
    
    padding-right: 40px;
}
.RequesterCreate .el-tabs__active-bar{
    background-color:#fff;
}
.RequesterCreate .el-tabs__nav-wrap::after{
    background-color:#fff;
}
.preview_box{
    border:1px solid #DCDFE6;
    min-height:480px;
    padding: 0 30px;
    margin-bottom: 20px;
}
.reminder{
    padding: 30px 0;
}
.reminder_title{
    height: 50px;
    background-color: #5A9EF7;
}
.reminder_title p{
    color: #fff;
    margin-left: 15px;
    font-size: 16px;
    padding-top: 15px;
}
.reminder-content{
    font-size: 15px;
    min-height: 80px;
    border: 1px solid #5A9EF7;
    padding-left: 15px;
}
.preview_content{
    min-height:300px;
    padding:10px 40px 40px 40px;
}
.el-radio{
      padding-bottom: 20px;
  }
</style>