/*!
 * 
 * Copyright 2016, YURSILE

 */

(function(window) {
    function extend() {
      var target = arguments[0] || {};
      var i = 1;
      var length = arguments.length;
      var deep = false;
      var options, name, src, copy, copy_is_array, clone;

      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== 'object' && !is.fn(target)) {
        target = {};
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        options = arguments[i]
        if (options != null) {
          if (typeof options === 'string') {
              options = options.split('');
          }
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name];

            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (is.hash(copy) || (copy_is_array = is.array(copy)))) {
              if (copy_is_array) {
                copy_is_array = false;
                clone = src && is.array(src) ? src : [];
              } else {
                clone = src && is.hash(src) ? src : {};
              }

              // Never move original objects, clone them
              target[name] = extend(deep, clone, copy);

            // Don't bring in undefined values
            } else if (typeof copy !== 'undefined') {
              target[name] = src||copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    };


    /*
    utils

    */
    var toStr = Object.prototype.toString;

    var is = {};
    is.array = Array.isArray || function (value) {
      return toStr.call(value) === '[object Array]';
    };

    is.fn = function (value) {
      var isAlert = typeof window !== 'undefined' && value === window.alert;
      return isAlert || toStr.call(value) === '[object Function]';
    };

    is.object = function (value) {
      return toStr.call(value) === '[object Object]';
    };

    is.hash = function (value) {
      return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
    };

    /**
     * @public
     */


    if( typeof define === 'function' && (define.amd || seajs) ){
        define('extend', [], function(){
            return extend;
        });
    }else if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = extend;
    }
    
    window.extend = extend;
})(window);

