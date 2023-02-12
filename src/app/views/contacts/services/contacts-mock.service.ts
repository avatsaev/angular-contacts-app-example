import { Observable, of } from 'rxjs';
import { Contact } from '@app/core/models';


export class ContactsServiceMock {

  contacts = [{
    id: 1,
    first_name: 'john',
    last_name: 'doe',
    email: 'john@gmail.com'
  }, {
    id: 2,
    first_name: 'adam',
    last_name: 'eve',
    email: 'adam@gmail.com'
  }];

  index(): Observable<Contact[]> {
   return of(this.contacts);
  }

  show(conactId: number): Observable<Contact> {
    return of({
      id: 1,
      first_name: 'john',
      last_name: 'doe',
      email: 'test@avatsaev.com',
      avatar: ''
    });
  }

  create(contact: Contact) {
    return of({
      id: 4,
      first_name: 'john',
      last_name: 'doe',
      email: 'john@gmail.com'
    });
  }

  destroy(id: number): Observable<number> {
    return of(1);
  }

  update(contact: Contact): Observable<Contact> {
    return of(contact);
  }

}
