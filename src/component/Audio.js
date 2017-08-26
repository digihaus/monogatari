var Base = require('component/Base');
var Howler = require('link/Howler');

/**
 * Encapsulates a {@link http://howlerjs.com|howler.js} object for Audio management.
 * @param {String} audio Audio source URI
 * @extends {module:component/Base}
 * @exports component/Audio
 */
var Audio = function (source) {
  Base.call(this, Base.TYPE.AUDIO);

  /**
   * Basic instance of a {@link http://howlerjs.com|howler.js} object.
   */
  this.sound = new Howler.Howl({
    src: [source],
    autoplay: false,
    loop: false,
    onload: function () {
      this.state = Base.STATE.LOADED;
    }.bind(this)
  });
};

Audio.prototype = Object.create(Base.prototype);

/**
 * Starts playing the loaded sound.
 */
Audio.prototype.play = function () {
  this.state = Base.STATE.RUNNING;
  this.sound.play();
};

/**
 * Stops playing the sound.
 */
Audio.prototype.stop = function () {
  this.state = Base.STATE.LOADED;
  this.sound.stop();
};

module.exports = Audio;