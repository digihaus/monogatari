define( [ 'Monogatari' ], function( m ) {

  var TIME_BETWEEN_SHOTS = 100;
  var MAX_BULLETS = 40;
  var BULLET_SPEED = 600;
  var BULLET_ANIMATION_SPEED = 300;

  var lastShot = m.timer.time;

  var instance = null;

  var Bullet = function() {
    this.buffer = new m.Map();
    this.bulletIt = this.buffer.iterator();

    var bullet = null;

    for ( var i = 0; i < MAX_BULLETS; i++ ) {
      var sprite = new m.Sprite( 'assets/sprites/bullet.png', 16, 16, 2, 1 );

      bullet = new m.GameObject( 'bullet_' + i );
      bullet.position.set( -2000, 2000, 0 );
      bullet.isActive = false;
      bullet.isVisible = false;

      bullet.addComponent( sprite );
      bullet.speed = BULLET_SPEED;
      bullet.animationSpeed = BULLET_ANIMATION_SPEED;

      bullet.reset = function() {
        this.isActive = false;
        this.isVisible = false;
        this.position.set( -2000, 3000, 0 );
      };

      bullet.update = function() {
        var speed = this.speed / m.timer.fps;
        var sprite = this.findComponent( m.Base.SPRITE );

        if ( ( m.timer.time - sprite.lastUpdate ) > this.animationSpeed ) {
          sprite.nextFrame();
          sprite.lastUpdate = m.timer.time;
        }

        this.position.x += this.rotation.x * speed;
        this.position.y += this.rotation.y * speed;

        if ( this.position.x < 0 || this.position.x > m.sceneManager.canvasWidth || this.position.y < 0
            || this.position.y > m.sceneManager.canvasHeight ) {
          this.reset();
        }

      };

      m.sceneManager.attachToScene( bullet );
      m.world.children.push( bullet );
      this.buffer.put( bullet.id, bullet );
    }

    Bullet.prototype.shoot = function( fromX, fromY ) {

      if ( ( m.timer.time - lastShot ) > TIME_BETWEEN_SHOTS ) {

        this.bulletIt.first();

        while ( this.bulletIt.hasNext() ) {
          obj = this.bulletIt.next();

          if ( obj && !obj.isActive && !obj.isVisible ) {
            var sprite = obj.findComponent( m.Base.SPRITE );

            obj.isActive = true;
            obj.isVisible = true;

            obj.position.set( fromX, fromY, 0 );

            obj.lookAt( m.mouse.position );

            lastShot = m.timer.time;
            return;
          }
        }

      }

    }
  };

  Bullet.getInstance = function() {
    if ( instance === null ) {
      instance = new Bullet();
    }
    return instance;
  }

  return Bullet.getInstance();

} );