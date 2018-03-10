import AWS from "aws-sdk";

export default function send() {
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region
  AWS.config.update({region: 'us-east-1'});

  // Create sendEmail params
  var params = {
   Destination: { /* required */
     CcAddresses: [

       /* more items */
     ],
     ToAddresses: [
       'meng46@purdue.edu',
       /* more items */
     ]
   },
   Message: { /* required */
     Body: { /* required */
       Html: {
        Charset: "UTF-8",
        Data: "TESTING"
       },
       Text: {
        Charset: "UTF-8",
        Data: "TESTING TEXT BODY"
       }
      },
      Subject: {
       Charset: 'UTF-8',
       Data: 'Test email'
      }
     },
   Source: 'schewshu@purdue.edu', /* required */
   ReplyToAddresses: [
       'schewshu@purdue.edu',
     /* more items */
   ],
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
   function(data) {
     console.log(data.MessageId);
     alert("The seller has been notified via email with the your contact information!");
   }).catch(
     function(err) {
     console.error(err, err.stack);
   });

  return;
 }
