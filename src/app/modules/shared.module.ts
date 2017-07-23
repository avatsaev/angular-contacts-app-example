import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactListComponent} from '../components/contact-list/contact-list.component';
import {ContactFormComponent} from '../components/contact-form/contact-form.component';
import {ContactDetailsContainerComponent} from '../components/contact-details/contact-details-container.component';
import {ContactsService} from '../services/contacts.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent
  ],
  exports: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent
  ],
  providers: [ContactsService]
})
export class SharedModule { }
