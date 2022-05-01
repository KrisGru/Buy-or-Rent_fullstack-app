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

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst os = __webpack_require__(/*! os */ \"os\")\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parser src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _log (message) {\n  console.log(`[dotenv][DEBUG] ${message}`)\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (options) {\n    if (options.path != null) {\n      dotenvPath = _resolveHome(options.path)\n    }\n    if (options.encoding != null) {\n      encoding = options.encoding\n    }\n  }\n\n  try {\n    // Specifying an encoding returns a string instead of a buffer\n    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))\n\n    Object.keys(parsed).forEach(function (key) {\n      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {\n        process.env[key] = parsed[key]\n      } else {\n        if (override === true) {\n          process.env[key] = parsed[key]\n        }\n\n        if (debug) {\n          if (override === true) {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and WAS overwritten`)\n          } else {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and was NOT overwritten`)\n          }\n        }\n      }\n    })\n\n    return { parsed }\n  } catch (e) {\n    if (debug) {\n      _log(`Failed to load ${dotenvPath} ${e.message}`)\n    }\n\n    return { error: e }\n  }\n}\n\nconst DotenvModule = {\n  config,\n  parse\n}\n\nmodule.exports.config = DotenvModule.config\nmodule.exports.parse = DotenvModule.parse\nmodule.exports = DotenvModule\n\n\n//# sourceURL=webpack://new-backend/../node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./actions/userActions.js":
/*!********************************!*\
  !*** ./actions/userActions.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const User = __webpack_require__(/*! ../db/models/user */ \"./db/models/user.js\")\n\nmodule.exports = {\n//login\n  async login(req, res) {\n    try {\n      const { login, password } = req.body;\n      const user = await User.findOne({ login, password });\n      console.log('user', user)\n      if(user===null) {\n        throw new error;\n      } else {\n        res.status(200).json(user);\n      }\n    } catch(error) {\n      res.status(404).json({ message: error.message })\n    }\n  },\n//register\n  async register(req,res) {\n    const { email, login, password, typeUser } = req.body;\n    try {\n      let newUser = new User({ email, login, password, typeUser });\n      await newUser.save();\n      res.status(201).json(newUser)\n      console.log('newUser', newUser)\n    } catch(error) {\n      return res.status(500).json({ message: error.message });\n    }\n  },\n//boughtOrders\n  async boughtOrders(req, res) {\n    const { _id, order, time } = req.body;\n      try {\n        if (order.length===0) {\n          return res.status(400).json({ message: 'basket is empty' });\n        } else {\n          const user = await User.findOne({ _id })\n          const fromBasket = {order, time}\n          user.boughtOrders.push(fromBasket)\n          await user.save()\n          console.log(user)\n          res.status(200).json(user);\n        }\n      }catch(error) {\n        return res.status(500).json({ message: error.message });\n      }\n  },\n//rentedOrders\n  async rentedOrders(req, res) {\n    const { _id, order, time } = req.body;\n      try {\n        if (order.length===0) {\n          return res.status(400).json({ message: 'basket is empty' });\n        } else {\n          const user = await User.findOne({ _id })\n          const fromBasket = { order, time: time,}\n          user.rentedOrders.push(fromBasket)\n          await user.save()\n          console.log(user)\n          res.status(200).json(user);\n        }\n      }catch(error) {\n        return res.status(500).json({ message: error.message });\n      }\n  },\n//get data from One User \n  async account(req, res) {\n    const _id = req.params.id;\n    const user = await User.findOne({ _id })\n    return res.status(200).send(user)\n  },\n}\n\n//# sourceURL=webpack://new-backend/./actions/userActions.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((module) => {

eval("\nmodule.exports = {\n  port: process.env.PORT || 3001,\n  database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/userAccounts',\n\n}\n\n\n//# sourceURL=webpack://new-backend/./config.js?");

/***/ }),

/***/ "./db/models/user.js":
/*!***************************!*\
  !*** ./db/models/user.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst UserSchema = new mongoose.Schema({\n  email: { type: String, required: true,},\n  login: { type: String, required: true,},\n  password: { type: String, required: true,},\n  typeUser: { type: String, required: true,},\n  boughtOrders: { type: Array, required: false,},\n  rentedOrders: { type: Array, required: false,}\n});\n\nconst User = mongoose.model(\"User\", UserSchema);\n\nmodule.exports = User;\n\n\n//# sourceURL=webpack://new-backend/./db/models/user.js?");

/***/ }),

/***/ "./db/mongoose.js":
/*!************************!*\
  !*** ./db/mongoose.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst { database } = __webpack_require__(/*! ../config */ \"./config.js\")\n\nconst connectDB = () => {\n  return mongoose.connect(database)\n  .then(() => {\n    console.log('Connected to MongoDB')\n  })\n  .catch((err) => {\n    console.error(err)\n  })\n}\n\nmodule.exports = {connectDB};\n\n\n//# sourceURL=webpack://new-backend/./db/mongoose.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("(__webpack_require__(/*! dotenv */ \"../node_modules/dotenv/lib/main.js\").config)()\nconst express = __webpack_require__(/*! express */ \"express\");\nconst { connectDB } = __webpack_require__(/*! ./db/mongoose */ \"./db/mongoose.js\");\nconst { port } = __webpack_require__(/*! ./config */ \"./config.js\");\nconst apiRouter = __webpack_require__(/*! ./routes/api.js */ \"./routes/api.js\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\n//db\n__webpack_require__(/*! ./db/mongoose.js */ \"./db/mongoose.js\");\n\nconst app = express();\nconnectDB();\n//cors\napp.use(cors());\n// parsers\n//Content-type: application/json\n// app.use(bodyParser.json())\napp.use(express.json())\n//routers\napp.use('/api/', apiRouter)\n// server\napp.listen(port, function() {\n  console.log(\"serwer słucha.... http://localhost:\" + port)\n})\n\n\n//# sourceURL=webpack://new-backend/./index.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\nconst userActions = __webpack_require__(/*! ../actions/userActions.js */ \"./actions/userActions.js\")\n\n// login\nrouter.post('/login', userActions.login);\n//register new user\nrouter.post('/register', userActions.register);\n// buyBooks\nrouter.post('/boughtOrders', userActions.boughtOrders)\n// rentBooks\nrouter.post('/rentedOrders', userActions.rentedOrders)\n// get all data from one user\nrouter.get('/account/:id', userActions.account)\n// api do edycji danych \n\n//\nmodule.exports = router;\n\n\n//# sourceURL=webpack://new-backend/./routes/api.js?");

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