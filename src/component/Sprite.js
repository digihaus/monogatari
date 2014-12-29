define( [ 'core/Monogatari', 'core/Constants', 'entity/component/ThreeObject' ], function() {

  Monogatari.Sprite = Monogatari.ThreeObject.extend( {
    init : function( sceneId, source, width, height, rows, cols ) {

      this._sceneId = sceneId ? sceneId : null;
      this._texture = THREE.ImageUtils.loadTexture( ( source ) ? source : 'assets/bad-texture.png' );
      this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
      this._texture.flipY = true;

      // row and col goes from 0 to N (like an array)
      this.row = 0;
      this.col = 0;

      // frame goes from 1 to N
      this._frame = 1;

      // rows and cols goes from 1 to N (like array.lenght)
      this.rows = ( rows ) ? rows : 1;
      this.cols = ( cols ) ? cols : 1;
      this.numberOfFrames = rows * cols;

      this.w = width;
      this.h = height;

      this.lastUpdate = 0;

      this._texture.offset.x = this.row / this.cols;
      this._texture.offset.y = this.col / this.rows;

      this._texture.repeat.set( 1 / this.cols, 1 / this.rows );

      this._material = new THREE.MeshBasicMaterial( {
        map : this._texture,
        side : THREE.DoubleSide
      } );
      this._material.transparent = true;

      this._geometry = new THREE.PlaneGeometry( this.w, this.h, 1, 1 );

      this._mesh = new THREE.Mesh( this._geometry, this._material );

      this.attachToScene();

      this.componentType = Monogatari.Constants.COMPONENT_SPRITE;
    },

    getFrame : function() {
      return this._frame;
    },

    setFrame : function( frame ) {
      this._frame = frame ? frame : 1;

      this.col = ( Math.ceil( this._frame / this.cols ) ) - 1;
      this.row = ( this._frame - 1 ) % this.cols;

      // console.log("Frame:"+ this._frame + " Col:" + this.col +" Row:" + this.row + " OffsetX:" + this.row / this.cols
      // +" OffsetY:" + this.col / this.rows);

      this._texture.offset.x = this.row / this.cols;
      this._texture.offset.y = this.col / this.rows;
    },

    nextFrame : function() {
      this.setFrame( ( this._frame % this.numberOfFrames ) + 1 );
    }

  } );
} );
