import { IMockActivatedRoute } from './../test-utils/mockActivatedRoute';
import { createMockHeroService, IMockHeroService } from './../test-utils/mockHeroService';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Hero } from './hero';
import { observable } from 'test-utils/observable';
import { Input } from '@angular/core';
import { createMockActivatedRoute } from '../test-utils/mockActivatedRoute';

describe('Hero detail component', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;

  let historyBackSpy: jasmine.Spy;
  let mockHeroService: IMockHeroService;
  let mockActivatedRoute: IMockActivatedRoute;

  beforeEach(() => {
    mockHeroService = createMockHeroService();
    mockActivatedRoute = createMockActivatedRoute();

    TestBed.configureTestingModule({
      imports: [ FormsModule ],                   // for ngModel to work
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService},
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;

    historyBackSpy = spyOn(window.history, 'back'); // we mock a global method
  });

  it('is not broken', () => {
    expect(component).toBeDefined();
  });

  it('has no error', () => {
    expect(component.error).not.toBeDefined();
  });

  it('has no hero', () => {
    expect(component.hero).not.toBeDefined();
  });

  describe('save()', () => {
    it('calls service.save(hero) on current hero', () => {
      component.hero = { id: 1, name: 'Wonder girl'} as Hero; // this is how you pass input properties
      component.save();
      expect(mockHeroService.save).toHaveBeenCalledTimes(1);
      expect(mockHeroService.save).toHaveBeenCalledWith({ id: 1, name: 'Wonder girl'} as Hero);
    });
  });

  describe('goBack(hero)', () => {

    it('emits the hero via a "close" event', (done: DoneFn) => {
      const hero = { id: 1, name: 'Wonder girl'} as Hero;
      component.navigated = false;
      component.close.subscribe((hero2: Hero) => {
        expect(hero).toBe(hero2);
        done();
      });
      component.goBack(hero);
    });

    it('goes back in history if navigated===true', () => {
      component.navigated = true;
      component.goBack(null);
      expect(historyBackSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('GUI', () => {
    let html: HTMLElement;
    beforeEach(() => {
      component.hero = { id: 1, name: 'Thor' } as Hero;
      fixture.detectChanges();      // seems to call ngOnInit
      html = fixture.nativeElement as HTMLElement;    // we know that nativeElement is HTML

      // if we used eg. an SVG template, it would not be HTMLElement, that's why .nativeElement has type "any"
    });

    it('ngOninit isnt broken', () => {
      expect(html).toBeDefined();
    });

    it('displays "[name] details!" in h2', () => {
      expect(html.querySelector('h2.ee-name').textContent).toBe('Thor details!');
    });

    it('displays button "back" and it has the correct callback', () => {
      const buttonBack = html.querySelector('button.ee-button-back') as HTMLElement;
      expect(buttonBack.textContent).toBe('Back');
      const spy = spyOn(component, 'goBack');
      buttonBack.click();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('displays button "save" and it has the correct callback', () => {
      const button = html.querySelector('button.ee-button-save') as HTMLElement;
      expect(button.textContent).toBe('Save');
      const spy = spyOn(component, 'save');
      button.click();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('displays name change input with the current [name]', () => {
      const value = html.querySelector('input.ee-name-input').getAttribute('ng-reflect-model');
      // This is how you the rendered value of check ngModel.

      // The commented code returns null (that's how Angular works).
      // (html.querySelector('input.ee-name-input') as HTMLInputElement).value

      expect(value).toBe('Thor');
    });

    it('name change input is bound via ngModel', () => {
      const input = html.querySelector('input.ee-name-input') as HTMLInputElement;

      input.value = 'New name';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      // This is how you change input value so that Angular (ngModel) know about it

      expect(component.hero.name).toBe('New name');
      expect(input.getAttribute('ng-reflect-model')).toBe('New name');
    });

  });

});
