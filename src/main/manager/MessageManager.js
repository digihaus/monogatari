define(
  [ 'core/World', 'core/Message', 'collection/LinkedList' ], function( World, Message, LinkedList ) {

    var instance = null;

    var MessageManager = function() {
      this.messages = new LinkedList();
    };

    MessageManager.prototype.register = function( message ) {
      this.messages.put( message );
    };

    MessageManager.prototype.sendMessagesTo = function( go ) {
      var message;
      var it = this.messages.iterator();

      while( it.hasNext() ){
        message = it.next();
        if( message.to === go.id ){
          go.receiveMessage( message );
        }
        this.messages.removeByValue( message );
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