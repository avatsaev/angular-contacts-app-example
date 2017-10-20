import { Contact } from '@app-core/models';
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import {createSelector} from '@ngrx/store';
import {EntityState, createEntityAdapter} from '@ngrx/entity';


const contactsAdapter = createEntityAdapter<Contact>();

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects
export interface State extends EntityState<Contact>{
  currentContactId?: number
}

export const INIT_STATE: State = {
  ...contactsAdapter.getInitialState(),
  currentContactId: undefined
} as State;



export function reducer(state: State = INIT_STATE, action) {

  switch (action.type) {

    case contactsActions.SET_CURRENT_CONTACT_ID : {
      return {...state, currentContactId: action.id}
    }


    case contactsActions.LOAD_ALL_SUCCESS : {
      return {...state, ...contactsAdapter.addAll(action.contacts, state)}
    }

    case contactsActions.LOAD_SUCCESS || contactsActions.CREATE_SUCCESS : {
      return {...state, ...contactsAdapter.addOne(action.contact, state)}
    }

    case contactsActions.UPDATE_SUCCESS : {
      return {
        ...state,
        ...contactsAdapter.updateOne({
          id: action.id,
          changes: action.changes
        }, state)
      }
    }

    case contactsActions.DELETE_SUCCESS : {
      return {...state, ...contactsAdapter.removeOne(action.id, state)}
    }

    default: {
      return state;
    }

  }
}


export const {
  selectEntities,
  selectAll,
} = contactsAdapter.getSelectors();

export const getCurrentContactId = (state: State): number => state.currentContactId;

export const getCurrentContact = createSelector(
  selectEntities,
  getCurrentContactId,
  (entities: { [id: number]: Contact}, id: number) => entities[id]
);


