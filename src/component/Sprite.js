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

      /**
       * Texture loader
       * @memberOf module:component/Sprite~Sprite
       * @instance
       * @type {Number}
       * @name loader
       */
      this.loader = null;

      this.init( source );
    };

    Sprite.prototype = Object.create( BaseThree.prototype );

    /**
     * Initialization method instantiates the texture loader and set the proper callbacks updating the state of the component accordingly
     * @method
     * @instance
     * @name init
     * @param {String} source
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.init = function( source ) {
      // instantiate a loader, it expects 3 callbacks
      this.loader = new THREE.TextureLoader();
      this.loader.load(
        ( source ) ? source : 'assets/bad-texture.png',
        this.loadCallBack.bind( this ),
        this.downloadCallBack.bind( this ),
        this.errorCallBack.bind( this )
      );

    };

    /**
     * Texture load callback
     * @method
     * @instance
     * @name loadCallBack
     * @param {THREE.Texture} texture
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.loadCallBack = function( texture ) {
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

      this.mesh = new THREE.Mesh( this.geometry, this.material );

      this.state = Base.STATE_READY;
    };

    /**
     * Texture downloading callback
     * @method
     * @instance
     * @name loadCallBack
     * @param {XMLHTTPResponse} xhr
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.downloadCallBack = function( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      this.state = Base.STATE_BUFFERING;
    };

    /**
     * Texture error callback
     * @method
     * @instance
     * @name errorCallBack
     * @param {XMLHTTPResponse} xhr
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.errorCallBack = function( xhr ) {
      console.log( "An exception occurred:" + xhr );
      this.state = Base.STATE_FAILED;
    };

    /**
     * Returns current animation frame on the sprite sheet
     *
     * @method
     * @instance
     * @name getFrame
     * @return {Number}
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.getFrame = function() {
      return this.frame;
    };

    /**
     * Set the animation frame to the given frame number. If a number greater than the number of frames in the sprite sheet is informed,
     * the algorithm cycles through the frames as many times as needed
     *
     * @method
     * @instance
     * @name setFrame
     * @param {Number} frame
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.setFrame = function( frame ) {
      this.frame = frame ? frame : 1;

      this.col = ( Math.ceil( this.frame / this.cols ) ) - 1;
      this.row = ( this.frame - 1 ) % this.cols;

      this.texture.offset.x = this.row / this.cols;
      this.texture.offset.y = this.col / this.rows;
    };

    /**
     * Moves to the next animation frame of the sprite sheet
     *
     * @method
     * @instance
     * @name nextFrame
     * @memberOf module:component/Sprite~Sprite
     */
    Sprite.prototype.nextFrame = function() {
      this.setFrame( ( this.frame % this.numberOfFrames ) + 1 );
    };

    return Sprite;
  }
);
