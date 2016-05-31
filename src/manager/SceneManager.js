/**
 * Exports the {@link module:manager/SceneManager~SceneManager|SceneManager} class.
 * @module manager/SceneManager
 */
define(
  [ 'collection/Map', 'render/Camera2D', 'core/Math', 'lib/Three' ],
  function( Map, Camera2D, Math, _Three ) {

    var instance = null;

    /**
     * @class SceneManager
     */
    var SceneManager = function() {
      /**
       * Map of Monogatari (2D) cameras
       * @memberOf module:manager/SceneManager~SceneManager
       * @instance
       * @type {Map}
       * @name cameras
       */
      this.cameras = new Map();
      this.cameraIterator = this.cameras.iterator();
      /**
       * Map of three.js scenes
       * @memberOf module:manager/SceneManager~SceneManager
       * @instance
       * @type {Map}
       * @name scenes
       */
      this.scenes = new Map();
    };

    SceneManager.prototype.DEFAULT_CAMERA_ID = 'default_camera_id';
    SceneManager.prototype.DEFAULT_SCENE_ID = 'default_scene_id';

    /**
     * Camera initialization, creates a Three.js camera with the given parameters. The viewport is fixed to 2D.
     * @method
     * @instance
     * @name createWorld
     * @param {String} bgcolor Hexadecimal background color
     * @param {Number} [width] Width of the camera in pixels. Defaults to screen resolution.
     * @param {Number} [height] Height of the camera in pixels. Defaults to screen resolution.
     * @param {DOMElement} [target] Target node of the Dom tree to create a canvas renderer. It is attached to the body if not provided.
     * @memberOf module:manager/SceneManager~SceneManager
     */
    SceneManager.prototype.init = function( bgcolor, width, height, target ) {
      // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
      this.renderer = !!window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) )
                      ? new THREE.WebGLRenderer( { antialias: false } )
                      : new THREE.CanvasRenderer();

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

    /**
     * Creates a Scene
     * @method
     * @instance
     * @name createScene
     * @param {String} sceneId Unique identifier of a scene
     * @memberOf module:manager/SceneManager~SceneManager
     */
    SceneManager.prototype.createScene = function( sceneId ) {
      this.scenes.put( sceneId ? sceneId : this.DEFAULT_SCENE_ID, new THREE.Scene() );
    };

    /**
     * Creates a Camera, and attaches a default scene to it.
     * @method
     * @instance
     * @name createScene
     * @param {String} cameraId Unique identifier of a camera
     * @param {String} sceneId Unique identifier of a scene
     * @param {Number} [width] Width of the camera in pixels. Defaults to canvas width.
     * @param {Number} [height] Height of the camera in pixels. Defaults to canvas height.
     * @memberOf module:manager/SceneManager~SceneManager
     */
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
        var camera = new Camera2D( width / -2, width / 2, height / -2, height / 2, Math.max( width, height ) / -2, Math.max( width, height ) / 2 );

        camera.addScene( ( sceneId ) ? sceneId : this.DEFAULT_SCENE_ID, scene );
        this.cameras.put( cameraId, camera );

      } else {
        console.log( 'Scene not found:' + sceneId );
      }
    };

    /**
     * Attach given component to a scene, if no scene is provided, set to default scene
     * @method
     * @instance
     * @name attachToScene
     * @param {Object} component A Monogatari component that can be rendered
     * @param {String} [sceneId] Unique identifier of a scene
     * @memberOf module:manager/SceneManager~SceneManager
     */
    SceneManager.prototype.attachToScene = function( component, sceneId ) {
      var scene = this.scenes.get( sceneId ? sceneId : this.DEFAULT_SCENE_ID );
      if( scene && component.getMesh() ) {
        scene.add( component.getMesh() );
      }
    };

    /**
     * Detach given component from a scene, if no scene is provided, set to default scene
     * @method
     * @instance
     * @name attachToScene
     * @param {Object} component A Monogatari component that can be rendered
     * @param {String} [sceneId] Unique identifier of a scene
     * @memberOf module:manager/SceneManager~SceneManager
     */
    SceneManager.prototype.detachFromScene = function( component, sceneId ) {
      var scene = this.scenes.get( sceneId ? sceneId : this.DEFAULT_SCENE_ID );
      if( scene && component.getMesh() ) {
        scene.remove( component.getMesh() );
      }
    };

    /**
     * Renders all cameras and scenes to the canvas.
     * @method
     * @instance
     * @name render
     * @memberOf module:manager/SceneManager~SceneManager
     */
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