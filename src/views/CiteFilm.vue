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
                <sui-input v-model="filmTitle" :data="filmData" placeholder="Find a movie to cite..." @input="getAsyncData" icon="search"/>
            </div>

            <div v-if="isFetching">
                <moon-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="isFetching" color="#005eea"></moon-loader>
            </div>

            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column :mobile="2" :tablet="2" :computer="5"/>
                    <sui-grid-column :mobile="12" :tablet="12" :computer="6">
                    <sui-item-group style="text-align: left; padding: 5vh;" divided v-for="(film, i) in filmData" :key="i">
                        <sui-item>
                            <sui-item-content>
                                <sui-item-header v-if="film.title" v-cloak>{{ film.title }}</sui-item-header>
                                <sui-item-meta>
                                    <span v-if="film.release_date && film.vote_average" v-cloak>
                                        Released at {{ film.release_date }}, rated <b>{{ film.vote_average }}</b>
                                    </span>
                                </sui-item-meta>
                                <sui-item-description v-if="film.overview" v-cloak>
                                    <p>{{ film.overview }}</p>
                                </sui-item-description>
                                <sui-button style="margin-top: 1vh;" @click="citeFilm(film)" type="button"><sui-icon name="pencil alternatice"/>Cite Film</sui-button>
                            </sui-item-content>
                        </sui-item>
                    </sui-item-group>
                    </sui-grid-column>
                    <sui-grid-column :mobile="2" :tablet="2" :computer="5"/>
                </sui-grid-row>
            </sui-grid>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import FilmCitation from '../FilmCitation';
//@ts-ignore
import debounce from 'lodash/debounce';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '../components/Preview.vue';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
//@ts-ignore
import * as  _ from 'lodash/core';

@Component({
  components: {
    Preview,
    MoonLoader
  },
  data () {
      return {
        contributorTypes: ["Director", "Writer", "Producer", "Actor/Performer", "Author"],
        //@ts-ignore
        filmCitationData: new FilmCitation([{first: "", middle: "", last: "", type: "Director"}], '', '', '', {month: "", day: "", year: ""}, {month: "", day: "", year: ""}, '', ('Film/' + this.$store.getters.getCitations.filter(c => c.id.includes('Film')).length)),
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"],
        filmData: [],
        filmTitle: '',
        selectedFilm: '',
        isFetching: false
      }
  },
  methods: {
      getAsyncData: debounce(function () {
        //@ts-ignore
        this.filmData = []
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
            body: {"title": this.filmTitle, "format": "movie"},
            json: true
            //@ts-ignore
        }).then(data => {
                //@ts-ignore
                data.results.forEach((item) => this.filmData.push(item))
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
                body: {"title": this.filmTitle, "movie": this.$data.selectedFilm.id, "format": "movie"},
                json: true
                //@ts-ignore
            }).then(data => {
                console.log(data)
                //@ts-ignore
                var contributors = [];
                //@ts-ignore
                if (data.director && data.director.length > 0) {
                    //@ts-ignore
                    data.director.forEach(director => {
                        //@ts-ignore
                        contributors.push({given: director.given ? director.given: "", middle: director.given ? (director.given.split(" ").length == 2 ? director.given.split(" ")[1]: ""): "", family: director.family ? director.family: "", type: "Director"})
                    });
                }
                //@ts-ignore
                if (contributors.length == 0) {
                    contributors = [{given: "", middle: "", family: "", type: "Director"}]
                }
                //@ts-ignore
                this.$data.filmCitationData = new FilmCitation(contributors, data.title ? data.title: "", data.publisher ? data.publisher: "", data["publisher-place"] ? data["publisher-place"]: "", {month: "", day: "", year: ""}, {month: data.issued.month ? data.issued.month: "", day: data.issued.day ? data.issued.day: "", year: data.issued.year ? data.issued.year: ""}, data.abstract ? data.abstract: "", ('Film/' + this.$store.getters.getCitations.filter(c => c.id.includes('Film')).length))
                //@ts-ignore
                this.$store.dispatch('setEditingProject', this.$data.filmCitationData)
                this.$router.push({path: '/edit/film/'})
                //@ts-ignore
            }).catch(error => {
                console.log(error)
            })
        }
      }
  },
})
export default class CiteFilm extends Vue {
}
</script>

<style scoped lang="scss">
#citeFilm {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
</style>