/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/App.js":
/*!***************************!*\
  !*** ./src/client/App.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/index.js */ \"./src/client/state/index.js\");\n/* harmony import */ var _components_Navbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Navbar.js */ \"./src/client/components/Navbar.js\");\n/* harmony import */ var _pages_HomePage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/HomePage.js */ \"./src/client/pages/HomePage.js\");\n/* harmony import */ var _pages_FavoritePage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/FavoritePage.js */ \"./src/client/pages/FavoritePage.js\");\n/* harmony import */ var _pages_DetailPage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/DetailPage.js */ \"./src/client/pages/DetailPage.js\");\n\n\n\n\n\n\nconst App = () => {\n  const div = document.createElement(\"div\")\n  const navbar = (0,_components_Navbar_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n  const homeContent = (0,_pages_HomePage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])()\n  const favoriteContent = (0,_pages_FavoritePage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()\n  const detailContent = (0,_pages_DetailPage_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])()\n\n  if (!_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path.includes(\"/detail\")) {\n    div.append(navbar)\n  }\n\n  if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path == \"/home\") {\n    div.append(homeContent)\n  } else if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path == \"/favorite\") {\n    div.append(favoriteContent)\n  } else if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path.includes(\"/detail\")) {\n    div.append(detailContent)\n  } else {\n    div.append(homeContent)\n  }\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/App.js?");

/***/ }),

/***/ "./src/client/components/DetailProduct.js":
/*!************************************************!*\
  !*** ./src/client/components/DetailProduct.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DetailProduct = (props) => {\n  const div = document.createElement(\"div\")\n  div.style.display = \"flex\"\n  div.style.flexDirection = \"column\"\n  div.style.justifyContent = \"center\"\n  div.style.alignItems = \"center\"\n\n  const image = document.createElement(\"img\")\n  image.src = props.thumbnail\n  image.style.width = \"80px\"\n  image.style.height = \"100px\"\n\n  const title = document.createElement(\"h5\")\n  title.textContent = props.title\n\n  const categoryText = document.createElement(\"p\")\n  categoryText.textContent = \"Category: \" + props.category\n\n  const brandText = document.createElement(\"p\")\n  brandText.textContent = \"Brand: \" + props.brand\n\n  const priceText = document.createElement(\"p\")\n  priceText.textContent = \"Price: $\" + props.price\n\n  const descriptionText = document.createElement(\"p\")\n  descriptionText.textContent = props.description\n\n  div.append(image)\n  div.append(title)\n  div.append(categoryText)\n  div.append(brandText)\n  div.append(priceText)\n  div.append(descriptionText)\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailProduct);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/DetailProduct.js?");

/***/ }),

/***/ "./src/client/components/Link.js":
/*!***************************************!*\
  !*** ./src/client/components/Link.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/index.js */ \"./src/client/state/index.js\");\n\n\nconst Link = (props) => {\n  const link = document.createElement('a')\n  link.href = props.href\n  link.textContent = props.label\n  link.onclick = (event) => {\n    event.preventDefault()\n    const url = new URL(event.target.href)\n    ;(0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ path: url.pathname })\n    props.onClick && props.onClick()\n  }\n\n    return link\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Link);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/Link.js?");

/***/ }),

/***/ "./src/client/components/Navbar.js":
/*!*****************************************!*\
  !*** ./src/client/components/Navbar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Link.js */ \"./src/client/components/Link.js\");\n\n\nconst Navbar = () => {\n  const linkHome = (0,_Link_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ href: \"/home\", label: \"Home\" })\n  const linkFavorite = (0,_Link_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ href: \"/favorite\", label: \"Favorite\" })\n\n  const navbar = document.createElement(\"div\")\n  navbar.style.display = \"flex\"\n  navbar.style.gap = \"10px\"\n  navbar.append(linkHome)\n  navbar.append(linkFavorite)\n\n  return navbar\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/Navbar.js?");

/***/ }),

/***/ "./src/client/components/Pagination.js":
/*!*********************************************!*\
  !*** ./src/client/components/Pagination.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/index.js */ \"./src/client/state/index.js\");\n\n\nconst Pagination = () => {\n  const div = document.createElement(\"div\")\n  div.style.display = \"flex\"\n  div.style.flexDirection = \"row\"\n  div.style.gap = \"5px\"\n  div.style.justifyContent = \"center\"\n  div.style.alignItems = \"center\"\n\n  const page = []\n  \n  for(let i = 1; i <= _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.home.totalPage; i++) {\n    const button = document.createElement(\"button\")\n    if (i == _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.home.page) {\n      button.style.backgroundColor = \"red\"\n    }\n    button.textContent = i\n    button.onclick = () => {\n      ;(0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ home: { ..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.home, page: i, isLoading: true }})\n    }\n    page.push(button)\n  }\n\n  div.append(...page)\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/Pagination.js?");

