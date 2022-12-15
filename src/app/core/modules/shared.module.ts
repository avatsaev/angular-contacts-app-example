import { NgModule } from '@angular/core';
import {ContactListComponent} from '../components/contact-list/contact-list.component';
import {ContactFormComponent} from '../components/contact-form/contact-form.component';
import {ContactDetailsContainerComponent} from '../components/contact-details/contact-details-container.component';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '@app/core/components/footer/footer.component';
import {HighLightTextPipe} from "@app/core/pipes/high-light-text.pipe";

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
    ToolbarComponent,
    FooterComponent,
    HighLightTextPipe
  ],
  exports: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent,
    HighLightTextPipe
  ]
})
export class SharedModule { }
