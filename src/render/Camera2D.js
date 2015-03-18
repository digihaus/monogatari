/**
 * This is an utilitary class to hold the THREE camera itself and the information of which scenes should be rendered in which camera
 */
define( [ 'collection/Map', 'lib/Three' ], function( _Map, _Three ) {

  var Camera2D = function( left, right, top, bottom, near, far ) {
    // a THREE.Camera object
    this.cam = new THREE.OrthographicCamera( left, right, top, bottom, near, far );
    // translate the point of origin (0,0,0), to the top left corner
    this.cam.position.set( right, bottom, far );

    this.scenes = [];
  };

  Camera2D.prototype.addScene = function( sceneId, scene ) {
    if ( sceneId && typeof sceneId === 'string' ) {
      this.scenes.push( sceneId );
    }
  }

  return Camera2D;
} );
