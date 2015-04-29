
define( [ 'component/BaseThree', 'collection/Map' ], function( _BaseThree, _Map ) {
  
  var Tilemap = function( map, mapWidth, mapHeight, spritesheet, spritesheetRows, spritesheetCols, json ){
    _BaseThree.call( this, null, null, 4 /*_Base.SPRITE*/ );
    this.isRenderable = true;

    this.w = mapWidth;
    this.h = mapHeight;

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
    this.texture = new THREE.Texture();
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.needsUpdate = true;
    this.texture.flipY = true;

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

        context.drawImage( this.spritesheet.image, i * tileH , j * tileW, tileW, tileH );

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
    buffer.width = this.w;
    buffer.height = this.h;

    var context = buffer.getContext( '2d' );
    context.clearRect ( 0 , 0 , this.w, this.h );

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

    this.texture.image = buffer;

    this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );

    this.material = new THREE.MeshBasicMaterial( {
      map : this.texture,
      side : THREE.BackSide
    } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );

  }

  return Tilemap;
} );