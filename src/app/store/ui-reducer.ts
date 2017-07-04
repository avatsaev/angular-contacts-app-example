


import {Contact} from '../models/contact';

import * as uiActions from './ui-actions';

export interface UiState {
  currentContact?: Contact
}

export const INIT_UI_STATE: UiState = {
  currentContact: undefined
};


export function reducer(state: UiState = INIT_UI_STATE, {type, payload}: uiActions.All): UiState {

  switch (type) {

    case uiActions.SET_CURRENT_CONTACT : {
      return Object.assign({}, state, {currentContact: payload})
    }

    default : {
      return state;
    }
  }
}



// SELECTORS


export const getCurrentContact = (state: UiState) => state.currentContact;

