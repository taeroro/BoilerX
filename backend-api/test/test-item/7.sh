#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 7: post item valid id: expect to succeeed"
node json-generator.js post s
serverless invoke local -f post_item_by_id -p ~/BoilerX/backend-api/mocks/update-item/success.json > $outFile
if grep -q 'Attributes' "$outFile"; then
  echo "        success: item saved to db"
  else
    echo "      failure: valid item not saved"
fi

rm $outFile

exit 0