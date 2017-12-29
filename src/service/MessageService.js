class MessageService {

    constructor() {
        this.messages = new Array();
    }

    deliver(go) {
        this.messages.filter(msg => msg.recipientId === go.uid).forEach(msg => go.messages.push(msg));
        this.messages = this.messages.filter(msg => msg.recipientId !== go.uid);
    }
}

module.exports = MessageService;