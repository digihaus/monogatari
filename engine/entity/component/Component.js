/* this is the base class all engine components should extend */
define(['core/Monogatari', 'core/Constants'], function() {
	Monogatari.Component = Class.extend( {
	  init : function() {
		this.componentType = Monogatari.Constants.COMPONENT_BASE;
	  }
	} );
});