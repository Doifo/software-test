import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WorkerStatistic from '@/views/WorkerStatistic.vue'
import WorkerTask from '@/views/WorkerTask.vue'
import WorkerInformation from '@/views/WorkerInformation.vue'
import WorkerQualification from '@/views/WorkerQualification.vue'

import RequesterInformation from '@/views/RequesterInformation.vue'
import RequesterEditProject from '@/views/RequesterEditProject.vue'
import Homepage from '@/views/Homepage'
import Login from '@/views/Login'
import Register from '@/views/Register'
import PT from '@/components/requester/ProjectTemplatesChoose'
//import Q1 from '@/components/QuestionVer1'
import Q1 from '@/components/QuestionVer1'
import QList from '@/components/QuestionList'
import AdminTask from '@/views/AdminTask'
import AdminTaskDetail from '@/views/AdminTaskDetail'
import AdminWork from '@/views/AdminWork'
import WorkerAnswer from '@/views/WorkerAnswer'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/worker-statistic',
      name: 'WorkerStatistic',
      component: WorkerStatistic
    },{
      path:'/worker-task',
      name:'WorkerTask',
      component: WorkerTask
    },{
      path:'/worker-information',
      name:'WorkerInformation',
      component:WorkerInformation
    },{
      path:'/worker-qualification',
      name:"WorkerQualification",
      component:WorkerQualification
    },{
      path:'/requester-information',
      name:"RequesterInformation",
      component:RequesterInformation
    },{
      path:'/',
      name:"Homepage",
      component:Homepage
    },{
      path:'/login',
      name:"Login",
      component:Login
    },{
      path:'/register',
      name:"Register",
      component:Register
    },{
      path:'/requester-edit-project',
      name:"RequesterEditProject",
      component:RequesterEditProject
    },{
      path:'/admin-task',
      component:AdminTask
    },{
      path:'/admin-task-detail/:id',
      component:AdminTaskDetail
    },{
      path:'/admin-work',
      component:AdminWork
    },{
      path:'/worker-answer/:id',
      component:WorkerAnswer
    },{
      path:'/QList',
      component:QList
    }
  ],
  mode:"history"
})
