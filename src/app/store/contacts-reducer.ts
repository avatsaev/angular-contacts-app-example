import {Contact} from '../models/contact';
import * as fromContacts from './contacts-actions';



export interface ContactsState {
  contactList: Contact[];
  currentContact?: Contact;
}

export const INIT_CONTACTS_STATE: ContactsState = {
  contactList: [],
  currentContact: undefined
};

export function reducer(state: ContactsState = INIT_CONTACTS_STATE, action: fromContacts.Actions) {

  switch (action.type) {

    case fromContacts.LOAD_ALL_SUCCESS : {
      return Object.assign(
        {},
        state,
        {contactList: action.payload}
      )
    }

    case fromContacts.LOAD_SUCCESS : {
      return handleContactUpdate(state, action.payload)
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

    case fromContacts.SET_CURRENT : {
      return Object.assign({}, state, {currentContact: action.payload});
    }

    default: {
      return state;
    }

  }
}


// Action Handlers

export function handleContactCreate(state: ContactsState, payload: Contact): ContactsState {
  const newState = Object.assign({}, state);
  newState.contactList.push(payload);
  return newState;
}


export function handleContactUpdate(state: ContactsState, payload: Contact): ContactsState {

  const newState = Object.assign({}, state);

  const contact = getContact(newState, payload.id);

  const index = newState.contactList.indexOf(contact);

  newState.contactList[index] = payload;

  return newState;

}


export function handleContactDelete(state: ContactsState, payload: Contact ): ContactsState {
  const newState = Object.assign({}, state);

  newState.contactList = newState.contactList.filter( c => c.id !== payload.id);

  return newState;
}


// SELECTORS

export const getContact = (state: ContactsState, contactId: number): Contact => {
  return state.contactList.filter( c => c.id === contactId)[0];
};

export const  getAll = (state: ContactsState): Contact[] => {
  return state.contactList
};

export const getCurrentContact = (state: ContactsState): Contact => {
  return state.currentContact;
};

///--------------------
