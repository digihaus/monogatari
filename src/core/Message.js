/*
* Basic protocol to allow communication between GameObjects
* */
define(
  [ 'core/Timer' ],
  function( Timer ) {
    var Message = function( from, to, type, message ) {
      this.from = from;
      this.to = to;
      this.type = type;
      this.message = message;
      this.timestamp = Timer.time;
    };

    Message.prototype.equals = function( other ) {
      if( this.from === other.from && this.to === other.to && this.type === other.type && this.timestamp === other.timestamp ) {
        return true;
      }
      return false;
    };

    return Message;
  }
);