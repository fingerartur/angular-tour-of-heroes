import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/defer';

/** Returns an observable, which generates its data only once
 * and right AFTER an observer subscribes to it. (each observer gets all the data)
 */
export function observable<T>(data: T) {
  return Observable.defer(() => Promise.resolve(data));

  // if we used the code below, the data would get generated right at the Observable.create()
  // call and therefore no subscriber would get any data, because he would subscribe too late
  // - the data is already gone before you cas subscribe to it.

  // Observable.create((observer) => {
  //   observer.next('data');
  //   observer.complete();
  // });
}
