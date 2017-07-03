import { Component, OnInit } from '@angular/core';
import {ApplicationState} from '../../store/index';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass']
})
export class ContactDetailsComponent implements OnInit {

  constructor(private applicationState: Store<ApplicationState>) { }

  ngOnInit() {

  }

}
