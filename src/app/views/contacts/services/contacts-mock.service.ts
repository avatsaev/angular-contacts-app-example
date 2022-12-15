import {Observable, of} from 'rxjs';
import {Contact} from '@app/core/models';


export class ContactsServiceMock {

  contacts = [{
    id: 1,
    first_name: 'john',
    last_name: '',
    email: 'john@gmail.com',
    avatar: ''
  }, {
    id: 2,
    first_name: 'adam',
    last_name: '',
    email: 'adam@gmail.com',
    avatar: ''
  }];

  index(): Observable<Contact[]> {
    return of(this.contacts);
  }

  show(conactId: number): Observable<Contact> {
    return of();
  }

  create(contact: Contact) {
    return of({
      id: 4,
      first_name: 'john doe',
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
