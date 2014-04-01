// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[core/collection/Map.js]
// @Requires[core/io/file/AjaxAudioLoader.js]
// @Requires[core/io/file/FontLoader.js]
// @Requires[engine/entity/asset/AudioAsset.js]
// @Requires[engine/entity/asset/FontAsset.js]

Monogatari.AssetManager = new MonogatariAssetManager();

function MonogatariAssetManager() {
  this.audio = new Monogatari.Map();
  this.fonts = new Monogatari.Map();

  this._audioterator = this.audio.iterator();
  this._fontIterator = this.fonts.iterator();

  this._audioLoader = new Monogatari.AjaxAudioLoader();
  this._fontLoader = new Monogatari.FontLoader();

  this._audioLoader.init();
};

MonogatariAssetManager.prototype.loadAudio = function( src ) {
  if ( !this.audio.contains( src ) ) {

    var audioAsset = new Monogatari.AudioAsset();

    audioAsset.source = src;
    audioAsset.status = Monogatari.Constants.ASSET_STATE_LOADING;
    this.audio.put( src, audioAsset );

    this._audioLoader.load( src, this.onloadAudio );
  }
};

MonogatariAssetManager.prototype.unloadAudio = function( src ) {
  this.audio.remove( src );
};

MonogatariAssetManager.prototype.onloadAudio = function( src, audio ) {
  var audioAsset = Monogatari.AssetManager.audio.get( src );
  audioAsset.audio = audio;
  audioAsset.status = Monogatari.Constants.ASSET_STATE_LOADED;
};

MonogatariAssetManager.prototype.findAudio = function( src ) {
  return this.audio.get( src );
};

MonogatariAssetManager.prototype.isAudioReady = function( src ) {
  var audio = this.audio.get( src );
  return ( audio && audio.status == Monogatari.Constants.ASSET_STATE_LOADED ) ? true : false;
};

MonogatariAssetManager.prototype.isAllAudioReady = function() {
  var audio;

  this._audioIterator.first();

  while ( this._audioIterator.hasNext() ) {
    audio = this._audioIterator.next();

    if( audio && audio.status != Monogatari.Constants.ASSET_STATE_LOADED )
      return false;
  }

  return true;
};

MonogatariAssetManager.prototype.loadFont = function( family ) {
  if ( !this.fonts.contains( family ) ) {
    var fontAsset = new Monogatari.FontAsset();

    fontAsset.family = family;
    fontAsset.status = Monogatari.Constants.ASSET_STATE_LOADING;
    this.fonts.put( family, fontAsset );

    this._fontLoader.load( family, this.onloadFont, this.onloadFontFailed );
  }
};

MonogatariAssetManager.prototype.isFontReady = function( family ) {
  var font = this.fonts.get( family );
  return ( font && font.status == Monogatari.Constants.ASSET_STATE_LOADED ) ? true : false;
};

MonogatariAssetManager.prototype.isAllFontsReady = function() {
  var font;

  this._fontIterator.first();

  while ( this._fontIterator.hasNext() ) {
    font = this._fontIterator.next();

    if( font && font.status != Monogatari.Constants.ASSET_STATE_LOADED )
      return false;
  }

  return true;
};

MonogatariAssetManager.prototype.onloadFont = function( family ) {
  var fontAsset = Monogatari.AssetManager.fonts.get( family );
  fontAsset.status = Monogatari.Constants.ASSET_STATE_LOADED;
};

MonogatariAssetManager.prototype.onloadFontFailed = function( family ) {
  var fontAsset = Monogatari.AssetManager.fonts.get( family );
  fontAsset.status = Monogatari.Constants.ASSET_STATE_FAILED;
};

/* All */
MonogatariAssetManager.prototype.unloadAll = function() {
  images.clear();
  audio.clear();
  fonts.clear();
};

MonogatariAssetManager.prototype.isAllAssetsLoaded = function() {
  return ( this.isAllImagesReady() && this.isAllAudioReady() && this.isAllFontsReady() ) ? true : false;
};