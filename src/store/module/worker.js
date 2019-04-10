import axios from "axios";
const worker = {
    namespaced: true,
    state: {
        allTaskList: []
    },
    mutations: {
        INITALLTASKLIST(state,{tasks}){
            state.allTaskList=tasks;
        }
    },
    actions: {
        initAllTaskList({ commit }) {
            axios.get('/api/task/find-all').then(response => {
                console.log(response.data);
                //this.allTaskList = response.data.tasks;
                commit('INITALLTASKLIST',{tasks:response.data.tasks});
            });
        }
    },
}

export default worker