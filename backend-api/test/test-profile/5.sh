#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 5: get profile valid user: expect to succeeed"
aws dynamodb put-item --table-name User --item file://~/BoilerX/backend-api/test/test-profile/test_user.json
node ~/BoilerX/backend-api/test/test-profile/json-generator.js s empty
serverless invoke local -f get_user_by_id -p ~/BoilerX/backend-api/mocks/update-user/success_with_empty.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid user profile gotten"
  else
    echo "      failure: not getting valid user profile"
fi
aws dynamodb delete-item --table-name User --key file://~/BoilerX/backend-api/test/test-profile/test_user_key.json
rm $outFile

exit 0