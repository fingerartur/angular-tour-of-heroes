import { Hero } from 'app/hero';

// npm install @types/jasmine

export interface IMockHeroService {
  getHeroes: jasmine.Spy,
  getHero: jasmine.Spy,
  save: jasmine.Spy,
  delete: jasmine.Spy
}

export function createMockHeroService(): IMockHeroService {
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'getHero', 'save', 'delete']);

  heroServiceSpy.save.and.returnValue(Promise.resolve({ id: 1, name: 'Bilbo' } as Hero));

  heroServiceSpy.getHeroes.and.returnValue(Promise.resolve([
    { id: 1, name: 'Arnold' } as Hero,
    { id: 2, name: 'Rocky' } as Hero,
    { id: 3, name: 'Terminator' } as Hero,
    { id: 4, name: 'Your mom' } as Hero,
    { id: 5, name: 'Chuck Norris' } as Hero,
    { id: 6, name: 'Bruce Lee' } as Hero
  ]));

  return heroServiceSpy;
}
