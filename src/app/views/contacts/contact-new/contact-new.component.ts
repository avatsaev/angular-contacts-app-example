import { ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Contact } from '@app/core/models';
import { Subscription} from 'rxjs';
import { Router} from '@angular/router';
import { ContactsStoreFacade} from '@app/contacts-store/contacts-store.facade';
import {ContactsEffects} from '@app/contacts-store/contacts-effects';
import {CreateSuccess} from '@app/contacts-store/contacts-actions';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactNewComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;

  constructor(
    private contactsFacade: ContactsStoreFacade,
    private router: Router,
    private contactsEffects: ContactsEffects
  ) { }

  ngOnInit() {

    this.redirectSub = this.contactsEffects.create$.subscribe(
      (action: CreateSuccess) => this.router.navigate(['/contacts', action.payload.id])
    );

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.contactsFacade.createContact(contact);
  }

}
