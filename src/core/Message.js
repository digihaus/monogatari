/*
* Basic protocol to allow communication between GameObjects
* */
define(
  function() {
    var Message = function( from, to, type, message ) {
      this.from = from;
      this.to = to;
      this.type = type;
      this.message = message;
    };

    return Message;
  }
);