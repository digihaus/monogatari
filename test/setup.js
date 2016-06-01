require.config({
  baseUrl: '../../src'
});
require(['../config/paths'], function( paths ) {
  require.config({
    paths: paths
  });
});