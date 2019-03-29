import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from './core/modules/shared.module';
import * as fromRoot from '@app/root-store';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SocketIoModule} from 'ngx-socket-io';
import {environment} from '@app/env';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule,
    StoreModule.forRoot(fromRoot.reducers), /* Initialise the Central Store with Application's main reducer*/
    EffectsModule.forRoot([]), /* Start monitoring app's side effects */
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
