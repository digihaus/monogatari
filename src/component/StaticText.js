define(
  [ 'component/Base', 'component/BaseFont', 'lib/Three' ], function( Base, BaseFont, _Three ) {

    var StaticText = function( text, fontSize, fontFamily, width, height ) {
      BaseFont.call( this, fontSize, fontFamily );
      this.type = Base.STATIC_TEXT;
      this.isRenderable = true;
      this.isLoaded = false;

      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;

      // Buffered canvas with the final text to render
      // It is expected to be converted into a Three.Texture
      this.buffer = document.createElement( 'canvas' );
      this.buffer.width = this.w;
      this.buffer.height = this.h;

      this.texture = null;
      this.load();
    };

    StaticText.prototype = Object.create( BaseFont.prototype );

    StaticText.prototype.reset = function( text, fontSize, fontFamily, width, height ) {
      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.fontSize = ( fontSize ) ? fontSize : 10;
      this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;
    };

    StaticText.prototype.onLoad = function() {
      this.parse();

      this.texture = new THREE.Texture( this.renderIntoBuffer() );
      // This line makes the textures created during execution to work properly
      this.texture.needsUpdate = true;
      this.texture.flipY = true;
      this.material = new THREE.MeshBasicMaterial(
        {
          map: this.texture,
          side: THREE.DoubleSide
        }
      );
      this.material.transparent = true;
      this.geometry = new THREE.PlaneBufferGeometry( this.w, this.h, 1, 1 );
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.isLoaded = true;
    };

    StaticText.prototype.renderIntoBuffer = function() {
      var context = this.buffer.getContext( '2d' );

      // Horizontal flip for proper rendering on the engine camera
      context.translate( this.w, 0 );
      context.scale( -1, 1 );

      if( this.text.length > 0 ) {
        var c = this.fontMap.get( this.text[ 0 ] );
        var words = this.text.split( ' ' );

        // The position(x,y) and scale(width, height) of a single character
        var cX = 0, cY = 0, cW = 0, cH = 0;

        for( var i = 0, len = words.length; i < len; i++ ) {

          if( cX + ( len * cW ) >= this.w ) {
            cX = 0;
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

    return StaticText;
  }
);
