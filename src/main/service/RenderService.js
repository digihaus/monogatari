import { Graphic } from 'model/component/Graphic';
import { Sprite } from 'model/component/Sprite';
import { Canvas } from 'model/component/Canvas';
import { Camera2D } from 'model/core/Camera2D';
import { Three } from 'link/Three';
import { Logger } from 'commons/Logger';
import { GameState } from 'GameState';

const cameras = new Map();
const scenes = new Map();

export class RenderService {

    static get DEFAULT_SCENE_ID() {
        return 'default_scene_id';
    }

    static get DEFAULT_CAMERA_ID() {
        return 'default_camera_id';
    }

    constructor(width, height, targetWidth, targetHeight) {
        this._logger = new Logger(RenderService.name);

        GameState.width = width;
        GameState.height = height;

        var canvas = document.createElement("canvas");

        this._renderer = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            ? new Three.WebGLRenderer({ antialias: true })
            : new Three.CanvasRenderer();
        this._renderer.setClearColor(0x000000, 1);

        this.createScene(RenderService.DEFAULT_SCENE_ID);
        this.createCamera(RenderService.DEFAULT_CAMERA_ID);
    }

    get domElement() {
        return this._renderer.domElement;
    }

    createScene(sceneId) {
        scenes.set(sceneId, new Three.Scene());
    }

    createCamera(cameraId, { width = GameState.width, height = GameState.height, sceneId = RenderService.DEFAULT_SCENE_ID } = {}) {
        if (scenes.has(sceneId)) {
            var camera = new Camera2D(cameraId, width / -2, width / 2, height / -2, height / 2, Math.max(width, height) / -2, Math.max(width, height) / 2);
            camera.sceneIds.add(sceneId);
            cameras.set(cameraId, camera);
        } else {
            throw Error("Invalid scene " + sceneId);
        }
    }

    update(component, position, rotation, scale) {
        if (component instanceof Sprite) {
            if (component.state === Graphic.STATE.REGISTERED) {
                component.mesh.position.set(position.x, position.y, position.z);
                component.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
                component.mesh.scale.set(-scale.x, scale.y, scale.z);

            } else if (component.state === Graphic.STATE.LOADED) {
                scenes.get(component.sceneId).add(component.mesh);
                component.state = Graphic.STATE.REGISTERED;

            } else if (component.state === Graphic.STATE.CREATED) {
                component.sceneId = component.sceneId ? component.sceneId : RenderService.DEFAULT_SCENE_ID;
                component.state = Graphic.STATE.BUFFERING;
                new Three.TextureLoader().load(
                    component.source,
                    function (texture) { // load callback
                        component.texture = texture;
                        component.texture.wrapS = component.texture.wrapT = Three.ClampToEdgeWrapping;
                        component.texture.flipY = true;
                        component.texture.minFilter = Three.NearestFilter;
                        component.texture.offset.x = component.row / component.cols;
                        component.texture.offset.y = component.col / component.rows;
                        component.texture.repeat.set(1 / component.cols, 1 / component.rows);
                        component.material = new Three.MeshBasicMaterial({ map: component.texture, side: Three.FrontSide });
                        component.material.transparent = true;
                        component.geometry = new Three.PlaneBufferGeometry(component.w, component.h, 1, 1);
                        component.mesh = new Three.Mesh(component.geometry, component.material);
                        component.state = Graphic.STATE.LOADED;
                        this._logger.debug("texture loaded", component.source);
                    }.bind(this),
                    function (xhr) { // download callback
                        this._logger.debug("texture " + (xhr.loaded / xhr.total * 100) + "% loaded", component);
                    }.bind(this),
                    function (xhr) { // error callback
                        component.state = Graphic.STATE.FAILED;
                        this._logger.error("error while loading texture", component.source, xhr);
                    }.bind(this)
                );

            } else if (component.state === Graphic.STATE.FAILED) {
                throw Error("Sprite failed to load with source " + component.source);
            }

        } else if (component instanceof Canvas) {
            if (component.state === Canvas.STATE.CREATED) {
                scenes.get(RenderService.DEFAULT_SCENE_ID).add(component.mesh);
                component.state = Canvas.STATE.REGISTERED;
            } else {
                component.context.imageSmoothingEnabled = false;
                component.context.webkitImageSmoothingEnabled = false;
                component.context.mozImageSmoothingEnabled = false;
                component.clear();
                component.draw();
                // This makes the textures created during execution to work properly
                //component.texture.needsUpdate = true;
                component.texture.image = this.canvas;
            }
        }
    }

    render() {
        this._renderer.setSize(GameState.width * GameState.ratio, GameState.height * GameState.ratio);
        cameras.forEach(camera => {
            camera.sceneIds.forEach(sceneId => {
                this._renderer.render(scenes.get(sceneId), camera.cam);
            });
        });
    }

}