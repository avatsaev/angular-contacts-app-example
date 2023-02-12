import { Contact } from '@app/core/models';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {
  createSuccess,
  filterContacts,
  loadAllSuccess,
  loadSuccess, removeSuccess,
  updateSuccess, 
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
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  filter: string;
}

export const INIT_STATE: State = contactsAdapter.getInitialState({
  // additional props default values here
  page: 1,
  per_page: 6,
  total: 0,
  total_pages: 0,
  filter: ''
});

export const reducer = createReducer<State>(
  INIT_STATE,
  on(loadAllSuccess, (state, {response}) => {
    //extract metadata and contacts
    const {page, per_page, total , total_pages, data} = response;
    const s = {...state, page, per_page, total , total_pages};
    return contactsAdapter.addAll(data, s);
  }),
  on(loadSuccess, (state, {contact}) =>
    contactsAdapter.upsertOne(contact, state)
  ),
  on(createSuccess, (state, {contact}) =>
    contactsAdapter.addOne(contact, state)
  ),
  on(updateSuccess, (state, {contact}) =>
    contactsAdapter.updateOne({id: contact.id, changes: contact}, state)
  ),
  on(removeSuccess, (state, {id}) =>
    contactsAdapter.removeOne(id, state)
  ),
  on(filterContacts, (state, {filter}) => ({...state, filter}))
);

export const getContactById = (id: number) => (state: State) => state.entities[id];
