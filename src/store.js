import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        citations: new Map(),
        editing: {}
    },
    mutations: {
        setCitation(state, payload) {
            state.citations.set(payload.url, payload)
        },
        setEditing(state, payload) {
            state.editing = payload
        }
    },
    actions: {
        setCitation(context, payload) {
            context.commit('setCitation', payload)
            return context.getters.getCitation(payload.url)
        },
        setEditing(context, payload) {
            context.commit('setEditing', payload)
            return context.getters.getEditing
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
        },
        getEditing(state) {
            return state.editing
        }
    }
})