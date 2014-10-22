// Utility functions for use as static methods.
define(['core/Monogatari', 'core/Constants'], function() {
	Monogatari.Util = new MonogatariUtil();

	function MonogatariUtil() {
	  this._browserDetect = {};

	  this._browserDetect.agent = window.navigator.userAgent;
	  this._browserDetect.version = window.navigator.appVersion;
	  this._browserDetect.plataform = window.navigator.platform;

	  var agent = this._browserDetect.agent;

	  this._browserDetect.isFirefox = ( agent.indexOf( "Firefox" ) > -1 );
	  this._browserDetect.isOpera = ( window.opera != null );
	  // Chrome on Android returns true but is a completely different browser with different abilities
	  this._browserDetect.isChrome = ( agent.indexOf( "Chrome" ) > -1 );
	  // if the browser is safari for iOS devices (iPad, iPhone, and iPad).
	  this._browserDetect.isIOS = agent.indexOf( "iPod" ) > -1 || agent.indexOf( "iPhone" ) > -1 || agent.indexOf( "iPad" ) > -1;
	  this._browserDetect.isAndroid = ( agent.indexOf( "Android" ) > -1 );
	  this._browserDetect.isBlackberry = ( agent.indexOf( "Blackberry" ) > -1 );
	  this._browserDetect.isIE = ( agent.indexOf( "MSIE" ) > -1 );
	};

	MonogatariUtil.prototype.createUniqueId = function() {
	  // from: http://stackoverflow.com/a/2117523
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );
		return v.toString( 16 );
	  } );
	};

	MonogatariUtil.prototype.equals = function( obj, other ) {
	  if ( obj === null || other === null )
		return obj === null && other === null;
	  if ( typeof obj === "string" )
		return obj === other;
	  if ( typeof obj !== "object" )
		return obj === other;
	  if ( obj.equals instanceof Function )
		return obj.equals( other );
	  return obj === other;
	};

	MonogatariUtil.prototype.parseUnitSize = function( text ) {
	  var len = text.length - 2;
	  if ( len < 0 )
		return text;
	  if ( text.indexOf( "pt" ) === len )
		return parseFloat( text.substring( 0, len ) ) * 1.25;
	  if ( text.indexOf( "pc" ) === len )
		return parseFloat( text.substring( 0, len ) ) * 15;
	  if ( text.indexOf( "mm" ) === len )
		return parseFloat( text.substring( 0, len ) ) * 3.543307;
	  if ( text.indexOf( "cm" ) === len )
		return parseFloat( text.substring( 0, len ) ) * 35.43307;
	  if ( text.indexOf( "in" ) === len )
		return parseFloat( text.substring( 0, len ) ) * 90;
	  if ( text.indexOf( "px" ) === len )
		return parseFloat( text.substring( 0, len ) );
	  return parseFloat( text );
	};

	MonogatariUtil.prototype.typeOf = function( obj ) {
	  return Object.prototype.toString.apply( obj );
	};

	// store('num', '1');
	// store('on', 'true');
	// store('name', 'pamela');
	// store('obj', {'hello': 'world'}, true);

	MonogatariUtil.prototype.store = function( key, val, isObject ) {
	  if ( isObject )
		localStorage.setItem( key, JSON.stringify( val ) );
	  else
		localStorage.setItem( key, val );
	};

	MonogatariUtil.prototype.getBrowser = function() {
	  // Chrome on Android returns true but is a completely different browser with different abilities
	  if ( this._browserDetect.isAndroid )
		return Monogatari.Constants.BROWSER_ANDROID;
	  if ( this._browserDetect.isChrome )
		return Monogatari.Constants.BROWSER_CHROME;
	  if ( this._browserDetect.isFirefox )
		return Monogatari.Constants.BROWSER_FIREFOX;
	  if ( this._browserDetect.isIOS )
		return Monogatari.Constants.BROWSER_IOS;
	  if ( this._browserDetect.isOpera )
		return Monogatari.Constants.BROWSER_OPERA;
	  if ( this._browserDetect.isBlackberry )
		return Monogatari.Constants.BROWSER_BLACKBERRY;
	  if ( this._browserDetect.isIE )
		return Monogatari.Constants.BROWSER_IE;
	};
});