import {Action} from '@ngrx/store';


export const SET_CURRENT_CONTACT_ID = '[UI] Set Current Contact ID';

export class SetCurrentContactId implements Action {
  readonly type = SET_CURRENT_CONTACT_ID;


  constructor(public payload?: number) {}
}

export type All = SetCurrentContactId;
