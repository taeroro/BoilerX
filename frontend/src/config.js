export default {
  MAX_ATTACHMENT_SIZE: 5000000,

  s3: {
    BUCKET: "boilerx-app"
  },

  apiGateway: {
    REGION: "us-east-1",
    URL: "https://lnzx10i4dk.execute-api.us-east-1.amazonaws.com/dev"
  },

  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_i1lUKtWxJ",
    APP_CLIENT_ID: "6bknk98l76pirugi87micmtch6",
    IDENTITY_POOL_ID: "us-east-1:8fc0b1ac-fe9b-4308-9747-04ee4222f4c8"
  }
};
