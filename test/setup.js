require.config(
  {
    baseUrl: '../src',
    paths: {
      lib: '../lib'
    }
  }
);

function assert( outcome, description, target, object ) {
  var resultDiv = document.createElement( 'div' );
  resultDiv.className = outcome ? 'pass' : 'fail';
  resultDiv.appendChild( document.createTextNode( description ) );

  var testDiv = document.getElementById( 'test' );

  if( document.getElementById( target ) == null ) {
    var targetDiv = document.createElement( 'div' );
    var targetTitle = document.createElement( 'h3' );

    targetTitle.id = target;
    targetTitle.appendChild( document.createTextNode( target ) );

    targetDiv.appendChild( targetTitle );
    testDiv.appendChild( targetDiv );
  }

  document.getElementById( target ).appendChild( resultDiv );

  if( object ) {
    console.log( target, description, object );
  }
}
