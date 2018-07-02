<template>
    <div id="editFilm">
        <div v-if="!citationStarted">
            <h1 class="title is-size-2">Cite a Film</h1>
            <b-field id="filmInputField">
                <div class="control" id="filmInput">
                    <b-autocomplete v-model="filmTitle" :data="filmData" placeholder="Find a movie to cite..." field="title" :loading="isFetching" @input="getAsyncData" @select="option => citeFilm(option)">
                        <template slot-scope="props">
                            <div class="media">
                                <div class="media-left">
                                    <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
                                </div>
                                <div class="media-content">
                                    {{ props.option.title }}
                                    <br>
                                    <small>
                                        Released at {{ props.option.release_date }},
                                        rated <b>{{ props.option.vote_average }}</b>
                                    </small>
                                </div>
                            </div>
                        </template>
                    </b-autocomplete>
                </div>
            </b-field>
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
                            <a v-if="filmCitationData.contributors.length == 1" id="removeContributorButton" @click="filmCitationData.clearContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                            <a v-if="filmCitationData.contributors.length > 1" id="removeContributorButton" @click="filmCitationData.removeContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                        </b-tooltip>
                        <b-tooltip label="Add Contributor" position="is-top" animated>
                            <a id="addContributorButton" @click="filmCitationData.contributors.push({first: null, middle: null, last: null, type: 'Author'})"><b-icon icon="plus-circle" custom-size="mdi-24px"></b-icon></a>
                        </b-tooltip>
                    </b-field>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Source" v-model="filmCitationData.source" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Title" v-model="filmCitationData.title" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Film URL" v-model="filmCitationData.url" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Publisher" v-model="filmCitationData.Publisher" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-select v-model="filmCitationData.datePublished.month" placeholder="Month Published">
                        <option v-for="(month, i) in monthNames" :value="i" :key="i" v-cloak>
                            {{ month }}
                        </option>
                    </b-select>
                    <b-input v-model.number="filmCitationData.datePublished.day" type="number" maxlength="2" placeholder="Day" expanded></b-input>
                    <b-input v-model.number="filmCitationData.datePublished.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <div id="submitFormDiv">
                        <a class="button is-primary" @click="citationStarted = !citationStarted">Done Editing</a>
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

@Component({
  components: {
  },
  data () {
      return {
        citationStarted: false,
        contributorTypes: ["Director", "Actor"],
        filmCitationData: new FilmCitation([{first: "", middle: "", last: "", type: "Director"}], null, null, {}),
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
                body: {"title": this.filmTitle, "format": "movie", "ID": this.$data.selectedFilm.id},
                json: true
                //@ts-ignore
            }).then(filmCitationData => {
                console.log(filmCitationData)
                this.$data.citationStarted = true
                //@ts-ignore
            }).catch(error => {
                console.log(error)
                this.$data.citationStarted = true
            })
        }
      }
  }
})
export default class EditFilm extends Vue {
}
</script>

<style scoped lang="scss">
#filmInputField {
    justify-content: center;
    display: inline-flex;
}
#editFormTitle {
    color: #005eea;
}
#editFilm {
    padding: 10px;
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