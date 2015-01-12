require.config( {
  baseUrl : '../src',
  paths: {
      lib: '../lib'
  }
} );

function assert( outcome, description, package, object ) {
    var div = document.createElement( 'div' );
    div.className = outcome ? 'pass' : 'fail';
    div.appendChild( document.createTextNode( description ) );

    document.getElementById( package ).appendChild( div );

    if( object ) {
      console.log( package, description, object );
    }
};
