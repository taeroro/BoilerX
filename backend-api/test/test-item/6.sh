#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 6: get item valid id: expect to succeeed"
aws dynamodb put-item --table-name Item --item file://~/BoilerX/backend-api/test/test-item/test_item.json
node ~/BoilerX/backend-api/test/test-item/json-generator.js s get empty
serverless invoke local -f get_item_by_id -p ~/BoilerX/backend-api/mocks/update-item/success_with_empty.json > $outFile
if grep -q 'body' "$outFile"; then
  echo "        success: valid item gotten"
  else
    echo "      failure: not getting valid item"
fi

aws dynamodb delete-item --table-name Item --key file://~/BoilerX/backend-api/test/test-item/test_item_key.json
rm $outFile

exit 0