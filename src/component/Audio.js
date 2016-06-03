define(
  [ 'component/Base', 'lib/Howler' ], function( Base, _Howler ) {

    /**
     * Encapsulates a {@link http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library|Howler} object for Audio management.
     * @param {String} audio Audio source URI
     * @exports component/Audio
     * @extends {module:component/Base}
     */
    var Audio = function( source ) {
      Base.call( this, Base.TYPE.AUDIO );

      /**
       * Basic instance of a {@link http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library|Howler} object.
       */
      this.sound = new Howl( {
        urls: [ source ],
        autoplay: false,
        loop: false,
        onload: function() {
          this.state = Base.STATE.LOADED;
        }.bind( this )
      } );
    };

    Audio.prototype = Object.create( Base.prototype );

    /**
     * Starts playing the loaded sound.
     */
    Audio.prototype.play = function() {
      this.state = Base.STATE.RUNNING;
      this.sound.play();
    };

    /**
     * Stops playing the sound.
     */
    Audio.prototype.stop = function() {
      this.state = Base.STATE.LOADED;
      this.sound.stop();
    };

    return Audio;
  }
);