/**
 * This is the base Class all engine Components should extend.
 */
define( [ 'core/Monogatari', 'core/Constants' ], function() {
  Monogatari.Component = Class.extend( {
    init : function() {
      this.componentType = Monogatari.Constants.COMPONENT_BASE;
    }
  } );
} );