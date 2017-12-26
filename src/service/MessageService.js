class MessageService {

    constructor() {
        this.messages = new Array();
    }

    register(message) {
        this.messages.push(message);
    }

    deliver(go) {
        go.messages.push(this.messages.find(m => m.to === go.id));
        this.messages = this.messages.filter(m => m.to !== go.id);
    }
}

module.exports = MessageService;