/***/ }),

/***/ "./src/client/components/ProductItem.js":
/*!**********************************************!*\
  !*** ./src/client/components/ProductItem.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/index.js */ \"./src/client/state/index.js\");\n/* harmony import */ var _Link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Link.js */ \"./src/client/components/Link.js\");\n\n\n\nconst ProductItem = (props) => {\n  const div = document.createElement(\"div\")\n  div.style.display = \"flex\"\n  div.style.flexDirection = \"column\"\n  div.style.justifyContent = \"center\"\n  div.style.alignItems = \"center\"\n\n  const image = document.createElement(\"img\")\n  image.src = props.thumbnail\n  image.style.width = \"80px\"\n  image.style.height = \"100px\"\n\n  const title = document.createElement(\"h5\")\n  title.textContent = props.title\n\n  const descriptionText = document.createElement(\"p\")\n  descriptionText.textContent = props.description\n\n  const isFavorite = _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.favorite.favoriteIds.some(id => id == props.id)\n  const buttonFavorite = document.createElement(\"button\")\n  buttonFavorite.textContent = isFavorite ? \"Delete from favorite\" : \"Add to favorite\"\n  buttonFavorite.onclick = () => {\n    if (isFavorite) {\n      const newData = _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.favorite.favoriteIds.filter((id) => id != props.id)\n      ;(0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ favorite: { ..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.favorite, favoriteIds: newData }})\n\n      if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path == \"/favorite\") {\n        (0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ favorite: { ..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.favorite, isLoading: true }})\n      }\n    } else {\n      (0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ favorite: { ..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.favorite, favoriteIds: [..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.favorite.favoriteIds, props.id] }})\n    }\n  }\n\n  const linkDetail = (0,_Link_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ \n    href: \"/detail\", \n    label: \"See Detail \" + props.title,\n    onClick: () => {\n      ;(0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ detail: { ..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.detail, productId: props.id }})\n    }\n  })\n\n  div.append(image)\n  div.append(title)\n  div.append(buttonFavorite)\n  div.append(linkDetail)\n  div.append(descriptionText)\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductItem);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/ProductItem.js?");

/***/ }),

/***/ "./src/client/components/ProductList.js":
/*!**********************************************!*\
  !*** ./src/client/components/ProductList.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/index.js */ \"./src/client/state/index.js\");\n/* harmony import */ var _Pagination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.js */ \"./src/client/components/Pagination.js\");\n/* harmony import */ var _ProductItem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductItem.js */ \"./src/client/components/ProductItem.js\");\n\n\n\n\nconst ProductList = (entity) => {\n  const pagination = (0,_Pagination_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n  const productItem = _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state[entity].products.map(product => (0,_ProductItem_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(product))\n\n  const loadingText = document.createElement(\"p\")\n  loadingText.textContent = \"Loading Products...\"\n\n  const emptyText = document.createElement(\"p\")\n  emptyText.textContent = \"Product Empty\"\n\n  const errorText = document.createElement(\"p\")\n  errorText.textContent = _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state[entity].errorMessage\n\n  const div = document.createElement(\"div\")\n\n  if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state[entity].isLoading || _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.home.loadingHomePage) {\n    div.append(loadingText)\n  } else if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state[entity].errorMessage != \"\") {\n    div.append(errorText)\n  } else if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state[entity].products.length == 0) {\n    div.append(emptyText)\n  } else {\n    div.append(...productItem)\n    if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path == \"/home\" || _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.path == \"/\") {\n      div.append(pagination)\n    }\n  }\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductList);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/ProductList.js?");

/***/ }),

