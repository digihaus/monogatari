define( [ 'component/Base', 'core/Math', '../lib/Three' ], function( _Base, _Math, _Three ) {

  var Node = function ( position, rotation, scale ) {
    _Base.call(this, _Base.NODE);

    this.position = ( position ) ? position : new THREE.Vector3( 0, 0, 0 );
    this.rotation = ( rotation ) ? rotation : new THREE.Vector3( 0, 1, 0 ); // new THREE.Euler()
    this.scale = ( scale ) ? scale : new THREE.Vector3( 1, 1, 1 );
  };

  Node.prototype = Object.create(_Base.prototype);

  Node.prototype.negate = function() {
    this.position.negate();
    this.rotation.negate();
    this.scale.negate();
  };

  Node.prototype.getEulerRotation = function( axis ) {
    var a = ( axis ) ? axis : _Math.getYAlignedVector();
    var angle = this.rotation.angleTo( a );
    return ( this.rotation.y * a.x > this.rotation.x * a.y ) ? -angle : angle;
  },

  Node.prototype.getEulerRotationToTarget = function( target, axis ) {
    var node = this.clone();
    var a = ( axis ) ? axis : _Math.getYAlignedVector();
    var angle = this.rotation.angleTo( a );

    node.position.y = -node.position.y;
    node.rotation = target.sub( node.position );
    node.rotation.normalize();

    return ( node.rotation.y * a.x > node.rotation.x * a.y ) ? -angle : angle;
  };

  Node.prototype.clone = function() {
    return new Node( this.position.clone(), this.rotation.clone(), this.scale.clone() );
  };

  return Node;

} );
