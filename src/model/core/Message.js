class Message {
    constructor(senderId, recipientId, content, timestamp) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.timestamp = timestamp;
    }
}

module.exports = Message;