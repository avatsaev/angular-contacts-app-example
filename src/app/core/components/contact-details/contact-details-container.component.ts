import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Contact } from '@app-core/models';


@Component({
  selector: 'app-contact-details-container',
  templateUrl: './contact-details-container.component.html',
  styleUrls: ['./contact-details-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsContainerComponent implements OnInit {

  @Input() contact: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() remove = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit() {

  }

}
