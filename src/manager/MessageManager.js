define(
  [ 'core/Message', 'collection/LinkedList' ], function( Message, LinkedList ) {

    var instance = null;

    var MessageManager = function() {
      this.messages = new LinkedList();
    };

    MessageManager.prototype.register = function( message ) {
      this.messages.put( message );
    };

    MessageManager.prototype.send = function() {

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