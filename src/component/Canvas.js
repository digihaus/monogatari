define(
  [ 'component/Base', 'render/Context2D', 'lib/Three' ], function( Base, Context2D, _Three ) {

    /**
     * @param {Number} [width] - Width in pixels for one animation frame
     * @param {Number} [height] - Height in pixels for one animation frame
     * @extends {module:component/Base}
     * @exports component/Canvas
     */
    var Canvas = function( width, height ) {
      Base.call( this, Base.TYPE.CANVAS );

      this.canvas = document.createElement( 'canvas' );

      this.canvasWidth = ( width ) ? width : 200;
      this.canvasHeight = ( height ) ? height : 200;

      this.context = canvas.getContext( "2d" );

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

    };

    Canvas.prototype.update = function() {

    };

    Canvas.prototype.renderIntoBuffer = function() {

    };

    Canvas.prototype.render = function() {

    };

    return Canvas;
  }
);