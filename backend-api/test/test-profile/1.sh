#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 1: update user profile: expect to succeeed"
aws dynamodb put-item --table-name User --item file://~/BoilerX/backend-api/test/test-profile/test_user.json
node ~/BoilerX/backend-api/test/test-profile/json-generator.js s
serverless invoke local -f update_profile -p ~/BoilerX/backend-api/mocks/update-user/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid user profile updated in database"
  else
    echo "      failure: user profile not updated in database"
fi
aws dynamodb delete-item --table-name User --key file://~/BoilerX/backend-api/test/test-profile/test_user_key.json
rm $outFile


exit 0