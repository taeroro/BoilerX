#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 13: delete item: expect to change nothing with a non-existing id"
initial_count=$(aws dynamodb scan --table-name Item --select COUNT | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//')

node ~/BoilerX/backend-api/test/test-item/json-generator.js f update id
serverless invoke local -f delete_item -p ~/BoilerX/backend-api/mocks/update-item/success.json > $outFile
if grep -q '\"statusCode\": 200,' "$outFile"; then
  current_count=$(aws dynamodb scan --table-name Item --select COUNT | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//')
  
  if [ $initial_count -eq $current_count ]; then
    echo "        success: invalid item not deleted in database"
    else
      echo "      failure: delete items when shouldn\'t"
  fi
  else
    echo "      failure: internal error"
fi

rm $outFile

exit 0