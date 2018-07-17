<template>
    <div id="editFilm">
        <div v-if="!citationStarted">
            <section class="hero is-primary" style="height: 35vh; margin-bottom: 10vh;">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title is-size-2">Cite a Film</h1>
                        <h2 class="subtitle" style="margin-top: 10vh;">
                            You can start citing a film by typing the title and selecting the film you want to cite.
                        </h2>
                    </div>
                </div>
            </section>
            <input id="filmInputBox" v-model="filmTitle" :data="filmData" placeholder="Find a movie to cite..." @input="getAsyncData"/>
            
            <div v-for="(film, i) in filmData" :key="i">
                <a @click="citeFilm(film)">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48" style="margin-bottom: 25px;">
                                    <img :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`" width="32">
                                    </figure>
                                </div>
                                <div class="media-content" v-cloak>
                                    {{ film.title }}
                                    <br>
                                    <small v-cloak>
                                        Released at {{ film.release_date }},
                                        rated <b>{{ film.vote_average }}</b>
                                    </small>
                                    <br/>
                                    <small v-cloak>
                                        {{film.overview}}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div v-if="citationStarted">
            <h1 id="editFormTitle" class="title is-size-4">Edit Film Citation</h1>
            <div class="container" id="editForm">
                <b-field grouped v-for="(contributor, i) in filmCitationData.contributors" :key="i">
                    <b-field expanded>
                        <b-select v-model="filmCitationData.contributors[i].type" :placeholder="contributor.type">
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
                            <a v-if="filmCitationData.contributors.length == 1" id="removeContributorButton" @click="filmCitationData.clearContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                            <a v-if="filmCitationData.contributors.length > 1" id="removeContributorButton" @click="filmCitationData.removeContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                        </b-tooltip>
                        <b-tooltip label="Add Contributor" position="is-top" animated>
                            <a id="addContributorButton" @click="filmCitationData.contributors.push({first: null, middle: null, last: null, type: 'Author'})"><b-icon icon="plus-circle" custom-size="mdi-24px"></b-icon></a>
                        </b-tooltip>
                    </b-field>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Title" @input="typing = true" v-model="filmCitationData.title" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Studio" @input="typing = true" v-model="filmCitationData.publisher" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Publisher Location" @input="typing = true" v-model="filmCitationData.publisherPlace" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input @input="typing = true" v-model.number="filmCitationData.issued.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input maxlength="500" type="textarea" @input="typing = true" v-model="filmCitationData.abstract" placeholder="Abstract"></b-input>
                </b-field>
                <b-field expanded>
                    <Preview :cslObject="filmCitationData.toCSL()" :deleteOption="false" :copyOption="true" :typing="typing"/>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import FilmCitation from '../FilmCitation';
//@ts-ignore
import debounce from 'lodash/debounce';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '../components/Preview.vue';
@Component({
  components: {
    Preview
  },
  data () {
      return {
        citationStarted: false,
        typing: false,
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
                this.$data.citationStarted = !this.$data.citationStarted
                //@ts-ignore
            }).catch(error => {
                console.log(error)
                this.$data.citationStarted = !this.$data.citationStarted
            })
        }
      },
      cite() {
          this.$store.dispatch('addCitation', this.$data.filmCitationData.toCSL())
          this.$router.push({path: '/bibliography/'})
      }
  },
  watch: {
    typing: debounce(function () {
    //@ts-ignore
    this.$data.typing = false
    }, 5000)
  }
})
export default class EditFilm extends Vue {
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
#filmInputField {
    justify-content: center;
    display: inline-flex;
}
#editFormTitle {
    color: #005eea;
}
#editFilm {
    height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
#nextColumn {
    transform: translate(0, 35%);
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
    #filmInput {
        width: 35vh;
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