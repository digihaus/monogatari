define( [ 'core/Monogatari',
          'core/Constants',
          'core/collection/Map',
          'core/io/file/FontLoader',
          '../lib/Webfont' ], // ARRUMAR

          function( webfont ) { // ARRUMAR

  // TODO ARRUMAR
  var _fontAsset = function() {
    this.name;
    this.family;
    this.status;
    this.color;
  };

  // TODO ARRUMAR
  load: function( family, callback, callbackFail, context ) {

    var ctx = context || this;

    webfont.load( {
      google: {
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

  function MonogatariFontManager() {
    this.fonts = new Monogatari.Map();
    this._fontIterator = this.fonts.iterator();
  }

  MonogatariFontManager.prototype.load = function( family ) {
    if ( !this.fonts.contains( family ) ) {
      var fontAsset = new _fontAsset();

      fontAsset.family = family;
      fontAsset.status = Monogatari.Constants.ASSET_STATE_LOADING;
      this.fonts.put( family, fontAsset );

      Monogatari.FontLoader.load( family, this.onload, this.onloadFailed );
    }
  };

  MonogatariFontManager.prototype.isLoaded = function( family ) {
    var font = this.fonts.get( family );
    return ( font && font.status === Monogatari.Constants.ASSET_STATE_LOADED ) ? true : false;
  };

  MonogatariFontManager.prototype.isAllLoaded = function() {
    var font;

    this._fontIterator.first();

    while ( this._fontIterator.hasNext() ) {
      font = this._fontIterator.next();

      if ( font && font.status !== Monogatari.Constants.ASSET_STATE_LOADED ) {
        return false;
      }
    }

    return true;
  };

  MonogatariFontManager.prototype.onload = function( family ) {
    var fontAsset = Monogatari.FontManager.fonts.get( family );
    fontAsset.status = Monogatari.Constants.ASSET_STATE_LOADED;
  };

  MonogatariFontManager.prototype.onloadFailed = function( family ) {
    var fontAsset = Monogatari.FontManager.fonts.get( family );
    fontAsset.status = Monogatari.Constants.ASSET_STATE_FAILED;
  };

  MonogatariFontManager.prototype.unloadAll = function() {
    fonts.clear();
  };

  Monogatari.FontManager = new MonogatariFontManager();

} );
