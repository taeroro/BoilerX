const expect = require('chai').expect;
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
    browser.setValue('#password', 'monikamonika123');
    browser.click('#submitButtonInLogin');
    browser.pause(1000);
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
    browser.click('#submitButtonBuy');
    browser.pause(5000);
    browser.alertAccept();
  });

/*
  it('Logout', function() {
    browser.click('#bt-login');
    let linkAfterLogin = browser.getUrl();
    expect(linkAfterLogin).to.equal('http://localhost:8080/login');
  });

  it('Login With InCorrect Username & Password', function() {
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.setValue('#password', 'monikamonika');
    browser.click('#submitButtonInLogin');
    browser.pause(2000);
    browser.alertAccept();
    browser.pause(2000);
    let linkAfterLogin = browser.getUrl();
    expect(linkAfterLogin).to.equal('http://localhost:8080/login');
  })

  */
})
