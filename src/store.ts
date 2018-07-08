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
    },
    removeCitation(state: any, payload: number) {
      state.citations = state.citations.splice(payload, 1)
    }
  },
  actions: {
    addCitation(context: any, payload: object) {
      context.commit('addCitation', payload)
    },
    removeCitation(context: any, payload: number) {
      context.commit('removeCitation', payload)
    }
  },
  getters: {
    getCitations(state: any) {
      return state.citations
    }
  }
})
