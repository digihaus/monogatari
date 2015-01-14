define( [ 'core/collection/Map', 'render/Camera2D', 'lib/Detector', 'lib/Three', 'core/Math' ], function( _Map, _Camera2D, _Detector, _Three, _Math ) {

  var SceneManager = function() {
    this.cameras = new _Map();
    this.cameraIterator = this.cameras.iterator();
    this.scenes = new _Map();
  };

  SceneManager.DEFAULT_CAMERA_ID = 'default_camera_id';
  SceneManager.DEFAULT_SCENE_ID = 'default_scene_id';

  SceneManager.prototype.init = function( bgcolor, width, height, target ) {
    // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
    this.renderer = _Detector.webgl ? new _Three.WebGLRenderer( {
      antialias : false
    } ) : new _Three.CanvasRenderer();

    // Set the background color of the renderer, with full opacity
    this.renderer.setClearColor( ( bgcolor ) ? bgcolor : 0xFFFFFF, 1 );

    // if no dimensions are provided, get the size of the inner window (content area) to create a full size renderer
    this.canvasWidth = ( width ) ? width : window.innerWidth - 25;
    this.canvasHeight = ( height ) ? height : window.innerHeight - 25;

    // since the rendering area is actually 3D, a Z translation on camera is required.
    this.z = _Math.max( this.canvasWidth, this.canvasHeight );

    // set the renderer size
    this._renderer.setSize( this.canvasWidth, this.canvasHeight );

    // attach a canvas tag on the body
    var body = ( target ) ? target : document.getElementsByTagName( 'body' )[ 0 ];
    body.appendChild( this._renderer.domElement );
  };

  // create a Three.scene
  SceneManager.prototype.createScene = function( sceneId ) {
    this._scenes.put( sceneId ? sceneId : this.DEFAULT_SCENE_ID, new _Three.Scene() );
  };

  // create a camera to a scene
  SceneManager.prototype.createCamera = function( cameraId, sceneId, width, height ) {
    var scene = this._scenes.get( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID );

    if ( !cameraId ) {
      cameraId = this.DEFAULT_CAMERA_ID;
    }

    if ( !width ) {
      width = this.canvasWidth;
    }

    if ( !height ) {
      height = this.canvasHeight;
    }

    if ( scene ) {
      // left, right, top, bottom, near, far
      var camera = new _Camera2D( width / -2, width / 2, height / 2, height / -2, 1, _Math.max( width, height ) );

      camera.addScene( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID );
      this.cameras.put( cameraId, camera );

    } else {
      console.log( 'Scene not found:' + sceneId );
      return;
    }
  };

  SceneManager.attachToScene = function( gameObject, sceneId ) {
  // TODO encontra todos os componentes renderizáveis e registra na cena
  };

  SceneManager.prototype.render = function() {
    var camera, scene;

    this.cameraIterator.first();

    // iterate all cameras
    while ( this._cameraIterator.hasNext() ) {
      camera = this._cameraIterator.next();
      camera._sceneIterator.first();

      // iterate all scenes registered to render on this camera
      while ( camera._sceneIterator.hasNext() ) {
        scene = this._scenes.get( camera._sceneIterator.next() );

        // TODO render based on ObjectManager tree hierarchy  
        if ( scene ) {
          this._renderer.render( scene, camera.cam );
        }
      }
    }
  };

  return SceneManager;
} );
