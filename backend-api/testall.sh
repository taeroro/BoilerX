#!/bin/bash
outFile=~/BoilerX/backend-api/tmp.txt
counterFile=~/BoilerX/backend-api/counter.txt
dir=./test/*/*.sh
totalcase="0"
passcase="0"

echo "----------------test all start----------------"
for test in $dir
do
    echo "======$test======"
    $test | tee $outFile
    
    grep -c 'expect' "$outFile" > $counterFile
    ((totalcase += $(<$counterFile)))
    grep -c 'success' "$outFile" > $counterFile
    ((passcase += $(<$counterFile)))
done
echo "----------------test all end----------------"
echo "total: $totalcase; passed: $passcase"

rm $outFile
rm $counterFile
exit 0
