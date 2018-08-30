<template>
    <div id="citeFilm">
            <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
                <div class="container" style="padding: 7vh;">
                    <h1>Cite a Film</h1>
                    <h2 class="subtitle" style="margin-top: 10vh;">
                        You can start citing a film by typing the title and selecting the film you want to cite.
                    </h2>
                </div>
            </div>

            <div style="display: inline-flex; margin-top: 5vh;">
                <sui-input v-model="filmTitle" :data="filmData" placeholder="Find a movie to cite..." @input="getAsyncData" icon="search" ref="filmInput"/>
            </div>
            <div style="margin-top: 3vh;">
                <sui-button type="button" @click="citeEmpty()" basic primary size="mini">Manual Citation</sui-button>
            </div>
            
            <div v-if="isFetching">
                <bounce-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="isFetching" color="#005eea"/>
            </div>

            <div class="cardGroup" style="margin-left: 5%; margin-right: 5%; margin-top: 15px; margin-bottom: 15px; word-break: break-all;">
                <sui-card-group :items-per-row="numOfRows">
                    <sui-card v-for="(film, i) in filmData" :key="i" class="centered" @click="citeFilm(film)">
                        <sui-image v-if="film.poster_path" :src="`https://image.tmdb.org/t/p/w200${film.poster_path}`" />
                        <sui-image v-if="!film.poster_path" src="/static/images/poster-placeholder-min.png" />
                        <sui-card-content>
                            <sui-card-header>{{ film.title }}</sui-card-header>
                        </sui-card-content>
                    </sui-card>
                </sui-card-group>
                <h4 style="font-weight: normal;" v-if="filmData.length == 0 && filmTitle.length > 0 && !isFetching && empty">There were no movies matching your query <b>{{ filmTitle }}.</b></h4>
            </div>
            <nav style="margin-left: 5%; margin-right: 5%;" v-if="dataPosition != null && dataPosition.total_pages > 1" class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a v-if="dataPosition.page > 1" @click="updatePage(dataPosition.page - 1)" class="pagination-previous">Previous</a>
                <a v-if="dataPosition.page < dataPosition.total_pages" @click="updatePage(dataPosition.page + 1)" class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    <li v-if="dataPosition.page > 1"><a @click="updatePage(1)" class="pagination-link" aria-label="Goto page 1">1</a></li>
                    <li v-if="dataPosition.total_pages - dataPosition.page > 1 || (Math.abs(dataPosition.total_pages - dataPosition.page) <= 1 && dataPosition.page > 3)"><span class="pagination-ellipsis">&hellip;</span></li>
                    <li v-if="dataPosition.page > 2"><a @click="updatePage(dataPosition.page - 1)" class="pagination-link" aria-label="Goto page">{{ dataPosition.page - 1 }}</a></li>
                    <li><a class="pagination-link is-current" aria-label="Page" aria-current="page">{{ dataPosition.page }}</a></li>
                    <li v-if="dataPosition.page + 1 <= dataPosition.total_pages"><a @click="updatePage(dataPosition.page + 1)" class="pagination-link" aria-label="Goto page">{{ dataPosition.page + 1 }}</a></li>
                    <li v-if="dataPosition.page + 2 < dataPosition.total_pages && dataPosition.page != dataPosition.total_pages"><span class="pagination-ellipsis">&hellip;</span></li>
                    <li v-if="dataPosition.page != dataPosition.total_pages && dataPosition.page + 1 != dataPosition.total_pages"><a @click="updatePage(dataPosition.total_pages)" class="pagination-link" aria-label="Goto page">{{ dataPosition.total_pages }}</a></li>
                </ul>
            </nav>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import generateCitation from '../functions/generateCitation';
//@ts-ignore
import debounce from 'lodash/debounce';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '../components/Preview.vue';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
//@ts-ignore
import * as  _ from 'lodash/core';
import * as Immutable from 'immutable';

