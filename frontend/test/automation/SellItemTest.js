const expect = require('chai').expect;
const correctPassword = 'test123456';

describe('Sell Item', function() {
  it('Login With Correct Username & Password', function() {
    browser.url('./');
    browser.alertAccept();

    browser.click('#bt-login');
    browser.setValue('#email', 'meng46@purdue.edu');
    browser.setValue('#password', correctPassword);
    browser.click('#submitButtonInLogin');
    browser.pause(5000);

  });

  it('Go to Sell Item Page', function() {
    browser.click('#dropdown-basic-0');
    browser.click('#bt-sell');
  });

  it('Add name, price, description, and item picture', function() {
    browser.pause(5000);

    browser.setValue('#name', 'testing item');
    browser.setValue('#price', '10');
    browser.setValue('#descr', 'testing item Description');

    browser.chooseFile('#file','/Users/monika/Downloads/monika.jpg');

    browser.pause(3000);

    browser.click('#submitButtonSave');

    browser.pause(5000);
  });

  it('Search Item Sold', function() {
    browser.setValue('#searchBar', 'testing item');
    browser.keys("Enter");
    browser.pause(5000);

    browser.click('.SPItemContainer');
    expect('.backButton').to.exist;
  });

  it('Go to Edit Item', function() {
    browser.click('#dropdown-basic-0');
    browser.click('#bt-profile');
    browser.click('#bt-sell-item');
    browser.pause(5000);
    browser.click('#edit_item_btn');
  });

  it('Edit Item', function() {
    browser.pause(5000);

    browser.setValue('#name', 'Editing item');

    browser.pause(3000);

    browser.click('#submitButtonSave');

    browser.pause(5000);
  });
/*
  it('Search Edited Item', function() {
    //browser.url('http://localhost:8080/')
    //browser.pause(5000);
    browser.setValue('#searchBar', 'Editing item');
    browser.keys("Enter");
    browser.pause(7000);

    browser.click('.SPItemContainer');
    expect('.backButton').to.exist;
  });
*/
  it('Go to Edit Item to Delete the Item', function() {
    browser.click('#dropdown-basic-0');
    browser.click('#bt-profile');
    browser.click('#bt-sell-item');
    browser.pause(5000);
    browser.click('#edit_item_btn');
  });

  it('Delete Item', function() {
    browser.pause(3000);
    browser.click('#submitButtonDelete');
    browser.pause(5000);

  });

  it('Check if item is deleted', function() {
    browser.pause(2000);
    browser.click('#dropdown-basic-0');
    browser.click('#bt-profile');
    browser.click('#bt-sell-item');
  })



})
