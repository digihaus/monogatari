define( [ 'component/BaseThree', 'collection/Map' ], function( _BaseThree, _Map ) {

  var Tilemap = function( map, spritesheet, spritesheetRows, spritesheetCols, json ) {
    _BaseThree.call( this, null, null, 4 /* _Base.TILEMAP */);
    this.isRenderable = true;

    this.map = map;
    this.mapRows = map.length;
    this.mapCols = map[ 0 ].length;

    this.w = 0;
    this.h = 0;

    this.tileW = 0;
    this.tileH = 0;

    this.rows = ( spritesheetRows ) ? spritesheetRows : 1;
    this.cols = ( spritesheetCols ) ? spritesheetCols : 1;
    this.numberOfFrames = this.rows * this.cols;

    this.json = json;

    // buffered tiles
    this.tiles = new _Map();

    // image object
    this.spritesheet = THREE.ImageUtils.loadTexture( ( spritesheet ) ? spritesheet : 'assets/bad-texture.png' );

    // final texture to be rendered
    this.texture;
  };

  Tilemap.prototype = Object.create( _BaseThree.prototype );

  Tilemap.prototype.parse = function() {
    var canvas, context;

    this.tileW = this.spritesheet.image.width / this.cols;
    this.tileH = this.spritesheet.image.height / this.rows;

    this.w = this.mapCols * this.tileW;
    this.h = this.mapRows * this.tileH;

    // iterate the spritesheet creating a canvas buffer for each tile
    for ( var i = 0; i < this.rows; i++ ) {
      for ( var j = 0; j < this.cols; j++ ) {
        canvas = document.createElement( 'canvas' );
        canvas.width = this.tileW;
        canvas.height = this.tileH;

        context = canvas.getContext( '2d' );
        // drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)
        context.drawImage( this.spritesheet.image, j * this.tileH, i * this.tileW, this.tileW, this.tileH, 0, 0, this.tileW, this.tileH );

        this.tiles.put( this.tiles.size() + 1, canvas );
      }
    }
  };

  // TODO optimize, render for tile and not for map coordinate
  Tilemap.prototype.renderIntoBuffer = function() {
    var tile;

    var destinationX = 0;
    var destinationY = 0;

    var buffer = document.createElement( 'canvas' );
    buffer.width = this.w;
    buffer.height = this.h;

    var context = buffer.getContext( '2d' );
    context.clearRect( 0, 0, this.w, this.h );
    // horizontal flip for proper rendering on the engine camera
    context.translate( this.w, 0 );
    context.scale( -1, 1 );

    for ( var i = 0; i < this.map.length; i++ ) {
      for ( var j = 0; j < this.map[ i ].length; j++ ) {

        tile = this.tiles.get( this.map[ i ][ j ] + 1 );

        destinationX = ( this.tileW * j );
        destinationY = ( this.tileH * i );
        // drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)

        if ( tile )
          context.drawImage( tile, 0, 0, this.tileW, this.tileH, destinationX, destinationY, this.tileW, this.tileH );

      }
    }

    this.texture = new THREE.Texture( buffer );
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.needsUpdate = true;
    this.texture.flipY = true;

    this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, this.mapCols, this.mapRows );

    this.material = new THREE.MeshBasicMaterial( {
      map : this.texture,
      side : THREE.BackSide
      // ,wireframe: true, color : 0xFF0000
    } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
  };

  Tilemap.prototype.getTileXFromPosition = function( x ) {
    var tileX = Math.floor( x / this.tileW );
    console.log("X:" + tileX);
    return ( tileX <= this.mapCols && x > 0 ) ? tileX : -1;
  };

  Tilemap.prototype.getTileYFromPosition = function( y ) {
    var tileY = Math.floor( y / this.tileH );
    console.log("Y:" + tileY);
    return ( tileY <= this.mapRows && y > 0 ) ? tileY : -1;
  };

  return Tilemap;
} );