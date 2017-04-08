define(
  [ 'collection/Map' ], function( Map ) {
    var CanvasPool = {};
    CanvasPool.pool = new Map();
    return CanvasPool;
  }
);