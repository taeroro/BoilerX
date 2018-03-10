#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 9: post item missing attribute: expect to fail"
node json-generator.js get f require
serverless invoke local -f post_item -p ~/BoilerX/backend-api/mocks/update_item/fail_with_missing.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: missing attribute detected;"
  else
    echo "      failure: missing attribute not detected"
fi

rm $outFile

exit 0