define(
  [ 'core/Message', 'collection/LinkedList' ], function( Message, LinkedList ) {

    var instance = null;

    var MessageManager = function() {
      this.userMessages = new LinkedList();
    };

    MessageManager.prototype.register = function( message ) {
      this.userMessages.put( message );
    };

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