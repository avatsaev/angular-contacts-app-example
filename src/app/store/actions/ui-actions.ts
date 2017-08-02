import {Action} from '@ngrx/store';


export const SET_CURRENT_TITLE = '[UI] Set Current TITLE';

export class SetCurrentTitle implements Action {
  readonly type = SET_CURRENT_TITLE;


  constructor(public payload?: string) {}
}

export type All = SetCurrentTitle;
