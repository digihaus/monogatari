define( [ 'Monogatari', 'go/single/Hero' ], function( m, Hero ) {

  var LIFE = 2;
  var SPEED = 80;
  var ATTACK_SPEED = 150;
  var ANIMATION_SPEED = 300;

  var r = new m.Random();

  var Zombie = function( id ) {
    m.GameObject.call( this, 'zombie_' + id )

    this.addComponent( new m.Sprite( 'assets/sprites/zombies.png', 64, 64, 3, 3 ) );
    this.init();

    m.sceneManager.attachToScene( this );
    m.world.children.push( this );
  };

  Zombie.prototype = Object.create( m.GameObject.prototype );

  Zombie.prototype.init = function() {
    this.isActive = false;
    this.isVisible = false;
    this.position.set( -2000, 2000, 0 );
    this.life = LIFE;
    this.speed = SPEED;
    this.attackInterval = ATTACK_SPEED;
    this.animationSpeed = ANIMATION_SPEED;
    this.lastAttackUpdate = 0;
    this.bersek = false;
  };

  Zombie.prototype.update = function() {
    if ( this.isActive ) {
      var sprite = this.findComponent( m.Base.SPRITE );
      var speed = this.speed / m.timer.fps;

      this.lookAt( Hero.position );

      this.position.x += this.rotation.x * speed;
      this.position.y += this.rotation.y * speed;

      var startFrame = this.bersek ? 4 : 1;

      if ( ( m.timer.time - sprite.lastUpdate ) > this.animationSpeed ) {
        var frameNumber = sprite.getFrame();

        if ( frameNumber >= ( startFrame + 2 ) ) {
          frameNumber = startFrame;
        } else {
          frameNumber++;
        }

        sprite.setFrame( frameNumber );
        sprite.lastUpdate = m.timer.time;
      }

      if ( this.position.x < -64 //
          || this.position.x > m.sceneManager.canvasWidth + 64 //
          || this.position.y < -64 //
          || this.position.y > m.sceneManager.canvasHeight + 64 //
          || this.life <= 0 ) {
        this.init();
      }
    }
  };

  Zombie.prototype.attack = function() {
    if ( ( m.timer.time - this.lastAttackUpdate ) > this.attackInterval ) {
      Hero.receiveAttack();
      this.lastAttackUpdate = m.timer.time;
    }
  };

  Zombie.prototype.receiveShoot = function() {
    this.life--;
  };

  Zombie.prototype.goBersek = function() {
    this.bersek = true;
    this.life = LIFE * 3;
    this.speed = SPEED * 3.5;
    this.attackInterval = 0;
    this.animationSpeed = ANIMATION_SPEED / 3;
  };

  return Zombie;
} );