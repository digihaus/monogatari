
define( [ 'component/BaseThree', 'collection/Map' ], function( _BaseThree, _Map ) {
  
  var Tilemap = function( map, spritesheet, spritesheetRows, spritesheetCols, json ){
    _BaseThree.call( this, null, null, 4 /*_Base.SPRITE*/ );
    this.isRenderable = true;

    this.w = map.length;
    this.h = map[0].length;

    this.rows = ( spritesheetRows ) ? spritesheetRows : 1;
    this.cols = ( spritesheetCols ) ? spritesheetCols : 1;
    this.numberOfFrames = this.rows * this.cols;

    this.json = json;

    // buffered tiles
    this.tiles = new _Map();
    this.map = map;

    // image object
    this.spritesheet = THREE.ImageUtils.loadTexture( ( spritesheet ) ? spritesheet : 'assets/bad-texture.png' );

    // final texture to be rendered
    this.texture; //new THREE.Texture();
  };

  Tilemap.prototype = Object.create( _BaseThree.prototype );

  Tilemap.prototype.parse = function(){
    var canvas, context;
    var tileW = this.spritesheet.image.width / this.cols;
    var tileH = this.spritesheet.image.height / this.rows;

    // iterate the spritesheet creating a canvas buffer for each tile
    for( var i = 0; i < this.rows; i++ ){
      for( var j = 0; j < this.cols; j++ ){
        canvas = document.createElement( 'canvas' );
        canvas.width = tileW;
        canvas.height = tileH;

        context = canvas.getContext( '2d' );

        context.drawImage( this.spritesheet.image, 
                           j * tileH , i * tileW, tileW, tileH, 
                           0, 0, tileW, tileH );

        this.tiles.put( this.tiles.size() + 1, canvas );
      }
    }
  };

  // TODO optimize, render for tile and not for map coordinate
  Tilemap.prototype.renderIntoTexture = function(){
    var tile;
    var tileW = this.spritesheet.image.width / this.cols;
    var tileH = this.spritesheet.image.height / this.rows;

    var destinationX = 0;
    var destinationY = 0;

    var buffer = document.createElement( 'canvas' );
    buffer.width = this.w * tileW;
    buffer.height = this.h * tileH;

    var context = buffer.getContext( '2d' );
    context.clearRect ( 0 , 0 , this.w, this.h );
    // horizontal flip for proper rendering on the engine camera
    context.translate(this.w * tileW, 0);
    context.scale(-1, 1);

    for( var i = 0; i < this.map.length; i++ ){
      for( var j = 0; j < this.map[i].length; j++ ){

        tile = this.tiles.get( this.map[i][j] +1 );

        destinationX = ( tileW * j );
        destinationY = ( tileH * i );
        // drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY,
        // destinationWidth, destinationHeight)

        if(tile)
          context.drawImage( tile, 
                             0, 0, tileW, tileH,
                             destinationX, destinationY, tileW, tileH );

      }
    }

    this.texture = new THREE.Texture( buffer );
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.needsUpdate = true;
    this.texture.flipY = true;


    this.geometry = new THREE.PlaneBufferGeometry( this.w * tileW, this.h * tileH, 1, 1 );

    this.material = new THREE.MeshBasicMaterial( {
      map : this.texture,
      side : THREE.BackSide
    } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );

  }

  return Tilemap;
} );