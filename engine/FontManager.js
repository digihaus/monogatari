// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[core/collection/Map.js]
// @Requires[core/io/file/FontLoader.js]
// @Requires[engine/entity/asset/FontAsset.js]

Monogatari.FontManager = new MonogatariFontManager();

function MonogatariFontManager() {
  this.fonts = new Monogatari.Map();
  this._fontIterator = this.fonts.iterator();
  this._fontLoader = new Monogatari.FontLoader();
};

MonogatariFontManager.prototype.loadFont = function( family ) {
  if ( !this.fonts.contains( family ) ) {
    var fontAsset = new Monogatari.FontAsset();

    fontAsset.family = family;
    fontAsset.status = Monogatari.Constants.ASSET_STATE_LOADING;
    this.fonts.put( family, fontAsset );

    this._fontLoader.load( family, this.onloadFont, this.onloadFontFailed );
  }
};

MonogatariFontManager.prototype.isFontReady = function( family ) {
  var font = this.fonts.get( family );
  return ( font && font.status == Monogatari.Constants.ASSET_STATE_LOADED ) ? true : false;
};

MonogatariFontManager.prototype.isAllFontsReady = function() {
  var font;

  this._fontIterator.first();

  while ( this._fontIterator.hasNext() ) {
    font = this._fontIterator.next();

    if( font && font.status != Monogatari.Constants.ASSET_STATE_LOADED )
      return false;
  }

  return true;
};

MonogatariFontManager.prototype.onloadFont = function( family ) {
  var fontAsset = Monogatari.FontManager.fonts.get( family );
  fontAsset.status = Monogatari.Constants.ASSET_STATE_LOADED;
};

MonogatariFontManager.prototype.onloadFontFailed = function( family ) {
  var fontAsset = Monogatari.FontManager.fonts.get( family );
  fontAsset.status = Monogatari.Constants.ASSET_STATE_FAILED;
};

MonogatariFontManager.prototype.unloadAll = function() {
  fonts.clear();
};