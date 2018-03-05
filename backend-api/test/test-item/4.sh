#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 4: update item invalid item attribute: expect to fail"
node json-generator.js update f body
serverless invoke local -f update_item -p ~/BoilerX/backend-api/mocks/update-item/fail_with_invalid_body.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid item attribute detected;"
  echo "                 invalid item not saved to database"
  else
    echo "      failure: invalid item attribute not detected"
fi

rm $outFile

exit 0