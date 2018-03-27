export interface IMockRouter { navigate: jasmine.Spy };

export function createMockRouter(): IMockRouter {
  return jasmine.createSpyObj('Router', [ 'navigate' ]);
}
