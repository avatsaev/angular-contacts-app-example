import * as fromContacts from './contacts-reducer';
import * as fromRoot from '@app/root-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ContactsState {
  contacts: fromContacts.State;
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  contacts: ContactsState;
}

export const reducers = {
  contacts: fromContacts.reducer
};


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getContactsState = createFeatureSelector<State, ContactsState>('contacts');

export const getContactsEntitiesState = createSelector(
  getContactsState,
  state => state.contacts
);

export const getSelectedContactId = createSelector(
  getContactsEntitiesState,
  fromContacts.getCurrentContactId
);

export const {
  selectAll: getAllContacts,
  selectEntities: getContactEntities
} = fromContacts.contactsAdapter.getSelectors(getContactsEntitiesState);

export const getCurrentContact = createSelector(
  getContactEntities,
  getSelectedContactId,
  (entities, id) => id && entities[id]
);
