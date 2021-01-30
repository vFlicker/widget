/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"index\": () => /* binding */ index\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nconst index = () => {\n  const form = document.querySelector('.psw-form');\n\n  const onFormFocus = (evt) => {\n    evt.target.classList.remove('psw-form-input-error');\n  };\n\n  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.dateInputMask)('.psw-date-input');\n  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.organisationCodeMask)('.psw-organisation-code-input');\n\n  form.addEventListener('focus', onFormFocus, true);\n};\n\n\n\n\n//# sourceURL=webpack://psw/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dateInputMask\": () => /* binding */ dateInputMask,\n/* harmony export */   \"organisationCodeMask\": () => /* binding */ organisationCodeMask,\n/* harmony export */   \"getScreen\": () => /* binding */ getScreen,\n/* harmony export */   \"checkCmpletenessFields\": () => /* binding */ checkCmpletenessFields\n/* harmony export */ });\nconst dateInputMask = (selector) => {\n  const items = document.querySelectorAll(selector)\n\n  for (const item of items) {\n    item.addEventListener('keypress', function(evt) {\n      const length = item.value.length;\n\n      if (evt.keyCode < 47 || evt.keyCode > 57 || length > 9) {\n        evt.preventDefault();\n      }\n\n      if (length === 2 || length === 5) {\n        item.value += '.';\n      }\n\n    });\n  }\n};\n\nconst organisationCodeMask = (selector) => {\n  const items = document.querySelectorAll(selector)\n\n  for (const item of items) {\n    item.addEventListener('keypress', function(evt) {\n      const length = item.value.length;\n\n      if (evt.keyCode < 47 || evt.keyCode > 57 || length > 6) {\n        evt.preventDefault();\n      }\n\n      if (length === 3) {\n        item.value += '-';\n      }\n\n    });\n  }\n};\n\nconst getScreen = (screenNumber) => {\n  const form = document.querySelector('.psw-form');\n  let shiftPercentage;\n\n  screenNumber === 1\n    ? shiftPercentage = 0\n    : shiftPercentage = screenNumber - 1;\n\n  form.style.transform = `translateX(${shiftPercentage * -100}%)`;\n};\n\nconst checkCmpletenessFields = (selector) => {\n  const inputs = selector.querySelectorAll('.psw-form-input');\n  let isError = false;\n\n  for (const input of inputs) {\n    if (input.value.length < 1 && !input.classList.contains('not-required')) {\n      input.classList.add('psw-form-input-error');\n      isError = true;\n    }\n  }\n\n  return isError;\n};\n\n\n//# sourceURL=webpack://psw/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;