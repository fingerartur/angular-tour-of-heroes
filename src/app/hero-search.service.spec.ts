import { fakeHttpResponse } from '../test-utils/fakeHttpResponse';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';
import 'rxjs/add/operator/toPromise';

/**
 * This is NOT testing the REST API! It is only testing the service that uses the REST API,
 * i.e. it tests what request was made (what URL, what data) and whether the response gets
 * correctly converted to JS objects.
 */
describe('HeroSearchService', () => {
  let httpSpy: {
    get: jasmine.Spy
  };
  let service: HeroSearchService;

  beforeEach(() => {
    const heroes = [
      { id: 1, name: 'Professor X' } as Hero,
      { id: 2, name: 'Storm' } as Hero
    ];
    httpSpy = jasmine.createSpyObj('Http', ['get' ]);
    httpSpy.get.and.returnValue(fakeHttpResponse(heroes));
    service = new HeroSearchService(<any>httpSpy);
  });

  it('search() || calls GET app/heroes?q=[name]', () => {
    service.search('Bumble');
    expect(httpSpy.get).toHaveBeenCalledTimes(1);
    expect(httpSpy.get).toHaveBeenCalledWith('app/heroes/?name=Bumble');
  });

  it('search() || converts the reponse to an observable of heroes', (done: DoneFn) => {
    service.search('Bumble').subscribe((heroes: Hero[]) => {
      expect(heroes).toEqual([
        { id: 1, name: 'Professor X' } as Hero,
        { id: 2, name: 'Storm' } as Hero
      ]);
      done();
    })
  });

});
