define(
  [ 'component/Base', 'lib/Three' ], function( Base, _Three ) {

    /**
     * Sprite and sprite sheet component, rendered by {@link http://threejs.org|three.js}.
     * @param {String} [source] - Sprite sheet URI
     * @param {Number} [width] - Width in pixels for one animation frame
     * @param {Number} [height] - Height in pixels for one animation frame
     * @param {String} [rows] - Number of rows on the sprite sheet
     * @param {String} [cols] - Number of cols of the sprite sheet
     * @extends {module:component/Base}
     * @exports component/Sprite
     */
    var Sprite = function( source, width, height, rows, cols ) {
      Base.call( this, Base.TYPE.SPRITE );

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

      /**
       * Current row of the sprite sheet, ranges from 0 to N (like an array).
       * @type {Number}
       * @default 0
       */
      this.row = 0;

      /**
       * Current column of the sprite sheet, ranges from 0 to N (like an array).
       * @type {Number}
       * @default 0
       */
      this.col = 0;

      /**
       * Current animation frame of the sprite sheet, ranges from 1 to N  (like array.length).
       * @type {Number}
       * @default 1
       */
      this.frame = 1;

      /**
       * Number of rows on the sprite sheet, ranges from 1 to N (like array.length).
       * @type {Number}
       * @default 1
       */
      this.rows = ( rows ) ? rows : 1;

      /**
       * Number of columns on the sprite sheet, ranges from 1 to N (like array.length).
       * @type {Number}
       * @default 1
       */
      this.cols = ( cols ) ? cols : 1;

      /**
       * Number of animation frames on the sprite sheet, ranges from 1 to N (like array.length).
       * @type {Number}
       * @default 1
       */
      this.numberOfFrames = rows * cols;

      /**
       * Width in pixels for one animation frame.
       * @type {Number}
       */
      this.w = width;

      /**
       * Height in pixels for one animation frame.
       * @type {Number}
       */
      this.h = height;

      /**
       * Internal time of the last update.
       * @type {Number}
       * @default 0
       */
      this.lastUpdate = 0;

      // initializes the component
      new THREE.TextureLoader().load(
        ( source ) ? source : 'assets/bad-texture.png',

        // load callback
        function( texture ) {
          this.texture = texture;
          this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
          this.texture.flipY = true;
          this.texture.minFilter = THREE.NearestFilter;
          this.texture.offset.x = this.row / this.cols;
          this.texture.offset.y = this.col / this.rows;
          this.texture.repeat.set( 1 / this.cols, 1 / this.rows );
          this.material = new THREE.MeshBasicMaterial(
            {
              map: this.texture,
              side: THREE.FrontSide
            }
          );
          this.material.transparent = true;
          this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );
          this.state = Base.STATE.LOADED;
        }.bind( this ),

        // download callback
        function( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          this.state = Base.STATE.BUFFERING;
        }.bind( this ),

        // error callback
        function( xhr ) {
          console.log( "An exception occurred:" + xhr );
          this.state = Base.STATE.FAILED;
        }.bind( this )
      );
    };

    Sprite.prototype = Object.create( Base.prototype );

    /**
     * Set the animation frame to the given frame number. If a number greater than the number of frames in the sprite sheet is informed,
     * the algorithm cycles through the frames as many times as needed
     * @param {Number} frame - Frame number
     */
    Sprite.prototype.setFrame = function( frame ) {
      this.frame = frame ? frame : 1;

      this.col = ( Math.ceil( this.frame / this.cols ) ) - 1;
      this.row = ( this.frame - 1 ) % this.cols;

      this.texture.offset.x = this.row / this.cols;
      this.texture.offset.y = this.col / this.rows;
    };

    /**
     * Moves to the next animation frame of the sprite sheet.
     */
    Sprite.prototype.nextFrame = function() {
      this.setFrame( ( this.frame % this.numberOfFrames ) + 1 );
    };

    /**
     * Builds the THREE.Mesh with current geometry and material.
     */
    Sprite.prototype.buildMesh = function() {
      this.mesh = ( this.material && this.geometry ) ? new THREE.Mesh( this.geometry, this.material ) : null;
      this.state = Base.STATE.READY;
    };

    /**
     * Update the internal THREE.Mesh with the THREE.Material and THREE.Geometry.
     */
    Sprite.prototype.updateMesh = function() {
      if( this.material && this.geometry ) {
        this.mesh.geometry = this.geometry;
        this.mesh.material = this.material;
      }
    };

    /**
     * Flag the THREE.Material to be rendered.
     */
    Sprite.prototype.show = function() {
      if( this.mesh ) {
        this.mesh.material.visible = true;
      }
    };

    /**
     * Flag the THREE.Material to NOT be rendered.
     */
    Sprite.prototype.hide = function() {
      if( this.mesh ) {
        this.mesh.material.visible = false;
      }
    };

    return Sprite;
  }
);
