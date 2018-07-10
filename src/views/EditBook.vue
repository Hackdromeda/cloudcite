<template>
    <div id="editbook">
        <h1 id="editFormTitle" class="title is-size-4">Edit Book Citation</h1>
        <div class="container" id="editForm">
            <b-field grouped v-for="(contributor, i) in bookCitationData.contributors" :key="i">
                <b-field expanded>
                    <b-select v-model="bookCitationData.contributors[i].type" :placeholder="contributor.type">
                    <option v-for="(type, j) in contributorTypes" :value="type" :key="j" v-cloak>
                        {{ type }}
                    </option>  
                </b-select>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="First Name" v-model="contributor.first"></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Middle Name" v-model="contributor.middle"></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Last Name" v-model="contributor.last"></b-input>
                </b-field>
                <b-field expanded>
                    <b-tooltip label="Remove Contributor" position="is-top" animated>
                        <a v-if="bookCitationData.contributors.length == 1" id="removeContributorButton" @click="bookCitationData.clearContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                        <a v-if="bookCitationData.contributors.length > 1" id="removeContributorButton" @click="bookCitationData.removeContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                    </b-tooltip>
                    <b-tooltip label="Add Contributor" position="is-top" animated>
                        <a id="addContributorButton" @click="bookCitationData.contributors.push({first: null, middle: null, last: null, type: 'Author'})"><b-icon icon="plus-circle" custom-size="mdi-24px"></b-icon></a>
                    </b-tooltip>
                </b-field>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Title" v-model="bookCitationData.title" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Chapter" v-model="bookCitationData.chapter" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Volume Number" v-model.number="bookCitationData.volNumber" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Publisher" v-model="bookCitationData.publisher" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-select v-model="bookCitationData.datePublished.month" placeholder="Month Published">
                    <option v-for="(month, i) in monthNames" :value="i" :key="i" v-cloak>
                        {{ month }}
                    </option>
                </b-select>
                <b-input v-model.number="bookCitationData.datePublished.day" type="number" maxlength="2" placeholder="Day" expanded></b-input>
                <b-input v-model.number="bookCitationData.datePublished.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
            </b-field>
            <b-field expanded>
                <div id="submitFormDiv">
                    <a class="button is-primary" @click="cite()">Done Editing</a>
                </div>
            </b-field>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookCitation from '../BookCitation';

@Component({
  components: {

  },
  data () {
    return {
        bookCitationData: new BookCitation([{first: "", middle: "", last: "", type: "Author"}], null, null, null, null, {}),
        contributorTypes: ["Author", "Editor"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"]
    }
  },
  methods: {
    setContributorType(index: number, type: string) {
        this.$data.bookCitationData.contributors[index].type = type
    },
    cite() {
        this.$store.dispatch('addCitation', this.$data.bookCitationData.toCSL())
    }
  }
})

export default class Editbook extends Vue {}
</script>

<style scoped lang="scss">
#editFormTitle {
    color: #005eea;
}
#editbook {
        padding: 10px;
        min-height: 100vh;
        text-align: center;
        justify-content: center;
        background-color: #fff;
}
#removeContributorButton {
    color: red;
}
#addContributorButton {
    color: #005eea;
}
#submitFormDiv {
    text-align: left;
}
@media (max-width: 991.97px) {

}
@media (min-width: 991.98px) {
    #editForm {
        padding-left: 20%;
        padding-right: 20%;
    }
}
</style>