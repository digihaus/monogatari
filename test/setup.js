require(['../../paths'], function( paths ) {

  console.log(paths);

  require.config({
    baseUrl: '../../src',
    paths: paths
  });
});