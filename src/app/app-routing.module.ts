import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactsComponent} from './views/contacts/contacts.component';
import {ContactNewComponent} from './views/contact-new/contact-new.component';
import {ContactsIndexComponent} from './views/contacts-index/contacts-index.component';
import {ContactDetailsComponent} from './components/contact-details/contact-details.component';
import {ContactEditComponent} from './views/contact-edit/contact-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: 'contacts',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
