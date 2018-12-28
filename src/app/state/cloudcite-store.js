import { observable, action, computed, decorate } from 'mobx';

class Store {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [{id: "Project-1", title: 'Project 1', citations: [{"id":"citation-0","type":"website","URL":"cloudcite.net","contributors":[{"given":"Naval","middle":"","family":"Patel","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago."}, {"id":"citation-1","type":"website","URL":"bugbrowser.net","contributors":[{"given":"Avi","middle":"","family":"Shah","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"Bug Browser solves problems","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"Bug Browser solves problems"}], style: {text: 'Modern Language Association 8th edition (MLA)', value: 'modern-language-association'}, favoriteStyles: [{"text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"text":"American Psychological Association 6th edition (APA)","value":"apa"},{"text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"text":"IEEE","value":"ieee"},{"text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"text":"American Medical Association (AMA)","value":"american-medical-association"},{"text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"text":"Vancouver","value":"vancouver"}]}];
        this.activeProjectId = JSON.parse(localStorage.getItem('activeProjectId')) || "Project-1";
        this.locale = JSON.parse(localStorage.getItem('locale')) || {"text": "English (US)", "value": "locales-en-US"};
        this.favoriteStyles = JSON.parse(localStorage.getItem('favoriteStyles')) || [{"text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"text":"American Psychological Association 6th edition (APA)","value":"apa"},{"text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"text":"IEEE","value":"ieee"},{"text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"text":"American Medical Association (AMA)","value":"american-medical-association"},{"text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"text":"Vancouver","value":"vancouver"}];
    }
    getProjects() {
        return this.projects;
    }
    getLocale() {
        return this.locale;
    }
    addProject(project) {
        if (this.projects.filter(element => element.id === project.id).length == 0) {
            this.projects = this.projects.concat([project]);
        }
    }
    removeProject(id) {
        this.projects = this.projects.filter(element => element.id !== id);
    }
    setActiveProject(id) {
        this.activeProjectId = id;
    }
    getActiveProject() {
        return this.projects.filter(element => element.id === this.activeProjectId)[0] || [];
    }
    changeLocale(locale) {
        this.locale = locale;
    }
    changeStyle(style) {
        let project = this.getActiveProject();
        project.style = style;
        let projects = this.projects.filter(element => element.id !== this.activeProjectId);
        this.projects = projects.concat([project]);
    }
    getFavoriteStyles() {
        return this.favoriteStyles;
    }
    addFavoriteStyle(style) {
        if (this.favoriteStyles.filter(element => element.value === style.value).length == 0) {
            this.favoriteStyles = this.favoriteStyles.concat([style]);
        }
    }
    removeFavoriteStyle(style) {
        this.favoriteStyles = this.favoriteStyles.filter(element => element.value !== style.value);
    }
    saveState() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('activeProjectId', this.activeProjectId);
        localStorage.setItem('locale', JSON.stringify(this.locale));
        localStorage.setItem('favoriteStyles', JSON.stringify(this.favoriteStyles));
    }
    resetState() {
        this.projects = [{id: "Project-1", title: 'Project 1', citations: [], style: {text: 'Modern Language Association 8th edition (MLA)', value: 'modern-language-association'}, favoriteStyles: [{"text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"text":"American Psychological Association 6th edition (APA)","value":"apa"},{"text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"text":"IEEE","value":"ieee"},{"text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"text":"American Medical Association (AMA)","value":"american-medical-association"},{"text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"text":"Vancouver","value":"vancouver"}]}];
        this.activeProjectId = "Project-1";
        this.locale = {"text": "English (US)", "value": "locales-en-US"};
        this.favoriteStyles = [{"text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"text":"American Psychological Association 6th edition (APA)","value":"apa"},{"text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"text":"IEEE","value":"ieee"},{"text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"text":"American Medical Association (AMA)","value":"american-medical-association"},{"text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"text":"Vancouver","value":"vancouver"}];
    }
}

decorate(Store, {
    getProjects: action,
    addProject: action,
    removeProject: action,
    getLocale: action,
    changeLocale: action,
    changeStyle: action,
    getFavoriteStyles: action,
    addFavoriteStyle: action,
    removeFavoriteStyle: action,
    saveState: action,
    resetState: action
});

const CloudCiteStore = new Store();
export { CloudCiteStore };