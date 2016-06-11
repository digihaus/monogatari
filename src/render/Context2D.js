define(
  [ 'core/Math' ], function( Math ) {

    /**
     * Utility class to use context2D of the canvas. Usually used to render into a texture.
     * @requires core/Math
     * @exports render/Context2D
     */
    var Context2D = function() {};

    /**
     * Clear the whole area with the given color (if no color is given, assumes a transparent rect).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     * @param {String} color - Hexadecimal color
     */
    Context2D.prototype.clear = function( context, w, h, color ) {
      this.clearRect( context, 0, 0, w, h, color );
    };

    /**
     * Clear a specific drawing area with the given color (if no color is given, assumes a transparent rect).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     * @param {String} color - Hexadecimal color
     */
    Context2D.prototype.clearRect = function( context, x, y, w, h, color ) {
      context.clearRect( x, y, w, h );
      if( color ) {
        context = this.setContextColor( context, color );
        context.fillRect( x, y, w, h );
      }
    };

    Context2D.prototype.clipRect = function( context, x, y, w, h ) {
      context.beginPath();
      context.fillRect( x, y, w, h );
      context.closePath();
      context.clip();
    };

    /**
     * Set the color of filling and strokes.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {String} color - Hexadecimal color
     */
    Context2D.prototype.setContextColor = function( context, color ) {
      context.strokeStyle = color;
      context.fillStyle = color;
      return context;
    };

    /**
     * Set the color of strokes.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {String} color - Hexadecimal color
     */
    Context2D.prototype.setContextStrokeColor = function( context, color ) {
      context.strokeStyle = color;
      return context;
    };

    /**
     * Set the color of fill.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {String} color - Hexadecimal color
     */
    Context2D.prototype.setContextFillColor = function( context, color ) {
      context.fillStyle = color;
      return context;
    };

    /**
     * Draws a single point on the given coordinates.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     */
    Context2D.prototype.point = function( context, x, y ) {
      context.beginPath();
      context.fillRect( x, y, 1, 1 );
      context.closePath();
      context.stroke();
    };

    /**
     * Draws a line from a coordinate (x1, y1) to another (x2, y2).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x1 - X coordinate
     * @param {Number} y1 - Y coordinate
     * @param {Number} x2 - X coordinate
     * @param {Number} y2 - Y coordinate
     */
    Context2D.prototype.line = function( context, x1, y1, x2, y2 ) {
      context.beginPath();
      context.moveTo( x1, y1 );
      context.lineTo( x2, y2 );
      context.closePath();
      context.stroke();
    };

    /**
     * Strokes a circle with the given radius (in pixels).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} radius - Radius in pixels
     */
    Context2D.prototype.strokeCircle = function( context, radius ) {
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.beginPath();
      context.arc( 0, 0, radius, 0, Math.PI_2, true );
      context.closePath();
      context.stroke();
    };

    /**
     * Fills a circle with the given radius (in pixels).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} radius - Radius in pixels
     */
    Context2D.prototype.fillCircle = function( context, radius ) {
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.beginPath();
      context.arc( 0, 0, radius, 0, Math.PI_2, true );
      context.closePath();
      context.fill();
    };

    /**
     * Strokes and Fills a circle with the given radius (in pixels).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} radius - Radius in pixels
     */
    Context2D.prototype.fillAndStrokeCircle = function( context, radius ) {
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.beginPath();
      context.arc( 0, 0, radius, 0, Math.PI_2, true );
      context.closePath();
      context.fill();
      context.stroke();
    };

    Context2D.prototype.clipCircle = function( context, radius ) {
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.beginPath();
      context.arc( 0, 0, radius, 0, Math.PI_2, true );
      context.closePath();
      context.clip();
    };

    /**
     * Strokes a Polygon with the given coordinates(in pixels).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Array} arrX - Array if X coordinates
     * @param {Array} arrY - Array if Y coordinates
     */
    Context2D.prototype.strokePolygon = function( context, arrX, arrY ) {
      context.beginPath();
      context.moveTo( arrX[ 0 ], arrY[ 0 ] );

      for( var i = 1; i < arrX.length; i++ )
        context.lineTo( arrX[ i ], arrY[ i ] );

      context.lineTo( arrX[ 0 ], arrY[ 0 ] );
      context.closePath();

      context.stroke();
    };

    /**
     * Fills a Polygon with the given coordinates (in pixels).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Array} arrX - Array if X coordinates
     * @param {Array} arrY - Array if Y coordinates
     */
    Context2D.prototype.fillPolygon = function( context, arrX, arrY ) {
      context.beginPath();
      context.moveTo( arrX[ 0 ], arrY[ 0 ] );

      for( var i = 1; i < arrX.length; i++ )
        context.lineTo( arrX[ i ], arrY[ i ] );

      context.lineTo( arrX[ 0 ], arrY[ 0 ] );
      context.closePath();

      context.fill();
    };

    /**
     * Fills and strokes a Polygon with the given coordinates (in pixels).
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Array} arrX - Array if X coordinates
     * @param {Array} arrY - Array if Y coordinates
     */
    Context2D.prototype.fillAndStrokePolygon = function( context, arrX, arrY ) {
      context.beginPath();
      context.moveTo( arrX[ 0 ], arrY[ 0 ] );

      for( var i = 1; i < arrX.length; i++ )
        context.lineTo( arrX[ i ], arrY[ i ] );

      context.lineTo( arrX[ 0 ], arrY[ 0 ] );
      context.closePath();

      context.fill();
      context.stroke();
    };

    Context2D.prototype.clipPolygon = function( context, arrX, arrY ) {
      context.beginPath();
      context.moveTo( arrX[ 0 ], arrY[ 0 ] );

      for( var i = 1; i < arrX.length; i++ )
        context.lineTo( arrX[ i ], arrY[ i ] );

      context.lineTo( arrX[ 0 ], arrY[ 0 ] );
      context.closePath();

      context.clip();
    };

    /**
     * Strokes a rounded rectangle.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     * @param {Number} radius - Radius in pixels
     */
    Context2D.prototype.strokeRoundedRect = function( context, x, y, w, h, radius ) {

      var r = ( radius ) ? radius : 5;

      context.beginPath();

      //  +
      context.moveTo( x + r, y );
      //  ___+
      context.lineTo( x + w - r, y );
      //  ___
      //     \
      //      +
      context.quadraticCurveTo( x + w, y, x + w, y + r );
      //  ___
      //     \
      //      |
      //      +
      context.lineTo( x + w, y + h - r );
      //  ___
      //     \
      //      |
      //    +/
      context.quadraticCurveTo( x + w, y + h, x + w - r, y + h );
      //  ___
      //     \
      //      |
      // +___/
      context.lineTo( x + r, y + h );
      //  ___
      //     \
      //+     |
      // \___/
      context.quadraticCurveTo( x, y + h, x, y + h - r );
      //  ___
      // +   \
      //|     |
      // \___/
      context.lineTo( x, y + r );
      //  ___
      // /   \
      //|     |
      // \___/
      context.quadraticCurveTo( x, y, x + r, y );
      context.closePath();

      context.stroke();
    };

    /**
     * Fill a rounded rectangle.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     * @param {Number} radius - Radius in pixels
     */
    Context2D.prototype.fillRoundedRect = function( context, x, y, w, h, radius ) {

      var r = ( radius ) ? radius : 5;

      context.beginPath();

      context.moveTo( x + r, y );
      context.lineTo( x + w - r, y );
      context.quadraticCurveTo( x + w, y, x + w, y + r );
      context.lineTo( x + w, y + h - r );
      context.quadraticCurveTo( x + w, y + h, x + w - r, y + h );
      context.lineTo( x + r, y + h );
      context.quadraticCurveTo( x, y + h, x, y + h - r );
      context.lineTo( x, y + r );
      context.quadraticCurveTo( x, y, x + r, y );

      context.closePath();

      context.fill();
    };

    /**
     * Fills and strokes a rounded rectangle.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     * @param {Number} radius - Radius in pixels
     */
    Context2D.prototype.fillAndStrokeRoundedRect = function( context, x, y, w, h, radius ) {
      var r = ( radius ) ? radius : 5;

      context.beginPath();

      context.moveTo( x + r, y );
      context.lineTo( x + w - r, y );
      context.quadraticCurveTo( x + w, y, x + w, y + r );
      context.lineTo( x + w, y + h - r );
      context.quadraticCurveTo( x + w, y + h, x + w - r, y + h );
      context.lineTo( x + r, y + h );
      context.quadraticCurveTo( x, y + h, x, y + h - r );
      context.lineTo( x, y + r );
      context.quadraticCurveTo( x, y, x + r, y );

      context.closePath();

      context.fill();
      context.stroke();
    };

    /**
     * Strokes an ellipse.
     * @example
     * // from http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
     * // draw by center
     * strokeEllipse(context, cx - w/2, cy - h/2, w, h);
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     */
    Context2D.prototype.strokeEllipse = function( context, x, y, w, h ) {
      var k = .5522848;
      var ox = ( w / 2 ) * k; // control point offset horizontal
      var oy = ( h / 2 ) * k; // control point offset vertical
      var xe = x + w; // x-end
      var ye = y + h; // y-end
      var xm = x + w / 2; // x-middle
      var ym = y + h / 2; // y-middle

      context.beginPath();
      context.moveTo( x, ym );
      context.bezierCurveTo( x, ym - oy, xm - ox, y, xm, y );
      context.bezierCurveTo( xm + ox, y, xe, ym - oy, xe, ym );
      context.bezierCurveTo( xe, ym + oy, xm + ox, ye, xm, ye );
      context.bezierCurveTo( xm - ox, ye, x, ym + oy, x, ym );
      context.closePath();
      context.stroke();
    };

    /**
     * Fills an ellipse.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     */
    Context2D.prototype.fillEllipse = function( context, x, y, w, h ) {
      var k = .5522848;
      var ox = ( w / 2 ) * k; // control point offset horizontal
      var oy = ( h / 2 ) * k; // control point offset vertical
      var xe = x + w; // x-end
      var ye = y + h; // y-end
      var xm = x + w / 2; // x-middle
      var ym = y + h / 2; // y-middle

      context.beginPath();
      context.moveTo( x, ym );
      context.bezierCurveTo( x, ym - oy, xm - ox, y, xm, y );
      context.bezierCurveTo( xm + ox, y, xe, ym - oy, xe, ym );
      context.bezierCurveTo( xe, ym + oy, xm + ox, ye, xm, ye );
      context.bezierCurveTo( xm - ox, ye, x, ym + oy, x, ym );
      context.closePath();
      context.fill();
    };

    /**
     * Stroke and fills an ellipse.
     * @param {Object} context - 2d context of a HTMLCanvasElement
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     * @param {Number} w - Area width
     * @param {Number} h - Area height
     */
    Context2D.prototype.fillAndStrokeEllipse = function( context, x, y, w, h ) {
      var k = .5522848;
      var ox = ( w / 2 ) * k; // control point offset horizontal
      var oy = ( h / 2 ) * k; // control point offset vertical
      var xe = x + w; // x-end
      var ye = y + h; // y-end
      var xm = x + w / 2; // x-middle
      var ym = y + h / 2; // y-middle

      context.beginPath();
      context.moveTo( x, ym );
      context.bezierCurveTo( x, ym - oy, xm - ox, y, xm, y );
      context.bezierCurveTo( xm + ox, y, xe, ym - oy, xe, ym );
      context.bezierCurveTo( xe, ym + oy, xm + ox, ye, xm, ye );
      context.bezierCurveTo( xm - ox, ye, x, ym + oy, x, ym );
      context.closePath();
      context.fill();
      context.stroke();
    };

    Context2D.prototype.setAlpha = function( context, alpha ) {
      context.globalAlpha = (alpha) ? alpha : 0;
    };

    return new Context2D();
  }
);