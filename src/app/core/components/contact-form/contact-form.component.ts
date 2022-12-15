import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Contact } from '@app/core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit, OnChanges {

  @Input() contact: Contact = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  };

  @Output() save = new EventEmitter<Contact>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: [this.contact.id],
      firstName: [this.contact.first_name, Validators.required],
      lastName: [this.contact.last_name],
      email: [this.contact.email, Validators.required],
      avatar: [this.contact.avatar]
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.contact) {
   this.form.patchValue(
     {
       id: this.contact.id,
       firstName:  this.contact.first_name,
       lastName:  this.contact.last_name,
       email:  this.contact.email,
       avatar: this.contact.avatar
     }
   );
    }
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }

  }

}
