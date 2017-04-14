#!/usr/bin/env bash
rm index.zip
cd lambda 
zip -r ../index.zip *
cd .. 
aws lambda update-function-code --function-name WhatsForLunchAlexa --zip-file fileb://index.zip --profile louise