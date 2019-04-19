import { Component, Input, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-cardonent.html',
  styleUrls: ['./contact-cardonent.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContactCardComponent {
  @Input() public cardTitleTemplate: TemplateRef<void>;
  @Input() public cardInfoTemplate: TemplateRef<void>;
  @Input() public cardActionTemplate: TemplateRef<void>;
}
