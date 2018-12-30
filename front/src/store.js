import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    	showMenu: false
    },
    mutations: {
    	saveMenu(state, data){
			state.showMenu = data;
		},
    },
    actions: {
    	setMenu({commit}, data){
    		commit('saveMenu', data);
    	}
    }
})