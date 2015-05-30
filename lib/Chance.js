//  Chance.js 0.7.1
//  http://chancejs.com
//  (c) 2013 Victor Quinn
//  Chance may be freely distributed or modified under the MIT license.

(function() {

  // Constants
  var MAX_INT = 9007199254740992;
  var MIN_INT = -MAX_INT;
  var NUMBERS = '0123456789';
  var CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
  var CHARS_UPPER = CHARS_LOWER.toUpperCase();
  var HEX_POOL = NUMBERS + "abcdef";

  // Cached array helpers
  var slice = Array.prototype.slice;

  // Constructor
  function Chance( seed ) {
    if( !(this instanceof Chance) ) {
      return new Chance( seed );
    }

    // if user has provided a function, use that as the generator
    if( typeof seed === 'function' ) {
      this.random = seed;
      return this;
    }

    var seedling;

    if( arguments.length ) {
      // set a starting value of zero so we can add to it
      this.seed = 0;
    }
    // otherwise, leave this.seed blank so that MT will recieve a blank

    for( var i = 0; i < arguments.length; i++ ) {
      seedling = 0;
      if( typeof arguments[ i ] === 'string' ) {
        for( var j = 0; j < arguments[ i ].length; j++ ) {
          seedling += (arguments[ i ].length - j) * arguments[ i ].charCodeAt( j );
        }
      } else {
        seedling = arguments[ i ];
      }
      this.seed += (arguments.length - i) * seedling;
    }

    // If no generator function was provided, use our MT
    this.mt = this.mersenne_twister( this.seed );
    this.random = function() {
      return this.mt.random( this.seed );
    };

    return this;
  }

  Chance.prototype.VERSION = "0.7.1";

  // Random helper functions
  function initOptions( options, defaults ) {
    options || (options = {});

    if( defaults ) {
      for( var i in defaults ) {
        if( typeof options[ i ] === 'undefined' ) {
          options[ i ] = defaults[ i ];
        }
      }
    }

    return options;
  }

  function testRange( test, errorMessage ) {
    if( test ) {
      throw new RangeError( errorMessage );
    }
  }

  /**
   * Encode the input string with Base64.
   * @param input
   */
  var base64 = function( input ) {
    throw new Error( 'No Base64 encoder available.' );
  };

  // Select proper Base64 encoder.
  (function determineBase64Encoder() {
    if( typeof btoa === 'function' ) {
      base64 = btoa;
    } else if( typeof Buffer === 'function' ) {
      base64 = function( input ) {
        return new Buffer( input ).toString( 'base64' );
      };
    }
  })();

  // -- Basics --

  Chance.prototype.bool = function( options ) {

    // likelihood of success (true)
    options = initOptions( options, { likelihood: 50 } );

    testRange(
      options.likelihood < 0 || options.likelihood > 100,
      "Chance: Likelihood accepts values from 0 to 100."
    );

    return this.random() * 100 < options.likelihood;
  };

  Chance.prototype.character = function( options ) {
    options = initOptions( options );

    var symbols = "!@#$%^&*()[]",
      letters, pool;

    testRange(
      options.alpha && options.symbols,
      "Chance: Cannot specify both alpha and symbols."
    );

    if( options.casing === 'lower' ) {
      letters = CHARS_LOWER;
    } else if( options.casing === 'upper' ) {
      letters = CHARS_UPPER;
    } else {
      letters = CHARS_LOWER + CHARS_UPPER;
    }

    if( options.pool ) {
      pool = options.pool;
    } else if( options.alpha ) {
      pool = letters;
    } else if( options.symbols ) {
      pool = symbols;
    } else {
      pool = letters + NUMBERS + symbols;
    }

    return pool.charAt( this.natural( { max: (pool.length - 1) } ) );
  };

  // Note, wanted to use "float" or "double" but those are both JS reserved words.

  // Note, fixed means N OR LESS digits after the decimal. This because
  // It could be 14.9000 but in JavaScript, when this is cast as a number,
  // the trailing zeroes are dropped. Left to the consumer if trailing zeroes are
  // needed
  Chance.prototype.floating = function( options ) {
    var num;

    options = initOptions( options, { fixed: 4 } );
    var fixed = Math.pow( 10, options.fixed );

    testRange(
      options.fixed && options.precision,
      "Chance: Cannot specify both fixed and precision."
    );

    var max = MAX_INT / fixed;
    var min = -max;

    testRange(
      options.min && options.fixed && options.min < min,
      "Chance: Min specified is out of range with fixed. Min should be, at least, " + min
    );
    testRange(
      options.max && options.fixed && options.max > max,
      "Chance: Max specified is out of range with fixed. Max should be, at most, " + max
    );

    options = initOptions( options, { min: min, max: max } );

    // Todo - Make this work!
    // options.precision = (typeof options.precision !== "undefined") ? options.precision : false;

    num = this.integer( { min: options.min * fixed, max: options.max * fixed } );
    var num_fixed = (num / fixed).toFixed( options.fixed );

    return parseFloat( num_fixed );
  };

  // NOTE the max and min are INCLUDED in the range. So:
  //
  // chance.natural({min: 1, max: 3});
  //
  // would return either 1, 2, or 3.

  Chance.prototype.integer = function( options ) {

    // 9007199254740992 (2^53) is the max integer number in JavaScript
    // See: http://vq.io/132sa2j
    options = initOptions( options, { min: MIN_INT, max: MAX_INT } );

    testRange( options.min > options.max, "Chance: Min cannot be greater than Max." );

    return Math.floor( this.random() * (options.max - options.min + 1) + options.min );
  };

  Chance.prototype.natural = function( options ) {
    options = initOptions( options, { min: 0, max: MAX_INT } );
    return this.integer( options );
  };

  Chance.prototype.string = function( options ) {
    options = initOptions( options );

    var length = options.length || this.natural( { min: 5, max: 20 } ),
      pool = options.pool,
      text = this.n( this.character, length, { pool: pool } );

    return text.join( "" );
  };

  // -- End Basics --

  // -- Helpers --

  /**
   *  Gives an array of n random terms
   *  @param fn the function that generates something random
   *  @param n number of terms to generate
   *  @param options options for the function fn.
   *  There can be more parameters after these. All additional parameters are provided to the given function
   */
  Chance.prototype.n = function( fn, n, options ) {
    var i = n || 1, arr = [], params = slice.call( arguments, 2 );
    // Providing a negative count should result in a noop.
    i = Math.max( 0, i );

    for( null; i--; null ) {
      arr.push( fn.apply( this, params ) );
    }

    return arr;
  };

  Chance.prototype.capitalize = function( word ) {
    return word.charAt( 0 ).toUpperCase() + word.substr( 1 );
  };

  Chance.prototype.mixin = function( obj ) {
    for( var func_name in obj ) {
      Chance.prototype[ func_name ] = obj[ func_name ];
    }
    return this;
  };

  Chance.prototype.shuffle = function( arr ) {
    var old_array = arr.slice( 0 ),
      new_array = [],
      j = 0,
      length = Number( old_array.length );

    for( var i = 0; i < length; i++ ) {
      // Pick a random index from the array
      j = this.natural( { max: old_array.length - 1 } );
      // Add it to the new array
      new_array[ i ] = old_array[ j ];
      // Remove that element from the original array
      old_array.splice( j, 1 );
    }

    return new_array;
  };

  // -- End Helpers --

  // -- Time

  Chance.prototype.ampm = function() {
    return this.bool() ? 'am' : 'pm';
  };

  Chance.prototype.date = function( options ) {
    var date_string, date;

    // If interval is specified we ignore preset
    if( options && (options.min || options.max) ) {
      options = initOptions(
        options, {
          american: true,
          string: false
        }
      );
      var min = typeof options.min !== "undefined" ? options.min.getTime() : 1;
      // 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC. http://es5.github.io/#x15.9.1.1
      var max = typeof options.max !== "undefined" ? options.max.getTime() : 8640000000000000;

      date = new Date( this.natural( { min: min, max: max } ) );
    } else {
      var m = this.month( { raw: true } );

      options = initOptions(
        options, {
          year: parseInt( this.year(), 10 ),
          // Necessary to subtract 1 because Date() 0-indexes month but not day or year
          // for some reason.
          month: m.numeric - 1,
          day: this.natural( { min: 1, max: m.days } ),
          hour: this.hour(),
          minute: this.minute(),
          second: this.second(),
          millisecond: this.millisecond(),
          american: true,
          string: false
        }
      );

      date = new Date( options.year, options.month, options.day, options.hour, options.minute, options.second, options.millisecond );
    }

    if( options.american ) {
      // Adding 1 to the month is necessary because Date() 0-indexes
      // months but not day for some odd reason.
      date_string = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    } else {
      date_string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    return options.string ? date_string : date;
  };

  Chance.prototype.hammertime = function( options ) {
    return this.date( options ).getTime();
  };

  Chance.prototype.hour = function( options ) {
    options = initOptions( options, { min: 1, max: options && options.twentyfour ? 24 : 12 } );

    testRange( options.min < 1, "Chance: Min cannot be less than 1." );
    testRange( options.twentyfour && options.max > 24, "Chance: Max cannot be greater than 24 for twentyfour option." );
    testRange( !options.twentyfour && options.max > 12, "Chance: Max cannot be greater than 12." );
    testRange( options.min > options.max, "Chance: Min cannot be greater than Max." );

    return this.natural( { min: options.min, max: options.max } );
  };

  Chance.prototype.millisecond = function() {
    return this.natural( { max: 999 } );
  };

  Chance.prototype.minute = Chance.prototype.second = function( options ) {
    options = initOptions( options, { min: 0, max: 59 } );

    testRange( options.min < 0, "Chance: Min cannot be less than 0." );
    testRange( options.max > 59, "Chance: Max cannot be greater than 59." );
    testRange( options.min > options.max, "Chance: Min cannot be greater than Max." );

    return this.natural( { min: options.min, max: options.max } );
  };

  Chance.prototype.month = function( options ) {
    options = initOptions( options, { min: 1, max: 12 } );

    testRange( options.min < 1, "Chance: Min cannot be less than 1." );
    testRange( options.max > 12, "Chance: Max cannot be greater than 12." );
    testRange( options.min > options.max, "Chance: Min cannot be greater than Max." );

    var month = this.pick( this.months().slice( options.min - 1, options.max ) );
    return options.raw ? month : month.name;
  };

  Chance.prototype.months = function() {
    return this.get( "months" );
  };

  Chance.prototype.second = function() {
    return this.natural( { max: 59 } );
  };

  Chance.prototype.timestamp = function() {
    return this.natural( { min: 1, max: parseInt( new Date().getTime() / 1000, 10 ) } );
  };

  Chance.prototype.year = function( options ) {
    // Default to current year as min if none specified
    options = initOptions( options, { min: new Date().getFullYear() } );

    // Default to one century after current year as max if none specified
    options.max = (typeof options.max !== "undefined") ? options.max : options.min + 100;

    return this.natural( options ).toString();
  };

  // -- End Time

  // -- Miscellaneous --

  // Dice - For all the board game geeks out there, myself included ;)
  function diceFn( range ) {
    return function() {
      return this.natural( range );
    };
  }

  Chance.prototype.d4 = diceFn( { min: 1, max: 4 } );
  Chance.prototype.d6 = diceFn( { min: 1, max: 6 } );
  Chance.prototype.d8 = diceFn( { min: 1, max: 8 } );
  Chance.prototype.d10 = diceFn( { min: 1, max: 10 } );
  Chance.prototype.d12 = diceFn( { min: 1, max: 12 } );
  Chance.prototype.d20 = diceFn( { min: 1, max: 20 } );
  Chance.prototype.d30 = diceFn( { min: 1, max: 30 } );
  Chance.prototype.d100 = diceFn( { min: 1, max: 100 } );

  Chance.prototype.rpg = function( thrown, options ) {
    options = initOptions( options );
    if( thrown === null ) {
      throw new Error( "A type of die roll must be included" );
    } else {
      var bits = thrown.toLowerCase().split( "d" ),
        rolls = [];

      if( bits.length !== 2 || !parseInt( bits[ 0 ], 10 ) || !parseInt( bits[ 1 ], 10 ) ) {
        throw new Error( "Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die" );
      }
      for( var i = bits[ 0 ]; i > 0; i-- ) {
        rolls[ i - 1 ] = this.natural( { min: 1, max: bits[ 1 ] } );
      }
      return (typeof options.sum !== 'undefined' && options.sum) ? rolls.reduce( function( p, c ) { return p + c; } ) : rolls;
    }
  };

  // Guid
  Chance.prototype.guid = function( options ) {
    options = initOptions( options, { version: 5 } );

    var guid_pool = "abcdef1234567890",
      variant_pool = "ab89",
      guid = this.string( { pool: guid_pool, length: 8 } ) + '-' +
        this.string( { pool: guid_pool, length: 4 } ) + '-' +
          // The Version
        options.version +
        this.string( { pool: guid_pool, length: 3 } ) + '-' +
          // The Variant
        this.string( { pool: variant_pool, length: 1 } ) +
        this.string( { pool: guid_pool, length: 3 } ) + '-' +
        this.string( { pool: guid_pool, length: 12 } );
    return guid;
  };

  // Hash
  Chance.prototype.hash = function( options ) {
    options = initOptions( options, { length: 40, casing: 'lower' } );
    var pool = options.casing === 'upper' ? HEX_POOL.toUpperCase() : HEX_POOL;
    return this.string( { pool: pool, length: options.length } );
  };

  Chance.prototype.luhn_check = function( num ) {
    var str = num.toString();
    var checkDigit = +str.substring( str.length - 1 );
    return checkDigit === this.luhn_calculate( +str.substring( 0, str.length - 1 ) );
  };

  Chance.prototype.luhn_calculate = function( num ) {
    var digits = num.toString().split( "" ).reverse();
    var sum = 0;
    var digit;

    for( var i = 0, l = digits.length; l > i; ++i ) {
      digit = +digits[ i ];
      if( i % 2 === 0 ) {
        digit *= 2;
        if( digit > 9 ) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return (sum * 9) % 10;
  };

  var o_hasOwnProperty = Object.prototype.hasOwnProperty;
  var o_keys = (Object.keys || function( obj ) {
    var result = [];
    for( var key in obj ) {
      if( o_hasOwnProperty.call( obj, key ) ) {
        result.push( key );
      }
    }

    return result;
  });

  function _copyObject( source, target ) {
    var keys = o_keys( source );

    for( var i = 0, l = keys.length; i < l; i++ ) {
      key = keys[ i ];
      target[ key ] = source[ key ] || target[ key ];
    }
  }

  function _copyArray( source, target ) {
    for( var i = 0, l = source.length; i < l; i++ ) {
      target[ i ] = source[ i ];
    }
  }

  function copyObject( source, _target ) {
    var isArray = Array.isArray( source );
    var target = _target || (isArray ? new Array( source.length ) : {});

    if( isArray ) {
      _copyArray( source, target );
    } else {
      _copyObject( source, target );
    }

    return target;
  }

  // -- End Miscellaneous --

  Chance.prototype.mersenne_twister = function( seed ) {
    return new MersenneTwister( seed );
  };

  // Mersenne Twister from https://gist.github.com/banksean/300494
  var MersenneTwister = function( seed ) {
    if( seed === undefined ) {
      seed = new Date().getTime();
    }
    /* Period parameters */
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    /* constant vector a */
    this.UPPER_MASK = 0x80000000;
    /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff;
    /* least significant r bits */

    this.mt = new Array( this.N );
    /* the array for the state vector */
    this.mti = this.N + 1;
    /* mti==N + 1 means mt[N] is not initialized */

    this.init_genrand( seed );
  };

  /* initializes mt[N] with a seed */
  MersenneTwister.prototype.init_genrand = function( s ) {
    this.mt[ 0 ] = s >>> 0;
    for( this.mti = 1; this.mti < this.N; this.mti++ ) {
      s = this.mt[ this.mti - 1 ] ^ (this.mt[ this.mti - 1 ] >>> 30);
      this.mt[ this.mti ] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[ this.mti ] >>>= 0;
      /* for >32 bit machines */
    }
  };

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  MersenneTwister.prototype.init_by_array = function( init_key, key_length ) {
    var i = 1, j = 0, k, s;
    this.init_genrand( 19650218 );
    k = (this.N > key_length ? this.N : key_length);
    for( ; k; k-- ) {
      s = this.mt[ i - 1 ] ^ (this.mt[ i - 1 ] >>> 30);
      this.mt[ i ] = (this.mt[ i ] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525))) + init_key[ j ] + j;
      /* non linear */
      this.mt[ i ] >>>= 0;
      /* for WORDSIZE > 32 machines */
      i++;
      j++;
      if( i >= this.N ) {
        this.mt[ 0 ] = this.mt[ this.N - 1 ];
        i = 1;
      }
      if( j >= key_length ) { j = 0; }
    }
    for( k = this.N - 1; k; k-- ) {
      s = this.mt[ i - 1 ] ^ (this.mt[ i - 1 ] >>> 30);
      this.mt[ i ] = (this.mt[ i ] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i;
      /* non linear */
      this.mt[ i ] >>>= 0;
      /* for WORDSIZE > 32 machines */
      i++;
      if( i >= this.N ) {
        this.mt[ 0 ] = this.mt[ this.N - 1 ];
        i = 1;
      }
    }

    this.mt[ 0 ] = 0x80000000;
    /* MSB is 1; assuring non-zero initial array */
  };

  /* generates a random number on [0,0xffffffff]-interval */
  MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array( 0x0, this.MATRIX_A );
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if( this.mti >= this.N ) { /* generate N words at one time */
      var kk;

      if( this.mti === this.N + 1 ) {   /* if init_genrand() has not been called, */
        this.init_genrand( 5489 );
        /* a default initial seed is used */
      }
      for( kk = 0; kk < this.N - this.M; kk++ ) {
        y = (this.mt[ kk ] & this.UPPER_MASK) | (this.mt[ kk + 1 ] & this.LOWER_MASK);
        this.mt[ kk ] = this.mt[ kk + this.M ] ^ (y >>> 1) ^ mag01[ y & 0x1 ];
      }
      for( ; kk < this.N - 1; kk++ ) {
        y = (this.mt[ kk ] & this.UPPER_MASK) | (this.mt[ kk + 1 ] & this.LOWER_MASK);
        this.mt[ kk ] = this.mt[ kk + (this.M - this.N) ] ^ (y >>> 1) ^ mag01[ y & 0x1 ];
      }
      y = (this.mt[ this.N - 1 ] & this.UPPER_MASK) | (this.mt[ 0 ] & this.LOWER_MASK);
      this.mt[ this.N - 1 ] = this.mt[ this.M - 1 ] ^ (y >>> 1) ^ mag01[ y & 0x1 ];

      this.mti = 0;
    }

    y = this.mt[ this.mti++ ];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  };

  /* generates a random number on [0,0x7fffffff]-interval */
  MersenneTwister.prototype.genrand_int31 = function() {
    return (this.genrand_int32() >>> 1);
  };

  /* generates a random number on [0,1]-real-interval */
  MersenneTwister.prototype.genrand_real1 = function() {
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  };

  /* generates a random number on [0,1)-real-interval */
  MersenneTwister.prototype.random = function() {
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on (0,1)-real-interval */
  MersenneTwister.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on [0,1) with 53-bit resolution*/
  MersenneTwister.prototype.genrand_res53 = function() {
    var a = this.genrand_int32() >>> 5, b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  };

  // CommonJS module
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = Chance;
    }
    exports.Chance = Chance;
  }

  // Register as an anonymous AMD module
  if( typeof define === 'function' && define.amd ) {
    define(
      [], function() {
        return Chance;
      }
    );
  }

  // if there is a importsScrips object define chance for worker
  if( typeof importScripts !== 'undefined' ) {
    chance = new Chance();
  }

  // If there is a window object, that at least has a document property,
  // instantiate and define chance on the window
  if( typeof window === "object" && typeof window.document === "object" ) {
    window.Chance = Chance;
    window.chance = new Chance();
  }
})();
