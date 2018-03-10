#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 2: update user profile empty req body: expect to succeeed"
node json-generator.js s empty
serverless invoke local -f update_profile -p ~/BoilerX/backend-api/mocks/update-user/success_with_empty.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid user profile updated in database"
  else
    echo "      failure: user profile not updated in database"
fi

rm $outFile

exit 0