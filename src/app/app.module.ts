import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { ContactNewComponent } from './views/contact-new/contact-new.component';
import { ContactsIndexComponent } from './views/contacts-index/contacts-index.component';


import { reducers} from './store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {ContactEffects} from './store/contacts-effects';
import {ContactDetailsComponent} from './views/contact-details/contact-details.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from './modules/shared.module';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactNewComponent,
    ContactsIndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers), /* Initialise the Central Store with Application's main reducer*/
    EffectsModule.forRoot([ContactEffects]), /* Start monitoring app's side effects */
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
