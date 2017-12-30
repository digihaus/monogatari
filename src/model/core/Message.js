class Message {

    static get TYPE() {
        return {
            GAME: 0,
            PHYSICS: 1
        }
    }

    constructor(sender, receiver, timestamp, type, content) {
        this.sender = sender;
        this.receiver = receiver;
        this.timestamp = timestamp;
        this.type = type;
        this.content = content;
    }
}

module.exports = Message;