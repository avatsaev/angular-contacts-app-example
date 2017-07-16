import * as uiActions from './ui-actions';

export interface UiState {
  currentContactId: number
}

export const INIT_UI_STATE: UiState = {
  currentContactId: undefined
};


export function reducer(state: UiState = INIT_UI_STATE, {type, payload}: uiActions.All): UiState {

  switch (type) {

    case uiActions.SET_CURRENT_CONTACT_ID : {
      return Object.assign({}, state, {currentContactId: payload})
    }

    default : {
      return state;
    }
  }
}



// SELECTORS
export const getCurrentContactId = (state: UiState) => state.currentContactId;
