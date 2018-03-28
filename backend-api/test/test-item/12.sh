#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 12: delete item: expect to succeeed"
aws dynamodb put-item --table-name Item --item file://~/BoilerX/backend-api/test/test-item/test_item.json
node ~/BoilerX/backend-api/test/test-item/json-generator.js s update fal
serverless invoke local -f delete_item -p ~/BoilerX/backend-api/mocks/update-item/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid item deleted in database"
  else
    echo "      failure: item not deleted in database"
    aws dynamodb delete-item --table-name Item --key file://~/BoilerX/backend-api/test/test-item/test_item_key.json
fi

rm $outFile

exit 0