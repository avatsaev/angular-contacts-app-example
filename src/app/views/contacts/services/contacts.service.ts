import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Contact, ResponseList} from '@app/core/models';
import {environment} from '@app/env';


@Injectable()
export class ContactsService {

  constructor(private http: HttpClient ) { }


  index(): Observable<ResponseList<Contact>> {
    return this.http
        .get<ResponseList<Contact>>(`${environment.appApi.baseUrl}/api/users`);
  }

  show(conactId: number): Observable<Contact> {
    return this.http
        .get<Contact>(`${environment.appApi.baseUrl}/api/users/${conactId}`);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.appApi.baseUrl}/api/users`, contact);
  }

  update(contact: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${environment.appApi.baseUrl}/api/users/${contact.id}`, contact);
  }


  destroy(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${environment.appApi.baseUrl}/api/users/${id}`);
  }

}
