define(
  [ 'component/Base', 'component/BaseThree', 'lib/Three' ], function( Base, BaseThree, _Three ) {

    var Sprite = function( source, width, height, rows, cols ) {
      BaseThree.call( this, null, null, Base.SPRITE );
      this.isRenderable = true;

      this.texture = THREE.ImageUtils.loadTexture( ( source ) ? source : 'assets/bad-texture.png' );
      this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
      this.texture.flipY = true;
      this.texture.minFilter = THREE.NearestFilter;

      // Row and col goes from 0 to N (like an array)
      this.row = 0;
      this.col = 0;

      // Frame goes from 1 to N
      this.frame = 1;

      // Rows and cols goes from 1 to N (like array.length)
      this.rows = ( rows ) ? rows : 1;
      this.cols = ( cols ) ? cols : 1;
      this.numberOfFrames = rows * cols;

      this.w = width;
      this.h = height;

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
