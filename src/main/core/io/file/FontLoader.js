define( [ 'lib/Webfont' ], function(webfont) {

  return {

    load: function( family, callback, callbackFail, context ) {

      var ctx = context || this;

      webfont.load( {
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
    }

  }

} );
