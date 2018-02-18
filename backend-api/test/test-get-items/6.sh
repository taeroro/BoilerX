#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

serverless invoke local -f get_items_popularity -p ~/BoilerX/backend-api/mocks/search-items/success-with-uppercase.json > $outFile

echo "test 6: get items popularity uppercase: expect to succeeed"
if grep -q 'itemID' "$outFile"; then
  echo "        success: uppercase in attribute values identified"
  else
    echo "      failure: uppercase in attribute values not identified"
fi


rm $outFile
exit 0