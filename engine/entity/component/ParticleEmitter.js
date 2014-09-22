// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[engine/entity/component/ThreeObject.js]

Monogatari.ParticleEmitter = Monogatari.ThreeObject.extend( {
  init : function( sceneId, particleCount ) {

    this._sceneId = sceneId ? sceneId : null;

    this._particleCount = particleCount ? particleCount : 100;

    this._texture = THREE.ImageUtils.loadTexture( 'assets/snow.png' );
    this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
    this._texture.flipY = true;

    var material = new THREE.ParticleBasicMaterial( {
      size : 32,
      map : this._texture,
      alphaTest : 0.3,
      opacity : 0.6,
      transparent : true
    } );

    // var radius = 20;
    // var segments = 32;
    // var geometry = new THREE.CircleGeometry( radius, segments );
    var geometry = new THREE.Geometry();

    // now create the individual particles
    for ( var p = 0; p < particleCount; p++ ) {

      // create a particle with random
      // position values, -250 -> 250
      var pX = Math.random() * Monogatari.SceneManager._canvasWidth - Monogatari.SceneManager._canvasHalfWidth, 
          pY = Math.random() * Monogatari.SceneManager._canvasHeight - Monogatari.SceneManager._canvasHalfHeight, 
          pZ = Math.random() * Monogatari.SceneManager._canvasHeight - Monogatari.SceneManager._canvasHalfHeight, 
          particle = new THREE.Vector3();

      particle.x = pX;
      particle.y = pY;
      particle.z = pZ;

      particle.velocity = new THREE.Vector3( 0, // x
      -Math.random(), // y
      0 ); // z

      // add it to the geometry
      geometry.vertices.push( particle );
    }

    // this._texture = THREE.ImageUtils.loadTexture( ( source ) ? source : 'assets/bad-texture.png' );
    // this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
    // this._texture.flipY = true;

    this._material = material;

    this._geometry = geometry;

    // create the particle system
    this._mesh = new THREE.ParticleSystem( this._geometry, this._material );
    this._mesh.sortParticles = true;
    this.attachToScene();

    this.componentType = Monogatari.Constants.COMPONENT_PARTICLE_EMITTER;
  }
} );