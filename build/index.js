/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/product_modal.js":
/*!**************************************!*\
  !*** ./src/modules/product_modal.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ProductModal {
  // constructor
  constructor() {
    console.log("ready");
    this.modal = document.querySelector(".container-other_products");
    this.addMainProductToCart = document.querySelectorAll(".add_main_product_to_cart");
    this.allMainProducts = document.querySelectorAll(".single_main_product");
    this.otherProductButton = document.querySelectorAll(".product_button");
    this.currentOtherProductImage;
    this.closeProductButton = document.querySelector(".close_product_button");
    this.closeCartButton = document.querySelector(".close_cart_button");
    this.allImages = document.querySelectorAll(".img-single");
    this.allOtherProducts = document.querySelectorAll(".single_other_product");
    this.cartItems = [];
    this.cartModal = document.querySelector(".container-cart");
    this.cartList = document.querySelector(".list-container");
    this.cartButton = document.querySelector(".cart_button");
    this.addOtherProductToCart = document.querySelectorAll(".add_other_product_to_cart");
    this.events();
  }

  // events
  events() {
    console.log("in events");

    // adds a click event to every product button to open the modal
    this.otherProductButton.forEach(e => e.addEventListener("click", e => this.clickProduct(e)));

    // adds a click event to close the product modal
    this.closeProductButton.addEventListener("click", e => this.clickProduct(e));

    // adds a click event to OPEN the cart modal
    this.cartButton.addEventListener("click", e => this.clickCart(e));

    // adds a click event to CLOSE the cart modal
    this.closeCartButton.addEventListener("click", e => this.clickCart(e));

    // adds a click event to add an other product to the cart

    this.addOtherProductToCart.forEach((e, i) => {
      e.addEventListener("click", e => {
        e.target.id = i;
        this.add_other_product_to_cart(e);
      });
    });
    this.addMainProductToCart.forEach((e, i) => {
      e.addEventListener("click", e => {
        e.target.id = i;
        this.add_main_product_to_cart(e);
      });
    });
  }
  clickProduct(e) {
    console.log("in clickProductHandler ", e.target.id);

    // checks if produt modal is already shown and then removes it, and if not it shows the product modal
    if (this.modal.classList.contains("show-other_products_modal")) {
      this.cartButton.disabled = false;
      this.modal.classList.remove("show-other_products_modal");
      this.otherProductButton.forEach(e => e.disabled = false);
      document.body.style.backgroundColor = "rgba(255, 255, 255, 1)";
    } else {
      this.cartButton.disabled = true;
      this.modal.classList.add("show-other_products_modal");
      this.otherProductButton.forEach(e => e.disabled = true);
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      this.currentOtherProductImage = e.target.id;
    }
  }
  clickCart(e) {
    console.log("in clickCartHandler ", e.target.id);

    // checks if cart is already shown and then removes it, and if not it shows the cart
    if (this.cartModal.classList.contains("show-cart")) {
      this.cartButton.disabled = false;
      this.cartModal.classList.remove("show-cart");
      this.otherProductButton.forEach(e => e.disabled = false);
      document.body.style.backgroundColor = "rgba(255, 255, 255, 1)";
    } else {
      this.cartButton.disabled = true;
      this.cartModal.classList.add("show-cart");
      this.otherProductButton.forEach(e => e.disabled = true);
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }
  }

  // add a main product to the cart

  add_main_product_to_cart(e) {
    // check if element already exists and remove it

    let tempTotal = document.getElementById("temp");
    if (tempTotal) {
      tempTotal.remove();
    }
    let item = document.createElement("li");
    let product = document.createElement("span");
    product.innerText = this.allMainProducts[e.target.id].textContent;
    item.append(product);
    this.cartList.append(item);
    let cartItem = this.allMainProducts[e.target.id].textContent.split(": ");
    cartItem = cartItem[1].split("R");
    console.log(cartItem);
    this.cartItems.push(Number(cartItem[1]));
    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current, 0);
    totalDiv.innerText = `${total}`;
    totalDiv.id = "temp";
    this.cartModal.append(totalDiv);
  }

  // add an other product to the cart

  add_other_product_to_cart(e) {
    console.log("added ");
    console.log(e.target.id);

    // check if element already exists and remove it

    let tempTotal = document.getElementById("temp");
    if (tempTotal) {
      tempTotal.remove();
    }

    // create elements
    let item = document.createElement("li");
    let image = document.createElement("img");
    image.src = `${this.allImages[this.currentOtherProductImage].src}`;
    let product = document.createElement("span");
    product.innerText = this.allOtherProducts[e.target.id].textContent;

    // append elements to cart
    item.append(image);
    item.append(product);
    this.cartList.append(item);
    let cartItem = this.allOtherProducts[e.target.id].textContent.split(" ");
    cartItem = cartItem[1].split("R");
    this.cartItems.push(Number(cartItem[1]));

    // total div to keep track of cart total
    let totalDiv = document.createElement("div");
    let total = this.cartItems.reduce((sum, current) => sum + current, 0);
    totalDiv.innerText = `${total}`;
    totalDiv.id = "temp";
    this.cartModal.append(totalDiv);
    console.log(totalDiv);
    console.log(this.cartItems);
  }

  // methods
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductModal);

/***/ }),

/***/ "./css/main.css":
/*!**********************!*\
  !*** ./css/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/main.css */ "./css/main.css");
/* harmony import */ var _modules_product_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/product_modal */ "./src/modules/product_modal.js");


// Modules / classes



// Instantiate a new object using our modules / classes

const ProductModal = new _modules_product_modal__WEBPACK_IMPORTED_MODULE_1__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map