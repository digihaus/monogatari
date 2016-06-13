require.config({
  baseUrl: '../../src'
});
require(['../config/paths'], function( paths ) {

  paths.zombies = '../demo/zombies';

  require.config({
    paths: paths,
  });
});