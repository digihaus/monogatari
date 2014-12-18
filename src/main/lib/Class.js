/**
 * Simple JavaScript Inheritance. MIT Licensed.
 * Copyright (C) John Resig http://ejohn.org/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){var d=!1,g=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;window.Class=function(){};Class.extend=function(b){function c(){!d&&this.init&&this.init.apply(this,arguments)}var e=this.prototype;d=!0;var f=new this;d=!1;for(var a in b)f[a]="function"==typeof b[a]&&"function"==typeof e[a]&&g.test(b[a])?function(a,b){return function(){var c=this._super;this._super=e[a];var d=b.apply(this,arguments);this._super=c;return d}}(a,b[a]):b[a];c.prototype=f;c.prototype.constructor=c;c.extend=arguments.callee;
return c}})();