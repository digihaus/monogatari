define( [ 'Monogatari', 'zombies/buffer/Bullets' ], function( m, Bullets ) {

  var BLINK_SPEED = 50;

  var instance = null;

  var Hero = function() {
    m.GameObject.call( this, 'hero' );

    this.addComponent( new m.Sprite( 'assets/sprites/generico_tosco2.png', 64, 64, 1, 2 ) );
    this.init();
    
    m.world.children.push( this );
  };

  Hero.prototype = Object.create( m.GameObject.prototype );

  Hero.prototype.init = function() {
    this.life = 100;
    this.dead = false;
    this.isActive = true;
    this.lastUpdate = 0;
    this.lastReceivedAttack = 0;

    this.position.set( m.sceneManager.canvasWidth / 2, m.sceneManager.canvasHeight / 2, 0 );
  };

  Hero.prototype.update = function() {
    if ( !this.dead ) {

      var speed = 200 / m.timer.fps;

      if ( m.keyboard.isDown( m.KB_KEY.W ) )
        this.position.y -= speed;
      if ( m.keyboard.isDown( m.KB_KEY.A ) )
        this.position.x -= speed;
      if ( m.keyboard.isDown( m.KB_KEY.S ) )
        this.position.y += speed;
      if ( m.keyboard.isDown( m.KB_KEY.D ) )
        this.position.x += speed;

      if ( m.keyboard.isDown( m.KB_KEY.UP_ARROW ) )
        this.position.y -= speed;
      if ( m.keyboard.isDown( m.KB_KEY.LEFT_ARROW ) )
        this.position.x -= speed;
      if ( m.keyboard.isDown( m.KB_KEY.DOWN_ARROW ) )
        this.position.y += speed;
      if ( m.keyboard.isDown( m.KB_KEY.RIGHT_ARROW ) )
        this.position.x += speed;

      if ( m.mouse.isDown( m.MOUSE_BTN.LMB ) ) {
        Bullets.shoot( this.position.x, this.position.y );
      }

      this.lookAt( m.mouse.position );

      var sprite = this.findComponent( m.Base.TYPE.SPRITE );

      if ( ( m.timer.time - this.lastReceivedAttack ) < BLINK_SPEED ) {
        sprite.setFrame( 2 );
      } else {
        sprite.setFrame( 1 );
      }

      if ( this.life < 0 ) {
        this.dead = true;
        this.position.set( -2000, 2000, 0 );
      }

      if ( this.position.x > m.sceneManager.canvasWidth + 8 ) {
        this.position.x = -4;
      }
      if ( this.position.x < -8 ) {
        this.position.x = m.sceneManager.canvasWidth + 4;
      }
      if ( this.position.y > m.sceneManager.canvasHeight + 8 ) {
        this.position.y = -4;
      }
      if ( this.position.y < -8 ) {
        this.position.y = m.sceneManager.canvasHeight + 4;
      }
    }
  };

  Hero.prototype.receiveAttack = function() {
    this.life--;
    this.lastReceivedAttack = m.timer.time;
  };

  Hero.getInstance = function() {
    if ( instance === null ) {
      instance = new Hero();
    }
    return instance;
  };

  return Hero.getInstance();
} );