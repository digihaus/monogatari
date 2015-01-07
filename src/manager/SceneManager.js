define( [ 'core/collection/Map', 
          'render/Camera2D', 
          'lib/Detector', 
          'lib/Three', 
          'core/Math' ], function( _Map, _Camera2D, _Detector, _Three, _Math ) {

  function MonogatariSceneManager() {
    this._cameras = new _Map();
    this._cameraIterator = this._cameras.iterator();
    this._scenes = new _Map();

    // this._lights = new Monogatari.Map();
    // this._lightIterator = this._lights.iterator();
  }

  MonogatariSceneManager.DEFAULT_CAMERA_ID = 'default_camera_id';
  MonogatariSceneManager.DEFAULT_SCENE_ID = 'default_scene_id';

  MonogatariSceneManager.prototype.init = function( bgcolor, width, height, target ) {
    // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
    this._renderer = _Detector.webgl ? new _Three.WebGLRenderer( {
      antialias : false
    } ) : new _Three.CanvasRenderer();

    // Set the background color of the renderer, with full opacity
    this._renderer.setClearColor( ( bgcolor ) ? bgcolor : 0xFFFFFF, 1 );

    // if no dimensions are provided, get the size of the inner window (content area) to create a full size renderer
    this._canvasWidth = ( width ) ? width : window.innerWidth - 25;
    this._canvasHeight = ( height ) ? height : window.innerHeight - 25;

    this._canvasHalfWidth = this._canvasWidth / 2;
    this._canvasHalfHeight = this._canvasHeight / 2;

    this._z = _Math.max( this._canvasWidth, this._canvasHeight );

    // Set the renderers size to the content areas size
    this._renderer.setSize( this._canvasWidth, this._canvasHeight );

    var body = ( target ) ? target : document.getElementsByTagName( 'body' )[ 0 ];
    body.appendChild( this._renderer.domElement );
  };

  MonogatariSceneManager.prototype.getScenes = function() {
    return this._scenes;
  };

  MonogatariSceneManager.prototype.getScene = function( id ) {
    return this._scenes.get( id );
  };

  MonogatariSceneManager.prototype.getCamera = function( id ) {
    return this._cameras.get( id );
  };

  MonogatariSceneManager.prototype.createScene = function( sceneId ) {
    this._scenes.put( sceneId ? sceneId : this.DEFAULT_SCENE_ID, new _Three.Scene() );
  };

  MonogatariSceneManager.prototype.createCamera = function( cameraId, sceneId, width, height ) {
    var scene = this._scenes.get( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID );

    if ( !cameraId ) {
      cameraId = this.DEFAULT_CAMERA_ID;
    }
    if ( !width ) {
      width = this._canvasWidth;
    }
    if ( !height ) {
      height = this._canvasHeight;
    }
    if ( scene ) {
      // left, right, top, bottom, near, far
      var camera = new _Camera2D( width / -2, width / 2, height / 2, height / -2, 1, _Math.max( width, height ) );

      camera.addScene( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID );
      this._cameras.put( cameraId, camera );

    } else {
      console.log( 'Scene not found:' + sceneId );
      return;
    }
  };

  MonogatariSceneManager.prototype.addSceneToCamera = function( cameraId, sceneId ) {
    var camera = this._cameras.get( cameraId ), scene = this._scenes.get( sceneId );

    if ( scene && camera ) {
      camera.addScene( sceneId );
    }
  };

  MonogatariSceneManager.prototype.update = function() {

  };

  MonogatariSceneManager.prototype.render = function() {
    this._cameraIterator.first();

    var camera, scene;

    // iterate all cameras
    while ( this._cameraIterator.hasNext() ) {
      camera = this._cameraIterator.next();
      camera._sceneIterator.first();

      // iterate all scenes registered to render on this camera
      while ( camera._sceneIterator.hasNext() ) {
        scene = this._scenes.get( camera._sceneIterator.next() );

        if ( scene ) {
          this._renderer.render( scene, camera.cam );
        }
      }
    }
  };

  Monogatari.SceneManager = new MonogatariSceneManager();

  Monogatari.SceneManager.attachToScene = function( gameObject, sceneId ){
    // encontra todos os componentes renderizáveis e registra na cena
  } ;

} );
