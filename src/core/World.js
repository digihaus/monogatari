define(
  [ 'core/GameObject' ], function( GameObject ) {

    var instance = null;

    var World = function() {
      /**
       * The root node of the engine GameObject tree. Any GameObject will only be available to the engine when attached directly or indirectly to world.
       *
       * @example
       *
       *  var myParentGO = new m.GameObject( 'Parent' );
       *  var myGO = new m.GameObject( 'MyGO' );
       *  myParentGO.children.push( myGO );
       *  world.children.push( myParentGO );
       *
       * @memberOf Monogatari
       * @type {GameObject}
       * @name world
       */
      this.gameObject = new GameObject( 'world' );
    };

    MessageManager.getInstance = function() {
      if( instance === null ) {
        instance = new World();
      }
      return instance;
    };

    return World.getInstance();
  }
);