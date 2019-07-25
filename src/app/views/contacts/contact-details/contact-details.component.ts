import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '@app/core/models';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';
import { ContactsEffects } from '@app/contacts-store/contacts-effects';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  contact: Contact;
  subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsFacade: ContactsStoreFacade,
  ) { }

  ngOnInit() {
  }


  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.contactsFacade.deleteContact(contact.id);
    }
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
