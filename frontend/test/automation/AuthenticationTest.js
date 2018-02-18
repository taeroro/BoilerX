const expect = require('chai').expect;

describe('Login and Logout', function() {
  it('Login With Correct Username & Password', function() {
    browser.url('./');

    browser.click('#bt-login');
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.setValue('#password', 'monikamonika123');
    browser.click('#submitButtonInLogin');
    browser.pause(2000);
    let linkAfterLogin = browser.getUrl();
    expect(linkAfterLogin).to.equal('http://localhost:8080/');
  });

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
})
