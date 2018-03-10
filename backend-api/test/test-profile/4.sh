#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 4: get profile invalid user: expect to fail"
node json-generator.js f id
serverless invoke local -f get_profile -p ~/BoilerX/backend-api/mocks/update_profile/fail_with_invalid_id.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid userId detected;"
  else
    echo "      failure: invalid userId not detected"
fi

rm $outFile

exit 0