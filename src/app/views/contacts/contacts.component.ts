import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {

  contacts$: Observable<Contact[]>;

  constructor(public contactService: ContactsService) { }

  ngOnInit() {
    this.contacts$ = this.contactService.index();
  }

}
