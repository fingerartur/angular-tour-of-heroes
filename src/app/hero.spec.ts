import { Hero } from './hero';
// no need to import Jasmine

describe('hero', () => {

  it('has an id', () => {
    const hero = new Hero();
    hero.id = 2;
    expect(hero.id).toEqual(2);
  });

  it('has an name', () => {
    const hero = new Hero();
    hero.name = 'Wolverine';
    expect(hero.name).toEqual('Wolverine');
  });

});
