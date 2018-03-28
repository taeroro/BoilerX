#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt
numFile=~/BoilerX/backend-api/test/num.txt

serverless invoke local -f get_items -p ~/BoilerX/backend-api/mocks/search-items/success.json > $outFile

echo "test 2: get items for homepage: expect to succeeed"
grep -o 'popularity' "$outFile" | grep -c 'popularity' > $numFile 
if [ $(<$numFile) -eq 2 ]; then
  echo "        success: 2 items get for homepage"
  else
    echo "      failure: incorrect number of items for homepage"
fi


rm $outFile
rm $numFile
exit 0