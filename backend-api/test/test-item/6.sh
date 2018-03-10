#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 6: get item valid id: expect to succeeed"
node json-generator.js get s empty
serverless invoke local -f get_item_by_id -p ~/BoilerX/backend-api/mocks/update-item/success_with_empty.json > $outFile
if grep -q 'Attributes' "$outFile"; then
  echo "        success: valid item gotten"
  else
    echo "      failure: not getting valid item"
fi

rm $outFile

exit 0