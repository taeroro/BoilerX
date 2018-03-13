const expect = require('chai').expect;
const correctPassword = 'test123456';

describe('Edit Profile', function() {
  it('Login With Correct Username & Password', function() {
    browser.url('./');
    browser.alertAccept();

    browser.click('#bt-login');
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.setValue('#password', correctPassword);
    browser.click('#submitButtonInLogin');
    browser.pause(5000);

  });

  it('Go to Profile Page', function() {
    browser.click('#dropdown-basic-0');
    browser.click('#bt-profile');
  });

  it('Change Username & Profile Picture', function() {
    browser.pause(5000);

    browser.setValue('#username', 'testing user');

    browser.chooseFile('#file','/Users/monika/Downloads/monika.jpg');

    browser.pause(3000);

    browser.click('#submitButtonSave');
  });

  it('Check Updated Information', function() {
    browser.pause(5000);
    var val = browser.getValue('#username')
    expect(val).to.equal('testing user');
  });

  it('Change Username & Profile Picture Back', function() {
    browser.pause(5000);

    browser.setValue('#username', 'monika');

    browser.chooseFile('#file','/Users/monika/Downloads/monika.jpg');

    browser.pause(3000);

    browser.click('#submitButtonSave');
  });

  it('Check Updated Information', function() {
    browser.pause(5000);
    var val = browser.getValue('#username')
    expect(val).to.equal('monika');
  });



})
