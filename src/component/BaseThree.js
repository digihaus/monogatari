define( [ 'component/Base', 'lib/Three' ], function( _Base, _Three ) {

  var BaseThree = function( material, geometry ) {
    _Base.call( this, _Base.BASE_THREE );
    this.isRenderable = true;

    this.texture = null;
    this.material = ( material ) ? material : null;
    this.geometry = ( geometry ) ? geometry : null;
    this.mesh = ( material && geometry ) ? new THREE.Mesh( this.geometry, this.material ) : null;
  };

  BaseThree.prototype = Object.create( _Base.prototype );

  BaseThree.prototype.setMaterial = function( material ) {
    this.material = ( material ) ? material : null;
    this.updateMesh();
  };

  BaseThree.prototype.getMaterial = function() {
    return this.material;
  };

  BaseThree.prototype.setGeometry = function( geometry ) {
    this.geometry = ( geometry ) ? geometry : null;
    this.updateMesh();
  };

  BaseThree.prototype.getGeometry = function() {
    return this.geometry;
  };

  BaseThree.prototype.updateMesh = function() {
    if ( this.material && this.geometry ) {
      this.mesh.geometry = this.geometry;
      this.mesh.material = this.material;
    }
  };

  BaseThree.prototype.getMesh = function() {
    return this.mesh;
  };

  BaseThree.prototype.getTexture = function() {
    return this.texture;
  };

  BaseThree.prototype.show = function() {
    this.mesh.material.visible = true;
  };

  BaseThree.prototype.hide = function() {
    this.mesh.material.visible = false;
  };

  return BaseThree;

} );
