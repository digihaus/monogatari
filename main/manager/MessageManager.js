/**
 * Exports the {@link module:manager/MessageManager~MessageManager|MessageManager} class.
 * @module manager/MessageManager
 */
define(
  [ 'core/Message', 'collection/LinkedList' ], function( Message, LinkedList ) {

    var instance = null;

    /**
     *  @class MessageManager
     */
    var MessageManager = function() {
      /**
       * LinkedList of messages to be delivered to GameObjects
       * @memberOf module:manager/MessageManager~MessageManager
       * @instance
       * @type {LinkedList}
       * @name userMessages
       */
      this.userMessages = new LinkedList();
    };

    /**
     * Registers a message to be sent, this is called through the GameObject
     * @memberOf module:manager/MessageManager~MessageManager
     * @method
     * @instance
     * @name register
     * @param {Message} message
     */
    MessageManager.prototype.register = function( message ) {
      this.userMessages.put( message );
    };

    /**
     * Send the undelivered messages to the given GameObject
     * @memberOf module:manager/MessageManager~MessageManager
     * @method
     * @instance
     * @name sendMessagesTo
     * @param {GameObject} go Target object
     */
    MessageManager.prototype.sendMessagesTo = function( go ) {
      var message;
      if( this.userMessages.size() > 0 ) {
        var itUser = this.userMessages.iterator();

        while( itUser.hasNext() ) {
          message = itUser.next();
          if( message.to === go.id ) {
            go.receiveMessage( message );
            this.userMessages.removeByValue( message );
          }
        }
      }

    };

    MessageManager.getInstance = function() {
      if( instance === null ) {
        instance = new MessageManager();
      }
      return instance;
    };

    return MessageManager.getInstance();
  }
);