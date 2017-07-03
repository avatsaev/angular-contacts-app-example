import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import {
  ContactDetailsContainerComponent
} from './components/contact-details/contact-details-container.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ContactsService} from './services/contacts.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactNewComponent } from './views/contact-new/contact-new.component';
import { ContactsIndexComponent } from './views/contacts-index/contacts-index.component';
import {StoreModule} from '@ngrx/store';

import { reducer } from './store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ContactEffects} from './store/contacts-effects';
import {ContactDetailsComponent} from './views/contact-details/contact-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent,
    ContactDetailsComponent,
    ContactDetailsContainerComponent,
    ContactEditComponent,
    ContactNewComponent,
    ContactsIndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer), /* Initialise the Central Store with Application's main reducer*/
    EffectsModule.run(ContactEffects), /* Start monitoring contacts side effects */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    NgbModule.forRoot()
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