/***/ "./src/client/components/SearchProduct.js":
/*!************************************************!*\
  !*** ./src/client/components/SearchProduct.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/index.js */ \"./src/client/state/index.js\");\n\n\nconst SearchProduct = () => {\n  const div = document.createElement(\"div\")\n\n  const input = document.createElement(\"input\")\n  input.id = \"input\"\n  input.value = _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.home.inputValue\n  input.placeholder = \"enter product name\"\n  input.oninput = (event) => {\n    ;(0,_state_index_js__WEBPACK_IMPORTED_MODULE_0__.setState)({ home: { ..._state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.home, inputValue: event.target.value }})\n  }\n\n  div.append(input)\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchProduct);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/components/SearchProduct.js?");

/***/ }),

/***/ "./src/client/const/index.js":
/*!***********************************!*\
  !*** ./src/client/const/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   constData: () => (/* binding */ constData)\n/* harmony export */ });\nconst constData = {\n  limit: 10\n}\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/const/index.js?");

/***/ }),

/***/ "./src/client/http/FindProductById.js":
/*!********************************************!*\
  !*** ./src/client/http/FindProductById.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FindProductById: () => (/* binding */ FindProductById)\n/* harmony export */ });\nconst FindProductById = ({ id }) => {\n  return fetch(\"https://dummyjson.com/products/\" + id)\n}\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/http/FindProductById.js?");

/***/ }),

/***/ "./src/client/http/ListProduct.js":
/*!****************************************!*\
  !*** ./src/client/http/ListProduct.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ListProduct: () => (/* binding */ ListProduct)\n/* harmony export */ });\nconst ListProduct = ({ limit, skip, search }) => {\n  return fetch(`https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`)\n}\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/http/ListProduct.js?");

/***/ }),

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.js */ \"./src/client/App.js\");\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state/index.js */ \"./src/client/state/index.js\");\n\n\n\nconst render = () => {\n  const content = document.getElementById('content')\n  const focusedElementId = document.activeElement.id\n  const focusedElementSelectionStart = document.activeElement.selectionStart\n  const focusedElementSelectionEnd = document.activeElement.selectionEnd\n\n  // instantiate element\n  const app = (0,_App_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n  // reset content when re-render\n  content.innerHTML = \"\"\n  // render element\n  content.append(app)\n\n  if (focusedElementId) {\n    const focusedElement = document.getElementById(focusedElementId)\n    focusedElement.focus()\n    focusedElement.selectionStart = focusedElementSelectionStart\n    focusedElement.selectionEnd = focusedElementSelectionEnd\n  }\n}\n\nrender()\n// konsep useEffect react\n;(0,_state_index_js__WEBPACK_IMPORTED_MODULE_1__.onChangeState)({\n  path: undefined,\n  home: {\n    inputValue: undefined,\n    products: undefined,\n    isLoading: undefined,\n    errorMessage: undefined,\n    page: undefined,\n    totalPage: undefined,\n    totalData: undefined,\n  },\n  favorite: {\n    favoriteIds: undefined,\n    isLoading: undefined,\n    products: undefined,\n    errorMessage: undefined,\n  },\n  detail: {\n    productId: undefined,\n    product: undefined,\n    isLoading: undefined,\n    errorMessage: undefined,\n  }\n}, _state_index_js__WEBPACK_IMPORTED_MODULE_1__.state)\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/index.js?");

/***/ }),

/***/ "./src/client/pages/DetailPage.js":
/*!****************************************!*\
  !*** ./src/client/pages/DetailPage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/index.js */ \"./src/client/state/index.js\");\n/* harmony import */ var _components_Link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Link.js */ \"./src/client/components/Link.js\");\n/* harmony import */ var _components_DetailProduct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/DetailProduct.js */ \"./src/client/components/DetailProduct.js\");\n\n\n\n\nconst DetailPage = () => {\n  const div = document.createElement(\"div\")\n  const text = document.createElement(\"p\")\n  text.textContent = \"gaada product nya cuy\"\n\n  const linkBack = (0,_components_Link_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ href: \"/home\", label: \"Back to Home\" })\n\n  div.append(linkBack)\n  div.append(text)\n\n  if (_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.detail.product) {\n    text.textContent = \"ini detail product \" + _state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.detail.product.title\n\n    const product = (0,_components_DetailProduct_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_state_index_js__WEBPACK_IMPORTED_MODULE_0__.state.detail.product)\n    div.append(product)\n  }\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailPage);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/pages/DetailPage.js?");

/***/ }),

