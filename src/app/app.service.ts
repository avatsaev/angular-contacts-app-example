import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isBladeTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get getBladeTheme(): boolean {
    return this.isBladeTheme.getValue();
  }
  set setBladeTheme(val: boolean) {
    this.isBladeTheme.next(val);
  }
  constructor() { }
}
