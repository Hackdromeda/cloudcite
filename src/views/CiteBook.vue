<template>
    <div id="citeBook">
            <div style="min-height: 35vh;">
                <div style="padding: 7vh; background-color: #2962ff; color: #eceff1;">
                    <h1>Cite a Book</h1>
                    <h2 class="subtitle" style="margin-top: 10vh;">
                        You can start citing a book by typing the title and selecting the book you want to cite. You can also find books by ISBN, OCLC, and LCCN.
                    </h2>
                </div>
            </div>
            <span style="margin-top: 5vh;">
                <mdc-select style="margin-right: 3vh;" v-model="bookIdentificationSelected">
                    <option v-for="(identification, i) in bookIdentification" :key="i" :value="identification.value" v-cloak> {{ identification.text }}</option>
                </mdc-select>
                <mdc-textfield v-model="bookIdentificationField" label="Find a book to cite..."  trailing-icon="search" @input="getAsyncData" ref="bookInput"/>
            </span>
            <div style="margin-top: 3vh;">
                <mdc-button @click="citeEmpty()" outlined dense>Manual Citation</mdc-button>
            </div>

            <div v-if="isFetching">
                <bounce-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="isFetching" color="#005eea"/>
            </div>

            <div class="cardGroup" style="margin-left: 5%; margin-right: 5%; margin-top: 15px; margin-bottom: 15px; word-break: break-all;">
                <sui-card-group :items-per-row="numOfRows">
                    <sui-card v-for="(book, i) in bookData" :key="i" class="centered" @click="citeBook(book)">
                        <sui-image v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail" :src="book.volumeInfo.imageLinks.thumbnail" />
                        <sui-image v-if="!book.volumeInfo.imageLinks || !book.volumeInfo.imageLinks.thumbnail" src="/static/images/poster-placeholder-min.png" />
                        <sui-card-content>
                            <sui-card-header>{{ book.volumeInfo.title }}</sui-card-header>
                                <div style="display: inline-flex;" v-for="(author, a) in book.volumeInfo.authors" :key="a">
                                    <span v-if="book.volumeInfo.authors.length > 1 && a < (book.volumeInfo.authors.length - 1)" v-cloak><b style="margin-right: 5px;">{{author + ","}}</b></span>
                                    <span v-else v-cloak>
                                        <b>{{author}}</b>
                                    </span>
                                </div>
                        </sui-card-content>
                    </sui-card>
                </sui-card-group>
                <h4 style="font-weight: normal;" v-if="bookData.length == 0 && bookIdentificationField != null &&  bookIdentificationField.length > 0 && !isFetching && empty">There were no books matching your query <b>{{ bookIdentificationField }}.</b></h4>
            </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';
//@ts-ignore
import * as  _ from 'lodash/core';
//@ts-ignore
import debounce from 'lodash/debounce';
import Preview from '../components/Preview.vue';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import generateCitation from '@/functions/generateCitation';

@Component({
  components: {
    Preview,
    BounceLoader
  },
  mounted() {
    //@ts-ignore
    this.$refs.bookInput.$el.children[0].focus();
  },
  data () {
    return {
        bookData: [],
        selectedBook: null,
        bookIdentificationSelected: 'Title',
        empty: false,
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
        //@ts-ignore
        bookCitationData: {"type": "book", "contributors": [{first: "", middle: "", last: "", type: "Author"}], "chapter": "", "volNumber": "", "title": "", "publisher": "", "accessed": {month: "", day: "", year: ""}, "issued": {month: "", day: "", year: ""}, id: 'citation-' + this.$store.getters.getCitations.length},
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
        if (this.$data.bookIdentificationSelected && this.$data.bookIdentificationSelected.trim() != "" && this.$data.bookIdentificationField && this.$data.bookIdentificationField.trim() != "") {
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
                    "format": "book"
            },
            json: true
            //@ts-ignore
        }).then(data => {
                //@ts-ignore
                if(data.items != null){
                    //@ts-ignore
                    data.items.forEach(item => {
                        //@ts-ignore
                        if (item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
                            item.volumeInfo.imageLinks.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
                        }
                        //@ts-ignore
                        this.bookData.push(item)
                    })
                }
                if(data.items != null && data.items.length > 0){
                    //@ts-ignore
                    this.empty = false;
                }
                else{
                    //@ts-ignore
                    this.empty = true;
                }
                //@ts-ignore
                this.isFetching = false
            })
            //@ts-ignore
            .catch((error) => {
                //@ts-ignore
                this.isFetching = false
                throw error
            })
        }
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
                data.contributors = [];
                //@ts-ignore
                if (data.author && data.author.length > 0) {
                    //@ts-ignore
                    data.author.forEach(author => {
                        //@ts-ignore
                        data.contributors.push({given: author.given ? author.given.split(" ")[0]: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
                    });
                }
                if (data.editor && data.editor.length > 0) {
                    //@ts-ignore
                    data.editor.forEach(editor => {
                        //@ts-ignore
                        data.contributors.push({given: editor.given ? editor.given.split(" ")[0]: "", middle: editor.given ? (editor.given.split(" ").length == 2 ? editor.given.split(" ")[1]: ""): "", family: editor.family ? editor.family: "", type: "Editor"})
                    });
                }
                //@ts-ignore
                if (data.contributors.length == 0) {
                    data.contributors = [{given: "", middle: "", family: "", type: "Author"}]
                }
                //@ts-ignore
                data.issued = this.$data.selectedBook.volumeInfo.publishedDate ? (new Date(this.$data.selectedBook.volumeInfo.publishedDate).getFullYear()): ""
                const id = ('citation-' + this.$store.getters.getCitations.length)
                const citation = generateCitation(id, "book", data)
                //@ts-ignore
                this.$store.dispatch('setEditingCitation', citation.toObject())
                this.$router.push({path: '/edit/book/'})
                //@ts-ignore
            }).catch(error => {
                console.log(error)
            })
        }
    },
    citeEmpty() {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', this.$data.bookCitationData)
        this.$router.push({path: '/edit/book/'})
    }
  },
    computed: {
      numOfRows: function () {
          //@ts-ignore
          if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >= 850){
              return 8;
          }
          else{
              return 2;
          }
      }
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