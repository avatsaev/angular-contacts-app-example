import * as fromContacts from './contacts-reducer';
import * as fromContactActions from './contacts-actions'

describe('Contacts reducer', () => {

  let initState: fromContacts.ContactsState;

  beforeEach(() => {
    initState = {
      contactList: [
        {
          id: 0,
          name: 'Name',
          phone: '555555',
          email: 'test@test.ru'
        },
        {
          id: 1,
          name: 'Name',
          phone: '0000000',
          email: 'test1@test.com'
        }

      ],
      currentContact: undefined
    };

  });


  it('should be created', () => {

    const newState = fromContacts.reducer(initState,
        new fromContactActions.CreateSuccess({
          id: 3,
          name: 'John Doe',
          phone: '555-555-551',
          email: 'test3@test.com'
        })
    );
    expect(newState.contactList.length).toEqual(3);
  });
});
