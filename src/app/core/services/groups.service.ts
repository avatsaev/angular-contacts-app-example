import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Group} from '../models/group';
import {environment} from '../../../environments/environment';
import * as _ from 'lodash';

@Injectable()
export class GroupsService {

  constructor(private http: HttpClient ) { }


  // Basic endpoints

  index(): Observable<Group[]> {

    const params = new HttpParams().set(
        'filter',
        JSON.stringify({
          'include': {
            'relation': 'contacts',
            'scope': {
              'fields': ['id']
            }
          }
        })
    );

    return this.http
        .get<Group[]>(`${environment.appApi.baseUrl}/groups`, {params})
        .map(groups => groups.map(this._formatGroupContactIds));


  }

  show(groupId: number): Observable<Group> {

    const params = new HttpParams().set(
        'filter',
        JSON.stringify({
          'include': {
            'relation': 'contacts',
            'scope': {
              'fields': ['id']
            }
          }
        })
    );

    return this.http
        .get<Group>(`${environment.appApi.baseUrl}/groups/${groupId}`, {params})
        .map(this._formatGroupContactIds);

  }

  create(group: Group): Observable<Group> {
    return this.http.post<Group>(`${environment.appApi.baseUrl}/groups`, group)
  }

  update(group: Group): Observable<Group> {
    return this.http.patch<Group>(`${environment.appApi.baseUrl}/groups/${group.id}`, group)
  }


  destroy(group: Group): Observable<Group> {
    return this.http.delete<Group>(`${environment.appApi.baseUrl}/groups/${group.id}`)
  }

  // Relational endpoints /////////////

  addContactToGroup(groupId: number, contactId: number): Observable<any> {
    return this.http.put(`${environment.appApi.baseUrl}/groups/${groupId}/contacts/rel/${contactId}`, null);
  }

  removeContactFromGroup(groupId: number, contactId: number): Observable<any> {
    return this.http.delete(`${environment.appApi.baseUrl}/groups/${groupId}/contacts/rel/${contactId}`);
  }

  /////////////////// DATA FORMATTERS /////////////////

  // ----------INPUT----------
  // {
  //   "name": "Personal",
  //   "id": 4,
  //   "contacts": [
  //       {
  //         "id": 2
  //       },
  //       {
  //         "id": 3
  //       }
  //   ]
  // }
  // ---------OUTPUT---------
  // {
  //   "name": "Personal",
  //   "id": 4,
  //   "contactIds": [2, 3]
  // }
  private _formatGroupContactIds(g: Group): Group {

    g.contactIds = _.reduce(
        g.contacts,
        (acc: number[], c) => acc.concat(c.id),
        []
    );

    delete g.contacts;

    return g;
  }

}
