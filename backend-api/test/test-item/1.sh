#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 1: update item: expect to succeeed"
node json-generator.update js s
serverless invoke local -f update_item -p ~/BoilerX/backend-api/mocks/update-item/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid item updated in database"
  else
    echo "      failure: item not updated in database"
fi

rm $outFile

exit 0