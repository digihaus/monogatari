// @Requires[core/Monogatari.js]
// @Requires[core/Array.js]

//Based on code by John Resig
Monogatari.Iterator = Class.extend( {
  init : function( obj ) {
    if ( obj instanceof Array ) {
      this.index = -1;

      this.hasNext = function() {
        return this.index + 1 < obj.length;
      };

      this.next = function() {
        return obj[ ++this.index ];
      };
    } else {
      console.log( "Unable to iterate: " + obj );
      return null;
    }
  }
} );

Monogatari.ListIterator = Monogatari.Iterator.extend( {
  init : function( obj ) {
    if ( obj instanceof Array ) {
      this._super( obj );

      this.hasPrevious = function() {
        return this.index > 0;
      };

      this.previous = function() {
        return obj[ --this.index ];
      };

      this.first = function() {
        this.index = -1;
        return ( obj.length > 0 ) ? obj[ 0 ] : null;
      };

      this.last = function() {
        this.index = obj.length - 1;
        return ( obj.length > 0 ) ? obj[ this.index ] : null;
      };
    } else {
      console.log( "Unable to iterate: " + obj );
      return null;
    }
  }
} );

Monogatari.MapIterator = Class.extend( {
  init : function( keys, values ) {
    this.index = -1;

    this.hasNext = function() {
      return this.index + 1 < keys.length;
    };

    this.hasPrevious = function() {
      return this.index > 0;
    };

    this.next = function() {
      return values[ keys[ ++this.index ] ];
    };

    this.previous = function() {
      return values[ keys[ --this.index ] ];
    };

    this.first = function() {
      this.index = -1;
      return ( keys.length > 0 ) ? values[ keys[ 0 ] ] : null;
    };

    this.last = function() {
      this.index = keys.length - 1;
      return ( keys.length > 0 ) ? values[ keys[ this.index ] ] : null;
    };
  }
} );

Monogatari.TreeIterator = Class.extend( {
  init : function( keys, values ) {
    this.index = -1;

    this.hasNext = function() {
      return this.index + 1 < keys.length;
    };

    this.hasPrevious = function() {
      return this.index > 0;
    };

    this.next = function() {
      return values[ keys[ ++this.index ] ].value;
    };

    this.previous = function() {
      return values[ keys[ --this.index ] ].value;
    };

    this.first = function() {
      this.index = -1;
      return ( keys.length > 0 ) ? values[ keys[ 0 ] ] : null;
    };

    this.last = function() {
      this.index = keys.length - 1;
      return ( keys.length > 0 ) ? values[ keys[ this.index ] ].value : null;
    };
  }
} );