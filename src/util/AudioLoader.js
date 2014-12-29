define( [ 'lib/Sound' ], function( sound ) {

  createjs.Sound.registerPlugins( [ createjs.WebAudioPlugin, createjs.HTMLAudioPlugin ] );

  createjs.Sound.alternateExtensions = [ 'mp3' ];

  var AudioLoader = {};

  AudioLoader.queue = new createjs.LoadQueue();

  AudioLoader.queue.installPlugin( createjs.Sound );

  AudioLoader.load = function( source ) {
    if ( source ) {
      var item = {
        src : source
      };
      AudioLoader.queue.loadFile( item, true );
    }
  };

  AudioLoader.isLoaded = function( id ) {
    return ( AudioLoader.queue._loadItemsById[ id ] || AudioLoader.queue._loadItemsBySrc[ id ] ) ? true : false;
  };

  // returns a SoundInstance object
  // http://www.createjs.com/Docs/SoundJS/classes/SoundInstance.html
  AudioLoader.get = function( id ) {
    return createjs.Sound.createInstance( id );
  };

  return AudioLoader;

} );
