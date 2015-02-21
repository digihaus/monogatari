require( [ 'manager/SceneManager' ], function( _SceneManager ) {

  var scene = new _SceneManager();
  scene.init();
  assert( scene.renderer, 'SceneManager initialized', 'manager' );

} );
