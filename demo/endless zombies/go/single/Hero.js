define( [ 'Monogatari', 'buffer/Bullets' ], function( m, bullets ) {

  var instance = null;

  var Hero = function() {
    m.GameObject.call( this, 'hero' );

    // centers the hero on the screen
    this.position.set( m.sceneManager.canvasWidth / 2, m.sceneManager.canvasHeight / 2, 0 );

    var sprite = new m.Sprite( 'assets/sprites/generico_tosco.png', 64, 64 );
    this.addComponent( sprite );
    this.life = 100;

    this.update = function() {
      var speed = 200 / m.timer.fps;

      if ( m.keyboard.isDown( m.keyboard.W ) )
        this.position.y -= speed;
      if ( m.keyboard.isDown( m.keyboard.A ) )
        this.position.x -= speed;
      if ( m.keyboard.isDown( m.keyboard.S ) )
        this.position.y += speed;
      if ( m.keyboard.isDown( m.keyboard.D ) )
        this.position.x += speed;

      if ( m.keyboard.isDown( m.keyboard.UP_ARROW ) )
        this.position.y -= speed;
      if ( m.keyboard.isDown( m.keyboard.LEFT_ARROW ) )
        this.position.x -= speed;
      if ( m.keyboard.isDown( m.keyboard.DOWN_ARROW ) )
        this.position.y += speed;
      if ( m.keyboard.isDown( m.keyboard.RIGHT_ARROW ) )
        this.position.x += speed;

      if ( m.mouse.isDown( m.mouse.LMB ) )
        bullets.shoot( this.position.x, this.position.y );

      this.lookAt( m.mouse.position );
    };
  }

  Hero.prototype = Object.create( m.GameObject.prototype );

  Hero.getInstance = function() {
    if ( instance === null ) {
      instance = new Hero();
    }
    return instance;
  }

  return Hero.getInstance();
} );