import { NgModule } from '@angular/core';
import { ContactListComponent } from '../components/contact-list/contact-list.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactDetailsContainerComponent } from '../components/contact-details/contact-details-container.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { MatButtonModule, MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent
  ],
  exports: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent,
    MatButtonModule,
    MatCardModule
  ]
})
export class SharedModule { }
