<template>
  <div id="type1">
    <p>{{ans}}</p>
    <img :src="url">
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      task: {},
      url: "",
      ans: ""
    };
  },
  props: {
    answer: Object,
    taskId: String
  },
  methods: {},
  mounted() {
    // console.log(this.answer);

    axios
      .get("/api/task/read-resource", { params: { taskId: this.taskId } })
      .then(response => {
        this.task = response.data;
        this.url = response.data.urls[this.answer.index - 1].url;
        // console.log(this.task)
        this.ans = this.task.opts[this.answer.ans].content;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 120px;
  height: 120px;
}

p{
  text-align: center;
}

#type1{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
}
</style>
