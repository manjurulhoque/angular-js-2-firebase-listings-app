import { PropslistingsPage } from './app.po';

describe('propslistings App', () => {
  let page: PropslistingsPage;

  beforeEach(() => {
    page = new PropslistingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
