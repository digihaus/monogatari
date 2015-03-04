function zombies(){
var MAX_BULLETS = 40;
var BULLET_SPEED = 450;
var TIME_BETWEEN_SHOTS = 600;

var world = Monogatari.ObjectManager.create( 'world' );

//bullets
function createBullets() {
  var id;
  var bullet;

  for ( var i = 0; i < MAX_BULLETS; i++ ) {
    id = 'bullet-' + i;
    bullet = Monogatari.ObjectManager.create( id );

    bullet.isActive = false;
    bullet.isVisible = false;
    bullet.addComponent( 'node', new Monogatari.Node( new THREE.Vector3( -2000, -2000, 0 ) ) );
    var bulletSprite = new Monogatari.Sprite( 'assets/sprites/bullet.png', 'mainScene', 16, 16, 2, 1 );
    bulletSprite.getMaterial().transparent = true;

    bullet.addComponent( 'sprite', bulletSprite );
    bullet.speed = BULLET_SPEED;

    // Função externa que recebe um Go e trabalha com os valores dele
	bullet.reset = function() {
      var node = this.findComponent( 'node' );
      var sprite = this.findComponent( 'sprite' );
      this.isActive = false;
      this.isVisible = false;
      node.position.x = -2000;
      node.position.y = -2000;
      node.position.z = -0;
      sprite.getMesh().position = node.position;
    };

    bullet.update = function() {
      var node = this.findComponent( 'node' );
      var speed = ( this.speed * ( 1 / FPS ) );
      var sprite = this.findComponent( 'sprite' );
      var animationSpeed = 300;

      if ( Monogatari.Time.compare( sprite.lastUpdate ) > animationSpeed ) {
        sprite.nextFrame();
        sprite.lastUpdate = Monogatari.Time.getTime();
      }

      node.position.x += this.buf.x * speed;
      node.position.y += - ( this.buf.y ) * speed;
      node.position.z = 0;

      sprite.getMesh().position = node.position;

      if ( node.position.x < - ( Monogatari.SceneManager._canvasWidth / 2 ) || node.position.x > Monogatari.SceneManager._canvasWidth / 2
          || node.position.y < - ( Monogatari.SceneManager._canvasHeight / 2 ) || node.position.y > Monogatari.SceneManager._canvasHeight / 2 )
        this.reset();

    };
    bullet.reset();

    Monogatari.ObjectManager.connect( 'world', id );
  }
};
createBullets();

var lastShot = 0;
function shoot( fromX, fromY ) {
  var it = Monogatari.ObjectManager.getObjectIterator();
  var node;

  if ( Monogatari.Time.compare( lastShot ) > TIME_BETWEEN_SHOTS ) {
    it.first();

    while ( it.hasNext() ) {
      obj = it.next();

      if ( obj ) {
        if ( Monogatari.String.startsWith( obj.id, 'bullet' ) && !obj.isActive && !obj.isVisible ) {
          node = obj.findComponent( 'node' );
          sprite = obj.findComponent( 'sprite' );
          var mousePos = Monogatari.Mouse.position.clone();

          obj.isActive = true;
          obj.isVisible = true;

          node.position.x = fromX;
          node.position.y = fromY;
          node.position.z = -1;

          mousePos.sub( new THREE.Vector3( ( Monogatari.SceneManager._canvasWidth / 2 ), ( Monogatari.SceneManager._canvasHeight / 2 ), 0 ) );

          var p = new THREE.Vector3( fromX, -fromY, 0 );

          var r = new THREE.Vector3();
          r.x = ( p.x ) - ( mousePos.x );
          r.y = ( p.y ) - ( mousePos.y );
          r.z = ( p.z ) - ( mousePos.z );
          r.normalize();

          node.rotation.x = r.x;
          node.rotation.y = r.y;
          node.rotation.z = r.z;

          obj.buf = r.clone();
          obj.buf.normalize();
          obj.buf.negate();

          sprite.getMesh().position = node.position;
          sprite.getMesh().rotation.z = obj.getRotationToTarget( mousePos );

          lastShot = Monogatari.Time.time;
          return;
        }
      }
    }

  }
}
// bullets

// zombies
var NUM_ZOMBIES = 15;
var ZOMBIE_LIFE = 2;
var ZOMBIE_SPEED = 100;
var ZOMBIE_ATTACK_SPEED = 200;
function createZombies() {
  var id;
  var zombie;

  for ( var i = 0; i < NUM_ZOMBIES; i++ ) {
    id = 'zombie-' + i;
    zombie = Monogatari.ObjectManager.create( id );

    zombie.isActive = false;
    zombie.isVisible = false;
    zombie.lastUpdate = 0;
    zombie.lastAttackUpdate = 0;
    zombie.addComponent( 'node', new Monogatari.Node( new THREE.Vector3( -2000, -2000, 0 ) ) );

    var zombieSprite = new Monogatari.Sprite( 'assets/sprites/zombies.png', 'mainScene', 64, 64, 3, 3 );
    zombieSprite.getMaterial().transparent = true;

    zombie.addComponent( 'sprite', zombieSprite );
    zombie.life = ZOMBIE_LIFE;
    zombie.speed = ZOMBIE_SPEED;
    zombie.attackSpeed = ZOMBIE_ATTACK_SPEED;

    zombie.reset = function() {
      var node = this.findComponent( 'node' );
      var sprite = this.findComponent( 'sprite' );

      this.lastUpdate = 0;
      this.isActive = false;
      this.isVisible = false;
      this.life = ZOMBIE_LIFE;
      node.position.x = -2000;
      node.position.y = -2000;
      node.position.z = 0;
      sprite.getMesh().position = node.position;
    };

    zombie.attack = function() {
      var h = Monogatari.ObjectManager.get( 'hero' );
      if ( Monogatari.Time.compare( this.lastAttackUpdate ) > this.attackSpeed ) {
        h.life--;
        this.lastAttackUpdate = Monogatari.Time.time;
      }
    };

    zombie.update = function() {
      var node = this.findComponent( 'node' );
      var h = Monogatari.ObjectManager.get( 'hero' );
      var hnode = h.findComponent( 'node' );
      var speed = ( this.speed * ( 1 / FPS ) );

      var sprite = this.findComponent( 'sprite' );
      var animationSpeed = 400;

      var p = hnode.position.clone();
      p.y = -p.y;

      var r = new THREE.Vector3();
      r.x = ( p.x ) - ( node.position.x );
      r.y = - ( p.y ) - ( node.position.y );
      r.z = 0;
      r.normalize();

      node.position.x += r.x * speed;
      node.position.y += r.y * speed;
      node.position.z += 0;

      if ( node.position.x < - ( Monogatari.SceneManager._canvasWidth / 2 ) - 64
          || node.position.x > ( Monogatari.SceneManager._canvasWidth / 2 ) + 64
          || node.position.y < - ( Monogatari.SceneManager._canvasHeight / 2 ) - 64
          || node.position.y > ( Monogatari.SceneManager._canvasHeight / 2 ) + 64 )
        this.reset();

      if ( Monogatari.Time.compare( sprite.lastUpdate ) > animationSpeed ) {
        sprite.nextFrame();
        sprite.lastUpdate = Monogatari.Time.getTime();
      }

      sprite.getMesh().position = node.position;
      sprite.getMesh().rotation.z = this.getRotationToTarget( p );
      sprite.getMesh().scale = node.scale;
    };
    zombie.reset();
  }
};
createZombies();

function placeZombie() {
  var it = Monogatari.ObjectManager.getObjectIterator();
  var node;

  it.first();

  while ( it.hasNext() ) {
    obj = it.next();

    if ( obj ) {
      if ( Monogatari.String.startsWith( obj.id, 'zombie' ) && !obj.isActive && !obj.isVisible ) {
        node = obj.findComponent( 'node' );
        obj.isActive = true;
        obj.isVisible = true;

        var rand = Math.floor( ( Math.random() * 6 ) + 1 );
        switch ( rand ) {
        case 1:
          node.position.x = Math.random() * ( Monogatari.SceneManager._canvasWidth / 2 );
          node.position.y = - ( Monogatari.SceneManager._canvasHeight / 2 ) - 63;
          node.position.z = 0;
          break;
        case 2:
          node.position.x = - ( Monogatari.SceneManager._canvasWidth / 2 ) - 63;
          node.position.y = Math.random() * ( Monogatari.SceneManager._canvasHeight / 2 );
          node.position.z = 0;
          break;
        case 3:
          node.position.x = ( Monogatari.SceneManager._canvasWidth / 2 ) + 63;
          node.position.y = Math.random() * ( Monogatari.SceneManager._canvasHeight / 2 );
          node.position.z = 0;
          break;
        case 4:
          node.position.x = Math.random() * ( Monogatari.SceneManager._canvasWidth / 2 );
          node.position.y = ( Monogatari.SceneManager._canvasHeight / 2 ) + 63;
          node.position.z = 0;
          break;
        case 5:
          node.position.x = Math.random() * - ( Monogatari.SceneManager._canvasWidth / 2 );
          node.position.y = - ( Monogatari.SceneManager._canvasHeight / 2 ) - 63;
          node.position.z = 0;
          break;
        case 6:
          node.position.x = - ( Monogatari.SceneManager._canvasWidth / 2 ) - 63;
          node.position.y = Math.random() * - ( Monogatari.SceneManager._canvasHeight / 2 );
          node.position.z = 0;
          break;
        }

        return;
      }
    }
  }
}
// zombies

// hero
var HERO_LIFE = 100;
var score = 0;
var hero = Monogatari.ObjectManager.create( 'hero' );
hero.life = HERO_LIFE;

hero.addComponent( 'node', new Monogatari.Node( new THREE.Vector3( 0, 0, 0 ) ) );

var sprite = new Monogatari.Sprite( 'assets/sprites/generico_tosco.png', 'mainScene', 64, 64 );
sprite.getMaterial().transparent = true;

hero.addComponent( 'sprite', sprite );

hero.update = function() {
  var node = this.findComponent( 'node' );
  var sprite = this.findComponent( 'sprite' );
  var mousePos = Monogatari.Mouse.position.clone();
  var speed = 3;

  if ( Monogatari.Mouse.isDown( Monogatari.Mouse.MOUSE_LMB ) )
    shoot( node.position.x, node.position.y );

  if ( Monogatari.Keyboard.isDown( Monogatari.Keyboard.KEY_W ) )
    node.position.y += speed;

  if ( Monogatari.Keyboard.isDown( Monogatari.Keyboard.KEY_A ) )
    node.position.x -= speed;

  if ( Monogatari.Keyboard.isDown( Monogatari.Keyboard.KEY_S ) )
    node.position.y -= speed;

  if ( Monogatari.Keyboard.isDown( Monogatari.Keyboard.KEY_D ) )
    node.position.x += speed;

  mousePos.sub( new THREE.Vector3( ( Monogatari.SceneManager._canvasWidth / 2 ), ( Monogatari.SceneManager._canvasHeight / 2 ), 0 ) );

  sprite.getMesh().position = node.position;
  sprite.getMesh().rotation.z = this.getRotationToTarget( mousePos );
  sprite.getMesh().scale = node.scale;
};

hero.die = function() {
  var sprite = this.findComponent( 'sprite' );
  sprite.getMesh().position.x = -2000;
  sprite.getMesh().position.y = -2000;
};

Monogatari.ObjectManager.connect( 'world', 'hero' );
// hero

// collisions
function checkCollisions() {
  var it = Monogatari.ObjectManager.getObjectIterator();
  var zombies = [];
  var bullets = [];
  var obj;

  var h = Monogatari.ObjectManager.get( 'hero' );
  var hNode = h.findComponent( 'node' );

  it.first();

  while ( it.hasNext() ) {
    obj = it.next();

    if ( obj ) {
      if ( Monogatari.String.startsWith( obj.id, 'bullet' ) && obj.isActive && obj.isVisible ) {
        bullets.push( obj );
      } else {
        if ( Monogatari.String.startsWith( obj.id, 'zombie' ) && obj.isActive && obj.isVisible ) {
          zombies.push( obj );
        }
      }
    }
  }

  for ( var i = 0, blen = bullets.length; i < blen; i++ ) {
    for ( var j = 0, zlen = zombies.length; j < zlen; j++ ) {

      if ( collision( bullets[ i ].findComponent( 'node' ).position, 16, zombies[ j ].findComponent( 'node' ).position, 64 ) ) {
        bullets[ i ].reset();
        zombies[ j ].life--;

        if ( zombies[ j ].life <= 0 ) {
          zombies[ j ].reset();
          score++;
        }
      }

    }
  }

  for ( var i = 0, len = zombies.length; i < len; i++ ) {
    if ( collision( hNode.position, 64, zombies[ i ].findComponent( 'node' ).position, 64 ) ) {
      zombies[ i ].attack();
    }
  }

};

function collision( positionA, radiusA, positionB, radiusB ) {
  var dist = positionA.distanceTo( positionB );
  var radius = radiusA + radiusB;
  return ( dist < radius ) ? true : false;
}
// collisions

// world
var gameOver = false;
function checkForGameOver() {
  var h = Monogatari.ObjectManager.get( 'hero' );

  if ( h.life <= 0 && !gameOver ) {
    alert( "Você Morreu!\n Você levou " + score + " zumbís com você" );
    h.die();
    h.update = function() {};
    gameOver = true;
  }
}

world.update = function() {
  FPS = Monogatari.Frames.getFps();
  placeZombie();
  checkCollisions();
  checkForGameOver();
};
// world

}