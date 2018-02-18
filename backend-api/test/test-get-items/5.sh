#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt
numFile=~/BoilerX/backend-api/test/num.txt

echo "test 5: get searched items by price: expect to succeed"
serverless invoke local -f get_items_price -p ~/BoilerX/backend-api/mocks/search-items/success.json > $outFile

if grep -q '\"statusCode\": 200,' "$outFile"; then
  grep -o 'price\\\":'[[:digit:]] $outFile > $numFile

  pop1=$(awk '$1 ~ /[:digit:]/{i++}i==1' $numFile | grep -o [[:digit:]])

  pop2=$(awk '$1 ~ /[:digit:]/{i++}i==2' $numFile | grep -o [[:digit:]])
  pop3=$(awk '$1 ~ /[:digit:]/{i++}i==3' $numFile | grep -o [[:digit:]])
  rm $numFile
  if [ $pop1 -le $pop2 ] && [ $pop2 -le $pop3 ]; then
    echo "        success: items returned in price order"
  else
    echo "      failure: items returned in wrong order"
  fi
else 
  echo "      failure: no items got"
fi

rm $outFile
exit 0