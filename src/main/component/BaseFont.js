/**
 * Exports the {@link module:core/World~World|World} class.
 * @module component/BaseFont
 */
define(
  [ 'component/Base', 'component/BaseThree', 'collection/Map', 'core/Math', 'lib/WebFont' ],
  function( Base, BaseThree, Map, Math, WebFont ) {

    /**
     * This component provides the basic buffering for fonts.
     * All components that extend this should call parse() at some point to proper buffering.
     *
     * @link https://github.com/typekit/webfontloader
     * @link http://stemkoski.github.io/Three.js/Texture-From-Canvas.html
     *
     * @param {String} [size] Font size in pixels
     * @param {String} [family] Font family name
     * @param {String} [color] Hexadecimal color
     * @class BaseFont
     */
    var Font = function( size, family, color ) {
      BaseThree.call( this );
      this.type = Base.BASE_FONT;
      this.isRenderable = true;
      this.state = Base.STATE_READY;
      this.isLoaded = false;

      this.fontSize = ( size ) ? size : 10;
      this.fontFamily = ( family ) ? family : 'Verdana';
      this.color = ( color ) ? color : '#000';

      this.maxWidth = this.fontSize;

      // Stores the buffered font, one canvas for each char
      this.fontMap = new Map();
    };

    Font.prototype = Object.create( BaseThree.prototype );

    /**
     * String array of characters to be parsed by the component.
     * @constant
     * @instance
     * @name CHARS
     * @memberOf module:component/BaseFont~BaseFont
     * @example
     * abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789çÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜãõñÃÕÑâêîôûÂÊÎÔÛ_()-,.[]!?@$*%#&{}<>:+-/
     */
    Font.CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789çÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜãõñÃÕÑâêîôûÂÊÎÔÛ_()-,.[]!?@$*%#&{}<>:+-/ ';

    /**
     * Loads the external font file in memory.  When the file is loaded, calls the onLoad function.
     * @method
     * @instance
     * @name load
     * @memberOf module:component/BaseFont~BaseFont
     */
    Font.prototype.load = function() {
      var callback = this.onLoad;
      var context = this;

      WebFont.load(
        {
          google: {
            families: [ this.fontFamily ]
          },
          active: function() {
            callback.apply( context );
          }
        }
      );
    };

    /**
     * Callback function, to be triggered when a external font file is loaded into memory.
     * @method
     * @instance
     * @name onLoad
     * @memberOf module:component/BaseFont~BaseFont
     */
    Font.prototype.onLoad = function() {
      this.parse();
      this.isLoaded = true;
    };

    /**
     * Parses the font on an array of canvas objects, one for each character, storing them on the internal {Map}.
     * Equivalent to an image buffered on memory.
     * @method
     * @instance
     * @name parse
     * @memberOf module:component/BaseFont~BaseFont
     */
    Font.prototype.parse = function() {
      var canvas = null;
      var context = null;
      var w = 0;
      var h = this.fontSize * 2;

      var canvasBuffer = document.createElement( 'canvas' );
      canvasBuffer.width = w;
      canvasBuffer.height = h;

      var contextBuffer = canvasBuffer.getContext( '2d' );

      for( var i = 0, len = Font.CHARS.length; i < len; i++ ) {
        w = contextBuffer.measureText( Font.CHARS[ i ] ).width + ( this.fontSize / 2 );

        this.maxWidth = Math.max( w, this.maxWidth );

        canvas = document.createElement( 'canvas' );
        canvas.width = w;
        canvas.height = h;

        context = canvas.getContext( '2d' );
        context.clearRect( 0, 0, w, h );
        context.strokeStyle = this.color;
        context.fillStyle = this.color;

        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText( Font.CHARS[ i ], 0, h / 2 );

        this.fontMap.put( Font.CHARS[ i ], canvas );
      }
    };

    /**
     * Set the font size then re-parses for proper buffering
     * @method
     * @instance
     * @name setSize
     * @param {String} [size] Font size in pixels
     * @memberOf module:component/BaseFont~BaseFont
     */
    Font.prototype.setSize = function( size ) {
      this.fontSize = ( size ) ? size : 10;
      this.parse();
    };

    /**
     * Set the font family then re-parses for proper buffering
     * @method
     * @instance
     * @name setFamily
     * @param {String} [family] Font family name
     * @memberOf module:component/BaseFont~BaseFont
     */
    Font.prototype.setFamily = function( family ) {
      this.fontFamily = ( family ) ? family : 'Verdana';
      this.parse();
    };

    /**
     * Set the font color then re-parses for proper buffering
     * @method
     * @instance
     * @name setColor
     * @param {String} [color] Hexadecimal color
     * @memberOf module:component/BaseFont~BaseFont
     */
    Font.prototype.setColor = function( color ) {
      this.color = ( color ) ? color : '#000';
      this.parse();
    };

    return Font;
  }
);
