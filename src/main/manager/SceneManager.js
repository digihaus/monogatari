define(
  [ 'collection/Map', 'render/Camera2D', 'core/Math', 'lib/Detector', 'lib/Three' ],
  function( Map, Camera2D, Math, _Detector, _Three ) {

    var instance = null;

    var SceneManager = function() {
      this.cameras = new Map();
      this.cameraIterator = this.cameras.iterator();
      this.scenes = new Map();
    };

    SceneManager.prototype.DEFAULT_CAMERA_ID = 'default_camera_id';
    SceneManager.prototype.DEFAULT_SCENE_ID = 'default_scene_id';

    SceneManager.prototype.init = function( bgcolor, width, height, target ) {
      // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
      this.renderer = Detector.webgl ? new THREE.WebGLRenderer( { antialias: false } ) : new THREE.CanvasRenderer();

      // Set the background color of the renderer, with full opacity
      this.renderer.setClearColor( ( bgcolor ) ? bgcolor : 0xFFFFFF, 1 );

      // if no dimensions are provided, get the size of the inner window (content area) to create a full size renderer
      this.canvasWidth = ( width ) ? width : window.innerWidth;
      this.canvasHeight = ( height ) ? height : window.innerHeight;

      // since the rendering area is actually 3D, a Z translation on camera is required.
      this.z = Math.max( this.canvasWidth, this.canvasHeight );

      // set the renderer size
      this.renderer.setSize( this.canvasWidth, this.canvasHeight );

      // attach a canvas tag on the body
      var body = ( target ) ? target : document.getElementsByTagName( 'body' )[ 0 ];
      body.appendChild( this.renderer.domElement );

      this.createScene();
      this.createCamera();
    };

    // create a THREE.scene
    SceneManager.prototype.createScene = function( sceneId ) {
      this.scenes.put( sceneId ? sceneId : this.DEFAULT_SCENE_ID, new THREE.Scene() );
    };

    // create a camera to a scene
    SceneManager.prototype.createCamera = function( cameraId, sceneId, width, height ) {
      var scene = this.scenes.get( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID );

      if( !cameraId ) {
        cameraId = this.DEFAULT_CAMERA_ID;
      }

      if( !width ) {
        width = this.canvasWidth;
      }

      if( !height ) {
        height = this.canvasHeight;
      }

      if( scene ) {
        // left, right, top, bottom, near, far
        var camera = new Camera2D( width / -2, width / 2, height / -2, height / 2, 1, Math.max( width, height ) );

        camera.addScene( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID, scene );
        this.cameras.put( cameraId, camera );

      } else {
        console.log( 'Scene not found:' + sceneId );
      }
    };

    // find all renderable components of a given Game Object and attach the on the scene to be rendered
    SceneManager.prototype.attachToScene = function( gameObject, sceneId ) {
      var list = gameObject.listRenderableComponents();
      var scene = this.scenes.get( sceneId ? sceneId : this.DEFAULT_SCENE_ID );

      for( var i = 0, len = list.length; i < len; i++ ) {
        scene.add( list[ i ].getMesh() );
      }
    };

    SceneManager.prototype.render = function() {
      var camera, scene;

      this.cameraIterator.first();

      // iterate all cameras
      while( this.cameraIterator.hasNext() ) {
        camera = this.cameraIterator.next();

        // iterate all scenes registered to render on this camera
        for( var i = 0, len = camera.scenes.length; i < len; i++ ) {
          scene = this.scenes.get( camera.scenes[ i ] );

          if( scene ) {
            this.renderer.render( scene, camera.cam );
          }
        }
      }
    };

    SceneManager.getInstance = function() {
      if( instance === null ) {
        instance = new SceneManager();
      }
      return instance;
    };

    return SceneManager.getInstance();
  }
);
