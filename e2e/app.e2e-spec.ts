import { SosoPartnerUIPage } from './app.po';

describe('soso-partner-ui App', function() {
  let page: SosoPartnerUIPage;

  beforeEach(() => {
    page = new SosoPartnerUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
