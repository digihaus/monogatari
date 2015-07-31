define(
  [ 'core/Message', 'collection/LinkedList' ], function( Message, LinkedList ) {

    var instance = null;

    var MessageManager = function() {
      this.userMessages = new LinkedList();
      this.engineMessages = new LinkedList();
    };

    MessageManager.prototype.register = function( message ) {
      this.userMessages.put( message );
    };

    MessageManager.prototype.registerEngineMessage = function( message ) {
      this.engineMessages.put( message );
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

      if( this.engineMessages.size() > 0 ) {
        var itEngine = this.engineMessages.iterator();
        while( itEngine.hasNext() ) {
          message = itEngine.next();
          if( message.to === go.uid ) {
            go.receiveMessage( message );
            this.engineMessages.removeByValue( message );
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