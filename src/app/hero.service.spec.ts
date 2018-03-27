import { headers } from './../test-utils/jsonHeaders';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { fakeHttpResponse } from '../test-utils/fakeHttpResponse';
/**
 * TODO what to test when mocking?
 *  - what was called and how many times
 *  - if REST returned data, is it converted correctly?
 *  => do not use an internal array! only mock string responses form server and that's its
 *
 */

describe('HeroService', () => {
  let httpSpy: {       // a mock object
    get: jasmine.Spy,  // has method .get(), which is a jasmine spy, so we can analyze it
    put: jasmine.Spy,
    post: jasmine.Spy
  };
  let service: HeroService;
  const HEROES = [
    { id: 1, name: 'Professor X' } as Hero,
    { id: 2, name: 'Storm' } as Hero
  ];

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('Http', ['get', 'post', 'put']);
    httpSpy.get.and.returnValue(fakeHttpResponse(HEROES));
    httpSpy.post.and.callFake(() => fakeHttpResponse(HEROES[1]));
    httpSpy.put.and.callFake(() => fakeHttpResponse(HEROES[1]));
    service = new HeroService(<any>httpSpy);
    // the TS specification allows <any> to be assigned on any concrete type
    // it's kind of a 'hack by design'
  });

  it('getHeroes() || calls GET app/heroes', () => {
    service.getHeroes();
    expect(httpSpy.get).toHaveBeenCalledTimes(1);
    expect(httpSpy.post).toHaveBeenCalledTimes(0);
    expect(httpSpy.put).toHaveBeenCalledTimes(0);
    expect(httpSpy.get).toHaveBeenCalledWith('app/heroes');
  });

  it('getHeroes() || converts response correctly', (done: DoneFn) => {
    service.getHeroes().then((heroes: Hero[]) => {
      // note: .toBe() would not work here, because we need the deep equality of .toEqual()
      expect(heroes).toEqual([
        { id: 1, name: 'Professor X' } as Hero,
        { id: 2, name: 'Storm' } as Hero
      ]);
      done();
    });
  });

  it('getHero() || calls GET app/heroes', () => {
    service.getHero(1);
    expect(httpSpy.get).toHaveBeenCalledTimes(1);
    expect(httpSpy.post).toHaveBeenCalledTimes(0);
    expect(httpSpy.put).toHaveBeenCalledTimes(0);
    expect(httpSpy.get).toHaveBeenCalledWith('app/heroes');
  });

  it('getHero() || converts response correctly and returns only it item with correct id', (done: DoneFn) => {
    service.getHero(1).then((hero: Hero) => {
      expect(hero.id).toBe(1);
      expect(hero.name).toBe('Professor X');
      done();
    })
  });

  it('save() | a new hero | calls POST app/heroes with the hero data as json', () => {
    service.save({ id: null, name: 'Beast' } as Hero);
    expect(httpSpy.get).toHaveBeenCalledTimes(0);
    expect(httpSpy.post).toHaveBeenCalledTimes(1);
    expect(httpSpy.put).toHaveBeenCalledTimes(0);
    expect(httpSpy.post).toHaveBeenCalledWith('app/heroes', JSON.stringify({ id: null, name: 'Beast' }), headers);
  });

  it('save() | an existing hero | calls PUT app/heroes/[id] with the hero data as json', () => {
    service.save({ id: 1, name: 'Beast' } as Hero);
    expect(httpSpy.get).toHaveBeenCalledTimes(0);
    expect(httpSpy.post).toHaveBeenCalledTimes(0);
    expect(httpSpy.put).toHaveBeenCalledTimes(1);
    expect(httpSpy.put).toHaveBeenCalledWith('app/heroes/1', JSON.stringify({ id: 1, name: 'Beast' }), headers);
  });

  it('save() | converts response correctly', (done: DoneFn) => {
    service.save({ id: null, name: 'Beast' } as Hero).then((hero: Hero) => {
      expect(hero).toEqual({ id: 2, name: 'Storm' } as Hero);
      done();
    });
  });

});
