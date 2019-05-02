import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private history = [];

  pageUrl$: Observable<string> = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map((val: NavigationStart) => val.url),
    shareReplay(1)
  );

  get getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/contacts';
  }

  constructor(private router: Router) { }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }
  public navigate(url: Array<string | number>) {
    this.router.navigate(url);
  }
}
