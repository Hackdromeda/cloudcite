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
    websiteCitationData = new WebsiteCitation([{}], null, null, null)

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