define( [ 'Monogatari', 'zombies/go/Bullet' ], function( m, Bullet ) {

  var TIME_BETWEEN_SHOTS = 100;
  var MAX_BULLETS = 40;

  var instance = null;

  var lastShot = m.timer.time;

  var Bullets = function() {
    this.buffer = new m.Map();
    this.bufferIt = this.buffer.iterator();

    for ( var i = 0; i < MAX_BULLETS; i++ ) {
      var bullet = new Bullet( i );
      this.buffer.put( bullet.id, bullet );
    }
  };

  Bullets.prototype.shoot = function( fromX, fromY ) {
    if ( ( m.timer.time - lastShot ) > TIME_BETWEEN_SHOTS ) {

      this.bufferIt.first();

      while ( this.bufferIt.hasNext() ) {
        obj = this.bufferIt.next();
        if ( obj && !obj.isActive ) {
          obj.isActive = true;
          obj.position.set( fromX, fromY, 0 );
          obj.lookAt( m.mouse.position );

          lastShot = m.timer.time;
          return;
        }
      }
    }
  };

  Bullets.getInstance = function() {
    if ( instance === null ) {
      instance = new Bullets();
    }
    return instance;
  };

  return Bullets.getInstance();
} );