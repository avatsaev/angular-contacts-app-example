import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '@app/core/models';
import { Router } from '@angular/router';
import { ContactsStoreFacade } from '@app/contacts-store/contacts.store-facade';
import { map, shareReplay, tap } from 'rxjs/operators';


@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsIndexComponent implements OnInit {

  contacts$ = this.contactsFacade.contacts$;

  pageInfo$ = this.contactsFacade.contactsPageInfo$;

  /** Create iteration of total pages */
  pages$ = this.pageInfo$.pipe(
    map( pageInfo => Array.from({length: pageInfo.total_pages || 0}, (_,i) => i + 1))
  );

  /** Current page */
  current_page$ = this.pageInfo$.pipe(
    map( pageInfo => pageInfo.page),
    shareReplay(1)
  )

  constructor(private contactsFacade: ContactsStoreFacade, private router: Router) { }

  ngOnInit() {}

  editContact(contact: Contact) {
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }

  showContact(contact: Contact) {
    this.router.navigate(['/contacts', contact.id]);
  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.contactsFacade.deleteContact(contact.id);
    }
  }

  changePage(page: number){
    this.contactsFacade.pageChange(page);
  }

}
