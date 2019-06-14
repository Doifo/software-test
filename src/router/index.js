import Vue from 'vue'
import Router from 'vue-router'

import WorkerStatistic from '@/views/WorkerStatistic.vue'
import WorkerTask from '@/views/WorkerTask.vue'
import WorkerInformation from '@/views/WorkerInformation.vue'
import WorkerQualification from '@/views/WorkerQualification.vue'
import WorkerTaskPlayground from '@/views/WorkerTaskPlayground.vue'

import RequesterInformation from '@/views/RequesterInformation.vue'
import RequesterEditProject from '@/views/RequesterEditProject.vue'
import RequesterAnswer from '@/views/RequesterAnswer'
import RequesterProjectList from '@/views/RequesterProjectList'
import RequesterProjectPreview from '@/views/RequesterProjectPreview'

import AdminTask from '@/views/AdminTask'
import AdminTaskDetail from '@/views/AdminTaskDetail'
import AdminWork from '@/views/AdminWork'

import Homepage from '@/views/Homepage'
import Login from '@/views/Login'
import Register from '@/views/Register'



import WQList from '@/components/worker/QuestionListForWorker'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/hello-world',
      component:HelloWorld,
    },
    {
      path: '/worker-statistic',
      name: 'WorkerStatistic',
      component: WorkerStatistic
    },
    {
      path:'/worker/task',
      name:'WorkerTask',
      component: WorkerTask
    },
    {
      path:'/worker/information',
      name:'WorkerInformation',
      component:WorkerInformation
    },
    {
      path:'/worker/taskPlayground',
      name:"WorkerQualification",
      component:WorkerTaskPlayground
    },
    {
      path:'/worker-qualification',
      name:"WorkerQualification",
      component:WorkerQualification
    },
    {
      path:'/requester/information',
      name:"RequesterInformation",
      component:RequesterInformation
    },
    {
      path:'/requester/project/preview/:tid',
      name:"RequesterInformation",
      component:RequesterProjectPreview
    },
    {
      path:'/',
      name:"Homepage",
      component:Homepage
    },
    {
      path:'/login',
      name:"Login",
      component:Login
    },
    {
      path:'/register',
      name:"Register",
      component:Register
    },
    {
      path:'/requester/project/edit',
      name:"RequesterEditProject",
      component:RequesterEditProject
    },
    {
      path:'/requester/project/list',
      name:'RequesterProjectList',
      component:RequesterProjectList
    },
    {
      path:'/admin-task',
      component:AdminTask
    },
    {
      path:'/admin-task-detail/:id',
      component:AdminTaskDetail
    },
    {
      path:'/admin-work',
      component:AdminWork
    },
    {
      path:'/worker/task/answer',
      component:WQList
    },
    {
      path:'/requester-answer/:id/:type',
      component:RequesterAnswer
    }
  ],
  mode:"history"
})
