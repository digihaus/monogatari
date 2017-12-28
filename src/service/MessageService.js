class MessageService {

    constructor() {
        this.messages = new Array();
    }

    deliver(go) {
        go.messages.push(this.messages.filter(msg => msg.recipientId === go.id));
        this.messages = this.messages.filter(msg => msg.recipientId !== go.id);
    }
}

module.exports = MessageService;