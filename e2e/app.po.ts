import { promise, browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';

// page objects

export class DashboardPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/dashboard');
  }

  getH1(): ElementFinder {
    return element(by.className('ee-title'));
  }

  getHeroElements(): ElementArrayFinder {
    return element.all(by.className('ee-hero-button'));
  }

  getSearchBox(): ElementFinder {
    return element(by.css('#search-box'));
  }

  getSearchResult(): ElementFinder {
    return element(by.className('ee-search-result'));
  }
}
