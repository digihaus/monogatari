define( [ 'Monogatari', 'go/single/Hero' ], function( m, Hero ) {

  var ZOMBIE_LIFE = 2;
  var ZOMBIE_SPEED = 150;
  var ZOMBIE_ATTACK_SPEED = 150;
  var ZOMBIE_ANIMATION_SPEED = 300;

  var r = new m.Random();

  var Zombie = function( id ) {
    m.GameObject.call( this, 'zombie_' + id )

    this.position.set( -2000, 2000, 0 );
    this.isActive = false;
    this.isVisible = false;
    this.lastUpdate = 0;

    var sprite = new m.Sprite( 'assets/sprites/zombies2.png', 64, 64, 1, 3 );

    this.addComponent( sprite );

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
    }

    this.attack = function() {
      if ( ( m.timer.time - this.lastAttackUpdate ) > this.attackInterval ) {
        Hero.life--;
        this.lastAttackUpdate = m.timer.time;
      }
    }

    this.update = function() {
      if ( this.isActive ) {
        var sprite = this.findComponent( m.Base.SPRITE );
        var speed = this.speed / m.timer.fps;

        this.lookAt( Hero.position );

        this.position.x += this.rotation.x * speed;
        this.position.y += this.rotation.y * speed;

        if ( ( m.timer.time - sprite.lastUpdate ) > this.animationSpeed && r.integer( {
          min : 1,
          max : 2
        } ) ) {
          sprite.nextFrame();
          sprite.lastUpdate = m.timer.time;
        }

        if ( this.position.x < -64 || this.position.x > m.sceneManager.canvasWidth + 64 || this.position.y < -64
            || this.position.y > m.sceneManager.canvasHeight + 64 ) {
          this.reset();
        }

      }
    }

  };

  Zombie.prototype = Object.create( m.GameObject.prototype );

  return Zombie;
} );