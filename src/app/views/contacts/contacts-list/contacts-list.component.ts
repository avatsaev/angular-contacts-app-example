import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '@app/core/models';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';
import { Observable } from 'rxjs';
import { RouterService } from 'src/app/router.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Contact[]> = this.contactsFacade.contacts$;
  contactsTrackByFn = (index: number, contact: Contact) => contact.id;
  constructor(private contactsFacade: ContactsStoreFacade, public routerService: RouterService) { }

  ngOnInit() { }

  editContact(contact: Contact) {
    this.contactsFacade.setCurrentContactId(contact.id);
    this.routerService.navigate(['/contacts', contact.id, 'edit']);
  }
  showContact(contact: Contact) {
    this.contactsFacade.setCurrentContactId(contact.id);
    this.routerService.navigate(['/contacts', contact.id]);
  }
  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.contactsFacade.deleteContact(contact.id);
    }
  }


}
