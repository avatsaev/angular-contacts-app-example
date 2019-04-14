import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-card-view',
  templateUrl: './contact-card-view.component.html',
  styleUrls: ['./contact-card-view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContactCardViewComponent implements OnInit {
  @Input() public cardTitleTemplate: TemplateRef<void>;
  @Input() public cardInfoTemplate: TemplateRef<void>;
  @Input() public cardActionTemplate: TemplateRef<void>;
  constructor() { }

  ngOnInit() {
  }

}
