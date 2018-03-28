#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 3: update profile invalid user: expect to fail"
node ~/BoilerX/backend-api/test/test-profile/json-generator.js f id
serverless invoke local -f update_profile -p ~/BoilerX/backend-api/mocks/update-user/fail_with_invalid_id.json > $outFile
if grep -q '\"statusCode\": 500,' "$outFile"; then
  echo "        success: invalid userId detected;"
  echo "                 invalid user not saved to database"
  else
    echo "      failure: invalid userId not detected"
    aws dynamodb delete-item --table-name User --key file://~/BoilerX/backend-api/test/test-profile/test_user_invalid_key.json
fi

rm $outFile

exit 0