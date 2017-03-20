var Bench =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Bench = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {

	    var test = new _Bench.Bench();

	    test.add(function () {

	        var i = 0;
	        while (i <= 100) {
	            $('#log').append('<div class="lol"></div>');

	            i++;
	        }

	        $('#log').html('');
	    });

	    test.add(function () {

	        var i = 0;

	        while (i <= 100) {
	            var div = document.createElement('div');
	            div.classList.add('lol');

	            document.getElementById('log').appendChild(div);

	            i++;
	        }

	        document.getElementById('log').innerHTML = "";
	    });

	    test.add(function () {

	        var i = 0;
	        while (i <= 100) {
	            $('<div></div>').addClass('lol').appendTo('#log');
	            i++;
	        }

	        $('#log').html('');
	    });

	    test.add(function () {

	        var i = 0;
	        while (i <= 100) {
	            var div = $('<div class="lol"></div>');
	            $('#log').append(div);

	            i++;
	        }

	        $('#log').html('');
	    });

	    test.process({
	        iteration: 250
	    });
	}); /* eslint-env jquery */

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint-env jquery */

	/**
	 *
	 * @class
	 */
	var Bench = exports.Bench = function () {
	    function Bench() {
	        _classCallCheck(this, Bench);

	        this.config = {
	            iteration: 10
	        };

	        this.functions = [];

	        this.executions = [];

	        this.avg = [];

	        this.min_test = null;
	        this.min_value = null;

	        this.max_test = null;
	        this.max_value = null;
	    }

	    /**
	     * @description Add function to bench into the pool
	     *
	     * @param {Function} fct
	     *
	     */


	    _createClass(Bench, [{
	        key: 'add',
	        value: function add(fct) {

	            this.functions.push(fct);
	        }

	        /**
	         * @description Run all pool functions
	         *
	         * @param {Object} config
	         *
	         */

	    }, {
	        key: 'process',
	        value: function process(config) {

	            this.config = $.extend(this.config, config);

	            var i = 0;

	            while (i < this.config.iteration) {
	                for (var x = 0; x < this.functions.length; x++) {

	                    var t0 = performance.now();

	                    this.functions[x]();

	                    var t1 = performance.now();

	                    if (this.executions[x] == null) this.executions[x] = [];
	                    if (this.executions[x][i] == null) this.executions[x][i] = [];

	                    this.executions[x][i] = t1 - t0;
	                }

	                i++;
	            }

	            console.log(this.executions);

	            this.drawChart();

	            this.report();
	        }

	        /**
	         * @description Draw Googlechart to summarize report
	         *
	         */

	    }, {
	        key: 'drawChart',
	        value: function drawChart() {

	            var data = [];
	            for (var x = 0; x < this.executions.length; x++) {
	                data.push({ 'data': this.executions[x] });
	            }$('#chart').highcharts({
	                'chart': {
	                    'type': 'area'
	                },
	                series: data
	            });
	        }

	        /**
	         * @description Summarize pool execution
	         *
	         */

	    }, {
	        key: 'report',
	        value: function report() {

	            for (var x = 0; x < this.executions.length; x++) {
	                // save best and worst test.
	                for (var i = 0; i < this.executions[x].length; i++) {
	                    var ms = this.executions[x][i];

	                    // init min & max value
	                    if (this.min_value === null) {
	                        this.min_value = ms;
	                        this.min_test = x;
	                    }

	                    if (this.max_value === null) {
	                        this.max_value = ms;
	                        this.max_test = x;
	                    }

	                    // search min & max value
	                    if (ms < this.min_value) {
	                        this.min_value = ms;
	                        this.min_test = x;
	                    }

	                    if (ms > this.max_value) {
	                        this.max_value = ms;
	                        this.max_test = x;
	                    }

	                    if (this.avg[x] === null) this.avg[x] = 0;

	                    this.avg[x] += ms;
	                }
	            }

	            for (var _i = 0; _i < this.executions.length; _i++) {
	                var opt = null;

	                if (_i == this.min_test) opt = "color:#fff;background-color:rgb(40, 163, 40);";
	                if (_i == this.max_test) opt = "color:#fff;background-color:tomato;";

	                console.log("%cLe Test %d a mis en moyenne %f ms sur un panel de %f essais, pour un total de %f ms d'executions.", opt, _i, this.avg[_i] / this.config.iteration, this.config.iteration, this.avg[_i]);
	            }
	        }
	    }]);

	    return Bench;
	}();

/***/ }
/******/ ]);