(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["accuweatherClient"] = factory();
	else
		root["accuweatherClient"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hours;
(function (Hours) {
    Hours[Hours["ONE"] = 1] = "ONE";
    Hours[Hours["TWELVE"] = 12] = "TWELVE";
    Hours[Hours["ONE_HUNDRED_TWENTY"] = 120] = "ONE_HUNDRED_TWENTY";
    Hours[Hours["TWENTY_FOUR"] = 24] = "TWENTY_FOUR";
    Hours[Hours["SEVENTY_TWO"] = 72] = "SEVENTY_TWO";
})(Hours = exports.Hours || (exports.Hours = {}));
var Days;
(function (Days) {
    Days[Days["ONE"] = 1] = "ONE";
    Days[Days["FIVE"] = 5] = "FIVE";
    Days[Days["TEN"] = 10] = "TEN";
    Days[Days["FIFTEEN"] = 15] = "FIFTEEN";
})(Days = exports.Days || (exports.Days = {}));
class Accuweather {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    get(url) {
        return fetch(url, { method: 'GET', mode: 'cors', cache: 'default' });
    }
    getLocationKey(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response) {
                let responseData = yield response;
                if (responseData.ok) {
                    let result = yield responseData.json();
                    return Promise.resolve(result.Key);
                }
                else {
                    return Promise.reject(responseData.statusText);
                }
            }
            return Promise.reject('No Response to process');
        });
    }
    getLocationSearchUrl(apiKey, baseUrl, query, currentPosition) {
        return baseUrl + "/" + query + "?apikey=" + apiKey + "&q=" + currentPosition;
    }
    getForecastUrl(numberOfDays, apiKey, baseUrl, query, locationKey, isDaily) {
        return baseUrl + "/" + query + "/" + numberOfDays.toString() + (isDaily ? "day/" : "hour/") + locationKey + "?apikey=" + apiKey + "&metric=true";
    }
    getDailyWeatherForecast(currentPosition, numberOfDaysToQuery) {
        return this.getWeatherForTimeInterval(currentPosition, numberOfDaysToQuery, "forecasts/v1/daily", true);
    }
    getHourlyWeatherForecast(currentPosition, numberOfHoursToQuery) {
        return this.getWeatherForTimeInterval(currentPosition, numberOfHoursToQuery, "forecasts/v1/hourly", false);
    }
    getWeatherForTimeInterval(currentPosition, interval, apiUrl, isDaily) {
        return __awaiter(this, void 0, void 0, function* () {
            const geolocationQuery = "locations/v1/cities/geoposition/search";
            const locationSearchUrl = this.getLocationSearchUrl(this.apiKey, this.baseUrl, geolocationQuery, currentPosition);
            const locationResult = yield this.get(locationSearchUrl);
            const locationKey = yield this.getLocationKey(locationResult);
            const forecastUrl = this.getForecastUrl(interval, this.apiKey, this.baseUrl, apiUrl, locationKey, isDaily);
            const forecastResult = yield this.get(forecastUrl);
            return Promise.resolve(yield forecastResult.json());
        });
    }
}
exports.Accuweather = Accuweather;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3NjU3Nzk3ZDUxYWJiNWI1Y2MxYiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQVksS0FNWDtBQU5ELFdBQVksS0FBSztJQUNmLCtCQUFPO0lBQ1Asc0NBQVc7SUFDWCwrREFBd0I7SUFDeEIsZ0RBQWdCO0lBQ2hCLGdEQUFnQjtBQUNsQixDQUFDLEVBTlcsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBTWhCO0FBRUQsSUFBWSxJQUtYO0FBTEQsV0FBWSxJQUFJO0lBQ2QsNkJBQU87SUFDUCwrQkFBUTtJQUNSLDhCQUFRO0lBQ1Isc0NBQVk7QUFDZCxDQUFDLEVBTFcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBS2Y7QUFPRDtJQUNFLFlBQW9CLE9BQWUsRUFBVSxNQUFjO1FBQXZDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxD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O1lBRTdELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0NBQ0Y7QUFsREQsa0NBa0RDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYWNjdXdlYXRoZXJDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYWNjdXdlYXRoZXJDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc2NTc3OTdkNTFhYmI1YjVjYzFiIiwiZXhwb3J0IGVudW0gSG91cnMge1xuICBPTkUgPSAxLFxuICBUV0VMVkUgPSAxMixcbiAgT05FX0hVTkRSRURfVFdFTlRZID0gMTIwLFxuICBUV0VOVFlfRk9VUiA9IDI0LFxuICBTRVZFTlRZX1RXTyA9IDcyXG59XG5cbmV4cG9ydCBlbnVtIERheXMge1xuICBPTkUgPSAxLFxuICBGSVZFID0gNSxcbiAgVEVOID0gMTAsXG4gIEZJRlRFRU4gPSAxNVxufVxuXG5pbnRlcmZhY2UgQWNjdXdlYXRoZXJJbnRlcmZhY2Uge1xuICBnZXREYWlseVdlYXRoZXJGb3JlY2FzdChjdXJyZW50UG9zaXRpb246IHN0cmluZywgZm9yZWNhc3RJbnRlcnZhbDogRGF5cyk6IFByb21pc2U8YW55PjtcbiAgZ2V0SG91cmx5V2VhdGhlckZvcmVjYXN0KGN1cnJlbnRQb3NpdGlvbjogc3RyaW5nLCBmb3JlY2FzdEludGVydmFsOiBIb3Vycyk6IFByb21pc2U8YW55PlxufVxuXG5leHBvcnQgY2xhc3MgQWNjdXdlYXRoZXIgaW1wbGVtZW50cyBBY2N1d2VhdGhlckludGVyZmFjZXtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmcsIHByaXZhdGUgYXBpS2V5OiBzdHJpbmcpe1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQodXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogJ0dFVCcsIG1vZGU6ICdjb3JzJywgY2FjaGU6ICdkZWZhdWx0J30pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRMb2NhdGlvbktleShyZXNwb25zZTogUmVzcG9uc2UpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlO1xuXG4gICAgICBpZiAocmVzcG9uc2VEYXRhLm9rKSB7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IGF3YWl0IHJlc3BvbnNlRGF0YS5qc29uKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0LktleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2VEYXRhLnN0YXR1c1RleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gUmVzcG9uc2UgdG8gcHJvY2VzcycpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMb2NhdGlvblNlYXJjaFVybChhcGlLZXk6IHN0cmluZywgYmFzZVVybDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBjdXJyZW50UG9zaXRpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJhc2VVcmwgKyBcIi9cIiArIHF1ZXJ5ICsgXCI/YXBpa2V5PVwiICsgYXBpS2V5ICsgXCImcT1cIiArIGN1cnJlbnRQb3NpdGlvbjtcbiAgfXNcblxuICBwcml2YXRlIGdldEZvcmVjYXN0VXJsKG51bWJlck9mRGF5czogbnVtYmVyLCBhcGlLZXk6IHN0cmluZywgYmFzZVVybDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBsb2NhdGlvbktleTogc3RyaW5nLCBpc0RhaWx5OiBib29sZWFuKSA6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJhc2VVcmwgKyBcIi9cIiArIHF1ZXJ5ICsgXCIvXCIgKyBudW1iZXJPZkRheXMudG9TdHJpbmcoKSArICAoaXNEYWlseSA/IFwiZGF5L1wiIDogXCJob3VyL1wiKSArIGxvY2F0aW9uS2V5ICsgXCI/YXBpa2V5PVwiICsgYXBpS2V5ICsgXCImbWV0cmljPXRydWVcIjtcbiAgfVxuXG4gIHB1YmxpYyBnZXREYWlseVdlYXRoZXJGb3JlY2FzdChjdXJyZW50UG9zaXRpb246IHN0cmluZywgbnVtYmVyT2ZEYXlzVG9RdWVyeTogRGF5cyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0V2VhdGhlckZvclRpbWVJbnRlcnZhbChjdXJyZW50UG9zaXRpb24sIG51bWJlck9mRGF5c1RvUXVlcnksIFwiZm9yZWNhc3RzL3YxL2RhaWx5XCIsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGdldEhvdXJseVdlYXRoZXJGb3JlY2FzdChjdXJyZW50UG9zaXRpb246IHN0cmluZywgbnVtYmVyT2ZIb3Vyc1RvUXVlcnk6IEhvdXJzKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRXZWF0aGVyRm9yVGltZUludGVydmFsKGN1cnJlbnRQb3NpdGlvbiwgbnVtYmVyT2ZIb3Vyc1RvUXVlcnksIFwiZm9yZWNhc3RzL3YxL2hvdXJseVwiLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFdlYXRoZXJGb3JUaW1lSW50ZXJ2YWwoY3VycmVudFBvc2l0aW9uOiBzdHJpbmcsIGludGVydmFsOiBudW1iZXIsIGFwaVVybDogc3RyaW5nLCBpc0RhaWx5OiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBnZW9sb2NhdGlvblF1ZXJ5ID0gXCJsb2NhdGlvbnMvdjEvY2l0aWVzL2dlb3Bvc2l0aW9uL3NlYXJjaFwiO1xuXG4gICAgY29uc3QgbG9jYXRpb25TZWFyY2hVcmw6IHN0cmluZyA9IHRoaXMuZ2V0TG9jYXRpb25TZWFyY2hVcmwodGhpcy5hcGlLZXksIHRoaXMuYmFzZVVybCwgZ2VvbG9jYXRpb25RdWVyeSwgY3VycmVudFBvc2l0aW9uKTtcbiAgICBjb25zdCBsb2NhdGlvblJlc3VsdDogUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldChsb2NhdGlvblNlYXJjaFVybCk7XG4gICAgY29uc3QgbG9jYXRpb25LZXk6IHN0cmluZyA9IGF3YWl0IHRoaXMuZ2V0TG9jYXRpb25LZXkobG9jYXRpb25SZXN1bHQpO1xuICAgIGNvbnN0IGZvcmVjYXN0VXJsOiBzdHJpbmcgPSB0aGlzLmdldEZvcmVjYXN0VXJsKGludGVydmFsLCB0aGlzLmFwaUtleSwgdGhpcy5iYXNlVXJsLCBhcGlVcmwsIGxvY2F0aW9uS2V5LCBpc0RhaWx5KTtcbiAgICBjb25zdCBmb3JlY2FzdFJlc3VsdDogUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldChmb3JlY2FzdFVybCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF3YWl0IGZvcmVjYXN0UmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=