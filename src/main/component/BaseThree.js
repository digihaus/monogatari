define(
  [ 'component/Base', 'lib/Three' ], function( Base, _Three ) {

    var BaseThree = function( material, geometry, type ) {
      Base.call( this, type || Base.BASE_THREE );
      this.isRenderable = true;

      this.texture = null;
      this.material = ( material ) ? material : null;
      this.geometry = ( geometry ) ? geometry : null;
      this.mesh = ( material && geometry ) ? new THREE.Mesh( this.geometry, this.material ) : null;
    };

    BaseThree.prototype = Object.create( Base.prototype );

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
      if( this.material && this.geometry ) {
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

    //http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
    // Rotate an object around an arbitrary axis in object space
    BaseThree.prototype.rotateAroundObjectAxis = function( axis, radians ) {
      var rotObjectMatrix = new THREE.Matrix4();
      rotObjectMatrix.makeRotationAxis( axis.normalize(), radians );
      this.mesh.matrix.multiply( rotObjectMatrix );
      this.mesh.rotation.setFromRotationMatrix( this.mesh.matrix );
    };

    // Rotate an object around an arbitrary axis in world space

    // rotation of 90 degrees on the x-axis
    // var xAxis = new THREE.Vector3(1,0,0);
    // rotateAroundWorldAxis( xAxis, Math.PI / 180);
    BaseThree.prototype.rotateAroundWorldAxis = function( axis, radians ) {
      var rotWorldMatrix = new THREE.Matrix4();
      rotWorldMatrix.makeRotationAxis( axis.normalize(), radians );
      rotWorldMatrix.multiply( this.mesh.matrix );                // pre-multiply
      this.mesh.matrix = rotWorldMatrix;
      this.mesh.rotation.setFromRotationMatrix( this.mesh.matrix );
    };

    BaseThree.prototype.show = function() {
      this.mesh.material.visible = true;
    };

    BaseThree.prototype.hide = function() {
      this.mesh.material.visible = false;
    };

    return BaseThree;
  }
);
