require.config( {
  baseUrl : '../src',
  paths: {
      lib: '../lib'
  }
} );

function assert( outcome, description ) {
    var output = document.getElementById('test');
    var div = document.createElement('div');
    div.className = outcome ? 'pass' : 'fail';
    div.appendChild( document.createTextNode( description ) );
    output.appendChild(div);
};
