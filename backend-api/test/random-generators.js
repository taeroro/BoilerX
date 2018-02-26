import uuid from "uuid";
import randomString from "randomstring";

let userID = function () {
    return uuid.v1();
};

let userName = function (len) {
    return randomString({
        length: len,
        charset: 'alphanumeric'
    });
};

let email = function (len) {
    return randomString({
        length: len,
        charset: 'alphanumeric'
    }) + '@test.cc';
};

let pass = function (len) {
    return randomString({
        length: len,
        charset: '[a-zA-Z0-9,.?!@#%*]'
    });
};

let category = function () {
    let cats = [
        'book',
        'clothing and shoes',
        'electronics',
        'home',
        'stationaries',
        'sports'
    ];
    //generate 0 - 5
    return cats[Math.floor(Math.random() * 6)];
};

let subject = function () {
    let subs = [
        'accounting',
        'art',
        'biology',
        'chemistry',
        'computer science',
        'engineering',
        'finance',
        'geometry',
        'history',
        'literature',
        'management',
        'others'
    ];
    //generate 0 - 11
    return subs[Math.floor(Math.random() * 12)];
};

let crn = function () {
    //generate (100 to 600)*100
    return (Math.floor(Math.random() * 501) + 100) * 100;
};

let tags = function () {
    // generate 0 - 21 tags
    let numOfTag = Math.floor(Math.random() * 21);
    let arr = [];
    for (let i = 0; i < numOfTag; i++) {
        arr.push(randomString({
            length: len,
            charset: 'alphabetic',
            capitalization: 'lowercase'
        }));
    }
    return arr;
};

let price = function () {
    //generate 0 - 2000
    return Math.random() * 2000;
};

let bool = function () {
    return Math.random() >= 0.5;
}

module.exports = {
    userID,
    userName,
    email, 
    pass,
    category,
    subject,
    crn,
    tags,
    price,
    bool
}