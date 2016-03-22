/**
 * Exports the {@link module:core/StringUtils~StringUtils|StringUtils} class.
 * @module util/StringUtils
 */
define(
  [ 'util/ArrayUtils' ], function( _ArrayUtils ) {

    /**
     * String Utilities
     * @class StringUtils
     */
    var StringUtils = function() {
      this.REGEXP_URL = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
      this.REGEXP_BETWEEN_SQUARE_BRACKETS = /\[[\w|\W]+\]/;
      this.REGEXP_ENDLINE = /\r\n|\r|\n/;
    };

    /**
     * Substring from left to right
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name left
     * @param {String} str Source text
     * @param {Number} n How many characters will be returned
     * @return {String}
     * @public
     */
    StringUtils.prototype.left = function( str, n ) {
      if( n <= 0 ) {
        return "";
      } else if( n > str.length ) {
        return str;
      } else {
        return str.substring( 0, n );
      }
    };

    /**
     * Substring from right to left
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name right
     * @param {String} str source text
     * @param {Number} n how many characters will be returned
     * @return {String}
     * @public
     */
    StringUtils.prototype.right = function( str, n ) {
      if( n <= 0 ) {
        return "";
      } else if( n > str.length ) {
        return str;
      } else {
        var len = str.length;
        return str.substring( len, len - n );
      }
    };

    /**
     * Check if given string ends with given suffix
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name endsWith
     * @param {String} str source text
     * @param {String} suffix string suffix
     * @return {Boolean}
     * @public
     */
    StringUtils.prototype.endsWith = function( str, suffix ) {
      var len = str.length - suffix.length;
      return len >= 0 && str.indexOf( suffix, len ) === len;
    };

    /**
     * Check if given string starts with given prefix
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name startsWith
     * @param {String} str source text
     * @param {String} prefix string prefix
     * @return {Boolean}
     * @public
     */
    StringUtils.prototype.startsWith = function( str, prefix ) {
      return str.lastIndexOf( prefix, 0 ) === 0;
    };

    /**
     * Check if given string contains given substring
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name contains
     * @param {String} str source text
     * @param {String} subStr slice of String to find on the source text
     * @return {Boolean}
     * @public
     */
    StringUtils.prototype.contains = function( str, subStr ) {
      return str.indexOf( subStr ) != -1;
    };

    /**
     * Returns the file extension of the given source
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name getFileExtension
     * @param {String} src source text
     * @return {String}
     * @example
     * getFileExtension('test.pdf'); //pdf
     * getFileExtension('test.png'); //png
     * @public
     */
    StringUtils.prototype.getFileExtension = function( src ) {
      return /\.([a-zA-Z0-9]+)/.exec( src )[ 1 ];
    };

    /**
     * Checks if a String is surrounded by square brackets
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name isBetweenSquareBrackets
     * @param {String} str String to check.
     * @return {Boolean} True if {@code str} is surrounded by square brackets
     */
    StringUtils.prototype.isBetweenSquareBrackets = function( str ) {
      return /\[[\w|\W]+\]/.test( str );
    };

    /**
     * Checks if a String contains a URL.
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name isUrl
     * @param {String} str String to check.
     * @return {Boolean} True if {@code str} consists of an url
     */
    StringUtils.prototype.isUrl = function( str ) {
      return this.REGEXP_URL.test( str );
    };

    /**
     * Checks if a String contains only letters.
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name isAlpha
     * @param {String} str String to check.
     * @return {Boolean} True if {@code str} consists entirely of letters.
     */
    StringUtils.prototype.isAlpha = function( str ) {
      return !/[^a-zA-Z]/.test( str );
    };

    /**
     * Checks if a String contains only numbers.
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name isNumeric
     * @param {String} str String to check. If not a String, it will be casted to one.
     * @return {Boolean} True if {@code str} is numeric.
     */
    StringUtils.prototype.isNumeric = function( str ) {
      return !/[^0-9]/.test( str );
    };

    /**
     * Checks if a String contains only numbers or letters.
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name isAlphaNumeric
     * @param {String} str String to check.
     * @return {Boolean} True if {@code str} is alphanumeric.
     */
    StringUtils.prototype.isAlphaNumeric = function( str ) {
      return !/[^a-zA-Z0-9]/.test( str );
    };

    /**
     * Returns the non-overlapping occurrences of subStr in str. If either str or subStr evaluates to false, then returns zero.
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name countOf
     * @param {String} str The String to look in.
     * @param {String} subStr The String to look for.
     * @return {Number} Number of occurrences of ss in s.
     */
    StringUtils.prototype.countOf = function( str, subStr ) {
      return str && subStr ? str.split( subStr ).length - 1 : 0;
    };

    /**
     * Return a String with {n} replaced with the n-th argument
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name format
     * @param {String} str The String to format
     * @param {Object} [arguments] All other arguments are substituted into the String
     * @returns {String} The formatted String
     * @example
     * var s = pc.string.format("Hello {0}", "world");
     * console.log(s); // Prints "Hello world"
     */
    StringUtils.prototype.format = function( str ) {
      var regexp, args = _ArrayUtils.flat( arguments );

      // drop first argument
      args.shift();

      for( var i = 0, len = args.length; i < len; i++ ) {
        regexp = new RegExp( '\\{' + i + '\\}', 'gi' );
        str = str.replace( regexp, args[ i ] );
      }

      return str;
    };

    /**
     * Trims white spaces to the left and right of a String.
     * @memberOf module:util/StringUtils~StringUtils
     * @method
     * @instance
     * @name trim
     * @param {String} str The String to trim.
     * @return {String} A trimmed copy of {@code str}.
     */
    StringUtils.prototype.trim = function( str ) {
      // Since IE doesn't include non-breaking-space (0xa0) in their \s character
      // class (as required by section 7.2 of the ECMAScript spec), we explicitly
      // include it in the regexp to enforce consistent cross-browser behavior.
      return str.replace( /^[\s\xa0]+|[\s\xa0]+$/g, '' );
    };

    // from http://kvz.io/
    StringUtils.prototype.utf8_encode = function( string ) {
      string = ( string + '' ).replace( /\r\n/g, "\n" ).replace( /\r/g, "\n" );

      var utftext = "", start = 0, end = 0, stringl = 0;

      stringl = string.length;
      for( var n = 0; n < stringl; n++ ) {
        var c1 = string.charCodeAt( n ), enc = null;

        if( c1 < 128 ) {
          end++;
        } else if( ( c1 > 127 ) && ( c1 < 2048 ) ) {
          enc = String.fromCharCode( ( c1 >> 6 ) | 192 ) + String.fromCharCode( ( c1 & 63 ) | 128 );
        } else {
          enc = String.fromCharCode( ( c1 >> 12 ) | 224 ) + String.fromCharCode( ( ( c1 >> 6 ) & 63 ) | 128 )
            + String.fromCharCode( ( c1 & 63 ) | 128 );
        }
        if( enc != null ) {
          if( end > start ) {
            utftext += string.substring( start, end );
          }
          utftext += enc;
          start = end = n + 1;
        }
      }

      if( end > start ) {
        utftext += string.substring( start, string.length );
      }

      return utftext;
    };

    // from http://kvz.io/
    StringUtils.prototype.utf8_decode = function( str_data ) {

      var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;

      str_data += '';

      while( i < str_data.length ) {
        c1 = str_data.charCodeAt( i );
        if( c1 < 128 ) {
          tmp_arr[ ac++ ] = String.fromCharCode( c1 );
          i++;
        } else if( ( c1 > 191 ) && ( c1 < 224 ) ) {
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

    return new StringUtils();
  }
);
