<template>
    <div id="citeFilm">
        <div v-if="!citationStarted">
            <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
                <div class="container" style="padding: 7vh;">
                    <h1>Cite a Film</h1>
                    <h2 class="subtitle" style="margin-top: 10vh;">
                        You can start citing a film by typing the title and selecting the film you want to cite.
                    </h2>
                </div>
            </div>

            <div class="is-hidden-tablet">
                <b-field style="margin-left: 2vh; margin-right: 2vh;">
                    <b-input id="filmInputBox" v-model="filmTitle" :data="filmData" placeholder="Find a movie to cite..." @input="getAsyncData" expanded/>
                </b-field>
            </div>

            <div class="is-hidden-mobile">
                <input id="filmInputBox" v-model="filmTitle" :data="filmData" placeholder="Find a movie to cite..." @input="getAsyncData"/>
            </div>

            <div v-if="isFetching">
                <moon-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="isFetching" color="#005eea"></moon-loader>
            </div>
            
            <div v-for="(film, i) in filmData" :key="i">
                <a @click="citeFilm(film)">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left" v-if="film.poster_path">
                                    <figure class="image is-48x48" style="margin-bottom: 25px;">
                                    <img :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`" width="32">
                                    </figure>
                                </div>
                                <div class="media-content" v-if="film.title" v-cloak>
                                    {{ film.title }}
                                    <br>
                                    <small v-if="film.release_date && film.vote_average" v-cloak>
                                        Released at {{ film.release_date }},
                                        rated <b>{{ film.vote_average }}</b>
                                    </small>
                                    <br/>
                                    <small v-if="film.overview" v-cloak>
                                        {{film.overview}}
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import FilmCitation from '../FilmCitation';
//@ts-ignore
import debounce from 'lodash/debounce';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '../components/Preview.vue';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

@Component({
  components: {
    Preview,
    MoonLoader
  },
  data () {
      return {
        contributorTypes: ["Director", "Writer", "Producer", "Actor/Performer", "Author"],
        filmCitationData: new FilmCitation([{first: "", middle: "", last: "", type: "Director"}], '', '', '', {month: null, day: null, year: null}, ''),
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
                this.$data.filmCitationData = new FilmCitation(contributors, data.title ? data.title: "", data.publisher ? data.publisher: "", data["publisher-place"] ? data["publisher-place"]: "", {month: data.issued.month ? data.issued.month: "", day: data.issued.day ? data.issued.day: "", year: data.issued.year ? data.issued.year: ""}, data.abstract ? data.abstract: "")
                //@ts-ignore
                this.$store.dispatch('setEditing', this.$data.filmCitationData)
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
#filmInputBox {
  padding: 5px;
  margin-bottom: 5vh;
  min-width: 20vh;
  min-height: 7vh;
  border-style: solid;
  background-color: #fff;
  caret-color: #000;
  border-radius: 5px;
  font-size: 1.3rem;
}
#filmInputBox::placeholder {
    font-size: 1rem;
    color: #9ea7aa;
}
#filmInputBox:focus {
    border-color: #0064ff;
}
#citeFilm {
    height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
#nextColumn {
    transform: translate(0, 35%);
}

@media (max-width: 991.97px) {
    #filmInput {
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
    #filmInput {
        width: 60vh;
    }
}
</style>