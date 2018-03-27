#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt

echo "test 5: get item invalid itemid: expect to fail"
node ~/BoilerX/backend-api/test/test-item/json-generator.js f get id
serverless invoke local -f get_item_by_id -p ~/BoilerX/backend-api/mocks/update-item/fail_with_invalid_id.json > $outFile
if grep -q 'Item not found.' "$outFile"; then
  echo "        success: invalid itemId detected;"
  else
    echo "      failure: invalid itemId not detected"
fi

rm $outFile

exit 0