import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../models/contact';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/index';
import * as fromContacts from '../../store/contacts-actions'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass']
})
export class ContactListComponent implements OnInit {


  @Input() contacts: Contact[];

  constructor(private router: Router, public store: Store<ApplicationState>) { }

  ngOnInit() {

  }


  showDetails(contact: Contact) {
    this.router.navigate(['/contacts', contact.id]);
  }

  editContact(contact: Contact) {
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }



  deleteContact(contact: Contact) {

    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new fromContacts.Delete(contact));
    }
  }

}
