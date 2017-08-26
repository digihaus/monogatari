var Message = require('core/Message');
var LinkedList = require('collection/LinkedList');

/**
 * @requires core/Message
 * @requires collection/LinkedList
 * @exports manager/MessageManager
 */
var MessageManager = {};

/**
 * List of messages to be delivered to GameObjects.
 * @type {module:collection/LinkedList}
 */
MessageManager.userMessages = new LinkedList();

/**
 * Registers a message to be sent, this is called through the GameObject.
 * @param {module:core/Message} message
 */
MessageManager.register = function (message) {
  this.userMessages.put(message);
};

/**
 * Sends the undelivered messages to the given GameObject.
 * @param {module:core/GameObject} go - Target object
 */
MessageManager.sendMessagesTo = function (go) {
  var message;
  if (this.userMessages.size() > 0) {
    var itUser = this.userMessages.iterator();

    while (itUser.hasNext()) {
      message = itUser.next();
      if (message.to === go.id) {
        go.receiveMessage(message);
        this.userMessages.removeByValue(message);
      }
    }
  }
};

module.exports = MessageManager;