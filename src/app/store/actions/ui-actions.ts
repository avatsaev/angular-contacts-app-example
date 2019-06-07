import {createAction, props} from '@ngrx/store';

export const setCurrentTitle = createAction(
  '[UI] Set current title',
  props<{payload: string}>()
);
