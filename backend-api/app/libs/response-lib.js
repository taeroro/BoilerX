export function success(body) {
  return buildResponse(200, body);
}
export function success2(body) {
  return buildResponse2(200, body);
}

export function failure(body) {
  return buildResponse(500, body);
}
export function failure2(body) {
  return buildResponse2(500, body);
}
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
function buildResponse2(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "origin, content-type, accept",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    },
    body: JSON.stringify(body)
  };
}