<template>
    <div id="citeBook">
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
            <sui-form style="display: inline-flex;">
                <sui-form-field style="margin-right: 3vh;">
                    <sui-dropdown fluid v-model="bookIdentificationSelected" :options="bookIdentification" selection search/>
                </sui-form-field>
                <sui-form-field>
                    <input v-model="bookIdentificationField" :data="bookData" placeholder="Find a book to cite..." @input="getAsyncData"/>
                </sui-form-field>
            </sui-form>
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
        bookData: [],
        selectedBook: null,
        bookIdentificationSelected: 'Title',
        bookIdentification: [
            {
                "key": "Title",
                "text": "Title",
                "value": "Title"
            },
            {
                "key": "ISBN",
                "text": "ISBN",
                "value": "ISBN"
            },
            {
                "key": "OCLC",
                "text": "OCLC",
                "value": "OCLC"
            },
            {
                "key": "LCCN",
                "text": "LCCN",
                "value": "LCCN"
            }
        ],
        bookIdentificationField: null,
        bookCitationData: new BookCitation([{first: "", middle: "", last: "", type: "Author"}], null, null, null, null, {}),
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
                //@ts-ignore
                this.$store.dispatch('setEditing', this.$data.bookCitationData)
                this.$router.push({path: '/edit/book/'})
                //@ts-ignore
            }).catch(error => {
                console.log(error)
            })
        }
    },
  }
})

export default class CiteBook extends Vue {}
</script>

<style scoped lang="scss">
#citeBook {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
</style>