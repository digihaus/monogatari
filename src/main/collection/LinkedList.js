
/**
 * Exports the {@link module:collection/LinkedList~LinkedList|LinkedList} class.
 * @module collection/LinkedList
 *
 * @licence
 * Doubly Linked List implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
define(
  [ "core/Common" ], function( Common ) {

    var LinkedListNode = function( value ) {
      this.value = ( value ) ? value : null;
      this.next = null;
      this.prev = null;
    };

    /**
     * Collection of data elements, with elements directing to the next node by means of pointer.
     * Elements can easily be inserted or removed without reallocation or reorganization of the entire
     * structure because the data items need not be stored contiguously in memory
     *
     * @class LinkedList
     */
    var LinkedList = function() {
      this._head = null;
      this._tail = null;
      this._size = 0;
    };

    /**
     * Add a value to the LinkedList, allows nulls and repeated values
     * @method
     * @instance
     * @name put
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.put = function( value ) {
      var node = new LinkedListNode( value );

      if( this._size === 0 ) {
        // no items in the list yet
        this._head = node;
        this._tail = node;
      } else {
        // attach to the tail node
        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
      }

      this._size++;
    };

    /**
     * Remove and returns the last value from the LinkedList
     * @method
     * @instance
     * @name pop
     * @return Object
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.pop = function() {
      return this.removeByIndex( this._size - 1 );
    };

    LinkedList.prototype.contains = function( value ) {
      if( value ) {
        var node = this._head, i = 0;

        while( node ) {
          if( Common.equals( node.value, value ) )
            return true;
          node = node.next;
        }
        return false;
      } else {
        return false;
      }
    };

    /**
     * Remove a value by a given index and returns it or null if not found
     * @method
     * @instance
     * @name removeByIndex
     * @param {Number} index The index position on the List
     * @return Object
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.removeByIndex = function( index ) {
      if( !isNaN( index ) && index > -1 && index <= this._size ) {
        var node = this._head, i = 0;
        if( index === 0 ) {
          // removing first item
          this._head = node.next;

          // If there's only one item in the list and you remove it, then this._head will be null.
          // In that case, you should also set this._tail to be null to effectively destroy the list.
          // Otherwise, set the previous pointer on the new this._head to be null.
          if( !this._head )
            this._tail = null;
          else
            this._head.prev = null;
        } else if( index === this._size - 1 ) {
          // removing last item
          node = this._tail;
          this._tail = node.prev;
          this._tail.next = null;
        } else {
          // find the node
          while( i++ < index ) {
            node = node.next;
          }

          // skip over the item to remove
          node.prev.next = node.next;
        }

        this._size--;

        return node.value;
      } else {
        return null;
      }
    };

    /**
     * Remove a value by a object index and returns it or null if not found
     * @method
     * @instance
     * @name removeByIndex
     * @param {Object} value The value on the List
     * @return Object
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.removeByValue = function( value ) {
      if( value && this._size > 0 ) {

        var node = this._head, i = 0;

        if( Common.equals( this._head.value, value ) ) {
          // removing first item
          this._head = node.next;

          // If there's only one item in the list and you remove it, then this._head will be null.
          // In that case, you should also set this._tail to be null to effectively destroy the list.
          // Otherwise, set the previous pointer on the new this._head to be null.
          if( !this._head ) {
            this._tail = null;
          } else {
            this._head.prev = null;
          }

          // decrease size
          this._size--;
        } else if( Common.equals( this._tail.value, value ) ) {
          // removing last item
          node = this._tail;
          this._tail = node.prev;
          this._tail.next = null;

          // decrease size
          this._size--;
        } else {
          // find the node
          while( node ) {
            if( Common.equals( node.value, value ) ) {
              // skip over the item to remove
              node.prev.next = node.next;
              // decrease size
              this._size--;
            }

            node = node.next;
          }

        }

        return ( node && node.value ) ? node.value : null;
      } else {
        return null;
      }
    };

    /**
     * Clear the whole List, removing all references to it and signaling to be garbage collected
     * @method
     * @instance
     * @name clear
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.clear = function() {
      this._head = null;
      this._tail = null;
      this._size = 0;
    };

    /**
     * Returns the length of the LinkedList
     * @method
     * @instance
     * @name size
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.size = function() {
      return this._size;
    };

    /**
     * Check if the LinkedList is Empty
     * @method
     * @instance
     * @name isEmpty
     * @return boolean
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.isEmpty = function() {
      return ( this._size > 0 );
    };

    /**
     * Returns an array with the values from the LinkedList
     * @method
     * @instance
     * @name toArray
     * @return Array
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.toArray = function() {
      var result = [], current = this._head;

      while( current ) {
        result.push( current.value );
        current = current.next;
      }

      return result;
    };

    /**
     * Returns a JSON object with the values from the LinkedList
     * @method
     * @instance
     * @name toJSON
     * @return {JSON}
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.toJSON = function() {
      return JSON.stringify( this.toArray() );
    };

    /**
     * Returns a stringified object with the values from the LinkedList
     * @method
     * @instance
     * @name toString
     * @return {String}
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.toString = function() {
      return this.toArray().toString();
    };

    /**
     * Creates and returns an Object with iterator functionality, allowing to navigate through the values stored on the LinkedList
     * @method
     * @instance
     * @name iterator
     * @return Object
     * @memberOf module:collection/LinkedList~LinkedList
     */
    LinkedList.prototype.iterator = function() {
      var Iterator = function( head, tail ) {
        this._head = head;
        this._current = head;
        this._tail = tail;

        this.hasNext = function() {
          return ( this._current && this._current.next != null );
        };

        this.next = function() {
          if( this._current ) {
            this._current = this._current.next;
            return ( this._current ) ? this._current.value : null;
          }
        };

        this.hasPrevious = function() {
          return ( this._current && this._current.prev != null );
        };

        this.previous = function() {
          if( this._current ) {
            this._current = this._current.prev;
            return ( this._current ) ? this._current.value : null;
          }
        };

        this.first = function() {
          if( this._head ) {
            this._current = this._head;
            return ( this._current ) ? this._current.value : null;
          }
        };

        this.last = function() {
          if( this._tail ) {
            this._current = this._tail;
            return ( this._current ) ? this._current.value : null;
          }
        };
      };
      return new Iterator( this._head, this._tail );
    };

    return LinkedList;
  }
);