const Sprite = require('model/component/Sprite');
const Camera2D = require('model/render/Camera2D');
const Three = require('link/Three');

const cameras = new Map();
const scenes = new Map();
var renderer = null;
var gameWidth = 0;
var gameHeight = 0;

class RenderService {

    static get DEFAULT_SCENE_ID() {
        return 'default_scene_id';
    }

    static get DEFAULT_CAMERA_ID() {
        return 'default_camera_id';
    }

    constructor(canvas, width, height, targetWidth, targetHeight) {
        gameWidth = width;
        gameHeight = height;

        renderer = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            ? new Three.WebGLRenderer({ antialias: true })
            : new Three.CanvasRenderer();

        renderer.setClearColor(0x000000, 1);

        this.createScene(RenderService.DEFAULT_SCENE_ID);
        this.createCamera(RenderService.DEFAULT_CAMERA_ID);
        this.resize(targetWidth, targetHeight);
    }

    get renderer() {
        return renderer;
    }

    createScene(sceneId) {
        scenes.set(sceneId, new Three.Scene());
    }

    createCamera(cameraId, { width = gameWidth, height = gameHeight, sceneId = RenderService.DEFAULT_SCENE_ID } = {}) {
        if (scenes.has(sceneId)) {
            var camera = new Camera2D(cameraId, width / -2, width / 2, height / -2, height / 2, Math.max(width, height) / -2, Math.max(width, height) / 2);
            camera.sceneIds.add(sceneId);
            cameras.set(cameraId, camera);
        } else {
            throw Error("Invalid scene " + sceneId);
        }
    }

    resize(width, height) {
        var ratioWidth = width / gameWidth;
        var ratioHeight = height / gameHeight;
        var ratio = (ratioWidth > ratioHeight) ? ratioHeight : ratioWidth;
        renderer.setSize(gameWidth * ratio, gameHeight * ratio);
    }

    update(sprite, position, rotation, scale) {
        if (sprite.state === Sprite.STATE.REGISTERED) {
            sprite.mesh.position.set(position.x, position.y, position.z);
            sprite.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
            sprite.mesh.scale.set(-scale.x, scale.y, scale.z);

        } else if (sprite.state === Sprite.STATE.LOADED) {
            scenes.get(sprite.sceneId).add(sprite.mesh);
            sprite.state = Sprite.STATE.REGISTERED;

        } else if (sprite.state === Sprite.STATE.CREATED) {
            sprite.sceneId = sprite.sceneId ? sprite.sceneId : RenderService.DEFAULT_SCENE_ID;
            new Three.TextureLoader().load(
                sprite.source,
                function (texture) { // load callback
                    sprite.texture = texture;
                    sprite.texture.wrapS = sprite.texture.wrapT = Three.ClampToEdgeWrapping;
                    sprite.texture.flipY = true;
                    sprite.texture.minFilter = Three.NearestFilter;
                    sprite.texture.offset.x = sprite.row / sprite.cols;
                    sprite.texture.offset.y = sprite.col / sprite.rows;
                    sprite.texture.repeat.set(1 / sprite.cols, 1 / sprite.rows);
                    sprite.material = new Three.MeshBasicMaterial({ map: sprite.texture, side: Three.FrontSide });
                    sprite.material.transparent = true;
                    sprite.geometry = new Three.PlaneBufferGeometry(sprite.w, sprite.h, 1, 1);
                    sprite.mesh = new Three.Mesh(sprite.geometry, sprite.material);
                    sprite.state = Sprite.STATE.LOADED;
                },
                function (xhr) { // download callback
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    sprite.state = Sprite.STATE.BUFFERING;
                },
                function (xhr) { // error callback
                    console.log("An exception occurred:" + xhr);
                    sprite.state = Sprite.STATE.FAILED;
                }
            );

        } else if (sprite.state === Sprite.STATE.FAILED) {
            throw Error("Sprite failed to load with source " + sprite.source);
        }
    }

    render() {
        cameras.forEach(camera => {
            camera.sceneIds.forEach(sceneId => {
                renderer.render(scenes.get(sceneId), camera.cam);
            });
        });
    }
}

module.exports = RenderService;