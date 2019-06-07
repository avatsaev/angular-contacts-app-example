import {createAction, props} from '@ngrx/store';
import { Contact } from '@app/core/models';

export const loadAll = createAction(
  '[Contacts] Load all'
);

export const load = createAction(
  '[Contacts] Load',
  props<{payload: number}>()
);

export const create = createAction(
  '[Contacts] Create',
  props<{payload: Contact}>()
);

export const update = createAction(
  '[Contacts] Update',
  props<{payload: Partial<Contact>}>()
);

export const remove = createAction(
  '[Contacts] Remove',
  props<{payload: number}>()
);

export const loadAllSuccess = createAction(
  '[Contacts] Load all success',
  props<{payload: Contact[]}>()
);

export const loadSuccess = createAction(
  '[Contacts] Load success',
  props<{payload: Contact}>()
);

export const createSuccess = createAction(
  '[Contacts] Create success',
  props<{payload: Contact}>()
);

export const updateSuccess = createAction(
  '[Contacts] Update success',
  props<{payload: Partial<Contact>}>()
);


export const removeSuccess = createAction(
  '[Contacts] Remove success',
  props<{payload: number}>()
);


export const failure = createAction(
  '[Contacts] Failure',
  props<{payload: {concern: 'CREATE' | 'PATCH', error: any}}>()
);
