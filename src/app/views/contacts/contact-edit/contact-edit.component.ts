import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '@app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import { ContactsStoreFacade } from '@app/contacts-store/contacts.store-facade';
import { ContactsEffects } from '@app/contacts-store/contacts-effects';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditComponent implements OnInit, OnDestroy {

  contact$ = this.activatedRoute.params.pipe(
    map( params => params.contactId),
    switchMap(id => this.contactsFacade.getContactById(id))
  );
  redirectSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactsFacade: ContactsStoreFacade,
    private contactsEffects: ContactsEffects
  ) { }

  ngOnInit() {

    // listen to update$ side effect, after updating redirect to the contact details view
    this.redirectSub = this.contactsEffects.update$.pipe(
      // make sure that the currently edited contact has been update and not some other contact (emitted by sockets)
      filter( action => action.contact.id === +this.activatedRoute.snapshot.params.contactId)
    ).subscribe(
      action => this.router.navigate(['/contacts', action.contact.id])
    );

    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.contactsFacade.loadContact(+params.contactId);
    });

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.contactsFacade.updateContact(contact);
  }

}
