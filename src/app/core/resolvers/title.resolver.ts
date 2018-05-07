

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromRoot from '@app-root-store';
import * as uiActions from '../../store/actions/ui-actions';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class TitleResolver implements Resolve<string> {
  constructor(private store: Store<fromRoot.State>) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<string> {

    this.store.dispatch(new uiActions.SetCurrentTitle(route.data['title']));

    return of(route.data['title']);

  }
}
