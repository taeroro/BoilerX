#!/bin/bash

outFile=~/BoilerX/backend-api/test/tmp.txt
numFile=~/BoilerX/backend-api/test/num.txt

echo "test 6: get items for valid user: expect to succeeed"
a=0
until [ $a -eq 3 ]
do
    a=`expr $a + 1`
    node ~/BoilerX/backend-api/test/test-profile/user_item-generator.js $a
    aws dynamodb put-item --table-name Item --item file://~/BoilerX/backend-api/test/test-profile/user_item.json   
done
node ~/BoilerX/backend-api/test/test-profile/json-generator.js s empty
serverless invoke local -f get_user_by_id -p ~/BoilerX/backend-api/mocks/update-user/success_with_empty.json > $outFile
grep -o 'itemId' "$outFile" | wc -l > $numFile 

if [ $(<$numFile) -eq 3 ]; then
  echo "        success: all items of the user returned"
  else
    echo "      failure: incorrect"
fi

b=0
until [ $b -eq 3 ]
do
    b=`expr $b + 1`
    aws dynamodb delete-item --table-name Item --key=$b
done
rm $outFile
rm $numFile

exit 0