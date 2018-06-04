import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        citations: new Map()
    },
    mutations: {
        setCitation(state, payload) {
            state.citations.set(payload.url, payload)
        }
    },
    actions: {
        setCitation(state, payload) {
            state.commit('setCitation', payload)
        }
    },
    getters: {
        getCitations(state) {
            return state.citations
        },
        getCitation: (state) => (url) => {
            const citation = state.citations.get(url)
            if (!citation) {
                return -1;
            } else {
                return citation;
            }
        }
    }
})