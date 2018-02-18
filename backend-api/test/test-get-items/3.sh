#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt
numFile=~/BoilerX/backend-api/test/num.txt

echo "test 3: get homepage items by popularity: expect to succeed"
serverless invoke local -f get_items -p ~/BoilerX/backend-api/mocks/search-items/success.json > $outFile

if grep -q '\"statusCode\": 200,' "$outFile"; then
  grep -o 'popularity\\\":'[[:digit:]] $outFile > $numFile

  pop1=$(awk '$1 ~ /[:digit:]/{i++}i==1' $numFile | grep -o [[:digit:]])

  pop2=$(awk '$1 ~ /[:digit:]/{i++}i==2' $numFile | grep -o [[:digit:]])
  pop3=$(awk '$1 ~ /[:digit:]/{i++}i==3' $numFile | grep -o [[:digit:]])
  rm $numFile
  if [ $pop1 -ge $pop2 ] && [ $pop2 -ge $pop3 ]; then
    echo "        success: items returned in popularity order"
  else
    echo "      failure: items returned in wrong order"
  fi
else 
  echo "      failure: no items got"
fi

rm $outFile
exit 0