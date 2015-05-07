define( [ 'Monogatari', 'go/Zombie' ], function( m, Zombie ) {

  var NUM_ZOMBIES = 30;

  var instance = null;

  var r = new m.Random();

  var Zombies = function() {
    this.buffer = new m.Map();
    this.bufferIt = this.buffer.iterator();

    for ( var i = 0; i < NUM_ZOMBIES; i++ ) {
      var zombie = new Zombie( i, r.bool( { likelihood : 5 } ) );
      this.buffer.put( zombie.id, zombie );
    }
  };

  Zombies.prototype.spawnZombies = function() {
    this.bufferIt.first();
    var obj = null;

    while ( this.bufferIt.hasNext() ) {
      obj = this.bufferIt.next();

      if ( obj && !obj.isActive && !obj.isVisible ) {
        obj.isActive = true;
        obj.isVisible = true;

        switch ( r.integer( { min : 1, max : 4 } ) ) {
        case 1:
          obj.position.x = r.floating( { min : 0, max : m.sceneManager.canvasWidth } );
          obj.position.y = -63;
          obj.position.z = 0;
          break;
        case 2:
          obj.position.x = -63;
          obj.position.y = r.floating( { min : 0, max : m.sceneManager.canvasHeight } );
          obj.position.z = 0;
          break;
        case 3:
          obj.position.x = m.sceneManager.canvasWidth + 63;
          obj.position.y = r.floating( { min : 0, max : m.sceneManager.canvasHeight } );
          obj.position.z = 0;
          break;
        case 4:
          obj.position.x = r.floating( { min : 0, max : m.sceneManager.canvasWidth } );
          obj.position.y = m.sceneManager.canvasHeight + 63;
          obj.position.z = 0;
          break;
        }
      }
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