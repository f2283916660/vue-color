(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueColor"] = factory();
	else
		root["VueColor"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(29)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tinycolor = __webpack_require__(30);

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _colorChange(data, oldHue) {
  var alpha = data && data.a;
  var color;

  if (data && data.hsl) {
    color = (0, _tinycolor2.default)(data.hsl);
  } else if (data && data.hex && data.hex.length > 0) {
    color = (0, _tinycolor2.default)(data.hex);
  } else {
    color = (0, _tinycolor2.default)(data);
  }

  if (color && (color._a === undefined || color._a === null)) {
    color.setAlpha(alpha || 1);
  }

  var hsl = color.toHsl();
  var hsv = color.toHsv();

  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || data.hsl && data.hsl.h || oldHue || 0;
  }

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a || color.getAlpha()
  };
}

exports.default = {
  props: ['value'],
  data: function data() {
    return {
      val: _colorChange(this.value)
    };
  },

  computed: {
    colors: {
      get: function get() {
        return this.val;
      },
      set: function set(newVal) {
        this.val = newVal;
        this.$emit('input', newVal);
      }
    }
  },
  watch: {
    value: function value(newVal) {
      this.val = _colorChange(newVal);
    }
  },
  methods: {
    colorChange: function colorChange(data, oldHue) {
      this.oldHue = this.colors.hsl.h;
      this.colors = _colorChange(data, oldHue || this.oldHue);
    },
    isValidHex: function isValidHex(hex) {
      return (0, _tinycolor2.default)(hex).isValid();
    },
    simpleCheckForValidColor: function simpleCheckForValidColor(data) {
      var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
      var checked = 0;
      var passed = 0;

      for (var i = 0; i < keysToCheck.length; i++) {
        var letter = keysToCheck[i];
        if (data[letter]) {
          checked++;
          if (!isNaN(data[letter])) {
            passed++;
          }
        }
      }

      if (checked === passed) {
        return data;
      }
    },
    paletteUpperCase: function paletteUpperCase(palette) {
      return palette.map(function (c) {
        return c.toUpperCase();
      });
    },
    isTransparent: function isTransparent(color) {
      return (0, _tinycolor2.default)(color).getAlpha() === 0;
    }
  }
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_EditableInput_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_EditableInput_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_EditableInput_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_EditableInput_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_EditableInput_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_441174dc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_EditableInput_vue__ = __webpack_require__(33);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_EditableInput_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_441174dc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_EditableInput_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/EditableInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-441174dc", Component.options)
  } else {
    hotAPI.reload("data-v-441174dc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Hue_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Hue_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Hue_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Hue_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Hue_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7b9aea78_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Hue_vue__ = __webpack_require__(48);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(46)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Hue_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7b9aea78_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Hue_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/Hue.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b9aea78", Component.options)
  } else {
    hotAPI.reload("data-v-7b9aea78", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Saturation_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Saturation_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Saturation_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Saturation_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Saturation_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ba139894_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Saturation_vue__ = __webpack_require__(63);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(58)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Saturation_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ba139894_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Saturation_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/Saturation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ba139894", Component.options)
  } else {
    hotAPI.reload("data-v-ba139894", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Alpha_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Alpha_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Alpha_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Alpha_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Alpha_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1af1f1ac_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Alpha_vue__ = __webpack_require__(69);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(64)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Alpha_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1af1f1ac_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Alpha_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/Alpha.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1af1f1ac", Component.options)
  } else {
    hotAPI.reload("data-v-1af1f1ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Checkboard_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Checkboard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Checkboard_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Checkboard_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Checkboard_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5b6dc0c2_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Checkboard_vue__ = __webpack_require__(68);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(66)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Checkboard_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5b6dc0c2_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Checkboard_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/Checkboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b6dc0c2", Component.options)
  } else {
    hotAPI.reload("data-v-5b6dc0c2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultColors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];

exports.default = {
  name: 'Compact',
  mixins: [_color2.default],
  props: {
    palette: {
      type: Array,
      default: function _default() {
        return defaultColors;
      }
    }
  },
  components: {
    'ed-in': _EditableInput2.default
  },
  computed: {
    pick: function pick() {
      return this.colors.hex.toUpperCase();
    }
  },
  methods: {
    handlerClick: function handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      });
    }
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'editableInput',
  props: {
    label: String,
    labelText: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    val: {
      get: function get() {
        return this.value;
      },
      set: function set(v) {
        if (!(this.max === undefined) && +v > this.max) {
          this.$refs.input.value = this.max;
        } else {
          return v;
        }
      }
    },
    labelId: function labelId() {
      return 'input__label__' + this.label + '__' + Math.random().toString().slice(2, 5);
    },
    labelSpanText: function labelSpanText() {
      return this.labelText || this.label;
    }
  },
  methods: {
    update: function update(e) {
      this.handleChange(e.target.value);
    },
    handleChange: function handleChange(newVal) {
      var data = {};
      data[this.label] = newVal;
      if (data.hex === undefined && data['#'] === undefined) {
        this.$emit('change', data);
      } else if (newVal.length > 5) {
        this.$emit('change', data);
      }
    },
    handleKeyDown: function handleKeyDown(e) {
      var val = this.val;
      var number = Number(val);

      if (number) {
        var amount = this.arrowOffset || 1;

        if (e.keyCode === 38) {
          val = number + amount;
          this.handleChange(val);
          e.preventDefault();
        }

        if (e.keyCode === 40) {
          val = number - amount;
          this.handleChange(val);
          e.preventDefault();
        }
      }
    }
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultColors = ['#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3', '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959', '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'];

exports.default = {
  name: 'Grayscale',
  mixins: [_color2.default],
  props: {
    palette: {
      type: Array,
      default: function _default() {
        return defaultColors;
      }
    }
  },
  components: {},
  computed: {
    pick: function pick() {
      return this.colors.hex.toUpperCase();
    }
  },
  methods: {
    handlerClick: function handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      });
    }
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Material',
  mixins: [_color2.default],
  components: {
    'ed-in': _EditableInput2.default
  },
  methods: {
    onChange: function onChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        });
      } else if (data.r || data.g || data.b) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        });
      }
    }
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

var _Hue = __webpack_require__(5);

var _Hue2 = _interopRequireDefault(_Hue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Slider',
  mixins: [_color2.default],
  props: {
    swatches: {
      type: Array,
      default: function _default() {
        return ['.80', '.65', '.50', '.35', '.20'];
      }
    }
  },
  components: {
    hue: _Hue2.default
  },
  computed: {
    activeOffset: function activeOffset() {
      var hasBlack = this.swatches.includes('0');
      var hasWhite = this.swatches.includes('1');
      var hsl = this.colors.hsl;

      if (Math.round(hsl.s * 100) / 100 === 0.50) {
        return Math.round(hsl.l * 100) / 100;
      } else if (hasBlack && hsl.l === 0) {
        return 0;
      } else if (hasWhite && hsl.l === 1) {
        return 1;
      }
      return -1;
    }
  },
  methods: {
    hueChange: function hueChange(data) {
      this.colorChange(data);
    },
    handleSwClick: function handleSwClick(index, offset) {
      this.colorChange({
        h: this.colors.hsl.h,
        s: 0.5,
        l: offset,
        source: 'hsl'
      });
    }
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'Hue',
  props: {
    value: Object,
    direction: {
      type: String,

      default: 'horizontal'
    }
  },
  data: function data() {
    return {
      oldHue: 0,
      pullDirection: ''
    };
  },

  computed: {
    colors: function colors() {
      var h = this.value.hsl.h;
      if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right';
      if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left';
      this.oldHue = h;

      return this.value;
    },
    directionClass: function directionClass() {
      return {
        'vc-hue--horizontal': this.direction === 'horizontal',
        'vc-hue--vertical': this.direction === 'vertical'
      };
    },
    pointerTop: function pointerTop() {
      if (this.direction === 'vertical') {
        if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return 0;
        return -(this.colors.hsl.h * 100 / 360) + 100 + '%';
      } else {
        return 0;
      }
    },
    pointerLeft: function pointerLeft() {
      if (this.direction === 'vertical') {
        return 0;
      } else {
        if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return '100%';
        return this.colors.hsl.h * 100 / 360 + '%';
      }
    }
  },
  methods: {
    handleChange: function handleChange(e, skip) {
      !skip && e.preventDefault();

      var container = this.$refs.container;
      var containerWidth = container.clientWidth;
      var containerHeight = container.clientHeight;

      var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      var yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      var left = pageX - xOffset;
      var top = pageY - yOffset;

      var h;
      var percent;

      if (this.direction === 'vertical') {
        if (top < 0) {
          h = 360;
        } else if (top > containerHeight) {
          h = 0;
        } else {
          percent = -(top * 100 / containerHeight) + 100;
          h = 360 * percent / 100;
        }

        if (this.colors.hsl.h !== h) {
          this.$emit('change', {
            h: h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl'
          });
        }
      } else {
        if (left < 0) {
          h = 0;
        } else if (left > containerWidth) {
          h = 360;
        } else {
          percent = left * 100 / containerWidth;
          h = 360 * percent / 100;
        }

        if (this.colors.hsl.h !== h) {
          this.$emit('change', {
            h: h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl'
          });
        }
      }
    },
    handleMouseDown: function handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp: function handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _materialColors = __webpack_require__(53);

var _materialColors2 = _interopRequireDefault(_materialColors);

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorMap = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey', 'black'];
var colorLevel = ['900', '700', '500', '300', '100'];
var defaultColors = function () {
  var colors = [];
  colorMap.forEach(function (type) {
    var typeColor = [];
    if (type.toLowerCase() === 'black' || type.toLowerCase() === 'white') {
      typeColor = typeColor.concat(['#000000', '#FFFFFF']);
    } else {
      colorLevel.forEach(function (level) {
        var color = _materialColors2.default[type][level];
        typeColor.push(color.toUpperCase());
      });
    }
    colors.push(typeColor);
  });
  return colors;
}();

exports.default = {
  name: 'Swatches',
  mixins: [_color2.default],
  props: {
    palette: {
      type: Array,
      default: function _default() {
        return defaultColors;
      }
    }
  },
  computed: {
    pick: function pick() {
      return this.colors.hex;
    }
  },
  methods: {
    equal: function equal(color) {
      return color.toLowerCase() === this.colors.hex.toLowerCase();
    },
    handlerClick: function handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      });
    }
  }

};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

var _Saturation = __webpack_require__(6);

var _Saturation2 = _interopRequireDefault(_Saturation);

var _Hue = __webpack_require__(5);

var _Hue2 = _interopRequireDefault(_Hue);

