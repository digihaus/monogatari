/**
 * Exports the {@link module:component/BaseThree~BaseThree|BaseThree} class.
 * @module component/BaseThree
 */
define(
  [ 'component/Base', 'lib/Three' ], function( Base, _Three ) {

    /**
     * Every Object in the engine that can be rendered on screen should extend this class.
     * It uses Three.js resources, encapsulating an object compatible with the engine in a transparent manner.
     *
     * @param {THREE.Material} [material] Material from Three.js
     * @param {THREE.Geometry} [geometry] Geometry from Three.js
     * @param {Number} [type] component type
     * @class BaseThree
     */
    var BaseThree = function( material, geometry, type ) {
      Base.call( this, type || Base.BASE_THREE );
      this.isRenderable = true;

      this.texture = null;
      this.material = ( material ) ? material : null;
      this.geometry = ( geometry ) ? geometry : null;
      this.mesh = ( material && geometry ) ? new THREE.Mesh( this.geometry, this.material ) : null;
    };

    BaseThree.prototype = Object.create( Base.prototype );

    /**
     * Set a new material for the component
     * @method
     * @instance
     * @name setMaterial
     * @param {THREE.Material} [material] Material from Three.js
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.setMaterial = function( material ) {
      this.material = ( material ) ? material : null;
      this.updateMesh();
    };

    /**
     * Returns the Material from this component
     * @method
     * @instance
     * @name setMaterial
     * @return {THREE.Material} Material from Three.js
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.getMaterial = function() {
      return this.material;
    };

    /**
     * Set a new geometry for the component
     * @method
     * @instance
     * @name setMaterial
     * @param {THREE.Geometry} [geometry] Material from Three.js
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.setGeometry = function( geometry ) {
      this.geometry = ( geometry ) ? geometry : null;
      this.updateMesh();
    };

    /**
     * Returns the Geometry from this component
     * @method
     * @instance
     * @name setMaterial
     * @return {THREE.Geometry} Geometry from Three.js
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.getGeometry = function() {
      return this.geometry;
    };

    /**
     * Update the internal THREE.Mesh with the THREE.Material and THREE.Geometry
     * @method
     * @instance
     * @name updateMesh
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.updateMesh = function() {
      if( this.material && this.geometry ) {
        this.mesh.geometry = this.geometry;
        this.mesh.material = this.material;
      }
    };

    /**
     * Returns the THREE.Mesh from this component, null if no material and/or Geometries set.
     * @method
     * @instance
     * @name setMaterial
     * @return {THREE.Mesh} Mesh from Three.js
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.getMesh = function() {
      return this.mesh;
    };

    /**
     * Returns the THREE.Texture from this component, null if not set;
     * @method
     * @instance
     * @name getTexture
     * @return {THREE.Texture} Texture from Three.js
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.getTexture = function() {
      return this.texture;
    };

    /**
     * Rotate an object around an arbitrary axis in object space
     * (http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js)
     *
     * @method
     * @instance
     * @name rotateAroundObjectAxis
     * @param {THREE.Vector3} [axis] The reference axis for rotation
     * @param {Number} [radians] radian degrees to rotate
     * @memberOf module:component/BaseThree~BaseThree
     */
    BaseThree.prototype.rotateAroundObjectAxis = function( axis, radians ) {
      var rotObjectMatrix = new THREE.Matrix4();
      rotObjectMatrix.makeRotationAxis( axis.normalize(), radians );
      this.mesh.matrix.multiply( rotObjectMatrix );
      this.mesh.rotation.setFromRotationMatrix( this.mesh.matrix );
    };

    /**
     * Rotate an object around an arbitrary axis in world space
     * (http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js)
     *
     * @example
     * // rotation of 90 degrees on the x-axis
     * var xAxis = new THREE.Vector3(1,0,0);
     * rotateAroundWorldAxis( xAxis, Math.PI / 180);
     *
     * @method
     * @instance
     * @name rotateAroundObjectAxis
     * @param {THREE.Vector3} [axis] The reference axis for rotation
     * @param {Number} [radians] radian degrees to rotate
     * @memberOf module:component/BaseThree~BaseThree
     */
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
