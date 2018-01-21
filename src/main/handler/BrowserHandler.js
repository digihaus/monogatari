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

}