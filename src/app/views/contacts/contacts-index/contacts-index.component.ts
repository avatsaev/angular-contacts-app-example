import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Contact} from '@app/core/models';
import {Router} from '@angular/router';
import {ContactsStoreFacade} from '@app/contacts-store/contacts.store-facade';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';


@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsIndexComponent implements OnInit {

  hightLightText: string = null;
  contacts$ = this.contactsFacade.contacts$;
  newContacts$: Observable<Contact[]>;

  constructor(private contactsFacade: ContactsStoreFacade, private router: Router) {
  }

  ngOnInit() {
    this.filterContact(null);
  }


  //filter contact logic
  filterContact(keyword: string): void {
    if (!keyword) {
      this.hightLightText = '';
      this.newContacts$ = this.contacts$.pipe(
        map(results => {
          results.pop();
          return results;
        } )
      );
      return;
    }

    this.hightLightText = keyword;
    const keywordFormatted = keyword.toLowerCase();
    this.newContacts$ = this.contacts$.pipe(
      map(results => results.filter(
        item => item.first_name.toLowerCase().includes(keywordFormatted)
          || item.last_name.toLowerCase().includes(keywordFormatted)
          || item.email.toLowerCase().includes(keywordFormatted)
      )),
      catchError(e => {
        return of([]);
      })
    );

  }


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

}
