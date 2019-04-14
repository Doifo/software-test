<template>
  <div>
    <worker-header></worker-header>
    <div style="padding-left:50px;padding-right:50px">
      <p style="color:#1471eb;border-left:2px solid #1471eb;padding-left:10px;">worker管理</p>    
              <admin-worker-all></admin-worker-all>      
    </div>
    
  </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader"
import WorkerListForAdmin from '@/components/WorkerListForAdmin'
export default {
  name: 'AdminWork',
  data () {
    return {   
    }
  },
  components:{
      'worker-header':WorkerHeader,
      'admin-worker-all':WorkerListForAdmin  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>