var _Alpha = __webpack_require__(7);

var _Alpha2 = _interopRequireDefault(_Alpha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Photoshop',
  mixins: [_color2.default],
  props: {
    head: {
      type: String,
      default: 'Color Picker'
    },
    disableFields: {
      type: Boolean,
      default: false
    },
    hasResetButton: {
      type: Boolean,
      default: false
    },
    acceptLabel: {
      type: String,
      default: 'OK'
    },
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },
    resetLabel: {
      type: String,
      default: 'Reset'
    },
    newLabel: {
      type: String,
      default: 'new'
    },
    currentLabel: {
      type: String,
      default: 'current'
    }
  },
  components: {
    saturation: _Saturation2.default,
    hue: _Hue2.default,
    alpha: _Alpha2.default,
    'ed-in': _EditableInput2.default
  },
  data: function data() {
    return {
      currentColor: '#FFF'
    };
  },

  computed: {
    hsv: function hsv() {
      var hsv = this.colors.hsv;
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed()
      };
    },
    hex: function hex() {
      var hex = this.colors.hex;
      return hex && hex.replace('#', '');
    }
  },
  created: function created() {
    this.currentColor = this.colors.hex;
  },

  methods: {
    childChange: function childChange(data) {
      this.colorChange(data);
    },
    inputChange: function inputChange(data) {
      if (!data) {
        return;
      }
      if (data['#']) {
        this.isValidHex(data['#']) && this.colorChange({
          hex: data['#'],
          source: 'hex'
        });
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        });
      } else if (data.h || data.s || data.v) {
        this.colorChange({
          h: data.h || this.colors.hsv.h,
          s: data.s / 100 || this.colors.hsv.s,
          v: data.v / 100 || this.colors.hsv.v,
          source: 'hsv'
        });
      }
    },
    clickCurrentColor: function clickCurrentColor() {
      this.colorChange({
        hex: this.currentColor,
        source: 'hex'
      });
    },
    handleAccept: function handleAccept() {
      this.$emit('ok');
    },
    handleCancel: function handleCancel() {
      this.$emit('cancel');
    },
    handleReset: function handleReset() {
      this.$emit('reset');
    }
  }

};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clamp = __webpack_require__(60);

var _clamp2 = _interopRequireDefault(_clamp);

var _lodash = __webpack_require__(61);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Saturation',
  props: {
    value: Object
  },
  computed: {
    colors: function colors() {
      return this.value;
    },
    bgColor: function bgColor() {
      return 'hsl(' + this.colors.hsv.h + ', 100%, 50%)';
    },
    pointerTop: function pointerTop() {
      return -(this.colors.hsv.v * 100) + 1 + 100 + '%';
    },
    pointerLeft: function pointerLeft() {
      return this.colors.hsv.s * 100 + '%';
    }
  },
  methods: {
    throttle: (0, _lodash2.default)(function (fn, data) {
      fn(data);
    }, 20, {
      'leading': true,
      'trailing': false
    }),
    handleChange: function handleChange(e, skip) {
      !skip && e.preventDefault();
      var container = this.$refs.container;
      var containerWidth = container.clientWidth;
      var containerHeight = container.clientHeight;

      var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      var yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      var left = (0, _clamp2.default)(pageX - xOffset, 0, containerWidth);
      var top = (0, _clamp2.default)(pageY - yOffset, 0, containerHeight);
      var saturation = left / containerWidth;
      var bright = (0, _clamp2.default)(-(top / containerHeight) + 1, 0, 1);

      this.throttle(this.onChange, {
        h: this.colors.hsv.h,
        s: saturation,
        v: bright,
        a: this.colors.hsv.a,
        source: 'hsva'
      });
    },
    onChange: function onChange(param) {
      this.$emit('change', param);
    },
    handleMouseDown: function handleMouseDown(e) {
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp: function handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Checkboard = __webpack_require__(8);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Alpha',
  props: {
    value: Object,
    onChange: Function
  },
  components: {
    checkboard: _Checkboard2.default
  },
  computed: {
    colors: function colors() {
      return this.value;
    },
    gradientColor: function gradientColor() {
      var rgba = this.colors.rgba;
      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)';
    }
  },
  methods: {
    handleChange: function handleChange(e, skip) {
      !skip && e.preventDefault();
      var container = this.$refs.container;
      var containerWidth = container.clientWidth;

      var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      var left = pageX - xOffset;

      var a;
      if (left < 0) {
        a = 0;
      } else if (left > containerWidth) {
        a = 1;
      } else {
        a = Math.round(left * 100 / containerWidth) / 100;
      }

      if (this.colors.a !== a) {
        this.$emit('change', {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a: a,
          source: 'rgba'
        });
      }
    },
    handleMouseDown: function handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp: function handleMouseUp() {
      this.unbindEventListeners();
    },
    unbindEventListeners: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var _checkboardCache = {};

exports.default = {
  name: 'Checkboard',
  props: {
    size: {
      type: [Number, String],
      default: 8
    },
    white: {
      type: String,
      default: '#fff'
    },
    grey: {
      type: String,
      default: '#e6e6e6'
    }
  },
  computed: {
    bgStyle: function bgStyle() {
      return {
        'background-image': 'url(' + getCheckboard(this.white, this.grey, this.size) + ')'
      };
    }
  }
};


function renderCheckboard(c1, c2, size) {
  if (typeof document === 'undefined') {
    return null;
  }
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = size * 2;
  var ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}

function getCheckboard(c1, c2, size) {
  var key = c1 + ',' + c2 + ',' + size;

  if (_checkboardCache[key]) {
    return _checkboardCache[key];
  } else {
    var checkboard = renderCheckboard(c1, c2, size);
    _checkboardCache[key] = checkboard;
    return checkboard;
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

var _Saturation = __webpack_require__(6);

var _Saturation2 = _interopRequireDefault(_Saturation);

var _Hue = __webpack_require__(5);

var _Hue2 = _interopRequireDefault(_Hue);

var _Alpha = __webpack_require__(7);

var _Alpha2 = _interopRequireDefault(_Alpha);

var _Checkboard = __webpack_require__(8);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF', 'rgba(0,0,0,0)'];

exports.default = {
  name: 'Sketch',
  mixins: [_color2.default],
  components: {
    saturation: _Saturation2.default,
    hue: _Hue2.default,
    alpha: _Alpha2.default,
    'ed-in': _EditableInput2.default,
    checkboard: _Checkboard2.default
  },
  props: {
    presetColors: {
      type: Array,
      default: function _default() {
        return presetColors;
      }
    },
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hex: function hex() {
      var hex = void 0;
      if (this.colors.a < 1) {
        hex = this.colors.hex8;
      } else {
        hex = this.colors.hex;
      }
      return hex.replace('#', '');
    },
    activeColor: function activeColor() {
      var rgba = this.colors.rgba;
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
    }
  },
  methods: {
    handlePreset: function handlePreset(c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      });
    },
    childChange: function childChange(data) {
      this.colorChange(data);
    },
    inputChange: function inputChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        });
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        });
      }
    }
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

var _Saturation = __webpack_require__(6);

var _Saturation2 = _interopRequireDefault(_Saturation);

var _Hue = __webpack_require__(5);

var _Hue2 = _interopRequireDefault(_Hue);

var _Alpha = __webpack_require__(7);

var _Alpha2 = _interopRequireDefault(_Alpha);

var _Checkboard = __webpack_require__(8);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Chrome',
  mixins: [_color2.default],
  props: {
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  components: {
    saturation: _Saturation2.default,
    hue: _Hue2.default,
    alpha: _Alpha2.default,
    'ed-in': _EditableInput2.default,
    checkboard: _Checkboard2.default
  },
  data: function data() {
    return {
      fieldsIndex: 0,
      highlight: false
    };
  },

  computed: {
    hsl: function hsl() {
      var _colors$hsl = this.colors.hsl,
          h = _colors$hsl.h,
          s = _colors$hsl.s,
          l = _colors$hsl.l;

      return {
        h: h.toFixed(),
        s: (s * 100).toFixed() + '%',
        l: (l * 100).toFixed() + '%'
      };
    },
    activeColor: function activeColor() {
      var rgba = this.colors.rgba;
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
    },
    hasAlpha: function hasAlpha() {
      return this.colors.a < 1;
    }
  },
  methods: {
    childChange: function childChange(data) {
      this.colorChange(data);
    },
    inputChange: function inputChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        });
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        });
      } else if (data.h || data.s || data.l) {
        var s = data.s ? data.s.replace('%', '') / 100 : this.colors.hsl.s;
        var l = data.l ? data.l.replace('%', '') / 100 : this.colors.hsl.l;

        this.colorChange({
          h: data.h || this.colors.hsl.h,
          s: s,
          l: l,
          source: 'hsl'
        });
      }
    },
    toggleViews: function toggleViews() {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0;
        return;
      }
      this.fieldsIndex++;
    },
    showHighlight: function showHighlight() {
      this.highlight = true;
    },
    hideHighlight: function hideHighlight() {
      this.highlight = false;
    }
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

var _Saturation = __webpack_require__(6);

var _Saturation2 = _interopRequireDefault(_Saturation);

var _Hue = __webpack_require__(5);

var _Hue2 = _interopRequireDefault(_Hue);

var _HueCircle = __webpack_require__(23);

var _HueCircle2 = _interopRequireDefault(_HueCircle);

var _Alpha = __webpack_require__(7);

var _Alpha2 = _interopRequireDefault(_Alpha);

