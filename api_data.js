define({ "api": [
  {
    "type": "post",
    "url": "/user/create",
    "title": "Save user information to database.",
    "name": "createUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Purdue email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "inBody",
            "description": "<p>a JSON object of user info.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "backend-api/app/user/create_user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/current",
    "title": "Get information of the current user.",
    "name": "getCurrentUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "inBody",
            "description": "<p>a JSON object of user info.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "backend-api/app/user/get_current_user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/content",
    "title": "Get top 5 items ranked by popularity for homepage.",
    "name": "getItems",
    "group": "content",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "inBody",
            "description": "<p>array Of Items</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "backend-api/app/content/get_items.js",
    "groupTitle": "content"
  },
  {
    "type": "get",
    "url": "/content/item_pop",
    "title": "Get items fullfilling conditons ranked by popularity.",
    "name": "getItemsPop",
    "group": "content",
    "parameter": {
      "fields": {
        "parameter from request query": [
          {
            "group": "query",
            "type": "String",
            "optional": true,
            "field": "keyword",
            "description": "<p>Search keyword.</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Category of the item. later we shall predefine our categories.</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": true,
            "field": "subject",
            "description": "<p>Subject of the item.</p>"
          },
          {
            "group": "query",
            "type": "Number",
            "optional": true,
            "field": "crn",
            "description": "<p>CRN of the class of which use the book.</p>"
          },
          {
            "group": "query",
            "type": "Number[2]",
            "optional": false,
            "field": "price",
            "description": "<p>Price range of the item, price[0] is lower bound and price[1] is upper bound.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "inBody",
            "description": "<p>array Of Items</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "backend-api/app/content/get_items_popularity.js",
    "groupTitle": "content"
  },
  {
    "type": "get",
    "url": "/content/item_price",
    "title": "Get items fullfilling conditons ranked by price.",
    "name": "getItemsPrice",
    "group": "content",
    "parameter": {
      "fields": {
        "parameter from request query": [
          {
            "group": "query",
            "type": "String",
            "optional": true,
            "field": "keyword",
            "description": "<p>Search keyword.</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Category of the item. later we shall predefine our categories.</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": true,
            "field": "subject",
            "description": "<p>Subject of the item.</p>"
          },
          {
            "group": "query",
            "type": "Number",
            "optional": true,
            "field": "crn",
            "description": "<p>CRN of the class of which use the book.</p>"
          },
          {
            "group": "query",
            "type": "Number[2]",
            "optional": false,
            "field": "price",
            "description": "<p>Price range of the item, price[0] is lower bound and price[1] is upper bound.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "inBody",
            "description": "<p>array Of Items</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "backend-api/app/content/get_items_price.js",
    "groupTitle": "content"
  },
  {
    "type": "post",
    "url": "/content/post",
    "title": "post an item for sell.",
    "name": "postItem",
    "group": "content",
    "parameter": {
      "fields": {
        "parameter from request body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the item.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Category of the item. later we shall predefine our categories.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "subject",
            "description": "<p>Subject of the item.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "sellerName",
            "description": "<p>Seller's name. Please call user/current to get the username.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the item.</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": true,
            "field": "crn",
            "description": "<p>CRN of the class of which use the book.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "imageURL",
            "description": "<p>url of the image in S3 bucket.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>true</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "backend-api/app/content/post_item.js",
    "groupTitle": "content"
  }
] });
