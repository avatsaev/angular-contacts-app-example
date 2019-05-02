import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '@app/core/models';

@Component({
  selector: 'app-contact-detailed-view',
  templateUrl: './contact-detailed-view.component.html',
  styleUrls: ['./contact-detailed-view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactDetailedViewComponent implements OnInit {
  @Input() contact: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() remove = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter();

  ngOnInit() { }

  editContact(contact: Contact) {
    this.edit.emit(contact);
  }
  deleteContact(contact: Contact) {
    this.remove.emit(contact);
  }
  cancelAction() {
    this.cancel.emit();
  }
}
