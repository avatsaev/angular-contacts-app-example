import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../models/contact';
import {ApplicationState} from '../../store/index';
import {Dispatcher, Store} from '@ngrx/store';
import * as contactsActions from '../../store/contacts-actions'
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

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
    private dispatcher: Dispatcher
  ) { }

  ngOnInit() {
    // When the contact was successfully created, redirect to details view
    this.redirectSub = this.dispatcher
      .filter(action => action.type === contactsActions.CREATE_SUCCESS)
      .subscribe(action => this.router.navigate(['/contacts']));



  }

  ngOnDestroy(){
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new contactsActions.Create(contact));
  }

}
