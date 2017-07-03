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

    case fromContacts.SET_CURRENT : {
      const contact = getContact(state, action.payload.id);
      return Object.assign({}, state, {currentContact: contact});
    }

    default: {
      return state;
    }

  }
}


// Action Handlers (all handlers must be pure functions)


function handleContactLoad(state: ContactsState, payload: Contact): ContactsState {

  const newState = handleContactUpdate(state, payload); // just in case if contact is already present in the list
  newState.currentContact = getContact(newState, payload.id); // set current contact
  return newState; // return new contacts state without modifying the input
}

function handleContactCreate(state: ContactsState, payload: Contact): ContactsState {
  const newState = Object.assign({}, state); // Clone original state
  newState.contactList.push(payload);
  return newState; // return new state without modifying the input
}


function handleContactUpdate(state: ContactsState, payload: Contact): ContactsState {

  const newState = Object.assign({}, state);

  const contact = getContact(newState, payload.id);

  const index = newState.contactList.indexOf(contact);

  if (index > -1) { // if contact exists in the list, update the value at the index
    newState.contactList[index] = payload;
  } else { // otherwise just push it to the array
    newState.contactList.push(payload);
  }

  return newState;

}


function handleContactDelete(state: ContactsState, payload: Contact ): ContactsState {
  const newState = Object.assign({}, state);

  newState.contactList = newState.contactList.filter( c => c.id !== payload.id);

  return newState; // return new state without the deleted contact
}


// SELECTORS (all selectors must be pure functions)


// get contact by id
export const getContact = (state: ContactsState, contactId: number): Contact => state.contactList.filter( c => c.id === contactId)[0];

export const  getAll = (state: ContactsState): Contact[] => state.contactList;

export const getCurrentContact = (state: ContactsState): Contact => state.currentContact;

///--------------------
