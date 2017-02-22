import { It281022AngularPage } from './app.po';

describe('it2810-22-angular App', function() {
  let page: It281022AngularPage;

  beforeEach(() => {
    page = new It281022AngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
