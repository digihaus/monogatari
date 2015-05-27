(function() {

  require.config(
    {
      baseUrl: '../../src',
      paths: {
        lib: '../lib'
      }
    }
  );

  var testModules = [
    'unit_collection.js'//,
    //'unit_core.js',
    //'unit_component.js',
    //'unit_input.js',
    //'unit_manager.js'
  ];

  require(
    testModules, function() {
      QUnit.load();
      QUnit.start();
    }
  );

}());