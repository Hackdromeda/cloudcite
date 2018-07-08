import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    citations: []
  },
  mutations: {
    addCitation(state: any, payload: object) {
      state.citations.push(payload)
    }
  },
  actions: {
    addCitation(context: any, payload: object) {
      context.commit('addCitation', payload)
    }
  },
  getters: {
    getCitations(state: any) {
      return state.citations
    }
  }
})
