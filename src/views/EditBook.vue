<template>
    <div id="editbook">
        <div v-if="!citationStarted">
            <section class="hero is-primary" style="min-height: 35vh; margin-bottom: 10vh;">
                <div class="hero-body">
                    <div class="container">
                    <h1 class="title is-size-2">Cite a Book</h1>
                    <h2 class="subtitle" style="margin-top: 10vh; text-align: left;">
                        You can start citing a book by typing the title and selecting the book you want to cite. You can also find books by ISBN, OCLC, and LCCN.
                    </h2>
                    </div>
                </div>
            </section>
            <div class="is-hidden-tablet">
                <b-field style="margin-left: 2vh; margin-right: 2vh;">
                    <p class="control">
                        <b-select v-model="bookIdentificationSelected">
                        <option v-for="(identification, i) in bookIdentification" :value="identification" :key="i" v-cloak>
                            {{ 'Search by ' + identification }}
                        </option>  
                    </b-select>
                    </p>
                    <p class="control">
                        <b-input v-model="bookIdentificationField" :data="bookData" placeholder="Find a book to cite..." @input="getAsyncData" expanded/>
                    </p>
                </b-field>
            </div>
            <div class="is-hidden-mobile" style="display: inline-flex;">
                <select id="bookIdentificationDropdown" v-model="bookIdentificationSelected">
                    <option v-for="(identification, i) in bookIdentification" :value="identification" :key="i" v-cloak>
                        {{ 'Search by ' + identification }}
                    </option>  
                </select>
                <input id="bookInputBox" v-model="bookIdentificationField" :data="bookData" placeholder="Find a book to cite..." @input="getAsyncData"/>
            </div>
            <div v-if="isFetching">
                <moon-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="isFetching" color="#005eea"></moon-loader>
            </div>
            
            <div v-for="(book, i) in bookData" :key="i">
                <a @click="citeBook(book)">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left" v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail">
                                    <figure class="image is-48x48" style="margin-bottom: 25px;">
                                    <img :src="book.volumeInfo.imageLinks.smallThumbnail" width="32">
                                    </figure>
                                </div>
                                <div class="media-content" v-cloak>
                                    {{ book.volumeInfo.title }}
                                    <small v-if="book.volumeInfo.authors && book.volumeInfo.authors.length > 1"><br>Authors: </small>
                                    <small v-if="book.volumeInfo.authors && book.volumeInfo.authors.length == 1"><br>Author: </small>
                                    <small v-for="(author, a) in book.volumeInfo.authors" :key="a">
                                        <span v-if="book.volumeInfo.authors.length > 1 && a < (book.volumeInfo.authors.length - 1)" v-cloak>{{author + ", "}}</span>
                                        <span v-else v-cloak>
                                            {{author}}
                                        </span>
                                    </small>
                                    <small v-if="book.volumeInfo.publishedDate" v-cloak>
                                        <br/>Published on {{book.volumeInfo.publishedDate}}
                                    </small>
                                    <small v-if="book.volumeInfo.description" v-cloak>
                                        <br/>{{book.volumeInfo.description}}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div v-if="citationStarted">
            <section class="hero is-primary" style="min-height: 20vh; margin-bottom: 10vh;">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title is-size-2">Edit Book Citation</h1>
                    </div>
                </div>
            </section>
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
                        <b-input placeholder="First Name" @input="typing = true" v-model="contributor.given"></b-input>
                    </b-field>
                    <b-field expanded>
                        <b-input placeholder="Middle Name" @input="typing = true" v-model="contributor.middle"></b-input>
                    </b-field>
                    <b-field expanded>
                        <b-input placeholder="Last Name" @input="typing = true" v-model="contributor.family"></b-input>
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
                    <b-input placeholder="Title" @input="typing = true" v-model="bookCitationData.title" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Chapter" @input="typing = true" v-model="bookCitationData.chapter" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Volume Number" @input="typing = true" v-model.number="bookCitationData.volNumber" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Publisher" @input="typing = true" v-model="bookCitationData.publisher" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input @input="typing = true" v-model.number="bookCitationData.issued.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <Preview :cslObject="bookCitationData.toCSL()" :deleteOption="false" :copyOption="true" :typing="typing"/>
                </b-field>
                <b-field expanded>
                    <div id="submitFormDiv">
                        <a class="button is-primary" @click="cite()">Done Editing</a>
                    </div>
                </b-field>
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
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

@Component({
  components: {
    Preview,
    MoonLoader
  },
  data () {
    return {
        citationStarted: false,
        typing: false,
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
                //@ts-ignore
                var contributors = [];
                //@ts-ignore
                if (data.author && data.author.length > 0) {
                    //@ts-ignore
                    data.author.forEach(author => {
                        //@ts-ignore
                        contributors.push({given: author.given ? author.given: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
                    });
                }
                if (data.editor && data.editor.length > 0) {
                    //@ts-ignore
                    data.editor.forEach(editor => {
                        //@ts-ignore
                        contributors.push({given: editor.given ? editor.given: "", middle: editor.given ? (editor.given.split(" ").length == 2 ? editor.given.split(" ")[1]: ""): "", family: editor.family ? editor.family: "", type: "Editor"})
                    });
                }
                //@ts-ignore
                if (contributors.length == 0) {
                    contributors = [{given: "", middle: "", family: "", type: "Author"}]
                }
                //@ts-ignore
                var yearPublished = this.$data.selectedBook.volumeInfo.publishedDate ? (new Date(this.$data.selectedBook.volumeInfo.publishedDate).getFullYear()): ""
                //@ts-ignore
                this.$data.bookCitationData = new BookCitation(contributors, "", "", this.$data.selectedBook.volumeInfo.title, this.$data.selectedBook.volumeInfo.publisher, {month: "", day: "", year: yearPublished ? yearPublished: ""})
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
        this.$router.push({path: '/bibliography/'})
    }
  },
  computed: {
    selectedMonth: {
        get() {
            return this.$data.bookCitationData.issued.month
        }
    }
  },
  watch: {
    selectedMonth() {
        this.$data.typing = true
    },
    typing: debounce(function () {
    //@ts-ignore
    this.$data.typing = false
    }, 5000)
  }
})

export default class EditBook extends Vue {}
</script>

<style scoped lang="scss">
#bookIdentificationDropdown {
    width: 20vh;
    height: 7vh;
    font-size: 0.8rem;
    font-weight: 450;
    -webkit-appearance: none; 
   -moz-appearance: none;
   border-style: solid;
   background-color: #fff;
   border-radius: 5px;
   color: #9ea7aa;;
}
#bookIdentificationDropdown:focus {
    border-color: #005eea;
    color: #000;
}
#bookInputBox {
  padding: 5px;
  margin-left: 5vh;
  margin-bottom: 5vh;
  min-width: 20vh;
  min-height: 7vh;
  border-style: solid;
  background-color: #fff;
  caret-color: #000;
  border-radius: 5px;
  font-size: 1.3rem;
}
#bookInputBox::placeholder {
    font-size: 1rem;
    color: #9ea7aa;
}
#bookInputBox:focus {
    border-color: #0064ff;
}
#editFormTitle {
    color: #005eea;
}
#editbook {
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
    margin: 5vh;
}
@media (max-width: 991.97px) {
    #bookInput {
        width: 35vh;
    }
    #editForm {
        margin-left: 5vh;
        margin-right: 5vh;
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