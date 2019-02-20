import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Contact } from '@app/core/models';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {

  constructor(private http: HttpClient ) { }


  index(): Observable<Contact[]> {
    return this.http
        .get<Contact[]>(`${environment.appApi.baseUrl}/contacts`);

  }

  show(conactId: number): Observable<Contact> {
    return this.http
        .get<Contact>(`${environment.appApi.baseUrl}/contacts/${conactId}`);

  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.appApi.baseUrl}/contacts`, contact);
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${environment.appApi.baseUrl}/contacts/${contact.id}`, contact);
  }


  destroy(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${environment.appApi.baseUrl}/contacts/${id}`);
  }

}
