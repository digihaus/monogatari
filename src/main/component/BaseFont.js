/**
 * This module provides the basic buffering for fonts.
 * Modules that extend this one should call parse() at some point to proper buffering.
 *
 * https://github.com/typekit/webfontloader
 * http://stemkoski.github.io/Three.js/Texture-From-Canvas.html
 */
define(
  [ 'component/Base', 'component/BaseThree', 'collection/Map', 'core/Math', 'lib/WebFont' ],
  function( Base, BaseThree, Map, Math, WebFont ) {

    var Font = function( size, family, strokeColor, fillColor ) {
      BaseThree.call( this );
      this.type = Base.BASE_FONT;
      this.isRenderable = true;
      this.isLoaded = false;

      this.fontSize = ( size ) ? size : 10;
      this.fontFamily = ( family ) ? family : 'Verdana';
      this.strokeColor = ( strokeColor ) ? strokeColor : '#000';
      this.fillColor = ( fillColor ) ? fillColor : '#000';

      this.maxWidth = this.fontSize;

      // Stores the buffered font, one canvas for each char
      this.fontMap = new Map();
    };

    Font.prototype = Object.create( BaseThree.prototype );

    Font.CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789çÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜãõñÃÕÑâêîôûÂÊÎÔÛ_()-,.[]!?@$* ';

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

    Font.prototype.onLoad = function() {
      this.parse();
      this.isLoaded = true;
    };

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
        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText( Font.CHARS[ i ], 0, h / 2 );

        this.fontMap.put( Font.CHARS[ i ], canvas );
      }
    };

    return Font;
  }
);
