define( [ 'core/Monogatari', 'lib/Webfont' ], function() {
  Monogatari.FontLoader = new MonogatariFontLoader();

  function MonogatariFontLoader() {};

  MonogatariFontLoader.prototype.load = function( family, callback, callbackFail, context ) {

    var ctx = context || this;

    WebFont.load( {
      google : {
        families : [ family ]
      },

      fontactive : function( fontFamily, fontDescription ) {
        callback.apply( ctx, [ fontFamily, fontDescription ] );
      },

      fontinactive : function( fontFamily, fontDescription ) {
        callbackFail.apply( ctx, [ fontFamily, fontDescription ] );
      }
    } );

  };
} );