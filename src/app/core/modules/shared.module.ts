import { NgModule } from '@angular/core';
import { ContactCardViewComponent } from '../components/contact-card-view/contact-card-view.component';
import { ContactCardComponent } from '../components/contact-card/contact-card.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactDetailsContainerComponent } from '../components/contact-details/contact-details-container.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { MatButtonModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    ContactCardViewComponent,
    ContactCardComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent
  ],
  exports: [
    ContactCardViewComponent,
    ContactCardComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ]
})
export class SharedModule { }
