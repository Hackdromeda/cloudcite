<template>
  <div id="home">
    <div id="hero">
      <img src="/static/favicons/icon-150x150.png" alt="CloudCite is the best bibliography generator"/>
      <h1 id="welcomeText" class="title is-size-2">Welcome to CloudCite</h1>
      <h2 id="missionText" class="subtitle">CloudCite processes citations in the cloud so you never have to create citations manually again.</h2>
      <h3 id="descriptionText" class="subtitle is-size-6">CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago. Learn more about our commitment to a privacy and a distraction-free bibliography generation environment on our <a class="mission" href="/about/">about page</a>.</h3>
      <div class="container" id="cite">
        <div id="citeButtonsRow">
          <a class="button is-rounded" id="citeButton" @click="cite('Website')">Website</a>
          <a class="button is-rounded" id="citeButton">Journal</a>
          <a class="button is-rounded" id="citeButton" @click="cite('Book')">Book</a>
          <a class="button is-rounded" id="citeButton" @click="cite('Film')">Film/Movie</a>
          <a class="button is-rounded" id="citeButton">Digital Image</a>
          <a class="button is-rounded" id="citeButton">Podcast</a>
          <a class="button is-rounded" id="citeButton">Music</a>
        </div>
        <p class="control" style="margin-left: auto; margin-right: auto; width: 40%; margin-top: 40px;">
          <b-select v-if="!isSearchingForStyle" v-model="selectedStyleField" :placeholder="(this.$store.getters.getStyle == 'modern-language-association') ? 'Modern Language Association 8th edition': this.$store.getters.getStyle">
            <option @click="setStyleFromDropdown(style)" v-for="(style, i) in popularStyles" :value="style[Object.keys(style)[0]]" :key="i" v-cloak>
              {{ Object.keys(style)[0] }}
            </option>
          </b-select>
        </p>
        <b-autocomplete v-if="isSearchingForStyle" v-model="selectedStyleField" :data="styleData"  :loading="isFetchingStyle" @input="getAsyncData" @select="option => selectStyle(option)">
            <template slot-scope="props">
              <div class="media">
                <div class="media-content" v-cloak>
                    {{ props.option.title }}
                 </div>
              </div>
            </template>
          </b-autocomplete>
        <div class="box" id="formatSelectBox">
          <b-autocomplete v-model="formatTitle" size="is-large" ref="autocomplete" :data="filteredFormats" placeholder="I would like to cite..." @select="option => cite(option)" v-cloak>
            <template slot="empty">No results for {{formatTitle}}</template>
          </b-autocomplete>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';
//@ts-ignore
import debounce from 'lodash/debounce';

@Component({
  components: {},
  data () {
    return {
      formats: [
        "Website",
        "Journal",
        "Book",
        "Film",
        "Digital Image",
        "Podcast",
        "Music"
      ],
      formatTitle: '',
      selectedFormat: '',
      styleData: [],
      selectedStyleField: null,
      selectedStyle: 'modern-language-association',
      isFetchingStyle: false,
      isSearchingForStyle: false,
      popularStyles: [
        {
          "Modern Language Association 8th edition": "modern-language-association"
        },
        {
          "American Psychological Association 6th edition": "apa"
        },
        {
          "Turabian 8th edition (full note)": "turabian-fullnote-bibliography"
        },
        {
          "IEEE": "ieee"
        },
        {
          "Vancouver": "vancouver"
        },
        {
          "The University of Western Australia - Harvard": "the-university-of-western-australia-harvard"
        },
        {
          "DIN 1505-2 (numeric, sorted alphabetically, German)": "din-1505-2-numeric-alphabetical"
        },
        {
          "Chicago Manual of Style 17th edition (full note)": "chicago-fullnote-bibliography"
        },
        {
          "Search for Style": "SEARCH"
        }
      ]
    }
  },
  computed: {
    filteredFormats: {
      get() {
        return this.$data.formats.filter((option: any) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.$data.formatTitle.toLowerCase()) >= 0
        })
      }
    }
  },
  methods: {
    cite(option: string) {
      this.$data.selectedFormat = option
      this.$router.push({path: '/edit/format/' + option.toLowerCase() + '/'})
    },
    getAsyncData: debounce(function() {
      //@ts-ignore
        this.styleData = []
        //@ts-ignore
        this.isFetchingStyle = true
        //@ts-ignore
        rp({
            uri: 'https://api.cloudcite.net/style',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            //@ts-ignore
            body: {
              //@ts-ignore
              "search": this.$data.selectedStyleField
            },
            json: true
            //@ts-ignore
        }).then(data => {
          console.log(data)
                //@ts-ignore
                data.forEach((item) => this.styleData.push(item))
                //@ts-ignore
                this.$data.isFetchingStyle = false
            })
            //@ts-ignore
            .catch((error) => {
                //@ts-ignore
                this.$data.isFetchingStyle = false
                throw error
            })
    }, 500),
    setStyleFromDropdown(option: any) {
      if (option[Object.keys(option)[0]] != "SEARCH") {
        this.$store.dispatch('setStyle', option[Object.keys(option)[0]])
        this.$data.isFetchingStyle = false
      } else {
        this.$data.isSearchingForStyle = true
      }
    },
    selectStyle(styleOption: any) {
      if (styleOption.dependent == 0) {
        this.$data.selectedStyle = styleOption.name
        this.$store.dispatch('setStyle', this.$data.selectedStyle)
        this.$data.selectedStyleField = null
        this.$data.isSearchingForStyle = false
      } else {
        this.$data.selectedStyle = 'dependent/' + styleOption.filename
        this.$store.dispatch('setStyle', this.$data.selectedStyle)
        this.$data.selectedStyleField = null
        this.$data.isSearchingForStyle = false
      }
    }
  }
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  #home {
    text-align: center;
    color: #fff;
  }

  #welcomeText {
    color: #fff;
    padding: 0 5%;
  }

  #missionText {
    color: #fff;
    padding: 0 10%;
  }

  #descriptionText {
    color: #fff;
    padding: 0 15%;
  }

  .mission {
    color: #fff;
  }

  #websiteSection {
    background-color: #fff;
    height: 100vh;
    padding: 5%;
  }

  #formatSelectBox {
    display: inline-flex;
    justify-content: center;
    margin: 20px;
    padding: 0;
  }

  @media (max-width: 991.97px) {
    #cite {
      text-align: center;
    }
    #hero {
      padding-bottom: 25px;
      height: 130vh;
    }
    #citeButtonsRow {
      justify-content: left;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
    }
    #citeButton {
      margin: 3px;
      padding: 10px;
      color: #fff;
      font-weight: 500;
      border-color: #006DFC;
      background-color: #006DFC;
    }
    #citeButton:hover {
      opacity: 0.9;
    }
    #websiteInput {
      width: 70%;
    }
  }

  @media (min-width: 991.98px) {
    #cite {
      text-align: center;
    }
    #hero {
      padding-bottom: 25px;
      height: 100vh;
    }
    #citeButtonsRow {
      justify-content: center;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
    }
    #citeButton {
      margin: 10px;
      padding: 10px;
      color: #fff;
      font-weight: 500;
      border-color: #006DFC;
      background-color: #006DFC;
    }
    #citeButton:hover {
      opacity: 0.9;
    }
    #websiteInput {
      width: 50%;
    }
  }
</style>
