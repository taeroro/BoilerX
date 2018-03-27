let fs = require('fs');
let randGen = require("../random-generators.js");

function gen() {
    let args = process.argv.slice(2);
    if (args[0] == 's') {
        gen_success(args[1], args[2]);
    }
    else {
        gen_fail(args[1], args[2]);
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
                sellerId: randGen.userID(), 
                sellerImg: 'http://' + randGen.userName(),
                sellerName: randGen.category(),
                sellerEmail: randGen.subject(),
                price: randGen.price(),
                descr: randGen.bool() ? randGen.userName(100) : null,
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
                    sellerName: randGen.bool() ? randGen.category() : null,
                    sellerEmail: randGen.bool() ? randGen.subject() : null,
                    sellerImg: randGen.bool() ? randGen.category() : null,
                    price: randGen.bool() ? randGen.price() : null,
                    descr: randGen.bool() ? randGen.userName(100) : null,
                    imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
                };
                filename += 'update-item/success.json';
            }
            
            break;
        default:
            break;
    }
    
    let output = {
        pathParameters: {
            itemID: 'test-mush'
        },
        body: JSON.stringify(body),
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
    if (location === 'id') {
        id = randGen.userID();
        filename += 'update-item/fail_with_invalid_id.json';
        let invalid_key = {
            userId: {
                S: id
            }
        };
        fs.writeFile('/home/ling/BoilerX/backend-api/test/test-item/test_item_invalid_key.json', JSON.stringify(invalid_key),
        function(err) {        
            if (err) throw err;
        });
    }
    else if (method === 'post') {
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
        filename += 'update-item/fail_with_invalid_body.json';
        body = {
            name: randGen.bool() ? randGen.userName() : null,
            category: randGen.bool() ? randGen.category() : null,
            subject: randGen.bool() ? randGen.subject() : null,
            price: randGen.userName(2),
            descr: randGen.bool() ? randGen.userName(500) : null,
            imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
        };
    }
    
    
    let output = {
        pathParameters: {
            itemID: id
        },
        body: JSON.stringify(body),
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