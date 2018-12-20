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
                <sui-input v-model="bookIdentificationField" :data="bookData" placeholder="Find a book to cite..." @input="getSearchResults" icon="search" ref="bookInput"/>
            </div>
            <div style="margin-top: 3vh;">
                <sui-button type="button" @click="citeEmpty()" basic primary size="mini">Manual Citation</sui-button>
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
import Preview from '../components/Preview.vue';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import { generateCitation } from '@/functions/generateCitation';
import { Citation } from '@/models/citation.model';

@Component({
  components: {
    Preview,
    BounceLoader
  }
})
export default class CiteBook extends Vue {
    bookData: any[] = [];
    selectedBook: any = null;
    bookIdentificationSelected: string = 'Title';
    empty: boolean = false
    bookIdentification: any[] = [
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
    ];

    bookIdentificationField: any = null;
    bookCitationData: Citation = {"type": "book", "contributors": [{given: "", middle: "", family: "", type: "Author"}], "title": "", "publisher": "", id: `citation-${this.$store.getters.getProjectCitations.length}`};
    isFetching: boolean = false;

    mounted() {
        //@ts-ignore
        this.$refs.bookInput.$el.children[0].focus();
    }

    setContributorType(index: number, type: string) {
        this.$data.bookCitationData.contributors[index].type = type
    }

    async getSearchResults() {
        //@ts-ignore
        this.$data.bookData = []
        //@ts-ignore
        if (this.$data.bookIdentificationSelected && this.$data.bookIdentificationSelected.trim() != "" && this.$data.bookIdentificationField && this.$data.bookIdentificationField.trim() != "") {
            this.$data.isFetching = true
            //@ts-ignore
            const searchResults: any = await
            fetch('https://api.cloudcite.net/autofill', {
                method: 'POST',
                headers: {
                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                body: JSON.stringify({
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
                })
            }).then(response => {
                return response.json();
            });

            if(searchResults.items != null){
                //@ts-ignore
                searchResults.items.forEach((item: any) => {
                    //@ts-ignore
                    if (item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
                        item.volumeInfo.imageLinks.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
                    }
                    //@ts-ignore
                    this.bookData.push(item)
                })
            }
            if (searchResults.items != null && searchResults.items.length > 0){
                this.$data.empty = false;
            }
            else {
                this.$data.empty = true;
            }
            this.$data.isFetching = false;
        }
    }

    async citeBook(book: any) {
        this.$data.selectedBook = book
        if (this.$data.selectedBook != null && this.$data.selectedBook != '') {
            const autofillData: any = await fetch('https://api.cloudcite.net/autofill', {
                method: 'POST',
                headers: {
                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                body: JSON.stringify({
                    "title": this.$data.selectedBook.volumeInfo.title,
                    "book": this.$data.selectedBook.id,
                    "format": "book"
                }),
            }).then(response => {
                return response.json();
            });

            autofillData.contributors = [];

            if (autofillData.author && autofillData.author.length > 0) {
                autofillData.author.forEach((author: any) => {
                    autofillData.contributors.push({given: author.given ? author.given.split(" ")[0]: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"});
                });
            }

            if (autofillData.editor && autofillData.editor.length > 0) {
                autofillData.editor.forEach((editor: any) => {
                    autofillData.contributors.push({given: editor.given ? editor.given.split(" ")[0]: "", middle: editor.given ? (editor.given.split(" ").length == 2 ? editor.given.split(" ")[1]: ""): "", family: editor.family ? editor.family: "", type: "Editor"});
                });
            }
            if (autofillData.contributors.length == 0) {
                autofillData.contributors = [{given: "", middle: "", family: "", type: "Author"}];
            }
            const citation = generateCitation("book", autofillData);
            //@ts-ignore
            this.$store.dispatch('setEditingCitation', citation);
            this.$router.push({path: '/edit/book/'});
        }
    }

    citeEmpty() {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', generateCitation('book', this.$data.bookCitationData));
        this.$router.push({path: '/edit/book/'})
    }

    get numOfRows() {
        //@ts-ignore
        if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >= 850){
            return 8;
        }
        else{
            return 2;
        }
    }

}
</script>

<style scoped lang="scss">
#citeBook {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
</style>