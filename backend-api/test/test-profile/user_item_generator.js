let fs = require('fs');
function gen(item) {
    console.log('a')
    let output = {
        itemID:{S: item},
        name:{S: "test-item"},
        price:{N: "3000"},
        sellerId: {S: "USER-SUB-1234"},
        sellerName: {S: "test-item"},
        sellerEmail: {S: "test-item"},
        sellerImg: {S: "test-item"},
        popularity: {N: "300"}
    };

    fs.writeFile('/home/ling/BoilerX/backend-api/test/test-profile/user_item.json', JSON.stringify(output),
    // callback function that is called after writing file is done
    function(err) {        
        if (err) throw err;
    });
    return;
}

gen(process.argv[2]);