import { NgModule } from '@angular/core';
import {ContactListComponent} from '../components/contact-list/contact-list.component';
import {ContactFormComponent} from '../components/contact-form/contact-form.component';
import {ContactDetailsContainerComponent} from '../components/contact-details/contact-details-container.component';
import {ContactsService} from '../services/contacts.service';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import {TitleResolver} from '../resolvers/title.resolver';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent
  ],
  exports: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent
  ],
  providers: [ContactsService, TitleResolver]
})
export class SharedModule { }
