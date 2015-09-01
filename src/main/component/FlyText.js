define(
  [ 'core/Timer', 'component/Base', 'component/Text', 'lib/Three' ], function( Timer, Base, Text, _Three ) {

    var FlyText = function( text, fontSize, fontFamily, width, height, color, speed ) {
      Text.call( this, text, fontSize, fontFamily, width, height, color );
      this.type = Base.FLY_TEXT;

      this.speed = ( speed ) ? speed : 50;
      this.textBuffer = '';
      this.startTime = 0;

      this.load();
      this.finished = false;
    };

    FlyText.prototype = Object.create( Text.prototype );

    FlyText.prototype.reset = function( text, fontSize, fontFamily, width, height, speed ) {
      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.fontSize = ( fontSize ) ? fontSize : 10;
      this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;
      this.speed = ( speed ) ? speed : 50;
      this.textBuffer = '';
      this.startTime = 0;
    };

    FlyText.prototype.clearBuffer = function() {
      var context = this.buffer.getContext( '2d' );
      context.clearRect( 0, 0, this.w, this.h );
      this.finished = false;
      this.textBuffer = '';
      this.startTime = 0;
    };

    FlyText.prototype.setText = function( text ) {
      this.text = ( text ) ? text : '';
      this.clearBuffer();
      this.createTexture();
    };

    FlyText.prototype.setSpeed = function( speed ) {
      this.speed = ( speed ) ? speed : 30;
      this.clearBuffer();
      this.createTexture();
    };

    FlyText.prototype.onLoad = function() {
      this.parse();
      this.createTexture();
    };

    FlyText.prototype.createTexture = function() {
      this.texture = ( this.texture ) ? this.texture : new THREE.Texture();
      this.texture.needsUpdate = true;

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

    FlyText.prototype.update = function() {

      if( this.startTime === 0 ) {
        this.startTime = Timer.time;
      }

      if( !this.finished ) {
        var len = Math.round( ( Timer.time - this.startTime ) / this.speed );

        if( this.speed >= 1 || len >= this.text.length ) {
          this.textBuffer = this.text.substring( 0, len );
        } else {
          this.textBuffer = this.text;
        }

        if( this.isLoaded ) {
          // This line makes the textures created during execution to work properly
          this.texture.needsUpdate = true;
          this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
          this.texture.minFilter = THREE.NearestFilter;
          this.texture.magFilter = THREE.NearestFilter;
          this.texture.image = this.renderIntoBuffer();
        }

        if( this.textBuffer.length === this.text.length ) {
          this.finished = true;
        }
      }
    };

    FlyText.prototype.renderIntoBuffer = function() {
      var context = this.buffer.getContext( '2d' );
      context.imageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;

      context.clearRect( 0, 0, this.w, this.h );

      if( this.textBuffer.length > 0 ) {
        var c = this.fontMap.get( this.textBuffer[ 0 ] );
        var words = this.textBuffer.split( ' ' );
        var all = this.text.split( ' ' );

        // The position(x,y) and scale(width, height) of a single character
        var cX = 0, cY = 0, cW = 0, cH = 0;

        for( var i = 0, len = words.length; i < len; i++ ) {

          if( cX + ( all.length * cW ) >= this.w ) {
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

    return FlyText;
  }
);