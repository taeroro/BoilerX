#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 4: get profile invalid user: expect to fail"
node ~/BoilerX/backend-api/test/test-profile/json-generator.js f id
serverless invoke local -f get_user_by_id -p ~/BoilerX/backend-api/mocks/update-user/fail_with_invalid_id.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid userId detected;"
  else
    echo "      failure: invalid userId not detected"
fi

rm $outFile

exit 0