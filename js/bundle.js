/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector(".calculating__result span");
  let ratio, gender, height, weight, age;
  if (localStorage.getItem("gender")) {
    gender = localStorage.getItem("gender");
  } else {
    gender = "female";
    localStorage.setItem("gender", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", "1.375");
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);
      if (element.getAttribute("id") === localStorage.getItem("gender")) {
        element.classList.add(activeClass);
      }
      if (element.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        element.classList.add(activeClass);
      }
    });
  }
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
  function calcTotal() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "___";
      return;
    }
    if (gender === "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener("click", event => {
        if (event.target.getAttribute("data-ratio")) {
          ratio = +event.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +event.target.getAttribute("data-ratio"));
        } else {
          gender = event.target.getAttribute("id");
          localStorage.setItem("gender", event.target.getAttribute("id"));
        }
        elements.forEach(element => {
          element.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  console.log(getDynamicInformation("#height"));
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 40;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price *= this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (!this.classes.includes("menu__item")) {
        this.element = "menu__item";
        element.classList.add(this.element);
      }
      this.classes.forEach(className => {
        element.classList.add(className);
      });
      element.innerHTML = `<img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
      this.parent.append(element);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu__field .container").render();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/cookieConsent.js":
/*!*****************************************!*\
  !*** ./src/js/modules/cookieConsent.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cookie() {
  // const cookieStorage = {
  //   getItem: (key) => {
  //     const cookie = document.cookie
  //       .split(";")
  //       .map((cookie) => cookie.split("="))
  //       .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
  //     return cookie[key];
  //   },
  //   setItem: (key, value) => {
  //     document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
  //   },
  // };
  // const storageType = cookieStorage;
  // const consentPropertyType = "site_consent";
  // const hasConsented = () =>
  //   storageType.getItem(consentPropertyType) === "true" ? true : false;
  // const toggleStorage = (prop) =>
  //   storageType.setItem(consentPropertyType, prop);
  // const popup = document.querySelector(".popup");
  // const btnConfirm = document.querySelector("[data-confirm]");
  // const btnCancel = document.querySelector("[data-cancel]");
  // if (hasConsented()) {
  //   console.log("Loading...");
  // } else {
  //   popup.classList.add("popup_active");
  // }
  // btnConfirm.addEventListener("click", () => {
  //   toggleStorage(true);
  //   popup.classList.remove("popup_active");
  //   console.log("Loading...");
  // });
  // btnCancel.addEventListener("click", () => {
  //   toggleStorage(false);
  //   popup.classList.remove("popup_active");
  // });
  class CookieConsent {
    constructor({
      popup,
      btnConfirm,
      btnCancel,
      activeClass = ""
    } = {}) {
      this.popup = document.querySelector(popup);
      this.btnConfirm = document.querySelector(btnConfirm);
      this.btnCancel = document.querySelector(btnCancel);
      this.activeClass = activeClass;
      this.consentPropertyType = "site_consent";
    }
    getItem = key => {
      const cookies = document.cookie.split(";").map(cookie => cookie.split("=")).reduce((acc, [key, value]) => ({
        ...acc,
        [key.trim()]: value
      }), {});
      return cookies[key];
    };
    setItem = (key, value) => {
      document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
    };
    hasConsented = () => {
      return this.getItem(this.consentPropertyType) === "true" ? true : false;
    };
    changeStatus = prop => {
      this.setItem(this.consentPropertyType, prop);
      if (this.hasConsented()) {
        // Подписка на сервисы
        myScripts();
      }
    };
    bindTriggers = (btn, value) => {
      btn.addEventListener("click", () => {
        this.changeStatus(value);
        this.popup.classList.remove(this.activeClass);
      });
    };
    init = () => {
      try {
        if (this.hasConsented()) {
          myScripts();
        } else {
          this.popup.classList.add(this.activeClass);
        }
        this.bindTriggers(this.btnConfirm, true);
        this.bindTriggers(this.btnCancel, false);
      } catch (e) {
        console.error("Переданы не все данные");
      }
    };
  }
  new CookieConsent({
    activeClass: "popup_active",
    popup: ".popup",
    btnConfirm: "[data-confirm]",
    btnCancel: "[data-cancel]"
  }).init();
  function myScripts() {
    console.log("Loading...");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cookie);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так..."
  };
  forms.forEach(item => {
    bindPostDate(item);
  });
  function bindPostDate(form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postDate)("http://localhost:3000/requests", json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class='modal__content'>
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }
  fetch("http://localhost:3000/menu").then(data => data.json()).then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("show");
  document.body.classList.remove("overflow-hidden");
}
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  document.body.classList.add("overflow-hidden");
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const modalBtnOpen = document.querySelectorAll(triggerSelector);
  modalBtnOpen.forEach(btn => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", event => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  const slider = document.querySelector(slide);
  const slides = document.querySelectorAll(container);
  const prev = document.querySelector(prevArrow);
  const next = document.querySelector(nextArrow);
  const total = document.querySelector(totalCounter);
  const current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesFild = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;
  function currentSlideNumber() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }
  currentSlideNumber();
  slidesFild.style.width = 100 * slides.length + "%";
  slidesFild.style.display = "flex";
  slidesFild.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = "relative";
  const indecators = document.createElement("ol");
  const dots = [];
  indecators.classList.add("carousel-indicators");
  slider.append(indecators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indecators.append(dot);
    dots.push(dot);
  }
  function dotsActive() {
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  }
  function fromStringToNumberDeleteLetters(string) {
    return +string.replace(/\D/g, "");
  }
  next.addEventListener("click", () => {
    if (offset === fromStringToNumberDeleteLetters(width) * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += fromStringToNumberDeleteLetters(width);
      slideIndex++;
    }
    slidesFild.style.transform = `translateX(-${offset}px)`;
    currentSlideNumber();
    dotsActive();
  });
  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = fromStringToNumberDeleteLetters(width) * (slides.length - 1);
      slideIndex = slides.length;
    } else {
      offset -= fromStringToNumberDeleteLetters(width);
      slideIndex--;
    }
    slidesFild.style.transform = `translateX(-${offset}px)`;
    currentSlideNumber();
    dotsActive();
  });
  dots.forEach(dot => {
    dot.addEventListener("click", event => {
      const slideTo = event.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = fromStringToNumberDeleteLetters(width) * (slideTo - 1);
      slidesFild.style.transform = `translateX(-${offset}px)`;
      currentSlideNumber();
      dotsActive();
    });
  });
  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => item.classList.add("hide"));
  //   slides[slideIndex - 1].classList.remove("hide");

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);
  function hideTabContent() {
    tabsContent.forEach(tab => {
      tab.classList.add("hide");
      tab.classList.remove("show", "fade");
    });
    tabs.forEach(tab => tab.classList.remove(activeClass));
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", event => {
    if (event.target && event.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (event.target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const total = Date.parse(endtime) - new Date();
    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours = Math.floor(total / (1000 * 60 * 60) % 24);
      minutes = Math.floor(total / (1000 * 60) % 60);
      seconds = Math.floor(total / 1000 % 60);
    }
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postDate: () => (/* binding */ postDate)
/* harmony export */ });
const postDate = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json();
};
const getResource = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};



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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_cookieConsent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/cookieConsent */ "./src/js/modules/cookieConsent.js");











window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerId), 5000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2025-10-29");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slide",
    slide: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  (0,_modules_cookieConsent__WEBPACK_IMPORTED_MODULE_7__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map