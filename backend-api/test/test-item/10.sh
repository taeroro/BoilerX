#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 10: update popularity: expect to succeeed"
aws dynamodb put-item --table-name Item --item file://~/BoilerX/backend-api/test/test-item/test_item.json
node ~/BoilerX/backend-api/test/test-item/json-generator.js s update empty
serverless invoke local -f update_popularity -p ~/BoilerX/backend-api/mocks/update-item/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid item updated in database"
  else
    echo "      failure: item not updated in database"
fi

aws dynamodb delete-item --table-name Item --key file://~/BoilerX/backend-api/test/test-item/test_item_key.json
rm $outFile

exit 0