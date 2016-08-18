define( [ 'zombies/go/single/Hero', 'zombies/buffer/Zombies', 'zombies/buffer/Bullets' ], function( Hero, Zombies, Bullets ) {

  var instance = null;

  var Collider = function() {};

  Collider.prototype.checkCollisions = function( currentScore ) {
    var zombiesIt = Zombies.bufferIt;
    var bulletsIt = Bullets.bufferIt;

    zombiesIt.first();
    while ( zombiesIt.hasNext() ) {
      var z = zombiesIt.next();

      // checks zombie/hero collision
      if ( collided( Hero.position, 22, z.position, 22 ) ) {
        z.attack();
      }

      // checks zombie/bullet collision
      bulletsIt.first();
      while ( bulletsIt.hasNext() ) {
        var b = bulletsIt.next();

        if( b.isActive ) {
          if( collided( b.position, 8, z.position, 32 ) ) {
            b.reset();
            z.receiveShoot();
            if( z.life <= 0 ) {
              currentScore++;
            }
          }
        }
      }
    }

    return currentScore;
  };

  function collided( positionA, radiusA, positionB, radiusB ) {
    var dist = positionA.distanceTo( positionB );
    var radius = radiusA + radiusB;
    return dist < radius;
  }

  Collider.getInstance = function() {
    if ( instance === null ) {
      instance = new Collider();
    }
    return instance;
  };

  return Collider.getInstance();
} );