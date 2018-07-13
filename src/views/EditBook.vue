<template>
    <div id="editbook">
        <div v-if="!citationStarted">
            <h1 class="title is-size-2">Cite a Book</h1>
            <b-field id="bookInputField">
                <div class="control" id="bookInput">
                    <b-field expanded>
                        <b-select v-model="bookIdentificationSelected" :placeholder="bookIdentificationSelected">
                            <option v-for="(identification, i) in bookIdentification" :value="identification" :key="i" v-cloak>
                                {{ identification }}
                            </option>  
                        </b-select>
                    <b-autocomplete v-model="bookIdentificationField" :data="bookData" placeholder="Find a book to cite..." field="title" :loading="isFetching" @input="getAsyncData" @select="option => citeBook(option)">
                        <template slot-scope="props">
                            <div class="media">
                                <div class="media-left">
                                    <img width="32" :src="props.option.volumeInfo.imageLinks.smallThumbnail">
                                </div>
                                <div class="media-content">
                                    {{ props.option.volumeInfo.title }}
                                </div>
                            </div>
                        </template>
                    </b-autocomplete>
                    </b-field>
                </div>
            </b-field>
        </div>
        <div v-if="citationStarted">
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
                    <b-select v-model="bookCitationData.issued.month" placeholder="Month Published">
                        <option v-for="(month, i) in monthNames" :value="i" :key="i" v-cloak>
                            {{ month }}
                        </option>
                    </b-select>
                    <b-input v-model.number="bookCitationData.issued.day" type="number" maxlength="2" placeholder="Day" expanded></b-input>
                    <b-input v-model.number="bookCitationData.issued.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <div id="submitFormDiv">
                        <a class="button is-primary" @click="cite()">Done Editing</a>
                    </div>
                </b-field>
                <Preview :cslObject=bookCitationData.toCSL() />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookCitation from '../BookCitation';
//@ts-ignore
import rp from 'request-promise-native';
//@ts-ignore
import lodash from 'lodash';
//@ts-ignore
import debounce from 'lodash/debounce';
import Preview from '../components/Preview.vue';

@Component({
  components: {
    Preview
  },
  data () {
    return {
        citationStarted: false,
        bookData: [],
        selectedBook: null,
        bookIdentificationSelected: 'Title',
        bookIdentification: ['Title', 'ISBN', 'OCLC', 'LCCN'],
        bookIdentificationField: null,
        bookCitationData: new BookCitation([{first: "", middle: "", last: "", type: "Author"}], null, null, null, null, {}),
        contributorTypes: ["Author", "Editor"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"],
        isFetching: false
    }
  },
  methods: {
    setContributorType(index: number, type: string) {
        this.$data.bookCitationData.contributors[index].type = type
    },
    getAsyncData: debounce(function () {
        //@ts-ignore
        this.bookData = []
        //@ts-ignore
        this.isFetching = true
        //@ts-ignore
        rp({
            uri: 'https://api.cloudcite.net/autofill',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            //@ts-ignore
            body: {
                    //@ts-ignore
                    "title": this.$data.bookIdentificationSelected === "Title" ? this.$data.bookIdentificationField: null,
                    //@ts-ignore
                    "isbn": this.$data.bookIdentificationSelected === "ISBN" ? this.$data.bookIdentificationField: null,
                    //@ts-ignore
                    "oclc": this.$data.bookIdentificationSelected === "OCLC" ? this.$data.bookIdentificationField: null,
                    //@ts-ignore
                    "lccn": this.$data.bookIdentificationSelected === "LCCN" ? this.$data.bookIdentificationField: null,
                    //@ts-ignore
                    "author": this.$data.bookCitationData.contributors.filter(b => b.type === 'author')[0],
                    //@ts-ignore
                    "publisher": this.$data.bookCitationData.publisher,
                    "book": "",
                    "format": "book"
            },
            json: true
            //@ts-ignore
        }).then(data => {
                //@ts-ignore
                data.items.forEach((item) => this.bookData.push(item))
                //@ts-ignore
                this.isFetching = false
            })
            //@ts-ignore
            .catch((error) => {
                //@ts-ignore
                this.isFetching = false
                throw error
            })
    }, 500),
    citeBook(book: any) {
        this.$data.selectedBook = book
        if (this.$data.selectedBook != null && this.$data.selectedBook != '') {
            rp({
                uri: 'https://api.cloudcite.net/autofill',
                headers: {
                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                method: 'POST',
                //@ts-ignore
                body: {
                    "title": this.$data.selectedBook.volumeInfo.title,
                    "book": this.$data.selectedBook.id,
                    "format": "book"
                },
                json: true
                //@ts-ignore
            }).then(data => {
                console.log(data)
                //@ts-ignore
                var contributors = [];
                //@ts-ignore
                if (data.author && data.author.length > 0) {
                    //@ts-ignore
                    data.author.forEach(author => {
                        //@ts-ignore
                        contributors.push({given: author.given, middle: author.given.split(" ").length == 2 ? author.given.split(" ")[1]: null, family: author.family, type: "Author"})
                    });
                }
                if (data.editor && data.editor.length > 0) {
                    //@ts-ignore
                    data.editor.forEach(editor => {
                        //@ts-ignore
                        contributors.push({given: editor.given, middle: editor.given.split(" ").length == 2 ? editor.given.split(" ")[1]: null, family: editor.family, type: "Editor"})
                    });
                }
                //@ts-ignore
                if (contributors.length == 0) {
                    contributors = [{given: "", middle: "", family: "", type: "Author"}]
                }
                //@ts-ignore
                this.$data.bookCitationData = new BookCitation(contributors, null, null, this.$data.selectedBook.volumeInfo.title, this.$data.selectedBook.volumeInfo.publisher, {month: null, day: null, year: this.$data.selectedBook.volumeInfo.publishedDate})
                this.$data.citationStarted = !this.$data.citationStarted
                //@ts-ignore
            }).catch(error => {
                console.log(error)
                this.$data.citationStarted = !this.$data.citationStarted
            })
        }
    },
    cite() {
        this.$store.dispatch('addCitation', this.$data.bookCitationData.toCSL())
    }
  }
})

export default class Editbook extends Vue {}
</script>

<style scoped lang="scss">
#bookInputField {
    justify-content: center;
    display: inline-flex;
}
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
    #bookInput {
        width: 35vh;
    }
}
@media (min-width: 991.98px) {
    #editForm {
        padding-left: 20%;
        padding-right: 20%;
    }
    #bookInput {
        width: 60vh;
    }
}
</style>