const expect = require('chai').expect;

describe('Sign Up', function() {
  it('Sign Up With Non-purdue Email', function() {
    browser.url('./');
    browser.alertAccept();

    browser.click('#bt-signup');
    browser.setValue('#email', 'meng46@gmail.com');
    browser.setValue('#password', 'monikamonika123');
    browser.setValue('#confirmPassword', 'monikamonika123');
    browser.click('#submitButtonSignup');
    browser.alertAccept();
    browser.pause(2000);
  });


  it('Sign Up With Purdue Email', function() {
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.click('#submitButtonSignup');
  });

})
