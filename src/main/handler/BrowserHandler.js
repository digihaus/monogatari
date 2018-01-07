import { GameState } from 'GameState';

export class BrowserHandler {

    constructor(container) {
        this.agent = window.navigator.userAgent;
        this.version = window.navigator.appVersion;
        this.platform = window.navigator.platform;
        this.container = container;

        this._calculateRatio();

        window.addEventListener('resize', () => {
            this._calculateRatio();
        }, true);
    }

    _calculateRatio() {
        var ratioWidth = this.container.offsetWidth / GameState.width;
        var ratioHeight = this.container.offsetHeight / GameState.height;
        GameState.ratio = (ratioWidth > ratioHeight) ? ratioHeight : ratioWidth;
    }

    isFirefox() { return this.agent.indexOf('Firefox') > -1; }

    isOpera() { return window.opera !== null; }

    isChrome() { return this.agent.indexOf('Chrome') > -1; }

    isIOS() { return this.agent.indexOf('iPod') > -1 || this.agent.indexOf('iPhone') > -1 || this.agent.indexOf('iPad') > -1; }

    isAndroid() { return this.agent.indexOf('Android') > -1; }

    isBlackberry() { return this.agent.indexOf('Blackberry') > -1; }

    isIE() { return this.agent.indexOf('MSIE') > -1; }
}