@Component({
  components: {
    Preview,
    BounceLoader
  },
  mounted() {
    //@ts-ignore
    this.$refs.filmInput.$el.children[0].focus();
  },
  data () {
      return {
        //@ts-ignore
        filmCitationData: {"type": "motion_picture", "contributors": [{first: "", middle: "", last: "", type: "Author"}], "title": '', "publisher": '', "publisher-place": '', "accessed": {month: "", day: "", year: ""}, "issued": {month: "", day: "", year: ""}, "abstract": '', "id": 'citation-' + this.$store.getters.getCitations.length},
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"],
        filmData: [],
        filmTitle: '',
        dataPosition: null,
        selectedFilm: '',
        isFetching: false,
        filmPage: 1,
        empty: false
      }
  },
  methods: {
      getAsyncData: debounce(function () {
        //@ts-ignore
        if (this.$data.filmTitle && this.$data.filmTitle.trim() != "" && this.$data.filmPage) {
        //@ts-ignore
        this.$data.filmData = []
        //@ts-ignore
        this.$data.dataPosition = []
        //@ts-ignore
        this.$data.isFetching = true
        //@ts-ignore
        rp({
            uri: 'https://api.cloudcite.net/autofill',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            //@ts-ignore
            body: {"title": this.$data.filmTitle, "format": "movie", "page": this.$data.filmPage},
            json: true
            //@ts-ignore
        }).then(data => {
                //@ts-ignore
                data.results.forEach((item) => this.$data.filmData.push(item))
                //@ts-ignore
                this.$data.dataPosition = {"total_results": data.total_results, "page": data.page, "total_pages": data.total_pages}
                //@ts-ignore
                this.$data.isFetching = false
                if(data.length > 0){
                    //@ts-ignore
                    this.$data.empty = false;
                }
                else{
                    //@ts-ignore
                    this.$data.empty = true;
                }
            })
            //@ts-ignore
            .catch((error) => {
                //@ts-ignore
                this.$data.isFetching = false
                throw error
            })
        }
    }, 250),
    citeFilm: function(film) {
        this.$data.selectedFilm = film;
        if (this.$data.selectedFilm != null && this.$data.selectedFilm != '') {
            rp({
                uri: 'https://api.cloudcite.net/autofill',
                headers: {
                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                method: 'POST',
                //@ts-ignore
                body: {"title": this.$data.filmTitle, "movie": this.$data.selectedFilm.id, "format": "movie"},
                json: true
                //@ts-ignore
            }).then(data => {
                console.log(data)
                //@ts-ignore
                data.contributors = [];
                //@ts-ignore
                if (data.director && data.director.length > 0) {
                    //@ts-ignore
                    data.director.forEach(author => {
                        //@ts-ignore
                        data.contributors.push({given: author.given ? author.given.split(" ")[0]: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
                    });
                }
                //@ts-ignore
                if (data.contributors.length == 0) {
                    data.contributors = [{given: "", middle: "", family: "", type: "Author"}]
                }
                const id = ('citation-' + this.$store.getters.getCitations.length)
                const citation = generateCitation(id, "motion_picture", data)
                //@ts-ignore
                this.$store.dispatch('setEditingCitation', citation.toObject())
                this.$router.push({path: '/edit/film/'})
                //@ts-ignore
            }).catch(error => {
                console.log(error)
            })
        }
      },
      citeEmpty() {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', this.$data.filmCitationData)
        this.$router.push({path: '/edit/film/'})
    },
    updatePage(page) {
        //@ts-ignore
        this.filmPage = page;
        //@ts-ignore
        this.getAsyncData()
    }
  },
  computed: {
      numOfRows: function () {
          //@ts-ignore
          if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >= 850){
              return 5;
          }
          else{
              return 2
          }
      }
  }
})
export default class CiteFilm extends Vue {
}
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/components/pagination.sass";

ul {
  list-style: none;
}

#citeFilm {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
</style>