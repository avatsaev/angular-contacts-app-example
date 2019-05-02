import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '@app/core/models';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';
import { RouterService } from 'src/app/router.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactNewComponent implements OnInit {

  constructor(
    private contactsFacade: ContactsStoreFacade,
    public routerService: RouterService
  ) { }

  ngOnInit() {
  }

  submitted(contact: Contact) {
    this.contactsFacade.createContact(contact);
    this.routerService.navigate(['/contacts']);
  }
  goToPrevPage() {
    const prevUrl: string = this.routerService.getPreviousUrl;
    this.routerService.navigate([prevUrl]);
  }

}
