// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[engine/SceneManager.js]
// @Requires[lib/Three.js]

Monogatari.ThreeObject = Class.extend( {
  init : function( sceneId, material, geometry ) {
    this._sceneId = ( sceneId ) ? sceneId : null;
    this._texture = null;
    this._material = ( material ) ? material : null;
    this._geometry = ( geometry ) ? geometry : null;
    this._mesh = ( material && geometry ) ? new THREE.Mesh( this._geometry, this._material ) : null;

    this.componentType = Monogatari.Constants.COMPONENT_THREE_OBJECT;
  },

  setMaterial : function( material ) {
    this._material = ( material ) ? material : null;
    this.updateMesh();
  },

  getMaterial : function() {
    return this._material;
  },

  setGeometry : function( geometry ) {
    this._geometry = ( geometry ) ? geometry : null;
    this.updateMesh();
  },

  getGeometry : function() {
    return this._geometry;
  },

  updateMesh : function() {
    if ( material && geometry ) {
      this._mesh.geometry = this._geometry;
      this._mesh.material = this._material;
    }
  },

  getMesh : function() {
    return this._mesh;
  },

  getTexture : function() {
    return this._texture;
  },

  setSceneId : function( sceneId ) {
    this._sceneId = ( sceneId ) ? sceneId : null;
  },

  getSceneId : function() {
    return this._sceneId;
  },

  attachToScene : function() {
    Monogatari.SceneManager.getScene( this._sceneId ? this._sceneId : 'main' ).add( this._mesh );
  }
} );