#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 7: get item by valid owner: expect to succeeed"
node json-generator.js get s empty
serverless invoke local -f get_items_by_user -p ~/BoilerX/backend-api/mocks/update-item/success_with_empty.json > $outFile
if grep -q 'Attributes' "$outFile"; then
  echo "        success: valid item gotten"
  else
    echo "      failure: not getting valid item"
fi

rm $outFile

exit 0