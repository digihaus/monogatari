define(
  [ 'component/Base', 'component/BaseFont', 'lib/Three', 'render/Context2D' ], function( Base, BaseFont, _Three, Context2D ) {

    var Text = function( text, fontSize, fontFamily, width, height, color ) {
      BaseFont.call( this, fontSize, fontFamily, color );
      this.type = Base.TEXT;
      this.isRenderable = true;
      this.isLoaded = false;

      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;

      this.radius = -1;
      this.bubbleColor = '#FFF';
      this.bubbleStrokeColor = '#000';

      // Buffered canvas with the final text to render
      // It is expected to be converted into a Three.Texture
      this.buffer = document.createElement( 'canvas' );
      this.buffer.width = this.w;
      this.buffer.height = this.h;

      this.texture = null;
      this.load();
    };

    Text.prototype = Object.create( BaseFont.prototype );

    Text.prototype.reset = function( text, fontSize, fontFamily, width, height, color ) {
      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.fontSize = ( fontSize ) ? fontSize : 10;
      this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;
      this.load();
    };

    Text.prototype.setSize = function( size ) {
      this.isLoaded = false;
      this.fontSize = ( size ) ? size : 10;
      this.load();
    };

    Text.prototype.setFamily = function( family ) {
      this.isLoaded = false;
      this.fontFamily = ( family ) ? family : 'Verdana';
      this.load();
    };

    Text.prototype.setColor = function( color ) {
      this.isLoaded = false;
      this.color = ( color ) ? color : '#000';
      this.load();
    };

    Text.prototype.setText = function( text ) {
      this.isLoaded = false;
      this.text = ( text ) ? text : '';
      this.load();
    };

    Text.prototype.setWidth = function( width ) {
      this.isLoaded = false;
      this.w = ( width ) ? width : 256;
      this.buffer.width = this.w;
      this.load();
    };

    Text.prototype.setHeight = function( height ) {
      this.isLoaded = false;
      this.h = ( height ) ? height : 64;
      this.buffer.height = this.h;
      this.load();
    };

    Text.prototype.onLoad = function() {
      this.parse();
      this.clearBuffer();
      this.createTexture();
    };

    Text.prototype.createBubble = function( radius, bubbleColor, bubbleStrokeColor ) {
      this.radius = ( radius ) ? radius : -1;
      this.bubbleColor = ( bubbleColor ) ? bubbleColor : '#FFF';
      this.bubbleStrokeColor = ( bubbleStrokeColor ) ? bubbleStrokeColor : '#000';
    };

    Text.prototype.clearBuffer = function() {
      var context = this.buffer.getContext( '2d' );
      context.clearRect( 0, 0, this.w, this.h );
    };

    Text.prototype.createTexture = function() {
      this.texture = new THREE.Texture( this.renderIntoBuffer() );
      // This line makes the textures created during execution to work properly
      this.texture.needsUpdate = true;
      this.texture.flipY = true;
      this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
      this.texture.minFilter = THREE.NearestFilter;

      this.material = new THREE.MeshBasicMaterial(
        {
          map: this.texture,
          side: THREE.FrontSide
        }
      );
      this.material.transparent = true;
      this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.isLoaded = true;
    };

    Text.prototype.renderIntoBuffer = function() {
      var context = this.buffer.getContext( '2d' );

      context.imageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;

      context.clearRect( 0, 0, this.w, this.h );

      if( this.text.length > 0 ) {
        var c = this.fontMap.get( this.text[ 0 ] );
        var words = this.text.split( ' ' );

        // The position(x,y) and scale(width, height) of a single character
        var cX = this.radius, cY = this.radius, cW = 0, cH = 0;

        if( this.radius > 0 ) {
          context = Context2D.setContextColor( context, this.bubbleColor );
          context = Context2D.setContextStrokeColor( context, this.bubbleStrokeColor );

          Context2D.fillAndStrokeRoundedRect(
            context,
            2,
            2,
            this.w - (this.radius * 2) - 2,
            this.h - (this.radius * 2) - 2,
            this.radius
          );
        }

        for( var i = 0, len = words.length; i < len; i++ ) {

          if( cX + ( len * cW ) >= this.w ) {
            cX = this.radius;
            cY += cH;
          }

          for( var j = 0, wlen = words[ i ].length; j < wlen; j++ ) {
            c = this.fontMap.get( words[ i ][ j ] );
            cW = c.width;
            cH = c.height;

            context.drawImage( c, 0, 0, cW, cH, cX, cY, cW, cH );
            cX += cW;
          }

          c = this.fontMap.get( " " );

          cW = c.width;
          cH = c.height;

          context.drawImage( c, 0, 0, cW, cH, cX, cY, cW, cH );
          cX += cW;
        }

      }

      return this.buffer;
    };

    return Text;
  }
);