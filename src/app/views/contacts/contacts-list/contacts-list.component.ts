import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '@app/core/models';
import { Router } from '@angular/router';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Contact[]> = this.contactsFacade.contacts$;
  contactsTrackByFn = (index: number, contact: Contact) => contact.id;
  constructor(private contactsFacade: ContactsStoreFacade, private router: Router) { }

  ngOnInit() { }

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


}
