(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * @apiDefine body parameter from request body
 */
/**
 * @api {post} /content/post post an item for sell.
 * @apiName postItem
 * @apiGroup content
 * @apiParam (body) {String} itmeID Unique item id assigned when the item is posted.
 * @apiParam (body) {String} [name] Name of the item.
 * @apiParam (body) {String} [category] Category of the item. later we shall predefine our categories.
 * @apiParam (body) {String} [subject] Subject of the item.
 * @apiParam (body) {String} [sellerName] Seller's name. Please call user/current to get the username.
 * @apiParam (body) {String} [price] Price of the item.
 * @apiParam (body) {Number} [crn] CRN of the class of which use the book.
 * @apiParam (body) {String} [imageURL] url of the image in S3 bucket.
 * @apiParam (body) {String} [descr] Description of the item.
 * @apiParam (body) {String[]} [tags] Array of tags of the item.
 * 
 * @apiSuccess {JSON} status true
 * @apiSuccess {JSON} status false
 */
var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var data, update_expr, params, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Request body is passed in as a JSON encoded string in 'event.body'
            data = JSON.parse(event.body);
            update_expr = "SET #name = :name, ";

            update_expr += "#searchName = :searchName, ";
            update_expr += "#category = :category, ";
            update_expr += "#subject = :subject, ";
            update_expr += "#price = :price, ";
            update_expr += "#crn = :crn, ";
            update_expr += "#imageURL = :imageURL, ";
            update_expr += "#descr = :descr, ";
            update_expr += "#tags = :tags";
            params = {
              TableName: "Item",
              // 'Key' defines the partition key and sort key of the item to be updated
              Key: {
                itemID: event.pathParameters.itemID
              },
              ConditionExpression: 'itemID = :itemIDVal',
              UpdateExpression: update_expr,
              ExpressionAttributeNames: {
                "#name": "name",
                "#searchName": ":searchName",
                "#category": "category",
                "#subject": "subject",
                "#price": "price",
                "#crn": "crn",
                "#imageURL": "imageURL",
                "#descr": "descr",
                "#tags": "tags"
              },
              ExpressionAttributeValues: {
                ":itemIDVal": event.pathParameters.itemID,
                ":name": data.name ? data.name : null,
                ":searchName": data.name ? String(data.name).toLowerCase() : null,
                ":category": data.category ? String(data.category).toLowerCase() : null,
                ":subject": data.subject ? String(data.subject).toLowerCase() : null,
                ":price": data.price ? Number(data.price) : null,
                ":crn": data.crn ? Number(data.crn) : null,
                ":imageURL": data.imageURL ? data.imageURL : null,
                ":descr": data.descr ? data.descr : null,
                ":tags": data.tags ? dynamoDbLib.createSet(data.tags) : null
              },
              ReturnValues: "ALL_NEW"
            };


            console.log(params);
            _context.prev = 12;
            _context.next = 15;
            return dynamoDbLib.call("update", params);

          case 15:
            result = _context.sent;

            //console.log(result);
            callback(null, (0, _responseLib.success)(result));
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](12);

            console.log(_context.t0);
            callback(null, (0, _responseLib.failure)({ status: false }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 19]]);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _dynamodbLib = __webpack_require__(3);

var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

var _responseLib = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = call;

var _awsSdk = __webpack_require__(4);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: "us-east-1" });

function call(action, params) {
  var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(6);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.success2 = success2;
exports.failure = failure;
exports.failure2 = failure2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
  return buildResponse(200, body);
}
function success2(body) {
  return buildResponse2(200, body);
}

function failure(body) {
  return buildResponse(500, body);
}
function failure2(body) {
  return buildResponse2(500, body);
}
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: (0, _stringify2.default)(body)
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
    body: (0, _stringify2.default)(body)
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ })
/******/ ])));