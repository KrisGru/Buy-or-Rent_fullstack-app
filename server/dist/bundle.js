/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/dotenv/lib/main.js":
/*!******************************************!*\
  !*** ../node_modules/dotenv/lib/main.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst os = __webpack_require__(/*! os */ \"os\");\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg; // Parser src into an Object\n\nfunction parse(src) {\n  const obj = {}; // Convert buffer to string\n\n  let lines = src.toString(); // Convert line breaks to same format\n\n  lines = lines.replace(/\\r\\n?/mg, '\\n');\n  let match;\n\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]; // Default undefined or null to empty string\n\n    let value = match[2] || ''; // Remove whitespace\n\n    value = value.trim(); // Check if double quoted\n\n    const maybeQuote = value[0]; // Remove surrounding quotes\n\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2'); // Expand newlines if double quoted\n\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n');\n      value = value.replace(/\\\\r/g, '\\r');\n    } // Add to object\n\n\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nfunction _log(message) {\n  console.log(`[dotenv][DEBUG] ${message}`);\n}\n\nfunction _resolveHome(envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath;\n} // Populates process.env from .env file\n\n\nfunction config(options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env');\n  let encoding = 'utf8';\n  const debug = Boolean(options && options.debug);\n  const override = Boolean(options && options.override);\n\n  if (options) {\n    if (options.path != null) {\n      dotenvPath = _resolveHome(options.path);\n    }\n\n    if (options.encoding != null) {\n      encoding = options.encoding;\n    }\n  }\n\n  try {\n    // Specifying an encoding returns a string instead of a buffer\n    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, {\n      encoding\n    }));\n    Object.keys(parsed).forEach(function (key) {\n      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {\n        process.env[key] = parsed[key];\n      } else {\n        if (override === true) {\n          process.env[key] = parsed[key];\n        }\n\n        if (debug) {\n          if (override === true) {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and WAS overwritten`);\n          } else {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and was NOT overwritten`);\n          }\n        }\n      }\n    });\n    return {\n      parsed\n    };\n  } catch (e) {\n    if (debug) {\n      _log(`Failed to load ${dotenvPath} ${e.message}`);\n    }\n\n    return {\n      error: e\n    };\n  }\n}\n\nconst DotenvModule = {\n  config,\n  parse\n};\nmodule.exports.config = DotenvModule.config;\nmodule.exports.parse = DotenvModule.parse;\nmodule.exports = DotenvModule;\n\n//# sourceURL=webpack://new-backend/../node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./actions/userActions.js":
/*!********************************!*\
  !*** ./actions/userActions.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const User = __webpack_require__(/*! ../db/models/user */ \"./db/models/user.js\");\n\nmodule.exports = {\n  //login\n  async login(req, res) {\n    try {\n      const {\n        login,\n        password\n      } = req.body;\n      const user = await User.findOne({\n        login,\n        password\n      });\n      console.log('user', user);\n\n      if (user === null) {\n        throw new error();\n      } else {\n        res.status(200).json(user);\n      }\n    } catch (error) {\n      res.status(404).json({\n        message: error.message\n      });\n    }\n  },\n\n  //register\n  async register(req, res) {\n    const {\n      email,\n      login,\n      password,\n      typeUser\n    } = req.body;\n\n    try {\n      let newUser = new User({\n        email,\n        login,\n        password,\n        typeUser\n      });\n      await newUser.save();\n      res.status(201).json(newUser);\n      console.log('newUser', newUser);\n    } catch (error) {\n      return res.status(500).json({\n        message: error.message\n      });\n    }\n  },\n\n  //boughtOrders\n  async boughtOrders(req, res) {\n    const {\n      _id,\n      order,\n      time\n    } = req.body;\n\n    try {\n      if (order.length === 0) {\n        return res.status(400).json({\n          message: 'basket is empty'\n        });\n      } else {\n        const user = await User.findOne({\n          _id\n        });\n        const fromBasket = {\n          order,\n          time\n        };\n        user.boughtOrders.push(fromBasket);\n        await user.save();\n        console.log(user);\n        res.status(200).json(user);\n      }\n    } catch (error) {\n      return res.status(500).json({\n        message: error.message\n      });\n    }\n  },\n\n  //rentedOrders\n  async rentedOrders(req, res) {\n    const {\n      _id,\n      order,\n      time\n    } = req.body;\n\n    try {\n      if (order.length === 0) {\n        return res.status(400).json({\n          message: 'basket is empty'\n        });\n      } else {\n        const user = await User.findOne({\n          _id\n        });\n        const fromBasket = {\n          order,\n          time: time\n        };\n        user.rentedOrders.push(fromBasket);\n        await user.save();\n        console.log(user);\n        res.status(200).json(user);\n      }\n    } catch (error) {\n      return res.status(500).json({\n        message: error.message\n      });\n    }\n  },\n\n  //get data from One User \n  async account(req, res) {\n    const _id = req.params.id;\n    const user = await User.findOne({\n      _id\n    });\n    return res.status(200).send(user);\n  }\n\n};\n\n//# sourceURL=webpack://new-backend/./actions/userActions.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((module) => {

