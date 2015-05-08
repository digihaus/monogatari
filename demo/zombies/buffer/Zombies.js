define( [ 'Monogatari', 'go/Zombie' ], function( m, Zombie ) {

  var NUM_ZOMBIES = 30;

  var instance = null;

  var r = new m.Random();

  var Zombies = function() {
    this.buffer = new m.Map();
    this.bufferIt = this.buffer.iterator();

    for ( var i = 0; i < NUM_ZOMBIES; i++ ) {
      var zombie = new Zombie( i );
      this.buffer.put( zombie.id, zombie );
    }
  };

  Zombies.prototype.spawn = function() {
    this.bufferIt.first();
    var zombie = null;

    while ( this.bufferIt.hasNext() ) {
      zombie = this.bufferIt.next();

      if ( zombie && !zombie.isActive && !zombie.isVisible ) {
        zombie.isActive = true;
        zombie.isVisible = true;

        if ( r.bool( { likelihood : 5 } ) ) {
          zombie.goBersek();
        }

        switch ( r.integer( { min : 1, max : 4 } ) ) {
        case 1:
          zombie.position.x = r.floating( { min : 0, max : m.sceneManager.canvasWidth } );
          zombie.position.y = -63;
          zombie.position.z = 0;
          break;
        case 2:
          zombie.position.x = -63;
          zombie.position.y = r.floating( { min : 0, max : m.sceneManager.canvasHeight } );
          zombie.position.z = 0;
          break;
        case 3:
          zombie.position.x = m.sceneManager.canvasWidth + 63;
          zombie.position.y = r.floating( { min : 0, max : m.sceneManager.canvasHeight } );
          zombie.position.z = 0;
          break;
        case 4:
          zombie.position.x = r.floating( { min : 0, max : m.sceneManager.canvasWidth } );
          zombie.position.y = m.sceneManager.canvasHeight + 63;
          zombie.position.z = 0;
          break;
        }
      }
    }
  };

  Zombies.prototype.clear = function() {
    this.bufferIt.first();
    while ( this.bufferIt.hasNext() ) {
      this.bufferIt.next().init();
    }
  };

  Zombies.getInstance = function() {
    if ( instance === null ) {
      instance = new Zombies();
    }
    return instance;
  };

  return Zombies.getInstance();
} );