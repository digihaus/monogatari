// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]

Monogatari.String = new MonogatariString();
function MonogatariString() {};

/**
 * Substring from left to right
 * 
 * @param String str = source text
 * @param int n = how many characters will be returned
 * @return String
 * @public
 */
MonogatariString.prototype.left = function( str, n ) {
  if ( n <= 0 )
    return "";
  else if ( n > str.length )
    return str;
  else
    return str.substring( 0, n );
};

/**
 * Substring from right to left
 * 
 * @param String str = source text
 * @param int n = how many characters will be returned
 * @return String
 * @public
 */
MonogatariString.prototype.right = function( str, n ) {
  if ( n <= 0 )
    return "";
  else if ( n > str.length )
    return str;
  else {
    var len = str.length;
    return str.substring( len, len - n );
  }
};

// from string.js
MonogatariString.prototype.endsWith = function( str, suffix ) {
  var len = str.length - suffix.length;
  return len >= 0 && str.indexOf( suffix, len ) === len;
};

// from string.js
MonogatariString.prototype.startsWith = function( str, prefix ) {
  return str.lastIndexOf( prefix, 0 ) === 0;
};

// from goog.string
MonogatariString.prototype.contains = function( str, subStr ) {
  return str.indexOf( subStr ) != -1;
};

MonogatariString.prototype.getFileExtension = function( src ) {
  return /\.([a-zA-Z0-9]+)/.exec( src )[ 1 ];
};

/**
 * Checks if a string is surrounded by square brackets
 * 
 * @param {string} str string to check.
 * @return {boolean} True if {@code str} is surrounded by square brackets
 */
MonogatariString.prototype.isBetweenSquareBraquets = function( str ) {
  return /\[[\w|\W]+\]/.test( str );
};

/**
 * Checks if a string contains a URL.
 * 
 * @param {string} str string to check.
 * @return {boolean} True if {@code str} consists of an url
 */
MonogatariString.prototype.isUrl = function( str ) {
  return Monogatari.Constants.REGEXP_URL.test( str );
};

/**
 * Checks if a string contains only letters.
 * 
 * @from goog.string
 * @param {string} str string to check.
 * @return {boolean} True if {@code str} consists entirely of letters.
 */
MonogatariString.prototype.isAlpha = function( str ) {
  return !/[^a-zA-Z]/.test( str );
};

/**
 * Checks if a string contains only numbers.
 * 
 * @from goog.string
 * @param {*} str string to check. If not a string, it will be casted to one.
 * @return {boolean} True if {@code str} is numeric.
 */
MonogatariString.prototype.isNumeric = function( str ) {
  return !/[^0-9]/.test( str );
};

/**
 * Checks if a string contains only numbers or letters.
 * 
 * @from goog.string
 * @param {string} str string to check.
 * @return {boolean} True if {@code str} is alphanumeric.
 */
MonogatariString.prototype.isAlphaNumeric = function( str ) {
  return !/[^a-zA-Z0-9]/.test( str );
};

/**
 * Returns the non-overlapping occurrences of subStr in str. If either str or subStr evalutes to false, then returns
 * zero.
 * 
 * @from goog.string
 * @param {string} str The string to look in.
 * @param {string} subStr The string to look for.
 * @return {number} Number of occurrences of ss in s.
 */
MonogatariString.prototype.countOf = function( str, subStr ) {
  return str && subStr ? str.split( subStr ).length - 1 : 0;
};

/**
 * Trims white spaces to the left and right of a string.
 * 
 * @from goog.string
 * @param {string} str The string to trim.
 * @return {string} A trimmed copy of {@code str}.
 */
MonogatariString.prototype.trim = function( str ) {
  // Since IE doesn't include non-breaking-space (0xa0) in their \s character
  // class (as required by section 7.2 of the ECMAScript spec), we explicitly
  // include it in the regexp to enforce consistent cross-browser behavior.
  return str.replace( /^[\s\xa0]+|[\s\xa0]+$/g, '' );
};

// from http://kvz.io/
MonogatariString.prototype.utf8_encode = function( string ) {
  string = ( string + '' ).replace( /\r\n/g, "\n" ).replace( /\r/g, "\n" );

  var utftext = "";
  var start, end;
  var stringl = 0;

  start = end = 0;
  stringl = string.length;
  for ( var n = 0; n < stringl; n++ ) {
    var c1 = string.charCodeAt( n );
    var enc = null;

    if ( c1 < 128 ) {
      end++;
    } else if ( ( c1 > 127 ) && ( c1 < 2048 ) ) {
      enc = String.fromCharCode( ( c1 >> 6 ) | 192 ) + String.fromCharCode( ( c1 & 63 ) | 128 );
    } else {
      enc = String.fromCharCode( ( c1 >> 12 ) | 224 ) + String.fromCharCode( ( ( c1 >> 6 ) & 63 ) | 128 ) + String.fromCharCode( ( c1 & 63 ) | 128 );
    }
    if ( enc != null ) {
      if ( end > start ) {
        utftext += string.substring( start, end );
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if ( end > start ) {
    utftext += string.substring( start, string.length );
  }

  return utftext;
};

// from http://kvz.io/
MonogatariString.prototype.utf8_decode = function( str_data ) {

  var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;

  str_data += '';

  while ( i < str_data.length ) {
    c1 = str_data.charCodeAt( i );
    if ( c1 < 128 ) {
      tmp_arr[ ac++ ] = String.fromCharCode( c1 );
      i++;
    } else if ( ( c1 > 191 ) && ( c1 < 224 ) ) {
      c2 = str_data.charCodeAt( i + 1 );
      tmp_arr[ ac++ ] = String.fromCharCode( ( ( c1 & 31 ) << 6 ) | ( c2 & 63 ) );
      i += 2;
    } else {
      c2 = str_data.charCodeAt( i + 1 );
      c3 = str_data.charCodeAt( i + 2 );
      tmp_arr[ ac++ ] = String.fromCharCode( ( ( c1 & 15 ) << 12 ) | ( ( c2 & 63 ) << 6 ) | ( c3 & 63 ) );
      i += 3;
    }
  }

  return tmp_arr.join( '' );
};