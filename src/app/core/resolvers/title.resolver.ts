import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromRoot from '@app/root-store';
import {Store} from '@ngrx/store';
import {setCurrentTitle} from '../../store/actions/ui-actions';

@Injectable({
  providedIn: 'root'
})

export class TitleResolver implements Resolve<string> {
  constructor(private store: Store<fromRoot.State>) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<string> {

    this.store.dispatch(setCurrentTitle({payload: route.data.title}));

    return of(route.data.title);

  }
}
