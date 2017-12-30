class MessageService {

    constructor() {
        this.messages = new Array();
    }

    update(go) {
        this.messages.filter(msg => msg.receiver.uid === go.uid).forEach(msg => go.receive(msg));
        this.messages = this.messages.filter(msg => msg.receiver.uid !== go.uid);
    }
}

module.exports = MessageService;