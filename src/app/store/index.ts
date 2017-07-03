import {ActionReducer, combineReducers} from '@ngrx/store';

import { createSelector } from 'reselect';

import * as fromContacts from './contacts-reducer';



export interface ApplicationState {
  contacts: fromContacts.ContactsState
}

const reducers = {
  contacts: fromContacts.reducer
};

export const APPLICATION_REDUCER: ActionReducer<ApplicationState> = combineReducers(reducers);


export function reducer(state: any, action: any): ApplicationState {
  return APPLICATION_REDUCER(state, action);
}


/// selectors

export const getContactsState = (state: ApplicationState): fromContacts.ContactsState => {
  return state.contacts;
};


export const getCurrentContact = createSelector(getContactsState, fromContacts.getCurrentContact);
export const getAllContacts =  createSelector(getContactsState, fromContacts.getAll);




