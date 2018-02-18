#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt
numFile=~/BoilerX/backend-api/test/num.txt

serverless invoke local -f get_items_price -p ~/BoilerX/backend-api/mocks/search-items/success-hight-price-range.json > $outFile

echo "test 9: get items price (price in range): expect to succeeed"
grep -o 'valuable' "$outFile" | grep -c 'valuable' > $numFile 
cat $numFile
if [ $(<$numFile) -eq 2 ]; then
  echo "        success: only items in the range returned"
  else
    echo "      failure: incorrect"
fi


rm $outFile
rm $numFile
exit 0