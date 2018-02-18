#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 1: get items for homepage: expect to succeeed"
serverless invoke local -f get_items -p ~/BoilerX/backend-api/mocks/search-items/success.json > $outFile
if grep -q 'popularity'  "$outFile" ; then
  echo "        success: items get for homepage"
  else
    echo "      failure: no items got for homepage"
fi
rm $outFile
exit 0