#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 5: update user profile empty req body: expect to succeeed"
node json-generator.js s empty
serverless invoke local -f update_profile -p ~/BoilerX/backend-api/mocks/update-user/success_with_empty.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid user profile gotten"
  else
    echo "      failure: not getting valid user profile"
fi

rm $outFile

exit 0