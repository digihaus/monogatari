// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[lib/Sound.js]

Monogatari.AudioManager = new MonogatariAudioManager();

function MonogatariAudioManager() {
  createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );

  this.queue = new createjs.LoadQueue();

  createjs.Sound.alternateExtensions = [ "mp3" ];

  this.queue.installPlugin( createjs.Sound );

  this.queue.addEventListener( "complete", function( event ) {
    Monogatari.EventManager.notify( "AudioManager.allAudioLoaded" );
  } );
  this.queue.addEventListener( "fileload", function( event ) {
    Monogatari.EventManager.notify( "AudioManager.audioFileLoaded", event.result.src );
  } );
  this.queue.addEventListener( "error", function( event ) {
    Monogatari.EventManager.notify( "AudioManager.audioFailed", event );
  } );
  this.queue.addEventListener( "progress", function( event ) {
    Monogatari.EventManager.notify( "AudioManager.audioLoading", ( Monogatari.AudioManager.queue.progress.toFixed( 2 ) * 100 ) );
  } );
};

MonogatariAudioManager.prototype.load = function( _source ) {
  if ( _source ) {
    var item = {
      src : _source
    };

    this.queue.loadFile( item, true );
  }
};

MonogatariAudioManager.prototype.isLoaded = function( id ) {
  return ( this.queue._loadItemsById[ id ] || this.queue._loadItemsBySrc[ id ] ) ? true : false;
};

// returns a SoundInstance object
// http://www.createjs.com/Docs/SoundJS/classes/SoundInstance.html
MonogatariAudioManager.prototype.get = function( id ) {
  return createjs.Sound.createInstance( id );
};