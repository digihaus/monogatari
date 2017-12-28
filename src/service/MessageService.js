class MessageService {

    constructor() {
        this.messages = new Array();
    }

    deliver(go) {
        go.messages.concat(this.messages.filter(msg => msg.recipientId === go.uid));
        this.messages = new Array(this.messages.filter(msg => msg.recipientId !== go.uid));
    }
}

module.exports = MessageService;