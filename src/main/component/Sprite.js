/**
 * Exports the {@link module:component/Sprite~Sprite|Sprite} class.
 * @module component/Sprite
 */
define(
  [ 'component/Base', 'component/BaseThree', 'lib/Three' ], function( Base, BaseThree, _Three ) {

    /**
     * Sprite and sprite sheet component.
     *
     * @param {String} [source] Path to the sprite sheet
     * @param {Number} [width] Width in pixels for one animation frame
     * @param {Number} [height] Height in pixels for one animation frame
     * @param {String} [rows] Number of rows on the sprite sheet
     * @param {String} [cols]  Font family name
     * @class Sprite
     */
    var Sprite = function( source, width, height, rows, cols ) {
      BaseThree.call( this, null, null, Base.SPRITE );

      /**
       * Flag to indicate if this component should be rendered on screen
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Boolean}
       * @name isRenderable
       * @default true
       */
      this.isRenderable = true;

      /**
       * Buffered THREE.Texture with the sprite sheet
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {THREE.Texture}
       * @name texture
       */
      this.texture = THREE.ImageUtils.loadTexture( ( source ) ? source : 'assets/bad-texture.png' );
      this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
      this.texture.flipY = true;
      this.texture.minFilter = THREE.NearestFilter;

      /**
       * Current row of the sprite sheet, ranges from 0 to N (like an array)
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name row
       * @default 0
       */
      this.row = 0;

      /**
       * Current column of the sprite sheet, ranges from 0 to N (like an array)
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name col
       * @default 0
       */
      this.col = 0;

      /**
       * Current animation frame of the sprite sheet, ranges from 1 to N  (like array.length)
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name frame
       * @default 1
       */
      this.frame = 1;

      /**
       * Number of rows on the sprite sheet, ranges from 1 to N (like array.length)
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name rows
       * @default 1
       */
      this.rows = ( rows ) ? rows : 1;

      /**
       * Number of columns on the sprite sheet, ranges from 1 to N (like array.length)
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name cols
       * @default 1
       */
      this.cols = ( cols ) ? cols : 1;

      /**
       * Number of animation frames on the sprite sheet, ranges from 1 to N (like array.length)
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name numberOfFrames
       * @default 1
       */
      this.numberOfFrames = rows * cols;

      /**
       * Width in pixels for one animation frame
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name w
       */
      this.w = width;

      /**
       * Height in pixels for one animation frame
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name h
       */
      this.h = height;

      /**
       * Internal time of the last update
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name lastUpdate
       * @default 0
       */
      this.lastUpdate = 0;

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

      this.mesh = new THREE.Mesh( this.geometry, this.material );
    };

    Sprite.prototype = Object.create( BaseThree.prototype );

    Sprite.prototype.getFrame = function() {
      return this.frame;
    };

    Sprite.prototype.setFrame = function( frame ) {
      this.frame = frame ? frame : 1;

      this.col = ( Math.ceil( this.frame / this.cols ) ) - 1;
      this.row = ( this.frame - 1 ) % this.cols;

      this.texture.offset.x = this.row / this.cols;
      this.texture.offset.y = this.col / this.rows;
    };

    Sprite.prototype.nextFrame = function() {
      this.setFrame( ( this.frame % this.numberOfFrames ) + 1 );
    };

    return Sprite;
  }
);
