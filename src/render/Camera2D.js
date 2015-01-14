/**
 * This is an utilitary class to hold the THREE camera itself and the information of which scenes should be rendered in which camera
 */
define( [ 'collection/Map', 'lib/Three' ], function( _Map, _Three ) {

  var Camera2D = function( left, right, top, bottom, near, far ) {
    // a THREE.Camera object
    this.cam = new _Three.OrthographicCamera( left, right, top, bottom, near, far );
    this.cam.position.set( 0, 0, far );

    this.scenes = new _Map();
    this.sceneIterator = this.scenes.iterator();
  };

  Camera2D.prototype.addScene = function( sceneId ) {
    if ( sceneId && typeof sceneId === 'string' ) {
      this.scenes.put( sceneId );
    }
  }

  return Camera2D;
} );
