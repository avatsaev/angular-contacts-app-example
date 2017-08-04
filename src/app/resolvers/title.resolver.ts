

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as fromRootStore from '../store'
import * as uiActions from '../store/actions/ui-actions';
import {Store} from '@ngrx/store';

@Injectable()

export class TitleResolver implements Resolve<string> {
  constructor(private store: Store<fromRootStore.State>) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<string> {

    this.store.dispatch(new uiActions.SetCurrentTitle(route.data.title));

    return Observable.of(route.data.title);

  }
}
