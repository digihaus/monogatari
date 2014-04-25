// @Requires[core/Monogatari.js]
// @Requires[core/collection/Set.js]
// @Requires[lib/Three.js]

/**
 * This is an utilitary class to hold the THREE camera itself and the information of which scenes should be rendered in
 * which camera
 */

Monogatari.Camera2D = Class.extend( {
  init : function( left, right, top, bottom, near, far ) {
    // a THREE.Camera object
    this.cam = new THREE.OrthographicCamera( left, right, top, bottom, near, far );
    this.cam.position.set( 0, 0, far );

    // set of scene IDs that the camera will render
    this._sceneIds = new Monogatari.Set();
    this._sceneIterator = this._sceneIds.iterator();
  },

  addScene : function( sceneId ) {
    if ( sceneId && typeof sceneId === "string" )
      this._sceneIds.put( sceneId );
  }
} );