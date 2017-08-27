var THREE = require('link/three');

/**
 * Utility class that holds the THREE camera and the information of which scenes should be rendered in which camera.
 * @param {Number} left
 * @param {Number} right
 * @param {Number} top
 * @param {Number} bottom
 * @param {Number} near
 * @param {Number} far
 * @requires lib/Three
 * @exports render/Camera2D
 */
var Camera2D = function (left, right, top, bottom, near, far) {
  /**
   * A THREE.Camera object.
   * @type {THREE.OrthographicCamera}
   */
  this.cam = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

  // Translates the point of origin (0,0,0), to the top left corner
  this.cam.position.set(right, bottom, far);

  /**
   * Array of scenes to be rendered on this camera.
   * @type {Array}
   */
  this.scenes = [];
};

/**
 * Add a scene to this Camera.
 * @param {String} sceneId - Scene ID
 * @param {THREE.Scene} scene - THREE.Scene object
 */
Camera2D.prototype.addScene = function (sceneId, scene) {
  if (sceneId && typeof sceneId === 'string') {
    this.scenes.push(sceneId);
  }
};

module.exports = Camera2D;