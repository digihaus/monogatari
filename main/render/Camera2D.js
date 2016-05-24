/**
 * Exports the {@link module:render/Camera2D~Camera2D|Camera2D} class.
 * @module render/Camera2D
 */
define(
  [ 'lib/Three' ], function ( _Three ) {

    /**
     * Utility class that holds the THREE camera and the information of which scenes should be rendered in which camera.
     * @param {Number} left
     * @param {Number} right
     * @param {Number} top
     * @param {Number} bottom
     * @param {Number} near
     * @param {Number} far
     * @class Camera2D
     */
    var Camera2D = function ( left, right, top, bottom, near, far ) {
      /**
       * A THREE.Camera object
       * @memberOf module:render/Camera2D~Camera2D
       * @instance
       * @type {THREE.OrthographicCamera}
       * @name cam
       */
      this.cam = new THREE.OrthographicCamera( left, right, top, bottom, near, far );

      // Translates the point of origin (0,0,0), to the top left corner
      this.cam.position.set( right, bottom, far );

      /**
       * Array of scenes to be rendered on this camera
       * @memberOf module:render/Camera2D~Camera2D
       * @instance
       * @type {Array}
       * @name scenes
       */
      this.scenes = [];
    };

    /**
     * Add a scene to this Camera
     * @instance
     * @method
     * @name setContextFillColor
     * @param {String} sceneId Scene ID
     * @param {THREE.Scene} scene THREE.Scene object
     * @memberOf module:render/Camera2D~Camera2D
     */
    Camera2D.prototype.addScene = function ( sceneId, scene ) {
      if ( sceneId && typeof sceneId === 'string' ) {
        this.scenes.push( sceneId );
      }
    };

    return Camera2D;
  }
);
