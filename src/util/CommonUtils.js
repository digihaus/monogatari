define( function() {

  return {

    createUniqueId: function() {
      // from: http://stackoverflow.com/a/2117523
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString( 16 );
      } );
    },

    equals: function( obj, other ) {
      if ( obj === null || other === null ) {
        return obj === null && other === null;
      }
      if ( typeof obj === 'string' ) {
        return obj === other;
      }
      if ( typeof obj !== 'object' ) {
        return obj === other;
      }
      if ( obj.equals instanceof Function ) {
        return obj.equals( other );
      }
      return obj === other;
    },

    parseUnitSize: function( text ) {
      var len = text.length - 2;
      if ( len < 0 ) {
        return text;
      }
      if ( text.indexOf( 'pt' ) === len ) {
        return parseFloat( text.substring( 0, len ) ) * 1.25;
      }
      if ( text.indexOf( 'pc' ) === len ) {
        return parseFloat( text.substring( 0, len ) ) * 15;
      }
      if ( text.indexOf( 'mm' ) === len ) {
        return parseFloat( text.substring( 0, len ) ) * 3.543307;
      }
      if ( text.indexOf( 'cm' ) === len ) {
        return parseFloat( text.substring( 0, len ) ) * 35.43307;
      }
      if ( text.indexOf( 'in' ) === len ) {
        return parseFloat( text.substring( 0, len ) ) * 90;
      }
      if ( text.indexOf( 'px' ) === len ) {
        return parseFloat( text.substring( 0, len ) );
      }
      return parseFloat( text );
    },

    typeOf: function( obj ) {
      return Object.prototype.toString.apply( obj );
    },

    // store('num', '1');
    // store('on', 'true');
    // store('name', 'pamela');
    // store('obj', {'hello': 'world'}, true);
    store: function( key, val, isObject ) {
      if ( isObject ) {
        localStorage.setItem( key, JSON.stringify( val ) );
      } else {
        localStorage.setItem( key, val );
      }
    }

  }

} );
