import { Contact } from '@app-core/models';
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as _ from 'lodash';
import {createSelector} from '@ngrx/store';

export interface State {
  contactList: Contact[];
  currentContactId?: number
}

export const INIT_CONTACTS_STATE: State = {
  contactList: [],
  currentContactId: undefined
};

export function reducer(state: State = INIT_CONTACTS_STATE, action: contactsActions.All) {

  switch (action.type) {

    case contactsActions.SET_CURRENT_CONTACT_ID : {
      return Object.assign(
            {},
            state,
            {currentContactId: action.id}
          )
    }


    case contactsActions.LOAD_ALL_SUCCESS : {
      return Object.assign(
        {},
        state,
        {contactList: action}
      )
    }

    case contactsActions.LOAD_SUCCESS : {
      return handleContactLoad(state, action.contacts)
    }

    case contactsActions.CREATE_SUCCESS : {
      return handleContactCreate(state, action.payload);
    }

    case contactsActions.UPDATE_SUCCESS : {
      return handleContactUpdate(state, action.payload);
    }

    case contactsActions.DELETE_SUCCESS : {
      return handleContactDelete(state, action.payload);
    }

    default: {
      return state;
    }

  }
}


// Action Handlers (all handlers must be pure functions)


function handleContactLoad(state: State, payload: Contact): State {

  const newState = Object.assign({}, state);
  newState.contactList = _.unionBy([payload], newState.contactList, 'id');

  return newState; // return new contacts state without modifying the input
}

function handleContactCreate(state: State, payload: Contact): State {
  const newState = Object.assign({}, state); // Clone original state
  newState.contactList = _.unionBy([payload], newState.contactList, 'id');
  return newState; // return new state without modifying the input
}


function handleContactUpdate(state: State, payload: Contact): State {

  const newState = Object.assign({}, state);
  newState.contactList = _.unionBy([payload], newState.contactList, 'id');

  return newState;

}


function handleContactDelete(state: State, payload: Contact ): State {
  const newState = Object.assign({}, state);
  newState.contactList = newState.contactList.filter( c => c.id !== payload.id);
  return newState; // return new state without the deleted id
}


// SELECTORS (all selectors must be pure functions)

export const getCurrentContactId = (state: State): number => state.currentContactId;
export const getAllContacts = (state: State): Contact[] => state.contactList;
export const getContactById = (contacts: Contact[], id: number): Contact => _.find(contacts, {id});
export const getCurrentContact = createSelector(getAllContacts, getCurrentContactId, getContactById);
