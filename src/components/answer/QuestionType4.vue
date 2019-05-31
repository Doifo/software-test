<template>
  <div id="type4">
    <p>答案：{{ans}}</p>
    <p>{{url}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      task: {},
      url: "",
      ans:""
    };
  },
  props:{
    answer: Object,
    taskId: String
  },
  methods: {},
  mounted(){

    //console.log(this.answer.ans);
    axios
      .get("/api/task/read-resource", { params: { taskId: this.taskId } })
      .then(response => {
        this.task = response.data;
        this.url = response.data.urls[this.answer.index - 1].text;
        this.ans = this.task.opts[this.answer.ans].content;
        
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#type4{
  border: 1px solid #ccc;
  padding: 3px;
  height: 100px;
  overflow: auto;
}

#type4::-webkit-scrollbar {
        width: 3px;     
        height: 1px;
    }
#type4::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #999;
    }
#type4::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
</style>