eval("module.exports = {\n  port: process.env.PORT || 3001,\n  database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/userAccounts'\n};\n\n//# sourceURL=webpack://new-backend/./config.js?");

/***/ }),

/***/ "./db/models/user.js":
/*!***************************!*\
  !*** ./db/models/user.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst UserSchema = new mongoose.Schema({\n  email: {\n    type: String,\n    required: true\n  },\n  login: {\n    type: String,\n    required: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  typeUser: {\n    type: String,\n    required: true\n  },\n  boughtOrders: {\n    type: Array,\n    required: false\n  },\n  rentedOrders: {\n    type: Array,\n    required: false\n  }\n});\nconst User = mongoose.model(\"User\", UserSchema);\nmodule.exports = User;\n\n//# sourceURL=webpack://new-backend/./db/models/user.js?");

/***/ }),

/***/ "./db/mongoose.js":
/*!************************!*\
  !*** ./db/mongoose.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst {\n  database\n} = __webpack_require__(/*! ../config */ \"./config.js\");\n\nconst connectDB = () => {\n  return mongoose.connect(database).then(() => {\n    console.log('Connected to MongoDB');\n  }).catch(err => {\n    console.error(err);\n  });\n};\n\nmodule.exports = {\n  connectDB\n};\n\n//# sourceURL=webpack://new-backend/./db/mongoose.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("(__webpack_require__(/*! dotenv */ \"../node_modules/dotenv/lib/main.js\").config)();\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst {\n  connectDB\n} = __webpack_require__(/*! ./db/mongoose */ \"./db/mongoose.js\");\n\nconst {\n  port\n} = __webpack_require__(/*! ./config */ \"./config.js\");\n\nconst apiRouter = __webpack_require__(/*! ./routes/api.js */ \"./routes/api.js\");\n\nconst cors = __webpack_require__(/*! cors */ \"cors\"); //db\n\n\n__webpack_require__(/*! ./db/mongoose.js */ \"./db/mongoose.js\");\n\nconst app = express();\nconnectDB(); //cors\n\napp.use(cors()); // parsers\n//Content-type: application/json\n// app.use(bodyParser.json())\n\napp.use(express.json()); //routers\n\napp.use('/api/', apiRouter); // server\n\napp.listen(port, function () {\n  console.log(\"serwer słucha.... http://localhost:\" + port);\n});\n\n//# sourceURL=webpack://new-backend/./index.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst userActions = __webpack_require__(/*! ../actions/userActions.js */ \"./actions/userActions.js\"); // login\n\n\nrouter.post('/login', userActions.login); //register new user\n\nrouter.post('/register', userActions.register); // buyBooks\n\nrouter.post('/boughtOrders', userActions.boughtOrders); // rentBooks\n\nrouter.post('/rentedOrders', userActions.rentedOrders); // get all data from one user\n\nrouter.get('/account/:id', userActions.account); // api do edycji danych \n//\n\nmodule.exports = router;\n\n//# sourceURL=webpack://new-backend/./routes/api.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;