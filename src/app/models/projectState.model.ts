import { Project } from './project.model'
import { Style } from './style.model';
import { Locale } from './locale.model';

export interface State {
    selectedProject: string,
    locale: Locale
    projects: Project[],
    editingCitation?: any,
    favoriteStyles: Style[],
    message?: {
        type?: any,
        description?: any
    }
}