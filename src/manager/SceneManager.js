var Map = require('collection/Map');
var Camera2D = require('render/Camera2D');
var Math = require('core/Math');
var THREE = require('link/Three');

/**
 * @requires collection/Map
 * @requires render/Camera2D
 * @requires core/Math
 * @requires lib/Three
 * @exports manager/SceneManager
 */
var SceneManager = {};

/**
 * Map of Monogatari (2D) cameras.
 * @type {module:collection/Map}
 */
SceneManager.cameras = new Map();
SceneManager.cameraIterator = SceneManager.cameras.iterator();

/**
 * Map of three.js scenes.
 * @type {module:collection/Map}
 */
SceneManager.scenes = new Map();

/** @constant */
SceneManager.DEFAULT_CAMERA_ID = 'default_camera_id';
/** @constant */
SceneManager.DEFAULT_SCENE_ID = 'default_scene_id';

/**
 * Camera initialization, creates a Three.js camera with the given parameters. The viewport is fixed to 2D.
 * @param {String} bgcolor - Hexadecimal background color
 * @param {Number} [width] - Width of the camera in pixels. Defaults to screen resolution
 * @param {Number} [height] - Height of the camera in pixels. Defaults to screen resolution
 * @param {DOMElement} [target] - Target node of the Dom tree to create a canvas renderer. It is attached to the body if not provided
 */
SceneManager.init = function (bgcolor, width, height, target) {
  bgcolor = bgcolor ? bgcolor : 0xFFFFFF;
  width = width ? width : window.innerWidth;
  height = height ? height : window.innerHeight;
  target = target ? target : document.getElementsByTagName('body')[0];

  // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
  var canvas = document.createElement('canvas');
  this.renderer = !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    ? new THREE.WebGLRenderer({ antialias: true })
    : new THREE.CanvasRenderer();
  
  // Set the background color of the renderer, with full opacity
  this.renderer.setClearColor(bgcolor, 1);

  target.appendChild(this.renderer.domElement);

  this.createScene();
  this.createCamera(width, height);

  this.calculateSize(width, height);

  window.addEventListener('resize', function () {
    this.calculateSize(width, height);
  }.bind(this), true);
};

/**
 * Streches the canvas according to the calculated ratio.
 * @param {Number} [width] - Width of the camera in pixels
 * @param {Number} [height] - Height of the camera in pixels
 */ 
SceneManager.calculateSize = function (width, height) {
  var ratioWidth = window.innerWidth / width;
  var ratioHeight = window.innerHeight / height;
  var ratio = (ratioWidth > ratioHeight) ? ratioHeight : ratioWidth;

  this.canvasWidth = width * ratio;
  this.canvasHeight = height * ratio;

  // Since the rendering area is actually 3D, a Z translation on camera is required.
  this.z = Math.max(this.canvasWidth, this.canvasHeight);

  this.renderer.setSize(this.canvasWidth, this.canvasHeight);
};

/**
 * Creates a Scene.
 * @param {String} sceneId - Unique identifier of a scene
 */
SceneManager.createScene = function (sceneId) {
  this.scenes.put(sceneId ? sceneId : this.DEFAULT_SCENE_ID, new THREE.Scene());
};

/**
 * Creates a Camera, and attaches a default scene to it.
 * @param {String} cameraId - Unique identifier of a camera
 * @param {String} sceneId - Unique identifier of a scene
 * @param {Number} [width] - Width of the camera in pixels. Defaults to canvas width
 * @param {Number} [height] - Height of the camera in pixels. Defaults to canvas height
 */
SceneManager.createCamera = function (width, height, cameraId, sceneId) {
  var scene = this.scenes.get((sceneId) ? sceneId : this.DEFAULT_SCENE_ID);

  cameraId = cameraId ? cameraId : this.DEFAULT_CAMERA_ID;
  width = width ? width : this.canvasWidth;
  height = height ? height : this.canvasHeight;

  if (scene) {
    // left, right, top, bottom, near, far
    var camera = new Camera2D(width / -2, width / 2, height / -2, height / 2, Math.max(width, height) / -2, Math.max(width, height) / 2);
    camera.addScene((sceneId) ? sceneId : this.DEFAULT_SCENE_ID, scene);
    this.cameras.put(cameraId, camera);
  } else {
    console.log('Scene not found:' + sceneId);
  }
};

/**
 * Attach given component to a scene, if no scene is provided, set to default scene.
 * @param {Object} component - A Monogatari component that can be rendered
 * @param {String} [sceneId] - Unique identifier of a scene
 */
SceneManager.attachToScene = function (component, sceneId) {
  var scene = this.scenes.get(sceneId ? sceneId : this.DEFAULT_SCENE_ID);
  if (scene && component.mesh) {
    scene.add(component.mesh);
  }
};

/**
 * Detach given component from a scene, if no scene is provided, set to default scene.
 * @param {Object} component - A Monogatari component that can be rendered
 * @param {String} [sceneId] - Unique identifier of a scene
 */
SceneManager.detachFromScene = function (component, sceneId) {
  var scene = this.scenes.get(sceneId ? sceneId : this.DEFAULT_SCENE_ID);
  if (scene && component.mesh) {
    scene.remove(component.mesh);
  }
};

/**
 * Renders all cameras and scenes to the canvas.
 */
SceneManager.render = function () {
  var camera, scene;

  this.cameraIterator.first();

  // iterate all cameras
  while (this.cameraIterator.hasNext()) {
    camera = this.cameraIterator.next();

    // iterate all scenes registered to render on this camera
    for (var i = 0, len = camera.scenes.length; i < len; i++) {
      scene = this.scenes.get(camera.scenes[i]);

      if (scene) {
        this.renderer.render(scene, camera.cam);
      }
    }
  }
};

module.exports = SceneManager;