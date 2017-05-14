import { Homelibrarian2Page } from './app.po';

describe('homelibrarian2 App', () => {
  let page: Homelibrarian2Page;

  beforeEach(() => {
    page = new Homelibrarian2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
