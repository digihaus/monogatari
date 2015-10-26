/**
 * Exports the {@link module:core/Message~Message|Message} class.
 * @module core/Message
*/
define(
  [ 'core/Timer' ],
  function( Timer ) {
    /**
     * Basic protocol to allow communication between Game Objects of the engine.
     *
     * @param {String} from The ID of the GameObject that is sending the message
     * @param {String} to The ID of the GameObject that is destined to receive the message
     * @param {String} type Subject
     * @param {Object} message The message itself, any complex structure is accepted, not limited to strings.
     * @class Message
     */
    var Message = function( from, to, type, message ) {
      this.from = from;
      this.to = to;
      this.type = type;
      this.message = message;
      this.timestamp = Timer.time;
    };

    /**
     * Checks for equality with the informed Message
     * @method
     * @instance
     * @name equals
     * @param {Message} other Other Message reference
     * @return boolean
     * @memberOf module:core/Message~Message
     */
    Message.prototype.equals = function( other ) {
      return ( this.from === other.from && this.to === other.to && this.type === other.type && this.timestamp === other.timestamp );
    };

    return Message;
  }
);