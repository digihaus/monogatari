/**
 * Exports the {@link module:component/Audio~Audio|Audio} class.
 * @module component/Audio
 */
define(
  [ 'component/Base', 'lib/Howler' ], function( Base, _Howler ) {

    /**
     * Encapsulates a Howler object for Audio management.
     * @param {String} source Audio source
     * @memberOf module:component/Audio~Audio
     * @class Audio
     */
    var Audio = function( source ) {
      Base.call( this, Base.TYPE.AUDIO );

      this.isLoadable = true;

      var ctx = this;

      /**
       * Basic instance of a Howler object
       * @param {Object} options Howler object parameters
       * @link http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library
       */
      this.sound = new Howl({
        urls: [ source ],
        autoplay: false,
        loop: false,
        onload: function() {
          ctx.state = Base.STATE.LOADED;
        }
      });
    };

    Audio.prototype = Object.create( Base.prototype );
    
    Audio.prototype.play = function() {
      this.state = Base.STATE.RUNNING;
      this.sound.play();
    };

    Audio.prototype.stop = function() {
      this.state = Base.STATE.LOADED;
      this.sound.stop();
    };

    return Audio;
  }
);