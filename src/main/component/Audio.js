/**
 * Exports the {@link module:core/World~World|World} class.
 * @module component/Audio
 */
define(
  [ 'component/Base', 'lib/howler' ], function( Base, _howler ) {

    /**
     * Basic instance of a Howler object
     * @method
     * @instance
     * @name anonymousFunction
     * @param {Object} options Howler object parameters
     * @link http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library
     * @memberOf module:component/Audio~Audio
     */
    return function( options ) {
      Base.call( this, Base.AUDIO_SOURCE );
      this.obj = new Howl( options );
    };
  }
);