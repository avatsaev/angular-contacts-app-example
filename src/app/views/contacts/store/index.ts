import * as fromContacts from './reducers/contacts-reducer'
import * as fromRoot from '@app-root-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ContactsState {
  contacts: fromContacts.State
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
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
    fromContacts.selectAll
);

export const getCurrentContact = createSelector(
    getContactsState,
    fromContacts.getCurrentContact
);
