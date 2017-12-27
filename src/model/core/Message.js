class Message {

    static get TYPE() {
        return {
            GAME: 0,
            PHYSICS: 1
        }
    }

    constructor(senderId, recipientId, timestamp, type, content) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.timestamp = timestamp;
        this.type = type;
        this.content = content;
    }
}

module.exports = Message;