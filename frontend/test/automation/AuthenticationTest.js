const expect = require('chai').expect;
const correctPassword = 'test123456';

describe('Login and Logout', function() {
  it('Login With Correct Username & Password', function() {
    browser.url('./');
    browser.alertAccept();

    browser.click('#bt-login');
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.setValue('#password', correctPassword);
    browser.click('#submitButtonInLogin');
    browser.pause(2000);
    let linkAfterLogin = browser.getUrl();
    expect(linkAfterLogin).to.equal('http://localhost:8080/');
  });

  it('Logout', function() {
    browser.click('#dropdown-basic-0');
    browser.keys('Down arrow');
    browser.keys('Down arrow');
    browser.keys('Down arrow');
    browser.keys('Enter');
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
})
