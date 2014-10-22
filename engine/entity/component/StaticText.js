define(['core/Monogatari', 'core/String', 'engine/entity/component/Font2D', 'engine/FontManager'], function() {

	Monogatari.StaticText = Monogatari.Font2D.extend( {
	  init : function( sceneId, text, fontSize, fontFamily, width, height ) {
		this._super( fontSize, fontFamily );

		this._sceneId = sceneId ? sceneId : null;

		this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';

		this.w = ( width ) ? width : 256;
		this.h = ( height ) ? height : 64;

		// buffered canvas with the final text to render
		// this is expected to be converted into a Three.Texture
		this._buffer = document.createElement( 'canvas' );
		this._buffer.width = this.w;
		this._buffer.height = this.h;

		this._texture = new THREE.Texture();

		this.componentType = Monogatari.Constants.COMPONENT_STATIC_TEXT;
		this.componentState = Monogatari.Constants.COMPONENT_STATE_INITIALIZING;
	  },

	  reset : function( text, fontSize, fontFamily, width, height ) {
		this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
		this.fontSize = ( fontSize ) ? fontSize : 10;
		this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';

		this.w = ( width ) ? width : 256;
		this.h = ( height ) ? height : 64;

		this.componentState = Monogatari.Constants.COMPONENT_STATE_INITIALIZING;
	  },

	  update : function() {
		if ( Monogatari.FontManager.isLoaded( this.fontFamily ) ) {
		  if ( this.componentState === Monogatari.Constants.COMPONENT_STATE_INITIALIZING ) {
			this.parse();
			this.componentState = Monogatari.Constants.COMPONENT_STATE_BUFFERING;
		  }

		  if ( this.componentState === Monogatari.Constants.COMPONENT_STATE_BUFFERING ) {
			this._texture.image = this.renderIntoBuffer();
			// this line makes the textures created during execution to work properly
			this._texture.needsUpdate = true;
			this._texture.flipY = true;

			this._material = new THREE.MeshBasicMaterial( {
			  map : this._texture,
			  side : THREE.DoubleSide
			} );
			this._material.transparent = true;

			this._geometry = new THREE.PlaneGeometry( this.w, this.h, 1, 1 );

			this._mesh = new THREE.Mesh( this._geometry, this._material );

			this.attachToScene();

			this.componentState = Monogatari.Constants.COMPONENT_STATE_READY;
		  }
		} else {
		  Monogatari.FontManager.load( this.fontFamily );
		}
	  },

	  renderIntoBuffer : function() {
		if ( this.componentState > Monogatari.Constants.COMPONENT_STATE_BUFFERING )
		  return;

		var context = this._buffer.getContext( "2d" );
		if ( this.text.length > 0 ) {
		  var c = this.fontMap.get( this.text[ 0 ] ),
			  words = this.text.split( " " );

		  // the position(x,y) and scale(width, height) of a single character
		  var cX = 0, cY = 0, cW = 0, cH = 0;

		  for ( var i = 0, len = words.length; i < len; i++ ) {

			if ( cX + ( len * cW ) >= this.w ) {
			  cX = 0;
			  cY += cH;
			}

			for ( var j = 0, wlen = words[ i ].length; j < wlen; j++ ) {
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

		return this._buffer;
	  },

	  clone : function() {
		return new Monogatari.StaticText( this.fontSize, this.fontFamily, this.font, this.w, this.h );
	  }

	} );

});
