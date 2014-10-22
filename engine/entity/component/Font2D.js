// https://github.com/typekit/webfontloader
// http://stemkoski.github.io/Three.js/Texture-From-Canvas.html

// this class provides the basic buffering for fonts
// classes that extend Font2D should call parse() at some point to proper buffering
define( [ 'core/Monogatari', 'core/Constants', 'core/String', 'engine/entity/component/ThreeObject' ], function() {

  Monogatari.Font2D = Monogatari.ThreeObject.extend( {
    init : function( fontSize, fontFamily, strokeColor, fillColor ) {
      this.fontSize = ( fontSize ) ? fontSize : 10;
      this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';
      this.strokeColor = ( strokeColor ) ? strokeColor : "#000";
      this.fillColor = ( fillColor ) ? fillColor : "#000";

      this.maxWidth = this.fontSize;

      // this map stores the buffered font (with given specifications)
      // on multiple canvases (one for each character)
      this.fontMap = new Monogatari.Map();

      this.componentType = Monogatari.Constants.COMPONENT_FONT;
    },

    parse : function() {
      var canvas = null, context = null, canvasBuffer = null, contextBuffer = null, w = 0, h = this.fontSize * 2;

      canvasBuffer = document.createElement( 'canvas' );
      canvasBuffer.width = w;
      canvasBuffer.height = h;

      contextBuffer = canvasBuffer.getContext( "2d" );

      for ( var i = 0, len = Monogatari.Constants.FONT_CHARS_SIMPLE.length; i < len; i++ ) {
        w = contextBuffer.measureText( Monogatari.Constants.FONT_CHARS_SIMPLE[ i ] ).width + ( this.fontSize / 2 );

        this.maxWidth = Monogatari.max( w, this.maxWidth );

        canvas = document.createElement( 'canvas' );
        canvas.width = w;
        canvas.height = h;

        context = canvas.getContext( "2d" );
        context.clearRect( 0, 0, w, h );

        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;

        context.font = this.fontSize + "px " + this.fontFamily;

        context.fillText( Monogatari.Constants.FONT_CHARS_SIMPLE[ i ], 0, h / 2 );

        this.fontMap.put( Monogatari.Constants.FONT_CHARS_SIMPLE[ i ], canvas );
      }
    },

    clone : function() {
      return new Monogatari.Font2D( this.fontSize, this.fontFamily, this.strokeColor, this.fillColor );
    }
  } );

} );
