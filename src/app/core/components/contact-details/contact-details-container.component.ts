import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../models/contact';


@Component({
  selector: 'app-contact-details-container',
  templateUrl: './contact-details-container.component.html',
  styleUrls: ['./contact-details-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsContainerComponent implements OnInit {

  @Input() contact: Contact;
  @Output() onEdit = new EventEmitter<Contact>();
  @Output() onDelete = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit() {

  }

}
