define( [ "core/Monogatari", "core/collection/Iterator" ], function() {
  Monogatari.Pool = Class.extend( {
    init : function( type, size ) {
      this._values = [];
      this._freeIndexes = [];
      this.type = type ? type : null;

      this.grow( size );
    },

    size : function() {
      return this._values.length;
    },

    grow : function( amount ) {
      if( amount && typeof amount === "number"){
        for( var i = 0, i < amount; i++ ){
          this._freeIndexes.push( this._values.length );

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
      if( this._freeIndexes.length === 0 )
        this.grow( Monogatari.floor(this._values.length / 2) );

      // get and remove head from freeIndexes
      var index = this._freeIndexes.remove(0);
      // retrieve the alive from the elements array
      var obj = this._values[index];
      // mark the object alive so we use it when iterating on the pool
      obj.alive = true;

      return obj;
    },

    free : function( index ) {
      this._values[index].reset();
      this._freeIndexes.push(index);
    },

    isEmpty : function() {
      return !this._values.length;
    },

    clear : function() {
      this._values.length = 0;
      this._freeIndexes.length = 0;
    },

    toArray : function() {
      return this._values.slice( 0 );
    },

    toJSON : function() {
      return JSON.stringify( this._values );
    },

    iterator : function() {
      
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