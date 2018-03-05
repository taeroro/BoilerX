#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 8: post item invalid attribute: expect to fail"
node json-generator.js get f body
serverless invoke local -f post_item -p ~/BoilerX/backend-api/mocks/update_item/fail_with_invalid_body.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid attribute detected;"
  else
    echo "      failure: invalid attribute not detected"
fi

rm $outFile

exit 0