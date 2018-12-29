import { Action } from '@ngrx/store';
import { Project } from '../models/project.model';
import { Style } from '../models/style.model';
import { Locale } from '../models/locale.model';

export const CREATE_PROJECT = '[Projects Component] Create';
export const SELECT_PROJECT = '[Projects Component] Select';
export const DELETE_PROJECT = '[Projects Component] Delete';
export const EDIT_PROJECT = '[Projects Component] Edit';
export const RESET_PROJECTS = '[Projects Component] Reset';
export const SET_STYLE = '[StyleSelect Component] SetStyle';
export const SET_LOCALE = '[LocaleSelect Component SetLocale';
export const ADD_FAVORITE_STYLE = '[StylesList Component] AddFavoriteStyle';
export const REMOVE_FAVORITE_STYLE = '[StylesList Component] RemoveFavoriteStyle';

 
export class CreateProject implements Action {
  readonly type = CREATE_PROJECT;
  constructor(public payload: Project) {}
}

export class SelectProject implements Action {
  readonly type = SELECT_PROJECT;
  constructor(public payload: string) {}
}
 
export class DeleteProject implements Action {
  readonly type = DELETE_PROJECT;
  constructor(public payload: string) {}
}

export class EditProject implements Action {
    readonly type = EDIT_PROJECT;
    constructor(public payload: string) {}
  }
 
export class ResetProjects implements Action {
  readonly type = RESET_PROJECTS;
  constructor(public payload: string) {}
}

export class SetStyle implements Action {
  readonly type = SET_STYLE;
  constructor(public id: string, public style: Style) {}
}

export class SetLocale implements Action {
  readonly type = SET_LOCALE;
  constructor(public payload: Locale) {}
}

export class AddFavoriteStyle implements Action {
  readonly type = ADD_FAVORITE_STYLE;
  constructor(public payload: Style) {}
}

export class RemoveFavoriteStyle implements Action {
  readonly type = REMOVE_FAVORITE_STYLE;
  constructor(public payload: Style) {}
}

export type Actions = CreateProject | SelectProject | DeleteProject | EditProject | ResetProjects | SetStyle | SetLocale | AddFavoriteStyle | RemoveFavoriteStyle;