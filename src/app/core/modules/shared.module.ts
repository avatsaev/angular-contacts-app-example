import { NgModule } from '@angular/core';
import { ContactCardViewComponent } from '../components/contact-card-view/contact-card-view.component';
import { ContactViewComponent } from '../components/contact-view/contact-view.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
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
    ContactViewComponent,
    ContactFormComponent,
    ToolbarComponent,
    FooterComponent
  ],
  exports: [
    ContactCardViewComponent,
    ContactViewComponent,
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
