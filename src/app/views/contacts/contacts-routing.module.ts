import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactsComponent} from './contacts.component';
import {ContactNewComponent} from './contact-new/contact-new.component';
import {ContactsIndexComponent} from './contacts-index/contacts-index.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {TitleResolver} from '../../core/resolvers/title.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    children: [
      {
        path: '',
        component: ContactsIndexComponent,
        data: {title: 'Contacts index'},
        resolve: {title: TitleResolver}
      },
      {
        path: 'new',
        component: ContactNewComponent,
        data: {title: 'New id'},
        resolve: {title: TitleResolver}
      },
      {
        path: ':contactId',
        component: ContactDetailsComponent,
        data: {title: 'Contact details'},
        resolve: {title: TitleResolver}
      },
      {
        path: ':contactId/edit',
        component: ContactEditComponent,
        data: {title: 'Edit id'},
        resolve: {title: TitleResolver}
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
