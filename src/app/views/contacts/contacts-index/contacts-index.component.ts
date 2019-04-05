import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '@app/core/models';
import { Router } from '@angular/router';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsIndexComponent implements OnInit {

  contacts$: Observable<Contact[]> = this.contactsFacade.contacts$;

  constructor(private contactsFacade: ContactsStoreFacade, private router: Router) { }

  ngOnInit() { }

}
