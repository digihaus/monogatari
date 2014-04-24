// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]

/* this is the base class all engine components should extend */
Monogatari.Component = Class.extend( {
  init : function(){
    this.componentType = Monogatari.Constants.COMPONENT_BASE;
  }
} );