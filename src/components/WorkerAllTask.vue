<template>
    <div>
        <el-row class="task-content-header">
            <el-col :span="6">请求者</el-col>
            <el-col :span="6">标题</el-col>
            <el-col :span="3">数量<i class="el-icon-caret-bottom"></i></el-col>
            <el-col :span="3">奖励<i class="el-icon-caret-bottom"></i></el-col>
            <el-col :span="3">创建时间<i class="el-icon-caret-bottom"></i></el-col>
            <el-col :span="3">操作</el-col>
        </el-row>
        <el-collapse style="min-height:250px;border-bottom:none;">
            <el-collapse-item>
                <template slot="title">
                    <el-row style="width:100%;padding-left:30px">
                        <el-col :span="6"><i class="el-icon-circle-plus"></i>上海某公司</el-col>
                        <el-col :span="6">图片标注</el-col>
                        <el-col :span="3">10000</el-col>
                        <el-col :span="3">¥0.1/题</el-col>
                        <el-col :span="3">2019-3-23</el-col>
                        <el-col :span="3">
                            <el-button type="warning" @click.stop>接受任务</el-button>
                        </el-col>
                    </el-row>
                </template>
                <div style="padding-left:30px;">
                    <el-row style="margin-top:20px;">
                        <el-col :span="6">分配时间：60分钟</el-col>
                        <el-col :span="6">过期时间：2019年1月1日</el-col>
                        <el-col :span="6">资格要求：等级大于2</el-col>
                        <el-col :span="6">你的等级：1</el-col>
                    </el-row>
                    <p>描述：给图片标注信息</p>
                </div>
            </el-collapse-item>

            <el-collapse-item>
                <template slot="title" >
                    <el-row style="width:100%;padding-left:30px">
                        <el-col :span="6"><i class="el-icon-circle-plus"></i>上海某公司</el-col>
                        <el-col :span="6">图片标注</el-col>
                        <el-col :span="3">10000</el-col>
                        <el-col :span="3">¥0.1/题</el-col>
                        <el-col :span="3">2019-3-23</el-col>
                        <el-col :span="3">
                            <el-button type="warning" @click.stop>接受任务</el-button>
                        </el-col>
                    </el-row>
                </template>
                <div style="padding-left:30px;">
                    <el-row style="margin-top:20px;">
                        <el-col :span="6">分配时间：60分钟</el-col>
                        <el-col :span="6">过期时间：2019年1月1日</el-col>
                        <el-col :span="6">资格要求：等级大于2</el-col>
                        <el-col :span="6">你的等级：1</el-col>
                    </el-row>
                    <p>描述：给图片标注信息</p>
                </div>
            </el-collapse-item>

            <el-collapse-item>
                <template slot="title" >
                    <el-row style="width:100%;padding-left:30px">
                        <el-col :span="6"><i class="el-icon-circle-plus"></i>上海某公司</el-col>
                        <el-col :span="6">图片标注</el-col>
                        <el-col :span="3">10000</el-col>
                        <el-col :span="3">¥0.1/题</el-col>
                        <el-col :span="3">2019-3-23</el-col>
                        <el-col :span="3">
                            <el-button type="warning" @click.stop>接受任务</el-button>
                        </el-col>
                    </el-row>
                </template>
                <div style="padding-left:30px;">
                    <el-row style="margin-top:20px;">
                        <el-col :span="6">分配时间：60分钟</el-col>
                        <el-col :span="6">过期时间：2019年1月1日</el-col>
                        <el-col :span="6">资格要求：等级大于2</el-col>
                        <el-col :span="6">你的等级：1</el-col>
                    </el-row>
                    <p>描述：给图片标注信息</p>
                </div>
            </el-collapse-item>

            <el-collapse-item>
                <template slot="title" >
                    <el-row style="width:100%;padding-left:30px">
                        <el-col :span="6"><i class="el-icon-circle-plus"></i>上海某公司</el-col>
                        <el-col :span="6">图片标注</el-col>
                        <el-col :span="3">10000</el-col>
                        <el-col :span="3">¥0.1/题</el-col>
                        <el-col :span="3">2019-3-23</el-col>
                        <el-col :span="3">
                            <el-button type="warning" @click.stop>接受任务</el-button>
                        </el-col>
                    </el-row>
                </template>
                <div style="padding-left:30px;">
                    <el-row style="margin-top:20px;">
                        <el-col :span="6">分配时间：60分钟</el-col>
                        <el-col :span="6">过期时间：2019年1月1日</el-col>
                        <el-col :span="6">资格要求：等级大于2</el-col>
                        <el-col :span="6">你的等级：1</el-col>
                    </el-row>
                    <p>描述：给图片标注信息</p>
                </div>
            </el-collapse-item>

            <el-collapse-item>
                <template slot="title" >
                    <el-row style="width:100%;padding-left:30px">
                        <el-col :span="6"><i class="el-icon-circle-plus"></i>上海某公司</el-col>
                        <el-col :span="6">图片标注</el-col>
                        <el-col :span="3">10000</el-col>
                        <el-col :span="3">¥0.1/题</el-col>
                        <el-col :span="3">2019-3-23</el-col>
                        <el-col :span="3">
                            <el-button type="warning" @click.stop>接受任务</el-button>
                        </el-col>
                    </el-row>
                </template>
                <div style="padding-left:30px;">
                    <el-row style="margin-top:20px;">
                        <el-col :span="6">分配时间：60分钟</el-col>
                        <el-col :span="6">过期时间：2019年1月1日</el-col>
                        <el-col :span="6">资格要求：等级大于2</el-col>
                        <el-col :span="6">你的等级：1</el-col>
                    </el-row>
                    <p>描述：给图片标注信息</p>
                </div>
            </el-collapse-item>
            
        </el-collapse>

        <div class="pages">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 40]"
            :page-size="10"
            layout="prev, pager, next"
            :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WorkerAllTask',
    data () {
        return {
        
        }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        hello(){
            alert("hello");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-content-header{
    background:#eff0f1;
    height:50px;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding-left: 30px;
    font-weight: bold;
}

.pages{
    margin:50px auto;
    display:flex;
    flex-direction:row;
    justify-content:center;
}
</style>
