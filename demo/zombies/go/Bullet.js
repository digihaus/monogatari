define( [ 'Monogatari' ], function( m ) {

  var SPEED = 600;
  var ANIMATION_SPEED = 300;

  var Bullet = function( id ) {
    m.GameObject.call( this, 'bullet_' + id );

    this.position.set( -2000, 2000, 0 );
    this.isActive = false;
    this.isVisible = false;

    this.addComponent( new m.Sprite( 'assets/sprites/bullet.png', 16, 16, 2, 1 ) );
    this.speed = SPEED;
    this.animationSpeed = ANIMATION_SPEED;

    m.sceneManager.attachToScene( this );
    m.world.children.push( this );
  };

  Bullet.prototype = Object.create( m.GameObject.prototype );

  Bullet.prototype.update = function() {
    var speed = this.speed / m.timer.fps;
    var sprite = this.findComponent( m.Base.TYPE.SPRITE );

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

  Bullet.prototype.reset = function() {
    this.isActive = false;
    this.isVisible = false;
    this.position.set( -2000, 3000, 0 );
  };

  return Bullet;
} );