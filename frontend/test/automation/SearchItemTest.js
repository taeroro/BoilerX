const expect = require('chai').expect;
const correctPassword = 'test123456';

describe('Search Item', function() {

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

    browser.setValue('#searchBar', 'iphone');
    browser.keys("Enter");
    browser.pause(5000);
    //let item = browser.getText('.SPItemContainer');
    //expect(item).to.exist;

    browser.click('.SPItemContainer');
    expect('.backButton').to.exist;
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
