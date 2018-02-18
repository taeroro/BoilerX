#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt


echo "test 2: save user to db: expect to fail"
serverless invoke local -f insert_user -p ~/BoilerX/backend-api/mocks/create-user/fail-with-missing.json > $outFile
if grep -q 'missing required parameters' "$outFile"; then
  echo "        success: missing required parameters detected;"
  echo "                 invalid user not saved to database"
  else
    echo "      failure: missing required parameters not detected"
fi

rm $outFile

exit 0