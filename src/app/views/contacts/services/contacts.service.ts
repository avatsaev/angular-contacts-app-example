import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Contact, ResponseList, Response} from '@app/core/models';
import {environment} from '@app/env';


@Injectable()
export class ContactsService {

  constructor(private http: HttpClient ) { }


  index(page: number = 1): Observable<ResponseList<Contact>> {
    return this.http
        .get<ResponseList<Contact>>(`${environment.appApi.baseUrl}/api/users?page=${page}`);
  }

  show(contactId: number): Observable<Response<Contact>> {
    return this.http
        .get<Response<Contact>>(`${environment.appApi.baseUrl}/api/users/${contactId}`);
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
