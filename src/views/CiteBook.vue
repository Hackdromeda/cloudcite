<template>
    <div id="citeBook">
            <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
                <div style="padding: 7vh;">
                    <h1>Cite a Book</h1>
                    <h2 class="subtitle" style="margin-top: 10vh;">
                        You can start citing a book by typing the title and selecting the book you want to cite. You can also find books by ISBN, OCLC, and LCCN.
                    </h2>
                </div>
            </div>
            <div style="display: inline-flex; margin-top: 5vh;">
                <sui-dropdown style="margin-right: 3vh;" fluid v-model="bookIdentificationSelected" :options="bookIdentification" selection search/>
                <sui-input v-model="bookIdentificationField" :data="bookData" placeholder="Find a book to cite..." @input="getAsyncData" icon="search"/>
            </div>
            <div v-if="isFetching">
                <moon-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="isFetching" color="#005eea"></moon-loader>
            </div>
            
            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column/>
                    <sui-grid-column>
                    <sui-item-group style="text-align: left; padding: 5vh; width: 60vh;" divided v-for="(book, i) in bookData" :key="i">
                        <sui-item>
                            <sui-item-content>
                                <sui-item-header v-if="book.volumeInfo.title" v-cloak>{{ book.volumeInfo.title }}</sui-item-header>
                                <sui-item-meta>
                                <span v-if="book.volumeInfo.publishedDate" v-cloak>{{ book.volumeInfo.publishedDate }}</span>
                                </sui-item-meta>
                                <sui-item-description v-if="book.volumeInfo.description" v-cloak>
                                <div style="display: inline-flex;" v-for="(author, a) in book.volumeInfo.authors" :key="a">
                                    <span v-if="book.volumeInfo.authors.length > 1 && a < (book.volumeInfo.authors.length - 1)" v-cloak><b style="margin-right: 5px;">{{author + ","}}</b></span>
                                    <span v-else v-cloak>
                                        <b>{{author}}</b>
                                    </span>
                                </div>
                                <br>
                                <p>
                                    {{ book.volumeInfo.description }}
                                </p>
                                </sui-item-description>
                                <sui-button style="margin-top: 1vh;" @click="citeBook(book)" type="button"><sui-icon name="pencil alternatice" />Cite Book</sui-button>
                            </sui-item-content>
                        </sui-item>
                    </sui-item-group>
                    </sui-grid-column>
                    <sui-grid-column/>
                </sui-grid-row>
            </sui-grid>
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