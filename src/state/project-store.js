import { observable, action, computed, decorate } from 'mobx';

class Store {
    constructor() {
        this.projectLocale = {"text": "English (US)","value": "locales-en-US"};
        this.favoriteStyles =  [{"text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"text":"American Psychological Association 6th edition (APA)","value":"apa"},{"text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"text":"IEEE","value":"ieee"},{"text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"text":"American Medical Association (AMA)","value":"american-medical-association"},{"text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"text":"Vancouver","value":"vancouver"}];
        this.projects = [{
            "id": "Project-0",
            "title": "Project 1",
            "citations": [],
            "style": {
              "key":"modern-language-association",
              "text":"Modern Language Association 8th edition (MLA)",
              "value":"modern-language-association"
            },
        }];
        this.selectedProject = 0;
    }
    get locale() {
        return this.projectLocale;
    }
    set locale(value) {
        this.projectLocale = value;
    }
    get style() {
        return this.projects[this.selectedProject].style;
    }
    set style(value) {
        this.projects[this.selectedProject].style = value;
    }
    get selected() {
        return this.selectedProject;
    }
    set selected(index) {
        this.selectedProject = index;
    }
    get project() {
        return this.projects[this.selectedProject];
    }
    set project(value) {
        this.projects[this.selectedProject] = value;
    }
    addFavoriteStyle(style) {
        if (this.favoriteStyles.filter(element => element.value === style.value).length == 0) {
            this.favoriteStyles.push(style);
        }
    }
    removeFavoriteStyle(style) {
        this.favoriteStyles = this.favoriteStyles.filter(element => element.value !== style.value);
    }
    addProject(project) {
        if (this.projects.filter(element => element.id !== project.id).length == 0) {
            this.projects.push(project);
        }
    }
    removeProject(project) {
        this.projects = this.projects.filter(element => element.id !== project.id);
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
export default ProjectStore;