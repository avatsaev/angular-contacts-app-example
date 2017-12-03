import {Action} from '@ngrx/store';
import { Contact } from '@app-core/models';
import {Update} from '@ngrx/entity/src/models';


export const LOAD_ALL = '[Contacts] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Contacts] LOAD ALL SUCCESS';

export const LOAD = '[Contacts] LOAD';
export const LOAD_SUCCESS = '[Contacts] LOAD SUCCESS';

export const CREATE = '[Contacts] CREATE';
export const CREATE_SUCCESS = '[Contacts] CREATE SUCCESS';

export const PATCH = '[Contacts] PATCH';
export const PATCH_SUCCESS = '[Contacts] PATCH SUCCESS';

export const DELETE = '[Contacts] DELETE';
export const DELETE_SUCCESS = '[Contacts] DELETE SUCCESS';

export const FAILURE = '[Contacts] FAILURE';

export const SET_CURRENT_CONTACT_ID = '[Contacts] SET CURRENT CONTACT ID';

export class SetCurrentContactId implements Action {
  readonly type = SET_CURRENT_CONTACT_ID;
  constructor(public payload: number) {}
}

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  constructor(public payload = null) {}
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: number) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Contact) {}
}


export class Patch implements Action {
  readonly type = PATCH;
  constructor(public payload: Contact) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Contact[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Contact) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Contact) {}
}

export class PatchSuccess implements Action {
  readonly type = PATCH_SUCCESS;
  constructor(public payload: Update<Contact>) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: number) {}
}

export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'CREATE' | 'PATCH', error: any}) {}
}

export type All =
    | SetCurrentContactId
    | LoadAll
    | Load
    | Create
    | Patch
    | Delete
    | LoadAllSuccess
    | LoadSuccess
    | PatchSuccess
    | CreateSuccess
    | DeleteSuccess
    | Failure
