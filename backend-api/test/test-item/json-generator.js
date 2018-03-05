let fs = require('fs');
let randGen = require("../random-generators.js");

function gen() {
    let args = process.argv.slice(2);
    if (args[1] == 's') {
        if (args.length > 2) {
            gen_success(args[0], args[2]);
        }
        else gen_success(args[0], 'false');
    }
    else {
        gen_fail(args[0], args[2]);
    }
    return;
}

function gen_success(method, empty) {
    let body = {};
    let filename = '/home/ling/BoilerX/backend-api/mocks/';
    switch (method) {
        case 'post':
            body = {
                name: randGen.userName(),
                category: randGen.bool() ? randGen.category() : null,
                subject: randGen.bool() ? randGen.subject() : null,
                price: randGen.price(),
                crn: randGen.bool() ? randGen.crn : null,
                descr: randGen.bool() ? randGen.userName(500) : null,
                tag: randGen.bool() ? randGen.tags() : null,
                imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
            };
            filename += 'post-item/success.json';
            break;
        case 'update':
        case 'get':
            if (empty === 'empty') {
                filename += 'update-item/success_with_empty.json';
            }
            else {
                body = {
                    name: randGen.bool() ? randGen.userName() : null,
                    category: randGen.bool() ? randGen.category() : null,
                    subject: randGen.bool() ? randGen.subject() : null,
                    price: randGen.bool() ? randGen.price() : null,
                    crn: randGen.bool() ? randGen.crn : null,
                    descr: randGen.bool() ? randGen.userName(500) : null,
                    tag: randGen.bool() ? randGen.tags() : null,
                    imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
                };
            }
            filename += 'update-item/success.json';
            break;
        case 'delete':
            break;
    }
    
    let output = {
        body: JSON.stringify(body),
        pathParameters: {
            itemID: 'test-mush'
        },
        requestContext: {
            identity: {
                cognitoIdentityId: "USER-SUB-1234"
            }
        }
    }

    fs.writeFile(filename, JSON.stringify(output),
    // callback function that is called after writing file is done
    function(err) {        
        if (err) throw err;
    });
    return;
}

function gen_fail (method, location) {
    let body = {};
    let filename = '/home/ling/BoilerX/backend-api/mocks/';
    let id = 'test-mush';
    if (location === 'id' || method === 'delete') {
        id = randGen.userID();
        filename += 'update-item/fail_with_invalid_id.json'
    }
    if (method === 'post') {
        body = {
            name: randGen.userName(),
            category: randGen.bool() ? randGen.category() : null,
            subject: randGen.bool() ? randGen.subject() : null,
            price: randGen.price(),
            crn: randGen.bool() ? randGen.crn : null,
            descr: randGen.bool() ? randGen.userName(500) : null,
            tag: randGen.bool() ? randGen.tags() : null,
            imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
        };
    
        if (location === 'require') {
            filename += 'post-item/fail_with_missing.json';
            switch (randGen.index(2)) {
                case 0:
                    body.name = null;
                    break;
                case 1:
                    body.price = null;
                    break;
                default:
                    console.log('random generator index not function correctly')
            }
        }
        if (location === 'body') {
            filename += 'post-item/fail_with_invalid_body.json';
            switch (randGen.index(2)) {
                case 0:
                    body.price = randGen.userName(2);
                    break;
                case 1:
                    body.crn = randGen.userName(5);
                    break;
                default:
                    console.log('random generator index not function correctly')
            }
        }
        
    }

    else {
        filename += 'update_item/fail_with_invalid_body.json';
        let body = {
            name: randGen.bool() ? randGen.userName() : null,
            category: randGen.bool() ? randGen.category() : null,
            subject: randGen.bool() ? randGen.subject() : null,
            price: randGen.bool() ? randGen.price() : null,
            crn: randGen.bool() ? randGen.crn : null,
            descr: randGen.bool() ? randGen.userName(500) : null,
            tag: randGen.bool() ? randGen.tags() : null,
            imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
        };
        if (location === 'body') {
            switch (randGen.index(2)) {
                case 0:
                    body.price = randGen.userName(2);
                    break;
                case 1:
                    body.crn = randGen.userName(5);
                    break;
                default:
                    console.log('random generator index not function correctly')
            }
        }
    }
    
    
    let output = {
        body: JSON.stringify(body),
        pathParameters: {
            itemID: id
        },
        requestContext: {
            identity: {
                cognitoIdentityId: "USER-SUB-1234"
            }
        }
    }
    fs.writeFile(filename, JSON.stringify(output),
    // callback function that is called after writing file is done
    function(err) {        
        if (err) throw err;
    });
    return;
}

gen();