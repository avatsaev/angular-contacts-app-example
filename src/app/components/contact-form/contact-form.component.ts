import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Contact} from '../../models/contact';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


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

  @Output() onSubmit = new EventEmitter<Contact>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      'id': [this.contact.id],
      'name': [this.contact.name, Validators.required],
      'email': [this.contact.email, Validators.required],
      'phone': [this.contact.phone]
    })
  }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('Form contact: ', this.contact);
    if (this.contact) {
      this.form.patchValue(this.contact);
    }
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }

  }

}
