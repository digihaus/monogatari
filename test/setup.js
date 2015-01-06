require.config( {
  baseUrl : '../src',
  paths: {
      lib: '../lib'
  }
} );

function assert( outcome, description, object ) {
    var div = document.createElement('div');
    div.className = outcome ? 'pass' : 'fail';
    div.appendChild( document.createTextNode( description ) );

    document.getElementById('test').appendChild(div);

    if( object ) {
      console.log( description, object );
    }
};
