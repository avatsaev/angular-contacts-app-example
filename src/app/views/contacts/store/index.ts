import * as fromContacts from './reducers/contacts-reducer'
import * as fromApp from '../../../store'
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ContactsState {
  contacts: fromContacts.State
}

export interface State extends fromApp.State {
  'contacts': ContactsState
}

export const reducers = {
  contacts: fromContacts.reducer
};


export const getContactsRootState = createFeatureSelector<ContactsState>('contacts');

export const getContactsState = createSelector(
    getContactsRootState,
    (state: ContactsState) => state.contacts
);


export const getAllContacts = createSelector(
    getContactsState,
    fromContacts.getAllContacts
);

export const getCurrentContact = createSelector(
    getContactsState,
    fromContacts.getCurrentContact
);
