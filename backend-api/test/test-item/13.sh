#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 13: delete item: expect to fail"
node ~/BoilerX/backend-api/test/test-item/json-generator.js f update id
serverless invoke local -f delete_item -p ~/BoilerX/backend-api/mocks/update-item/success.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid item detected in database"
  else
    echo "      failure: invalid id not detected"
fi

rm $outFile

exit 0