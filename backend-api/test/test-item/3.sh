#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 3: update item invalid item id: expect to fail"
node json-generator.js update f id
serverless invoke local -f update_item -p ~/BoilerX/backend-api/mocks/update-item/fail_with_invalid_id.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid itemId detected;"
  echo "                 invalid item not saved to database"
  else
    echo "      failure: invalid itemId not detected"
fi

rm $outFile

exit 0