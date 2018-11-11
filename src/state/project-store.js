import { observable, action, computed, decorate } from 'mobx';

class Store {
    constructor() {
        this.projectLocale = JSON.parse(localStorage.getItem('projectLocale')) || {"text": "English (US)","value": "locales-en-US"};
        this.favoriteStyles = JSON.parse(localStorage.getItem('favoriteStyles')) || [{"text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"text":"American Psychological Association 6th edition (APA)","value":"apa"},{"text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"text":"IEEE","value":"ieee"},{"text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"text":"American Medical Association (AMA)","value":"american-medical-association"},{"text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"text":"Vancouver","value":"vancouver"}];
        this.projects = JSON.parse(localStorage.getItem('projects')) || [{
            "id": "Project-0",
            "title": "Project 1",
            "citations": [{"id":"citation-0","type":"website","URL":"cloudcite.net","contributors":[{"given":"Naval","middle":"","family":"Patel","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago."}, {"id":"citation-1","type":"website","URL":"bugbrowser.net","contributors":[{"given":"Avi","middle":"","family":"Shah","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"Bug Browser solves problems","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"Bug Browser solves problems"}],
            "style": {
              "key":"modern-language-association",
              "text":"Modern Language Association 8th edition (MLA)",
              "value":"modern-language-association"
            },
        }];
        this.selectedProject = JSON.parse(localStorage.getItem('selectedProject')) || 0;
    }
    get locale() {
        return this.projectLocale;
    }
    set locale(value) {
        this.projectLocale = value;
        localStorage.setItem('projectLocale', JSON.stringify(this.projectLocale));
    }
    get style() {
        return this.projects[this.selectedProject].style;
    }
    set style(value) {
        this.projects[this.selectedProject].style = value;
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }
    get selected() {
        return this.selectedProject;
    }
    set selected(index) {
        this.selectedProject = index;
        localStorage.setItem('selectedProject', this.selectedProject);
    }
    get project() {
        return this.projects[this.selectedProject];
    }
    set project(value) {
        this.projects[this.selectedProject] = value;
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }
    addFavoriteStyle(style) {
        if (this.favoriteStyles.filter(element => element.value === style.value).length == 0) {
            this.favoriteStyles.push(style);
            localStorage.setItem('favoriteStyles', JSON.stringify(this.favoriteStyles));
        }
    }
    removeFavoriteStyle(style) {
        this.favoriteStyles = this.favoriteStyles.filter(element => element.value !== style.value);
        localStorage.setItem('favoriteStyles', JSON.stringify(this.favoriteStyles));
    }
    addProject(project) {
        if (this.projects.filter(element => element.id === project.id).length == 0) {
            this.projects.push(project);
        }
    }
    removeProject(project) {
        this.projects = this.projects.filter(element => element.id !== project.id);
    }
    saveToLocalStorage() {
        localStorage.setItem('projectLocale', JSON.stringify(this.projectLocale));
        localStorage.setItem('favoriteStyles', JSON.stringify(this.favoriteStyles));
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('selectedProject', this.selectedProject);
    }
}

decorate(Store, {
    favoriteStyles: observable,
    locale: computed,
    style: computed,
    selected: computed,
    project: computed,
    addFavoriteStyle: action,
    removeFavoriteStyle: action,
    addProject: action,
    removeProject: action
});

const ProjectStore = new Store();
export { ProjectStore };