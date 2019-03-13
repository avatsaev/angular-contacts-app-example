import { ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Contact } from '@app/core/models';
import { Router} from '@angular/router';
import { ContactsStoreFacade} from '@app/contacts-store/contacts-store.facade';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactNewComponent implements OnInit, OnDestroy {

  constructor(
    private contactsFacade: ContactsStoreFacade,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  submitted(contact: Contact) {
    this.contactsFacade.createContact(contact);
    this.router.navigate(['/contacts']);
  }

}
