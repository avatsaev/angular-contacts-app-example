import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/index';

import * as fromApplication from '../../store'
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(public store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(fromApplication.getCurrentContact);
  }

}
