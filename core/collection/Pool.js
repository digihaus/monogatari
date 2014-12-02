define( [ "core/Monogatari", "core/Util", "core/collection/Iterator" ], function() {
  Monogatari.Pool = Class.extend( {
    init : function( type, size ) {
      this._values = [];
      this._inUse = [];
      this.type = type ? type : null;

      this.grow( size || 10 );
    },

    size : function() {
      return this._values.length;
    },

    avaliableValues : function() {
      return this._values.length - this._inUse.length;
    }

    valuesInUse : function() {
      return this._inUse.length;
    }

    grow : function( amount ) {
      if( amount && typeof amount === "number"){
        for( var i = 0, i < amount; i++ ){
          if ( this.type && typeof this.type === "object" ) {
            this._values.push( new Monogatari.PoolNode( this._values.length, new this.type(), false ) );
          } else if ( this.type === "number" ) {
            this._values.push( new Monogatari.PoolNode( this._values.length, 0, false ) );
          } else if ( this.type === "string" ) {
            this._values.push( new Monogatari.PoolNode( this._values.length, "", false ) );
          } else if ( this.type === "boolean" ) {
            this._values.push( new Monogatari.PoolNode( this._values.length, false, false ) );
          } else {
            // should never get here, changes the type of the attribute, use your types correctly to avoid unnecessary garbage collecting!
            this._values.push( new Monogatari.PoolNode(this.size(), null, false) );
          }
        }
      }
    },

    getFree : function(){
      if( this._inUse.length === this._values.length )
        this.grow( Monogatari.floor(this._values.length / 2) );

      for(var i = 0, len = this._values.length; i < len; i++){
        if( this._values[i].alive === false ){
          this._values[i].alive = true;
          return this._values[i];
        }
      }
    },

    free : function( index ) {
      this._values[index].reset();
      this._inUse.remove( index );
    },

    isEmpty : function() {
      return !this._values.length;
    },

    clear : function() {
      this._values.length = 0;
      this._inUse.length = 0;
    },

    toArray : function() {
      return this._values.slice( 0 );
    },

    toJSON : function() {
      return JSON.stringify( this._values );
    },

    iterator : function() {
      return new Monogatari.PoolIterator( this._inUse, this._values );
    }

  } );

  Monogatari.PoolNode = Class.extend( {
    init : function( index, value, alive ) {
      this.index = ( index ) ? index : 0;
      this.value = ( value ) ? value : null;
      this.alive = ( typeof ( alive ) === "boolean" ) ? alive : false;
    },

    equals : function( other ) {
      return Monogatari.Util.equals( other.value, this.value );
    },

    reset : function() {
      if ( this.value.reset && typeof this.value.reset === "function" ) {
        this.value.reset();
      } else if ( typeof this.value === "number" ) {
        this.value = 0;
      } else if ( typeof this.value === "string" ) {
        this.value = "";
      } else if ( typeof this.value === "boolean" ) {
        this.value = false;
      } else {
        // should never get here, changes the type of the attribute, use your types correctly to avoid unnecessary garbage collecting!
        this.value = null;
      }
    }
  } );

} );