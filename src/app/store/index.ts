import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromContacts from './contacts-reducer';
import * as fromUi from './ui-reducer';

export interface ApplicationState {
  contacts: fromContacts.ContactsState
  ui: fromUi.UiState
  // more state here
}

export const reducers: ActionReducerMap<ApplicationState> = {
  contacts: fromContacts.reducer,
  ui: fromUi.reducer
  // more reducers here
};


/// selectors

// Contacts state main selector
export const getContactsState = createFeatureSelector<fromContacts.ContactsState>('contacts');
export const getUiState = createFeatureSelector<fromUi.UiState>('ui');


// createSelector from Reselect library:
// - Selectors can compute derived data, allowing Redux to store the minimal possible state.
// - Selectors are efficient. A selector is not recomputed unless one of its arguments change.
// - Selectors are composable. They can be used as input to other selectors.
export const getCurrentContact = (state: ApplicationState) => fromContacts.getContactById(state.contacts, state.ui.currentContactId);
export const getAllContacts =  createSelector(getContactsState, fromContacts.getAll);
export const getCurrentContactID = createSelector(getUiState, fromUi.getCurrentContactId);





