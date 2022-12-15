import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Contact} from '@app/core/models';
import {environment} from '@app/env';
import {map} from 'rxjs/operators';


@Injectable()
export class ContactsService {

  constructor(private http: HttpClient ) { }


  index(): Observable<Contact[]> {
    return this.http
        .get<any>(`${environment.appApi.baseUrl}/users?page=2`).pipe(
          map( val => val.data)
      );
  }

  show(conactId: number): Observable<Contact> {
    return this.http
        .get<Contact>(`${environment.appApi.baseUrl}/users/${conactId}`);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.appApi.baseUrl}/register`, contact);
  }

  update(contact: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${environment.appApi.baseUrl}/users/${contact.id}`, contact);
  }


  destroy(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${environment.appApi.baseUrl}/users/${id}`);
  }

}
