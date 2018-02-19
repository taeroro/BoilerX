#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 10: get items price (invalid attribute): expect to fail"
serverless invoke local -f get_items_price -p ~/BoilerX/backend-api/mocks/search-items/fail-with-invalid-price.json > $outFile
if grep -q '\"statusCode\": 500,'  "$outFile" ; then
  echo "        success: invalide attribute identified"
  else
    echo "      failure: invalide attribute not identified"
fi
rm $outFile
exit 0