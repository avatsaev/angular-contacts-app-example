import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../models/contact';
import {ApplicationState} from '../../store/index';
import {ScannedActionsSubject, Store} from '@ngrx/store';
import * as contactsActions from '../../store/contacts-actions'
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {ContactEffects} from '../../store/contacts-effects';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass']
})
export class ContactNewComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;

  constructor(
    private store: Store<ApplicationState>,
    private router: Router,
    private contactEffects: ContactEffects
  ) { }

  ngOnInit() {
    this.redirectSub = this.contactEffects.create$.subscribe(action => this.router.navigate(['/contacts']));
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new contactsActions.Create(contact));
  }

}
