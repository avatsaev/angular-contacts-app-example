import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {Observable} from 'rxjs/Observable';
import {ApplicationState} from '../../store/index';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store'

@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass']
})
export class ContactsIndexComponent implements OnInit {

  contacts$: Observable<Contact[]>;

  constructor(public store: Store<ApplicationState>) { }

  ngOnInit() {
     this.contacts$ = this.store.select(fromStore.getAllContacts);
  }

}
