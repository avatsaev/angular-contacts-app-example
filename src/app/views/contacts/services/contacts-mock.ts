import { Observable, of } from 'rxjs';
import { Contact } from '@app/core/models';


export class ContactsServiceMock {

  contacts = [{
    id: 1,
    name: 'john',
    email: 'john@gmail.com'
  }, {
    id: 2,
    name: 'adam',
    email: 'adam@gmail.com'
  }];

  index(): Observable<Contact[]> {
   return of(this.contacts);
  }

  show(conactId: number): Observable<Contact> {
    return of({
      id: 1,
      name: 'john',
      email: 'john@gmail.com'
    });
  }

  create(contact: Contact) {
    return of({
      id: 4,
      name: 'john doe',
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
