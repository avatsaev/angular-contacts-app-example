import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactListComponent} from '../components/contact-list/contact-list.component';
import {ContactFormComponent} from '../components/contact-form/contact-form.component';
import {ContactDetailsContainerComponent} from '../components/contact-details/contact-details-container.component';
import {ContactsService} from '../services/contacts.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GroupsService} from '../services/groups.service';
import {RouterModule} from '@angular/router';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import {TitleResolver} from '../resolvers/title.resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    RouterModule,
    ToolbarComponent
  ],
  providers: [ContactsService, GroupsService, TitleResolver]
})
export class SharedModule { }
