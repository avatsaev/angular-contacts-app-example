import * as fromContacts from './contacts-reducer';
import * as fromContactActions from './contacts-actions'



describe('Contacts reducer', () => {


  let initState: fromContacts.ContactsState;

  beforeEach(() => {
    // Initialize mock NgRedux and create a new instance of the
    // ActionCreatorService to be tested.
    initState = {
      contactList: [
        {
          id: 0,
          name: 're',
          phone: 'rr',
          email: 'test@test.ru'
        },
        {
          id: 1,
          name: 'reeee',
          phone: 'rrrrr',
          email: 'test@test.com'
        }

      ],
      currentContact: undefined
    };

  });


  it('should be created', () => {

    const newState = fromContacts.reducer(initState,
        new fromContactActions.CreateSuccess({
          id: 3,
          name: 'reeee',
          phone: 'rrrrr',
          email: 'test@test.com'
        })
    );
    expect(newState.contactList.length).toEqual(3);
  });
});
