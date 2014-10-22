define(['core/Monogatari'], function() {
	Monogatari.Constants = new MonogatariConstants();
	
	function MonogatariConstants() {

	  this.BROWSER_ANDROID = 1;
	  this.BROWSER_CHROME = 2;
	  this.BROWSER_FIREFOX = 3;
	  this.BROWSER_IOS = 4;
	  this.BROWSER_SAFARI = 5;
	  this.BROWSER_OPERA = 6;
	  this.BROWSER_BLACKBERRY = 7;
	  this.BROWSER_IE = 8;

	  this.MODE_DEBUG = 1;
	  this.MODE_RELEASE = 2;

	  this.FRAME_RATE_60FPS = 0.016666666667; // 1.0 second / 60.0 frames;

	  this.ONE_MEGABYTE = 1048576; // 1024 kilobytes * 1024 bytes

	  // Math constants
	  this.RADTODEG = 57.295779513082;
	  this.DEGTORAD = 0.0174532925199;

	  this.SQRT_2 = 1.41421356237;

	  this.PI = 3.14159265358979;
	  this.PI_2 = 6.28318530717958; // 2 * PI

	  this.PI_OVER_180 = 0.0174532925199; // 433; // PI / 180
	  this.PI_OVER_360 = 0.0087266462599; // 716; // PI / 360

	  // same as PI_OVER_180, just for coding convenience
	  this.ONE_DEGREE = this.PI_OVER_180;

	  // asset state
	  this.ASSET_STATE_LOADING = 1;
	  this.ASSET_STATE_LOADED = 2;
	  this.ASSET_STATE_FAILED = 3;

	  // audio state
	  this.AUDIO_STATE_STOPED = 0;
	  this.AUDIO_STATE_PLAYING = 1;
	  this.AUDIO_STATE_PAUSED = 2;
	  this.AUDIO_STATE_FINISHED = 3;

	  // component state
	  this.COMPONENT_STATE_INITIALIZING = 0;
	  this.COMPONENT_STATE_BUFFERING = 1;
	  this.COMPONENT_STATE_READY = 2;
	  this.COMPONENT_STATE_FAILED = 3;

	  // components
	  this.COMPONENT_BASE = 0;
	  this.COMPONENT_NODE = 1;
	  this.COMPONENT_THREE_OBJECT = 2;
	  this.COMPONENT_RIGID_BODY = 3;
	  this.COMPONENT_SPRITE = 4;
	  this.COMPONENT_STATIC_TEXT = 5;
	  this.COMPONENT_AUDIO_SOURCE = 6;
	  this.COMPONENT_PARTICLE_EMITTER = 7;

	  // this.COMPONENT_AUDIO_LISTENER = 1;
	  // this.COMPONENT_PACKAGE_SENDER = 1;
	  // this.COMPONENT_PACKAGE_LISTENER = 1;

	  this.COMPONENT_CUSTOM = -1;

	  this.FONT_CHARS_SIMPLE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_()-,.[]!?@$* ";
	  // this.FONT_CHARS_EXTENDED = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789Á«·ÈÌÛ˙¡…Õ”⁄‡ËÏÚ˘¿»Ã“Ÿ‰ÎÔˆ¸ƒÀœ÷‹„ıÒ√’—‚ÍÓÙ˚¬ Œ‘€_()-,.[]!?@$*";

	  this.REGEXP_URL = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
	  this.REGEXP_BETWEEN_SQUARE_BRACKETS = /\[[\w|\W]+\]/;
	  this.REGEXP_ENDLINE = /\r\n|\r|\n/;

	  this.PHYSICS_BODYTYPE_STATIC = 1;
	  this.PHYSICS_BODYTYPE_KINEMATIC = 2;
	  this.PHYSICS_BODYTYPE_DYNAMIC = 3;
	  
	  this.DEFAULT_CAMERA_ID = 'default_camera_id';
	  this.DEFAULT_SCENE_ID = 'default_scene_id';
	};
});
