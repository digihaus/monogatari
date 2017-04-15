define(
  [ 'core/Common', 'core/Math', 'component/Base', 'lib/Three' ], function( Common, Math, Base, _Three ) {

    /**
     * @param {Number} [width] - Width in pixels for one animation frame
     * @param {Number} [height] - Height in pixels for one animation frame
     * @extends {module:component/Base}
     * @exports component/Canvas
     */
    var Canvas = function( width, height, draw, id ) {
      Base.call( this, Base.TYPE.CANVAS );

      this.id = (id) ? id : Common.createUniqueId();

      this.canvas = document.createElement( 'canvas' );

      this.w = ( width ) ? width : 128;
      this.h = ( height ) ? height : 128;

      this.canvas.width = this.w;
      this.canvas.height = this.h;

      this.context = this.canvas.getContext( "2d" );

      this.draw = (draw) ? draw : function() {
        var hw = this.w / 2;
        var hh = this.h / 2;
        var radius = Math.min( hw, hh );

        this.context.beginPath();

        this.context.arc( hw, hh, radius, 0, 2 * Math.PI, false );
        this.context.lineWidth = 1;
        this.context.fillStyle = "rgba(255, 45, 21, 0.4)";
        this.context.strokeStyle = "rgba(255, 45, 21, 0.9)";

        this.context.fill();

        this.context.moveTo( hw, hh );
        this.context.lineTo( 0, 0 );
        this.context.stroke();

        this.context.closePath();
      };

      /**
       * THREE.Texture of the component.
       * @type {THREE.Texture}
       */
      this.draw();

      this.texture = new THREE.Texture( this.canvas );
      // This makes the textures created during execution to work properly
      this.texture.needsUpdate = true;
      this.texture.flipY = true;
      this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
      this.texture.minFilter = THREE.NearestFilter;

      /**
       * THREE.Material of the component.
       * @type {THREE.Material}
       */
      this.material = new THREE.MeshBasicMaterial(
        {
          map: this.texture,
          side: THREE.FrontSide
        }
      );
      this.material.transparent = true;
      /**
       * THREE.Geometry of the component.
       * @type {THREE.Geometry}
       */
      this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );

      /**
       * THREE.Mesh of the component.
       * @type {THREE.Mesh}
       */
      this.mesh = new THREE.Mesh( this.geometry, this.material );

      this.state = Base.STATE.READY;
    };

    Canvas.prototype = Object.create( Base.prototype );

    Canvas.prototype.update = function() {
      this.context.imageSmoothingEnabled = false;
      this.context.webkitImageSmoothingEnabled = false;
      this.context.mozImageSmoothingEnabled = false;

      this.context.clearRect( 0, 0, this.w, this.h );

      this.draw();

      this.texture.image = this.canvas;
    };
    return Canvas;
  }
);