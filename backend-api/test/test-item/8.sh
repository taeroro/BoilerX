#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 8: post item invalid attribute: expect to fail"
node ~/BoilerX/backend-api/test/test-item/json-generator.js f post body
serverless invoke local -f post_item -p ~/BoilerX/backend-api/mocks/post-item/fail_with_invalid_body.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid attribute detected;"
  else
    echo "      failure: invalid attribute not detected"
fi

rm $outFile

exit 0