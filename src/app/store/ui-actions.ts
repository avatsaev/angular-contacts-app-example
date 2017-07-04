



import {Action} from '@ngrx/store';
import {Contact} from '../models/contact';

export const SET_CURRENT_CONTACT = '[UI] Set Current Contact';

export class SetCurrentContact implements Action {
  readonly type = SET_CURRENT_CONTACT;


  constructor(public payload?: Contact) {}
}

export type All = SetCurrentContact;
