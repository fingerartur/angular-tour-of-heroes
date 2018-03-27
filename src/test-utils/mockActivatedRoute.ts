import { Observable } from 'rxjs/Observable';
import { observable } from './observable';
import { Params } from '@angular/router';

export interface IMockActivatedRoute {
  params: Observable<Params>
}

export function createMockActivatedRoute(): IMockActivatedRoute {
  return {
    params: observable({
      'id': 6
    })
  }
}
