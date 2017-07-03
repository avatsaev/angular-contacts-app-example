import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../models/contact';
import {Router} from '@angular/router';
import {ApplicationState} from '../../store/index';
import {Store} from '@ngrx/store';

import * as fromContacts from '../../store/contacts-actions'

@Component({
  selector: 'app-contact-details-container',
  templateUrl: './contact-details-container.component.html',
  styleUrls: ['./contact-details-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsContainerComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private store: Store<ApplicationState>, private router: Router) { }

  ngOnInit() {

  }

  editContact() {

    this.store.dispatch(new fromContacts.SetCurrent(this.contact));

    this.router.navigate(['/contacts', this.contact.id, 'edit']);

  }

  deleteContact() {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new fromContacts.Delete(this.contact));
      this.router.navigate(['/contacts']);
    }
  }

}