/***/ "./src/client/pages/FavoritePage.js":
/*!******************************************!*\
  !*** ./src/client/pages/FavoritePage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_ProductList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ProductList.js */ \"./src/client/components/ProductList.js\");\n\n\nconst FavoritePage = () => {\n  const div = document.createElement(\"div\")\n\n  const title = document.createElement(\"h5\")\n  title.textContent = \"Favorite Product\"\n  const productList = (0,_components_ProductList_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"favorite\")\n\n  div.append(title)\n  div.append(productList)\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FavoritePage);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/pages/FavoritePage.js?");

/***/ }),

/***/ "./src/client/pages/HomePage.js":
/*!**************************************!*\
  !*** ./src/client/pages/HomePage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_ProductList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ProductList.js */ \"./src/client/components/ProductList.js\");\n/* harmony import */ var _components_SearchProduct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SearchProduct.js */ \"./src/client/components/SearchProduct.js\");\n\n\n\nconst HomePage = () => {\n  const div = document.createElement(\"div\")\n  const title = document.createElement(\"h5\")\n  title.textContent = \"List Product\"\n\n  const productList = (0,_components_ProductList_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"home\")\n  const searchProduct = (0,_components_SearchProduct_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n  div.append(searchProduct)\n  div.append(title)\n  div.append(productList)\n\n  return div\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HomePage);\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/pages/HomePage.js?");

/***/ }),

