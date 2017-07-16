import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';



@Injectable()
export class ContactsService {

  constructor(private http: Http ) { }


  index(): Observable<Contact[]> {
    return this.http
        .get(`${environment.appApi.baseUrl}/contacts`)
        .map(res => res.json());
  }

  show(conactId: number): Observable<Contact> {
    return this.http
        .get(`${environment.appApi.baseUrl}/contacts/${conactId}`)
        .map(res => res.json());
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post(`${environment.appApi.baseUrl}/contacts`, contact)
        .map(res => res.json())
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch(`${environment.appApi.baseUrl}/contacts/${contact.id}`, contact)
        .map(res => res.json())
  }


  destroy(contact: Contact): Observable<Contact> {
    return this.http.delete(`${environment.appApi.baseUrl}/contacts/${contact.id}`)
        .map( _ => contact);
  }

}
