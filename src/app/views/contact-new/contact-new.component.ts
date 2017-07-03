import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {ApplicationState} from '../../store/index';
import {Store} from '@ngrx/store';
import * as fromContacts from '../../store/contacts-actions'
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass']
})
export class ContactNewComponent implements OnInit {

  constructor(public store: Store<ApplicationState>, private router: Router) { }

  ngOnInit() {

    this.store.subscribe(state => {
      console.log('STATE: ', state);
    })
  }

  submitted(contact: Contact) {

    console.log(contact);
    this.store.dispatch(new fromContacts.Create(contact))

  }

}
