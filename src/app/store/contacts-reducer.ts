import {Contact} from '../models/contact';
import * as fromContacts from './contacts-actions';
import * as _ from 'lodash';

export interface ContactsState {
  contactList: Contact[];
}

export const INIT_CONTACTS_STATE: ContactsState = {
  contactList: [],
};

export function reducer(state: ContactsState = INIT_CONTACTS_STATE, action: fromContacts.All) {

  switch (action.type) {

    case fromContacts.LOAD_ALL_SUCCESS : {
      return Object.assign(
        {},
        state,
        {contactList: action.payload}
      )
    }

    case fromContacts.LOAD_SUCCESS : {
      return handleContactLoad(state, action.payload)
    }

    case fromContacts.CREATE_SUCCESS : {
      return handleContactCreate(state, action.payload);
    }

    case fromContacts.UPDATE_SUCCESS : {
      return handleContactUpdate(state, action.payload);
    }

    case fromContacts.DELETE_SUCCESS : {
      return handleContactDelete(state, action.payload);
    }

    default: {
      return state;
    }

  }
}


// Action Handlers (all handlers must be pure functions)


function handleContactLoad(state: ContactsState, payload: Contact): ContactsState {

  const newState = Object.assign({}, state);
  newState.contactList = _.unionBy([payload], newState.contactList);

  return newState; // return new contacts state without modifying the input
}

function handleContactCreate(state: ContactsState, payload: Contact): ContactsState {
  const newState = Object.assign({}, state); // Clone original state
  newState.contactList.push(payload);
  return newState; // return new state without modifying the input
}


function handleContactUpdate(state: ContactsState, payload: Contact): ContactsState {

  const newState = Object.assign({}, state);
  newState.contactList = _.unionBy([payload], newState.contactList, 'id');

  return newState;

}


function handleContactDelete(state: ContactsState, payload: Contact ): ContactsState {
  const newState = Object.assign({}, state);
  newState.contactList = newState.contactList.filter( c => c.id !== payload.id);
  return newState; // return new state without the deleted contact
}


// SELECTORS (all selectors must be pure functions)


// get contact by id
export const getContact = (state: ContactsState, id: number): Contact => _.find(state.contactList, {id});
export const getAll = (state: ContactsState): Contact[] => state.contactList;

///--------------------
