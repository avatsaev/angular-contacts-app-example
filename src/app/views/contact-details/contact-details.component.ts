import { Component, OnInit } from '@angular/core';
import {ApplicationState} from '../../store/index';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import * as fromContacts from '../../store/contacts-actions'
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../models/contact';
import * as fromApplication from '../../store'

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass']
})
export class ContactDetailsComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private store: Store<ApplicationState>, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.contact$ = this.store.select(fromApplication.getCurrentContact);

    this.activatedRoute.params.subscribe(params => {
      // update our contact from the backend in case it was modified by another client
      this.store.dispatch(new fromContacts.Load(+params['contactId']));
    })

  }

}
