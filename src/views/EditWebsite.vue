<template>
    <div id="editwebsite">
        <h1 id="editFormTitle" class="title is-size-4">Edit Website Citation</h1>
        <div class="container" id="editForm">
            <b-field grouped v-for="(author, i) in websiteCitationData.authors" :key="i">
                <b-field expanded>
                    <b-input placeholder="Author First Name" v-model="author.first"></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Author Middle Name" v-model="author.middle"></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Author Last Name" v-model="author.last"></b-input>
                </b-field>
                <b-field expanded>
                    <a v-if="websiteCitationData.authors.length == 1" id="removeAuthorButton" @click="websiteCitationData.clearAuthor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                    <a v-if="websiteCitationData.authors.length > 1" id="removeAuthorButton" @click="websiteCitationData.removeAuthor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                    <a id="addAuthorButton" @click="websiteCitationData.authors.push({first: null, middle: null, last: null})"><b-icon icon="plus-circle" custom-size="mdi-24px"></b-icon></a>
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
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WebsiteCitation from '../WebsiteCitation';

@Component({
  components: {
  },
})
export default class EditWebsite extends Vue {
    websiteCitationData = new WebsiteCitation([{}], null, null, null, null, {})
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"]
}
</script>

<style scoped lang="scss">
#editFormTitle {
    color: #005eea;
}
#editwebsite {
        padding: 10px;
        min-height: 100vh;
        text-align: center;
        justify-content: center;
        background-color: #fff;
}
#removeAuthorButton {
    color: red;
}
#addAuthorButton {
    color: #005eea;
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