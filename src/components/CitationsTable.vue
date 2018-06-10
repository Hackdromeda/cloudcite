<template>
    <section style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
        <br>
        <h1 class="title">Citations</h1>
        
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
    export default {
        name: 'CitationsTable',
        data() {
            return {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                abbreviatedMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ],
                defaultOpenedDetails: [0]
            }
        },
        computed: {
            ...mapGetters(['getEditing', 'getCitation, getCitations']),
            citations: {
                get() {
                    var citationsMap = this.$store.state.citations
                    var citationsArray = []
                    citationsMap.forEach(function(element) {
                        citationsArray.push(element)
                    })
                    return citationsArray
                }
            }
        },
        methods: {
            ...mapActions(['setCitation', 'setEditing']),
            gotoEditPage(citation) {
                this.$store.dispatch('setEditing', citation)
                this.$router.push({name: 'EditCitation'})
            }
        }
    }
</script>
