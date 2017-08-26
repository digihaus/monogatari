m = Monogatari; 
m.init( "#000" );
startGame();

function startGame() {
  require( [ 'zombies/go/single/Hero', 'zombies/buffer/Bullets', 'zombies/buffer/Zombies', 'zombies/util/Collider' ], //
  function( Hero, Bullets, Zombies, Collider ) {

    var score = 0;
    var gameOver = false;

    m.world.update = function() {
      if ( !gameOver ) {
        Zombies.spawn();
        score = Collider.checkCollisions( score );

        if ( Hero.dead ) {
          gameOver = true;
          Zombies.clear();

          var zombiesKilled = score + ' zombies killed.';
          if ( score === 0 ) {
            zombiesKilled = 'No zombies killed.';
          }
          if ( score === 1 ) {
            zombiesKilled = '1 zombie killed.';
          }

          var restart = confirm( 'You died!\n\n' //
              + zombiesKilled + '\n\n' //
              + 'Start again?' );

          if ( restart ) {
            location.reload();
          }
        }
      }
    };

    m.run();
  } );
}