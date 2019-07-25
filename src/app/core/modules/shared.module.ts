import { NgModule } from '@angular/core';
import { ContactCardComponent } from '../components/contact-card/contact-card.component';
import { ContactDetailedViewComponent } from '../components/contact-detailed-view/contact-detailed-view.component';
import { ContactListItemComponent } from '../components/contact-list-item/contact-list-item.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import {MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatMenuModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    ContactCardComponent,
    ContactDetailedViewComponent,
    ContactListItemComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent
  ],
  exports: [
    ContactCardComponent,
    ContactDetailedViewComponent,
    ContactListItemComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class SharedModule { }
