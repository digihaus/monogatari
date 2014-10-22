// [ b2BodyDef ] http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2BodyDef.html
// [ b2FixtureDef ] http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2FixtureDef.html

// Box2D has been tuned to work well with moving objects between 0.1 and 10 meters. So this means
// objects between soup cans and buses in size should work well. Static objects may be up to 50 meters big
// without too much trouble.
// Box2D is tuned for meters, kilograms, and seconds
define(['core/Monogatari', 'core/Constants', 'engine/entity/component/Component', 'lib/Box2d'], function() {
	Monogatari.RigidBody = Monogatari.Component.extend( {
	  init : function( conversionFactor ) {
		this.bodyDef = new b2BodyDef();
		this.materialDef = new b2FixtureDef();
		this.body = null;

		// conversionFactor is the value used to multiply the position from physics world (meters)
		// to screen coordinates (pixels)
		// if no value is presented, the factor will be 1 (probably not what you expect)
		this.conversionFactor = ( conversionFactor ) ? conversionFactor : 1;

		this.materialDef.shape = new b2PolygonShape();
		this.materialDef.shape.SetAsBox( 0.5, 0.5 );

		this.componentType = Monogatari.Constants.COMPONENT_RIGID_BODY;
	  },

	  // in kg/m^2.
	  setDensity : function( density ) {
		this.materialDef.density = density;
	  },

	  // usually in the range [0,1].
	  setFriction : function( friction ) {
		this.materialDef.friction = friction;
	  },

	  // usually in the range [0,1].
	  setBounciness : function( bounciness ) {
		this.materialDef.restitution = bounciness;
	  },

	  // coordinates in physics world, NOT in pixels or game world, a proper scale is required to draw
	  setPosition : function( position ) {
		this.bodyDef.position.x = position.x;
		this.bodyDef.position.y = position.y;
	  },

	  // in radians
	  setRotation : function( angle ) {
		this.bodyDef.angle = angle;
	  },

	  // The shape, this must be set
	  setShape : function( shape ) {
		this.materialDef.shape = shape;
	  },

	  // prevent the collision to be resolved by Box2D, but retains collision information
	  setSensor : function( isSensor ) {
		this.materialDef.isSensor = isSensor;
	  },

	  // expensive! use with care!
	  setPreventTunneling : function( preventTunneling ) {
		this.bodyDef.bullet = preventTunneling;
	  },

	  // b2_staticBody A static body has does not move under simulation and behaves as if it has infinite mass. Internally,
	  // Box2D stores zero for the mass and the inverse mass. Static bodies can be moved manually by the user. A static body
	  // has zero velocity. Static bodies do not collide with other static or kinematic bodies.
	  // 
	  // b2_kinematicBody A kinematic body moves under simulation according to its velocity. Kinematic bodies do not respond
	  // to forces. They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
	  // A kinematic body behaves as if it has infinite mass, however, Box2D stores zero for the mass and the inverse mass.
	  // Kinematic bodies do not collide with other static or kinematic bodies.
	  // 
	  // b2_dynamicBody A dynamic body is fully simulated. They can be moved manually by the user, but normally they move
	  // according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero
	  // mass.
	  // If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram.
	  setType : function( type ) {
		switch ( type ) {
		case Monogatari.Constants.PHYSICS_BODYTYPE_STATIC:
		  this.bodyDef.type = b2Body.b2_staticBody;
		  break;
		case Monogatari.Constants.PHYSICS_BODYTYPE_KINEMATIC:
		  this.bodyDef.type = b2Body.b2_kinectBody;
		  break;
		case Monogatari.Constants.PHYSICS_BODYTYPE_DYNAMIC:
		  this.bodyDef.type = b2Body.b2_dynamicBody;
		  break;
		default:
		  this.bodyDef.type = b2Body.b2_staticBody;
		  break;
		}
	  },

	  // constraints
	  setAllowRotation : function( allowRotation ) {
		this.bodyDef.fixedRotation = !allowRotation;
	  }
	} );
});