import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export function toPayload<r extends string, T>(k: r) {
  return (source: Observable<T>) =>
    source.pipe( map(data => ({r: data})));
}


export const setState = <S>(update: Partial<S>, state: S) => ({
  ...state,
  ...update
});
