let fs = require('fs');

let randGen = require("../random-generators.js");

function gen() {
    let args = process.argv.slice(2);
    if (args[0] == 's') {
        if (args.length > 1) {
            gen_success(args[1]);
        }
        else gen_success('false');
    }
    else {
        gen_fail(args[1]);
    }
    return;
}

function gen_success(empty) {
    let body = {};
    let filename = '/home/ling/BoilerX/backend-api/mocks/update-user/success';
    if (empty === empty) {
        filename += '_with_empty.json';
    }
    else {
        body = {
            username: randGen.bool() ? randGen.userName() : null,
            imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
        };
        filename += '.json';
    }

    let output = {
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

function gen_fail (location) {
    let body = {};
    if (location !== 'body') {
        body = {
            username: randGen.bool() ? randGen.userName() : null,
            imageURL: randGen.bool() ? 'http://' + randGen.userName() : null
        };
    }
    let id = "USER-SUB-1234";
    if (location === 'id') {
        id = randGen.userID();
    }
    let output = {
        body: JSON.stringify(body),
        requestContext: {
            identity: {
                cognitoIdentityId: id
            }
        }
    }
    fs.writeFile('/home/ling/BoilerX/backend-api/mocks/update-user/fail_with_invalid_'+location+'.json', JSON.stringify(output),
    // callback function that is called after writing file is done
    function(err) {        
        if (err) throw err;
    });
    return;
}

gen();