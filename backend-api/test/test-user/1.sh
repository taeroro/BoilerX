#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 1: save user to db: expect to succeeed"
serverless invoke local -f insert_user -p ~/BoilerX/backend-api/mocks/create-user/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  echo "        success: valid user saved in database"
  else
    echo "      failure: user not saved in database"
fi

rm $outFile

exit 0