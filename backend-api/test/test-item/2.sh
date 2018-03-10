#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 2: update item empty req body: expect to succeeed"
node json-generator.js update s empty
serverless invoke local -f update_item -p ~/BoilerX/backend-api/mocks/update-item/success_with_empty.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid item updated in database"
  else
    echo "      failure: item not updated in database"
fi

rm $outFile

exit 0