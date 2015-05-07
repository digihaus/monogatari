define( [ 'Monogatari', 'go/Hero' ], function( m, Hero ) {

  var NUM_ZOMBIES = 30;
  var ZOMBIE_LIFE = 2;
  var ZOMBIE_SPEED = 150;
  var ZOMBIE_ATTACK_SPEED = 150;
  var ZOMBIE_ANIMATION_SPEED = 300;

  var instance = null;

  var Zombies = function() {

    var r = new m.Random();

    this.buffer = new m.Map();
    this.bufferIt = this.buffer.iterator();

    var zombie = null;

    for ( var i = 0; i < NUM_ZOMBIES; i++ ) {
      var sprite = new m.Sprite( 'assets/sprites/zombies2.png', 64, 64, 1, 3 );
      zombie = new m.GameObject( 'zombie_' + i );
      zombie.position.set( -2000, 2000, 0 );
      zombie.isActive = false;
      zombie.isVisible = false;
      zombie.lastUpdate = 0;

      zombie.addComponent( sprite );

      zombie.lastAttackUpdate = 0;
      zombie.life = ZOMBIE_LIFE;
      zombie.speed = ZOMBIE_SPEED;
      zombie.attackInterval = ZOMBIE_ATTACK_SPEED;
      zombie.animationSpeed = ZOMBIE_ANIMATION_SPEED;

      zombie.reset = function() {
        this.isActive = false;
        this.isVisible = false;
        this.lastUpdate = 0;
        this.position.set( -2000, 2000, 0 );
        this.life = ZOMBIE_LIFE;
      }

      zombie.attack = function() {
        if ( ( m.timer.time - this.lastAttackUpdate ) > this.attackInterval ) {
          Hero.life--;
          this.lastAttackUpdate = m.timer.time;
        }
      }

      zombie.update = function() {
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

      m.sceneManager.attachToScene( zombie );
      m.world.children.push( zombie );
      this.buffer.put( zombie.id, zombie );
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