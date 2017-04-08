define(
  [ 'core/Common', 'component/Base', 'render/Context2D', 'manager/CancvasPool', 'lib/Three' ], function( Common, Base, Context2D, CanvasPool, _Three ) {

    /**
     * @param {Number} [width] - Width in pixels for one animation frame
     * @param {Number} [height] - Height in pixels for one animation frame
     * @extends {module:component/Base}
     * @exports component/Canvas
     */
    var Canvas = function( width, height, id, requiresUpdate ) {
      Base.call( this, Base.TYPE.CANVAS );

      this.id = (id) ? id : Common.createUniqueId();

      this.canvas = document.createElement( 'canvas' );

      this.w = ( width ) ? width : 128;
      this.h = ( height ) ? height : 128;

      this.context = this.canvas.getContext( "2d" );

      this.requiresUpdate = (requiresUpdate) ? requiresUpdate : false;

      /**
       * THREE.Texture of the component.
       * @type {THREE.Texture}
       */
      this.texture = null;

      /**
       * THREE.Material of the component.
       * @type {THREE.Material}
       */
      this.material = null;

      /**
       * THREE.Geometry of the component.
       * @type {THREE.Geometry}
       */
      this.geometry = null;

      /**
       * THREE.Mesh of the component.
       * @type {THREE.Mesh}
       */
      this.mesh = null;

      this.state = Base.STATE.INITIALIZING;
    };

    Canvas.prototype.init = function() {
      this.texture = new THREE.Texture( this.renderIntoBuffer() );
      // This line makes the textures created during execution to work properly
      this.texture.needsUpdate = this.requiresUpdate;
      this.texture.flipY = true;
      this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
      this.texture.minFilter = THREE.NearestFilter;

      this.material = new THREE.MeshBasicMaterial(
        {
          map: this.texture,
          side: THREE.FrontSide
        }
      );
      this.material.transparent = true;
      this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );
      this.mesh = new THREE.Mesh( this.geometry, this.material );

      CanvasPool.put( this.id, this.canvas );

      this.state = Base.STATE.READY;
    };

    Canvas.prototype.update = function() {
      if( Base.STATE.READY && this.requiresUpdate ) {
        this.texture.image = this.renderIntoBuffer();
      }
    };

    Canvas.prototype.renderIntoBuffer = function() {
      this.context.imageSmoothingEnabled = false;
      this.context.webkitImageSmoothingEnabled = false;
      this.context.mozImageSmoothingEnabled = false;

      this.context.clearRect( 0, 0, this.w, this.h );
      this.render();
    };

    Canvas.prototype.render = function() {
      this.context.strokeStyle = "rgba(1, 0, 0, 0.4)";
      this.context.rect( 0, 0, this.w, this.h );
      this.context.stroke();
    };

    return Canvas;
  }
);