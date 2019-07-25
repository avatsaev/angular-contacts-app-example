import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '@app/core/models';
import { ActivatedRoute } from '@angular/router';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditComponent implements OnInit, OnDestroy {

  contact$ = this.contactsFacade.currentContact$;
  redirectSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsFacade: ContactsStoreFacade,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.contactsFacade.updateContact(contact);
  }


}
