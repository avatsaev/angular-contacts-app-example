import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { TitleResolver } from '@app/core/resolvers/title.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    children: [
      {
        path: '',
        component: ContactsListComponent,
        data: { title: 'Contacts list' },
        resolve: { title: TitleResolver }
      },
      {
        path: 'new',
        component: ContactNewComponent,
        data: { title: 'New contact' },
        resolve: { title: TitleResolver }
      },
      {
        path: ':contactId',
        component: ContactDetailsComponent,
        data: { title: 'Contact details' },
        resolve: { title: TitleResolver }
      },
      {
        path: ':contactId/edit',
        component: ContactEditComponent,
        data: { title: 'Edit contact' },
        resolve: { title: TitleResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
