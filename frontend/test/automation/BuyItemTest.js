const expect = require('chai').expect;
const correctPassword = 'test123456';
function isAlertPresent()
{
    try
    {
        driver.switchTo().alert();
        return true;
    }   // try
    catch (e) {
      return false;
    };
}   // isAlertPresent()

describe('Buy Item', function() {

  it('Login With Correct Username & Password', function() {
    browser.url('./');
    browser.alertAccept();
    browser.click('#bt-login');
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.setValue('#password', correctPassword);
    browser.click('#submitButtonInLogin');
    browser.pause(5000);
  });

  it('Search Item', function() {

    browser.setValue('#searchBar', 'table');
    browser.keys("Enter");
    browser.pause(5000);
    //let item = browser.getText('.SPItemContainer');
    //expect(item).to.exist;
    //if (isAlertPresent) browser.alertAccept();
    browser.click('.SPItemContainer');
    expect('.backButton').to.exist;
  });

  it('Buy Item', function() {
    // if (isAlertPresent) browser.alertAccept();
    browser.pause(5000);
    browser.click('#submitButtonBuy');
    browser.pause(5000);
    browser.alertAccept();
  });

})
