import * as uiActions from '../actions/ui-actions';

export interface UiState {
  currentTitle: string;
}

export const INIT_UI_STATE: UiState = {
  currentTitle: undefined
};


export function reducer(state: UiState = INIT_UI_STATE, {type, payload}: uiActions.All): UiState {

  switch (type) {

    case uiActions.SET_CURRENT_TITLE : {
      return Object.assign({}, state, {currentTitle: payload});
    }

    default : {
      return state;
    }
  }
}



// SELECTORS
export const getCurrentTitle = (state: UiState) => state.currentTitle;
