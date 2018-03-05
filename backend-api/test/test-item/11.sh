#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 5: get item invalid user id: expect to fail"
node json-generator.js get f id
serverless invoke local -f get_items_by_user -p ~/BoilerX/backend-api/mocks/update_item/fail_with_invalid_id.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid user Id detected;"
  else
    echo "      failure: invalid user Id not detected"
fi

rm $outFile

exit 0