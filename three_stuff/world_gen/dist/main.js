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

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

/***/ }),

/***/ "./node_modules/three/examples/js/controls/FirstPersonControls.js":
/*!************************************************************************!*\
  !*** ./node_modules/three/examples/js/controls/FirstPersonControls.js ***!
  \************************************************************************/
/***/ (() => {

eval("( function () {\n\n\tconst _lookDirection = new THREE.Vector3();\n\n\tconst _spherical = new THREE.Spherical();\n\n\tconst _target = new THREE.Vector3();\n\n\tclass FirstPersonControls {\n\n\t\tconstructor( object, domElement ) {\n\n\t\t\tif ( domElement === undefined ) {\n\n\t\t\t\tconsole.warn( 'THREE.FirstPersonControls: The second parameter \"domElement\" is now mandatory.' );\n\t\t\t\tdomElement = document;\n\n\t\t\t}\n\n\t\t\tthis.object = object;\n\t\t\tthis.domElement = domElement; // API\n\n\t\t\tthis.enabled = true;\n\t\t\tthis.movementSpeed = 1.0;\n\t\t\tthis.lookSpeed = 0.005;\n\t\t\tthis.lookVertical = true;\n\t\t\tthis.autoForward = false;\n\t\t\tthis.activeLook = true;\n\t\t\tthis.heightSpeed = false;\n\t\t\tthis.heightCoef = 1.0;\n\t\t\tthis.heightMin = 0.0;\n\t\t\tthis.heightMax = 1.0;\n\t\t\tthis.constrainVertical = false;\n\t\t\tthis.verticalMin = 0;\n\t\t\tthis.verticalMax = Math.PI;\n\t\t\tthis.mouseDragOn = false; // internals\n\n\t\t\tthis.autoSpeedFactor = 0.0;\n\t\t\tthis.mouseX = 0;\n\t\t\tthis.mouseY = 0;\n\t\t\tthis.moveForward = false;\n\t\t\tthis.moveBackward = false;\n\t\t\tthis.moveLeft = false;\n\t\t\tthis.moveRight = false;\n\t\t\tthis.viewHalfX = 0;\n\t\t\tthis.viewHalfY = 0; // private variables\n\n\t\t\tlet lat = 0;\n\t\t\tlet lon = 0; //\n\n\t\t\tthis.handleResize = function () {\n\n\t\t\t\tif ( this.domElement === document ) {\n\n\t\t\t\t\tthis.viewHalfX = window.innerWidth / 2;\n\t\t\t\t\tthis.viewHalfY = window.innerHeight / 2;\n\n\t\t\t\t} else {\n\n\t\t\t\t\tthis.viewHalfX = this.domElement.offsetWidth / 2;\n\t\t\t\t\tthis.viewHalfY = this.domElement.offsetHeight / 2;\n\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\tthis.onMouseDown = function ( event ) {\n\n\t\t\t\tif ( this.domElement !== document ) {\n\n\t\t\t\t\tthis.domElement.focus();\n\n\t\t\t\t}\n\n\t\t\t\tif ( this.activeLook ) {\n\n\t\t\t\t\tswitch ( event.button ) {\n\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tthis.moveForward = true;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 2:\n\t\t\t\t\t\t\tthis.moveBackward = true;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tthis.mouseDragOn = true;\n\n\t\t\t};\n\n\t\t\tthis.onMouseUp = function ( event ) {\n\n\t\t\t\tif ( this.activeLook ) {\n\n\t\t\t\t\tswitch ( event.button ) {\n\n\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\tthis.moveForward = false;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase 2:\n\t\t\t\t\t\t\tthis.moveBackward = false;\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tthis.mouseDragOn = false;\n\n\t\t\t};\n\n\t\t\tthis.onMouseMove = function ( event ) {\n\n\t\t\t\tif ( this.domElement === document ) {\n\n\t\t\t\t\tthis.mouseX = event.pageX - this.viewHalfX;\n\t\t\t\t\tthis.mouseY = event.pageY - this.viewHalfY;\n\n\t\t\t\t} else {\n\n\t\t\t\t\tthis.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;\n\t\t\t\t\tthis.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;\n\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\tthis.onKeyDown = function ( event ) {\n\n\t\t\t\tswitch ( event.code ) {\n\n\t\t\t\t\tcase 'ArrowUp':\n\t\t\t\t\tcase 'KeyW':\n\t\t\t\t\t\tthis.moveForward = true;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'ArrowLeft':\n\t\t\t\t\tcase 'KeyA':\n\t\t\t\t\t\tthis.moveLeft = true;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'ArrowDown':\n\t\t\t\t\tcase 'KeyS':\n\t\t\t\t\t\tthis.moveBackward = true;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'ArrowRight':\n\t\t\t\t\tcase 'KeyD':\n\t\t\t\t\t\tthis.moveRight = true;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'KeyR':\n\t\t\t\t\t\tthis.moveUp = true;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'KeyF':\n\t\t\t\t\t\tthis.moveDown = true;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\tthis.onKeyUp = function ( event ) {\n\n\t\t\t\tswitch ( event.code ) {\n\n\t\t\t\t\tcase 'ArrowUp':\n\t\t\t\t\tcase 'KeyW':\n\t\t\t\t\t\tthis.moveForward = false;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'ArrowLeft':\n\t\t\t\t\tcase 'KeyA':\n\t\t\t\t\t\tthis.moveLeft = false;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'ArrowDown':\n\t\t\t\t\tcase 'KeyS':\n\t\t\t\t\t\tthis.moveBackward = false;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'ArrowRight':\n\t\t\t\t\tcase 'KeyD':\n\t\t\t\t\t\tthis.moveRight = false;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'KeyR':\n\t\t\t\t\t\tthis.moveUp = false;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase 'KeyF':\n\t\t\t\t\t\tthis.moveDown = false;\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\tthis.lookAt = function ( x, y, z ) {\n\n\t\t\t\tif ( x.isVector3 ) {\n\n\t\t\t\t\t_target.copy( x );\n\n\t\t\t\t} else {\n\n\t\t\t\t\t_target.set( x, y, z );\n\n\t\t\t\t}\n\n\t\t\t\tthis.object.lookAt( _target );\n\t\t\t\tsetOrientation( this );\n\t\t\t\treturn this;\n\n\t\t\t};\n\n\t\t\tthis.update = function () {\n\n\t\t\t\tconst targetPosition = new THREE.Vector3();\n\t\t\t\treturn function update( delta ) {\n\n\t\t\t\t\tif ( this.enabled === false ) return;\n\n\t\t\t\t\tif ( this.heightSpeed ) {\n\n\t\t\t\t\t\tconst y = THREE.MathUtils.clamp( this.object.position.y, this.heightMin, this.heightMax );\n\t\t\t\t\t\tconst heightDelta = y - this.heightMin;\n\t\t\t\t\t\tthis.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tthis.autoSpeedFactor = 0.0;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tconst actualMoveSpeed = delta * this.movementSpeed;\n\t\t\t\t\tif ( this.moveForward || this.autoForward && ! this.moveBackward ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );\n\t\t\t\t\tif ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );\n\t\t\t\t\tif ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );\n\t\t\t\t\tif ( this.moveRight ) this.object.translateX( actualMoveSpeed );\n\t\t\t\t\tif ( this.moveUp ) this.object.translateY( actualMoveSpeed );\n\t\t\t\t\tif ( this.moveDown ) this.object.translateY( - actualMoveSpeed );\n\t\t\t\t\tlet actualLookSpeed = delta * this.lookSpeed;\n\n\t\t\t\t\tif ( ! this.activeLook ) {\n\n\t\t\t\t\t\tactualLookSpeed = 0;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tlet verticalLookRatio = 1;\n\n\t\t\t\t\tif ( this.constrainVertical ) {\n\n\t\t\t\t\t\tverticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );\n\n\t\t\t\t\t}\n\n\t\t\t\t\tlon -= this.mouseX * actualLookSpeed;\n\t\t\t\t\tif ( this.lookVertical ) lat -= this.mouseY * actualLookSpeed * verticalLookRatio;\n\t\t\t\t\tlat = Math.max( - 85, Math.min( 85, lat ) );\n\t\t\t\t\tlet phi = THREE.MathUtils.degToRad( 90 - lat );\n\t\t\t\t\tconst theta = THREE.MathUtils.degToRad( lon );\n\n\t\t\t\t\tif ( this.constrainVertical ) {\n\n\t\t\t\t\t\tphi = THREE.MathUtils.mapLinear( phi, 0, Math.PI, this.verticalMin, this.verticalMax );\n\n\t\t\t\t\t}\n\n\t\t\t\t\tconst position = this.object.position;\n\t\t\t\t\ttargetPosition.setFromSphericalCoords( 1, phi, theta ).add( position );\n\t\t\t\t\tthis.object.lookAt( targetPosition );\n\n\t\t\t\t};\n\n\t\t\t}();\n\n\t\t\tthis.dispose = function () {\n\n\t\t\t\tthis.domElement.removeEventListener( 'contextmenu', contextmenu );\n\t\t\t\tthis.domElement.removeEventListener( 'mousedown', _onMouseDown );\n\t\t\t\tthis.domElement.removeEventListener( 'mousemove', _onMouseMove );\n\t\t\t\tthis.domElement.removeEventListener( 'mouseup', _onMouseUp );\n\t\t\t\twindow.removeEventListener( 'keydown', _onKeyDown );\n\t\t\t\twindow.removeEventListener( 'keyup', _onKeyUp );\n\n\t\t\t};\n\n\t\t\tconst _onMouseMove = this.onMouseMove.bind( this );\n\n\t\t\tconst _onMouseDown = this.onMouseDown.bind( this );\n\n\t\t\tconst _onMouseUp = this.onMouseUp.bind( this );\n\n\t\t\tconst _onKeyDown = this.onKeyDown.bind( this );\n\n\t\t\tconst _onKeyUp = this.onKeyUp.bind( this );\n\n\t\t\tthis.domElement.addEventListener( 'contextmenu', contextmenu );\n\t\t\tthis.domElement.addEventListener( 'mousemove', _onMouseMove );\n\t\t\tthis.domElement.addEventListener( 'mousedown', _onMouseDown );\n\t\t\tthis.domElement.addEventListener( 'mouseup', _onMouseUp );\n\t\t\twindow.addEventListener( 'keydown', _onKeyDown );\n\t\t\twindow.addEventListener( 'keyup', _onKeyUp );\n\n\t\t\tfunction setOrientation( controls ) {\n\n\t\t\t\tconst quaternion = controls.object.quaternion;\n\n\t\t\t\t_lookDirection.set( 0, 0, - 1 ).applyQuaternion( quaternion );\n\n\t\t\t\t_spherical.setFromVector3( _lookDirection );\n\n\t\t\t\tlat = 90 - THREE.MathUtils.radToDeg( _spherical.phi );\n\t\t\t\tlon = THREE.MathUtils.radToDeg( _spherical.theta );\n\n\t\t\t}\n\n\t\t\tthis.handleResize();\n\t\t\tsetOrientation( this );\n\n\t\t}\n\n\t}\n\n\tfunction contextmenu( event ) {\n\n\t\tevent.preventDefault();\n\n\t}\n\n\tTHREE.FirstPersonControls = FirstPersonControls;\n\n} )();\n\n\n//# sourceURL=webpack://world_gen/./node_modules/three/examples/js/controls/FirstPersonControls.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _node_modules_three_examples_js_controls_FirstPersonControls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/three/examples/js/controls/FirstPersonControls.js */ \"./node_modules/three/examples/js/controls/FirstPersonControls.js\");\n/* harmony import */ var _node_modules_three_examples_js_controls_FirstPersonControls_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_three_examples_js_controls_FirstPersonControls_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst FOV = 75;\nconst NEAR_BOUND = 0.1;\nconst FAR_BOUND = 5000;\n\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\nscene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x202020)\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(\n    FOV, //field of view\n    window.innerWidth / window.innerHeight, //aspect ratio\n    NEAR_BOUND, //cloclse ipping bound\n    FAR_BOUND //far clipping bound\n)\ncamera.position.z = 5\n\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({antialias: true});\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nconst canvas = renderer.domElement;\ncanvas.onclick = () => {\n    canvas.requestPointerLock();\n}\n\nconst ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, 0.4);\nscene.add(ambientLight);\n\nconst box = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(\n    new three__WEBPACK_IMPORTED_MODULE_0__.BoxBufferGeometry(2, 2, 2),\n    new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0x00ff00 })\n);\nscene.add(box);\n\nconst controls = new (_node_modules_three_examples_js_controls_FirstPersonControls_js__WEBPACK_IMPORTED_MODULE_1___default())(camera, canvas);\n\n\nfunction run() {    \n    renderer.render(scene, camera);\n    requestAnimationFrame(run);\n}\nrun();\n\n\n//# sourceURL=webpack://world_gen/./src/index.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;