import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class Hero {
  id: number;
  name: string;

  toString(): string {
    return 'id: ' + this.id + ', name: ' + this.name;
  }
}
