import { DashboardPage } from './app.po';
import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { relative } from './relative';

describe('dashboard', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display large message saying tour of heroes', async () => {
    await page.navigateTo();
    const text = await page.getH1().getText();
    expect(text).toEqual('Tour of Heroes');
  });

  it('should display Bombast as second button', async () => {
    await page.navigateTo();
    const secondName = await page.getHeroElements().get(1).getText();
    expect(secondName).toEqual('Bombasto');
  });

  it('should display four hero buttons', async () => {
    await page.navigateTo();
    const count = await page.getHeroElements().count();
    expect(count).toEqual(4);
  });

  it('should have a searchbox that takes me to /detail/[id]', async () => {
    await page.navigateTo();
    const box = page.getSearchBox();
    await box.sendKeys('Magneta');
    await page.getSearchResult().click();
    browser.waitForAngular();
    const url = relative(await browser.getCurrentUrl());
    expect(url).toBe('detail/15');
  });

});
