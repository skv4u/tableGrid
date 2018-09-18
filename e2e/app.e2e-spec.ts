import { TableGridPage } from './app.po';

describe('table-grid App', () => {
  let page: TableGridPage;

  beforeEach(() => {
    page = new TableGridPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
