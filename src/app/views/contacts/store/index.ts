import * as fromContacts from './contacts-reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ContactsState {
  contacts: fromContacts.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: ContactsState | undefined, action: Action) {
  return combineReducers({
    contacts: fromContacts.reducer
  })(state, action)
}


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getContactsState = createFeatureSelector<ContactsState>('contacts');

export const getContactsEntitiesState = createSelector(
  getContactsState,
  state => state.contacts
);

export const {
  selectAll: getAllContacts,
} = fromContacts.contactsAdapter.getSelectors(getContactsEntitiesState);

export const getContactById = (id: number) => createSelector(
  getContactsEntitiesState,
  fromContacts.getContactById(id)
);

/** Get feature selector */
export const selectContactsState = createFeatureSelector<ContactsState>("contacts");

/** Get page infos */
export const selectContactsPageInfo = createSelector(
  selectContactsState,
  ({contacts}) => {
    const {page, per_page, total, total_pages} = contacts;
    return {page, per_page, total, total_pages};
  }
)

/** get current filter string */
export const selectContactsFilter = createSelector(
  selectContactsState,
  ({contacts}) => contacts.filter
)
