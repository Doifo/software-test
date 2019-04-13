<template>
    <div>
        <worker-header></worker-header>
        <div id="question-aire">
            <p style="color:#1471eb">开始答题</p>
            <question-aire></question-aire>
            
        </div>
    </div>
</template>

<script>
import WorkerHeader from "@/components/WorkerHeader";
import Questionaire from '@/components/Questionaire/Questionaire'

export default {
    name: '',
    data () {
        return {
        
        }
    },
    components: {
        "worker-header": WorkerHeader,
        "question-aire":Questionaire
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question-aire{
    width: 80%;
    margin: 20px auto;
}
</style>
