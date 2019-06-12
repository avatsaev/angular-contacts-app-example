import {Action, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui-reducer';
import {InjectionToken} from '@angular/core';

export interface State {
  ui: fromUi.UiState;
  // more state here
}

// AOT compatibility
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'ROOT_REDUCERS_TOKEN',
  {
    factory: () => ({
      ui: fromUi.reducer
    })
  }
);

/// selectors
export const getUiState = createFeatureSelector<fromUi.UiState>('ui');

export const getCurrentTitle = createSelector(getUiState, fromUi.getCurrentTitle);





