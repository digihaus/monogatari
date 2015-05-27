define( [ 'collection/LinkedList' ], function( LinkedList ) {

  var instance = null;

  var MonogatariEvent = function( type, handler ) {
    this.type = type;
    this.handler = handler;
  };

  var MonogatariMessage = function( from, to, type, message ) {
    this.from = from;
    this.to = to;
    this.type = type;
    this.message = message;
  };

  var MessageManager = function() {
    this.messages = new LinkedList();
  };

  MessageManager.prototype.register = function( message ) {
    this.messages.put( message );
  };

  MessageManager.prototype.send = function() {

  };

  MessageManager.getInstance = function() {
    if ( instance === null ) {
      instance = new MessageManager();
    }
    return instance;
  };

  return MessageManager.getInstance();
} );
