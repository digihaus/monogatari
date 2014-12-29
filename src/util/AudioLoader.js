define( [ 'lib/Sound' ], function( sound ) {

  var AudioLoader = function() {
    createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );

    this.queue = new createjs.LoadQueue();

    createjs.Sound.alternateExtensions = [ 'mp3' ];

    this.queue.installPlugin( createjs.Sound );
  };

  AudioLoader.prototype.load = function( source ) {
    if ( source ) {
      var item = {
        src : source
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
