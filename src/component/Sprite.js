define( [ 'component/Base', 'component/BaseThree', 'lib/Three' ], function( _Base, _BaseThree, _Three ) {

  var Sprite = function( sceneId, source, width, height, rows, cols ) {
    _BaseThree.call( this, _Base.SPRITE );
    this.isRenderable = true;

    this.sceneId = sceneId ? sceneId : null;
    this.texture = THREE.ImageUtils.loadTexture( ( source ) ? source : 'assets/bad-texture.png' );
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.flipY = true;

    // row and col goes from 0 to N (like an array)
    this.row = 0;
    this.col = 0;

    // frame goes from 1 to N
    this.frame = 1;

    // rows and cols goes from 1 to N (like array.lenght)
    this.rows = ( rows ) ? rows : 1;
    this.cols = ( cols ) ? cols : 1;
    this.numberOfFrames = rows * cols;

    this.w = width;
    this.h = height;

    this.lastUpdate = 0;

    this.texture.offset.x = this.row / this.cols;
    this.texture.offset.y = this.col / this.rows;
    this.texture.repeat.set( 1 / this.cols, 1 / this.rows );

    this.material = new THREE.MeshBasicMaterial( {
      map : this.texture,
      side : THREE.DoubleSide
    } );
    this.material.transparent = true;

    this.geometry = new THREE.PlaneGeometry( this.w, this.h, 1, 1 );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
  }

  Sprite.prototype = Object.create( _BaseThree.prototype );

  Sprite.prototype.getFrame = function() {
    return this.frame;
  };

  Sprite.prototype.setFrame = function( frame ) {
    this.frame = frame ? frame : 1;

    this.col = ( Math.ceil( this.frame / this.cols ) ) - 1;
    this.row = ( this.frame - 1 ) % this.cols;

    // console.log("Frame:"+ this._frame + " Col:" + this.col +" Row:" + this.row + " OffsetX:" + this.row / this.cols
    // +" OffsetY:" + this.col / this.rows);

    this.texture.offset.x = this.row / this.cols;
    this.texture.offset.y = this.col / this.rows;
  };

  Sprite.prototype.nextFrame = function() {
    this.setFrame( ( this.frame % this.numberOfFrames ) + 1 );
  };

  return Sprite;

} );
