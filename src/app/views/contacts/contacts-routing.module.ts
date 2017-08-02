import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactsComponent} from './contacts.component';
import {ContactNewComponent} from './contact-new/contact-new.component';
import {ContactsIndexComponent} from './contacts-index/contacts-index.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    children: [
      {path: '', component: ContactsIndexComponent},
      {path: 'new', component: ContactNewComponent},
      {path: ':contactId', component: ContactDetailsComponent},
      {path: ':contactId/edit', component: ContactEditComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
