import { Contact } from '@app/core/models';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {
  createSuccess,
  loadAllSuccess,
  loadSuccess, removeSuccess,
  updateSuccess
} from '@app/contacts-store/contacts-actions';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const contactsAdapter = createEntityAdapter<Contact>({
  selectId: (contact: Contact) => contact.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[] | number[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends EntityState<Contact> {
  // additional props here
}

export const INIT_STATE: State = contactsAdapter.getInitialState({
  // additional props default values here
});

export const reducer = createReducer<State>(
  INIT_STATE,
  on(loadAllSuccess, (state, {contacts}) =>
    contactsAdapter.addAll(contacts, state)
  ),
  on(loadSuccess, (state, {contact: contact}) =>
    contactsAdapter.upsertOne(contact, state)
  ),
  on(createSuccess, (state, {contact: contact}) =>
    contactsAdapter.addOne(contact, state)
  ),
  on(updateSuccess, (state, {contact: contact}) =>
    contactsAdapter.updateOne({id: contact.id, changes: contact}, state)
  ),
  on(removeSuccess, (state, {id: id}) =>
    contactsAdapter.removeOne(id, state)
  )
);

export const getContactById = (id: number) => (state: State) => state.entities[id];
