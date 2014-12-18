define( [ 'manager/SceneManager',
          'manager/PhysicsManager',
          'manager/ObjectManager',
          'core/Timer' ], function(scene, physics, object, timer) {

  return {

    init: function( bgcolor, width, height, target ) {
      scene.init( bgcolor, width, height, target );
    },

    update: function() {
      timer.tick();
      physics.update();
      object.update();
    },

    render: function() {
      scene.render();
    },

    run: function() {
      requestAnimationFrame( this.run.bind(this) );
      this.update();
      this.render();
    }
  }

} );