var _Checkboard = __webpack_require__(8);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Sketch',
  mixins: [_color2.default],
  components: {
    saturation: _Saturation2.default,
    hue: _Hue2.default,
    hueCircle: _HueCircle2.default,
    alpha: _Alpha2.default,
    'ed-in': _EditableInput2.default,
    checkboard: _Checkboard2.default
  },
  props: {
    presetColors: {
      type: Array
    },
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hex: function hex() {
      var hex = void 0;
      if (this.colors.a < 1) {
        hex = this.colors.hex8;
      } else {
        hex = this.colors.hex;
      }
      return hex.replace('#', '');
    },
    activeColor: function activeColor() {
      var rgba = this.colors.rgba;
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
    }
  },
  methods: {
    handlePreset: function handlePreset(c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      });
    },
    childChange: function childChange(data) {
      this.colorChange(data);
    },
    inputChange: function inputChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        });
      } else if (data.h || data.s || data.v || data.a) {
        this.colorChange({
          h: data.h || this.colors.hsv.h,
          s: data.s || this.colors.hsv.s,
          v: data.v || this.colors.hsv.v,
          a: data.a || this.colors.a,
          source: 'hsv'
        });
      }
    }
  }
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_HueCircle_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_HueCircle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_HueCircle_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_HueCircle_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_HueCircle_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0ff66ab4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_HueCircle_vue__ = __webpack_require__(86);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_HueCircle_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0ff66ab4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_HueCircle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/HueCircle.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ff66ab4", Component.options)
  } else {
    hotAPI.reload("data-v-0ff66ab4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    value: Object
  },
  data: function data() {
    return {
      wrapR: 0
    };
  },

  computed: {
    colors: function colors() {
      return this.value;
    },
    pointerTop: function pointerTop() {
      return this.getPointerXY().y + 'px';
    },
    pointerLeft: function pointerLeft() {
      return this.getPointerXY().x + 'px';
    }
  },
  methods: {
    getPointerXY: function getPointerXY() {
      var hsv = this.colors.hsv;
      var container = this.$refs.container;
      if (!container && !this.wrapR) {
        return { x: 0, y: 0 };
      }
      var containerWidth = container.clientWidth;
      var containerHeight = container.clientHeight;

      var r = hsv.s * containerHeight / 2;
      var pX = containerWidth / 2 + r * Math.cos(hsv.h / 360 * 2 * Math.PI);
      var pY = containerHeight / 2 - r * Math.sin(hsv.h / 360 * 2 * Math.PI);

      return { x: pX, y: pY };
    },
    handleChange: function handleChange(e, skip) {
      !skip && e.preventDefault();

      var container = this.$refs.container;
      var containerWidth = container.clientWidth;
      var containerHeight = container.clientHeight;

      var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      var yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      var left = pageX - xOffset;
      var top = pageY - yOffset;

      var originPointX = containerWidth / 2;
      var originPointY = containerHeight / 2;

      var r = Math.sqrt(Math.pow(left - originPointX, 2) + Math.pow(top - originPointY, 2));

      var angle = Math.acos((left - originPointX) / r);

      if (top - originPointY > 0) {
        angle = Math.PI * 2 - angle;
      }

      var hsvH = 360 * angle / (Math.PI * 2);
      var hsvS = r / originPointX;
      hsvS = hsvS > 1 ? 1 : hsvS;

      this.$emit('change', {
        h: hsvH,
        s: hsvS,
        v: this.colors.hsv.v,
        a: this.colors.hsv.a,
        source: 'hsv'
      });
    },
    handleMouseDown: function handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp: function handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  },
  mounted: function mounted() {
    var container = this.$refs.container;
    this.wrapR = container.clientWidth;
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Compact = __webpack_require__(26);

var _Compact2 = _interopRequireDefault(_Compact);

var _Grayscale = __webpack_require__(35);

var _Grayscale2 = _interopRequireDefault(_Grayscale);

var _Material = __webpack_require__(39);

var _Material2 = _interopRequireDefault(_Material);

var _Slider = __webpack_require__(43);

var _Slider2 = _interopRequireDefault(_Slider);

var _Swatches = __webpack_require__(50);

var _Swatches2 = _interopRequireDefault(_Swatches);

var _Photoshop = __webpack_require__(55);

var _Photoshop2 = _interopRequireDefault(_Photoshop);

var _Sketch = __webpack_require__(71);

var _Sketch2 = _interopRequireDefault(_Sketch);

var _Chrome = __webpack_require__(75);

var _Chrome2 = _interopRequireDefault(_Chrome);

var _Circle = __webpack_require__(79);

var _Circle2 = _interopRequireDefault(_Circle);

var _Alpha = __webpack_require__(7);

var _Alpha2 = _interopRequireDefault(_Alpha);

var _Checkboard = __webpack_require__(8);

var _Checkboard2 = _interopRequireDefault(_Checkboard);

var _EditableInput = __webpack_require__(4);

var _EditableInput2 = _interopRequireDefault(_EditableInput);

var _Hue = __webpack_require__(5);

var _Hue2 = _interopRequireDefault(_Hue);

var _HueCircle = __webpack_require__(23);

var _HueCircle2 = _interopRequireDefault(_HueCircle);

var _Saturation = __webpack_require__(6);

var _Saturation2 = _interopRequireDefault(_Saturation);

var _color = __webpack_require__(3);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueColor = {
  version: '2.7.0',
  Compact: _Compact2.default,
  Grayscale: _Grayscale2.default,
  Material: _Material2.default,
  Slider: _Slider2.default,
  Swatches: _Swatches2.default,
  Photoshop: _Photoshop2.default,
  Sketch: _Sketch2.default,
  Chrome: _Chrome2.default,
  Circle: _Circle2.default,
  HueCircle: _HueCircle2.default,
  Alpha: _Alpha2.default,
  Checkboard: _Checkboard2.default,
  EditableInput: _EditableInput2.default,
  Hue: _Hue2.default,
  Saturation: _Saturation2.default,
  ColorMixin: _color2.default
};

module.exports = VueColor;

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Compact_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Compact_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Compact_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Compact_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Compact_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_648423a3_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Compact_vue__ = __webpack_require__(34);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Compact_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_648423a3_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Compact_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Compact.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-648423a3", Component.options)
  } else {
    hotAPI.reload("data-v-648423a3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("026f259c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-648423a3\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Compact.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-648423a3\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Compact.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-compact {\r\n  padding-top: 5px;\r\n  padding-left: 5px;\r\n  width: 240px;\r\n  border-radius: 2px;\r\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\r\n  background-color: #fff;\n}\n.vc-compact-colors {\r\n  overflow: hidden;\r\n  padding: 0;\r\n  margin: 0;\n}\n.vc-compact-color-item {\r\n  list-style: none;\r\n  width: 15px;\r\n  height: 15px;\r\n  float: left;\r\n  margin-right: 5px;\r\n  margin-bottom: 5px;\r\n  position: relative;\r\n  cursor: pointer;\n}\n.vc-compact-color-item--white {\r\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-compact-color-item--white .vc-compact-dot {\r\n  background: #000;\n}\n.vc-compact-dot {\r\n  position: absolute;\r\n  top: 5px;\r\n  right: 5px;\r\n  bottom: 5px;\r\n  left: 5px;\r\n  border-radius: 50%;\r\n  opacity: 1;\r\n  background: #fff;\n}\r\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return tinycolor;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})(Math);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("a312a1a2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-441174dc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./EditableInput.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-441174dc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./EditableInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-editable-input {\r\n  position: relative;\n}\n.vc-input__input {\r\n  padding: 0;\r\n  border: 0;\r\n  outline: none;\n}\n.vc-input__label {\r\n  text-transform: capitalize;\n}\r\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "vc-editable-input" }, [
    _c("input", {
      directives: [
        { name: "model", rawName: "v-model", value: _vm.val, expression: "val" }
      ],
      ref: "input",
      staticClass: "vc-input__input",
      attrs: { "aria-labelledby": _vm.labelId },
      domProps: { value: _vm.val },
      on: {
        keydown: _vm.handleKeyDown,
        input: [
          function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.val = $event.target.value
          },
          _vm.update
        ]
      }
    }),
    _vm._v(" "),
    _c(
      "span",
      {
        staticClass: "vc-input__label",
        attrs: { for: _vm.label, id: _vm.labelId }
      },
      [_vm._v(_vm._s(_vm.labelSpanText))]
    ),
    _vm._v(" "),
    _c("span", { staticClass: "vc-input__desc" }, [_vm._v(_vm._s(_vm.desc))])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-441174dc", esExports)
  }
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vc-compact",
      attrs: { role: "application", "aria-label": "Compact color picker" }
    },
    [
      _c(
        "ul",
        { staticClass: "vc-compact-colors", attrs: { role: "listbox" } },
        _vm._l(_vm.paletteUpperCase(_vm.palette), function(c) {
          return _c(
            "li",
            {
              key: c,
              staticClass: "vc-compact-color-item",
              class: { "vc-compact-color-item--white": c === "#FFFFFF" },
              style: { background: c },
              attrs: {
                role: "option",
                "aria-label": "color:" + c,
                "aria-selected": c === _vm.pick
              },
              on: {
                click: function($event) {
                  return _vm.handlerClick(c)
                }
              }
            },
            [
              _c("div", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: c === _vm.pick,
                    expression: "c === pick"
                  }
                ],
                staticClass: "vc-compact-dot"
              })
            ]
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-648423a3", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Grayscale_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Grayscale_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Grayscale_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Grayscale_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Grayscale_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ad047d72_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Grayscale_vue__ = __webpack_require__(38);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Grayscale_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ad047d72_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Grayscale_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Grayscale.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ad047d72", Component.options)
  } else {
    hotAPI.reload("data-v-ad047d72", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3c3eae84", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ad047d72\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Grayscale.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ad047d72\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Grayscale.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-grayscale {\r\n  width: 125px;\r\n  border-radius: 2px;\r\n  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);\r\n  background-color: #fff;\n}\n.vc-grayscale-colors {\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  padding: 0;\r\n  margin: 0;\n}\n.vc-grayscale-color-item {\r\n  list-style: none;\r\n  width: 25px;\r\n  height: 25px;\r\n  float: left;\r\n  position: relative;\r\n  cursor: pointer;\n}\n.vc-grayscale-color-item--white .vc-grayscale-dot {\r\n  background: #000;\n}\n.vc-grayscale-dot {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 6px;\r\n  height: 6px;\r\n  margin: -3px 0 0 -2px;\r\n  border-radius: 50%;\r\n  opacity: 1;\r\n  background: #fff;\n}\r\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vc-grayscale",
      attrs: { role: "application", "aria-label": "Grayscale color picker" }
    },
    [
      _c(
        "ul",
        { staticClass: "vc-grayscale-colors", attrs: { role: "listbox" } },
        _vm._l(_vm.paletteUpperCase(_vm.palette), function(c) {
          return _c(
            "li",
            {
              key: c,
              staticClass: "vc-grayscale-color-item",
              class: { "vc-grayscale-color-item--white": c == "#FFFFFF" },
              style: { background: c },
              attrs: {
                role: "option",
                "aria-label": "Color:" + c,
                "aria-selected": c === _vm.pick
              },
              on: {
                click: function($event) {
                  return _vm.handlerClick(c)
                }
              }
            },
            [
              _c("div", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: c === _vm.pick,
                    expression: "c === pick"
                  }
                ],
                staticClass: "vc-grayscale-dot"
              })
            ]
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-ad047d72", esExports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Material_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Material_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Material_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Material_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Material_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ac92cc52_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Material_vue__ = __webpack_require__(42);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(40)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Material_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ac92cc52_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Material_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Material.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ac92cc52", Component.options)
  } else {
    hotAPI.reload("data-v-ac92cc52", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("8312acc6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ac92cc52\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Material.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ac92cc52\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Material.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-material {\r\n  width: 98px;\r\n  height: 98px;\r\n  padding: 16px;\r\n  font-family: \"Roboto\";\r\n  position: relative;\r\n  border-radius: 2px;\r\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\r\n  background-color: #fff;\n}\n.vc-material .vc-input__input {\r\n  width: 100%;\r\n  margin-top: 12px;\r\n  font-size: 15px;\r\n  color: #333;\r\n  height: 30px;\n}\n.vc-material .vc-input__label {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  font-size: 11px;\r\n  color: #999;\r\n  text-transform: capitalize;\n}\n.vc-material-hex {\r\n  border-bottom-width: 2px;\r\n  border-bottom-style: solid;\n}\n.vc-material-split {\r\n  display: flex;\r\n  margin-right: -10px;\r\n  padding-top: 11px;\n}\n.vc-material-third {\r\n  flex: 1;\r\n  padding-right: 10px;\n}\r\n", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vc-material",
      attrs: { role: "application", "aria-label": "Material color picker" }
    },
    [
      _c("ed-in", {
        staticClass: "vc-material-hex",
        style: { borderColor: _vm.colors.hex },
        attrs: { label: "hex" },
        on: { change: _vm.onChange },
        model: {
          value: _vm.colors.hex,
          callback: function($$v) {
            _vm.$set(_vm.colors, "hex", $$v)
          },
          expression: "colors.hex"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "vc-material-split" }, [
        _c(
          "div",
          { staticClass: "vc-material-third" },
          [
            _c("ed-in", {
              attrs: { label: "r" },
              on: { change: _vm.onChange },
              model: {
                value: _vm.colors.rgba.r,
                callback: function($$v) {
                  _vm.$set(_vm.colors.rgba, "r", $$v)
                },
                expression: "colors.rgba.r"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "vc-material-third" },
          [
            _c("ed-in", {
              attrs: { label: "g" },
              on: { change: _vm.onChange },
              model: {
                value: _vm.colors.rgba.g,
                callback: function($$v) {
                  _vm.$set(_vm.colors.rgba, "g", $$v)
                },
                expression: "colors.rgba.g"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "vc-material-third" },
          [
            _c("ed-in", {
              attrs: { label: "b" },
              on: { change: _vm.onChange },
              model: {
                value: _vm.colors.rgba.b,
                callback: function($$v) {
                  _vm.$set(_vm.colors.rgba, "b", $$v)
                },
                expression: "colors.rgba.b"
              }
            })
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-ac92cc52", esExports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Slider_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Slider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Slider_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Slider_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Slider_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_2dedc691_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Slider_vue__ = __webpack_require__(49);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(44)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Slider_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_2dedc691_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Slider_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Slider.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dedc691", Component.options)
  } else {
    hotAPI.reload("data-v-2dedc691", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("5db8f7b5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2dedc691\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Slider.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2dedc691\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Slider.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-slider {\r\n  position: relative;\r\n  width: 410px;\n}\n.vc-slider-hue-warp {\r\n  height: 12px;\r\n  position: relative;\n}\n.vc-slider-hue-warp .vc-hue-picker {\r\n  width: 14px;\r\n  height: 14px;\r\n  border-radius: 6px;\r\n  transform: translate(-7px, -2px);\r\n  background-color: rgb(248, 248, 248);\r\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-slider-swatches {\r\n  display: flex;\r\n  margin-top: 20px;\n}\n.vc-slider-swatch {\r\n  margin-right: 1px;\r\n  flex: 1;\r\n  width: 20%;\n}\n.vc-slider-swatch:first-child {\r\n  margin-right: 1px;\n}\n.vc-slider-swatch:first-child .vc-slider-swatch-picker {\r\n  border-radius: 2px 0px 0px 2px;\n}\n.vc-slider-swatch:last-child {\r\n  margin-right: 0;\n}\n.vc-slider-swatch:last-child .vc-slider-swatch-picker {\r\n  border-radius: 0px 2px 2px 0px;\n}\n.vc-slider-swatch-picker {\r\n  cursor: pointer;\r\n  height: 12px;\n}\n.vc-slider-swatch-picker--active {\r\n  transform: scaleY(1.8);\r\n  border-radius: 3.6px/2px;\n}\n.vc-slider-swatch-picker--white {\r\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {\r\n  box-shadow: inset 0 0 0 0.6px #ddd;\n}\r\n", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("148e69a7", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7b9aea78\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Hue.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7b9aea78\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Hue.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-hue {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\r\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\r\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\r\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\r\n  cursor: pointer;\r\n  margin: 0 2px;\r\n  position: relative;\r\n  height: 100%;\n}\n.vc-hue-pointer {\r\n  z-index: 2;\r\n  position: absolute;\n}\n.vc-hue-picker {\r\n  cursor: pointer;\r\n  margin-top: 1px;\r\n  width: 4px;\r\n  border-radius: 1px;\r\n  height: 8px;\r\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\r\n  background: #fff;\r\n  transform: translateX(-2px) ;\n}\r\n", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: ["vc-hue", _vm.directionClass] }, [
    _c(
      "div",
      {
        ref: "container",
        staticClass: "vc-hue-container",
        attrs: {
          role: "slider",
          "aria-valuenow": _vm.colors.hsl.h,
          "aria-valuemin": "0",
          "aria-valuemax": "360"
        },
        on: {
          mousedown: _vm.handleMouseDown,
          touchmove: _vm.handleChange,
          touchstart: _vm.handleChange
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "vc-hue-pointer",
            style: { top: _vm.pointerTop, left: _vm.pointerLeft },
            attrs: { role: "presentation" }
          },
          [_c("div", { staticClass: "vc-hue-picker" })]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-7b9aea78", esExports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vc-slider",
      attrs: { role: "application", "aria-label": "Slider color picker" }
    },
    [
      _c(
        "div",
        { staticClass: "vc-slider-hue-warp" },
        [
          _c("hue", {
            on: { change: _vm.hueChange },
            model: {
              value: _vm.colors,
              callback: function($$v) {
                _vm.colors = $$v
              },
              expression: "colors"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vc-slider-swatches", attrs: { role: "group" } },
        _vm._l(_vm.swatches, function(offset, index) {
          return _c(
            "div",
            {
              key: index,
              staticClass: "vc-slider-swatch",
              attrs: {
                "data-index": index,
                "aria-label": "color:" + _vm.colors.hex,
                role: "button"
              },
              on: {
                click: function($event) {
                  return _vm.handleSwClick(index, offset)
                }
              }
            },
            [
              _c("div", {
                staticClass: "vc-slider-swatch-picker",
                class: {
                  "vc-slider-swatch-picker--active": offset == _vm.activeOffset,
                  "vc-slider-swatch-picker--white": offset === "1"
                },
                style: {
                  background:
                    "hsl(" + _vm.colors.hsl.h + ", 50%, " + offset * 100 + "%)"
                }
              })
            ]
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-2dedc691", esExports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Swatches_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Swatches_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Swatches_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Swatches_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Swatches_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_2395c5cc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Swatches_vue__ = __webpack_require__(54);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(51)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Swatches_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_2395c5cc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Swatches_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Swatches.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2395c5cc", Component.options)
  } else {
    hotAPI.reload("data-v-2395c5cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("657f785a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2395c5cc\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Swatches.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2395c5cc\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Swatches.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-swatches {\r\n  width: 320px;\r\n  height: 240px;\r\n  overflow-y: scroll;\r\n  background-color: #fff;\r\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n}\n.vc-swatches-box {\r\n  padding: 16px 0 6px 16px;\r\n  overflow: hidden;\n}\n.vc-swatches-color-group {\r\n  padding-bottom: 10px;\r\n  width: 40px;\r\n  float: left;\r\n  margin-right: 10px;\n}\n.vc-swatches-color-it {\r\n  box-sizing: border-box;\r\n  width: 40px;\r\n  height: 24px;\r\n  cursor: pointer;\r\n  background: #880e4f;\r\n  margin-bottom: 1px;\r\n  overflow: hidden;\r\n  -ms-border-radius: 2px 2px 0 0;\r\n  -moz-border-radius: 2px 2px 0 0;\r\n  -o-border-radius: 2px 2px 0 0;\r\n  -webkit-border-radius: 2px 2px 0 0;\r\n  border-radius: 2px 2px 0 0;\n}\n.vc-swatches-color--white {\r\n  border: 1px solid #DDD;\n}\n.vc-swatches-pick {\r\n  fill: rgb(255, 255, 255);\r\n  margin-left: 8px;\r\n  display: block;\n}\n.vc-swatches-color--white .vc-swatches-pick {\r\n  fill: rgb(51, 51, 51);\n}\r\n", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "red", function() { return red; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pink", function() { return pink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purple", function() { return purple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepPurple", function() { return deepPurple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indigo", function() { return indigo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return blue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightBlue", function() { return lightBlue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cyan", function() { return cyan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "teal", function() { return teal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "green", function() { return green; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightGreen", function() { return lightGreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lime", function() { return lime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yellow", function() { return yellow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "amber", function() { return amber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orange", function() { return orange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepOrange", function() { return deepOrange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brown", function() { return brown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grey", function() { return grey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blueGrey", function() { return blueGrey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkText", function() { return darkText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightText", function() { return lightText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkIcons", function() { return darkIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightIcons", function() { return lightIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "white", function() { return white; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "black", function() { return black; });
var red = {"50":"#ffebee","100":"#ffcdd2","200":"#ef9a9a","300":"#e57373","400":"#ef5350","500":"#f44336","600":"#e53935","700":"#d32f2f","800":"#c62828","900":"#b71c1c","a100":"#ff8a80","a200":"#ff5252","a400":"#ff1744","a700":"#d50000"};
var pink = {"50":"#fce4ec","100":"#f8bbd0","200":"#f48fb1","300":"#f06292","400":"#ec407a","500":"#e91e63","600":"#d81b60","700":"#c2185b","800":"#ad1457","900":"#880e4f","a100":"#ff80ab","a200":"#ff4081","a400":"#f50057","a700":"#c51162"};
var purple = {"50":"#f3e5f5","100":"#e1bee7","200":"#ce93d8","300":"#ba68c8","400":"#ab47bc","500":"#9c27b0","600":"#8e24aa","700":"#7b1fa2","800":"#6a1b9a","900":"#4a148c","a100":"#ea80fc","a200":"#e040fb","a400":"#d500f9","a700":"#aa00ff"};
var deepPurple = {"50":"#ede7f6","100":"#d1c4e9","200":"#b39ddb","300":"#9575cd","400":"#7e57c2","500":"#673ab7","600":"#5e35b1","700":"#512da8","800":"#4527a0","900":"#311b92","a100":"#b388ff","a200":"#7c4dff","a400":"#651fff","a700":"#6200ea"};
var indigo = {"50":"#e8eaf6","100":"#c5cae9","200":"#9fa8da","300":"#7986cb","400":"#5c6bc0","500":"#3f51b5","600":"#3949ab","700":"#303f9f","800":"#283593","900":"#1a237e","a100":"#8c9eff","a200":"#536dfe","a400":"#3d5afe","a700":"#304ffe"};
var blue = {"50":"#e3f2fd","100":"#bbdefb","200":"#90caf9","300":"#64b5f6","400":"#42a5f5","500":"#2196f3","600":"#1e88e5","700":"#1976d2","800":"#1565c0","900":"#0d47a1","a100":"#82b1ff","a200":"#448aff","a400":"#2979ff","a700":"#2962ff"};
var lightBlue = {"50":"#e1f5fe","100":"#b3e5fc","200":"#81d4fa","300":"#4fc3f7","400":"#29b6f6","500":"#03a9f4","600":"#039be5","700":"#0288d1","800":"#0277bd","900":"#01579b","a100":"#80d8ff","a200":"#40c4ff","a400":"#00b0ff","a700":"#0091ea"};
var cyan = {"50":"#e0f7fa","100":"#b2ebf2","200":"#80deea","300":"#4dd0e1","400":"#26c6da","500":"#00bcd4","600":"#00acc1","700":"#0097a7","800":"#00838f","900":"#006064","a100":"#84ffff","a200":"#18ffff","a400":"#00e5ff","a700":"#00b8d4"};
var teal = {"50":"#e0f2f1","100":"#b2dfdb","200":"#80cbc4","300":"#4db6ac","400":"#26a69a","500":"#009688","600":"#00897b","700":"#00796b","800":"#00695c","900":"#004d40","a100":"#a7ffeb","a200":"#64ffda","a400":"#1de9b6","a700":"#00bfa5"};
var green = {"50":"#e8f5e9","100":"#c8e6c9","200":"#a5d6a7","300":"#81c784","400":"#66bb6a","500":"#4caf50","600":"#43a047","700":"#388e3c","800":"#2e7d32","900":"#1b5e20","a100":"#b9f6ca","a200":"#69f0ae","a400":"#00e676","a700":"#00c853"};
var lightGreen = {"50":"#f1f8e9","100":"#dcedc8","200":"#c5e1a5","300":"#aed581","400":"#9ccc65","500":"#8bc34a","600":"#7cb342","700":"#689f38","800":"#558b2f","900":"#33691e","a100":"#ccff90","a200":"#b2ff59","a400":"#76ff03","a700":"#64dd17"};
var lime = {"50":"#f9fbe7","100":"#f0f4c3","200":"#e6ee9c","300":"#dce775","400":"#d4e157","500":"#cddc39","600":"#c0ca33","700":"#afb42b","800":"#9e9d24","900":"#827717","a100":"#f4ff81","a200":"#eeff41","a400":"#c6ff00","a700":"#aeea00"};
var yellow = {"50":"#fffde7","100":"#fff9c4","200":"#fff59d","300":"#fff176","400":"#ffee58","500":"#ffeb3b","600":"#fdd835","700":"#fbc02d","800":"#f9a825","900":"#f57f17","a100":"#ffff8d","a200":"#ffff00","a400":"#ffea00","a700":"#ffd600"};
var amber = {"50":"#fff8e1","100":"#ffecb3","200":"#ffe082","300":"#ffd54f","400":"#ffca28","500":"#ffc107","600":"#ffb300","700":"#ffa000","800":"#ff8f00","900":"#ff6f00","a100":"#ffe57f","a200":"#ffd740","a400":"#ffc400","a700":"#ffab00"};
var orange = {"50":"#fff3e0","100":"#ffe0b2","200":"#ffcc80","300":"#ffb74d","400":"#ffa726","500":"#ff9800","600":"#fb8c00","700":"#f57c00","800":"#ef6c00","900":"#e65100","a100":"#ffd180","a200":"#ffab40","a400":"#ff9100","a700":"#ff6d00"};
var deepOrange = {"50":"#fbe9e7","100":"#ffccbc","200":"#ffab91","300":"#ff8a65","400":"#ff7043","500":"#ff5722","600":"#f4511e","700":"#e64a19","800":"#d84315","900":"#bf360c","a100":"#ff9e80","a200":"#ff6e40","a400":"#ff3d00","a700":"#dd2c00"};
var brown = {"50":"#efebe9","100":"#d7ccc8","200":"#bcaaa4","300":"#a1887f","400":"#8d6e63","500":"#795548","600":"#6d4c41","700":"#5d4037","800":"#4e342e","900":"#3e2723"};
var grey = {"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121"};
var blueGrey = {"50":"#eceff1","100":"#cfd8dc","200":"#b0bec5","300":"#90a4ae","400":"#78909c","500":"#607d8b","600":"#546e7a","700":"#455a64","800":"#37474f","900":"#263238"};
var darkText = {"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","dividers":"rgba(0, 0, 0, 0.12)"};
var lightText = {"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","dividers":"rgba(255, 255, 255, 0.12)"};
var darkIcons = {"active":"rgba(0, 0, 0, 0.54)","inactive":"rgba(0, 0, 0, 0.38)"};
var lightIcons = {"active":"rgba(255, 255, 255, 1)","inactive":"rgba(255, 255, 255, 0.5)"};
var white = "#ffffff";
var black = "#000000";

/* harmony default export */ __webpack_exports__["default"] = ({
  red: red,
  pink: pink,
  purple: purple,
  deepPurple: deepPurple,
  indigo: indigo,
  blue: blue,
  lightBlue: lightBlue,
  cyan: cyan,
  teal: teal,
  green: green,
  lightGreen: lightGreen,
  lime: lime,
  yellow: yellow,
  amber: amber,
  orange: orange,
  deepOrange: deepOrange,
  brown: brown,
  grey: grey,
  blueGrey: blueGrey,
  darkText: darkText,
  lightText: lightText,
  darkIcons: darkIcons,
  lightIcons: lightIcons,
  white: white,
  black: black
});


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vc-swatches",
      attrs: {
        role: "application",
        "aria-label": "Swatches color picker",
        "data-pick": _vm.pick
      }
    },
    [
      _c(
        "div",
        { staticClass: "vc-swatches-box", attrs: { role: "listbox" } },
        _vm._l(_vm.palette, function(group, $idx) {
          return _c(
            "div",
            { key: $idx, staticClass: "vc-swatches-color-group" },
            _vm._l(group, function(c) {
              return _c(
                "div",
                {
                  key: c,
                  class: [
                    "vc-swatches-color-it",
                    { "vc-swatches-color--white": c === "#FFFFFF" }
                  ],
                  style: { background: c },
                  attrs: {
                    role: "option",
                    "aria-label": "Color:" + c,
                    "aria-selected": _vm.equal(c),
                    "data-color": c
                  },
                  on: {
                    click: function($event) {
                      return _vm.handlerClick(c)
                    }
                  }
                },
                [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.equal(c),
                          expression: "equal(c)"
                        }
                      ],
                      staticClass: "vc-swatches-pick"
                    },
                    [
                      _c(
                        "svg",
                        {
                          staticStyle: { width: "24px", height: "24px" },
                          attrs: { viewBox: "0 0 24 24" }
                        },
                        [
                          _c("path", {
                            attrs: {
                              d:
                                "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                            }
                          })
                        ]
                      )
                    ]
                  )
                ]
              )
            }),
            0
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-2395c5cc", esExports)
  }
}

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Photoshop_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Photoshop_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Photoshop_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Photoshop_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Photoshop_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_797d57b0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Photoshop_vue__ = __webpack_require__(70);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(56)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Photoshop_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_797d57b0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Photoshop_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Photoshop.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-797d57b0", Component.options)
  } else {
    hotAPI.reload("data-v-797d57b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("2191bea4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-797d57b0\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Photoshop.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-797d57b0\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Photoshop.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-photoshop {\r\n  background: #DCDCDC;\r\n  border-radius: 4px;\r\n  box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15);\r\n  box-sizing: initial;\r\n  width: 513px;\r\n  font-family: Roboto;\n}\n.vc-photoshop__disable-fields {\r\n  width: 390px;\n}\n.vc-ps-head {\r\n  background-image: linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%);\r\n  border-bottom: 1px solid #B1B1B1;\r\n  box-shadow: inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02);\r\n  height: 23px;\r\n  line-height: 24px;\r\n  border-radius: 4px 4px 0 0;\r\n  font-size: 13px;\r\n  color: #4D4D4D;\r\n  text-align: center;\n}\n.vc-ps-body {\r\n  padding: 15px;\r\n  display: flex;\n}\n.vc-ps-saturation-wrap {\r\n  width: 256px;\r\n  height: 256px;\r\n  position: relative;\r\n  border: 2px solid #B3B3B3;\r\n  border-bottom: 2px solid #F0F0F0;\r\n  overflow: hidden;\n}\n.vc-ps-saturation-wrap .vc-saturation-circle {\r\n  width: 12px;\r\n  height: 12px;\n}\n.vc-ps-hue-wrap {\r\n  position: relative;\r\n  height: 256px;\r\n  width: 19px;\r\n  margin-left: 10px;\r\n  border: 2px solid #B3B3B3;\r\n  border-bottom: 2px solid #F0F0F0;\n}\n.vc-ps-hue-pointer {\r\n  position: relative;\n}\n.vc-ps-hue-pointer--left,\r\n.vc-ps-hue-pointer--right {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  border-style: solid;\r\n  border-width: 5px 0 5px 8px;\r\n  border-color: transparent transparent transparent #555;\n}\n.vc-ps-hue-pointer--left:after,\r\n.vc-ps-hue-pointer--right:after {\r\n  content: \"\";\r\n  width: 0;\r\n  height: 0;\r\n  border-style: solid;\r\n  border-width: 4px 0 4px 6px;\r\n  border-color: transparent transparent transparent #fff;\r\n  position: absolute;\r\n  top: 1px;\r\n  left: 1px;\r\n  transform: translate(-8px, -5px);\n}\n.vc-ps-hue-pointer--left {\r\n  transform: translate(-13px, -4px);\n}\n.vc-ps-hue-pointer--right {\r\n  transform: translate(20px, -4px) rotate(180deg);\n}\n.vc-ps-controls {\r\n  width: 180px;\r\n  margin-left: 10px;\r\n  display: flex;\n}\n.vc-ps-controls__disable-fields {\r\n  width: auto;\n}\n.vc-ps-actions {\r\n  margin-left: 20px;\r\n  flex: 1;\n}\n.vc-ps-ac-btn {\r\n  cursor: pointer;\r\n  background-image: linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%);\r\n  border: 1px solid #878787;\r\n  border-radius: 2px;\r\n  height: 20px;\r\n  box-shadow: 0 1px 0 0 #EAEAEA;\r\n  font-size: 14px;\r\n  color: #000;\r\n  line-height: 20px;\r\n  text-align: center;\r\n  margin-bottom: 10px;\n}\n.vc-ps-previews {\r\n  width: 60px;\n}\n.vc-ps-previews__swatches {\r\n  border: 1px solid #B3B3B3;\r\n  border-bottom: 1px solid #F0F0F0;\r\n  margin-bottom: 2px;\r\n  margin-top: 1px;\n}\n.vc-ps-previews__pr-color {\r\n  height: 34px;\r\n  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;\n}\n.vc-ps-previews__label {\r\n  font-size: 14px;\r\n  color: #000;\r\n  text-align: center;\n}\n.vc-ps-fields {\r\n  padding-top: 5px;\r\n  padding-bottom: 9px;\r\n  width: 80px;\r\n  position: relative;\n}\n.vc-ps-fields .vc-input__input {\r\n  margin-left: 40%;\r\n  width: 40%;\r\n  height: 18px;\r\n  border: 1px solid #888888;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\r\n  margin-bottom: 5px;\r\n  font-size: 13px;\r\n  padding-left: 3px;\r\n  margin-right: 10px;\n}\n.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {\r\n  top: 0;\r\n  text-transform: uppercase;\r\n  font-size: 13px;\r\n  height: 18px;\r\n  line-height: 22px;\r\n  position: absolute;\n}\n.vc-ps-fields .vc-input__label {\r\n  left: 0;\r\n  width: 34px;\n}\n.vc-ps-fields .vc-input__desc {\r\n  right: 0;\r\n  width: 0;\n}\n.vc-ps-fields__divider {\r\n  height: 5px;\n}\n.vc-ps-fields__hex .vc-input__input {\r\n  margin-left: 20%;\r\n  width: 80%;\r\n  height: 18px;\r\n  border: 1px solid #888888;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\r\n  margin-bottom: 6px;\r\n  font-size: 13px;\r\n  padding-left: 3px;\n}\n.vc-ps-fields__hex .vc-input__label {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 14px;\r\n  text-transform: uppercase;\r\n  font-size: 13px;\r\n  height: 18px;\r\n  line-height: 22px;\n}\r\n", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("6799b4fc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ba139894\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Saturation.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ba139894\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Saturation.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-saturation,\r\n.vc-saturation--white,\r\n.vc-saturation--black {\r\n  cursor: pointer;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\n}\n.vc-saturation--white {\r\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\r\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\r\n  cursor: pointer;\r\n  position: absolute;\n}\n.vc-saturation-circle {\r\n  cursor: head;\r\n  width: 4px;\r\n  height: 4px;\r\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\r\n  border-radius: 50%;\r\n  transform: translate(-2px, -2px);\n}\r\n", ""]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)))

/***/ }),
/* 62 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "container",
      staticClass: "vc-saturation",
      style: { background: _vm.bgColor },
      on: {
        mousedown: _vm.handleMouseDown,
        touchmove: _vm.handleChange,
        touchstart: _vm.handleChange
      }
    },
    [
      _c("div", { staticClass: "vc-saturation--white" }),
      _vm._v(" "),
      _c("div", { staticClass: "vc-saturation--black" }),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "vc-saturation-pointer",
          style: { top: _vm.pointerTop, left: _vm.pointerLeft }
        },
        [_c("div", { staticClass: "vc-saturation-circle" })]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-ba139894", esExports)
  }
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3f148beb", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1af1f1ac\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Alpha.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1af1f1ac\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Alpha.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-alpha {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\r\n  overflow: hidden;\n}\n.vc-alpha-gradient {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\n}\n.vc-alpha-container {\r\n  cursor: pointer;\r\n  position: relative;\r\n  z-index: 2;\r\n  height: 100%;\r\n  margin: 0 3px;\n}\n.vc-alpha-pointer {\r\n  z-index: 2;\r\n  position: absolute;\n}\n.vc-alpha-picker {\r\n  cursor: pointer;\r\n  width: 4px;\r\n  border-radius: 1px;\r\n  height: 8px;\r\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\r\n  background: #fff;\r\n  margin-top: 1px;\r\n  transform: translateX(-2px);\n}\r\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("78f8f010", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5b6dc0c2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Checkboard.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5b6dc0c2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Checkboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-checkerboard {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\r\n  background-size: contain;\n}\r\n", ""]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "vc-checkerboard", style: _vm.bgStyle })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5b6dc0c2", esExports)
  }
}

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "vc-alpha" }, [
    _c(
      "div",
      { staticClass: "vc-alpha-checkboard-wrap" },
      [_c("checkboard")],
      1
    ),
    _vm._v(" "),
    _c("div", {
      staticClass: "vc-alpha-gradient",
      style: { background: _vm.gradientColor }
    }),
    _vm._v(" "),
    _c(
      "div",
      {
        ref: "container",
        staticClass: "vc-alpha-container",
        on: {
          mousedown: _vm.handleMouseDown,
          touchmove: _vm.handleChange,
          touchstart: _vm.handleChange
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "vc-alpha-pointer",
            style: { left: _vm.colors.a * 100 + "%" }
          },
          [_c("div", { staticClass: "vc-alpha-picker" })]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-1af1f1ac", esExports)
  }
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        "vc-photoshop",
        _vm.disableFields ? "vc-photoshop__disable-fields" : ""
      ],
      attrs: { role: "application", "aria-label": "PhotoShop color picker" }
    },
    [
      _c("div", { staticClass: "vc-ps-head", attrs: { role: "heading" } }, [
        _vm._v(_vm._s(_vm.head))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "vc-ps-body" }, [
        _c(
          "div",
          { staticClass: "vc-ps-saturation-wrap" },
          [
            _c("saturation", {
              on: { change: _vm.childChange },
              model: {
                value: _vm.colors,
                callback: function($$v) {
                  _vm.colors = $$v
                },
                expression: "colors"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "vc-ps-hue-wrap" },
          [
            _c(
              "hue",
              {
                attrs: { direction: "vertical" },
                on: { change: _vm.childChange },
                model: {
                  value: _vm.colors,
                  callback: function($$v) {
                    _vm.colors = $$v
                  },
                  expression: "colors"
                }
              },
              [
                _c("div", { staticClass: "vc-ps-hue-pointer" }, [
                  _c("i", { staticClass: "vc-ps-hue-pointer--left" }),
                  _c("i", { staticClass: "vc-ps-hue-pointer--right" })
                ])
              ]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            class: [
              "vc-ps-controls",
              _vm.disableFields ? "vc-ps-controls__disable-fields" : ""
            ]
          },
          [
            _c("div", { staticClass: "vc-ps-previews" }, [
              _c("div", { staticClass: "vc-ps-previews__label" }, [
                _vm._v(_vm._s(_vm.newLabel))
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vc-ps-previews__swatches" }, [
                _c("div", {
                  staticClass: "vc-ps-previews__pr-color",
                  style: { background: _vm.colors.hex },
                  attrs: { "aria-label": "New color is " + _vm.colors.hex }
                }),
                _vm._v(" "),
                _c("div", {
                  staticClass: "vc-ps-previews__pr-color",
                  style: { background: _vm.currentColor },
                  attrs: {
                    "aria-label": "Current color is " + _vm.currentColor
                  },
                  on: { click: _vm.clickCurrentColor }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vc-ps-previews__label" }, [
                _vm._v(_vm._s(_vm.currentLabel))
              ])
            ]),
            _vm._v(" "),
            !_vm.disableFields
              ? _c("div", { staticClass: "vc-ps-actions" }, [
                  _c(
                    "div",
                    {
                      staticClass: "vc-ps-ac-btn",
                      attrs: { role: "button", "aria-label": _vm.acceptLabel },
                      on: { click: _vm.handleAccept }
                    },
                    [_vm._v(_vm._s(_vm.acceptLabel))]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "vc-ps-ac-btn",
                      attrs: { role: "button", "aria-label": _vm.cancelLabel },
                      on: { click: _vm.handleCancel }
                    },
                    [_vm._v(_vm._s(_vm.cancelLabel))]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "vc-ps-fields" },
                    [
                      _c("ed-in", {
                        attrs: { label: "h", desc: "°", value: _vm.hsv.h },
                        on: { change: _vm.inputChange }
                      }),
                      _vm._v(" "),
                      _c("ed-in", {
                        attrs: {
                          label: "s",
                          desc: "%",
                          value: _vm.hsv.s,
                          max: 100
                        },
                        on: { change: _vm.inputChange }
                      }),
                      _vm._v(" "),
                      _c("ed-in", {
                        attrs: {
                          label: "v",
                          desc: "%",
                          value: _vm.hsv.v,
                          max: 100
                        },
                        on: { change: _vm.inputChange }
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "vc-ps-fields__divider" }),
                      _vm._v(" "),
                      _c("ed-in", {
                        attrs: { label: "r", value: _vm.colors.rgba.r },
                        on: { change: _vm.inputChange }
                      }),
                      _vm._v(" "),
                      _c("ed-in", {
                        attrs: { label: "g", value: _vm.colors.rgba.g },
                        on: { change: _vm.inputChange }
                      }),
                      _vm._v(" "),
                      _c("ed-in", {
                        attrs: { label: "b", value: _vm.colors.rgba.b },
                        on: { change: _vm.inputChange }
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "vc-ps-fields__divider" }),
                      _vm._v(" "),
                      _c("ed-in", {
                        staticClass: "vc-ps-fields__hex",
                        attrs: { label: "#", value: _vm.hex },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.hasResetButton
                    ? _c(
                        "div",
                        {
                          staticClass: "vc-ps-ac-btn",
                          attrs: { "aria-label": "reset" },
                          on: { click: _vm.handleReset }
                        },
                        [_vm._v(_vm._s(_vm.resetLabel))]
                      )
                    : _vm._e()
                ])
              : _vm._e()
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-797d57b0", esExports)
  }
}

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Sketch_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Sketch_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Sketch_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Sketch_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Sketch_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4491bbdc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Sketch_vue__ = __webpack_require__(74);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(72)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Sketch_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4491bbdc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Sketch_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Sketch.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4491bbdc", Component.options)
  } else {
    hotAPI.reload("data-v-4491bbdc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("aa6963f4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4491bbdc\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Sketch.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4491bbdc\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Sketch.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-sketch {\r\n  position: relative;\r\n  width: 200px;\r\n  padding: 10px 10px 0;\r\n  box-sizing: initial;\r\n  background: #fff;\r\n  border-radius: 4px;\r\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n.vc-sketch-saturation-wrap {\r\n  width: 100%;\r\n  padding-bottom: 75%;\r\n  position: relative;\r\n  overflow: hidden;\n}\n.vc-sketch-controls {\r\n  display: flex;\n}\n.vc-sketch-sliders {\r\n  padding: 4px 0;\r\n  flex: 1;\n}\n.vc-sketch-sliders .vc-hue,\r\n.vc-sketch-sliders .vc-alpha-gradient {\r\n  border-radius: 2px;\n}\n.vc-sketch-hue-wrap {\r\n  position: relative;\r\n  height: 10px;\n}\n.vc-sketch-alpha-wrap {\r\n  position: relative;\r\n  height: 10px;\r\n  margin-top: 4px;\r\n  overflow: hidden;\n}\n.vc-sketch-color-wrap {\r\n  width: 24px;\r\n  height: 24px;\r\n  position: relative;\r\n  margin-top: 4px;\r\n  margin-left: 4px;\r\n  border-radius: 3px;\n}\n.vc-sketch-active-color {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  border-radius: 2px;\r\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\r\n  z-index: 2;\n}\n.vc-sketch-color-wrap .vc-checkerboard {\r\n  background-size: auto;\n}\n.vc-sketch-field {\r\n  display: flex;\r\n  padding-top: 4px;\n}\n.vc-sketch-field .vc-input__input {\r\n  width: 90%;\r\n  padding: 4px 0 3px 10%;\r\n  border: none;\r\n  box-shadow: inset 0 0 0 1px #ccc;\r\n  font-size: 10px;\n}\n.vc-sketch-field .vc-input__label {\r\n  display: block;\r\n  text-align: center;\r\n  font-size: 11px;\r\n  color: #222;\r\n  padding-top: 3px;\r\n  padding-bottom: 4px;\r\n  text-transform: capitalize;\n}\n.vc-sketch-field--single {\r\n  flex: 1;\r\n  padding-left: 6px;\n}\n.vc-sketch-field--double {\r\n  flex: 2;\n}\n.vc-sketch-presets {\r\n  margin-right: -10px;\r\n  margin-left: -10px;\r\n  padding-left: 10px;\r\n  padding-top: 10px;\r\n  border-top: 1px solid #eee;\n}\n.vc-sketch-presets-color {\r\n  border-radius: 3px;\r\n  overflow: hidden;\r\n  position: relative;\r\n  display: inline-block;\r\n  margin: 0 10px 10px 0;\r\n  vertical-align: top;\r\n  cursor: pointer;\r\n  width: 16px;\r\n  height: 16px;\r\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n.vc-sketch-presets-color .vc-checkerboard {\r\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\r\n  border-radius: 3px;\n}\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\r\n  height: 10px;\n}\r\n", ""]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: ["vc-sketch", _vm.disableAlpha ? "vc-sketch__disable-alpha" : ""],
      attrs: { role: "application", "aria-label": "Sketch color picker" }
    },
    [
      _c(
        "div",
        { staticClass: "vc-sketch-saturation-wrap" },
        [
          _c("saturation", {
            on: { change: _vm.childChange },
            model: {
              value: _vm.colors,
              callback: function($$v) {
                _vm.colors = $$v
              },
              expression: "colors"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "vc-sketch-controls" }, [
        _c("div", { staticClass: "vc-sketch-sliders" }, [
          _c(
            "div",
            { staticClass: "vc-sketch-hue-wrap" },
            [
              _c("hue", {
                on: { change: _vm.childChange },
                model: {
                  value: _vm.colors,
                  callback: function($$v) {
                    _vm.colors = $$v
                  },
                  expression: "colors"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          !_vm.disableAlpha
            ? _c(
                "div",
                { staticClass: "vc-sketch-alpha-wrap" },
                [
                  _c("alpha", {
                    on: { change: _vm.childChange },
                    model: {
                      value: _vm.colors,
                      callback: function($$v) {
                        _vm.colors = $$v
                      },
                      expression: "colors"
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "vc-sketch-color-wrap" },
          [
            _c("div", {
              staticClass: "vc-sketch-active-color",
              style: { background: _vm.activeColor },
              attrs: { "aria-label": "Current color is " + _vm.activeColor }
            }),
            _vm._v(" "),
            _c("checkboard")
          ],
          1
        )
      ]),
      _vm._v(" "),
      !_vm.disableFields
        ? _c("div", { staticClass: "vc-sketch-field" }, [
            _c(
              "div",
              { staticClass: "vc-sketch-field--double" },
              [
                _c("ed-in", {
                  attrs: { label: "hex", value: _vm.hex },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vc-sketch-field--single" },
              [
                _c("ed-in", {
                  attrs: { label: "r", value: _vm.colors.rgba.r },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vc-sketch-field--single" },
              [
                _c("ed-in", {
                  attrs: { label: "g", value: _vm.colors.rgba.g },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vc-sketch-field--single" },
              [
                _c("ed-in", {
                  attrs: { label: "b", value: _vm.colors.rgba.b },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            !_vm.disableAlpha
              ? _c(
                  "div",
                  { staticClass: "vc-sketch-field--single" },
                  [
                    _c("ed-in", {
                      attrs: {
                        label: "a",
                        value: _vm.colors.a,
                        "arrow-offset": 0.01,
                        max: 1
                      },
                      on: { change: _vm.inputChange }
                    })
                  ],
                  1
                )
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "vc-sketch-presets",
          attrs: {
            role: "group",
            "aria-label": "A color preset, pick one to set as current color"
          }
        },
        [
          _vm._l(_vm.presetColors, function(c) {
            return [
              !_vm.isTransparent(c)
                ? _c("div", {
                    key: c,
                    staticClass: "vc-sketch-presets-color",
                    style: { background: c },
                    attrs: { "aria-label": "Color:" + c },
                    on: {
                      click: function($event) {
                        return _vm.handlePreset(c)
                      }
                    }
                  })
                : _c(
                    "div",
                    {
                      key: c,
                      staticClass: "vc-sketch-presets-color",
                      attrs: { "aria-label": "Color:" + c },
                      on: {
                        click: function($event) {
                          return _vm.handlePreset(c)
                        }
                      }
                    },
                    [_c("checkboard")],
                    1
                  )
            ]
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4491bbdc", esExports)
  }
}

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Chrome_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Chrome_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Chrome_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Chrome_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Chrome_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_dbf8a8ac_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Chrome_vue__ = __webpack_require__(78);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(76)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Chrome_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_dbf8a8ac_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Chrome_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Chrome.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dbf8a8ac", Component.options)
  } else {
    hotAPI.reload("data-v-dbf8a8ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("223fdf34", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dbf8a8ac\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Chrome.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dbf8a8ac\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Chrome.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-chrome {\r\n  background: #fff;\r\n  border-radius: 2px;\r\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\r\n  box-sizing: initial;\r\n  width: 225px;\r\n  font-family: Menlo;\r\n  background-color: #fff;\n}\n.vc-chrome-controls {\r\n  display: flex;\n}\n.vc-chrome-color-wrap {\r\n  position: relative;\r\n  width: 36px;\n}\n.vc-chrome-active-color {\r\n  position: relative;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  overflow: hidden;\r\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  background-size: auto;\n}\n.vc-chrome-sliders {\r\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\r\n  display: flex;\r\n  padding-top: 16px;\n}\n.vc-chrome-fields {\r\n  display: flex;\r\n  margin-left: -6px;\r\n  flex: 1;\n}\n.vc-chrome-field {\r\n  padding-left: 6px;\r\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\r\n  width: 32px;\r\n  text-align: right;\r\n  position: relative;\n}\n.vc-chrome-toggle-icon {\r\n  margin-right: -4px;\r\n  margin-top: 12px;\r\n  cursor: pointer;\r\n  position: relative;\r\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\r\n  position: absolute;\r\n  width: 24px;\r\n  height: 28px;\r\n  background: #eee;\r\n  border-radius: 4px;\r\n  top: 10px;\r\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\r\n  position: relative;\r\n  height: 10px;\r\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\r\n  position: relative;\r\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\r\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\r\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 6px;\r\n  transform: translate(-6px, -2px);\r\n  background-color: rgb(248, 248, 248);\r\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\r\n  padding: 16px 16px 12px;\r\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\r\n  width: 100%;\r\n  padding-bottom: 55%;\r\n  position: relative;\r\n  border-radius: 2px 2px 0 0;\r\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\r\n  width: 12px;\r\n  height: 12px;\n}\n.vc-chrome-fields .vc-input__input {\r\n  font-size: 11px;\r\n  color: #333;\r\n  width: 100%;\r\n  border-radius: 2px;\r\n  border: none;\r\n  box-shadow: inset 0 0 0 1px #dadada;\r\n  height: 21px;\r\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\r\n  text-transform: uppercase;\r\n  font-size: 11px;\r\n  line-height: 11px;\r\n  color: #969696;\r\n  text-align: center;\r\n  display: block;\r\n  margin-top: 12px;\n}\n.vc-chrome__disable-alpha .vc-chrome-active-color {\r\n  width: 18px;\r\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\r\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\r\n  margin-top: 4px;\r\n  margin-bottom: 4px;\n}\r\n", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: ["vc-chrome", _vm.disableAlpha ? "vc-chrome__disable-alpha" : ""],
      attrs: { role: "application", "aria-label": "Chrome color picker" }
    },
    [
      _c(
        "div",
        { staticClass: "vc-chrome-saturation-wrap" },
        [
          _c("saturation", {
            on: { change: _vm.childChange },
            model: {
              value: _vm.colors,
              callback: function($$v) {
                _vm.colors = $$v
              },
              expression: "colors"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "vc-chrome-body" }, [
        _c("div", { staticClass: "vc-chrome-controls" }, [
          _c(
            "div",
            { staticClass: "vc-chrome-color-wrap" },
            [
              _c("div", {
                staticClass: "vc-chrome-active-color",
                style: { background: _vm.activeColor },
                attrs: { "aria-label": "current color is " + _vm.colors.hex }
              }),
              _vm._v(" "),
              !_vm.disableAlpha ? _c("checkboard") : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "vc-chrome-sliders" }, [
            _c(
              "div",
              { staticClass: "vc-chrome-hue-wrap" },
              [
                _c("hue", {
                  on: { change: _vm.childChange },
                  model: {
                    value: _vm.colors,
                    callback: function($$v) {
                      _vm.colors = $$v
                    },
                    expression: "colors"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            !_vm.disableAlpha
              ? _c(
                  "div",
                  { staticClass: "vc-chrome-alpha-wrap" },
                  [
                    _c("alpha", {
                      on: { change: _vm.childChange },
                      model: {
                        value: _vm.colors,
                        callback: function($$v) {
                          _vm.colors = $$v
                        },
                        expression: "colors"
                      }
                    })
                  ],
                  1
                )
              : _vm._e()
          ])
        ]),
        _vm._v(" "),
        !_vm.disableFields
          ? _c("div", { staticClass: "vc-chrome-fields-wrap" }, [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.fieldsIndex === 0,
                      expression: "fieldsIndex === 0"
                    }
                  ],
                  staticClass: "vc-chrome-fields"
                },
                [
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      !_vm.hasAlpha
                        ? _c("ed-in", {
                            attrs: { label: "hex", value: _vm.colors.hex },
                            on: { change: _vm.inputChange }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.hasAlpha
                        ? _c("ed-in", {
                            attrs: { label: "hex", value: _vm.colors.hex8 },
                            on: { change: _vm.inputChange }
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.fieldsIndex === 1,
                      expression: "fieldsIndex === 1"
                    }
                  ],
                  staticClass: "vc-chrome-fields"
                },
                [
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      _c("ed-in", {
                        attrs: { label: "r", value: _vm.colors.rgba.r },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      _c("ed-in", {
                        attrs: { label: "g", value: _vm.colors.rgba.g },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      _c("ed-in", {
                        attrs: { label: "b", value: _vm.colors.rgba.b },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  !_vm.disableAlpha
                    ? _c(
                        "div",
                        { staticClass: "vc-chrome-field" },
                        [
                          _c("ed-in", {
                            attrs: {
                              label: "a",
                              value: _vm.colors.a,
                              "arrow-offset": 0.01,
                              max: 1
                            },
                            on: { change: _vm.inputChange }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.fieldsIndex === 2,
                      expression: "fieldsIndex === 2"
                    }
                  ],
                  staticClass: "vc-chrome-fields"
                },
                [
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      _c("ed-in", {
                        attrs: { label: "h", value: _vm.hsl.h },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      _c("ed-in", {
                        attrs: { label: "s", value: _vm.hsl.s },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "vc-chrome-field" },
                    [
                      _c("ed-in", {
                        attrs: { label: "l", value: _vm.hsl.l },
                        on: { change: _vm.inputChange }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  !_vm.disableAlpha
                    ? _c(
                        "div",
                        { staticClass: "vc-chrome-field" },
                        [
                          _c("ed-in", {
                            attrs: {
                              label: "a",
                              value: _vm.colors.a,
                              "arrow-offset": 0.01,
                              max: 1
                            },
                            on: { change: _vm.inputChange }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "vc-chrome-toggle-btn",
                  attrs: {
                    role: "button",
                    "aria-label": "Change another color definition"
                  },
                  on: { click: _vm.toggleViews }
                },
                [
                  _c("div", { staticClass: "vc-chrome-toggle-icon" }, [
                    _c(
                      "svg",
                      {
                        staticStyle: { width: "24px", height: "24px" },
                        attrs: { viewBox: "0 0 24 24" },
                        on: {
                          mouseover: _vm.showHighlight,
                          mouseenter: _vm.showHighlight,
                          mouseout: _vm.hideHighlight
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            fill: "#333",
                            d:
                              "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
                          }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.highlight,
                        expression: "highlight"
                      }
                    ],
                    staticClass: "vc-chrome-toggle-icon-highlight"
                  })
                ]
              )
            ])
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-dbf8a8ac", esExports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Circle_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Circle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Circle_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Circle_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Circle_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ac6f0a00_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Circle_vue__ = __webpack_require__(87);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(80)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Circle_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_ac6f0a00_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Circle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Circle.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ac6f0a00", Component.options)
  } else {
    hotAPI.reload("data-v-ac6f0a00", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b1cf710c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ac6f0a00\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Circle.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ac6f0a00\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Circle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-sketch {\n  position: relative;\n  width: 200px;\n  padding: 10px 10px 0;\n  box-sizing: initial;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n.vc-cicle-wrap {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.vc-sketch-controls {\n  display: flex;\n}\n.vc-sketch-sliders {\n  padding: 4px 0;\n  flex: 1;\n}\n.vc-sketch-sliders .vc-hue,\n.vc-sketch-sliders .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-sketch-hue-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-sketch-alpha-wrap {\n  position: relative;\n  height: 10px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n.vc-sketch-color-wrap {\n  width: 24px;\n  height: 24px;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border-radius: 3px;\n}\n.vc-sketch-active-color {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\n  z-index: 2;\n}\n.vc-sketch-color-wrap .vc-checkerboard {\n  background-size: auto;\n}\n.vc-sketch-field {\n  display: flex;\n  padding-top: 4px;\n}\n.vc-sketch-field .vc-input__input {\n  width: 90%;\n  padding: 4px 0 3px 10%;\n  border: none;\n  box-shadow: inset 0 0 0 1px #ccc;\n  font-size: 10px;\n}\n.vc-sketch-field .vc-input__label {\n  display: block;\n  text-align: center;\n  font-size: 11px;\n  color: #222;\n  padding-top: 3px;\n  padding-bottom: 4px;\n  text-transform: capitalize;\n}\n.vc-sketch-field--single {\n  flex: 1;\n  padding-left: 6px;\n}\n.vc-sketch-field--double {\n  flex: 2;\n}\n.vc-sketch-presets {\n  margin-right: -10px;\n  margin-left: -10px;\n  padding-left: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #eee;\n}\n.vc-sketch-presets-color {\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n  margin: 0 10px 10px 0;\n  vertical-align: top;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n.vc-sketch-presets-color .vc-checkerboard {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n  border-radius: 3px;\n}\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\n  height: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("2df5113a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ff66ab4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./HueCircle.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ff66ab4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./HueCircle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(84);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-huecircle {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n  background: url(" + escape(__webpack_require__(85)) + ") no-repeat center center;\n  background-size: 100% 100%;\n}\n.vc-huecircle-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-huecircle-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-huecircle-picker {\n  cursor: pointer;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);\n  background: #fff;\n  transform: translate(-4px, -4px);\n}\n", ""]);

// exports


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAYAAAC+ZpjcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NjU4NjA0Ni1hMjJhLWRhNGEtOTI2NS0zZTg1YzhiYjc4NmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkRGQ0ExMDQ4QjVGMTFFOUJCNzM5MUM1QzcyMjlCQzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkRGQ0ExMDM4QjVGMTFFOUJCNzM5MUM1QzcyMjlCQzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE5YzQyYTgtODM2NS05NjRhLWE5ZjAtYzgwNjI3OGZiMjRkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2NTg2MDQ2LWEyMmEtZGE0YS05MjY1LTNlODVjOGJiNzg2ZSIv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"

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "container",
      staticClass: "vc-huecircle",
      on: {
        mousedown: _vm.handleMouseDown,
        touchmove: _vm.handleChange,
        touchstart: _vm.handleChange
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "vc-huecircle-pointer",
          style: { top: _vm.pointerTop, left: _vm.pointerLeft }
        },
        [_c("div", { staticClass: "vc-huecircle-picker" })]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0ff66ab4", esExports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: ["vc-sketch", _vm.disableAlpha ? "vc-sketch__disable-alpha" : ""],
      attrs: { role: "application", "aria-label": "Sketch color picker" }
    },
    [
      _c(
        "div",
        { staticClass: "vc-cicle-wrap" },
        [
          _c("hueCircle", {
            on: { change: _vm.childChange },
            model: {
              value: _vm.colors,
              callback: function($$v) {
                _vm.colors = $$v
              },
              expression: "colors"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "vc-sketch-controls" }, [
        _c("div", { staticClass: "vc-sketch-sliders" }, [
          _c("div", { staticClass: "vc-sketch-hue-wrap" }),
          _vm._v(" "),
          !_vm.disableAlpha
            ? _c(
                "div",
                { staticClass: "vc-sketch-alpha-wrap" },
                [
                  _c("alpha", {
                    on: { change: _vm.childChange },
                    model: {
                      value: _vm.colors,
                      callback: function($$v) {
                        _vm.colors = $$v
                      },
                      expression: "colors"
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "vc-sketch-color-wrap" },
          [
            _c("div", {
              staticClass: "vc-sketch-active-color",
              style: { background: _vm.activeColor },
              attrs: { "aria-label": "Current color is " + _vm.activeColor }
            }),
            _vm._v(" "),
            _c("checkboard")
          ],
          1
        )
      ]),
      _vm._v(" "),
      !_vm.disableFields
        ? _c("div", { staticClass: "vc-sketch-field" }, [
            _c(
              "div",
              { staticClass: "vc-sketch-field--double" },
              [
                _c("ed-in", {
                  attrs: { label: "hex", value: _vm.hex },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vc-sketch-field--single" },
              [
                _c("ed-in", {
                  attrs: { label: "h", value: _vm.colors.hsv.h },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vc-sketch-field--single" },
              [
                _c("ed-in", {
                  attrs: { label: "s", value: _vm.colors.hsv.s },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vc-sketch-field--single" },
              [
                _c("ed-in", {
                  attrs: { label: "v", value: _vm.colors.hsv.v },
                  on: { change: _vm.inputChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            !_vm.disableAlpha
              ? _c(
                  "div",
                  { staticClass: "vc-sketch-field--single" },
                  [
                    _c("ed-in", {
                      attrs: {
                        label: "a",
                        value: _vm.colors.a,
                        "arrow-offset": 0.01,
                        max: 1
                      },
                      on: { change: _vm.inputChange }
                    })
                  ],
                  1
                )
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "vc-sketch-presets",
          attrs: {
            role: "group",
            "aria-label": "A color preset, pick one to set as current color"
          }
        },
        [
          _vm._l(_vm.presetColors, function(c) {
            return [
              !_vm.isTransparent(c)
                ? _c("div", {
                    key: c,
                    staticClass: "vc-sketch-presets-color",
                    style: { background: c },
                    attrs: { "aria-label": "Color:" + c },
                    on: {
                      click: function($event) {
                        return _vm.handlePreset(c)
                      }
                    }
                  })
                : _c(
                    "div",
                    {
                      key: c,
                      staticClass: "vc-sketch-presets-color",
                      attrs: { "aria-label": "Color:" + c },
                      on: {
                        click: function($event) {
                          return _vm.handlePreset(c)
                        }
                      }
                    },
                    [_c("checkboard")],
                    1
                  )
            ]
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-ac6f0a00", esExports)
  }
}

/***/ })
/******/ ]);
});