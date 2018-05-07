import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Contact } from '@app-core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit, OnChanges {

  @Input() contact: Contact = {
    id: undefined,
    name: '',
    email: '',
    phone: ''
  };

  @Output() save = new EventEmitter<Contact>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'id': [this.contact.id],
      'name': [this.contact.name, Validators.required],
      'email': [this.contact.email, Validators.required],
      'phone': [this.contact.phone]
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.contact) {
      this.form.patchValue({...this.contact});
    }
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }

  }

}
