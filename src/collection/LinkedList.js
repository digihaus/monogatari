/*
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

define( [ "util/CommonUtils" ], function( _CommonUtils ) {

  Monogatari.LinkedList = Class.extend( {
    init : function() {
      this._head = null;
      this._tail = null;
      this._size = 0;

    },

    put : function( value ) {
      var node = new Monogatari.ListNode( value );

      if ( this._size == 0 ) {
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
    },

    contains : function( value ) {
      if ( value ) {
        var node = this._head, i = 0;

        while ( node.next != null ){
          if( _CommonUtils.equals( node.value, value ) )
            return true;

          node = node.next;
        }
        return false;
      } else {
        return false;
      }
    },

    remove : function( index ) {
      if ( index && index > -1 && index < this._length ) {

        var node = this._head, i = 0;

        if ( index === 0 ) {

          // removing first item
          this._head = node.next;

          // If there's only one item in the list and you remove it, then this._head will be null.
          // In that case, you should also set this._tail to be null to effectively destroy the list.
          // Otherwise, set the previous pointer on the new this._head to be null.
          if ( !this._head )
            this._tail = null;
          else
            this._head.prev = null;

        } else if ( index === this._length - 1 ) {

          // removing last item
          node = this._tail;
          this._tail = node.prev;
          this._tail.next = null;

        } else {

          // find the node
          while ( i++ < index )
            node = node.next;

          // skip over the item to remove
          node.prev.next = node.next;
        }

        this._size--;

        return node.value;
      } else {
        return null;
      }
    },

    clear : function() {
      this._head = null;
      this._tail = null;
      this._size = 0;
    },

    size : function() {
      return this._size;
    },

    isEmpty : function() {
      return ( this._size > 0 );
    },

    toArray : function() {
      var result = [], current = this._head;

      while ( current ) {
        result.push( current.value );
        current = current.next;
      }

      return result;
    },

    toJSON : function() {
      return JSON.stringify( this.toArray() );
    },

    toString : function() {
      return this.toArray().toString();
    },

    iterator : function(){
      return new Monogatari.LinkedListIterator( this._head, this._tail );
    }

  } );

  Monogatari.LinkedListNode = function( value ) {
    this.value = ( value ) ? value : null;
    this.next = null;
    this.prev = null;
  };

  Monogatari.LinkedListIterator = function( head, tail ) {
    this._head = head;
    this._current = head;
    this._tail = tail;

    this.hasNext = function() {
      return ( this._current.next != null );
    };

    this.next = function() {
      this._current = this._current.next;
      return this._current.value;
    };

    this.hasPrevious = function() {
      return return ( this._current.prev != null );
    };

    this.previous = function() {
      this._current = this._current.prev;
      return this._current.value;
    };

    this.first = function() {
      this._current = this._head;
      return this._current.value;
    };

    this.last = function() {
      this._current = this._tail;
      return this._current.value;
    };
  };

  } );
} );