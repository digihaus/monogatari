// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[lib/Sound.js]

Monogatari.AudioManager = new MonogatariAudioManager();
Monogatari._Sound = createjs.Sound;

function MonogatariAudioManager() {
  Monogatari._Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );

  this.queue = new createjs.LoadQueue();

  Monogatari._Sound.alternateExtensions = [ "mp3" ];

  this.queue.installPlugin( Monogatari._Sound );

  this.queue.addEventListener( "complete", this.loadComplete );
  this.queue.addEventListener( "fileload", this.fileComplete );
  this.queue.addEventListener( "error", this.handleFileError );
  this.queue.addEventListener( "progress", this.handleProgress );
};

MonogatariAudioManager.prototype.loadComplete = function( event ) {
  console.log( "Loading complete" );
};

MonogatariAudioManager.prototype.fileComplete = function( event ) {
  console.log( "File loading complete: " + event.src );
};

MonogatariAudioManager.prototype.handleFileError = function( event ) {
  console.log( "Error ", event );
};

MonogatariAudioManager.prototype.handleProgress = function( event ) {
  console.log( "Loading... " + ( this.queue.progress.toFixed( 2 ) * 100 ) + "%" );
};

MonogatariAudioManager.prototype.loadAudio = function( _id, _source ) {
  var item = {
    id : _id,
    src : _source
  };

  this.queue.loadFile( item, true );
};

MonogatariAudioManager.prototype.isLoaded = function( id ) {
  return ( this.queue._loadItemsById[ id ] || this.queue._loadItemsBySrc[ src ] ) ? true : false;
};

// returns a SoundInstance object  
// http://www.createjs.com/Docs/SoundJS/classes/SoundInstance.html
MonogatariAudioManager.prototype.get = function( id ) {
  return Monogatari._Sound.createInstance( id );
};