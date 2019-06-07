import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui-reducer';

export interface State {
  ui: fromUi.UiState;
  // more state here
}

// AOT compatibility
export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    ui: fromUi.reducer
  })(state, action)
}

/// selectors
export const getUiState = createFeatureSelector<fromUi.UiState>('ui');

export const getCurrentTitle = createSelector(getUiState, fromUi.getCurrentTitle);





