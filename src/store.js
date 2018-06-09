import Vue from 'vue'
import Vuex from 'vuex'
const _ = require('lodash');

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        citations: new Map(),
        editing: {author: {first: "", middle: "", last: ""}}
    },
    mutations: {
        setCitation(state, payload) {
            state.citations.set(payload.url, payload)
        },
        setEditingCitationAuthor(state, payload) {
            switch (payload.field) {
                case 'first':
                  state.editing.authors[payload.authorsIndex].first = payload.event;
                  break;
                case 'middle':
                  state.editing.authors[payload.authorsIndex].middle = payload.event;
                  break;
                case 'last':
                  state.editing.authors[payload.authorsIndex].last = payload.event;
                  break;
                default:
                  console.log('Invalid author field')
            }
        },
        setCitations(state, payload) {
            state.citations = payload
        },
        setEditing(state, payload) {
            state.editing = payload
        },
        setEditingSource(state, payload) {
            state.editing.source = payload.source
        },
        addNewEditingAuthor(state) {
            state.editing.authors.push({
                first: '',
                middle: '',
                last: ''
            })
        },
        removeEditingAuthor(state, payload) {
            state.editing.authors = state.editing.authors.filter(element => element !== payload.element);
        }
    },
    actions: {
        setCitation(context, payload) {
            context.commit('setCitation', payload)
        },
        setEditingCitationAuthor(context, payload) {
            context.commit('setEditingCitationAuthor', payload)
        },
        setCitations(context, payload) {
            context.commit('setCitations', payload)
        },
        setEditing(context, payload) {
            context.commit('setEditing', payload)
        },
        setEditingSource(context, payload) {
            context.commit('setEditingSource', payload)
        },
        addNewEditingAuthor(context) {
            context.commit('addNewEditingAuthor')
        },
        removeEditingAuthor(context, payload) {
            context.commit('removeEditingAuthor', payload)
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
            if (!state.editing) {
                return -1;
            } else {
                return state.editing
            }
        }
    }
})