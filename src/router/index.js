import Vue from 'vue'
import Router from 'vue-router'
import WorkerStatistic from '@/views/WorkerStatistic.vue'
import WorkerTask from '@/views/WorkerTask.vue'
import WorkerInformation from '@/views/WorkerInformation.vue'
import WorkerQualification from '@/views/WorkerQualification.vue'
import RequesterInformation from '@/views/RequesterInformation.vue'
import RequesterEditProject from '@/views/RequesterEditProject.vue'
import Homepage from '@/views/Homepage'
import Login from '@/views/Login'
import Register from '@/views/Register'
import WQList from '@/components/worker/QuestionListForWorker'
import AdminTask from '@/views/AdminTask'
import AdminTaskDetail from '@/views/AdminTaskDetail'
import AdminWork from '@/views/AdminWork'
import RequesterAnswer from '@/views/RequesterAnswer'

import HelloWorld from '@/components/HelloWorld'


Vue.use(Router);

export default new Router({
  routes: [{
    path:'/hello-world',
    component:HelloWorld,
  },{
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
      path:'/WQList',
      component:WQList
    },{
      path:'/requester-answer/:id/:type',
      component:RequesterAnswer
    }
  ],
  mode:"history"
})
