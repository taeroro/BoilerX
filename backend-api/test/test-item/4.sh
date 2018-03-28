#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 4: update item invalid item attribute: expect to fail"
aws dynamodb put-item --table-name Item --item file://~/BoilerX/backend-api/test/test-item/test_item.json
node ~/BoilerX/backend-api/test/test-item/json-generator.js f update body
serverless invoke local -f update_item -p ~/BoilerX/backend-api/mocks/update-item/fail_with_invalid_body.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid item attribute detected;"
  echo "                 invalid item not saved to database"
  else
    echo "      failure: invalid item attribute not detected"
fi

aws dynamodb delete-item --table-name Item --key file://~/BoilerX/backend-api/test/test-item/test_item_key.json
rm $outFile

exit 0