define( [ 'component/Base', 'SceneManager', 'lib/Three' ], function( _Base, _Scene, _Three ) {

  Monogatari.ThreeObject = Monogatari.Component.extend( {
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
      if ( this._material && this._geometry ) {
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

    attachToScene : function( object ) {
      Monogatari.SceneManager.getScene( this._sceneId ? this._sceneId : Monogatari.Constants.DEFAULT_SCENE_ID ).add( object ? object : this._mesh );
    },

    show : function() {
      this._mesh.material.visible = true;
    },

    hide : function() {
      this._mesh.material.visible = false;
    }
  } );

} );
