import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  contact$ = this.contactsFacade.currentContact$;
  contact: Contact;
  subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactsFacade: ContactsStoreFacade,
    private contactsEffects: ContactsEffects
  ) { }

  ngOnInit() {
    const contactSub = this.contact$.subscribe(element => this.contact = element);
    this.subscriptions.add(contactSub);

    // If the destroy effect fires, we check if the current id is the one being viewed, and redirect to index
    const redirectSub = this.contactsEffects.destroy$.pipe(
      filter(action =>
        action.payload === +this.activatedRoute.snapshot.params.contactId
      )
    ).subscribe(_ => this.router.navigate(['/contacts']));
    this.subscriptions.add(redirectSub);

    const routeSub = this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.contactsFacade.loadContact(+params.contactId);
    });
    this.subscriptions.add(routeSub);
  }

  editContact(contact: Contact) {
    this.contactsFacade.setCurrentContactId(contact.id);
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }
  showContact(contact: Contact) {
    this.contactsFacade.setCurrentContactId(contact.id);
    this.router.navigate(['/contacts', contact.id]);
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
