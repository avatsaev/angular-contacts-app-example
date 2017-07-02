import { AngularContactsAppExamplePage } from './app.po';

describe('angular-contacts-app-example App', () => {
  let page: AngularContactsAppExamplePage;

  beforeEach(() => {
    page = new AngularContactsAppExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
