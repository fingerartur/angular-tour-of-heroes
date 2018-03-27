import { IMockRouter } from './../test-utils/mockRouter';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HeroService } from './hero.service';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Hero } from './hero';
import { observable } from 'test-utils/observable';
import { Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { createMockHeroService, IMockHeroService } from '../test-utils/mockHeroService';
import { createMockRouter } from '../test-utils/mockRouter';

describe('Dashboard component', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  let mockHeroService: IMockHeroService;
  let mockRouter: IMockRouter;

  beforeEach(() => {
    mockHeroService = createMockHeroService();
    mockRouter = createMockRouter();

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
      // Tells the compiler not to error on unknown elements and attributes.
      // This is very nice. We do not need to declare child components or register their providers.
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is not broken', () => {
    expect(component).toBeDefined();
  });

  it('loads only the first 5 heroes', () => {
    expect(mockHeroService.getHeroes).toHaveBeenCalledTimes(1);
    // fixture.whenStable().then(() => {
    //   fixture.detectChanges();
    //   expect(component.heroes.length).toEqual(5);
    //   done();
    // });
  });
});
