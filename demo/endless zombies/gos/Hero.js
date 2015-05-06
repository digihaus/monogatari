define( [ 'Monogatari', 'buffers/Bullets' ], function( m, bullets ) {

  var hero = new m.GameObject( 'hero' );

  // centers the hero on the screen
  hero.position.set( m.sceneManager.canvasWidth / 2, m.sceneManager.canvasHeight / 2, 0 );

  var sprite = new m.Sprite( 'assets/sprites/generico_tosco.png', 64, 64 );
  hero.addComponent( sprite );
  hero.life = 100;

  hero.update = function() {
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

  return hero;
} );