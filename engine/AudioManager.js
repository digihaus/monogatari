// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[lib/Sound.js]

Monogatari.AudioManager = new MonogatariAudioManager();

function MonogatariAudioManager() {
  createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );

  this.queue = new createjs.LoadQueue();

  createjs.Sound.alternateExtensions = [ "mp3" ];

  this.queue.installPlugin( createjs.Sound );

  this.queue.addEventListener( "complete", this.loadComplete );
  this.queue.addEventListener( "fileload", this.fileComplete );
  this.queue.addEventListener( "error", this.handleFileError );
  this.queue.addEventListener( "progress", this.handleProgress );
};

MonogatariAudioManager.prototype.loadComplete = function( event ) {
  console.log( "Loading complete" );
};

MonogatariAudioManager.prototype.fileComplete = function( event ) {
  console.log( "File loading complete" );
};

MonogatariAudioManager.prototype.handleFileError = function( event ) {
  console.log( "Error ", event );
};

MonogatariAudioManager.prototype.handleProgress = function( event ) {
  console.log( "Loading... " + ( queue.progress.toFixed( 2 ) * 100 ) + "%" );
};

MonogatariAudioManager.prototype.loadAudio = function( _id, _source ) {
  var item = {
    id : _id,
    src : _source
  };

  this.queue.loadFile( item, true );
};

MonogatariAudioManager.prototype.play = function( id ) {
  soundInstance = createjs.Sound.play( id );
};