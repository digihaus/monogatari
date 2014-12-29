define( [ 'lib/Sound' ], function( sound ) {

  var AudioLoader = function() {
    createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );

    this.queue = new createjs.LoadQueue();

    createjs.Sound.alternateExtensions = [ 'mp3' ];

    this.queue.installPlugin( createjs.Sound );

    this.queue.addEventListener( 'complete', function( ) {
      _EventManager.notify( 'AudioManager.allAudioLoaded' );
    } );
    this.queue.addEventListener( 'fileload', function( event ) {
      _EventManager.notify( 'AudioManager.audioFileLoaded', event.result.src );
    } );
    this.queue.addEventListener( 'error', function( event ) {
      _EventManager.notify( 'AudioManager.audioFailed', event );
    } );
    this.queue.addEventListener( 'progress', function( ) {
      _EventManager.notify( 'AudioManager.audioLoading', ( this.queue.progress.toFixed( 2 ) * 100 ) );
    } );
  }

  AudioLoader.prototype.load = function( _source ) {
    if ( _source ) {
      var item = {
        src : _source
      };
      this.queue.loadFile( item, true );
    }
  };

  AudioLoader.prototype.isLoaded = function( id ) {
    return ( this.queue._loadItemsById[ id ] || this.queue._loadItemsBySrc[ id ] ) ? true : false;
  };

  // returns a SoundInstance object
  // http://www.createjs.com/Docs/SoundJS/classes/SoundInstance.html
  AudioLoader.prototype.get = function( id ) {
    return createjs.Sound.createInstance( id );
  };

  return AudioLoader;

} );
