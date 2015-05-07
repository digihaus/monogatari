define( [ 'Monogatari', 'go/single/Hero' ], function( m, Hero ) {

  var ZOMBIE_LIFE = 2;
  var ZOMBIE_SPEED = 80;
  var ZOMBIE_ATTACK_SPEED = 150;
  var ZOMBIE_ANIMATION_SPEED = 300;

  var r = new m.Random();

  var Zombie = function( id ) {
    m.GameObject.call( this, 'zombie_' + id )

    this.position.set( -2000, 2000, 0 );
    this.isActive = false;
    this.isVisible = false;
    this.lastUpdate = 0;

    this.bersek = false;

    this.addComponent( new m.Sprite( 'assets/sprites/zombies.png', 64, 64, 3, 3 ) );

    this.lastAttackUpdate = 0;
    this.life = ZOMBIE_LIFE;
    this.speed = ZOMBIE_SPEED;
    this.attackInterval = ZOMBIE_ATTACK_SPEED;
    this.animationSpeed = ZOMBIE_ANIMATION_SPEED;

    this.reset = function() {
      this.isActive = false;
      this.isVisible = false;
      this.lastUpdate = 0;
      this.position.set( -2000, 2000, 0 );
      this.life = ZOMBIE_LIFE;
      this.speed = ZOMBIE_SPEED;
      this.attackInterval = ZOMBIE_ATTACK_SPEED;
      this.animationSpeed = ZOMBIE_ANIMATION_SPEED;
      this.bersek = false;
    };

    this.attack = function() {
      if ( ( m.timer.time - this.lastAttackUpdate ) > this.attackInterval ) {
        Hero.life--;
        this.lastAttackUpdate = m.timer.time;
      }
    };

    this.update = function() {
      if ( this.isActive ) {
        var sprite = this.findComponent( m.Base.SPRITE );
        var speed = this.speed / m.timer.fps;

        this.lookAt( Hero.position );

        this.position.x += this.rotation.x * speed;
        this.position.y += this.rotation.y * speed;

        var startFrame = this.bersek ? 4 : 1;

        if ( ( m.timer.time - sprite.lastUpdate ) > this.animationSpeed //
            && r.integer( { min : 1, max : 2 } ) ) {

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
            || this.position.y > m.sceneManager.canvasHeight + 64 ) {
          this.reset();
        }
      }
    };

    this.goBersek = function() {
      this.bersek = true;
      this.life = ZOMBIE_LIFE * 3;
      this.speed = ZOMBIE_SPEED * 3.5;
      this.attackInterval = 0;
      this.animationSpeed = ZOMBIE_ANIMATION_SPEED / 3;
    }

    m.sceneManager.attachToScene( this );
    m.world.children.push( this );
  };

  Zombie.prototype = Object.create( m.GameObject.prototype );

  return Zombie;
} );