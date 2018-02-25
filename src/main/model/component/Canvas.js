import { Graphic } from 'model/component/Graphic';

function defaultDraw() {
    this.setFill("rgba(255, 45, 21, 0.4)");
    this.setStroke("rgba(255, 45, 21, 0.9)");
    this.circle();
    this.fill();
    this.stroke();
    this.line(this.width / 2, this.height / 2, 0, 0);
    this.stroke();
}

export class Canvas extends Graphic {

    constructor(width = 128, height = 128, draw = defaultDraw, { sceneId } = {}) {
        super(width, height, sceneId);
        this.draw = draw;
        this.draw.bind(this);
        this.canvas = null;
        this.context = null;
    }

    clear(color) {
        this.clearRect(0, 0, this.width, this.height, color);
    }

    clearRect(x, y, width, height, color) {
        this.context.clearRect(x, y, width, height);
        if (color) {
            this.context = this.setColor(color);
            this.context.fillRect(x, y, width, height);
        }
    }

    setColor(color) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
    }

    setStroke(color) {
        this.context.strokeStyle = color;
    }

    setFill(color) {
        this.context.fillStyle = color;
    }

    fill(color) {
        this.context.fill();
    }

    stroke(color) {
        this.context.stroke();
    }

    clip() {
        this.context.clip();
    }

    line(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.closePath();
        this.context.stroke();
    }

    circle(x = this.width / 2, y = this.height / 2, radius = Math.min(x, y)) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, true); // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        this.context.closePath();
    }

    polygon(arrX, arrY) {
        this.context.beginPath();
        this.context.moveTo(arrX[0], arrY[0]);
        for (var i = 1; i < arrX.length; i++) {
            this.context.lineTo(arrX[i], arrY[i]);
        }
        this.context.lineTo(arrX[0], arrY[0]);
        this.context.closePath();
        this.scontext.stroke();
    }

    roundedRect(x, y, width, height, radius = 5) {
        this.context.beginPath();
        //  +
        this.context.moveTo(x + radius, y);
        //  ___+
        this.context.lineTo(x + width - radius, y);
        //  ___
        //     \
        //      +
        this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
        //  ___
        //     \
        //      |
        //      +
        this.context.lineTo(x + width, y + height - radius);
        //  ___
        //     \
        //      |
        //    +/
        this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        //  ___
        //     \
        //      |
        // +___/
        this.context.lineTo(x + radius, y + height);
        //  ___
        //     \
        //+     |
        // \___/
        this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
        //  ___
        // +   \
        //|     |
        // \___/
        this.context.lineTo(x, y + radius);
        //  ___
        // /   \
        //|     |
        // \___/
        this.context.quadraticCurveTo(x, y, x + radius, y);
        this.context.closePath();
    }

    /**
     * @example
     * // from http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
     * // draw by center
     * strokeEllipse(context, cx - w/2, cy - h/2, w, h);
     */
    ellipse(x, y, width, height) {
        var k = .5522848;
        var ox = (width / 2) * k; // control point offset horizontal
        var oy = (height / 2) * k; // control point offset vertical
        var xe = x + width; // x-end
        var ye = y + height; // y-end
        var xm = x + width / 2; // x-middle
        var ym = y + height / 2; // y-middle
        this.context.beginPath();
        this.context.moveTo(x, ym);
        this.context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        this.context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        this.context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        this.context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        this.context.closePath();
    }

    setAlpha(alpha) {
        this.context.globalAlpha = (alpha) ? alpha : 0;
    }

    clone() {
        return new Canvas(this.width, this.height, this.draw);
    }

}