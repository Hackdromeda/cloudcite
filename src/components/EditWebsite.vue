<template>
    <div id="editwebsite">
        <div v-if="!citationStarted">
            <h1 class="title is-size-2">Cite a Website</h1>
                <b-field id="websiteInputField">
                    <div class="field has-addons">
                        <div class="control" id="websiteInput">
                            <b-input type="url" placeholder="Enter website link" @keyup.enter.native="citationStarted = !citationStarted" autofocus/>
                        </div>
                        <div class="control">
                            <a class="button is-primary" @click="citationStarted = !citationStarted">Cite</a>
                        </div>
                    </div>
                </b-field>
        </div>
        <div v-if="citationStarted">
        <h1 id="editFormTitle" class="title is-size-4">Edit Website Citation</h1>
        <div class="container" id="editForm">
            <b-field grouped v-for="(contributor, i) in websiteCitationData.contributors" :key="i">
                <b-field expanded>
                    <b-select v-model="websiteCitationData.contributors[i].type" :placeholder="contributor.type">
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
                    <a v-if="websiteCitationData.contributors.length == 1" id="removeContributorButton" @click="websiteCitationData.clearContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                    <a v-if="websiteCitationData.contributors.length > 1" id="removeContributorButton" @click="websiteCitationData.removeContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                    <a id="addContributorButton" @click="websiteCitationData.contributors.push({first: null, middle: null, last: null, type: 'Author'})"><b-icon icon="plus-circle" custom-size="mdi-24px"></b-icon></a>
                </b-field>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Source" v-model="websiteCitationData.source" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Title" v-model="websiteCitationData.title" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Website URL" v-model="websiteCitationData.url" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-input placeholder="Publisher" v-model="websiteCitationData.Publisher" expanded></b-input>
            </b-field>
            <b-field expanded>
                <b-select v-model="websiteCitationData.datePublished.month" placeholder="Month Published">
                    <option v-for="(month, i) in monthNames" :value="i" :key="i" v-cloak>
                        {{ month }}
                    </option>
                </b-select>
                <b-input v-model.number="websiteCitationData.datePublished.day" type="number" maxlength="2" placeholder="Day" expanded></b-input>
                <b-input v-model.number="websiteCitationData.datePublished.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
            </b-field>
            <b-field expanded>
                <div id="submitFormDiv">
                    <a class="button is-primary" @click="citationStarted = !citationStarted">Done Editing</a>
                </div>
            </b-field>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import WebsiteCitation from '../WebsiteCitation';

@Component({
  components: {
  },
})
export default class EditWebsite extends Vue {
    citationStarted = false
    contributorTypes = ["Author", "Editor"] 
    websiteCitationData = new WebsiteCitation([{first: "", middle: "", last: "", type: "Author"}], null, null, null, null, {})
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"]
}
</script>

<style scoped lang="scss">
#websiteInputField {
    justify-content: center;
    display: inline-flex;
}
#editFormTitle {
    color: #005eea;
}
#editwebsite {
    padding: 10px;
    height: 100vh;
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
    #websiteInput {
        width: 35vh;
    }
}
@media (min-width: 991.98px) {
    #editForm {
        padding-left: 20%;
        padding-right: 20%;
    }
    #websiteInput {
        width: 60vh;
    }
}
</style>