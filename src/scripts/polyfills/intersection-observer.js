// Polyfill for IntersectionObserver API
import "intersection-observer";

// Polyfill for forEach nodelist
// https://caniuse.com/#feat=mdn-api_nodelist_foreach
// https://gist.github.com/bob-lee/e7520bfcdac266e5490f40c2759cc955
// Used for intersection observer API
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
        }
    };
}