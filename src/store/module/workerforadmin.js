import axios from "axios";
const worker = {
    namespaced: true,
    state: {
        allWorkerList: []
    },
    mutations: {
        INITALLWORKERLIST(state,{worker}){
            state.allWorkerList=worker;
        }
    },
    actions: {
        initAllWorkerList({ commit }) {
            axios.get('/api/worker/find-myself').then(response => {
                console.log(response.data);
                //this.allTaskList = response.data.tasks;
                commit('INITALLWORKERLIST',{worker:response.data.worker});
            });
        }
    },
}

export default worker