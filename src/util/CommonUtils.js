define( function() {
  /**
   * Common utility class.
   * @exports util/CommonUtils
   */
  var CommonUtils = {};

  /**
   * Parses a given String to the float pixel value of it.
   * @param {String} text
   * @return {Number}
   * @example
   * parseUnitSizeToPixel('10pt'); //12.5
   * parseUnitSizeToPixel('10pc'); //150
   * parseUnitSizeToPixel('10mm'); //35.43307
   * parseUnitSizeToPixel('10cm'); //354.3307
   * parseUnitSizeToPixel('10in'); //900
   */
  CommonUtils.parseUnitSizeToPixel = function( text ) {
    var len = text.length - 2;
    if( len < 0 ) {
      return text;
    }
    if( text.indexOf( 'pt' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 1.25;
    }
    if( text.indexOf( 'pc' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 15;
    }
    if( text.indexOf( 'mm' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 3.543307;
    }
    if( text.indexOf( 'cm' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 35.43307;
    }
    if( text.indexOf( 'in' ) === len ) {
      return parseFloat( text.substring( 0, len ) ) * 90;
    }
    if( text.indexOf( 'px' ) === len ) {
      return parseFloat( text.substring( 0, len ) );
    }
    return parseFloat( text );
  };

  /**
   * Stores a given value on the Local Storage.
   * @param {String} key - Unique identifier on the Local Storage
   * @param {Object} val - The value to be stored
   * @param {Boolean} isObject - Boolean to flag if is an Object
   * @example
   * store('num', '1');
   * store('on', 'true');
   * store('name', 'pamela');
   * store('obj', {'hello': 'world'}, true);
   */
  CommonUtils.store = function( key, val, isObject ) {
    if( isObject ) {
      localStorage.setItem( key, JSON.stringify( val ) );
    } else {
      localStorage.setItem( key, val );
    }
  };

  /**
   * Checks if a given object is a Monogatari GameObject.
   * @param {Object} object - The value to be tested
   * @return {Boolean}
   */
  CommonUtils.isGameObject = function( object ) {
    return ( object && object.id && object.equals instanceof Function && object.update instanceof Function );
  };

  return CommonUtils;
} );
