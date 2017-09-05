module.exports =
/******/ (function(modules) { // webpackBootstrap
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


var _assert = __webpack_require__(1);

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Conductor;

function Conductor(Choo) {

  Choo.prototype.set = function set(key, val) {
    if (!this._settings) {
      this._settings = {};
    }
    this._settings[key] = val;
  };

  Choo.prototype.get = function get(key) {
    if (!this._settings) return void 0;
    var val = this._settings[key];
    if (typeof val === 'function') {
      return val.bind(this)();
    }
    return val;
  };

  Choo.prototype.routes = function routes(opts) {
    var _this = this;

    var _routes = Object.keys(opts);

    this.use(function (state, emitter) {
      emitter.on('route', handler);
      emitter.on('DOMContentLoaded', handler);

      function handler() {
        var route = _routes.find(function (r) {
          return r === state.route;
        });
        if (typeof opts[route].loadData === 'function') {
          opts[route].loadData(state, function (eventName, data) {
            emitter.emit(eventName, data);
          });
        }
      }
    });

    _routes.map(function (key) {
      var viewKey = opts[key];
      _this.route(key, function (state, emit) {
        var views = _this.get('views');
        var layout = _this.get('layout');
        var view = interopRequireDefault(views[viewKey]).default;
        if (layout) {
          return interopRequireDefault(layout).default(view, state, emit);
        }
        return view(state, emit);
      });
    });
  };

  return Choo;
}

function interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map