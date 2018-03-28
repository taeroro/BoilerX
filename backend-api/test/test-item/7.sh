#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 7: post item valid id: expect to succeeed"
node ~/BoilerX/backend-api/test/test-item/json-generator.js s post fal
serverless invoke local -f post_item -p ~/BoilerX/backend-api/mocks/post-item/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: item saved to db"
  else
    echo "      failure: valid item not saved"
fi

rm $outFile

exit 0