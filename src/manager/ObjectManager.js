define( [ 'core/GameObject' ], function( _GameObject ) {

  var ObjectManager = function() {
    this.world = new GameObject();
  };

  ObjectManager.prototype.isGameObject = function( object ) {
    return ( object && object.id && object.equals instanceof Function && object.update instanceof Function ) ? true : false;
  };

  ObjectManager.prototype.update = function() {
    // itera pelos GOS, partindo do world
  };

  ObjectManager.prototype.attachToWorld = function( go ) {
    this.world.children.push( go );
  };

  return ObjectManager;

} );
