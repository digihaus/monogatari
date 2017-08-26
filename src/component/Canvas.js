var Common = require('core/Common');
var Math = require('core/Math');
var Base = require('component/Base');
var THREE = require('three.min.js');

/**
 * @param {Number} [width] - Width in pixels for one animation frame
 * @param {Number} [height] - Height in pixels for one animation frame
 * @extends {module:component/Base}
 * @exports component/Canvas
 */
var Canvas = function (width, height, draw, id) {
  Base.call(this, Base.TYPE.CANVAS);

  this.id = (id) ? id : Common.createUniqueId();

  this.canvas = document.createElement('canvas');

  this.w = (width) ? width : 128;
  this.h = (height) ? height : 128;

  this.halfW = this.w / 2;
  this.halfH = this.h / 2;

  this.canvas.width = this.w;
  this.canvas.height = this.h;

  this.context = this.canvas.getContext("2d");

  this.draw = (draw) ? draw : function () {
    this.setFill("rgba(255, 45, 21, 0.4)");
    this.setStroke("rgba(255, 45, 21, 0.9)");

    this.circle();
    this.fill();
    this.stroke();

    this.line(this.halfW, this.halfH, 0, 0);
    this.stroke();
  };

  /**
   * THREE.Texture of the component.
   * @type {THREE.Texture}
   */
  this.draw();

  this.texture = new THREE.Texture(this.canvas);
  this.texture.flipY = true;
  this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
  this.texture.minFilter = THREE.NearestFilter;

  /**
   * THREE.Material of the component.
   * @type {THREE.Material}
   */
  this.material = new THREE.MeshBasicMaterial(
    {
      map: this.texture,
      side: THREE.FrontSide
    }
  );
  this.material.transparent = true;
  /**
   * THREE.Geometry of the component.
   * @type {THREE.Geometry}
   */
  this.geometry = new THREE.PlaneBufferGeometry(this.w, this.h, 1, 1);

  /**
   * THREE.Mesh of the component.
   * @type {THREE.Mesh}
   */
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  this.state = Base.STATE.READY;
};

Canvas.prototype = Object.create(Base.prototype);

Canvas.prototype.update = function () {
  this.context.imageSmoothingEnabled = false;
  this.context.webkitImageSmoothingEnabled = false;
  this.context.mozImageSmoothingEnabled = false;

  this.clear();

  this.draw();

  // This makes the textures created during execution to work properly
  this.texture.needsUpdate = true;

  this.texture.image = this.canvas;
};

/**
 * Clear the whole area with the given color (if no color is given, assumes a transparent rect).
 * @param {String} color - Hexadecimal color
 */
Canvas.prototype.clear = function (color) {
  this.clearRect(0, 0, this.w, this.h, color);
};

/**
 * Clear a specific drawing area with the given color (if no color is given, assumes a transparent rect).
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @param {Number} w - Area width
 * @param {Number} h - Area height
 * @param {String} color - Hexadecimal color
 */
Canvas.prototype.clearRect = function (x, y, w, h, color) {
  this.context.clearRect(x, y, w, h);
  if (color) {
    this.context = this.setColor(color);
    this.context.fillRect(x, y, w, h);
  }
};

/**
 * Set the color of filling and strokes.
 * @param {String} color - Hexadecimal color
 */
Canvas.prototype.setColor = function (color) {
  this.context.strokeStyle = color;
  this.context.fillStyle = color;
};

/**
 * Set the color of strokes.
 * @param {String} color - Hexadecimal color
 */
Canvas.prototype.setStroke = function (color) {
  this.context.strokeStyle = color;
};

/**
 * Set the color of fill.
 * @param {String} color - Hexadecimal color
 */
Canvas.prototype.setFill = function (color) {
  this.context.fillStyle = color;
};

Canvas.prototype.fill = function (color) {
  this.context.fill();
};

Canvas.prototype.stroke = function (color) {
  this.context.stroke();
};

Canvas.prototype.clip = function () {
  this.context.clip();
};

/**
 * Draws a line from a coordinate (x1, y1) to another (x2, y2).
 * @param {Number} x1 - X coordinate
 * @param {Number} y1 - Y coordinate
 * @param {Number} x2 - X coordinate
 * @param {Number} y2 - Y coordinate
 */
Canvas.prototype.line = function (x1, y1, x2, y2) {
  this.context.beginPath();
  this.context.moveTo(x1, y1);
  this.context.lineTo(x2, y2);
  this.context.closePath();
  this.context.stroke();
};

/**
 * @param {Number} x - x coordinate, if not informed, assumes center
 * @param {Number} y - y coordinate, if not informed, assumes center
 * @param {Number} radius - Radius in pixels, if not informed, assumes min( x, y )
 */
Canvas.prototype.circle = function (x, y, radius) {
  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  var _x = (x) ? x : this.halfW;
  var _y = (y) ? y : this.halfH;
  var r = (radius) ? radius : Math.min(_x, _y);

  this.context.beginPath();
  this.context.arc(_x, _y, r, 0, Math.PI_2, true);
  this.context.closePath();
};

Canvas.prototype.polygon = function (arrX, arrY) {
  this.context.beginPath();
  this.context.moveTo(arrX[0], arrY[0]);

  for (var i = 1; i < arrX.length; i++) {
    this.context.lineTo(arrX[i], arrY[i]);
  }

  this.context.lineTo(arrX[0], arrY[0]);
  this.context.closePath();

  this.scontext.stroke();
};

/**
 * rounded rectangle.
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @param {Number} w - Area width
 * @param {Number} h - Area height
 * @param {Number} radius - Radius in pixels, if not informed, assumes 5px
 */
Canvas.prototype.roundedRect = function (x, y, w, h, radius) {

  var r = (radius) ? radius : 5;

  this.context.beginPath();

  //  +
  this.context.moveTo(x + r, y);
  //  ___+
  this.context.lineTo(x + w - r, y);
  //  ___
  //     \
  //      +
  this.context.quadraticCurveTo(x + w, y, x + w, y + r);
  //  ___
  //     \
  //      |
  //      +
  this.context.lineTo(x + w, y + h - r);
  //  ___
  //     \
  //      |
  //    +/
  this.context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  //  ___
  //     \
  //      |
  // +___/
  this.context.lineTo(x + r, y + h);
  //  ___
  //     \
  //+     |
  // \___/
  this.context.quadraticCurveTo(x, y + h, x, y + h - r);
  //  ___
  // +   \
  //|     |
  // \___/
  this.context.lineTo(x, y + r);
  //  ___
  // /   \
  //|     |
  // \___/
  this.context.quadraticCurveTo(x, y, x + r, y);
  this.context.closePath();
};

/**
 * ellipse.
 * @example
 * // from http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
 * // draw by center
 * strokeEllipse(context, cx - w/2, cy - h/2, w, h);
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @param {Number} w - Area width
 * @param {Number} h - Area height
 */
Canvas.prototype.ellipse = function (x, y, w, h) {
  var k = .5522848;
  var ox = (w / 2) * k; // control point offset horizontal
  var oy = (h / 2) * k; // control point offset vertical
  var xe = x + w; // x-end
  var ye = y + h; // y-end
  var xm = x + w / 2; // x-middle
  var ym = y + h / 2; // y-middle

  this.context.beginPath();
  this.context.moveTo(x, ym);
  this.context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  this.context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  this.context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  this.context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  this.context.closePath();
};

Canvas.prototype.setAlpha = function (alpha) {
  this.context.globalAlpha = (alpha) ? alpha : 0;
};

module.exports = Canvas;