/***/ "./src/client/state/index.js":
/*!***********************************!*\
  !*** ./src/client/state/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   onChangeState: () => (/* binding */ onChangeState),\n/* harmony export */   setState: () => (/* binding */ setState),\n/* harmony export */   state: () => (/* binding */ state)\n/* harmony export */ });\n/* harmony import */ var _http_ListProduct_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../http/ListProduct.js */ \"./src/client/http/ListProduct.js\");\n/* harmony import */ var _http_FindProductById_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/FindProductById.js */ \"./src/client/http/FindProductById.js\");\n/* harmony import */ var _const_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const/index.js */ \"./src/client/const/index.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ \"./src/client/utils/index.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index.js */ \"./src/client/index.js\");\n\n\n\n\n\n\nlet timeoutId = null\n\nlet state = {\n  path: window.location.pathname,\n  home: {\n    inputValue: localStorage.getItem(\"inputValue\") ?? \"\",\n    products: [],\n    isLoading: false,\n    loadingHomePage: false,\n    errorMessage: \"\",\n    page: 1,\n    totalPage: 1,\n    totalData: 0\n  },\n  favorite: {\n    favoriteIds: JSON.parse(localStorage.getItem(\"favoriteIds\")) ?? [],\n    isLoading: false,\n    products: [],\n    errorMessage: \"\",\n  },\n  detail: {\n    productId: JSON.parse(localStorage.getItem(\"productId\")) ?? null,\n    product: null,\n    isLoading: false,\n    errorMessage: \"\",\n  }\n}\n\nconst setState = (newState) => {\n  const prevState = { ...state }\n  const nextState = { ...prevState, ...newState }\n  state = nextState\n  ;(0,_index_js__WEBPACK_IMPORTED_MODULE_4__.render)()\n  onChangeState(prevState, nextState)\n}\n\nconst onChangeState = (prevEntityState, nextEntityState) => {\n  // path\n  if (prevEntityState.path != nextEntityState.path) {\n    if (nextEntityState.path == \"/favorite\") {\n      setState({ favorite: { ...state.favorite, products: [], isLoading: true } })\n    } else {\n      setState({ favorite: { ...state.favorite, products: [] } })\n    }\n\n    if (nextEntityState.path == \"/home\") {\n      setState({ home: { ...state.home, products: [], inputValue: \"\", page: 1, isLoading: true } })\n    } else {\n      setState({ home: { ...state.home, products: [], inputValue: \"\" } })\n    }\n\n    if (nextEntityState.path == \"/detail\") {\n      const url = new URL(window.location.href)\n      const params = url.searchParams\n      const paramsId = params.get(\"id\")\n\n      if (paramsId && Number(paramsId)) {\n        setState({ detail: { ...state.detail, product: null, productId: paramsId } })\n      } else {\n        setState({ detail: { ...state.detail, product: null, productId: null } })\n      }\n    } else {\n      setState({ detail: { ...state.detail, product: null, productId: null } })\n    }\n\n    history.pushState(null, \"\", nextEntityState.path)\n  }\n  // Home\n  if (prevEntityState.home.inputValue != nextEntityState.home.inputValue) {\n    localStorage.setItem(\"inputValue\", nextEntityState.home.inputValue)\n    setState({ home: { ...state.home, loadingHomePage: true } })\n\n    if (timeoutId != null) {\n      clearTimeout(timeoutId)\n    }\n\n    timeoutId = setTimeout(() => {\n      setState({ home: { ...state.home, loadingHomePage: false, isLoading: true, page: 1 } })\n    }, 500)\n  }\n\n  if (prevEntityState.home.page != nextEntityState.home.page) {\n    setState({ home: { ...state.home, isLoading: true } })\n  }\n\n  if (prevEntityState.home.totalData != nextEntityState.home.totalData) {\n    const totalPage = Math.floor(state.home.totalData / _const_index_js__WEBPACK_IMPORTED_MODULE_2__.constData.limit)\n    setState({ home: { ...state.home, totalPage } })\n  }\n\n  if (prevEntityState.home.isLoading === false && nextEntityState.home.isLoading === true) {\n    const skip = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.skipDataPagination)(nextEntityState.home.page)\n    ;(0,_http_ListProduct_js__WEBPACK_IMPORTED_MODULE_0__.ListProduct)({ limit: _const_index_js__WEBPACK_IMPORTED_MODULE_2__.constData.limit, skip, search: state.home.inputValue })\n      .then((res) => res.json())\n      .then((data) => {\n        setState({ home: { ...state.home, isLoading: false, products: data.products, errorMessage: \"\", totalData: data.total } })\n      })\n      .catch((err) =>\n        setState({ home: { ...state.home, isLoading: false, products: [], errorMessage: err.message, totalData: 0 } })\n      )\n  }\n\n  // favorite\n  if (prevEntityState.favorite.favoriteIds != nextEntityState.favorite.favoriteIds) {\n    localStorage.setItem(\"favoriteIds\", JSON.stringify(nextEntityState.favorite.favoriteIds))\n  }\n\n  if (prevEntityState.favorite.isLoading === false && nextEntityState.favorite.isLoading === true) {\n    const fetchPromises = state.favorite.favoriteIds.map(id => (0,_http_FindProductById_js__WEBPACK_IMPORTED_MODULE_1__.FindProductById)({ id })\n      .then(res => res.json())\n      .catch((err) => {\n        setState({ favorite: { ...state.favorite, isLoading: false, products: [], errorMessage: err.message } })\n      })\n    )\n    Promise.all(fetchPromises)\n      .then(res => {\n        setState({ favorite: { ...state.favorite, products: res, isLoading: false, errorMessage: \"\" } })\n      })\n  }\n\n  // detail\n  if (prevEntityState.detail.isLoading === false && nextEntityState.detail.isLoading === true) {\n    if (state.detail.productId) {\n      (0,_http_FindProductById_js__WEBPACK_IMPORTED_MODULE_1__.FindProductById)({ id: state.detail.productId })\n        .then((res) => res.json())\n        .then((product) => {\n          setState({ detail: { ...state.detail, isLoading: false, product, errorMessage: \"\" } })\n        })\n        .catch(err => setState({ detail: { ...state.detail, isLoading: false, product: null, errorMessage: err.message } }))\n    }\n  }\n\n  if (prevEntityState.detail.productId != nextEntityState.detail.productId) {\n    const url = new URL(window.location.href)\n    if (nextEntityState.detail.productId == null) {\n      url.search = ''\n      window.history.pushState(null, \"\", url)\n    } else {\n      const params = new URLSearchParams()\n      params.set(\"id\", nextEntityState.detail.productId)\n      url.search = params.toString()\n      window.history.pushState(null, \"\", url)\n      setState({ detail: { ...state.detail, isLoading: true } })\n    }\n    localStorage.setItem(\"productId\", JSON.stringify(nextEntityState.detail.productId))\n  }\n}\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/state/index.js?");

/***/ }),

/***/ "./src/client/utils/index.js":
/*!***********************************!*\
  !*** ./src/client/utils/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   skipDataPagination: () => (/* binding */ skipDataPagination)\n/* harmony export */ });\n/* harmony import */ var _const_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/index.js */ \"./src/client/const/index.js\");\n\n\nconst skipDataPagination = (page) => {\n  return (page - 1) * _const_index_js__WEBPACK_IMPORTED_MODULE_0__.constData.limit\n}\n\n//# sourceURL=webpack://vanilla-spa-nodejs-single-file/./src/client/utils/index.js?");

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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/index.js");
/******/ 	
/******/ })()
;