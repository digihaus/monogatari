/**
 * Exports the {@link module:component/FlyText~FlyText|FlyText} class.
 * @module component/FlyText
 */
define(
  [ 'core/Timer', 'component/Base', 'component/Text', 'lib/Three', 'render/Context2D' ], function( Timer, Base, Text, _Three, Context2D ) {

    /**
     * Moving Text display. It creates an invisible "bounding box" around the Text to limit and break lines using the parameters width and height,
     * displaying characters on by one, by the rate of the speed parameter.
     *
     * @param {String} [text] String containing the text to be displayed
     * @param {String} [fontSize] Font size in pixels
     * @param {String} [fontFamily]  Font family name
     * @param {Number} [width] Width in pixels for the area containing the text.
     * @param {Number} [height] Height in pixels for the area containing the text.
     * @param {String} [color] Hexadecimal color
     * @param {Number} [speed] Interval in milliseconds between each character to be displayed.
     * @class FlyText
     */
    var FlyText = function( text, fontSize, fontFamily, width, height, color, speed ) {
      Text.call( this, text, fontSize, fontFamily, width, height, color );

      /**
       * Component Type.
       * @memberOf module:component/FlyText~FlyText
       * @instance
       * @type {Number}
       * @name type
       */
      this.type = Base.FLY_TEXT;

      this.state = Base.STATE_READY;

      /**
       * Interval in milliseconds between each character to be displayed.
       * @memberOf module:component/FlyText~FlyText
       * @instance
       * @type {Number}
       * @default 30
       * @name speed
       */
      this.speed = ( speed ) ? speed : 30;

      /**
       * Buffer used to display part of the text.
       * @memberOf module:component/FlyText~FlyText
       * @instance
       * @type {String}
       * @default ''
       * @name textBuffer
       */
      this.textBuffer = '';

      /**
       * Time that the component started displaying the text.
       * @memberOf module:component/FlyText~FlyText
       * @instance
       * @type {Number}
       * @default 0
       * @name startTime
       */
      this.startTime = 0;

      this.load();

      /**
       * Flag to point if the component has finished drawing all characters.
       * @memberOf module:component/FlyText~FlyText
       * @instance
       * @type {Boolean}
       * @default false
       * @name finished
       */
      this.finished = false;
    };

    FlyText.prototype = Object.create( Text.prototype );

    /**
     * Sets various properties of the font then re-parses for proper buffering.
     * @method
     * @instance
     * @name reset
     * @param {String} [text] Text to be displayed
     * @param {Number} [fontSize] Font size, in pixels
     * @param {String} [fontFamily] Font-Family, accepts web fonts
     * @param {Number} [width] Buffer width, in pixels
     * @param {Number} [height] Buffer height, in pixels
     * @param {String} [color] Hexadecimal color
     * @param {Number} [speed] Interval in milliseconds between each character to be displayed.
     * @memberOf module:component/FlyText~FlyText
     */
    FlyText.prototype.reset = function( text, fontSize, fontFamily, width, height, color, speed ) {
      this.text = ( text ) ? text : 'The quick brown fox jumps over the lazy dog';
      this.fontSize = ( fontSize ) ? fontSize : 10;
      this.fontFamily = ( fontFamily ) ? fontFamily : 'Verdana';
      this.w = ( width ) ? width : 256;
      this.h = ( height ) ? height : 64;

      this.speed = ( speed ) ? speed : 30;
      this.textBuffer = '';
      this.startTime = 0;

      this.load();
      this.finished = false;
    };


    /**
     * Clears the internal buffer for repaint.
     * @method
     * @instance
     * @name clearBuffer
     * @memberOf module:component/FlyText~FlyText
     */
    FlyText.prototype.clearBuffer = function() {
      var context = this.buffer.getContext( '2d' );
      context.clearRect( 0, 0, this.w, this.h );
      this.finished = false;
      this.textBuffer = '';
      this.startTime = 0;
    };

    /**
     * Set the Text then re-parses for proper buffering.
     * @method
     * @instance
     * @name setText
     * @param {String} [text] Text to be displayed
     * @memberOf module:component/FlyText~FlyText
     */
    FlyText.prototype.setText = function( text ) {
      this.text = ( text ) ? text : '';
      this.clearBuffer();
    };

    /**
     * Set the time in milliseconds then re-parses for proper buffering.
     * @method
     * @instance
     * @name setText
     * @param {Number} [speed] Interval in milliseconds between each character to be displayed.
     * @memberOf module:component/FlyText~FlyText
     */
    FlyText.prototype.setSpeed = function( speed ) {
      this.speed = ( speed ) ? speed : 30;
      this.clearBuffer();
    };

    /**
     * Callback function, triggered by the engine
     * @method
     * @instance
     * @name onLoad
     * @memberOf module:component/FlyText~FlyText
     */
    FlyText.prototype.onLoad = function() {
      this.parse();
      this.createTexture();
    };

    /**
     * Create the texture buffer based on canvas, and attach it to the component material and mesh for rendering.
     * @method
     * @instance
     * @name createTexture
     * @memberOf module:component/FlyText~FlyText
     */
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

    /**
     * Heartbeat to update the characters displayed based on time.<br>
     * When finished, flags it on the component.
     * @method
     * @instance
     * @name update
     * @memberOf module:component/FlyText~FlyText
     */
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

    /**
     * Renders the text with properties defined into the internal buffer texture, NOT on the screen.
     * It is rendered on screen only during the SceneManager render cycle.
     * @method
     * @instance
     * @name renderIntoBuffer
     * @memberOf module:component/FlyText~FlyText
     */
    FlyText.prototype.renderIntoBuffer = function() {
      var context = this.buffer.getContext( '2d' );
      context.imageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;

      context.clearRect( 0, 0, this.w, this.h );

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

      if( this.textBuffer.length > 0 ) {
        var c = this.fontMap.get( this.textBuffer[ 0 ] );
        var words = this.textBuffer.split( ' ' );
        var all = this.text.split( ' ' );

        // The position(x,y) and scale(width, height) of a single character
        var cX = this.radius, cY = this.radius, cW = 0, cH = 0;

        for( var i = 0, len = words.length; i < len; i++ ) {

          if( cX + ( all.length * cW ) >= this.w ) {
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

    return FlyText;
  }
);