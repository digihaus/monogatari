define( [ 'collection/Map' ], function( _Map ) {

  var instance = null;

  var Event = function( type, handler ) {
    this.type = type;
    this.handler = handler;
  };

  var Message = function( from, to, type, message, handler ) {
    this.from = from;
    this.to = to;
    this.type = type;
    this.message = message;
    this.handler = handler;
  };

  var EventManager = function() {
    this.listeners = new _Map();
    this.iterator = this.listeners.iterator();
  }

  EventManager.prototype.addListener = function( id, eventType, handler ) {
    this.listeners.put( id, new Event( eventType, handler ) );
  };

  EventManager.prototype.notify = function( eventType, params ) {
    this.iterator.first();
    var evt;

    // iterate through listeners that observe that eventType
    while ( this.iterator.hasNext() ) {
      evt = this.iterator.next();

      if ( evt.type === eventType ) {
        evt.handler( params );
      }
    }
  };

  EventManager.prototype.removeListener = function( id ) {
    this.listeners.remove( id );
  };

  EventManager.getInstance = function() {
    if ( instance === null ) {
      instance = new EventManager();
    }
    return instance;
  };

  return EventManager.getInstance();
} );
