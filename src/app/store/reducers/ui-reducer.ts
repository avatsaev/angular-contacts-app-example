import {createReducer, on} from '@ngrx/store';
import {setCurrentTitle} from '@app/root-store/actions/ui-actions';
import {setState} from '@app/core/helpers/ngrx.helpers';

export interface UiState {
  currentTitle: string;
}

export const INIT_UI_STATE: UiState = {
  currentTitle: undefined
};

export const reducer = createReducer(
  INIT_UI_STATE,
  on(setCurrentTitle, (state, {payload: currentTitle}) =>
    setState({currentTitle}, state)
  )
);


// SELECTORS
export const getCurrentTitle = (state: UiState) => state ? state.currentTitle : null;
