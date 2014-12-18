define( [ 'core/Monogatari', 'core/Constants', 'core/collection/Map' ], function() {

  Monogatari.Event = function( type, handler ) {
    this.type = type;
    this.handler = handler;
  };

  Monogatari.Message = function( from, to, type, message, handler ) {
    this.from = from;
    this.to = to;
    this.type = type;
    this.message = message;
    this.handler = handler;
  };

  function MonogatariEventManager() {
    this._listeners = new Monogatari.Map();
    this._iterator = this._listeners.iterator();
  }

  MonogatariEventManager.prototype.addListener = function( id, eventType, handler ) {
    this._listeners.put( id, new Monogatari.Event( eventType, handler ) );
  };

  MonogatariEventManager.prototype.notify = function( eventType, params ) {
    this._iterator.first();
    var evt;

    // iterate through listeners that observe that eventType
    while ( this._iterator.hasNext() ) {
      evt = this._iterator.next();

      if ( evt.type === eventType ) {
        evt.handler( params );
      }
    }
  };

  MonogatariEventManager.prototype.removeListener = function( id ) {
    this._listeners.removeFromCache( id );
  };

  Monogatari.EventManager = new MonogatariEventManager();

} );
