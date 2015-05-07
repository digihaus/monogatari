define( [ 'Monogatari' ], function( m ) {

  var BULLET_SPEED = 600;
  var BULLET_ANIMATION_SPEED = 300;

  var Bullet = function( id ) {
    m.GameObject.call( this, 'bullet_' + id );

    var sprite = new m.Sprite( 'assets/sprites/bullet.png', 16, 16, 2, 1 );

    this.position.set( -2000, 2000, 0 );
    this.isActive = false;
    this.isVisible = false;

    this.addComponent( sprite );
    this.speed = BULLET_SPEED;
    this.animationSpeed = BULLET_ANIMATION_SPEED;

    this.reset = function() {
      this.isActive = false;
      this.isVisible = false;
      this.position.set( -2000, 3000, 0 );
    };

    this.update = function() {
      var speed = this.speed / m.timer.fps;
      var sprite = this.findComponent( m.Base.SPRITE );

      if ( ( m.timer.time - sprite.lastUpdate ) > this.animationSpeed ) {
        sprite.nextFrame();
        sprite.lastUpdate = m.timer.time;
      }

      this.position.x += this.rotation.x * speed;
      this.position.y += this.rotation.y * speed;

      if ( this.position.x < 0 //
          || this.position.x > m.sceneManager.canvasWidth //
          || this.position.y < 0 //
          || this.position.y > m.sceneManager.canvasHeight ) {
        this.reset();
      }
    };

  }

  Bullet.prototype = Object.create( m.GameObject.prototype );

  return Bullet;
} );