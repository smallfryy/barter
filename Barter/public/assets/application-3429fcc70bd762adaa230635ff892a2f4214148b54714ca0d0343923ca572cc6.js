/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
var app = {
  textbook: {controller: {}},
  user: {},
  userBook: {},
  cart: {controller: {}},
  users: {controller: {}}
}


$(function(){
  $('#buttonPress').click(function(){
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  })
})
;
$(function(){
  $('#addToCart').click(app.cart.controller.createLineItem)
  $('.remove-item').click(app.cart.controller.removeFromCart)
})

app.cart.controller = {
  createLineItem: function(event){
    event.preventDefault();
    userBookId = $('#addToCart').attr('userbookid')
    $.ajax({
      url: '/line_items',
      method: 'POST',
      data: {userBookId: userBookId},
      success: function(response){
          $('#addToCartMessage').empty();
        if (!_.isNull(response.lineItem.id)){
          $('#addToCartMessage').append('<h2> Succesfully added to cart </h2>')
        }

      }
    })
  },
  removeFromCart: function(event){
    event.preventDefault();
    lineItemId = $(this).attr('line-item-id')
      $.ajax({
      url: '/line_items/' + lineItemId,
      method: 'DELETE',
      success: function(response){
        if (!_.isNull(response.lineItemId)){
          id = response.lineItemId
          $('#cart-item-' + id).empty();
        }

      }
    })
  }
}
;
$(function() { 
  $(".text_d_long").hide()
  $('#see_more').on('click', function(event){
    event.preventDefault()
    $(".text_d_short").hide()
    $(".text_d_long").show()
  });
  $('#see_less').on('click', function(event){
    event.preventDefault()
    $(".text_d_long").hide()
    $(".text_d_short").show()
  })
})
;
$(function() {
  $('body').on('click', '.user_book', app.userBook.controller.show)
  $('.remove icon').click(function(){
    $('.modal').modal('hide')
  })
   $('#closeModal').click(function(){
    $('.modal').modal('hide')
  })
  $('#newUserBook').click(app.userBook.controller.showAddBookModal)
  $('#price_custom').click(function(){
    $('#custom_price_value').show();
  })
  $('#price_marketplace').click(function(){
    $('#custom_price_value').hide();
  })
  $('#userBookSubmit').click(app.userBook.controller.new)
  $('.user_book').click(function(){
    $('.modal').modal('hide')
  })
  $('.userBookDelete').click(app.userBook.controller.deleteUserBook)
})

app.userBook.controller = {
  show: function(event){
    event.preventDefault()
    var url = $(this).find('a').attr('href')
    $.ajax({
      url: url,
      method: 'GET'
    }).then(function(response){
      var user = response.user
      var textbook = response.textbook
      var userBook = response.userBook
      var price = response.price
      var userBookCondition = response.userBookCondition
      var newUser = new app.user.model.new(user.id, user.email, user.first_name, user.last_name, user.college_id)
      var newTextbook = new app.textbook.model.new(textbook.title, textbook.author, textbook.published_date, textbook.isbn)
      var newUserBook = new app.userBook.model.new (newUser, newTextbook, userBookCondition, userBook.sold)
      app.userBook.controller.modal(newUserBook, userBook.id, price)

    })
  },
    modal: function(userBook, userBookId, price){
      var $imageUrl = $('body').find('img').attr('src')
      var userShowUrl = "/users/" + userBook.user.id + ""
      $('.ui.basic.modal .header').empty()
      $('.ui.basic.modal ul').empty()
      $('.ui.basic.modal .image.content .image').empty()
      $('#addToCartMessage').empty();
      $('.ui.basic.modal .header').append(userBook.textbook.title)
      $('.ui.basic.modal .header').append("<h3>By " + userBook.textbook.author + "</h3>")
      if (userBook.textbook.publishedDate) {
        $('.ui.basic.modal .header').append("<h3>Published: " + userBook.textbook.publishedDate + "</h3>")
      }
      $('.ui.basic.modal .header').append("<h3>ISBN: " + userBook.textbook.isbn + "</h3>")
      $('.ui.basic.modal ul').append('<li> Price: $'+ price +'</li>')
      $('.ui.basic.modal ul').append('<li> Condition: '+ userBook.condition +'</li>')
      $('.ui.basic.modal ul').append('<li>Seller: ' + userBook.user.firstName + " " + userBook.user.lastName + '</li>')
      $('.ui.basic.modal ul').append('<li><a href=' + userShowUrl + '>See more books available from ' + userBook.user.firstName + '</li>')
      $('.ui.basic.modal .image.content .image').append('<img src="' + $imageUrl + '">')
      $('.ui.basic.modal').modal('show')
      $('#addToCart').attr('userBookId', userBookId)
  },
  new: function(event){
    event.preventDefault()
    var condition_id = $('#condition_id option:selected').val()
    var custom_price = $('#custom_price_value').val();
    var url = $('form').attr('action');
    $.ajax({
      url: url,
      method: 'POST',
      data: {condition: condition_id, custom_price: custom_price}
    }).then(function(response){
      app.userBook.controller.render(response)
    })

  },
  showAddBookModal: function(){
    $('#custom_price_value').val('');
    $('#price_marketplace').prop("checked",true);
    $('#buildUserBook').modal('show');
  },

  render: function(response){
    var userBook = response.userBook;
    var condition = response.condition;
    var userName = response.userName;
    var bookName = response.bookName
    var userBooksSold = response.userBooksSold;
    var listingDaysAgo = response.listingDaysAgo
    var userBookCount = response.userBookCount
    var url = '/textbooks/' + userBook.textbook_id + '/book/' + userBook.id

    $('#book_info').text('There are ' + userBookCount + ' copies of ' + bookName + ' available for sale:')
    $('#bookAppend').append('<div id="'+ userBook.id +'" class="item user_book"><i class="book icon"></i><div class="content"><a href="'+ url +'">' + condition + '</a>' + " - listed by " + userName + '.</div></div>')
  },
  deleteUserBook: function(event){
    event.preventDefault();
    userBookId = $(this).attr('userBook')
    textbookId = $(this).attr('textbook')
    url = "/textbooks/" + textbookId + "/book/" + userBookId

      $.ajax({
      url: url,
      method: 'DELETE',
      success: function(response){
        $('.userBookDelete[userbook=' + response.userBookId + ']').parent().remove()
      }
    })
  }
}

;
$(function(){
  $('#giftKarma').click(app.users.controller.karmaModal);
  $('#sendKarma').click(app.users.controller.sendKarma);
})

app.users.controller = {
  karmaModal: function(event){
    event.preventDefault();
    $('.ui.modal').modal('show')
    ;
  },
  sendKarma: function(event){
    event.preventDefault();
    var friendId = $('#karmaFriend option:checked').val();
    var amount = $('#karmaAmount').val();
    var karmaId = String($('#karmaId').val())
    $.ajax({
      url: '/karmas/' + karmaId,
      method: 'PATCH',
      data: {friendId: friendId, amount:amount}
    }).success(function(data){
      if (data.message){
        var message = data.message;
        $('#karmaError').text(message);
      } else {
        var karma = data.sender_karma.balance;
        app.users.controller.updateKarma(karma);
      }
    })
  },
  updateKarma: function(karma){
    $('#navKarma').text('Karma: $' + karma + '.00');
    $('#bodyKarma').text('Karma Balance: $' + karma + '.00');
    $('.ui.modal').modal('hide');
  }
}
;
app.textbook.model = {
  all: [],
  new: (function(){
    var counter = 0;
    var textbook = function Textbook(title, author, published_date, isbn) {
      var self = this;
      this.title = title;
      this.author = author;
      this.publishedDate = published_date;
      this.isbn = isbn;
      (function initialize(){
        self.id = ++counter;
        app.textbook.model.all.push(self);
      })()
     }
     return textbook;
  }()),
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.textbook.model.all, function(textbook) {
      return textbook[key] == value;
    })[0]
  }
}
;
app.user.model = {
  all: [],
  new: (function(){
    var counter = 0;
    var user = function User(id, email, first_name, last_name, college_id) {
      var self = this;
      this.id = id
      this.email = email;
      this.firstName = first_name;
      this.lastName = last_name;
      this.collegeId = college_id;
      (function initialize(){
        app.user.model.all.push(self);
      })()
    }
    return user;
  }()),
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.user.model.all, function(user) {
      return user[key] == value;
    })
  }
}
;
app.userBook.model = {
  all: [],
  new: (function(){
      var counter = 0;
      var userbook = function UserBook(user, textbook, condition, sold) {
      this.user = user;
      this.textbook = textbook;
      this.condition = condition;
      this.sold = sold;
      var self = this;
      (function initialize(){
        self.id = ++counter;
        app.userBook.model.all.push(self);
      })()
    }
    return userbook;
  }()),
  findBy: function findBy(attributeHash){
    var key = Object.keys(attributeHash)[0];
    var value = attributeHash[key];
    return $.grep(app.userBook.model.all, function(userBook) {
      return userBook[key] == value;
    })
  }
}
;
/*!
 * # Semantic UI 2.1.7 - Modal
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;(function ( $, window, document, undefined ) {

"use strict";

$.fn.modal = function(parameters) {
  var
    $allModules    = $(this),
    $window        = $(window),
    $document      = $(document),
    $body          = $('body'),

    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),

    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); },

    returnedValue
  ;

  $allModules
    .each(function() {
      var
        settings    = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.modal.settings, parameters)
          : $.extend({}, $.fn.modal.settings),

        selector        = settings.selector,
        className       = settings.className,
        namespace       = settings.namespace,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $context        = $(settings.context),
        $close          = $module.find(selector.close),

        $allModals,
        $otherModals,
        $focusedElement,
        $dimmable,
        $dimmer,

        element         = this,
        instance        = $module.data(moduleNamespace),

        elementNamespace,
        id,
        observer,
        module
      ;
      module  = {

        initialize: function() {
          module.verbose('Initializing dimmer', $context);

          module.create.id();
          module.create.dimmer();
          module.refreshModals();

          module.bind.events();
          if(settings.observeChanges) {
            module.observeChanges();
          }
          module.instantiate();
        },

        instantiate: function() {
          module.verbose('Storing instance of modal');
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
        },

        create: {
          dimmer: function() {
            var
              defaultSettings = {
                debug      : settings.debug,
                dimmerName : 'modals',
                duration   : {
                  show     : settings.duration,
                  hide     : settings.duration
                }
              },
              dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings)
            ;
            if(settings.inverted) {
              dimmerSettings.variation = (dimmerSettings.variation !== undefined)
                ? dimmerSettings.variation + ' inverted'
                : 'inverted'
              ;
            }
            if($.fn.dimmer === undefined) {
              module.error(error.dimmer);
              return;
            }
            module.debug('Creating dimmer with settings', dimmerSettings);
            $dimmable = $context.dimmer(dimmerSettings);
            if(settings.detachable) {
              module.verbose('Modal is detachable, moving content into dimmer');
              $dimmable.dimmer('add content', $module);
            }
            else {
              module.set.undetached();
            }
            if(settings.blurring) {
              $dimmable.addClass(className.blurring);
            }
            $dimmer = $dimmable.dimmer('get dimmer');
          },
          id: function() {
            id = (Math.random().toString(16) + '000000000').substr(2,8);
            elementNamespace = '.' + id;
            module.verbose('Creating unique id for element', id);
          }
        },

        destroy: function() {
          module.verbose('Destroying previous modal');
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
          $window.off(elementNamespace);
          $close.off(eventNamespace);
          $context.dimmer('destroy');
        },

        observeChanges: function() {
          if('MutationObserver' in window) {
            observer = new MutationObserver(function(mutations) {
              module.debug('DOM tree modified, refreshing');
              module.refresh();
            });
            observer.observe(element, {
              childList : true,
              subtree   : true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },

        refresh: function() {
          module.remove.scrolling();
          module.cacheSizes();
          module.set.screenHeight();
          module.set.type();
          module.set.position();
        },

        refreshModals: function() {
          $otherModals = $module.siblings(selector.modal);
          $allModals   = $otherModals.add($module);
        },

        attachEvents: function(selector, event) {
          var
            $toggle = $(selector)
          ;
          event = $.isFunction(module[event])
            ? module[event]
            : module.toggle
          ;
          if($toggle.length > 0) {
            module.debug('Attaching modal events to element', selector, event);
            $toggle
              .off(eventNamespace)
              .on('click' + eventNamespace, event)
            ;
          }
          else {
            module.error(error.notFound, selector);
          }
        },

        bind: {
          events: function() {
            module.verbose('Attaching events');
            $module
              .on('click' + eventNamespace, selector.close, module.event.close)
              .on('click' + eventNamespace, selector.approve, module.event.approve)
              .on('click' + eventNamespace, selector.deny, module.event.deny)
            ;
            $window
              .on('resize' + elementNamespace, module.event.resize)
            ;
          }
        },

        get: {
          id: function() {
            return (Math.random().toString(16) + '000000000').substr(2,8);
          }
        },

        event: {
          approve: function() {
            if(settings.onApprove.call(element, $(this)) === false) {
              module.verbose('Approve callback returned false cancelling hide');
              return;
            }
            module.hide();
          },
          deny: function() {
            if(settings.onDeny.call(element, $(this)) === false) {
              module.verbose('Deny callback returned false cancelling hide');
              return;
            }
            module.hide();
          },
          close: function() {
            module.hide();
          },
          click: function(event) {
            var
              $target   = $(event.target),
              isInModal = ($target.closest(selector.modal).length > 0),
              isInDOM   = $.contains(document.documentElement, event.target)
            ;
            if(!isInModal && isInDOM) {
              module.debug('Dimmer clicked, hiding all modals');
              if( module.is.active() ) {
                module.remove.clickaway();
                if(settings.allowMultiple) {
                  module.hide();
                }
                else {
                  module.hideAll();
                }
              }
            }
          },
          debounce: function(method, delay) {
            clearTimeout(module.timer);
            module.timer = setTimeout(method, delay);
          },
          keyboard: function(event) {
            var
              keyCode   = event.which,
              escapeKey = 27
            ;
            if(keyCode == escapeKey) {
              if(settings.closable) {
                module.debug('Escape key pressed hiding modal');
                module.hide();
              }
              else {
                module.debug('Escape key pressed, but closable is set to false');
              }
              event.preventDefault();
            }
          },
          resize: function() {
            if( $dimmable.dimmer('is active') ) {
              requestAnimationFrame(module.refresh);
            }
          }
        },

        toggle: function() {
          if( module.is.active() || module.is.animating() ) {
            module.hide();
          }
          else {
            module.show();
          }
        },

        show: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          module.refreshModals();
          module.showModal(callback);
        },

        hide: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          module.refreshModals();
          module.hideModal(callback);
        },

        showModal: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if( module.is.animating() || !module.is.active() ) {

            module.showDimmer();
            module.cacheSizes();
            module.set.position();
            module.set.screenHeight();
            module.set.type();
            module.set.clickaway();

            if( !settings.allowMultiple && module.others.active() ) {
              module.hideOthers(module.showModal);
            }
            else {
              settings.onShow.call(element);
              if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                module.debug('Showing modal with css animations');
                $module
                  .transition({
                    debug       : settings.debug,
                    animation   : settings.transition + ' in',
                    queue       : settings.queue,
                    duration    : settings.duration,
                    useFailSafe : true,
                    onComplete : function() {
                      settings.onVisible.apply(element);
                      module.add.keyboardShortcuts();
                      module.save.focus();
                      module.set.active();
                      if(settings.autofocus) {
                        module.set.autofocus();
                      }
                      callback();
                    }
                  })
                ;
              }
              else {
                module.error(error.noTransition);
              }
            }
          }
          else {
            module.debug('Modal is already visible');
          }
        },

        hideModal: function(callback, keepDimmed) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          module.debug('Hiding modal');
          if(settings.onHide.call(element, $(this)) === false) {
            module.verbose('Hide callback returned false cancelling hide');
            return;
          }

          if( module.is.animating() || module.is.active() ) {
            if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.remove.active();
              $module
                .transition({
                  debug       : settings.debug,
                  animation   : settings.transition + ' out',
                  queue       : settings.queue,
                  duration    : settings.duration,
                  useFailSafe : true,
                  onStart     : function() {
                    if(!module.others.active() && !keepDimmed) {
                      module.hideDimmer();
                    }
                    module.remove.keyboardShortcuts();
                  },
                  onComplete : function() {
                    settings.onHidden.call(element);
                    module.restore.focus();
                    callback();
                  }
                })
              ;
            }
            else {
              module.error(error.noTransition);
            }
          }
        },

        showDimmer: function() {
          if($dimmable.dimmer('is animating') || !$dimmable.dimmer('is active') ) {
            module.debug('Showing dimmer');
            $dimmable.dimmer('show');
          }
          else {
            module.debug('Dimmer already visible');
          }
        },

        hideDimmer: function() {
          if( $dimmable.dimmer('is animating') || ($dimmable.dimmer('is active')) ) {
            $dimmable.dimmer('hide', function() {
              module.remove.clickaway();
              module.remove.screenHeight();
            });
          }
          else {
            module.debug('Dimmer is not visible cannot hide');
            return;
          }
        },

        hideAll: function(callback) {
          var
            $visibleModals = $allModals.filter('.' + className.active + ', .' + className.animating)
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if( $visibleModals.length > 0 ) {
            module.debug('Hiding all visible modals');
            module.hideDimmer();
            $visibleModals
              .modal('hide modal', callback)
            ;
          }
        },

        hideOthers: function(callback) {
          var
            $visibleModals = $otherModals.filter('.' + className.active + ', .' + className.animating)
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if( $visibleModals.length > 0 ) {
            module.debug('Hiding other modals', $otherModals);
            $visibleModals
              .modal('hide modal', callback, true)
            ;
          }
        },

        others: {
          active: function() {
            return ($otherModals.filter('.' + className.active).length > 0);
          },
          animating: function() {
            return ($otherModals.filter('.' + className.animating).length > 0);
          }
        },


        add: {
          keyboardShortcuts: function() {
            module.verbose('Adding keyboard shortcuts');
            $document
              .on('keyup' + eventNamespace, module.event.keyboard)
            ;
          }
        },

        save: {
          focus: function() {
            $focusedElement = $(document.activeElement).blur();
          }
        },

        restore: {
          focus: function() {
            if($focusedElement && $focusedElement.length > 0) {
              $focusedElement.focus();
            }
          }
        },

        remove: {
          active: function() {
            $module.removeClass(className.active);
          },
          clickaway: function() {
            if(settings.closable) {
              $dimmer
                .off('click' + elementNamespace)
              ;
            }
          },
          bodyStyle: function() {
            if($body.attr('style') === '') {
              module.verbose('Removing style attribute');
              $body.removeAttr('style');
            }
          },
          screenHeight: function() {
            module.debug('Removing page height');
            $body
              .css('height', '')
            ;
          },
          keyboardShortcuts: function() {
            module.verbose('Removing keyboard shortcuts');
            $document
              .off('keyup' + eventNamespace)
            ;
          },
          scrolling: function() {
            $dimmable.removeClass(className.scrolling);
            $module.removeClass(className.scrolling);
          }
        },

        cacheSizes: function() {
          var
            modalHeight = $module.outerHeight()
          ;
          if(module.cache === undefined || modalHeight !== 0) {
            module.cache = {
              pageHeight    : $(document).outerHeight(),
              height        : modalHeight + settings.offset,
              contextHeight : (settings.context == 'body')
                ? $(window).height()
                : $dimmable.height()
            };
          }
          module.debug('Caching modal and container sizes', module.cache);
        },

        can: {
          fit: function() {
            return ( ( module.cache.height + (settings.padding * 2) ) < module.cache.contextHeight);
          }
        },

        is: {
          active: function() {
            return $module.hasClass(className.active);
          },
          animating: function() {
            return $module.transition('is supported')
              ? $module.transition('is animating')
              : $module.is(':visible')
            ;
          },
          scrolling: function() {
            return $dimmable.hasClass(className.scrolling);
          },
          modernBrowser: function() {
            // appName for IE11 reports 'Netscape' can no longer use
            return !(window.ActiveXObject || "ActiveXObject" in window);
          }
        },

        set: {
          autofocus: function() {
            var
              $inputs    = $module.find(':input').filter(':visible'),
              $autofocus = $inputs.filter('[autofocus]'),
              $input     = ($autofocus.length > 0)
                ? $autofocus.first()
                : $inputs.first()
            ;
            if($input.length > 0) {
              $input.focus();
            }
          },
          clickaway: function() {
            if(settings.closable) {
              $dimmer
                .on('click' + elementNamespace, module.event.click)
              ;
            }
          },
          screenHeight: function() {
            if( module.can.fit() ) {
              $body.css('height', '');
            }
            else {
              module.debug('Modal is taller than page content, resizing page height');
              $body
                .css('height', module.cache.height + (settings.padding * 2) )
              ;
            }
          },
          active: function() {
            $module.addClass(className.active);
          },
          scrolling: function() {
            $dimmable.addClass(className.scrolling);
            $module.addClass(className.scrolling);
          },
          type: function() {
            if(module.can.fit()) {
              module.verbose('Modal fits on screen');
              if(!module.others.active() && !module.others.animating()) {
                module.remove.scrolling();
              }
            }
            else {
              module.verbose('Modal cannot fit on screen setting to scrolling');
              module.set.scrolling();
            }
          },
          position: function() {
            module.verbose('Centering modal on page', module.cache);
            if(module.can.fit()) {
              $module
                .css({
                  top: '',
                  marginTop: -(module.cache.height / 2)
                })
              ;
            }
            else {
              $module
                .css({
                  marginTop : '',
                  top       : $document.scrollTop()
                })
              ;
            }
          },
          undetached: function() {
            $dimmable.addClass(className.undetached);
          }
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            settings[name] = value;
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.modal.settings = {

  name           : 'Modal',
  namespace      : 'modal',

  debug          : false,
  verbose        : false,
  performance    : true,

  observeChanges : false,

  allowMultiple  : false,
  detachable     : true,
  closable       : true,
  autofocus      : true,

  inverted       : false,
  blurring       : false,

  dimmerSettings : {
    closable : false,
    useCSS   : true
  },


  context    : 'body',

  queue      : false,
  duration   : 500,
  offset     : 0,
  transition : 'scale',

  // padding with edge of page
  padding    : 50,

  // called before show animation
  onShow     : function(){},

  // called after show animation
  onVisible  : function(){},

  // called before hide animation
  onHide     : function(){ return true; },

  // called after hide animation
  onHidden   : function(){},

  // called after approve selector match
  onApprove  : function(){ return true; },

  // called after deny selector match
  onDeny     : function(){ return true; },

  selector    : {
    close    : '> .close',
    approve  : '.actions .positive, .actions .approve, .actions .ok',
    deny     : '.actions .negative, .actions .deny, .actions .cancel',
    modal    : '.ui.modal'
  },
  error : {
    dimmer    : 'UI Dimmer, a required component is not included in this page',
    method    : 'The method you called is not defined.',
    notFound  : 'The element you specified could not be found'
  },
  className : {
    active     : 'active',
    animating  : 'animating',
    blurring   : 'blurring',
    scrolling  : 'scrolling',
    undetached : 'undetached'
  }
};


})( jQuery, window, document );
 /*
 * # Semantic UI - 2.1.7
 * https://github.com/Semantic-Org/Semantic-UI
 * http://www.semantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

!function(e,t,n,i){e.site=e.fn.site=function(o){var a,r,s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=e.isPlainObject(o)?e.extend(!0,{},e.site.settings,o):e.extend({},e.site.settings),f=m.namespace,g=m.error,p="module-"+f,v=e(n),h=v,b=this,y=h.data(p);return a={initialize:function(){a.instantiate()},instantiate:function(){a.verbose("Storing instance of site",a),y=a,h.data(p,a)},normalize:function(){a.fix.console(),a.fix.requestAnimationFrame()},fix:{console:function(){a.debug("Normalizing window.console"),(console===i||console.log===i)&&(a.verbose("Console not available, normalizing events"),a.disable.console()),("undefined"==typeof console.group||"undefined"==typeof console.groupEnd||"undefined"==typeof console.groupCollapsed)&&(a.verbose("Console group not available, normalizing events"),t.console.group=function(){},t.console.groupEnd=function(){},t.console.groupCollapsed=function(){}),"undefined"==typeof console.markTimeline&&(a.verbose("Mark timeline not available, normalizing events"),t.console.markTimeline=function(){})},consoleClear:function(){a.debug("Disabling programmatic console clearing"),t.console.clear=function(){}},requestAnimationFrame:function(){a.debug("Normalizing requestAnimationFrame"),t.requestAnimationFrame===i&&(a.debug("RequestAnimationFrame not available, normalizing event"),t.requestAnimationFrame=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(t){return e.fn[t]!==i&&e.fn[t].settings!==i},enabled:{modules:function(t){var n=[];return t=t||m.modules,e.each(t,function(e,t){a.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(t){var n=[];return t=t||m.modules,e.each(t,function(e,t){a.moduleExists(t)||n.push(t)}),n}},change:{setting:function(t,n,o,r){o="string"==typeof o?"all"===o?m.modules:[o]:o||m.modules,r=r!==i?r:!0,e.each(o,function(i,o){var s,c=a.moduleExists(o)?e.fn[o].settings.namespace||!1:!0;a.moduleExists(o)&&(a.verbose("Changing default setting",t,n,o),e.fn[o].settings[t]=n,r&&c&&(s=e(":data(module-"+c+")"),s.length>0&&(a.verbose("Modifying existing settings",s),s[o]("setting",t,n))))})},settings:function(t,n,o){n="string"==typeof n?[n]:n||m.modules,o=o!==i?o:!0,e.each(n,function(n,i){var r;a.moduleExists(i)&&(a.verbose("Changing default setting",t,i),e.extend(!0,e.fn[i].settings,t),o&&f&&(r=e(":data(module-"+f+")"),r.length>0&&(a.verbose("Modifying existing settings",r),r[i]("setting",t))))})}},enable:{console:function(){a.console(!0)},debug:function(e,t){e=e||m.modules,a.debug("Enabling debug for modules",e),a.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||m.modules,a.debug("Enabling verbose debug for modules",e),a.change.setting("verbose",!0,e,t)}},disable:{console:function(){a.console(!1)},debug:function(e,t){e=e||m.modules,a.debug("Disabling debug for modules",e),a.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||m.modules,a.debug("Disabling verbose debug for modules",e),a.change.setting("verbose",!1,e,t)}},console:function(e){if(e){if(y.cache.console===i)return void a.error(g.console);a.debug("Restoring console function"),t.console=y.cache.console}else a.debug("Disabling console function"),y.cache.console=t.console,t.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){a.verbose("Destroying previous site for",h),h.removeData(p)},cache:{},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){m.debug&&(m.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,m.name+":"),a.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,m.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Element:b,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,500)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var s,c,l,u=y;return n=n||d,o=b||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(o,n):c!==i&&(l=c),e.isArray(r)?r.push(l):r!==i?r=[r,l]:l!==i&&(r=l),c}},u?(y===i&&a.initialize(),a.invoke(l)):(y!==i&&a.destroy(),a.initialize()),r!==i?r:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!1,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","embed","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.form=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u=arguments[1],d="string"==typeof l,m=[].slice.call(arguments,1);return a.each(function(){var f,g,p,v,h,b,y,x,C,w,k,S,T,A,R,E,P,F,D=e(this),O=this,q=[],j=!1;F={initialize:function(){F.get.settings(),d?(P===i&&F.instantiate(),F.invoke(l)):(F.verbose("Initializing form validation",D,x),F.bindEvents(),F.set.defaults(),F.instantiate())},instantiate:function(){F.verbose("Storing instance of module",F),P=F,D.data(R,F)},destroy:function(){F.verbose("Destroying previous module",P),F.removeEvents(),D.removeData(R)},refresh:function(){F.verbose("Refreshing selector cache"),f=D.find(k.field),g=D.find(k.group),p=D.find(k.message),v=D.find(k.prompt),h=D.find(k.submit),b=D.find(k.clear),y=D.find(k.reset)},submit:function(){F.verbose("Submitting form",D),D.submit()},attachEvents:function(t,n){n=n||"submit",e(t).on("click"+E,function(e){F[n](),e.preventDefault()})},bindEvents:function(){F.verbose("Attaching form events"),D.on("submit"+E,F.validate.form).on("blur"+E,k.field,F.event.field.blur).on("click"+E,k.submit,F.submit).on("click"+E,k.reset,F.reset).on("click"+E,k.clear,F.clear),x.keyboardShortcuts&&D.on("keydown"+E,k.field,F.event.field.keydown),f.each(function(){var t=e(this),n=t.prop("type"),i=F.get.changeEvent(n,t);e(this).on(i+E,F.event.field.change)})},clear:function(){f.each(function(){var t=e(this),n=t.parent(),i=t.closest(g),o=i.find(k.prompt),a=t.data(w.defaultValue)||"",r=n.is(k.uiCheckbox),s=n.is(k.uiDropdown),c=i.hasClass(S.error);c&&(F.verbose("Resetting error on field",i),i.removeClass(S.error),o.remove()),s?(F.verbose("Resetting dropdown value",n,a),n.dropdown("clear")):r?t.prop("checked",!1):(F.verbose("Resetting field value",t,a),t.val(""))})},reset:function(){f.each(function(){var t=e(this),n=t.parent(),o=t.closest(g),a=o.find(k.prompt),r=t.data(w.defaultValue),s=n.is(k.uiCheckbox),c=n.is(k.uiDropdown),l=o.hasClass(S.error);r!==i&&(l&&(F.verbose("Resetting error on field",o),o.removeClass(S.error),a.remove()),c?(F.verbose("Resetting dropdown value",n,r),n.dropdown("restore defaults")):s?(F.verbose("Resetting checkbox value",n,r),t.prop("checked",r)):(F.verbose("Resetting field value",t,r),t.val(r)))})},is:{bracketedRule:function(e){return e.type&&e.type.match(x.regExp.bracket)},valid:function(){var t=!0;return F.verbose("Checking if form is valid"),e.each(C,function(e,n){F.validate.field(n,e)||(t=!1)}),t}},removeEvents:function(){D.off(E),f.off(E),h.off(E),f.off(E)},event:{field:{keydown:function(t){var n=e(this),i=t.which,o={enter:13,escape:27};i==o.escape&&(F.verbose("Escape key pressed blurring field"),n.blur()),!t.ctrlKey&&i==o.enter&&n.is(k.input)&&n.not(k.checkbox).length>0&&(j||(n.one("keyup"+E,F.event.field.keyup),F.submit(),F.debug("Enter pressed on input submitting form")),j=!0)},keyup:function(){j=!1},blur:function(t){var n=e(this),i=n.closest(g),o=F.get.validation(n);i.hasClass(S.error)?(F.debug("Revalidating field",n,o),F.validate.form.call(F,t,!0)):("blur"==x.on||"change"==x.on)&&o&&F.validate.field(o)},change:function(t){var n=e(this),i=n.closest(g);("change"==x.on||i.hasClass(S.error)&&x.revalidate)&&(clearTimeout(F.timer),F.timer=setTimeout(function(){F.debug("Revalidating field",n,F.get.validation(n)),F.validate.form.call(F,t,!0)},x.delay))}}},get:{ancillaryValue:function(e){return e.type&&F.is.bracketedRule(e)?e.type.match(x.regExp.bracket)[1]+"":!1},ruleName:function(e){return F.is.bracketedRule(e)?e.type.replace(e.type.match(x.regExp.bracket)[0],""):e.type},changeEvent:function(e,t){return"checkbox"==e||"radio"==e||"hidden"==e||t.is("select")?"change":F.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},prompt:function(e,t){var n,i,o,a=F.get.ruleName(e),r=F.get.ancillaryValue(e),s=e.prompt||x.prompt[a]||x.text.unspecifiedRule,c=-1!==s.search("{value}"),l=-1!==s.search("{name}");return(l||c)&&(i=F.get.field(t.identifier)),c&&(s=s.replace("{value}",i.val())),l&&(n=i.closest(k.group).find("label").eq(0),o=1==n.size()?n.text():i.prop("placeholder")||x.text.unspecifiedField,s=s.replace("{name}",o)),s=s.replace("{identifier}",t.identifier),s=s.replace("{ruleValue}",r),e.prompt||F.verbose("Using default validation prompt for type",s,a),s},settings:function(){if(e.isPlainObject(t)){var n,o=Object.keys(t),a=o.length>0?t[o[0]].identifier!==i&&t[o[0]].rules!==i:!1;a?(x=e.extend(!0,{},e.fn.form.settings,u),C=e.extend({},e.fn.form.settings.defaults,t),F.error(x.error.oldSyntax,O),F.verbose("Extending settings from legacy parameters",C,x)):(t.fields&&(n=Object.keys(t.fields),("string"==typeof t.fields[n[0]]||e.isArray(t.fields[n[0]]))&&e.each(t.fields,function(n,i){"string"==typeof i&&(i=[i]),t.fields[n]={rules:[]},e.each(i,function(e,i){t.fields[n].rules.push({type:i})})})),x=e.extend(!0,{},e.fn.form.settings,t),C=e.extend({},e.fn.form.settings.defaults,x.fields),F.verbose("Extending settings",C,x))}else x=e.fn.form.settings,C=e.fn.form.settings.defaults,F.verbose("Using default form validation",C,x);A=x.namespace,w=x.metadata,k=x.selector,S=x.className,T=x.error,R="module-"+A,E="."+A,P=D.data(R),F.refresh()},field:function(t){return F.verbose("Finding field with identifier",t),f.filter("#"+t).length>0?f.filter("#"+t):f.filter('[name="'+t+'"]').length>0?f.filter('[name="'+t+'"]'):f.filter('[name="'+t+'[]"]').length>0?f.filter('[name="'+t+'[]"]'):f.filter("[data-"+w.validate+'="'+t+'"]').length>0?f.filter("[data-"+w.validate+'="'+t+'"]'):e("<input/>")},fields:function(t){var n=e();return e.each(t,function(e,t){n=n.add(F.get.field(t))}),n},validation:function(t){var n,i;return C?(e.each(C,function(e,o){i=o.identifier||e,F.get.field(i)[0]==t[0]&&(o.identifier=i,n=o)}),n||!1):!1},value:function(e){var t,n=[];return n.push(e),t=F.get.values.call(O,n),t[e]},values:function(t){var n=e.isArray(t)?F.get.fields(t):f,i={};return n.each(function(t,n){var o=e(n),a=(o.prop("type"),o.prop("name")),r=o.val(),s=o.is(k.checkbox),c=o.is(k.radio),l=-1!==a.indexOf("[]"),u=s?o.is(":checked"):!1;a&&(l?(a=a.replace("[]",""),i[a]||(i[a]=[]),i[a].push(s?u?r||!0:!1:r)):c?u&&(i[a]=r):i[a]=s?u?r||!0:!1:r)}),i}},has:{field:function(e){return F.verbose("Checking for existence of a field with identifier",e),"string"!=typeof e&&F.error(T.identifier,e),f.filter("#"+e).length>0?!0:f.filter('[name="'+e+'"]').length>0?!0:f.filter("[data-"+w.validate+'="'+e+'"]').length>0?!0:!1}},add:{prompt:function(t,n){var o=F.get.field(t),a=o.closest(g),r=a.children(k.prompt),s=0!==r.length;n="string"==typeof n?[n]:n,F.verbose("Adding field error state",t),a.addClass(S.error),x.inline&&(s||(r=x.templates.prompt(n),r.appendTo(a)),r.html(n[0]),s?F.verbose("Inline errors are disabled, no inline error added",t):x.transition&&e.fn.transition!==i&&D.transition("is supported")?(F.verbose("Displaying error with css transition",x.transition),r.transition(x.transition+" in",x.duration)):(F.verbose("Displaying error with fallback javascript animation"),r.fadeIn(x.duration)))},errors:function(e){F.debug("Adding form error messages",e),F.set.error(),p.html(x.templates.error(e))}},remove:{prompt:function(t){var n=F.get.field(t),o=n.closest(g),a=o.children(k.prompt);o.removeClass(S.error),x.inline&&a.is(":visible")&&(F.verbose("Removing prompt for field",t),x.transition&&e.fn.transition!==i&&D.transition("is supported")?a.transition(x.transition+" out",x.duration,function(){a.remove()}):a.fadeOut(x.duration,function(){a.remove()}))}},set:{success:function(){D.removeClass(S.error).addClass(S.success)},defaults:function(){f.each(function(){var t=e(this),n=t.filter(k.checkbox).length>0,i=n?t.is(":checked"):t.val();t.data(w.defaultValue,i)})},error:function(){D.removeClass(S.success).addClass(S.error)},value:function(e,t){var n={};return n[e]=t,F.set.values.call(O,n)},values:function(t){e.isEmptyObject(t)||e.each(t,function(t,n){var i,o=F.get.field(t),a=o.parent(),r=e.isArray(n),s=a.is(k.uiCheckbox),c=a.is(k.uiDropdown),l=o.is(k.radio)&&s,u=o.length>0;u&&(r&&s?(F.verbose("Selecting multiple",n,o),a.checkbox("uncheck"),e.each(n,function(e,t){i=o.filter('[value="'+t+'"]'),a=i.parent(),i.length>0&&a.checkbox("check")})):l?(F.verbose("Selecting radio value",n,o),o.filter('[value="'+n+'"]').parent(k.uiCheckbox).checkbox("check")):s?(F.verbose("Setting checkbox value",n,a),a.checkbox(n===!0?"check":"uncheck")):c?(F.verbose("Setting dropdown value",n,a),a.dropdown("set selected",n)):(F.verbose("Setting field value",n,o),o.val(n)))})}},validate:{form:function(e,t){var n=F.get.values();if(j)return!1;if(q=[],F.is.valid()){if(F.debug("Form has no validation errors, submitting"),F.set.success(),t!==!0)return x.onSuccess.call(O,e,n)}else if(F.debug("Form has errors"),F.set.error(),x.inline||F.add.errors(q),D.data("moduleApi")!==i&&e.stopImmediatePropagation(),t!==!0)return x.onFailure.call(O,q,n)},field:function(t,n){var o=t.identifier||n,a=F.get.field(o),r=!0,s=[];return t.identifier||(F.debug("Using field name as identifier",o),t.identifier=o),a.prop("disabled")?(F.debug("Field is disabled. Skipping",o),r=!0):t.optional&&""===e.trim(a.val())?(F.debug("Field is optional and empty. Skipping",o),r=!0):t.rules!==i&&e.each(t.rules,function(e,n){F.has.field(o)&&!F.validate.rule(t,n)&&(F.debug("Field is invalid",o,n.type),s.push(F.get.prompt(n,t)),r=!1)}),r?(F.remove.prompt(o,s),x.onValid.call(a),!0):(q=q.concat(s),F.add.prompt(o,s),x.onInvalid.call(a,s),!1)},rule:function(t,n){var o=F.get.field(t.identifier),a=(n.type,o.val()),r=F.get.ancillaryValue(n),s=F.get.ruleName(n),c=x.rules[s];return e.isFunction(c)?(a=a===i||""===a||null===a?"":e.trim(a+""),c.call(o,a,r)):void F.error(T.noRule,s)}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,x,t);else{if(n===i)return x[t];x[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,F,t);else{if(n===i)return F[t];F[t]=n}},debug:function(){x.debug&&(x.performance?F.performance.log(arguments):(F.debug=Function.prototype.bind.call(console.info,console,x.name+":"),F.debug.apply(console,arguments)))},verbose:function(){x.verbose&&x.debug&&(x.performance?F.performance.log(arguments):(F.verbose=Function.prototype.bind.call(console.info,console,x.name+":"),F.verbose.apply(console,arguments)))},error:function(){F.error=Function.prototype.bind.call(console.error,console,x.name+":"),F.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;x.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:O,"Execution Time":n})),clearTimeout(F.performance.timer),F.performance.timer=setTimeout(F.performance.display,500)},display:function(){var t=x.name+":",n=0;s=!1,clearTimeout(F.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=P;return n=n||m,a=O||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},F.initialize()}),o!==i?o:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!1,performance:!0,fields:!1,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},regExp:{bracket:/\[(.*)\]/i,decimal:/^\d*(\.)\d+/,email:"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,flags:/^\/(.*)\/(.*)?/,integer:/^\-?\d+$/,number:/^\-?\d*(\.\d+)?$/,url:/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i},text:{unspecifiedRule:"Please enter a valid value",unspecifiedField:"This field"},prompt:{empty:"{name} must have a value",checked:"{name} must be checked",email:"{name} must be a valid e-mail",url:"{name} must be a valid url",regExp:"{name} is not formatted correctly",integer:"{name} must be an integer",decimal:"{name} must be a decimal number",number:"{name} must be set to a number",is:'{name} must be "{ruleValue}"',isExactly:'{name} must be exactly "{ruleValue}"',not:'{name} cannot be set to "{ruleValue}"',notExactly:'{name} cannot be set to exactly "{ruleValue}"',contain:'{name} cannot contain "{ruleValue}"',containExactly:'{name} cannot contain exactly "{ruleValue}"',doesntContain:'{name} must contain  "{ruleValue}"',doesntContainExactly:'{name} must contain exactly "{ruleValue}"',minLength:"{name} must be at least {ruleValue} characters",length:"{name} must be at least {ruleValue} characters",exactLength:"{name} must be exactly {ruleValue} characters",maxLength:"{name} cannot be longer than {ruleValue} characters",match:"{name} must match {ruleValue} field",different:"{name} must have a different value than {ruleValue} field",creditCard:"{name} must be a valid credit card number",minCount:"{name} must have at least {ruleValue} choices",exactCount:"{name} must have exactly {ruleValue} choices",maxCount:"{name} must have {ruleValue} or less choices"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:'.reset:not([type="reset"])',submit:'.submit:not([type="submit"])',uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{identifier:"You must specify a string identifier for each field",method:"The method you called is not defined.",noRule:"There is no rule matching the one you specified",oldSyntax:"Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui basic red pointing prompt label").html(t[0])}},rules:{empty:function(t){return!(t===i||""===t||e.isArray(t)&&0===t.length)},checked:function(){return e(this).filter(":checked").length>0},email:function(t){var n=new RegExp(e.fn.form.settings.regExp.email,"i");return n.test(t)},url:function(t){return e.fn.form.settings.regExp.url.test(t)},regExp:function(t,n){var i,o=n.match(e.fn.form.settings.regExp.flags);return o&&(n=o.length>=2?o[1]:n,i=o.length>=3?o[2]:""),t.match(new RegExp(n,i))},integer:function(t,n){var o,a,r,s=e.fn.form.settings.regExp.integer;return n&&-1===["",".."].indexOf(n)&&(-1==n.indexOf("..")?s.test(n)&&(o=a=n-0):(r=n.split("..",2),s.test(r[0])&&(o=r[0]-0),s.test(r[1])&&(a=r[1]-0))),s.test(t)&&(o===i||t>=o)&&(a===i||a>=t)},decimal:function(t){return e.fn.form.settings.regExp.decimal.test(t)},number:function(t){return e.fn.form.settings.regExp.number.test(t)},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,e="string"==typeof e?e.toLowerCase():e,e==t},isExactly:function(e,t){return e==t},not:function(e,t){return e="string"==typeof e?e.toLowerCase():e,t="string"==typeof t?t.toLowerCase():t,e!=t},notExactly:function(e,t){return e!=t},contains:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1!==t.search(new RegExp(n,"i"))},containsExactly:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1!==t.search(new RegExp(n))},doesntContain:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1===t.search(new RegExp(n,"i"))},doesntContainExactly:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1===t.search(new RegExp(n))},minLength:function(e,t){return e!==i?e.length>=t:!1},length:function(e,t){return e!==i?e.length>=t:!1},exactLength:function(e,t){return e!==i?e.length==t:!1},maxLength:function(e,t){return e!==i?e.length<=t:!1},match:function(t,n){{var o;e(this)}return e('[data-validate="'+n+'"]').length>0?o=e('[data-validate="'+n+'"]').val():e("#"+n).length>0?o=e("#"+n).val():e('[name="'+n+'"]').length>0?o=e('[name="'+n+'"]').val():e('[name="'+n+'[]"]').length>0&&(o=e('[name="'+n+'[]"]')),o!==i?t.toString()==o.toString():!1},different:function(t,n){{var o;e(this)}return e('[data-validate="'+n+'"]').length>0?o=e('[data-validate="'+n+'"]').val():e("#"+n).length>0?o=e("#"+n).val():e('[name="'+n+'"]').length>0?o=e('[name="'+n+'"]').val():e('[name="'+n+'[]"]').length>0&&(o=e('[name="'+n+'[]"]')),o!==i?t.toString()!==o.toString():!1},creditCard:function(t,n){var i,o,a={visa:{pattern:/^4/,length:[16]},amex:{pattern:/^3[47]/,length:[15]},mastercard:{pattern:/^5[1-5]/,length:[16]},discover:{pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,length:[16]},unionPay:{pattern:/^(62|88)/,length:[16,17,18,19]},jcb:{pattern:/^35(2[89]|[3-8][0-9])/,length:[16]},maestro:{pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,length:[12,13,14,15,16,17,18,19]},dinersClub:{pattern:/^(30[0-5]|^36)/,length:[14]},laser:{pattern:/^(6304|670[69]|6771)/,length:[16,17,18,19]},visaElectron:{pattern:/^(4026|417500|4508|4844|491(3|7))/,length:[16]}},r={},s=!1,c="string"==typeof n?n.split(","):!1;if("string"==typeof t&&0!==t.length){if(c&&(e.each(c,function(n,i){o=a[i],o&&(r={length:-1!==e.inArray(t.length,o.length),pattern:-1!==t.search(o.pattern)},r.length&&r.pattern&&(s=!0))}),!s))return!1;if(i={number:-1!==e.inArray(t.length,a.unionPay.length),pattern:-1!==t.search(a.unionPay.pattern)},i.number&&i.pattern)return!0;for(var l=t.length,u=0,d=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],m=0;l--;)m+=d[u][parseInt(t.charAt(l),10)],u^=1;return m%10===0&&m>0}},minCount:function(e,t){return 0==t?!0:1==t?""!==e:e.split(",").length>=t},exactCount:function(e,t){return 0==t?""===e:1==t?""!==e&&-1===e.search(","):e.split(",").length==t},maxCount:function(e,t){return 0==t?!1:1==t?-1===e.search(","):e.split(",").length<=t}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.accordion=function(n){{var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var d,m,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.accordion.settings,n):e.extend({},e.fn.accordion.settings),g=f.className,p=f.namespace,v=f.selector,h=f.error,b="."+p,y="module-"+p,x=a.selector||"",C=e(this),w=C.find(v.title),k=C.find(v.content),S=this,T=C.data(y);m={initialize:function(){m.debug("Initializing",C),m.bind.events(),f.observeChanges&&m.observeChanges(),m.instantiate()},instantiate:function(){T=m,C.data(y,m)},destroy:function(){m.debug("Destroying previous instance",C),C.off(b).removeData(y)},refresh:function(){w=C.find(v.title),k=C.find(v.content)},observeChanges:function(){"MutationObserver"in t&&(d=new MutationObserver(function(e){m.debug("DOM tree modified, updating selector cache"),m.refresh()}),d.observe(S,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",d))},bind:{events:function(){m.debug("Binding delegated events"),C.on(f.on+b,v.trigger,m.event.click)}},event:{click:function(){m.toggle.call(this)}},toggle:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t).closest(v.title):e(this).closest(v.title),o=n.next(k),a=o.hasClass(g.animating),r=o.hasClass(g.active),s=r&&!a,c=!r&&a;m.debug("Toggling visibility of content",n),s||c?f.collapsible?m.close.call(n):m.debug("Cannot close accordion content collapsing is disabled"):m.open.call(n)},open:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t).closest(v.title):e(this).closest(v.title),o=n.next(k),a=o.hasClass(g.animating),r=o.hasClass(g.active),s=r||a;return s?void m.debug("Accordion already open, skipping",o):(m.debug("Opening accordion content",n),f.onOpening.call(o),f.exclusive&&m.closeOthers.call(n),n.addClass(g.active),o.stop(!0,!0).addClass(g.animating),f.animateChildren&&(e.fn.transition!==i&&C.transition("is supported")?o.children().transition({animation:"fade in",queue:!1,useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop(!0,!0).animate({opacity:1},f.duration,m.resetOpacity)),void o.slideDown(f.duration,f.easing,function(){o.removeClass(g.animating).addClass(g.active),m.reset.display.call(this),f.onOpen.call(this),f.onChange.call(this)}))},close:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t).closest(v.title):e(this).closest(v.title),o=n.next(k),a=o.hasClass(g.animating),r=o.hasClass(g.active),s=!r&&a,c=r&&a;!r&&!s||c||(m.debug("Closing accordion content",o),f.onClosing.call(o),n.removeClass(g.active),o.stop(!0,!0).addClass(g.animating),f.animateChildren&&(e.fn.transition!==i&&C.transition("is supported")?o.children().transition({animation:"fade out",queue:!1,useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop(!0,!0).animate({opacity:0},f.duration,m.resetOpacity)),o.slideUp(f.duration,f.easing,function(){o.removeClass(g.animating).removeClass(g.active),m.reset.display.call(this),f.onClose.call(this),f.onChange.call(this)}))},closeOthers:function(t){var n,o,a,r=t!==i?w.eq(t):e(this).closest(v.title),s=r.parents(v.content).prev(v.title),c=r.closest(v.accordion),l=v.title+"."+g.active+":visible",u=v.content+"."+g.active+":visible";f.closeNested?(n=c.find(l).not(s),a=n.next(k)):(n=c.find(l).not(s),o=c.find(u).find(l).not(s),n=n.not(o),a=n.next(k)),n.length>0&&(m.debug("Exclusive enabled, closing other content",n),n.removeClass(g.active),a.removeClass(g.animating).stop(!0,!0),f.animateChildren&&(e.fn.transition!==i&&C.transition("is supported")?a.children().transition({animation:"fade out",useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):a.children().stop(!0,!0).animate({opacity:0},f.duration,m.resetOpacity)),a.slideUp(f.duration,f.easing,function(){e(this).removeClass(g.active),m.reset.display.call(this)}))},reset:{display:function(){m.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){m.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){return m.debug("Changing internal",t,n),n===i?m[t]:void(e.isPlainObject(t)?e.extend(!0,m,t):m[t]=n)},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(m.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",x&&(t+=" '"+x+"'"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=T;return n=n||u,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},l?(T===i&&m.initialize(),m.invoke(c)):(T!==i&&T.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",debug:!1,verbose:!1,performance:!0,on:"click",observeChanges:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:350,easing:"easeOutQuad",onOpening:function(){},onOpen:function(){},onClosing:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active",animating:"animating"},selector:{accordion:".accordion",title:".title",trigger:".title",content:".content"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.checkbox=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return r.each(function(){var r,f,g=e.extend(!0,{},e.fn.checkbox.settings,o),p=g.className,v=g.namespace,h=g.selector,b=g.error,y="."+v,x="module-"+v,C=e(this),w=e(this).children(h.label),k=e(this).children(h.input),S=k[0],T=!1,A=!1,R=C.data(x),E=this;

f={initialize:function(){f.verbose("Initializing checkbox",g),f.create.label(),f.bind.events(),f.set.tabbable(),f.hide.input(),f.observeChanges(),f.instantiate(),f.setup()},instantiate:function(){f.verbose("Storing instance of module",f),R=f,C.data(x,f)},destroy:function(){f.verbose("Destroying module"),f.unbind.events(),f.show.input(),C.removeData(x)},fix:{reference:function(){C.is(h.input)&&(f.debug("Behavior called on <input> adjusting invoked element"),C=C.closest(h.checkbox),f.refresh())}},setup:function(){f.set.initialLoad(),f.is.indeterminate()?(f.debug("Initial value is indeterminate"),f.indeterminate()):f.is.checked()?(f.debug("Initial value is checked"),f.check()):(f.debug("Initial value is unchecked"),f.uncheck()),f.remove.initialLoad()},refresh:function(){w=C.children(h.label),k=C.children(h.input),S=k[0]},hide:{input:function(){f.verbose("Modfying <input> z-index to be unselectable"),k.addClass(p.hidden)}},show:{input:function(){f.verbose("Modfying <input> z-index to be selectable"),k.removeClass(p.hidden)}},observeChanges:function(){"MutationObserver"in t&&(r=new MutationObserver(function(e){f.debug("DOM tree modified, updating selector cache"),f.refresh()}),r.observe(E,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",r))},attachEvents:function(t,n){var i=e(t);n=e.isFunction(f[n])?f[n]:f.toggle,i.length>0?(f.debug("Attaching checkbox events to element",t,n),i.on("click"+y,n)):f.error(b.notFound)},event:{click:function(t){var n=e(t.target);return n.is(h.input)?void f.verbose("Using default check action on initialized checkbox"):n.is(h.link)?void f.debug("Clicking link inside checkbox, skipping toggle"):(f.toggle(),k.focus(),void t.preventDefault())},keydown:function(e){var t=e.which,n={enter:13,space:32,escape:27};t==n.escape?(f.verbose("Escape key pressed blurring field"),k.blur(),A=!0):e.ctrlKey||t!=n.space&&t!=n.enter?A=!1:(f.verbose("Enter/space key pressed, toggling checkbox"),f.toggle(),A=!0)},keyup:function(e){A&&e.preventDefault()}},check:function(){f.should.allowCheck()&&(f.debug("Checking checkbox",k),f.set.checked(),f.should.ignoreCallbacks()||(g.onChecked.call(S),g.onChange.call(S)))},uncheck:function(){f.should.allowUncheck()&&(f.debug("Unchecking checkbox"),f.set.unchecked(),f.should.ignoreCallbacks()||(g.onUnchecked.call(S),g.onChange.call(S)))},indeterminate:function(){return f.should.allowIndeterminate()?void f.debug("Checkbox is already indeterminate"):(f.debug("Making checkbox indeterminate"),f.set.indeterminate(),void(f.should.ignoreCallbacks()||(g.onIndeterminate.call(S),g.onChange.call(S))))},determinate:function(){return f.should.allowDeterminate()?void f.debug("Checkbox is already determinate"):(f.debug("Making checkbox determinate"),f.set.determinate(),void(f.should.ignoreCallbacks()||(g.onDeterminate.call(S),g.onChange.call(S))))},enable:function(){return f.is.enabled()?void f.debug("Checkbox is already enabled"):(f.debug("Enabling checkbox"),f.set.enabled(),void g.onEnabled.call(S))},disable:function(){return f.is.disabled()?void f.debug("Checkbox is already disabled"):(f.debug("Disabling checkbox"),f.set.disabled(),void g.onDisabled.call(S))},get:{radios:function(){var t=f.get.name();return e('input[name="'+t+'"]').closest(h.checkbox)},otherRadios:function(){return f.get.radios().not(C)},name:function(){return k.attr("name")}},is:{initialLoad:function(){return T},radio:function(){return k.hasClass(p.radio)||"radio"==k.attr("type")},indeterminate:function(){return k.prop("indeterminate")!==i&&k.prop("indeterminate")},checked:function(){return k.prop("checked")!==i&&k.prop("checked")},disabled:function(){return k.prop("disabled")!==i&&k.prop("disabled")},enabled:function(){return!f.is.disabled()},determinate:function(){return!f.is.indeterminate()},unchecked:function(){return!f.is.checked()}},should:{allowCheck:function(){return f.is.determinate()&&f.is.checked()&&!f.should.forceCallbacks()?(f.debug("Should not allow check, checkbox is already checked"),!1):g.beforeChecked.apply(S)===!1?(f.debug("Should not allow check, beforeChecked cancelled"),!1):!0},allowUncheck:function(){return f.is.determinate()&&f.is.unchecked()&&!f.should.forceCallbacks()?(f.debug("Should not allow uncheck, checkbox is already unchecked"),!1):g.beforeUnchecked.apply(S)===!1?(f.debug("Should not allow uncheck, beforeUnchecked cancelled"),!1):!0},allowIndeterminate:function(){return f.is.indeterminate()&&!f.should.forceCallbacks()?(f.debug("Should not allow indeterminate, checkbox is already indeterminate"),!1):g.beforeIndeterminate.apply(S)===!1?(f.debug("Should not allow indeterminate, beforeIndeterminate cancelled"),!1):!0},allowDeterminate:function(){return f.is.determinate()&&!f.should.forceCallbacks()?(f.debug("Should not allow determinate, checkbox is already determinate"),!1):g.beforeDeterminate.apply(S)===!1?(f.debug("Should not allow determinate, beforeDeterminate cancelled"),!1):!0},forceCallbacks:function(){return f.is.initialLoad()&&g.fireOnInit},ignoreCallbacks:function(){return T&&!g.fireOnInit}},can:{change:function(){return!(C.hasClass(p.disabled)||C.hasClass(p.readOnly)||k.prop("disabled")||k.prop("readonly"))},uncheck:function(){return"boolean"==typeof g.uncheckable?g.uncheckable:!f.is.radio()}},set:{initialLoad:function(){T=!0},checked:function(){return f.verbose("Setting class to checked"),C.removeClass(p.indeterminate).addClass(p.checked),f.is.radio()&&f.uncheckOthers(),!f.is.indeterminate()&&f.is.checked()?void f.debug("Input is already checked, skipping input property change"):(f.verbose("Setting state to checked",S),k.prop("indeterminate",!1).prop("checked",!0),void f.trigger.change())},unchecked:function(){return f.verbose("Removing checked class"),C.removeClass(p.indeterminate).removeClass(p.checked),!f.is.indeterminate()&&f.is.unchecked()?void f.debug("Input is already unchecked"):(f.debug("Setting state to unchecked"),k.prop("indeterminate",!1).prop("checked",!1),void f.trigger.change())},indeterminate:function(){return f.verbose("Setting class to indeterminate"),C.addClass(p.indeterminate),f.is.indeterminate()?void f.debug("Input is already indeterminate, skipping input property change"):(f.debug("Setting state to indeterminate"),k.prop("indeterminate",!0),void f.trigger.change())},determinate:function(){return f.verbose("Removing indeterminate class"),C.removeClass(p.indeterminate),f.is.determinate()?void f.debug("Input is already determinate, skipping input property change"):(f.debug("Setting state to determinate"),void k.prop("indeterminate",!1))},disabled:function(){return f.verbose("Setting class to disabled"),C.addClass(p.disabled),f.is.disabled()?void f.debug("Input is already disabled, skipping input property change"):(f.debug("Setting state to disabled"),k.prop("disabled","disabled"),void f.trigger.change())},enabled:function(){return f.verbose("Removing disabled class"),C.removeClass(p.disabled),f.is.enabled()?void f.debug("Input is already enabled, skipping input property change"):(f.debug("Setting state to enabled"),k.prop("disabled",!1),void f.trigger.change())},tabbable:function(){f.verbose("Adding tabindex to checkbox"),k.attr("tabindex")===i&&k.attr("tabindex",0)}},remove:{initialLoad:function(){T=!1}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=k[0];t&&(f.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},create:{label:function(){k.prevAll(h.label).length>0?(k.prev(h.label).detach().insertAfter(k),f.debug("Moving existing label",w)):f.has.label()||(w=e("<label>").insertAfter(k),f.debug("Creating label",w))}},has:{label:function(){return w.length>0}},bind:{events:function(){f.verbose("Attaching checkbox events"),C.on("click"+y,f.event.click).on("keydown"+y,h.input,f.event.keydown).on("keyup"+y,h.input,f.event.keyup)}},unbind:{events:function(){f.debug("Removing events"),C.off(y)}},uncheckOthers:function(){var e=f.get.otherRadios();f.debug("Unchecking other radios",e),e.removeClass(p.checked)},toggle:function(){return f.can.change()?void(f.is.indeterminate()||f.is.unchecked()?(f.debug("Currently unchecked"),f.check()):f.is.checked()&&f.can.uncheck()&&(f.debug("Currently checked"),f.uncheck())):void(f.is.radio()||f.debug("Checkbox is read-only or disabled, ignoring toggle"))},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=g.name+":",n=0;c=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=R;return n=n||m,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(R===i&&f.initialize(),f.invoke(u)):(R!==i&&R.invoke("destroy"),f.initialize())}),a!==i?a:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!1,onChange:function(){},beforeChecked:function(){},beforeUnchecked:function(){},beforeDeterminate:function(){},beforeIndeterminate:function(){},onChecked:function(){},onUnchecked:function(){},onDeterminate:function(){},onIndeterminate:function(){},onEnable:function(){},onDisable:function(){},className:{checked:"checked",indeterminate:"indeterminate",disabled:"disabled",hidden:"hidden",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{checkbox:".ui.checkbox",label:"label, .box",input:'input[type="checkbox"], input[type="radio"]',link:"a[href]"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.dimmer=function(t){var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return a.each(function(){var d,m,f,g=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),p=g.selector,v=g.namespace,h=g.className,b=g.error,y="."+v,x="module-"+v,C=a.selector||"",w="ontouchstart"in n.documentElement?"touchstart":"click",k=e(this),S=this,T=k.data(x);f={preinitialize:function(){f.is.dimmer()?(m=k.parent(),d=k):(m=k,d=f.has.dimmer()?g.dimmerName?m.find(p.dimmer).filter("."+g.dimmerName):m.find(p.dimmer):f.create())},initialize:function(){f.debug("Initializing dimmer",g),f.bind.events(),f.set.dimmable(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),T=f,k.data(x,T)},destroy:function(){f.verbose("Destroying previous module",d),f.unbind.events(),f.remove.variation(),m.off(y)},bind:{events:function(){"hover"==g.on?m.on("mouseenter"+y,f.show).on("mouseleave"+y,f.hide):"click"==g.on&&m.on(w+y,f.toggle),f.is.page()&&(f.debug("Setting as a page dimmer",m),f.set.pageDimmer()),f.is.closable()&&(f.verbose("Adding dimmer close event",d),m.on(w+y,p.dimmer,f.event.click))}},unbind:{events:function(){k.removeData(x)}},event:{click:function(t){f.verbose("Determining if event occured on dimmer",t),(0===d.find(t.target).length||e(t.target).is(p.content))&&(f.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);f.debug("Add content to dimmer",n),n.parent()[0]!==d[0]&&n.detach().appendTo(d)},create:function(){var t=e(g.template.dimmer());return g.variation&&(f.debug("Creating dimmer with variation",g.variation),t.addClass(g.variation)),g.dimmerName&&(f.debug("Creating named dimmer",g.dimmerName),t.addClass(g.dimmerName)),t.appendTo(m),t},show:function(t){t=e.isFunction(t)?t:function(){},f.debug("Showing dimmer",d,g),f.is.dimmed()&&!f.is.animating()||!f.is.enabled()?f.debug("Dimmer is already shown or disabled"):(f.animate.show(t),g.onShow.call(S),g.onChange.call(S))},hide:function(t){t=e.isFunction(t)?t:function(){},f.is.dimmed()||f.is.animating()?(f.debug("Hiding dimmer",d),f.animate.hide(t),g.onHide.call(S),g.onChange.call(S)):f.debug("Dimmer is not visible")},toggle:function(){f.verbose("Toggling dimmer visibility",d),f.is.dimmed()?f.hide():f.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?("auto"!==g.opacity&&f.set.opacity(),d.transition({animation:g.transition+" in",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.set.dimmed()},onComplete:function(){f.set.active(),t()}})):(f.verbose("Showing dimmer animation with javascript"),f.set.dimmed(),"auto"==g.opacity&&(g.opacity=.8),d.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(f.get.duration(),g.opacity,function(){d.removeAttr("style"),f.set.active(),t()}))},hide:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?(f.verbose("Hiding dimmer with css"),d.transition({animation:g.transition+" out",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.remove.dimmed()},onComplete:function(){f.remove.active(),t()}})):(f.verbose("Hiding dimmer with javascript"),f.remove.dimmed(),d.stop().fadeOut(f.get.duration(),function(){f.remove.active(),d.removeAttr("style"),t()}))}},get:{dimmer:function(){return d},duration:function(){return"object"==typeof g.duration?f.is.active()?g.duration.hide:g.duration.show:g.duration}},has:{dimmer:function(){return g.dimmerName?k.find(p.dimmer).filter("."+g.dimmerName).length>0:k.find(p.dimmer).length>0}},is:{active:function(){return d.hasClass(h.active)},animating:function(){return d.is(":animated")||d.hasClass(h.animating)},closable:function(){return"auto"==g.closable?"hover"==g.on?!1:!0:g.closable},dimmer:function(){return k.hasClass(h.dimmer)},dimmable:function(){return k.hasClass(h.dimmable)},dimmed:function(){return m.hasClass(h.dimmed)},disabled:function(){return m.hasClass(h.disabled)},enabled:function(){return!f.is.disabled()},page:function(){return m.is("body")},pageDimmer:function(){return d.hasClass(h.pageDimmer)}},can:{show:function(){return!d.hasClass(h.disabled)}},set:{opacity:function(e){var t=d.css("background-color"),n=t.split(","),i=n&&4==n.length;e=0===g.opacity?0:g.opacity||e,i?(n[3]=e+")",t=n.join(",")):t="rgba(0, 0, 0, "+e+")",f.debug("Setting opacity to",e),d.css("background-color",t)},active:function(){d.addClass(h.active)},dimmable:function(){m.addClass(h.dimmable)},dimmed:function(){m.addClass(h.dimmed)},pageDimmer:function(){d.addClass(h.pageDimmer)},disabled:function(){d.addClass(h.disabled)},variation:function(e){e=e||g.variation,e&&d.addClass(e)}},remove:{active:function(){d.removeClass(h.active)},dimmed:function(){m.removeClass(h.dimmed)},disabled:function(){d.removeClass(h.disabled)},variation:function(e){e=e||g.variation,e&&d.removeClass(e)}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=g.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",C&&(t+=" '"+C+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=T;return n=n||u,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},f.preinitialize(),l?(T===i&&f.initialize(),f.invoke(c)):(T!==i&&T.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",debug:!1,verbose:!1,performance:!0,dimmerName:!1,variation:!1,closable:"auto",useCSS:!0,transition:"fade",on:!1,opacity:"auto",duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",dimmer:"dimmer",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"},selector:{dimmer:"> .ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.dropdown=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l="ontouchstart"in n.documentElement,u=(new Date).getTime(),d=[],m=arguments[0],f="string"==typeof m,g=[].slice.call(arguments,1);return r.each(function(p){var v,h,b,y,x,C,w,k=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),S=k.className,T=k.message,A=k.fields,R=k.keys,E=k.metadata,P=k.namespace,F=k.regExp,D=k.selector,O=k.error,q=k.templates,j="."+P,z="module-"+P,I=e(this),L=e(k.context),N=I.find(D.text),V=I.find(D.search),H=I.find(D.input),M=I.find(D.icon),U=I.prev().find(D.text).length>0?I.prev().find(D.text):I.prev(),W=I.children(D.menu),B=W.find(D.item),Q=!1,X=!1,$=!1,Y=this,Z=I.data(z);w={initialize:function(){w.debug("Initializing dropdown",k),w.is.alreadySetup()?w.setup.reference():(w.setup.layout(),w.refreshData(),w.save.defaults(),w.restore.selected(),w.create.id(),w.bind.events(),w.observeChanges(),w.instantiate())},instantiate:function(){w.verbose("Storing instance of dropdown",w),Z=w,I.data(z,w)},destroy:function(){w.verbose("Destroying previous dropdown",I),w.remove.tabbable(),I.off(j).removeData(z),W.off(j),s.off(b),x&&x.disconnect(),C&&C.disconnect()},observeChanges:function(){"MutationObserver"in t&&(x=new MutationObserver(function(e){w.debug("<select> modified, recreating menu"),w.setup.select()}),C=new MutationObserver(function(e){w.debug("Menu modified, updating selector cache"),w.refresh()}),w.has.input()&&x.observe(H[0],{childList:!0,subtree:!0}),w.has.menu()&&C.observe(W[0],{childList:!0,subtree:!0}),w.debug("Setting up mutation observer",x,C))},create:{id:function(){y=(Math.random().toString(16)+"000000000").substr(2,8),b="."+y,w.verbose("Creating unique id for element",y)},userChoice:function(t){var n,o,a;return(t=t||w.get.userValues())?(t=e.isArray(t)?t:[t],e.each(t,function(t,r){w.get.item(r)===!1&&(a=k.templates.addition(w.add.variables(T.addResult,r)),o=e("<div />").html(a).attr("data-"+E.value,r).attr("data-"+E.text,r).addClass(S.addition).addClass(S.item),n=n===i?o:n.add(o),w.verbose("Creating user choices for value",r,o))}),n):!1},userLabels:function(t){var n=w.get.userValues();n&&(w.debug("Adding user labels",n),e.each(n,function(e,t){w.verbose("Adding custom user value"),w.add.label(t,t)}))},menu:function(){W=e("<div />").addClass(S.menu).appendTo(I)}},search:function(e){e=e!==i?e:w.get.query(),w.verbose("Searching for query",e),w.filter(e)},select:{firstUnfiltered:function(){w.verbose("Selecting first non-filtered element"),w.remove.selectedItem(),B.not(D.unselectable).eq(0).addClass(S.selected)},nextAvailable:function(e){e=e.eq(0);var t=e.nextAll(D.item).not(D.unselectable).eq(0),n=e.prevAll(D.item).not(D.unselectable).eq(0),i=t.length>0;i?(w.verbose("Moving selection to",t),t.addClass(S.selected)):(w.verbose("Moving selection to",n),n.addClass(S.selected))}},setup:{api:function(){var e={debug:k.debug,on:!1};w.verbose("First request, initializing API"),I.api(e)},layout:function(){I.is("select")&&(w.setup.select(),w.setup.returnedObject()),w.has.menu()||w.create.menu(),w.is.search()&&!w.has.search()&&(w.verbose("Adding search input"),V=e("<input />").addClass(S.search).prop("autocomplete","off").insertBefore(N)),k.allowTab&&w.set.tabbable()},select:function(){var t=w.get.selectValues();w.debug("Dropdown initialized on a select",t),I.is("select")&&(H=I),H.parent(D.dropdown).length>0?(w.debug("UI dropdown already exists. Creating dropdown menu only"),I=H.closest(D.dropdown),w.has.menu()||w.create.menu(),W=I.children(D.menu),w.setup.menu(t)):(w.debug("Creating entire dropdown from select"),I=e("<div />").attr("class",H.attr("class")).addClass(S.selection).addClass(S.dropdown).html(q.dropdown(t)).insertBefore(H),H.hasClass(S.multiple)&&H.prop("multiple")===!1&&(w.error(O.missingMultiple),H.prop("multiple",!0)),H.is("[multiple]")&&w.set.multiple(),H.prop("disabled")&&(w.debug("Disabling dropdown"),I.addClass(S.disabled)),H.removeAttr("class").detach().prependTo(I)),w.refresh()},menu:function(e){W.html(q.menu(e,A)),B=W.find(D.item)},reference:function(){w.debug("Dropdown behavior was called on select, replacing with closest dropdown"),I=I.parent(D.dropdown),w.refresh(),w.setup.returnedObject(),f&&(Z=w,w.invoke(m))},returnedObject:function(){var e=r.slice(0,p),t=r.slice(p+1);r=e.add(I).add(t)}},refresh:function(){w.refreshSelectors(),w.refreshData()},refreshSelectors:function(){w.verbose("Refreshing selector cache"),N=I.find(D.text),V=I.find(D.search),H=I.find(D.input),M=I.find(D.icon),U=I.prev().find(D.text).length>0?I.prev().find(D.text):I.prev(),W=I.children(D.menu),B=W.find(D.item)},refreshData:function(){w.verbose("Refreshing cached metadata"),B.removeData(E.text).removeData(E.value),I.removeData(E.defaultText).removeData(E.defaultValue).removeData(E.placeholderText)},toggle:function(){w.verbose("Toggling menu visibility"),w.is.active()?w.hide():w.show()},show:function(t){if(t=e.isFunction(t)?t:function(){},w.can.show()&&!w.is.active()){if(w.debug("Showing dropdown"),w.is.multiple()&&!w.has.search()&&w.is.allFiltered())return!0;!w.has.message()||w.has.maxSelections()||w.has.allResultsFiltered()||w.remove.message(),k.onShow.call(Y)!==!1&&w.animate.show(function(){w.can.click()&&w.bind.intent(),w.set.visible(),t.call(Y)})}},hide:function(t){t=e.isFunction(t)?t:function(){},w.is.active()&&(w.debug("Hiding dropdown"),k.onHide.call(Y)!==!1&&w.animate.hide(function(){w.remove.visible(),t.call(Y)}))},hideOthers:function(){w.verbose("Finding other dropdowns to hide"),r.not(I).has(D.menu+"."+S.visible).dropdown("hide")},hideMenu:function(){w.verbose("Hiding menu  instantaneously"),w.remove.active(),w.remove.visible(),W.transition("hide")},hideSubMenus:function(){var e=W.children(D.item).find(D.menu);w.verbose("Hiding sub menus",e),e.transition("hide")},bind:{events:function(){l&&w.bind.touchEvents(),w.bind.keyboardEvents(),w.bind.inputEvents(),w.bind.mouseEvents()},touchEvents:function(){w.debug("Touch device detected binding additional touch events"),w.is.searchSelection()||w.is.single()&&I.on("touchstart"+j,w.event.test.toggle),W.on("touchstart"+j,D.item,w.event.item.mouseenter)},keyboardEvents:function(){w.verbose("Binding keyboard events"),I.on("keydown"+j,w.event.keydown),w.has.search()&&I.on(w.get.inputEvent()+j,D.search,w.event.input),w.is.multiple()&&s.on("keydown"+b,w.event.document.keydown)},inputEvents:function(){w.verbose("Binding input change events"),I.on("change"+j,D.input,w.event.change)},mouseEvents:function(){w.verbose("Binding mouse events"),w.is.multiple()&&I.on("click"+j,D.label,w.event.label.click).on("click"+j,D.remove,w.event.remove.click),w.is.searchSelection()?(I.on("mousedown"+j,D.menu,w.event.menu.mousedown).on("mouseup"+j,D.menu,w.event.menu.mouseup).on("click"+j,D.icon,w.event.icon.click).on("click"+j,D.search,w.show).on("focus"+j,D.search,w.event.search.focus).on("blur"+j,D.search,w.event.search.blur).on("click"+j,D.text,w.event.text.focus),w.is.multiple()&&I.on("click"+j,w.event.click)):("click"==k.on?I.on("click"+j,D.icon,w.event.icon.click).on("click"+j,w.event.test.toggle):"hover"==k.on?I.on("mouseenter"+j,w.delay.show).on("mouseleave"+j,w.delay.hide):I.on(k.on+j,w.toggle),I.on("mousedown"+j,w.event.mousedown).on("mouseup"+j,w.event.mouseup).on("focus"+j,w.event.focus).on("blur"+j,w.event.blur)),W.on("mouseenter"+j,D.item,w.event.item.mouseenter).on("mouseleave"+j,D.item,w.event.item.mouseleave).on("click"+j,D.item,w.event.item.click)},intent:function(){w.verbose("Binding hide intent event to document"),l&&s.on("touchstart"+b,w.event.test.touch).on("touchmove"+b,w.event.test.touch),s.on("click"+b,w.event.test.hide)}},unbind:{intent:function(){w.verbose("Removing hide intent event from document"),l&&s.off("touchstart"+b).off("touchmove"+b),s.off("click"+b)}},filter:function(e){var t=e!==i?e:w.get.query(),n=function(){w.is.multiple()&&w.filterActive(),w.select.firstUnfiltered(),w.has.allResultsFiltered()?k.onNoResults.call(Y,t)?k.allowAdditions||(w.verbose("All items filtered, showing message",t),w.add.message(T.noResults)):(w.verbose("All items filtered, hiding dropdown",t),w.hideMenu()):w.remove.message(),k.allowAdditions&&w.add.userSuggestion(e),w.is.searchSelection()&&w.can.show()&&w.is.focusedOnSearch()&&w.show()};k.useLabels&&w.has.maxSelections()||(k.apiSettings?w.can.useAPI()?w.queryRemote(t,function(){n()}):w.error(O.noAPI):(w.filterItems(t),n()))},queryRemote:function(t,n){var i={errorDuration:!1,throttle:k.throttle,urlData:{query:t},onError:function(){w.add.message(T.serverError),n()},onFailure:function(){w.add.message(T.serverError),n()},onSuccess:function(e){w.remove.message(),w.setup.menu({values:e[A.remoteValues]}),n()}};I.api("get request")||w.setup.api(),i=e.extend(!0,{},i,k.apiSettings),I.api("setting",i).api("query")},filterItems:function(t){var n=t!==i?t:w.get.query(),o=null,a=w.escape.regExp(n),r=new RegExp("^"+a,"igm");w.has.query()&&(o=[],w.verbose("Searching for matching values",n),B.each(function(){var t,i,a=e(this);if("both"==k.match||"text"==k.match){if(t=String(w.get.choiceText(a,!1)),-1!==t.search(r))return o.push(this),!0;if(k.fullTextSearch&&w.fuzzySearch(n,t))return o.push(this),!0}if("both"==k.match||"value"==k.match){if(i=String(w.get.choiceValue(a,t)),-1!==i.search(r))return o.push(this),!0;if(k.fullTextSearch&&w.fuzzySearch(n,i))return o.push(this),!0}})),w.debug("Showing only matched items",n),w.remove.filteredItem(),o&&B.not(o).addClass(S.filtered)},fuzzySearch:function(e,t){var n=t.length,i=e.length;if(e=e.toLowerCase(),t=t.toLowerCase(),i>n)return!1;if(i===n)return e===t;e:for(var o=0,a=0;i>o;o++){for(var r=e.charCodeAt(o);n>a;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},filterActive:function(){k.useLabels&&B.filter("."+S.active).addClass(S.filtered)},focusSearch:function(){w.is.search()&&!w.is.focusedOnSearch()&&V[0].focus()},forceSelection:function(){var e=B.not(S.filtered).filter("."+S.selected).eq(0),t=B.not(S.filtered).filter("."+S.active).eq(0),n=e.length>0?e:t,i=n.size()>0;if(w.has.query()){if(i)return w.debug("Forcing partial selection to selected item",n),void w.event.item.click.call(n);w.remove.searchTerm()}w.hide()},event:{change:function(){$||(w.debug("Input changed, updating selection"),w.set.selected())},focus:function(){k.showOnFocus&&!Q&&w.is.hidden()&&!h&&w.show()},click:function(t){var n=e(t.target);n.is(I)&&!w.is.focusedOnSearch()&&w.focusSearch()},blur:function(e){h=n.activeElement===this,Q||h||(w.remove.activeLabel(),w.hide())},mousedown:function(){Q=!0},mouseup:function(){Q=!1},search:{focus:function(){Q=!0,w.is.multiple()&&w.remove.activeLabel(),k.showOnFocus&&(w.search(),w.show())},blur:function(e){h=n.activeElement===this,X||h?h&&k.forceSelection&&w.forceSelection():w.is.multiple()?(w.remove.activeLabel(),w.hide()):k.forceSelection?w.forceSelection():w.hide()}},icon:{click:function(e){w.toggle(),e.stopPropagation()}},text:{focus:function(e){Q=!0,w.focusSearch()}},input:function(e){(w.is.multiple()||w.is.searchSelection())&&w.set.filtered(),clearTimeout(w.timer),w.timer=setTimeout(w.search,k.delay.search)},label:{click:function(t){var n=e(this),i=I.find(D.label),o=i.filter("."+S.active),a=n.nextAll("."+S.active),r=n.prevAll("."+S.active),s=a.length>0?n.nextUntil(a).add(o).add(n):n.prevUntil(r).add(o).add(n);t.shiftKey?(o.removeClass(S.active),s.addClass(S.active)):t.ctrlKey?n.toggleClass(S.active):(o.removeClass(S.active),n.addClass(S.active)),k.onLabelSelect.apply(this,i.filter("."+S.active))}},remove:{click:function(){var t=e(this).parent();t.hasClass(S.active)?w.remove.activeLabels():w.remove.activeLabels(t)}},test:{toggle:function(e){var t=w.is.multiple()?w.show:w.toggle;w.determine.eventOnElement(e,t)&&e.preventDefault()},touch:function(e){w.determine.eventOnElement(e,function(){"touchstart"==e.type?w.timer=setTimeout(function(){w.hide()},k.delay.touch):"touchmove"==e.type&&clearTimeout(w.timer)}),e.stopPropagation()},hide:function(e){w.determine.eventInModule(e,w.hide)}},menu:{mousedown:function(){X=!0},mouseup:function(){X=!1}},item:{mouseenter:function(t){var n=e(this).children(D.menu),i=e(this).siblings(D.item).children(D.menu);n.length>0&&(clearTimeout(w.itemTimer),w.itemTimer=setTimeout(function(){w.verbose("Showing sub-menu",n),e.each(i,function(){w.animate.hide(!1,e(this))}),w.animate.show(!1,n)},k.delay.show),t.preventDefault())},mouseleave:function(t){var n=e(this).children(D.menu);n.length>0&&(clearTimeout(w.itemTimer),w.itemTimer=setTimeout(function(){w.verbose("Hiding sub-menu",n),w.animate.hide(!1,n)},k.delay.hide))},touchend:function(){},click:function(t){var n=e(this),i=e(t?t.target:""),o=n.find(D.menu),a=w.get.choiceText(n),r=w.get.choiceValue(n,a),s=o.length>0,c=o.find(i).length>0;c||s&&!k.allowCategorySelection||(k.useLabels||(w.remove.filteredItem(),w.remove.searchTerm(),w.set.scrollPosition(n)),w.determine.selectAction.call(this,a,r))}},document:{keydown:function(e){var t=e.which,n=w.is.inObject(t,R);if(n){var i=I.find(D.label),o=i.filter("."+S.active),a=(o.data(E.value),i.index(o)),r=i.length,s=o.length>0,c=o.length>1,l=0===a,u=a+1==r,d=w.is.searchSelection(),m=w.is.focusedOnSearch(),f=w.is.focused(),g=m&&0===w.get.caretPosition();if(d&&!s&&!m)return;t==R.leftArrow?!f&&!g||s?s&&(e.shiftKey?w.verbose("Adding previous label to selection"):(w.verbose("Selecting previous label"),i.removeClass(S.active)),l&&!c?o.addClass(S.active):o.prev(D.siblingLabel).addClass(S.active).end(),
e.preventDefault()):(w.verbose("Selecting previous label"),i.last().addClass(S.active)):t==R.rightArrow?(f&&!s&&i.first().addClass(S.active),s&&(e.shiftKey?w.verbose("Adding next label to selection"):(w.verbose("Selecting next label"),i.removeClass(S.active)),u?d?m?i.removeClass(S.active):w.focusSearch():c?o.next(D.siblingLabel).addClass(S.active):o.addClass(S.active):o.next(D.siblingLabel).addClass(S.active),e.preventDefault())):t==R.deleteKey||t==R.backspace?s?(w.verbose("Removing active labels"),u&&d&&!m&&w.focusSearch(),o.last().next(D.siblingLabel).addClass(S.active),w.remove.activeLabels(o),e.preventDefault()):g&&!s&&t==R.backspace&&(w.verbose("Removing last label on input backspace"),o=i.last().addClass(S.active),w.remove.activeLabels(o)):o.removeClass(S.active)}}},keydown:function(e){var t=e.which,n=w.is.inObject(t,R);if(n){var i,o,a=B.not(D.unselectable).filter("."+S.selected).eq(0),r=W.children("."+S.active).eq(0),s=a.length>0?a:r,c=s.length>0?s.siblings(":not(."+S.filtered+")").andSelf():W.children(":not(."+S.filtered+")"),l=s.children(D.menu),u=s.closest(D.menu),d=u.hasClass(S.visible)||u.hasClass(S.animating)||u.parent(D.menu).length>0,m=l.length>0,f=s.length>0,g=s.not(D.unselectable).length>0,p=t==R.delimiter&&k.allowAdditions&&w.is.multiple();if(w.is.visible()){if((t==R.enter||p)&&(t==R.enter&&f&&m&&!k.allowCategorySelection?(w.verbose("Pressed enter on unselectable category, opening sub menu"),t=R.rightArrow):g&&(w.verbose("Selecting item from keyboard shortcut",s),w.event.item.click.call(s,e),w.is.searchSelection()&&w.remove.searchTerm()),e.preventDefault()),t==R.leftArrow&&(o=u[0]!==W[0],o&&(w.verbose("Left key pressed, closing sub-menu"),w.animate.hide(!1,u),s.removeClass(S.selected),u.closest(D.item).addClass(S.selected),e.preventDefault())),t==R.rightArrow&&m&&(w.verbose("Right key pressed, opening sub-menu"),w.animate.show(!1,l),s.removeClass(S.selected),l.find(D.item).eq(0).addClass(S.selected),e.preventDefault()),t==R.upArrow){if(i=f&&d?s.prevAll(D.item+":not("+D.unselectable+")").eq(0):B.eq(0),c.index(i)<0)return w.verbose("Up key pressed but reached top of current menu"),void e.preventDefault();w.verbose("Up key pressed, changing active item"),s.removeClass(S.selected),i.addClass(S.selected),w.set.scrollPosition(i),e.preventDefault()}if(t==R.downArrow){if(i=f&&d?i=s.nextAll(D.item+":not("+D.unselectable+")").eq(0):B.eq(0),0===i.length)return w.verbose("Down key pressed but reached bottom of current menu"),void e.preventDefault();w.verbose("Down key pressed, changing active item"),B.removeClass(S.selected),i.addClass(S.selected),w.set.scrollPosition(i),e.preventDefault()}t==R.pageUp&&(w.scrollPage("up"),e.preventDefault()),t==R.pageDown&&(w.scrollPage("down"),e.preventDefault()),t==R.escape&&(w.verbose("Escape key pressed, closing dropdown"),w.hide())}else p&&e.preventDefault(),t==R.downArrow&&(w.verbose("Down key pressed, showing dropdown"),w.show(),e.preventDefault())}else w.is.selection()&&!w.is.search()&&w.set.selectedLetter(String.fromCharCode(t))}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=H[0];t&&(w.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},determine:{selectAction:function(t,n){w.verbose("Determining action",k.action),e.isFunction(w.action[k.action])?(w.verbose("Triggering preset action",k.action,t,n),w.action[k.action].call(this,t,n)):e.isFunction(k.action)?(w.verbose("Triggering user action",k.action,t,n),k.action.call(this,t,n)):w.error(O.action,k.action)},eventInModule:function(t,i){var o=e(t.target),a=o.closest(n.documentElement).length>0,r=o.closest(I).length>0;return i=e.isFunction(i)?i:function(){},a&&!r?(w.verbose("Triggering event",i),i(),!0):(w.verbose("Event occurred in dropdown, canceling callback"),!1)},eventOnElement:function(t,n){var i=e(t.target),o=i.closest(D.siblingLabel),a=0===I.find(o).length,r=0===i.closest(W).length;return n=e.isFunction(n)?n:function(){},a&&r?(w.verbose("Triggering event",n),n(),!0):(w.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(t,n){if(n=n!==i?n:t,w.can.activate(e(this))){if(w.set.selected(n,e(this)),w.is.multiple()&&!w.is.allFiltered())return;w.hideAndClear()}},select:function(e,t){w.action.activate.call(this)},combo:function(t,n){n=n!==i?n:t,w.set.selected(n,e(this)),w.hideAndClear()},hide:function(e,t){w.set.value(t),w.hideAndClear()}},get:{id:function(){return y},defaultText:function(){return I.data(E.defaultText)},defaultValue:function(){return I.data(E.defaultValue)},placeholderText:function(){return I.data(E.placeholderText)||""},text:function(){return N.text()},query:function(){return e.trim(V.val())},searchWidth:function(e){return e*k.glyphWidth+"em"},selectionCount:function(){var t,n=w.get.values();return t=w.is.multiple()?e.isArray(n)?n.length:0:""!==w.get.value()?1:0},transition:function(e){return"auto"==k.transition?w.is.upward(e)?"slide up":"slide down":k.transition},userValues:function(){var t=w.get.values();return t?(t=e.isArray(t)?t:[t],e.grep(t,function(e){return w.get.item(e)===!1})):!1},uniqueArray:function(t){return e.grep(t,function(n,i){return e.inArray(n,t)===i})},caretPosition:function(){var e,t,i=V.get(0);return"selectionStart"in i?i.selectionStart:n.selection?(i.focus(),e=n.selection.createRange(),t=e.text.length,e.moveStart("character",-i.value.length),e.text.length-t):void 0},value:function(){var t=H.length>0?H.val():I.data(E.value);return e.isArray(t)&&1===t.length&&""===t[0]?"":t},values:function(){var e=w.get.value();return""===e?"":!w.has.selectInput()&&w.is.multiple()?"string"==typeof e?e.split(k.delimiter):"":e},remoteValues:function(){var t=w.get.values(),n=!1;return t&&("string"==typeof t&&(t=[t]),n={},e.each(t,function(e,t){var i=w.read.remoteData(t);w.verbose("Restoring value from session data",i,t),n[t]=i?i:t})),n},choiceText:function(t,n){return n=n!==i?n:k.preserveHTML,t?(t.find(D.menu).length>0&&(w.verbose("Retreiving text of element with sub-menu"),t=t.clone(),t.find(D.menu).remove(),t.find(D.menuIcon).remove()),t.data(E.text)!==i?t.data(E.text):e.trim(n?t.html():t.text())):void 0},choiceValue:function(t,n){return n=n||w.get.choiceText(t),t?t.data(E.value)!==i?String(t.data(E.value)):"string"==typeof n?e.trim(n.toLowerCase()):String(n):!1},inputEvent:function(){var e=V[0];return e?e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup":!1},selectValues:function(){var t={};return t.values=[],I.find("option").each(function(){var n=e(this),o=n.html(),a=n.attr("disabled"),r=n.attr("value")!==i?n.attr("value"):o;"auto"===k.placeholder&&""===r?t.placeholder=o:t.values.push({name:o,value:r,disabled:a})}),k.placeholder&&"auto"!==k.placeholder&&(w.debug("Setting placeholder value to",k.placeholder),t.placeholder=k.placeholder),k.sortSelect?(t.values.sort(function(e,t){return e.name>t.name?1:-1}),w.debug("Retrieved and sorted values from select",t)):w.debug("Retreived values from select",t),t},activeItem:function(){return B.filter("."+S.active)},selectedItem:function(){var e=B.not(D.unselectable).filter("."+S.selected);return e.length>0?e:B.eq(0)},itemWithAdditions:function(e){var t=w.get.item(e),n=w.create.userChoice(e),i=n&&n.length>0;return i&&(t=t.length>0?t.add(n):n),t},item:function(t,n){var o,a,r=!1;return t=t!==i?t:w.get.values()!==i?w.get.values():w.get.text(),o=a?t.length>0:t!==i&&null!==t,a=w.is.multiple()&&e.isArray(t),n=""===t||0===t?!0:n||!1,o&&B.each(function(){var o=e(this),s=w.get.choiceText(o),c=w.get.choiceValue(o,s);if(null!==c&&c!==i)if(a)(-1!==e.inArray(String(c),t)||-1!==e.inArray(s,t))&&(r=r?r.add(o):o);else if(n){if(w.verbose("Ambiguous dropdown value using strict type check",o,t),c===t||s===t)return r=o,!0}else if(String(c)==String(t)||s==t)return w.verbose("Found select item by value",c,t),r=o,!0}),r}},check:{maxSelections:function(e){return k.maxSelections?(e=e!==i?e:w.get.selectionCount(),e>=k.maxSelections?(w.debug("Maximum selection count reached"),k.useLabels&&(B.addClass(S.filtered),w.add.message(T.maxSelections)),!0):(w.verbose("No longer at maximum selection count"),w.remove.message(),w.remove.filteredItem(),w.is.searchSelection()&&w.filterItems(),!1)):!0}},restore:{defaults:function(){w.clear(),w.restore.defaultText(),w.restore.defaultValue()},defaultText:function(){var e=w.get.defaultText(),t=w.get.placeholderText;e===t?(w.debug("Restoring default placeholder text",e),w.set.placeholderText(e)):(w.debug("Restoring default text",e),w.set.text(e))},defaultValue:function(){var e=w.get.defaultValue();e!==i&&(w.debug("Restoring default value",e),""!==e?(w.set.value(e),w.set.selected()):(w.remove.activeItem(),w.remove.selectedItem()))},labels:function(){k.allowAdditions&&(k.useLabels||(w.error(O.labels),k.useLabels=!0),w.debug("Restoring selected values"),w.create.userLabels()),w.check.maxSelections()},selected:function(){w.restore.values(),w.is.multiple()?(w.debug("Restoring previously selected values and labels"),w.restore.labels()):w.debug("Restoring previously selected values")},values:function(){w.set.initialLoad(),k.apiSettings?k.saveRemoteData?w.restore.remoteValues():w.clearValue():w.set.selected(),w.remove.initialLoad()},remoteValues:function(){var t=w.get.remoteValues();w.debug("Recreating selected from session data",t),t&&(w.is.single()?e.each(t,function(e,t){w.set.text(t)}):e.each(t,function(e,t){w.add.label(e,t)}))}},read:{remoteData:function(e){var n;return t.Storage===i?void w.error(O.noStorage):(n=sessionStorage.getItem(e),n!==i?n:!1)}},save:{defaults:function(){w.save.defaultText(),w.save.placeholderText(),w.save.defaultValue()},defaultValue:function(){var e=w.get.value();w.verbose("Saving default value as",e),I.data(E.defaultValue,e)},defaultText:function(){var e=w.get.text();w.verbose("Saving default text as",e),I.data(E.defaultText,e)},placeholderText:function(){var e;k.placeholder!==!1&&N.hasClass(S.placeholder)&&(e=w.get.text(),w.verbose("Saving placeholder text as",e),I.data(E.placeholderText,e))},remoteData:function(e,n){return t.Storage===i?void w.error(O.noStorage):(w.verbose("Saving remote data to session storage",n,e),void sessionStorage.setItem(n,e))}},clear:function(){w.is.multiple()?w.remove.labels():(w.remove.activeItem(),w.remove.selectedItem()),w.set.placeholderText(),w.clearValue()},clearValue:function(){w.set.value("")},scrollPage:function(e,t){var n,i,o,a=t||w.get.selectedItem(),r=a.closest(D.menu),s=r.outerHeight(),c=r.scrollTop(),l=B.eq(0).outerHeight(),u=Math.floor(s/l),d=(r.prop("scrollHeight"),"up"==e?c-l*u:c+l*u),m=B.not(D.unselectable);o="up"==e?m.index(a)-u:m.index(a)+u,n="up"==e?o>=0:o<m.length,i=n?m.eq(o):"up"==e?m.first():m.last(),i.length>0&&(w.debug("Scrolling page",e,i),a.removeClass(S.selected),i.addClass(S.selected),r.scrollTop(d))},set:{filtered:function(){var e=w.is.multiple(),t=w.is.searchSelection(),n=e&&t,i=t?w.get.query():"",o="string"==typeof i&&i.length>0,a=w.get.searchWidth(i.length),r=""!==i;e&&o&&(w.verbose("Adjusting input width",a,k.glyphWidth),V.css("width",a)),o||n&&r?(w.verbose("Hiding placeholder text"),N.addClass(S.filtered)):(!e||n&&!r)&&(w.verbose("Showing placeholder text"),N.removeClass(S.filtered))},loading:function(){I.addClass(S.loading)},placeholderText:function(e){e=e||w.get.placeholderText(),w.debug("Setting placeholder text",e),w.set.text(e),N.addClass(S.placeholder)},tabbable:function(){w.has.search()?(w.debug("Added tabindex to searchable dropdown"),V.val("").attr("tabindex",0),W.attr("tabindex",-1)):(w.debug("Added tabindex to dropdown"),I.attr("tabindex")===i&&(I.attr("tabindex",0),W.attr("tabindex",-1)))},initialLoad:function(){w.verbose("Setting initial load"),v=!0},activeItem:function(e){e.addClass(k.allowAdditions&&e.filter(D.addition).length>0?S.filtered:S.active)},scrollPosition:function(e,t){var n,o,a,r,s,c,l,u,d,m=5;e=e||w.get.selectedItem(),n=e.closest(D.menu),o=e&&e.length>0,t=t!==i?t:!1,e&&n.length>0&&o&&(r=e.position().top,n.addClass(S.loading),c=n.scrollTop(),s=n.offset().top,r=e.offset().top,a=c-s+r,t||(l=n.height(),d=a+m>c+l,u=c>a-m),w.debug("Scrolling to active item",a),(t||u||d)&&n.scrollTop(a),n.removeClass(S.loading))},text:function(e){"select"!==k.action&&("combo"==k.action?(w.debug("Changing combo button text",e,U),k.preserveHTML?U.html(e):U.text(e)):(e!==w.get.placeholderText()&&N.removeClass(S.placeholder),w.debug("Changing text",e,N),N.removeClass(S.filtered),k.preserveHTML?N.html(e):N.text(e)))},selectedLetter:function(t){var n,i=B.filter("."+S.selected),o=i.length>0&&w.has.firstLetter(i,t),a=!1;o&&(n=i.nextAll(B).eq(0),w.has.firstLetter(n,t)&&(a=n)),a||B.each(function(){return w.has.firstLetter(e(this),t)?(a=e(this),!1):void 0}),a&&(w.verbose("Scrolling to next value with letter",t),w.set.scrollPosition(a),i.removeClass(S.selected),a.addClass(S.selected))},direction:function(e){"auto"==k.direction?w.is.onScreen(e)?w.remove.upward(e):w.set.upward(e):"upward"==k.direction&&w.set.upward(e)},upward:function(e){var t=e||I;t.addClass(S.upward)},value:function(e,t,n){var o=H.length>0,a=(!w.has.value(e),w.get.values()),r=e!==i?String(e):e;if(o){if(r==a&&(w.verbose("Skipping value update already same value",e,a),!w.is.initialLoad()))return;w.is.single()&&w.has.selectInput()&&w.can.extendSelect()&&(w.debug("Adding user option",e),w.add.optionValue(e)),w.debug("Updating input value",e,a),$=!0,H.val(e),k.fireOnInit===!1&&w.is.initialLoad()?w.debug("Input native change event ignored on initial load"):w.trigger.change(),$=!1}else w.verbose("Storing value in metadata",e,H),e!==a&&I.data(E.value,r);k.fireOnInit===!1&&w.is.initialLoad()?w.verbose("No callback on initial load",k.onChange):k.onChange.call(Y,e,t,n)},active:function(){I.addClass(S.active)},multiple:function(){I.addClass(S.multiple)},visible:function(){I.addClass(S.visible)},exactly:function(e,t){w.debug("Setting selected to exact values"),w.clear(),w.set.selected(e,t)},selected:function(t,n){var i=w.is.multiple();n=k.allowAdditions?n||w.get.itemWithAdditions(t):n||w.get.item(t),n&&(w.debug("Setting selected menu item to",n),w.is.single()?(w.remove.activeItem(),w.remove.selectedItem()):k.useLabels&&w.remove.selectedItem(),n.each(function(){var t=e(this),o=w.get.choiceText(t),a=w.get.choiceValue(t,o),r=t.hasClass(S.filtered),s=t.hasClass(S.active),c=t.hasClass(S.addition),l=i&&1==n.length;i?!s||c?(k.apiSettings&&k.saveRemoteData&&w.save.remoteData(o,a),k.useLabels?(w.add.value(a,o,t),w.add.label(a,o,l),w.set.activeItem(t),w.filterActive(),w.select.nextAvailable(n)):(w.add.value(a,o,t),w.set.text(w.add.variables(T.count)),w.set.activeItem(t))):r||(w.debug("Selected active value, removing label"),w.remove.selected(a)):(k.apiSettings&&k.saveRemoteData&&w.save.remoteData(o,a),w.set.text(o),w.set.value(a,o,t),t.addClass(S.active).addClass(S.selected))}))}},add:{label:function(t,n,i){var o,a=w.is.searchSelection()?V:N;return o=e("<a />").addClass(S.label).attr("data-value",t).html(q.label(t,n)),o=k.onLabelCreate.call(o,t,n),w.has.label(t)?void w.debug("Label already exists, skipping",t):(k.label.variation&&o.addClass(k.label.variation),void(i===!0?(w.debug("Animating in label",o),o.addClass(S.hidden).insertBefore(a).transition(k.label.transition,k.label.duration)):(w.debug("Adding selection label",o),o.insertBefore(a))))},message:function(t){var n=W.children(D.message),i=k.templates.message(w.add.variables(t));n.length>0?n.html(i):n=e("<div/>").html(i).addClass(S.message).appendTo(W)},optionValue:function(t){var n=H.find('option[value="'+t+'"]'),i=n.length>0;i||(x&&(x.disconnect(),w.verbose("Temporarily disconnecting mutation observer",t)),w.is.single()&&(w.verbose("Removing previous user addition"),H.find("option."+S.addition).remove()),e("<option/>").prop("value",t).addClass(S.addition).html(t).appendTo(H),w.verbose("Adding user addition as an <option>",t),x&&x.observe(H[0],{childList:!0,subtree:!0}))},userSuggestion:function(e){var t,n=W.children(D.addition),i=w.get.item(e),o=i&&i.not(D.addition).length,a=n.length>0;if(!k.useLabels||!w.has.maxSelections()){if(""===e||o)return void n.remove();B.removeClass(S.selected),a?(t=k.templates.addition(w.add.variables(T.addResult,e)),n.html(t).attr("data-"+E.value,e).attr("data-"+E.text,e).removeClass(S.filtered).addClass(S.selected),w.verbose("Replacing user suggestion with new value",n)):(n=w.create.userChoice(e),n.prependTo(W).addClass(S.selected),w.verbose("Adding item choice to menu corresponding with user choice addition",n))}},variables:function(e,t){var n,i,o=-1!==e.search("{count}"),a=-1!==e.search("{maxCount}"),r=-1!==e.search("{term}");return w.verbose("Adding templated variables to message",e),o&&(n=w.get.selectionCount(),e=e.replace("{count}",n)),a&&(n=w.get.selectionCount(),e=e.replace("{maxCount}",k.maxSelections)),r&&(i=t||w.get.query(),e=e.replace("{term}",i)),e},value:function(t,n,i){var o,a=w.get.values();return""===t?void w.debug("Cannot select blank values from multiselect"):(e.isArray(a)?(o=a.concat([t]),o=w.get.uniqueArray(o)):o=[t],w.has.selectInput()?w.can.extendSelect()&&(w.debug("Adding value to select",t,o,H),w.add.optionValue(t)):(o=o.join(k.delimiter),w.debug("Setting hidden input to delimited value",o,H)),k.fireOnInit===!1&&w.is.initialLoad()?w.verbose("Skipping onadd callback on initial load",k.onAdd):k.onAdd.call(Y,t,n,i),w.set.value(o,t,n,i),void w.check.maxSelections())}},remove:{active:function(){I.removeClass(S.active)},activeLabel:function(){I.find(D.label).removeClass(S.active)},loading:function(){I.removeClass(S.loading)},initialLoad:function(){v=!1},upward:function(e){var t=e||I;t.removeClass(S.upward)},visible:function(){I.removeClass(S.visible)},activeItem:function(){B.removeClass(S.active)},filteredItem:function(){k.useLabels&&w.has.maxSelections()||(k.useLabels&&w.is.multiple()?B.not("."+S.active).removeClass(S.filtered):B.removeClass(S.filtered))},optionValue:function(e){var t=H.find('option[value="'+e+'"]'),n=t.length>0;n&&t.hasClass(S.addition)&&(x&&(x.disconnect(),w.verbose("Temporarily disconnecting mutation observer",e)),t.remove(),w.verbose("Removing user addition as an <option>",e),x&&x.observe(H[0],{childList:!0,subtree:!0}))},message:function(){W.children(D.message).remove()},searchTerm:function(){w.verbose("Cleared search term"),V.val(""),w.set.filtered()},selected:function(t,n){return(n=k.allowAdditions?n||w.get.itemWithAdditions(t):n||w.get.item(t))?void n.each(function(){var t=e(this),n=w.get.choiceText(t),i=w.get.choiceValue(t,n);w.is.multiple()?k.useLabels?(w.remove.value(i,n,t),w.remove.label(i)):(w.remove.value(i,n,t),0===w.get.selectionCount()?w.set.placeholderText():w.set.text(w.add.variables(T.count))):w.remove.value(i,n,t),t.removeClass(S.filtered).removeClass(S.active),k.useLabels&&t.removeClass(S.selected)}):!1},selectedItem:function(){B.removeClass(S.selected)},value:function(e,t,n){var i,o=w.get.values();w.has.selectInput()?(w.verbose("Input is <select> removing selected option",e),i=w.remove.arrayValue(e,o),w.remove.optionValue(e)):(w.verbose("Removing from delimited values",e),i=w.remove.arrayValue(e,o),i=i.join(k.delimiter)),k.fireOnInit===!1&&w.is.initialLoad()?w.verbose("No callback on initial load",k.onRemove):k.onRemove.call(Y,e,t,n),w.set.value(i,t,n),w.check.maxSelections()},arrayValue:function(t,n){return e.isArray(n)||(n=[n]),n=e.grep(n,function(e){return t!=e}),w.verbose("Removed value from delimited string",t,n),n},label:function(e,t){var n=I.find(D.label),i=n.filter('[data-value="'+e+'"]');w.verbose("Removing label",i),i.remove()},activeLabels:function(e){e=e||I.find(D.label).filter("."+S.active),w.verbose("Removing active label selections",e),w.remove.labels(e)},labels:function(t){t=t||I.find(D.label),w.verbose("Removing labels",t),t.each(function(){var t=e(this),n=t.data(E.value),o=n!==i?String(n):n,a=w.is.userValue(o);return k.onLabelRemove.call(t,n)===!1?void w.debug("Label remove callback cancelled removal"):void(a?(w.remove.value(o),w.remove.label(o)):w.remove.selected(o))})},tabbable:function(){w.has.search()?(w.debug("Searchable dropdown initialized"),V.removeAttr("tabindex"),W.removeAttr("tabindex")):(w.debug("Simple selection dropdown initialized"),I.removeAttr("tabindex"),W.removeAttr("tabindex"))}},has:{search:function(){return V.length>0},selectInput:function(){return H.is("select")},firstLetter:function(e,t){var n,i;return e&&0!==e.length&&"string"==typeof t?(n=w.get.choiceText(e,!1),t=t.toLowerCase(),i=String(n).charAt(0).toLowerCase(),t==i):!1},input:function(){return H.length>0},items:function(){return B.length>0},menu:function(){return W.length>0},message:function(){return 0!==W.children(D.message).length},label:function(e){var t=I.find(D.label);return t.filter('[data-value="'+e+'"]').length>0},maxSelections:function(){return k.maxSelections&&w.get.selectionCount()>=k.maxSelections},allResultsFiltered:function(){return B.filter(D.unselectable).length===B.length},query:function(){return""!==w.get.query()},value:function(t){var n=w.get.values(),i=e.isArray(n)?n&&-1!==e.inArray(t,n):n==t;return i?!0:!1}},is:{active:function(){return I.hasClass(S.active)},alreadySetup:function(){return I.is("select")&&I.parent(D.dropdown).length>0&&0===I.prev().length},animating:function(e){return e?e.transition&&e.transition("is animating"):W.transition&&W.transition("is animating")},disabled:function(){return I.hasClass(S.disabled)},focused:function(){return n.activeElement===I[0]},focusedOnSearch:function(){return n.activeElement===V[0]},allFiltered:function(){return(w.is.multiple()||w.has.search())&&!w.has.message()&&w.has.allResultsFiltered()},hidden:function(e){return!w.is.visible(e)},initialLoad:function(){return v},onScreen:function(e){var t,n=e||W,i=!0,o={};return n.addClass(S.loading),t={context:{scrollTop:L.scrollTop(),height:L.outerHeight()},menu:{offset:n.offset(),height:n.outerHeight()}},o={above:t.context.scrollTop<=t.menu.offset.top-t.menu.height,below:t.context.scrollTop+t.context.height>=t.menu.offset.top+t.menu.height},o.below?(w.verbose("Dropdown can fit in context downward",o),i=!0):o.below||o.above?(w.verbose("Dropdown cannot fit below, opening upward",o),i=!1):(w.verbose("Dropdown cannot fit in either direction, favoring downward",o),i=!0),n.removeClass(S.loading),i},inObject:function(t,n){var i=!1;return e.each(n,function(e,n){return n==t?(i=!0,!0):void 0}),i},multiple:function(){return I.hasClass(S.multiple)},single:function(){return!w.is.multiple()},selectMutation:function(t){var n=!1;return e.each(t,function(t,i){return i.target&&e(i.target).is("select")?(n=!0,!0):void 0}),n},search:function(){return I.hasClass(S.search)},searchSelection:function(){return w.has.search()&&1===V.parent(D.dropdown).length},selection:function(){return I.hasClass(S.selection)},userValue:function(t){return-1!==e.inArray(t,w.get.userValues())},upward:function(e){var t=e||I;return t.hasClass(S.upward)},visible:function(e){return e?e.hasClass(S.visible):W.hasClass(S.visible)}},can:{activate:function(e){return k.useLabels?!0:w.has.maxSelections()?w.has.maxSelections()&&e.hasClass(S.active)?!0:!1:!0},click:function(){return l||"click"==k.on},extendSelect:function(){return k.allowAdditions||k.apiSettings},show:function(){return!w.is.disabled()&&(w.has.items()||w.has.message())},useAPI:function(){return e.fn.api!==i}},animate:{show:function(t,n){var o,a=n||W,r=n?function(){}:function(){w.hideSubMenus(),w.hideOthers(),w.set.active()};t=e.isFunction(t)?t:function(){},w.verbose("Doing menu show animation",a),w.set.direction(n),o=w.get.transition(n),w.is.selection()&&w.set.scrollPosition(w.get.selectedItem(),!0),(w.is.hidden(a)||w.is.animating(a))&&("none"==o?(r(),a.transition("show"),t.call(Y)):e.fn.transition!==i&&I.transition("is supported")?a.transition({animation:o+" in",debug:k.debug,verbose:k.verbose,duration:k.duration,queue:!0,onStart:r,onComplete:function(){t.call(Y)}}):w.error(O.noTransition,o))},hide:function(t,n){var o=n||W,a=(n?.9*k.duration:k.duration,n?function(){}:function(){w.can.click()&&w.unbind.intent(),w.remove.active()}),r=w.get.transition(n);t=e.isFunction(t)?t:function(){},(w.is.visible(o)||w.is.animating(o))&&(w.verbose("Doing menu hide animation",o),"none"==r?(a(),o.transition("hide"),t.call(Y)):e.fn.transition!==i&&I.transition("is supported")?o.transition({animation:r+" out",duration:k.duration,debug:k.debug,verbose:k.verbose,queue:!0,onStart:a,onComplete:function(){"auto"==k.direction&&w.remove.upward(n),t.call(Y)}}):w.error(O.transition))}},hideAndClear:function(){w.remove.searchTerm(),w.has.maxSelections()||(w.has.search()?w.hide(function(){w.remove.filteredItem()}):w.hide())},delay:{show:function(){w.verbose("Delaying show event to ensure user intent"),clearTimeout(w.timer),w.timer=setTimeout(w.show,k.delay.show)},hide:function(){w.verbose("Delaying hide event to ensure user intent"),clearTimeout(w.timer),w.timer=setTimeout(w.hide,k.delay.hide)}},escape:{regExp:function(e){return e=String(e),e.replace(F.escape,"\\$&")}},setting:function(t,n){if(w.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,w,t);else{if(n===i)return w[t];w[t]=n}},debug:function(){k.debug&&(k.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,k.name+":"),w.debug.apply(console,arguments)))},verbose:function(){k.verbose&&k.debug&&(k.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),w.verbose.apply(console,arguments)))},error:function(){w.error=Function.prototype.bind.call(console.error,console,k.name+":"),w.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;k.performance&&(t=(new Date).getTime(),i=u||t,n=t-i,u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:Y,"Execution Time":n})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var t=k.name+":",n=0;u=!1,clearTimeout(w.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,o){var r,s,c,l=Z;return n=n||g,o=Y||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(w.error(O.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},f?(Z===i&&w.initialize(),w.invoke(m)):(Z!==i&&Z.invoke("destroy"),w.initialize())}),a!==i?a:r},e.fn.dropdown.settings={debug:!1,verbose:!1,performance:!0,on:"click",action:"activate",apiSettings:!1,saveRemoteData:!0,throttle:200,context:t,direction:"auto",keepOnScreen:!0,match:"both",fullTextSearch:!1,placeholder:"auto",preserveHTML:!0,sortSelect:!1,forceSelection:!0,allowAdditions:!1,maxSelections:!1,useLabels:!0,delimiter:",",showOnFocus:!0,allowTab:!0,allowCategorySelection:!1,fireOnInit:!1,transition:"auto",duration:200,glyphWidth:1.0714,label:{transition:"scale",duration:200,variation:!1},delay:{hide:300,show:200,search:20,touch:50},onChange:function(e,t,n){},onAdd:function(e,t,n){},onRemove:function(e,t,n){},onLabelSelect:function(e){},onLabelCreate:function(t,n){return e(this)},onLabelRemove:function(e){return!0},onNoResults:function(e){return!0},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",message:{addResult:"Add <b>{term}</b>",count:"{count} selected",maxSelections:"Max {maxCount} selections",noResults:"No results found.",serverError:"There was an error contacting the server"},error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",labels:"Allowing user additions currently requires the use of labels.",missingMultiple:"<select> requires multiple property to be set to correctly preserve multiple values",method:"The method you called is not defined.",noAPI:"The API module is required to load resources remotely",noStorage:"Saving remote data requires session storage",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>"},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s]/g},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholder",text:"text",value:"value"},fields:{remoteValues:"results",values:"values",name:"name",value:"value"},keys:{backspace:8,delimiter:188,deleteKey:46,enter:13,escape:27,pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},selector:{addition:".addition",dropdown:".ui.dropdown",icon:"> .dropdown.icon",input:'> input[type="hidden"], > select',item:".item",label:"> .label",remove:"> .label > .delete.icon",siblingLabel:".label",menu:".menu",message:".message",menuIcon:".dropdown.icon",search:"input.search, .menu > .search > input",text:"> .text:not(.icon)",unselectable:".disabled, .filtered"},className:{active:"active",addition:"addition",animating:"animating",disabled:"disabled",dropdown:"ui dropdown",filtered:"filtered",hidden:"hidden transition",item:"item",label:"ui label",loading:"loading",menu:"menu",message:"message",multiple:"multiple",placeholder:"default",search:"search",selected:"selected",selection:"selection",upward:"upward",visible:"visible"}},e.fn.dropdown.settings.templates={dropdown:function(t){var n=t.placeholder||!1,i=(t.values||{},"");return i+='<i class="dropdown icon"></i>',i+=t.placeholder?'<div class="default text">'+n+"</div>":'<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+=t.disabled?'<div class="disabled item" data-value="'+t.value+'">'+t.name+"</div>":'<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),i+="</div>"},menu:function(t,n){var i=t[n.values]||{},o="";return e.each(i,function(e,t){o+='<div class="item" data-value="'+t[n.value]+'">'+t[n.name]+"</div>"}),o},label:function(e,t){return t+'<i class="delete icon"></i>'},message:function(e){return e},addition:function(e){return e}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.embed=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var m,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.embed.settings,n):e.extend({},e.fn.embed.settings),g=f.selector,p=f.className,v=f.sources,h=f.error,b=f.metadata,y=f.namespace,x=f.templates,C="."+y,w="module-"+y,k=(e(t),e(this)),S=k.find(g.placeholder),T=k.find(g.icon),A=k.find(g.embed),R=this,E=k.data(w);m={initialize:function(){m.debug("Initializing embed"),m.determine.autoplay(),m.create(),m.bind.events(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),E=m,k.data(w,m)},destroy:function(){m.verbose("Destroying previous instance of embed"),m.reset(),k.removeData(w).off(C)},refresh:function(){m.verbose("Refreshing selector cache"),S=k.find(g.placeholder),T=k.find(g.icon),A=k.find(g.embed)},bind:{events:function(){m.has.placeholder()&&(m.debug("Adding placeholder events"),k.on("click"+C,g.placeholder,m.createAndShow).on("click"+C,g.icon,m.createAndShow))}},create:function(){var e=m.get.placeholder();e?m.createPlaceholder():m.createAndShow()},createPlaceholder:function(e){{var t=m.get.icon(),n=m.get.url();m.generate.embed(n)}e=e||m.get.placeholder(),k.html(x.placeholder(e,t)),m.debug("Creating placeholder for embed",e,t)},createEmbed:function(t){m.refresh(),t=t||m.get.url(),A=e("<div/>").addClass(p.embed).html(m.generate.embed(t)).appendTo(k),f.onCreate.call(R,t),m.debug("Creating embed object",A)},createAndShow:function(){m.createEmbed(),m.show()},change:function(e,t,n){m.debug("Changing video to ",e,t,n),k.data(b.source,e).data(b.id,t).data(b.url,n),
m.create()},reset:function(){m.debug("Clearing embed and showing placeholder"),m.remove.active(),m.remove.embed(),m.showPlaceholder(),f.onReset.call(R)},show:function(){m.debug("Showing embed"),m.set.active(),f.onDisplay.call(R)},hide:function(){m.debug("Hiding embed"),m.showPlaceholder()},showPlaceholder:function(){m.debug("Showing placeholder image"),m.remove.active(),f.onPlaceholderDisplay.call(R)},get:{id:function(){return f.id||k.data(b.id)},placeholder:function(){return f.placeholder||k.data(b.placeholder)},icon:function(){return f.icon?f.icon:k.data(b.icon)!==i?k.data(b.icon):m.determine.icon()},source:function(e){return f.source?f.source:k.data(b.source)!==i?k.data(b.source):m.determine.source()},type:function(){var e=m.get.source();return v[e]!==i?v[e].type:!1},url:function(){return f.url?f.url:k.data(b.url)!==i?k.data(b.url):m.determine.url()}},determine:{autoplay:function(){m.should.autoplay()&&(f.autoplay=!0)},source:function(t){var n=!1;return t=t||m.get.url(),t&&e.each(v,function(e,i){return-1!==t.search(i.domain)?(n=e,!1):void 0}),n},icon:function(){var e=m.get.source();return v[e]!==i?v[e].icon:!1},url:function(){var e,t=f.id||k.data(b.id),n=f.source||k.data(b.source);return e=v[n]!==i?v[n].url.replace("{id}",t):!1,e&&k.data(b.url,e),e}},set:{active:function(){k.addClass(p.active)}},remove:{active:function(){k.removeClass(p.active)},embed:function(){A.empty()}},encode:{parameters:function(e){var t,n=[];for(t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&amp;")}},generate:{embed:function(e){m.debug("Generating embed html");var t,n,i=m.get.source();return e=m.get.url(e),e?(n=m.generate.parameters(i),t=x.iframe(e,n)):m.error(h.noURL,k),t},parameters:function(t,n){var o=v[t]&&v[t].parameters!==i?v[t].parameters(f):{};return n=n||f.parameters,n&&(o=e.extend({},o,n)),o=f.onEmbed(o),m.encode.parameters(o)}},has:{placeholder:function(){return f.placeholder||k.data(b.placeholder)}},should:{autoplay:function(){return"auto"===f.autoplay?f.placeholder||k.data(b.placeholder)!==i:f.autoplay}},is:{video:function(){return"video"==m.get.type()}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=E;return n=n||d,a=R||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(E===i&&m.initialize(),m.invoke(l)):(E!==i&&E.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.embed.settings={name:"Embed",namespace:"embed",debug:!1,verbose:!1,performance:!0,icon:!1,source:!1,url:!1,id:!1,autoplay:"auto",color:"#444444",hd:!0,brandedUI:!1,parameters:!1,onDisplay:function(){},onPlaceholderDisplay:function(){},onReset:function(){},onCreate:function(e){},onEmbed:function(e){return e},metadata:{id:"id",icon:"icon",placeholder:"placeholder",source:"source",url:"url"},error:{noURL:"No URL specified",method:"The method you called is not defined"},className:{active:"active",embed:"embed"},selector:{embed:".embed",placeholder:".placeholder",icon:".icon"},sources:{youtube:{name:"youtube",type:"video",icon:"video play",domain:"youtube.com",url:"//www.youtube.com/embed/{id}",parameters:function(e){return{autohide:!e.brandedUI,autoplay:e.autoplay,color:e.colors||i,hq:e.hd,jsapi:e.api,modestbranding:!e.brandedUI}}},vimeo:{name:"vimeo",type:"video",icon:"video play",domain:"vimeo.com",url:"//player.vimeo.com/video/{id}",parameters:function(e){return{api:e.api,autoplay:e.autoplay,byline:e.brandedUI,color:e.colors||i,portrait:e.brandedUI,title:e.brandedUI}}}},templates:{iframe:function(e,t){return'<iframe src="'+e+"?"+t+'" width="100%" height="100%" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'},placeholder:function(e,t){var n="";return t&&(n+='<i class="'+t+' icon"></i>'),e&&(n+='<img class="placeholder" src="'+e+'">'),n}},api:!0,onPause:function(){},onPlay:function(){},onStop:function(){}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.modal=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("body"),u=r.selector||"",d=(new Date).getTime(),m=[],f=arguments[0],g="string"==typeof f,p=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,h,b,y,x,C,w,k,S,T=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),A=T.selector,R=T.className,E=T.namespace,P=T.error,F="."+E,D="module-"+E,O=e(this),q=e(T.context),j=O.find(A.close),z=this,I=O.data(D);S={initialize:function(){S.verbose("Initializing dimmer",q),S.create.id(),S.create.dimmer(),S.refreshModals(),S.bind.events(),T.observeChanges&&S.observeChanges(),S.instantiate()},instantiate:function(){S.verbose("Storing instance of modal"),I=S,O.data(D,I)},create:{dimmer:function(){var t={debug:T.debug,dimmerName:"modals",duration:{show:T.duration,hide:T.duration}},n=e.extend(!0,t,T.dimmerSettings);return T.inverted&&(n.variation=n.variation!==i?n.variation+" inverted":"inverted"),e.fn.dimmer===i?void S.error(P.dimmer):(S.debug("Creating dimmer with settings",n),y=q.dimmer(n),T.detachable?(S.verbose("Modal is detachable, moving content into dimmer"),y.dimmer("add content",O)):S.set.undetached(),T.blurring&&y.addClass(R.blurring),void(x=y.dimmer("get dimmer")))},id:function(){w=(Math.random().toString(16)+"000000000").substr(2,8),C="."+w,S.verbose("Creating unique id for element",w)}},destroy:function(){S.verbose("Destroying previous modal"),O.removeData(D).off(F),s.off(C),j.off(F),q.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&(k=new MutationObserver(function(e){S.debug("DOM tree modified, refreshing"),S.refresh()}),k.observe(z,{childList:!0,subtree:!0}),S.debug("Setting up mutation observer",k))},refresh:function(){S.remove.scrolling(),S.cacheSizes(),S.set.screenHeight(),S.set.type(),S.set.position()},refreshModals:function(){h=O.siblings(A.modal),r=h.add(O)},attachEvents:function(t,n){var i=e(t);n=e.isFunction(S[n])?S[n]:S.toggle,i.length>0?(S.debug("Attaching modal events to element",t,n),i.off(F).on("click"+F,n)):S.error(P.notFound,t)},bind:{events:function(){S.verbose("Attaching events"),O.on("click"+F,A.close,S.event.close).on("click"+F,A.approve,S.event.approve).on("click"+F,A.deny,S.event.deny),s.on("resize"+C,S.event.resize)}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{approve:function(){return T.onApprove.call(z,e(this))===!1?void S.verbose("Approve callback returned false cancelling hide"):void S.hide()},deny:function(){return T.onDeny.call(z,e(this))===!1?void S.verbose("Deny callback returned false cancelling hide"):void S.hide()},close:function(){S.hide()},click:function(t){var i=e(t.target),o=i.closest(A.modal).length>0,a=e.contains(n.documentElement,t.target);!o&&a&&(S.debug("Dimmer clicked, hiding all modals"),S.is.active()&&(S.remove.clickaway(),T.allowMultiple?S.hide():S.hideAll()))},debounce:function(e,t){clearTimeout(S.timer),S.timer=setTimeout(e,t)},keyboard:function(e){var t=e.which,n=27;t==n&&(T.closable?(S.debug("Escape key pressed hiding modal"),S.hide()):S.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&v(S.refresh)}},toggle:function(){S.is.active()||S.is.animating()?S.hide():S.show()},show:function(t){t=e.isFunction(t)?t:function(){},S.refreshModals(),S.showModal(t)},hide:function(t){t=e.isFunction(t)?t:function(){},S.refreshModals(),S.hideModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},S.is.animating()||!S.is.active()?(S.showDimmer(),S.cacheSizes(),S.set.position(),S.set.screenHeight(),S.set.type(),S.set.clickaway(),!T.allowMultiple&&S.others.active()?S.hideOthers(S.showModal):(T.onShow.call(z),T.transition&&e.fn.transition!==i&&O.transition("is supported")?(S.debug("Showing modal with css animations"),O.transition({debug:T.debug,animation:T.transition+" in",queue:T.queue,duration:T.duration,useFailSafe:!0,onComplete:function(){T.onVisible.apply(z),S.add.keyboardShortcuts(),S.save.focus(),S.set.active(),T.autofocus&&S.set.autofocus(),t()}})):S.error(P.noTransition))):S.debug("Modal is already visible")},hideModal:function(t,n){return t=e.isFunction(t)?t:function(){},S.debug("Hiding modal"),T.onHide.call(z,e(this))===!1?void S.verbose("Hide callback returned false cancelling hide"):void((S.is.animating()||S.is.active())&&(T.transition&&e.fn.transition!==i&&O.transition("is supported")?(S.remove.active(),O.transition({debug:T.debug,animation:T.transition+" out",queue:T.queue,duration:T.duration,useFailSafe:!0,onStart:function(){S.others.active()||n||S.hideDimmer(),S.remove.keyboardShortcuts()},onComplete:function(){T.onHidden.call(z),S.restore.focus(),t()}})):S.error(P.noTransition)))},showDimmer:function(){y.dimmer("is animating")||!y.dimmer("is active")?(S.debug("Showing dimmer"),y.dimmer("show")):S.debug("Dimmer already visible")},hideDimmer:function(){return y.dimmer("is animating")||y.dimmer("is active")?void y.dimmer("hide",function(){S.remove.clickaway(),S.remove.screenHeight()}):void S.debug("Dimmer is not visible cannot hide")},hideAll:function(t){var n=r.filter("."+R.active+", ."+R.animating);t=e.isFunction(t)?t:function(){},n.length>0&&(S.debug("Hiding all visible modals"),S.hideDimmer(),n.modal("hide modal",t))},hideOthers:function(t){var n=h.filter("."+R.active+", ."+R.animating);t=e.isFunction(t)?t:function(){},n.length>0&&(S.debug("Hiding other modals",h),n.modal("hide modal",t,!0))},others:{active:function(){return h.filter("."+R.active).length>0},animating:function(){return h.filter("."+R.animating).length>0}},add:{keyboardShortcuts:function(){S.verbose("Adding keyboard shortcuts"),c.on("keyup"+F,S.event.keyboard)}},save:{focus:function(){b=e(n.activeElement).blur()}},restore:{focus:function(){b&&b.length>0&&b.focus()}},remove:{active:function(){O.removeClass(R.active)},clickaway:function(){T.closable&&x.off("click"+C)},bodyStyle:function(){""===l.attr("style")&&(S.verbose("Removing style attribute"),l.removeAttr("style"))},screenHeight:function(){S.debug("Removing page height"),l.css("height","")},keyboardShortcuts:function(){S.verbose("Removing keyboard shortcuts"),c.off("keyup"+F)},scrolling:function(){y.removeClass(R.scrolling),O.removeClass(R.scrolling)}},cacheSizes:function(){var o=O.outerHeight();(S.cache===i||0!==o)&&(S.cache={pageHeight:e(n).outerHeight(),height:o+T.offset,contextHeight:"body"==T.context?e(t).height():y.height()}),S.debug("Caching modal and container sizes",S.cache)},can:{fit:function(){return S.cache.height+2*T.padding<S.cache.contextHeight}},is:{active:function(){return O.hasClass(R.active)},animating:function(){return O.transition("is supported")?O.transition("is animating"):O.is(":visible")},scrolling:function(){return y.hasClass(R.scrolling)},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){var e=O.find(":input").filter(":visible"),t=e.filter("[autofocus]"),n=t.length>0?t.first():e.first();n.length>0&&n.focus()},clickaway:function(){T.closable&&x.on("click"+C,S.event.click)},screenHeight:function(){S.can.fit()?l.css("height",""):(S.debug("Modal is taller than page content, resizing page height"),l.css("height",S.cache.height+2*T.padding))},active:function(){O.addClass(R.active)},scrolling:function(){y.addClass(R.scrolling),O.addClass(R.scrolling)},type:function(){S.can.fit()?(S.verbose("Modal fits on screen"),S.others.active()||S.others.animating()||S.remove.scrolling()):(S.verbose("Modal cannot fit on screen setting to scrolling"),S.set.scrolling())},position:function(){S.verbose("Centering modal on page",S.cache),O.css(S.can.fit()?{top:"",marginTop:-(S.cache.height/2)}:{marginTop:"",top:c.scrollTop()})},undetached:function(){y.addClass(R.undetached)}},setting:function(t,n){if(S.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];T[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,S,t);else{if(n===i)return S[t];S[t]=n}},debug:function(){T.debug&&(T.performance?S.performance.log(arguments):(S.debug=Function.prototype.bind.call(console.info,console,T.name+":"),S.debug.apply(console,arguments)))},verbose:function(){T.verbose&&T.debug&&(T.performance?S.performance.log(arguments):(S.verbose=Function.prototype.bind.call(console.info,console,T.name+":"),S.verbose.apply(console,arguments)))},error:function(){S.error=Function.prototype.bind.call(console.error,console,T.name+":"),S.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;T.performance&&(t=(new Date).getTime(),i=d||t,n=t-i,d=t,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":n})),clearTimeout(S.performance.timer),S.performance.timer=setTimeout(S.performance.display,500)},display:function(){var t=T.name+":",n=0;d=!1,clearTimeout(S.performance.timer),e.each(m,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&m.length>0&&(console.groupCollapsed(t),console.table?console.table(m):e.each(m,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(t,n,o){var r,s,c,l=I;return n=n||p,o=z||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},g?(I===i&&S.initialize(),S.invoke(f)):(I!==i&&I.invoke("destroy"),S.initialize())}),a!==i?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,inverted:!1,blurring:!1,dimmerSettings:{closable:!1,useCSS:!0},context:"body",queue:!1,duration:500,offset:0,transition:"scale",padding:50,onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",scrolling:"scrolling",undetached:"undetached"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.nag=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){{var a,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.nag.settings,n):e.extend({},e.fn.nag.settings),f=(m.className,m.selector),g=m.error,p=m.namespace,v="."+p,h=p+"-module",b=e(this),y=(b.find(f.close),e(m.context?m.context:"body")),x=this,C=b.data(h);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}a={initialize:function(){a.verbose("Initializing element"),b.on("click"+v,f.close,a.dismiss).data(h,a),m.detachable&&b.parent()[0]!==y[0]&&b.detach().prependTo(y),m.displayTime>0&&setTimeout(a.hide,m.displayTime),a.show()},destroy:function(){a.verbose("Destroying instance"),b.removeData(h).off(v)},show:function(){a.should.show()&&!b.is(":visible")&&(a.debug("Showing nag",m.animation.show),"fade"==m.animation.show?b.fadeIn(m.duration,m.easing):b.slideDown(m.duration,m.easing))},hide:function(){a.debug("Showing nag",m.animation.hide),"fade"==m.animation.show?b.fadeIn(m.duration,m.easing):b.slideUp(m.duration,m.easing)},onHide:function(){a.debug("Removing nag",m.animation.hide),b.remove(),m.onHide&&m.onHide()},dismiss:function(e){m.storageMethod&&a.storage.set(m.key,m.value),a.hide(),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return m.persist?(a.debug("Persistent nag is set, can show nag"),!0):a.storage.get(m.key)!=m.value.toString()?(a.debug("Stored value is not set, can show nag",a.storage.get(m.key)),!0):(a.debug("Stored value is set, cannot show nag",a.storage.get(m.key)),!1)}},get:{storageOptions:function(){var e={};return m.expires&&(e.expires=m.expires),m.domain&&(e.domain=m.domain),m.path&&(e.path=m.path),e}},clear:function(){a.storage.remove(m.key)},storage:{set:function(n,o){var r=a.get.storageOptions();if("localstorage"==m.storageMethod&&t.localStorage!==i)t.localStorage.setItem(n,o),a.debug("Value stored using local storage",n,o);else if("sessionstorage"==m.storageMethod&&t.sessionStorage!==i)t.sessionStorage.setItem(n,o),a.debug("Value stored using session storage",n,o);else{if(e.cookie===i)return void a.error(g.noCookieStorage);e.cookie(n,o,r),a.debug("Value stored using cookie",n,o,r)}},get:function(n,o){var r;return"localstorage"==m.storageMethod&&t.localStorage!==i?r=t.localStorage.getItem(n):"sessionstorage"==m.storageMethod&&t.sessionStorage!==i?r=t.sessionStorage.getItem(n):e.cookie!==i?r=e.cookie(n):a.error(g.noCookieStorage),("undefined"==r||"null"==r||r===i||null===r)&&(r=i),r},remove:function(n){var o=a.get.storageOptions();"localstorage"==m.storageMethod&&t.localStorage!==i?t.localStorage.removeItem(n):"sessionstorage"==m.storageMethod&&t.sessionStorage!==i?t.sessionStorage.removeItem(n):e.cookie!==i?e.removeCookie(n,o):a.error(g.noStorage)}},setting:function(t,n){if(a.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){m.debug&&(m.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,m.name+":"),a.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,m.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:x,"Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,500)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,r){var s,c,l,u=C;return n=n||d,r=x||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(C===i&&a.initialize(),a.invoke(l)):(C!==i&&C.invoke("destroy"),a.initialize())}),o!==i?o:this},e.fn.nag.settings={name:"Nag",debug:!1,verbose:!1,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",storageMethod:"cookie",key:"nag",value:"dismiss",error:{noCookieStorage:"$.cookie is not included. A storage solution is required.",noStorage:"Neither $.cookie or store is defined. A storage solution is required for storing state",method:"The method you called is not defined."},className:{bottom:"bottom",fixed:"fixed"},selector:{close:".close.icon"},speed:500,easing:"easeOutQuad",onHide:function(){}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.popup=function(o){var a,r=e(this),s=e(n),c=e(t),l=e("body"),u=r.selector||"",d=!0,m=(new Date).getTime(),f=[],g=arguments[0],p="string"==typeof g,v=[].slice.call(arguments,1);return r.each(function(){var n,r,h,b,y,x=e.isPlainObject(o)?e.extend(!0,{},e.fn.popup.settings,o):e.extend({},e.fn.popup.settings),C=x.selector,w=x.className,k=x.error,S=x.metadata,T=x.namespace,A="."+x.namespace,R="module-"+T,E=e(this),P=e(x.context),F=x.target?e(x.target):E,D=0,O=!1,q=!1,j=this,z=E.data(R);y={initialize:function(){y.debug("Initializing",E),y.createID(),y.bind.events(),!y.exists()&&x.preserve&&y.create(),y.instantiate()},instantiate:function(){y.verbose("Storing instance",y),z=y,E.data(R,z)},refresh:function(){x.popup?n=e(x.popup).eq(0):x.inline&&(n=F.nextAll(C.popup).eq(0),x.popup=n),x.popup?(n.addClass(w.loading),r=y.get.offsetParent(),n.removeClass(w.loading),x.movePopup&&y.has.popup()&&y.get.offsetParent(n)[0]!==r[0]&&(y.debug("Moving popup to the same offset parent as activating element"),n.detach().appendTo(r))):r=x.inline?y.get.offsetParent(F):y.has.popup()?y.get.offsetParent(n):l,r.is("html")&&r[0]!==l[0]&&(y.debug("Setting page as offset parent"),r=l),y.get.variation()&&y.set.variation()},reposition:function(){y.refresh(),y.set.position()},destroy:function(){y.debug("Destroying previous module"),n&&!x.preserve&&y.removePopup(),clearTimeout(y.hideTimer),clearTimeout(y.showTimer),c.off(h),E.off(A).removeData(R)},event:{start:function(t){var n=e.isPlainObject(x.delay)?x.delay.show:x.delay;clearTimeout(y.hideTimer),q||(y.showTimer=setTimeout(y.show,n))},end:function(){var t=e.isPlainObject(x.delay)?x.delay.hide:x.delay;clearTimeout(y.showTimer),y.hideTimer=setTimeout(y.hide,t)},touchstart:function(e){q=!0,y.show()},resize:function(){y.is.visible()&&y.set.position()},hideGracefully:function(t){t&&0===e(t.target).closest(C.popup).length?(y.debug("Click occurred outside popup hiding popup"),y.hide()):y.debug("Click was inside popup, keeping popup open")}},create:function(){var t=y.get.html(),i=y.get.title(),o=y.get.content();t||o||i?(y.debug("Creating pop-up html"),t||(t=x.templates.popup({title:i,content:o})),n=e("<div/>").addClass(w.popup).data(S.activator,E).html(t),x.inline?(y.verbose("Inserting popup element inline",n),n.insertAfter(E)):(y.verbose("Appending popup element to body",n),n.appendTo(P)),y.refresh(),y.set.variation(),x.hoverable&&y.bind.popup(),x.onCreate.call(n,j)):0!==F.next(C.popup).length?(y.verbose("Pre-existing popup found"),x.inline=!0,x.popups=F.next(C.popup).data(S.activator,E),y.refresh(),x.hoverable&&y.bind.popup()):x.popup?(e(x.popup).data(S.activator,E),y.verbose("Used popup specified in settings"),y.refresh(),x.hoverable&&y.bind.popup()):y.debug("No content specified skipping display",j)},createID:function(){b=(Math.random().toString(16)+"000000000").substr(2,8),h="."+b,y.verbose("Creating unique id for element",b)},toggle:function(){y.debug("Toggling pop-up"),y.is.hidden()?(y.debug("Popup is hidden, showing pop-up"),y.unbind.close(),y.show()):(y.debug("Popup is visible, hiding pop-up"),y.hide())},show:function(e){if(e=e||function(){},y.debug("Showing pop-up",x.transition),y.is.hidden()&&(!y.is.active()||!y.is.dropdown())){if(y.exists()||y.create(),x.onShow.call(n,j)===!1)return void y.debug("onShow callback returned false, cancelling popup animation");x.preserve||x.popup||y.refresh(),n&&y.set.position()&&(y.save.conditions(),x.exclusive&&y.hideAll(),y.animate.show(e))}},hide:function(e){if(e=e||function(){},y.is.visible()||y.is.animating()){if(x.onHide.call(n,j)===!1)return void y.debug("onHide callback returned false, cancelling popup animation");y.remove.visible(),y.unbind.close(),y.restore.conditions(),y.animate.hide(e)}},hideAll:function(){e(C.popup).filter("."+w.visible).each(function(){e(this).data(S.activator).popup("hide")})},exists:function(){return n?x.inline||x.popup?y.has.popup():n.closest(P).length>=1?!0:!1:!1},removePopup:function(){y.has.popup()&&!x.popup&&(y.debug("Removing popup",n),n.remove(),n=i,x.onRemove.call(n,j))},save:{conditions:function(){y.cache={title:E.attr("title")},y.cache.title&&E.removeAttr("title"),y.verbose("Saving original attributes",y.cache.title)}},restore:{conditions:function(){return y.cache&&y.cache.title&&(E.attr("title",y.cache.title),y.verbose("Restoring original attributes",y.cache.title)),!0}},animate:{show:function(t){t=e.isFunction(t)?t:function(){},x.transition&&e.fn.transition!==i&&E.transition("is supported")?(y.set.visible(),n.transition({animation:x.transition+" in",queue:!1,debug:x.debug,verbose:x.verbose,duration:x.duration,onComplete:function(){y.bind.close(),t.call(n,j),x.onVisible.call(n,j)}})):y.error(k.noTransition)},hide:function(t){return t=e.isFunction(t)?t:function(){},y.debug("Hiding pop-up"),x.onHide.call(n,j)===!1?void y.debug("onHide callback returned false, cancelling popup animation"):void(x.transition&&e.fn.transition!==i&&E.transition("is supported")?n.transition({animation:x.transition+" out",queue:!1,duration:x.duration,debug:x.debug,verbose:x.verbose,onComplete:function(){y.reset(),t.call(n,j),x.onHidden.call(n,j)}}):y.error(k.noTransition))}},change:{content:function(e){n.html(e)}},get:{html:function(){return E.removeData(S.html),E.data(S.html)||x.html},title:function(){return E.removeData(S.title),E.data(S.title)||x.title},content:function(){return E.removeData(S.content),E.data(S.content)||E.attr("title")||x.content},variation:function(){return E.removeData(S.variation),E.data(S.variation)||x.variation},popup:function(){return n},popupOffset:function(){return n.offset()},calculations:function(){var e,i=F[0],o=x.inline||x.popup&&x.movePopup?F.position():F.offset(),a={};return a={target:{element:F[0],width:F.outerWidth(),height:F.outerHeight(),top:o.top,left:o.left,margin:{}},popup:{width:n.outerWidth(),height:n.outerHeight()},parent:{width:r.outerWidth(),height:r.outerHeight()},screen:{scroll:{top:c.scrollTop(),left:c.scrollLeft()},width:c.width(),height:c.height()}},x.setFluidWidth&&y.is.fluid()&&(a.container={width:n.parent().outerWidth()},a.popup.width=a.container.width),a.target.margin.top=x.inline?parseInt(t.getComputedStyle(i).getPropertyValue("margin-top"),10):0,a.target.margin.left=x.inline?y.is.rtl()?parseInt(t.getComputedStyle(i).getPropertyValue("margin-right"),10):parseInt(t.getComputedStyle(i).getPropertyValue("margin-left"),10):0,e=a.screen,a.boundary={top:e.scroll.top,bottom:e.scroll.top+e.height,left:e.scroll.left,right:e.scroll.left+e.width},a},id:function(){return b},startEvent:function(){return"hover"==x.on?"mouseenter":"focus"==x.on?"focus":!1},scrollEvent:function(){return"scroll"},endEvent:function(){return"hover"==x.on?"mouseleave":"focus"==x.on?"blur":!1},distanceFromBoundary:function(e,t){var n,i,o={};return e=e||y.get.offset(),t=t||y.get.calculations(),n=t.popup,i=t.boundary,e&&(o={top:e.top-i.top,left:e.left-i.left,right:i.right-(e.left+n.width),bottom:i.bottom-(e.top+n.height)},y.verbose("Distance from boundaries determined",e,o)),o},offsetParent:function(t){var n=t!==i?t[0]:E[0],o=n.parentNode,a=e(o);if(o)for(var r="none"===a.css("transform"),s="static"===a.css("position"),c=a.is("html");o&&!c&&s&&r;)o=o.parentNode,a=e(o),r="none"===a.css("transform"),s="static"===a.css("position"),c=a.is("html");return a&&a.length>0?a:e()},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(e){var t=e.split(" "),n=t[0],i=t[1],o={top:"bottom",bottom:"top",left:"right",right:"left"},a={left:"center",center:"right",right:"left"},r={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"},s="top"==n||"bottom"==n,c=!1,l=!1,u=!1;return O||(y.verbose("All available positions available"),O=y.get.positions()),y.debug("Recording last position tried",e),O[e]=!0,"opposite"===x.prefer&&(u=[o[n],i],u=u.join(" "),c=O[u]===!0,y.debug("Trying opposite strategy",u)),"adjacent"===x.prefer&&s&&(u=[n,a[i]],u=u.join(" "),l=O[u]===!0,y.debug("Trying adjacent strategy",u)),(l||c)&&(y.debug("Using backup position",u),u=r[e]),u}},set:{position:function(e,t){if(0===F.length||0===n.length)return void y.error(k.notFound);var o,a,r,s,c,l,u,d;if(t=t||y.get.calculations(),e=e||E.data(S.position)||x.position,o=E.data(S.offset)||x.offset,a=x.distanceAway,r=t.target,s=t.popup,c=t.parent,0===r.width&&0===r.height&&!(r.element instanceof SVGGraphicsElement))return y.debug("Popup target is hidden, no action taken"),!1;switch(x.inline&&(y.debug("Adding margin to calculation",r.margin),"left center"==e||"right center"==e?(o+=r.margin.top,a+=-r.margin.left):"top left"==e||"top center"==e||"top right"==e?(o+=r.margin.left,a-=r.margin.top):(o+=r.margin.left,a+=r.margin.top)),y.debug("Determining popup position from calculations",e,t),y.is.rtl()&&(e=e.replace(/left|right/g,function(e){return"left"==e?"right":"left"}),y.debug("RTL: Popup position updated",e)),D==x.maxSearchDepth&&"string"==typeof x.lastResort&&(e=x.lastResort),e){case"top left":l={top:"auto",bottom:c.height-r.top+a,left:r.left+o,right:"auto"};break;case"top center":l={bottom:c.height-r.top+a,left:r.left+r.width/2-s.width/2+o,top:"auto",right:"auto"};break;case"top right":l={bottom:c.height-r.top+a,right:c.width-r.left-r.width-o,top:"auto",left:"auto"};break;case"left center":l={top:r.top+r.height/2-s.height/2+o,right:c.width-r.left+a,left:"auto",bottom:"auto"};break;case"right center":l={top:r.top+r.height/2-s.height/2+o,left:r.left+r.width+a,bottom:"auto",right:"auto"};break;case"bottom left":l={top:r.top+r.height+a,left:r.left+o,bottom:"auto",right:"auto"};break;case"bottom center":l={top:r.top+r.height+a,left:r.left+r.width/2-s.width/2+o,bottom:"auto",right:"auto"};break;case"bottom right":l={top:r.top+r.height+a,right:c.width-r.left-r.width-o,left:"auto",bottom:"auto"}}if(l===i&&y.error(k.invalidPosition,e),y.debug("Calculated popup positioning values",l),n.css(l).removeClass(w.position).addClass(e).addClass(w.loading),u=y.get.popupOffset(),
d=y.get.distanceFromBoundary(u,t),y.is.offstage(d,e)){if(y.debug("Position is outside viewport",e),D<x.maxSearchDepth)return D++,e=y.get.nextPosition(e),y.debug("Trying new position",e),n?y.set.position(e,t):!1;if(!x.lastResort)return y.debug("Popup could not find a position to display",n),y.error(k.cannotPlace,j),y.remove.attempts(),y.remove.loading(),y.reset(),x.onUnplaceable.call(n,j),!1;y.debug("No position found, showing with last position")}return y.debug("Position is on stage",e),y.remove.attempts(),y.remove.loading(),x.setFluidWidth&&y.is.fluid()&&y.set.fluidWidth(t),!0},fluidWidth:function(e){e=e||y.get.calculations(),y.debug("Automatically setting element width to parent width",e.parent.width),n.css("width",e.container.width)},variation:function(e){e=e||y.get.variation(),e&&y.has.popup()&&(y.verbose("Adding variation to popup",e),n.addClass(e))},visible:function(){E.addClass(w.visible)}},remove:{loading:function(){n.removeClass(w.loading)},variation:function(e){e=e||y.get.variation(),e&&(y.verbose("Removing variation",e),n.removeClass(e))},visible:function(){E.removeClass(w.visible)},attempts:function(){y.verbose("Resetting all searched positions"),D=0,O=!1}},bind:{events:function(){y.debug("Binding popup events to module"),"click"==x.on&&E.on("click"+A,y.toggle),"hover"==x.on&&d&&E.on("touchstart"+A,y.event.touchstart),y.get.startEvent()&&E.on(y.get.startEvent()+A,y.event.start).on(y.get.endEvent()+A,y.event.end),x.target&&y.debug("Target set to element",F),c.on("resize"+h,y.event.resize)},popup:function(){y.verbose("Allowing hover events on popup to prevent closing"),n&&y.has.popup()&&n.on("mouseenter"+A,y.event.start).on("mouseleave"+A,y.event.end)},close:function(){(x.hideOnScroll===!0||"auto"==x.hideOnScroll&&"click"!=x.on)&&(s.one(y.get.scrollEvent()+h,y.event.hideGracefully),P.one(y.get.scrollEvent()+h,y.event.hideGracefully)),"hover"==x.on&&q&&(y.verbose("Binding popup close event to document"),s.on("touchstart"+h,function(e){y.verbose("Touched away from popup"),y.event.hideGracefully.call(j,e)})),"click"==x.on&&x.closable&&(y.verbose("Binding popup close event to document"),s.on("click"+h,function(e){y.verbose("Clicked away from popup"),y.event.hideGracefully.call(j,e)}))}},unbind:{close:function(){(x.hideOnScroll===!0||"auto"==x.hideOnScroll&&"click"!=x.on)&&(s.off("scroll"+h,y.hide),P.off("scroll"+h,y.hide)),"hover"==x.on&&q&&(s.off("touchstart"+h),q=!1),"click"==x.on&&x.closable&&(y.verbose("Removing close event from document"),s.off("click"+h))}},has:{popup:function(){return n&&n.length>0}},is:{offstage:function(t,n){var i=[];return e.each(t,function(e,t){t<-x.jitter&&(y.debug("Position exceeds allowable distance from edge",e,t,n),i.push(e))}),i.length>0?!0:!1},active:function(){return E.hasClass(w.active)},animating:function(){return n!==i&&n.hasClass(w.animating)},fluid:function(){return n!==i&&n.hasClass(w.fluid)},visible:function(){return n!==i&&n.hasClass(w.visible)},dropdown:function(){return E.hasClass(w.dropdown)},hidden:function(){return!y.is.visible()},rtl:function(){return"rtl"==E.css("direction")}},reset:function(){y.remove.visible(),x.preserve?e.fn.transition!==i&&n.transition("remove transition"):y.removePopup()},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,x,t);else{if(n===i)return x[t];x[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,y,t);else{if(n===i)return y[t];y[t]=n}},debug:function(){x.debug&&(x.performance?y.performance.log(arguments):(y.debug=Function.prototype.bind.call(console.info,console,x.name+":"),y.debug.apply(console,arguments)))},verbose:function(){x.verbose&&x.debug&&(x.performance?y.performance.log(arguments):(y.verbose=Function.prototype.bind.call(console.info,console,x.name+":"),y.verbose.apply(console,arguments)))},error:function(){y.error=Function.prototype.bind.call(console.error,console,x.name+":"),y.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;x.performance&&(t=(new Date).getTime(),i=m||t,n=t-i,m=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:j,"Execution Time":n})),clearTimeout(y.performance.timer),y.performance.timer=setTimeout(y.performance.display,500)},display:function(){var t=x.name+":",n=0;m=!1,clearTimeout(y.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,c,l=z;return n=n||v,o=j||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},p?(z===i&&y.initialize(),y.invoke(g)):(z!==i&&z.invoke("destroy"),y.initialize())}),a!==i?a:this},e.fn.popup.settings={name:"Popup",debug:!1,verbose:!1,performance:!0,namespace:"popup",onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onUnplaceable:function(){},onHidden:function(){},on:"hover",addTouchEvents:!0,position:"top left",variation:"",movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,content:!1,html:!1,title:!1,closable:!0,hideOnScroll:"auto",exclusive:!1,context:"body",prefer:"opposite",lastResort:!1,delay:{show:50,hide:70},setFluidWidth:!0,duration:200,transition:"scale",distanceAway:0,jitter:2,offset:0,maxSearchDepth:15,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"Popup does not fit within the boundaries of the viewport",method:"The method you called is not defined.",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",notFound:"The target or popup you specified does not exist on the page"},metadata:{activator:"activator",content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},popup:function(t){var n="",o=e.fn.popup.settings.templates.escape;return typeof t!==i&&(typeof t.title!==i&&t.title&&(t.title=o(t.title),n+='<div class="header">'+t.title+"</div>"),typeof t.content!==i&&t.content&&(t.content=o(t.content),n+='<div class="content">'+t.content+"</div>")),n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.progress=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),g=f.className,p=f.metadata,v=f.namespace,h=f.selector,b=f.error,y="."+v,x="module-"+v,C=e(this),w=e(this).find(h.bar),k=e(this).find(h.progress),S=e(this).find(h.label),T=this,A=C.data(x),R=!1;m={initialize:function(){m.debug("Initializing progress bar",f),m.set.duration(),m.set.transitionEvent(),m.read.metadata(),m.read.settings(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of progress",m),A=m,C.data(x,m)},destroy:function(){m.verbose("Destroying previous progress for",C),clearInterval(A.interval),m.remove.state(),C.removeData(x),A=i},reset:function(){m.set.percent(0),m.set.value(0)},complete:function(){(m.percent===i||m.percent<100)&&m.set.percent(100)},read:{metadata:function(){var e={percent:C.data(p.percent),total:C.data(p.total),value:C.data(p.value)};e.percent&&(m.debug("Current percent value set from metadata",e.percent),m.set.percent(e.percent)),e.total&&(m.debug("Total value set from metadata",e.total),m.set.total(e.total)),e.value&&(m.debug("Current value set from metadata",e.value),m.set.value(e.value),m.set.progress(e.value))},settings:function(){f.total!==!1&&(m.debug("Current total set in settings",f.total),m.set.total(f.total)),f.value!==!1&&(m.debug("Current value set in settings",f.value),m.set.value(f.value),m.set.progress(m.value)),f.percent!==!1&&(m.debug("Current percent set in settings",f.percent),m.set.percent(f.percent))}},increment:function(e){var t,n,i;m.has.total()?(n=m.get.value(),e=e||1,i=n+e,t=m.get.total(),m.debug("Incrementing value",n,i,t),i>t&&(m.debug("Value cannot increment above total",t),i=t)):(n=m.get.percent(),e=e||m.get.randomValue(),i=n+e,t=100,m.debug("Incrementing percentage by",n,i),i>t&&(m.debug("Value cannot increment above 100 percent"),i=t)),m.set.progress(i)},decrement:function(e){var t,n,i=m.get.total();i?(t=m.get.value(),e=e||1,n=t-e,m.debug("Decrementing value by",e,t)):(t=m.get.percent(),e=e||m.get.randomValue(),n=t-e,m.debug("Decrementing percentage by",e,t)),0>n&&(m.debug("Value cannot decrement below 0"),n=0),m.set.progress(n)},has:{total:function(){return m.get.total()!==!1}},get:{text:function(e){var t=m.value||0,n=m.total||0,i=R?m.get.displayPercent():m.percent||0,o=m.total>0?n-t:100-i;return e=e||"",e=e.replace("{value}",t).replace("{total}",n).replace("{left}",o).replace("{percent}",i),m.debug("Adding variables to progress bar text",e),e},randomValue:function(){return m.debug("Generating random increment percentage"),Math.floor(Math.random()*f.random.max+f.random.min)},numericValue:function(e){return"string"==typeof e?""!==e.replace(/[^\d.]/g,"")?+e.replace(/[^\d.]/g,""):!1:e},transitionEnd:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},displayPercent:function(){var e=w.width(),t=C.width(),n=parseInt(w.css("min-width"),10),i=e>n?e/t*100:m.percent;return f.precision>0?Math.round(10*i*f.precision)/(10*f.precision):Math.round(i)},percent:function(){return m.percent||0},value:function(){return m.value||0},total:function(){return m.total||!1}},is:{success:function(){return C.hasClass(g.success)},warning:function(){return C.hasClass(g.warning)},error:function(){return C.hasClass(g.error)},active:function(){return C.hasClass(g.active)},visible:function(){return C.is(":visible")}},remove:{state:function(){m.verbose("Removing stored state"),delete m.total,delete m.percent,delete m.value},active:function(){m.verbose("Removing active state"),C.removeClass(g.active)},success:function(){m.verbose("Removing success state"),C.removeClass(g.success)},warning:function(){m.verbose("Removing warning state"),C.removeClass(g.warning)},error:function(){m.verbose("Removing error state"),C.removeClass(g.error)}},set:{barWidth:function(e){e>100?m.error(b.tooHigh,e):0>e?m.error(b.tooLow,e):(w.css("width",e+"%"),C.attr("data-percent",parseInt(e,10)))},duration:function(e){e=e||f.duration,e="number"==typeof e?e+"ms":e,m.verbose("Setting progress bar transition duration",e),w.css({"transition-duration":e})},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e=f.precision>0?Math.round(10*e*f.precision)/(10*f.precision):Math.round(e),m.percent=e,m.has.total()||(m.value=f.precision>0?Math.round(e/100*m.total*10*f.precision)/(10*f.precision):Math.round(e/100*m.total*10)/10,f.limitValues&&(m.value=m.value>100?100:m.value<0?0:m.value)),m.set.barWidth(e),m.set.labelInterval(),m.set.labels(),f.onChange.call(T,e,m.value,m.total)},labelInterval:function(){var e=function(){m.verbose("Bar finished animating, removing continuous label updates"),clearInterval(m.interval),R=!1,m.set.labels()};clearInterval(m.interval),w.one(a+y,e),m.timer=setTimeout(e,f.duration+100),R=!0,m.interval=setInterval(m.set.labels,f.framerate)},labels:function(){m.verbose("Setting both bar progress and outer label text"),m.set.barLabel(),m.set.state()},label:function(e){e=e||"",e&&(e=m.get.text(e),m.debug("Setting label to text",e),S.text(e))},state:function(e){e=e!==i?e:m.percent,100===e?!f.autoSuccess||m.is.warning()||m.is.error()?(m.verbose("Reached 100% removing active state"),m.remove.active()):(m.set.success(),m.debug("Automatically triggering success at 100%")):e>0?(m.verbose("Adjusting active progress bar label",e),m.set.active()):(m.remove.active(),m.set.label(f.text.active))},barLabel:function(e){e!==i?k.text(m.get.text(e)):"ratio"==f.label&&m.total?(m.debug("Adding ratio to bar label"),k.text(m.get.text(f.text.ratio))):"percent"==f.label&&(m.debug("Adding percentage to bar label"),k.text(m.get.text(f.text.percent)))},active:function(e){e=e||f.text.active,m.debug("Setting active state"),f.showActivity&&!m.is.active()&&C.addClass(g.active),m.remove.warning(),m.remove.error(),m.remove.success(),e&&m.set.label(e),f.onActive.call(T,m.value,m.total)},success:function(e){e=e||f.text.success,m.debug("Setting success state"),C.addClass(g.success),m.remove.active(),m.remove.warning(),m.remove.error(),m.complete(),e&&m.set.label(e),f.onSuccess.call(T,m.total)},warning:function(e){e=e||f.text.warning,m.debug("Setting warning state"),C.addClass(g.warning),m.remove.active(),m.remove.success(),m.remove.error(),m.complete(),e&&m.set.label(e),f.onWarning.call(T,m.value,m.total)},error:function(e){e=e||f.text.error,m.debug("Setting error state"),C.addClass(g.error),m.remove.active(),m.remove.success(),m.remove.warning(),m.complete(),e&&m.set.label(e),f.onError.call(T,m.value,m.total)},transitionEvent:function(){a=m.get.transitionEnd()},total:function(e){m.total=e},value:function(e){m.value=e},progress:function(e){var t,n=m.get.numericValue(e);n===!1&&m.error(b.nonNumeric,e),m.has.total()?(m.set.value(n),t=n/m.total*100,m.debug("Calculating percent complete from total",t),m.set.percent(t)):(t=n,m.debug("Setting value to exact percentage value",t),m.set.percent(t))}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=A;return n=n||d,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(A===i&&m.initialize(),m.invoke(l)):(A!==i&&A.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.progress.settings={name:"Progress",namespace:"progress",debug:!1,verbose:!1,performance:!0,random:{min:2,max:5},duration:300,autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:0,framerate:1e3/30,percent:!1,total:!1,value:!1,onChange:function(e,t,n){},onSuccess:function(e){},onActive:function(e,t){},onError:function(e,t){},onWarning:function(e,t){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.rating=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return o.each(function(){var d,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),f=m.namespace,g=m.className,p=m.metadata,v=m.selector,h=(m.error,"."+f),b="module-"+f,y=this,x=e(this).data(b),C=e(this),w=C.find(v.icon);d={initialize:function(){d.verbose("Initializing rating module",m),0===w.length&&d.setup.layout(),m.interactive?d.enable():d.disable(),d.set.rating(d.get.initialRating()),d.instantiate()},instantiate:function(){d.verbose("Instantiating module",m),x=d,C.data(b,d)},destroy:function(){d.verbose("Destroying previous instance",x),d.remove.events(),C.removeData(b)},refresh:function(){w=C.find(v.icon)},setup:{layout:function(){var t=d.get.maxRating(),n=e.fn.rating.settings.templates.icon(t);d.debug("Generating icon html dynamically"),C.html(n),d.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(g.selected),C.addClass(g.selected),t.addClass(g.selected).prevAll().addClass(g.selected)},mouseleave:function(){C.removeClass(g.selected),w.removeClass(g.selected)},click:function(){var t=e(this),n=d.get.rating(),i=w.index(t)+1,o="auto"==m.clearable?1===w.length:m.clearable;o&&n==i?d.clearRating():d.set.rating(i)}},clearRating:function(){d.debug("Clearing current rating"),d.set.rating(0)},bind:{events:function(){d.verbose("Binding events"),C.on("mouseenter"+h,v.icon,d.event.mouseenter).on("mouseleave"+h,v.icon,d.event.mouseleave).on("click"+h,v.icon,d.event.click)}},remove:{events:function(){d.verbose("Removing events"),C.off(h)}},enable:function(){d.debug("Setting rating to interactive mode"),d.bind.events(),C.removeClass(g.disabled)},disable:function(){d.debug("Setting rating to read-only mode"),d.remove.events(),C.addClass(g.disabled)},get:{initialRating:function(){return C.data(p.rating)!==i?(C.removeData(p.rating),C.data(p.rating)):m.initialRating},maxRating:function(){return C.data(p.maxRating)!==i?(C.removeData(p.maxRating),C.data(p.maxRating)):m.maxRating},rating:function(){var e=w.filter("."+g.active).length;return d.verbose("Current rating retrieved",e),e}},set:{rating:function(e){var t=e-1>=0?e-1:0,n=w.eq(t);C.removeClass(g.selected),w.removeClass(g.selected).removeClass(g.active),e>0&&(d.verbose("Setting current rating to",e),n.prevAll().andSelf().addClass(g.active)),m.onRate.call(y,e)}},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(n===i)return d[t];d[t]=n}},debug:function(){m.debug&&(m.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,m.name+":"),d.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,m.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,500)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,c,l=x;return o=o||u,a=y||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,o):s!==i&&(c=s),e.isArray(n)?n.push(c):n!==i?n=[n,c]:c!==i&&(n=c),s}},l?(x===i&&d.initialize(),d.invoke(c)):(x!==i&&x.invoke("destroy"),d.initialize())}),n!==i?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",debug:!1,verbose:!1,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",onRate:function(e){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";e>=t;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.search=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return e(this).each(function(){var f,g=e.isPlainObject(o)?e.extend(!0,{},e.fn.search.settings,o):e.extend({},e.fn.search.settings),p=g.className,v=g.metadata,h=g.regExp,b=g.fields,y=g.selector,x=g.error,C=g.namespace,w="."+C,k=C+"-module",S=e(this),T=S.find(y.prompt),A=S.find(y.searchButton),R=S.find(y.results),E=(S.find(y.result),S.find(y.category),this),P=S.data(k);f={initialize:function(){f.verbose("Initializing module"),f.determine.searchFields(),f.bind.events(),f.set.type(),f.create.results(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),P=f,S.data(k,f)},destroy:function(){f.verbose("Destroying instance"),S.off(w).removeData(k)},bind:{events:function(){f.verbose("Binding events to search"),g.automatic&&(S.on(f.get.inputEvent()+w,y.prompt,f.event.input),T.attr("autocomplete","off")),S.on("focus"+w,y.prompt,f.event.focus).on("blur"+w,y.prompt,f.event.blur).on("keydown"+w,y.prompt,f.handleKeyboard).on("click"+w,y.searchButton,f.query).on("mousedown"+w,y.results,f.event.result.mousedown).on("mouseup"+w,y.results,f.event.result.mouseup).on("click"+w,y.result,f.event.result.click)}},determine:{searchFields:function(){o&&o.searchFields!==i&&(g.searchFields=o.searchFields)}},event:{input:function(){clearTimeout(f.timer),f.timer=setTimeout(f.query,g.searchDelay)},focus:function(){f.set.focus(),f.has.minimumCharacters()&&(f.query(),f.can.show()&&f.showResults())},blur:function(e){var t=n.activeElement===this,i=function(){f.cancel.query(),f.remove.focus(),f.timer=setTimeout(f.hideResults,g.hideDelay)};t||(f.resultsClicked?(f.debug("Determining if user action caused search to close"),S.one("click",y.results,function(e){f.is.animating()||f.is.hidden()||i()})):(f.debug("Input blurred without user action, closing results"),i()))},result:{mousedown:function(){f.resultsClicked=!0},mouseup:function(){f.resultsClicked=!1},click:function(n){f.debug("Search result selected");var i=e(this),o=i.find(y.title).eq(0),a=i.find("a[href]").eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,c=(o.html(),o.length>0?o.text():!1),l=f.get.results(),u=i.data(v.result)||f.get.result(c,l);return e.isFunction(g.onSelect)&&g.onSelect.call(E,u,l)===!1?void f.debug("Custom onSelect callback cancelled default select action"):(f.hideResults(),c&&f.set.value(c),void(r&&(f.verbose("Opening search link found in result",a),"_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)))}}},handleKeyboard:function(e){var t,n=S.find(y.result),i=S.find(y.category),o=n.index(n.filter("."+p.active)),a=n.length,r=e.which,s={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40};if(r==s.escape&&(f.verbose("Escape key pressed, blurring search field"),f.trigger.blur()),f.is.visible())if(r==s.enter){if(f.verbose("Enter key pressed, selecting active result"),n.filter("."+p.active).length>0)return f.event.result.click.call(n.filter("."+p.active),e),e.preventDefault(),!1}else r==s.upArrow?(f.verbose("Up key pressed, changing active result"),t=0>o-1?o:o-1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault()):r==s.downArrow&&(f.verbose("Down key pressed, changing active result"),t=o+1>=a?o:o+1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault());else r==s.enter&&(f.verbose("Enter key pressed, executing query"),f.query(),f.set.buttonPressed(),T.one("keyup",f.remove.buttonFocus))},setup:{api:function(){var e={debug:g.debug,on:!1,cache:"local",action:"search",onError:f.error};f.verbose("First request, initializing API"),S.api(e)}},can:{useAPI:function(){return e.fn.api!==i},show:function(){return f.is.focused()&&!f.is.visible()&&!f.is.empty()},transition:function(){return g.transition&&e.fn.transition!==i&&S.transition("is supported")}},is:{animating:function(){return R.hasClass(p.animating)},hidden:function(){return R.hasClass(p.hidden)},empty:function(){return""===R.html()},visible:function(){return R.filter(":visible").length>0},focused:function(){return T.filter(":focus").length>0}},trigger:{blur:function(){var e=n.createEvent("HTMLEvents"),t=T[0];t&&(f.verbose("Triggering native blur event"),e.initEvent("blur",!1,!1),t.dispatchEvent(e))}},get:{inputEvent:function(){var e=T[0],t=e!==i&&e.oninput!==i?"input":e!==i&&e.onpropertychange!==i?"propertychange":"keyup";return t},value:function(){return T.val()},results:function(){var e=S.data(v.results);return e},result:function(t,n){var o=["title","id"],a=!1;return t=t!==i?t:f.get.value(),n=n!==i?n:f.get.results(),"category"===g.type?(f.debug("Finding result that matches",t),e.each(n,function(n,i){return e.isArray(i.results)&&(a=f.search.object(t,i.results,o)[0])?!1:void 0})):(f.debug("Finding result in results object",t),a=f.search.object(t,n,o)[0]),a||!1}},set:{focus:function(){S.addClass(p.focus)},loading:function(){S.addClass(p.loading)},value:function(e){f.verbose("Setting search input value",e),T.val(e)},type:function(e){e=e||g.type,"category"==g.type&&S.addClass(g.type)},buttonPressed:function(){A.addClass(p.pressed)}},remove:{loading:function(){S.removeClass(p.loading)},focus:function(){S.removeClass(p.focus)},buttonPressed:function(){A.removeClass(p.pressed)}},query:function(){var t=f.get.value(),n=f.read.cache(t);f.has.minimumCharacters()?(n?(f.debug("Reading result from cache",t),f.save.results(n.results),f.addResults(n.html),f.inject.id(n.results)):(f.debug("Querying for",t),e.isPlainObject(g.source)||e.isArray(g.source)?f.search.local(t):f.can.useAPI()?f.search.remote(t):f.error(x.source)),g.onSearchQuery.call(E,t)):f.hideResults()},search:{local:function(e){var t,n=f.search.object(e,g.content);f.set.loading(),f.save.results(n),f.debug("Returned local search results",n),t=f.generateResults({results:n}),f.remove.loading(),f.addResults(t),f.inject.id(n),f.write.cache(e,{html:t,results:n})},remote:function(t){var n={onSuccess:function(e){f.parse.response.call(E,e,t)},onFailure:function(){f.displayMessage(x.serverError)},urlData:{query:t}};S.api("get request")||f.setup.api(),e.extend(!0,n,g.apiSettings),f.debug("Executing search",n),f.cancel.query(),S.api("setting",n).api("query")},object:function(t,n,o){var a=[],r=[],s=t.toString().replace(h.escape,"\\$&"),c=new RegExp(h.beginsWith+s,"i"),l=function(t,n){var i=-1==e.inArray(n,a),o=-1==e.inArray(n,r);i&&o&&t.push(n)};return n=n||g.source,o=o!==i?o:g.searchFields,e.isArray(o)||(o=[o]),n===i||n===!1?(f.error(x.source),[]):(e.each(o,function(i,o){e.each(n,function(e,n){var i="string"==typeof n[o];i&&(-1!==n[o].search(c)?l(a,n):g.searchFullText&&f.fuzzySearch(t,n[o])&&l(r,n))})}),e.merge(a,r))}},fuzzySearch:function(e,t){var n=t.length,i=e.length;if("string"!=typeof e)return!1;if(e=e.toLowerCase(),t=t.toLowerCase(),i>n)return!1;if(i===n)return e===t;e:for(var o=0,a=0;i>o;o++){for(var r=e.charCodeAt(o);n>a;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},parse:{response:function(e,t){var n=f.generateResults(e);f.verbose("Parsing server response",e),e!==i&&t!==i&&e[b.results]!==i&&(f.addResults(n),f.inject.id(e[b.results]),f.write.cache(t,{html:n,results:e[b.results]}),f.save.results(e[b.results]))}},cancel:{query:function(){f.can.useAPI()&&S.api("abort")}},has:{minimumCharacters:function(){var e=f.get.value(),t=e.length;return t>=g.minCharacters}},clear:{cache:function(e){var t=S.data(v.cache);e?e&&t&&t[e]&&(f.debug("Removing value from cache",e),delete t[e],S.data(v.cache,t)):(f.debug("Clearing cache",e),S.removeData(v.cache))}},read:{cache:function(e){var t=S.data(v.cache);return g.cache?(f.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==i?t[e]:!1):!1}},create:{id:function(e,t){var n,o,a=e+1;return t!==i?(n=String.fromCharCode(97+t),o=n+a,f.verbose("Creating category result id",o)):(o=a,f.verbose("Creating result id",o)),o},results:function(){0===R.length&&(R=e("<div />").addClass(p.results).appendTo(S))}},inject:{result:function(e,t,n){f.verbose("Injecting result into results");var o=n!==i?R.children().eq(n).children(y.result).eq(t):R.children(y.result).eq(t);f.verbose("Injecting results metadata",o),o.data(v.result,e)},id:function(t){f.debug("Injecting unique ids into results");var n=0,o=0;return"category"===g.type?e.each(t,function(t,a){o=0,e.each(a.results,function(e,t){var r=a.results[e];r.id===i&&(r.id=f.create.id(o,n)),f.inject.result(r,o,n),o++}),n++}):e.each(t,function(e,n){var a=t[e];a.id===i&&(a.id=f.create.id(o)),f.inject.result(a,o),o++}),t}},save:{results:function(e){f.verbose("Saving current search results to metadata",e),S.data(v.results,e)}},write:{cache:function(e,t){var n=S.data(v.cache)!==i?S.data(v.cache):{};g.cache&&(f.verbose("Writing generated html to cache",e,t),n[e]=t,S.data(v.cache,n))}},addResults:function(t){return e.isFunction(g.onResultsAdd)&&g.onResultsAdd.call(R,t)===!1?(f.debug("onResultsAdd callback cancelled default action"),!1):(R.html(t),void(f.can.show()&&f.showResults()))},showResults:function(){f.is.visible()||(f.can.transition()?(f.debug("Showing results with css animations"),R.transition({animation:g.transition+" in",debug:g.debug,verbose:g.verbose,duration:g.duration,queue:!0})):(f.debug("Showing results with javascript"),R.stop().fadeIn(g.duration,g.easing)),g.onResultsOpen.call(R))},hideResults:function(){f.is.visible()&&(f.can.transition()?(f.debug("Hiding results with css animations"),R.transition({animation:g.transition+" out",debug:g.debug,verbose:g.verbose,duration:g.duration,queue:!0})):(f.debug("Hiding results with javascript"),R.stop().fadeOut(g.duration,g.easing)),g.onResultsClose.call(R))},generateResults:function(t){f.debug("Generating html from response",t);var n=g.templates[g.type],i=e.isPlainObject(t[b.results])&&!e.isEmptyObject(t[b.results]),o=e.isArray(t[b.results])&&t[b.results].length>0,a="";return i||o?(g.maxResults>0&&(i?"standard"==g.type&&f.error(x.maxResults):t[b.results]=t[b.results].slice(0,g.maxResults)),
e.isFunction(n)?a=n(t,b):f.error(x.noTemplate,!1)):a=f.displayMessage(x.noResults,"empty"),g.onResults.call(E,t),a},displayMessage:function(e,t){return t=t||"standard",f.debug("Displaying message",e,t),f.addResults(g.templates.message(e,t)),g.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=g.name+":",n=0;c=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=P;return n=n||m,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(P===i&&f.initialize(),f.invoke(u)):(P!==i&&P.invoke("destroy"),f.initialize())}),a!==i?a:this},e.fn.search.settings={name:"Search",namespace:"search",debug:!1,verbose:!1,performance:!0,type:"standard",minCharacters:1,apiSettings:!1,source:!1,searchFields:["title","description"],displayField:"",searchFullText:!0,automatic:!0,hideDelay:0,searchDelay:200,maxResults:7,cache:!0,transition:"scale",duration:200,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(e){},onResults:function(e){},onResultsOpen:function(){},onResultsClose:function(){},className:{animating:"animating",active:"active",empty:"empty",focus:"focus",hidden:"hidden",loading:"loading",results:"results",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noEndpoint:"No search endpoint was specified",noTemplate:"A valid template name was not specified.",serverError:"There was an issue querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results",result:"result"},regExp:{escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,beginsWith:"(?:s|^)"},fields:{categories:"results",categoryName:"name",categoryResults:"results",description:"description",image:"image",price:"price",results:"results",title:"title",url:"url",action:"action",actionText:"text",actionURL:"url"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},message:function(e,t){var n="";return e!==i&&t!==i&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t,n){{var o="";e.fn.search.settings.templates.escape}return t[n.categoryResults]!==i?(e.each(t[n.categoryResults],function(t,a){a[n.results]!==i&&a.results.length>0&&(o+='<div class="category">',a[n.categoryName]!==i&&(o+='<div class="name">'+a[n.categoryName]+"</div>"),e.each(a.results,function(e,t){o+=t[n.url]?'<a class="result" href="'+t[n.url]+'">':'<a class="result">',t[n.image]!==i&&(o+='<div class="image"> <img src="'+t[n.image]+'"></div>'),o+='<div class="content">',t[n.price]!==i&&(o+='<div class="price">'+t[n.price]+"</div>"),t[n.title]!==i&&(o+='<div class="title">'+t[n.title]+"</div>"),t[n.description]!==i&&(o+='<div class="description">'+t[n.description]+"</div>"),o+="</div>",o+="</a>"}),o+="</div>")}),t[n.action]&&(o+='<a href="'+t[n.action][n.actionURL]+'" class="action">'+t[n.action][n.actionText]+"</a>"),o):!1},standard:function(t,n){var o="";return t[n.results]!==i?(e.each(t[n.results],function(e,t){o+=t[n.url]?'<a class="result" href="'+t[n.url]+'">':'<a class="result">',t[n.image]!==i&&(o+='<div class="image"> <img src="'+t[n.image]+'"></div>'),o+='<div class="content">',t[n.price]!==i&&(o+='<div class="price">'+t[n.price]+"</div>"),t[n.title]!==i&&(o+='<div class="title">'+t[n.title]+"</div>"),t[n.description]!==i&&(o+='<div class="description">'+t[n.description]+"</div>"),o+="</div>",o+="</a>"}),t[n.action]&&(o+='<a href="'+t[n.action][n.actionURL]+'" class="action">'+t[n.action][n.actionText]+"</a>"),o):!1}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.shape=function(o){var a,r=e(this),s=(e("body"),(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var t,f,g,p=r.selector||"",v=e.isPlainObject(o)?e.extend(!0,{},e.fn.shape.settings,o):e.extend({},e.fn.shape.settings),h=v.namespace,b=v.selector,y=v.error,x=v.className,C="."+h,w="module-"+h,k=e(this),S=k.find(b.sides),T=k.find(b.side),A=!1,R=this,E=k.data(w);g={initialize:function(){g.verbose("Initializing module for",R),g.set.defaultSide(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),E=g,k.data(w,E)},destroy:function(){g.verbose("Destroying previous module for",R),k.removeData(w).off(C)},refresh:function(){g.verbose("Refreshing selector cache for",R),k=e(R),S=e(this).find(b.shape),T=e(this).find(b.side)},repaint:function(){g.verbose("Forcing repaint event");{var e=S[0]||n.createElement("div");e.offsetWidth}},animate:function(e,n){g.verbose("Animating box with properties",e),n=n||function(e){g.verbose("Executing animation callback"),e!==i&&e.stopPropagation(),g.reset(),g.set.active()},v.beforeChange.call(f[0]),g.get.transitionEvent()?(g.verbose("Starting CSS animation"),k.addClass(x.animating),S.css(e).one(g.get.transitionEvent(),n),g.set.duration(v.duration),m(function(){k.addClass(x.animating),t.addClass(x.hidden)})):n()},queue:function(e){g.debug("Queueing animation of",e),S.one(g.get.transitionEvent(),function(){g.debug("Executing queued animation"),setTimeout(function(){k.shape(e)},0)})},reset:function(){g.verbose("Animating states reset"),k.removeClass(x.animating).attr("style","").removeAttr("style"),S.attr("style","").removeAttr("style"),T.attr("style","").removeAttr("style").removeClass(x.hidden),f.removeClass(x.animating).attr("style","").removeAttr("style")},is:{complete:function(){return T.filter("."+x.active)[0]==f[0]},animating:function(){return k.hasClass(x.animating)}},set:{defaultSide:function(){t=k.find("."+v.className.active),f=t.next(b.side).length>0?t.next(b.side):k.find(b.side).first(),A=!1,g.verbose("Active side set to",t),g.verbose("Next side set to",f)},duration:function(e){e=e||v.duration,e="number"==typeof e?e+"ms":e,g.verbose("Setting animation duration",e),(v.duration||0===v.duration)&&S.add(T).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},currentStageSize:function(){var e=k.find("."+v.className.active),t=e.outerWidth(!0),n=e.outerHeight(!0);k.css({width:t,height:n})},stageSize:function(){var e=k.clone().addClass(x.loading),t=e.find("."+v.className.active),n=A?e.find(b.side).eq(A):t.next(b.side).length>0?t.next(b.side):e.find(b.side).first(),i={};g.set.currentStageSize(),t.removeClass(x.active),n.addClass(x.active),e.insertAfter(k),i={width:n.outerWidth(!0),height:n.outerHeight(!0)},e.remove(),k.css(i),g.verbose("Resizing stage to fit new content",i)},nextSide:function(e){A=e,f=T.filter(e),A=T.index(f),0===f.length&&(g.set.defaultSide(),g.error(y.side)),g.verbose("Next side manually set to",f)},active:function(){g.verbose("Setting new side to active",f),T.removeClass(x.active),f.addClass(x.active),v.onChange.call(f[0]),g.set.defaultSide()}},flip:{up:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip up"):(g.debug("Flipping up",f),g.set.stageSize(),g.stage.above(),g.animate(g.get.transform.up()))):void g.debug("Side already visible",f)},down:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip down"):(g.debug("Flipping down",f),g.set.stageSize(),g.stage.below(),g.animate(g.get.transform.down()))):void g.debug("Side already visible",f)},left:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip left"):(g.debug("Flipping left",f),g.set.stageSize(),g.stage.left(),g.animate(g.get.transform.left()))):void g.debug("Side already visible",f)},right:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip right"):(g.debug("Flipping right",f),g.set.stageSize(),g.stage.right(),g.animate(g.get.transform.right()))):void g.debug("Side already visible",f)},over:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip over"):(g.debug("Flipping over",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.over()))):void g.debug("Side already visible",f)},back:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip back"):(g.debug("Flipping back",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.back()))):void g.debug("Side already visible",f)}},get:{transform:{up:function(){var e={y:-((t.outerHeight(!0)-f.outerHeight(!0))/2),z:-(t.outerHeight(!0)/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(-90deg)"}},down:function(){var e={y:-((t.outerHeight(!0)-f.outerHeight(!0))/2),z:-(t.outerHeight(!0)/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(90deg)"}},left:function(){var e={x:-((t.outerWidth(!0)-f.outerWidth(!0))/2),z:-(t.outerWidth(!0)/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(90deg)"}},right:function(){var e={x:-((t.outerWidth(!0)-f.outerWidth(!0))/2),z:-(t.outerWidth(!0)/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(-90deg)"}},over:function(){var e={x:-((t.outerWidth(!0)-f.outerWidth(!0))/2)};return{transform:"translateX("+e.x+"px) rotateY(180deg)"}},back:function(){var e={x:-((t.outerWidth(!0)-f.outerWidth(!0))/2)};return{transform:"translateX("+e.x+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},nextSide:function(){return t.next(b.side).length>0?t.next(b.side):k.find(b.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight(!0)-f.outerHeight(!0))/2,depth:{active:f.outerHeight(!0)/2,next:t.outerHeight(!0)/2}};g.verbose("Setting the initial animation position as above",f,e),S.css({transform:"translateZ(-"+e.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight(!0)-f.outerHeight(!0))/2,depth:{active:f.outerHeight(!0)/2,next:t.outerHeight(!0)/2}};g.verbose("Setting the initial animation position as below",f,e),S.css({transform:"translateZ(-"+e.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e={active:t.outerWidth(!0),next:f.outerWidth(!0)},n={origin:(e.active-e.next)/2,depth:{active:e.next/2,next:e.active/2}};g.verbose("Setting the initial animation position as left",f,n),S.css({transform:"translateZ(-"+n.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+n.depth.active+"px)"}),f.addClass(x.animating).css({left:n.origin+"px",transform:"rotateY(-90deg) translateZ("+n.depth.next+"px)"})},right:function(){var e={active:t.outerWidth(!0),next:f.outerWidth(!0)},n={origin:(e.active-e.next)/2,depth:{active:e.next/2,next:e.active/2}};g.verbose("Setting the initial animation position as left",f,n),S.css({transform:"translateZ(-"+n.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+n.depth.active+"px)"}),f.addClass(x.animating).css({left:n.origin+"px",transform:"rotateY(90deg) translateZ("+n.depth.next+"px)"})},behind:function(){var e={active:t.outerWidth(!0),next:f.outerWidth(!0)},n={origin:(e.active-e.next)/2,depth:{active:e.next/2,next:e.active/2}};g.verbose("Setting the initial animation position as behind",f,n),t.css({transform:"rotateY(0deg)"}),f.addClass(x.animating).css({left:n.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){v.debug&&(v.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,v.name+":"),g.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,v.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",p&&(t+=" '"+p+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,c,l=E;return n=n||d,o=R||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},u?(E===i&&g.initialize(),g.invoke(l)):(E!==i&&E.invoke("destroy"),g.initialize())}),a!==i?a:this},e.fn.shape.settings={name:"Shape",debug:!1,verbose:!1,performance:!0,namespace:"shape",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:!1,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sidebar=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("html"),u=e("head"),d=r.selector||"",m=(new Date).getTime(),f=[],g=arguments[0],p="string"==typeof g,v=[].slice.call(arguments,1),h=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,y,x,C,w,k=e.isPlainObject(o)?e.extend(!0,{},e.fn.sidebar.settings,o):e.extend({},e.fn.sidebar.settings),S=k.selector,T=k.className,A=k.namespace,R=k.regExp,E=k.error,P="."+A,F="module-"+A,D=e(this),O=e(k.context),q=D.children(S.sidebar),j=O.children(S.fixed),z=O.children(S.pusher),I=this,L=D.data(F);w={initialize:function(){w.debug("Initializing sidebar",o),w.create.id(),C=w.get.transitionEvent(),w.is.ios()&&w.set.ios(),k.delaySetup?h(w.setup.layout):w.setup.layout(),h(function(){w.setup.cache()}),w.instantiate()},instantiate:function(){w.verbose("Storing instance of module",w),L=w,D.data(F,w)},create:{id:function(){y=(Math.random().toString(16)+"000000000").substr(2,8),b="."+y,w.verbose("Creating unique id for element",y)}},destroy:function(){w.verbose("Destroying previous module for",D),D.off(P).removeData(F),w.is.ios()&&w.remove.ios(),O.off(b),s.off(b),c.off(b)},event:{clickaway:function(e){var t=z.find(e.target).length>0||z.is(e.target),n=O.is(e.target);t&&(w.verbose("User clicked on dimmed page"),w.hide()),n&&(w.verbose("User clicked on dimmable context (scaled out page)"),w.hide())},touch:function(e){},containScroll:function(e){I.scrollTop<=0&&(I.scrollTop=1),I.scrollTop+I.offsetHeight>=I.scrollHeight&&(I.scrollTop=I.scrollHeight-I.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(S.sidebar).length&&t.preventDefault()}},bind:{clickaway:function(){w.verbose("Adding clickaway events to context",O),k.closable&&O.on("click"+b,w.event.clickaway).on("touchend"+b,w.event.clickaway)},scrollLock:function(){k.scrollLock&&(w.debug("Disabling page scroll"),s.on("DOMMouseScroll"+b,w.event.scroll)),w.verbose("Adding events to contain sidebar scroll"),c.on("touchmove"+b,w.event.touch),D.on("scroll"+P,w.event.containScroll)}},unbind:{clickaway:function(){w.verbose("Removing clickaway events from context",O),O.off(b)},scrollLock:function(){w.verbose("Removing scroll lock from page"),c.off(b),s.off(b),D.off("scroll"+P)}},add:{inlineCSS:function(){var t,n=w.cache.width||D.outerWidth(),i=w.cache.height||D.outerHeight(),o=w.is.rtl(),a=w.get.direction(),s={left:n,right:-n,top:i,bottom:-i};o&&(w.verbose("RTL detected, flipping widths"),s.left=-n,s.right=n),t="<style>","left"===a||"right"===a?(w.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+a+".sidebar ~ .fixed, .ui.visible."+a+".sidebar ~ .pusher {   -webkit-transform: translate3d("+s[a]+"px, 0, 0);           transform: translate3d("+s[a]+"px, 0, 0); }"):("top"===a||"bottom"==a)&&(t+=" .ui.visible."+a+".sidebar ~ .fixed, .ui.visible."+a+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+s[a]+"px, 0);           transform: translate3d(0, "+s[a]+"px, 0); }"),w.is.ie()&&("left"===a||"right"===a?(w.debug("Adding CSS rules for animation distance",n),t+=" body.pushable > .ui.visible."+a+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+s[a]+"px, 0, 0);           transform: translate3d("+s[a]+"px, 0, 0); }"):("top"===a||"bottom"==a)&&(t+=" body.pushable > .ui.visible."+a+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+s[a]+"px, 0);           transform: translate3d(0, "+s[a]+"px, 0); }"),t+=" body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"),t+="</style>",r=e(t).appendTo(u),w.debug("Adding sizing css to head",r)}},refresh:function(){w.verbose("Refreshing selector cache"),O=e(k.context),q=O.children(S.sidebar),z=O.children(S.pusher),j=O.children(S.fixed),w.clear.cache()},refreshSidebars:function(){w.verbose("Refreshing other sidebars"),q=O.children(S.sidebar)},repaint:function(){w.verbose("Forcing repaint event"),I.style.display="none";I.offsetHeight;I.scrollTop=I.scrollTop,I.style.display=""},setup:{cache:function(){w.cache={width:D.outerWidth(),height:D.outerHeight(),rtl:"rtl"==D.css("direction")}},layout:function(){0===O.children(S.pusher).length&&(w.debug("Adding wrapper element for sidebar"),w.error(E.pusher),z=e('<div class="pusher" />'),O.children().not(S.omitted).not(q).wrapAll(z),w.refresh()),(0===D.nextAll(S.pusher).length||D.nextAll(S.pusher)[0]!==z[0])&&(w.debug("Moved sidebar to correct parent element"),w.error(E.movedSidebar,I),D.detach().prependTo(O),w.refresh()),w.clear.cache(),w.set.pushable(),w.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(w[n])?w[n]:w.toggle,i.length>0?(w.debug("Attaching sidebar events to element",t,n),i.on("click"+P,n)):w.error(E.notFound,t)},show:function(t){if(t=e.isFunction(t)?t:function(){},w.is.hidden()){if(w.refreshSidebars(),k.overlay&&(w.error(E.overlay),k.transition="overlay"),w.refresh(),w.othersActive())if(w.debug("Other sidebars currently visible"),k.exclusive){if("overlay"!=k.transition)return void w.hideOthers(w.show);w.hideOthers()}else k.transition="overlay";w.pushPage(function(){t.call(I),k.onShow.call(I)}),k.onChange.call(I),k.onVisible.call(I)}else w.debug("Sidebar is already visible")},hide:function(t){t=e.isFunction(t)?t:function(){},(w.is.visible()||w.is.animating())&&(w.debug("Hiding sidebar",t),w.refreshSidebars(),w.pullPage(function(){t.call(I),k.onHidden.call(I)}),k.onChange.call(I),k.onHide.call(I))},othersAnimating:function(){return q.not(D).filter("."+T.animating).length>0},othersVisible:function(){return q.not(D).filter("."+T.visible).length>0},othersActive:function(){return w.othersVisible()||w.othersAnimating()},hideOthers:function(e){var t=q.not(D).filter("."+T.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){i++,i==n&&e()})},toggle:function(){w.verbose("Determining toggled direction"),w.is.hidden()?w.show():w.hide()},pushPage:function(t){var n,i,o,a=w.get.transition(),r="overlay"===a||w.othersActive()?D:z;t=e.isFunction(t)?t:function(){},"scale down"==k.transition&&w.scrollToTop(),w.set.transition(a),w.repaint(),n=function(){w.bind.clickaway(),w.add.inlineCSS(),w.set.animating(),w.set.visible()},i=function(){w.set.dimmed()},o=function(e){e.target==r[0]&&(r.off(C+b,o),w.remove.animating(),w.bind.scrollLock(),t.call(I))},r.off(C+b),r.on(C+b,o),h(n),k.dimPage&&!w.othersVisible()&&h(i)},pullPage:function(t){var n,i,o=w.get.transition(),a="overlay"==o||w.othersActive()?D:z;t=e.isFunction(t)?t:function(){},w.verbose("Removing context push state",w.get.direction()),w.unbind.clickaway(),w.unbind.scrollLock(),n=function(){w.set.transition(o),w.set.animating(),w.remove.visible(),k.dimPage&&!w.othersVisible()&&z.removeClass(T.dimmed)},i=function(e){e.target==a[0]&&(a.off(C+b,i),w.remove.animating(),w.remove.transition(),w.remove.inlineCSS(),("scale down"==o||k.returnScroll&&w.is.mobile())&&w.scrollBack(),t.call(I))},a.off(C+b),a.on(C+b,i),h(n)},scrollToTop:function(){w.verbose("Scrolling to top of page to avoid animation issues"),x=e(t).scrollTop(),D.scrollTop(0),t.scrollTo(0,0)},scrollBack:function(){w.verbose("Scrolling back to original page position"),t.scrollTo(0,x)},clear:{cache:function(){w.verbose("Clearing cached dimensions"),w.cache={}}},set:{ios:function(){l.addClass(T.ios)},pushed:function(){O.addClass(T.pushed)},pushable:function(){O.addClass(T.pushable)},dimmed:function(){z.addClass(T.dimmed)},active:function(){D.addClass(T.active)},animating:function(){D.addClass(T.animating)},transition:function(e){e=e||w.get.transition(),D.addClass(e)},direction:function(e){e=e||w.get.direction(),D.addClass(T[e])},visible:function(){D.addClass(T.visible)},overlay:function(){D.addClass(T.overlay)}},remove:{inlineCSS:function(){w.debug("Removing inline css styles",r),r&&r.length>0&&r.remove()},ios:function(){l.removeClass(T.ios)},pushed:function(){O.removeClass(T.pushed)},pushable:function(){O.removeClass(T.pushable)},active:function(){D.removeClass(T.active)},animating:function(){D.removeClass(T.animating)},transition:function(e){e=e||w.get.transition(),D.removeClass(e)},direction:function(e){e=e||w.get.direction(),D.removeClass(T[e])},visible:function(){D.removeClass(T.visible)},overlay:function(){D.removeClass(T.overlay)}},get:{direction:function(){return D.hasClass(T.top)?T.top:D.hasClass(T.right)?T.right:D.hasClass(T.bottom)?T.bottom:T.left},transition:function(){var e,t=w.get.direction();return e=w.is.mobile()?"auto"==k.mobileTransition?k.defaultTransition.mobile[t]:k.mobileTransition:"auto"==k.transition?k.defaultTransition.computer[t]:k.transition,w.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]}},is:{ie:function(){var e=!t.ActiveXObject&&"ActiveXObject"in t,n="ActiveXObject"in t;return e||n},ios:function(){var e=navigator.userAgent,t=e.match(R.ios),n=e.match(R.mobileChrome);return t&&!n?(w.verbose("Browser was found to be iOS",e),!0):!1},mobile:function(){var e=navigator.userAgent,t=e.match(R.mobile);return t?(w.verbose("Browser was found to be mobile",e),!0):(w.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!w.is.visible()},visible:function(){return D.hasClass(T.visible)},open:function(){return w.is.visible()},closed:function(){return w.is.hidden()},vertical:function(){return D.hasClass(T.top)},animating:function(){return O.hasClass(T.animating)},rtl:function(){return w.cache.rtl===i&&(w.cache.rtl="rtl"==D.css("direction")),w.cache.rtl}},setting:function(t,n){if(w.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,w,t);else{if(n===i)return w[t];w[t]=n}},debug:function(){k.debug&&(k.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,k.name+":"),w.debug.apply(console,arguments)))},verbose:function(){k.verbose&&k.debug&&(k.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),w.verbose.apply(console,arguments)))},error:function(){w.error=Function.prototype.bind.call(console.error,console,k.name+":"),w.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;k.performance&&(t=(new Date).getTime(),i=m||t,n=t-i,m=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:I,"Execution Time":n})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var t=k.name+":",n=0;m=!1,clearTimeout(w.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",d&&(t+=" '"+d+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,c,l=L;return n=n||v,o=I||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(w.error(E.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},p?(L===i&&w.initialize(),w.invoke(g)):(L!==i&&w.invoke("destroy"),w.initialize())}),a!==i?a:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",debug:!1,verbose:!1,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,duration:500,onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobileChrome:/(CriOS)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sticky=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f,g,p=e.isPlainObject(n)?e.extend(!0,{},e.fn.sticky.settings,n):e.extend({},e.fn.sticky.settings),v=p.className,h=p.namespace,b=p.error,y="."+h,x="module-"+h,C=e(this),w=e(t),k=e(p.scrollContext),S=(C.selector||"",C.data(x)),T=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},A=this;g={initialize:function(){g.determineContainer(),g.determineContext(),g.verbose("Initializing sticky",p,a),g.save.positions(),g.checkErrors(),g.bind.events(),p.observeChanges&&g.observeChanges(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),S=g,C.data(x,g)},destroy:function(){g.verbose("Destroying previous instance"),g.reset(),f&&f.disconnect(),w.off("load"+y,g.event.load).off("resize"+y,g.event.resize),k.off("scrollchange"+y,g.event.scrollchange),C.removeData(x)},observeChanges:function(){var e=m[0];"MutationObserver"in t&&(f=new MutationObserver(function(e){clearTimeout(g.timer),g.timer=setTimeout(function(){g.verbose("DOM tree modified, updating sticky menu",e),g.refresh()},100)}),f.observe(A,{childList:!0,subtree:!0}),f.observe(e,{childList:!0,subtree:!0}),g.debug("Setting up mutation observer",f))},determineContainer:function(){a=C.offsetParent()},determineContext:function(){return m=p.context?e(p.context):a,0===m.length?void g.error(b.invalidContext,p.context,C):void 0},checkErrors:function(){return g.is.hidden()&&g.error(b.visible,C),g.cache.element.height>g.cache.context.height?(g.reset(),void g.error(b.elementSize,C)):void 0},bind:{events:function(){w.on("load"+y,g.event.load).on("resize"+y,g.event.resize),k.off("scroll"+y).on("scroll"+y,g.event.scroll).on("scrollchange"+y,g.event.scrollchange)}},event:{load:function(){g.verbose("Page contents finished loading"),T(g.refresh)},resize:function(){g.verbose("Window resized"),T(g.refresh)},scroll:function(){T(function(){k.triggerHandler("scrollchange"+y,k.scrollTop())})},scrollchange:function(e,t){g.stick(t),p.onScroll.call(A)}},refresh:function(e){g.reset(),p.context||g.determineContext(),e&&g.determineContainer(),
g.save.positions(),g.stick(),p.onReposition.call(A)},supports:{sticky:function(){{var t=e("<div/>");t[0]}return t.addClass(v.supported),t.css("position").match("sticky")}},save:{lastScroll:function(e){g.lastScroll=e},elementScroll:function(e){g.elementScroll=e},positions:function(){{var e={height:k.height()},t={margin:{top:parseInt(C.css("margin-top"),10),bottom:parseInt(C.css("margin-bottom"),10)},offset:C.offset(),width:C.outerWidth(),height:C.outerHeight()},n={offset:m.offset(),height:m.outerHeight()};({height:a.outerHeight()})}g.is.standardScroll()||(g.debug("Non-standard scroll. Removing scroll offset from element offset"),e.top=k.scrollTop(),e.left=k.scrollLeft(),t.offset.top+=e.top,n.offset.top+=e.top,t.offset.left+=e.left,n.offset.left+=e.left),g.cache={fits:t.height<e.height,scrollContext:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},g.set.containerSize(),g.set.size(),g.stick(),g.debug("Caching element positions",g.cache)}},get:{direction:function(e){var t="down";return e=e||k.scrollTop(),g.lastScroll!==i&&(g.lastScroll<e?t="down":g.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||k.scrollTop(),g.lastScroll?e-g.lastScroll:0},currentElementScroll:function(){return g.elementScroll?g.elementScroll:g.is.top()?Math.abs(parseInt(C.css("top"),10))||0:Math.abs(parseInt(C.css("bottom"),10))||0},elementScroll:function(e){e=e||k.scrollTop();var t=g.cache.element,n=g.cache.scrollContext,i=g.get.scrollChange(e),o=t.height-n.height+p.offset,a=g.get.currentElementScroll(),r=a+i;return a=g.cache.fits||0>r?0:r>o?o:r}},remove:{lastScroll:function(){delete g.lastScroll},elementScroll:function(e){delete g.elementScroll},offset:function(){C.css("margin-top","")}},set:{offset:function(){g.verbose("Setting offset on element",p.offset),C.css("margin-top",p.offset)},containerSize:function(){var e=a.get(0).tagName;"HTML"===e||"body"==e?g.determineContainer():Math.abs(a.outerHeight()-g.cache.context.height)>p.jitter&&(g.debug("Context has padding, specifying exact height for container",g.cache.context.height),a.css({height:g.cache.context.height}))},minimumSize:function(){var e=g.cache.element;a.css("min-height",e.height)},scroll:function(e){g.debug("Setting scroll on element",e),g.elementScroll!=e&&(g.is.top()&&C.css("bottom","").css("top",-e),g.is.bottom()&&C.css("top","").css("bottom",e))},size:function(){0!==g.cache.element.height&&0!==g.cache.element.width&&(A.style.setProperty("width",g.cache.element.width+"px","important"),A.style.setProperty("height",g.cache.element.height+"px","important"))}},is:{standardScroll:function(){return k[0]==t},top:function(){return C.hasClass(v.top)},bottom:function(){return C.hasClass(v.bottom)},initialPosition:function(){return!g.is.fixed()&&!g.is.bound()},hidden:function(){return!C.is(":visible")},bound:function(){return C.hasClass(v.bound)},fixed:function(){return C.hasClass(v.fixed)}},stick:function(e){var t=e||k.scrollTop(),n=g.cache,i=n.fits,o=n.element,a=n.scrollContext,r=n.context,s=g.is.bottom()&&p.pushing?p.bottomOffset:p.offset,e={top:t+s,bottom:t+s+a.height},c=(g.get.direction(e.top),i?0:g.get.elementScroll(e.top)),l=!i,u=0!==o.height;u&&(g.is.initialPosition()?e.top>=r.bottom?(g.debug("Initial element position is bottom of container"),g.bindBottom()):e.top>o.top&&(o.height+e.top-c>=r.bottom?(g.debug("Initial element position is bottom of container"),g.bindBottom()):(g.debug("Initial element position is fixed"),g.fixTop())):g.is.fixed()?g.is.top()?e.top<=o.top?(g.debug("Fixed element reached top of container"),g.setInitialPosition()):o.height+e.top-c>=r.bottom?(g.debug("Fixed element reached bottom of container"),g.bindBottom()):l&&(g.set.scroll(c),g.save.lastScroll(e.top),g.save.elementScroll(c)):g.is.bottom()&&(e.bottom-o.height<=o.top?(g.debug("Bottom fixed rail has reached top of container"),g.setInitialPosition()):e.bottom>=r.bottom?(g.debug("Bottom fixed rail has reached bottom of container"),g.bindBottom()):l&&(g.set.scroll(c),g.save.lastScroll(e.top),g.save.elementScroll(c))):g.is.bottom()&&(e.top<=o.top?(g.debug("Jumped from bottom fixed to top fixed, most likely used home/end button"),g.setInitialPosition()):p.pushing?g.is.bound()&&e.bottom<=r.bottom&&(g.debug("Fixing bottom attached element to bottom of browser."),g.fixBottom()):g.is.bound()&&e.top<=r.bottom-o.height&&(g.debug("Fixing bottom attached element to top of browser."),g.fixTop())))},bindTop:function(){g.debug("Binding element to top of parent container"),g.remove.offset(),C.css({left:"",top:"",marginBottom:""}).removeClass(v.fixed).removeClass(v.bottom).addClass(v.bound).addClass(v.top),p.onTop.call(A),p.onUnstick.call(A)},bindBottom:function(){g.debug("Binding element to bottom of parent container"),g.remove.offset(),C.css({left:"",top:""}).removeClass(v.fixed).removeClass(v.top).addClass(v.bound).addClass(v.bottom),p.onBottom.call(A),p.onUnstick.call(A)},setInitialPosition:function(){g.debug("Returning to initial position"),g.unfix(),g.unbind()},fixTop:function(){g.debug("Fixing element to top of page"),g.set.minimumSize(),g.set.offset(),C.css({left:g.cache.element.left,bottom:"",marginBottom:""}).removeClass(v.bound).removeClass(v.bottom).addClass(v.fixed).addClass(v.top),p.onStick.call(A)},fixBottom:function(){g.debug("Sticking element to bottom of page"),g.set.minimumSize(),g.set.offset(),C.css({left:g.cache.element.left,bottom:"",marginBottom:""}).removeClass(v.bound).removeClass(v.top).addClass(v.fixed).addClass(v.bottom),p.onStick.call(A)},unbind:function(){g.is.bound()&&(g.debug("Removing container bound position on element"),g.remove.offset(),C.removeClass(v.bound).removeClass(v.top).removeClass(v.bottom))},unfix:function(){g.is.fixed()&&(g.debug("Removing fixed position on element"),g.remove.offset(),C.removeClass(v.fixed).removeClass(v.top).removeClass(v.bottom),p.onUnstick.call(A))},reset:function(){g.debug("Reseting elements position"),g.unbind(),g.unfix(),g.resetCSS(),g.remove.offset(),g.remove.lastScroll()},resetCSS:function(){C.css({width:"",height:""}),a.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,0)},display:function(){var t=p.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(S===i&&g.initialize(),g.invoke(l)):(S!==i&&S.invoke("destroy"),g.initialize())}),o!==i?o:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!0,performance:!0,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,jitter:5,observeChanges:!1,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.tab=function(o){var a,r=e(e.isFunction(this)?t:this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1),f=!1;return r.each(function(){var g,p,v,h,b,y,x=e.isPlainObject(o)?e.extend(!0,{},e.fn.tab.settings,o):e.extend({},e.fn.tab.settings),C=x.className,w=x.metadata,k=x.selector,S=x.error,T="."+x.namespace,A="module-"+x.namespace,R=e(this),E={},P=!0,F=0,D=this,O=R.data(A);b={initialize:function(){b.debug("Initializing tab menu item",R),b.fix.callbacks(),b.determineTabs(),b.debug("Determining tabs",x.context,p),x.auto&&b.set.auto(),b.bind.events(),x.history&&!f&&(b.initializeHistory(),f=!0),b.instantiate()},instantiate:function(){b.verbose("Storing instance of module",b),O=b,R.data(A,b)},destroy:function(){b.debug("Destroying tabs",R),R.removeData(A).off(T)},bind:{events:function(){e.isWindow(D)||(b.debug("Attaching tab activation events to element",R),R.on("click"+T,b.event.click))}},determineTabs:function(){var t;"parent"===x.context?(R.closest(k.ui).length>0?(t=R.closest(k.ui),b.verbose("Using closest UI element as parent",t)):t=R,g=t.parent(),b.verbose("Determined parent element for creating context",g)):x.context?(g=e(x.context),b.verbose("Using selector for tab context",x.context,g)):g=e("body"),x.childrenOnly?(p=g.children(k.tabs),b.debug("Searching tab context children for tabs",g,p)):(p=g.find(k.tabs),b.debug("Searching tab context for tabs",g,p))},fix:{callbacks:function(){e.isPlainObject(o)&&(o.onTabLoad||o.onTabInit)&&(o.onTabLoad&&(o.onLoad=o.onTabLoad,delete o.onTabLoad,b.error(S.legacyLoad,o.onLoad)),o.onTabInit&&(o.onFirstLoad=o.onTabInit,delete o.onTabInit,b.error(S.legacyInit,o.onFirstLoad)),x=e.extend(!0,{},e.fn.tab.settings,o))}},initializeHistory:function(){if(b.debug("Initializing page state"),e.address===i)return b.error(S.state),!1;if("state"==x.historyType){if(b.debug("Using HTML5 to manage state"),x.path===!1)return b.error(S.path),!1;e.address.history(!0).state(x.path)}e.address.bind("change",b.event.history.change)},event:{click:function(t){var n=e(this).data(w.tab);n!==i?(x.history?(b.verbose("Updating page state",t),e.address.value(n)):(b.verbose("Changing tab",t),b.changeTab(n)),t.preventDefault()):b.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||b.get.initialPath(),o=x.templates.determineTitle(n)||!1;b.performance.display(),b.debug("History change event",n,t),y=t,n!==i&&b.changeTab(n),o&&e.address.title(o)}}},refresh:function(){v&&(b.debug("Refreshing tab",v),b.changeTab(v))},cache:{read:function(e){return e!==i?E[e]:!1},add:function(e,t){e=e||v,b.debug("Adding cached content for",e),E[e]=t},remove:function(e){e=e||v,b.debug("Removing cached content for",e),delete E[e]}},set:{auto:function(){var t="string"==typeof x.path?x.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";b.verbose("Setting up automatic tab retrieval from server",t),e.isPlainObject(x.apiSettings)?x.apiSettings.url=t:x.apiSettings={url:t}},loading:function(e){var t=b.get.tabElement(e),n=t.hasClass(C.loading);n||(b.verbose("Setting loading state for",t),t.addClass(C.loading).siblings(p).removeClass(C.active+" "+C.loading),t.length>0&&x.onRequest.call(t[0],e))},state:function(t){e.address.value(t)}},changeTab:function(n){var i=t.history&&t.history.pushState,o=i&&x.ignoreFirstLoad&&P,a=x.auto||e.isPlainObject(x.apiSettings),r=a&&!o?b.utilities.pathToArray(n):b.get.defaultPathArray(n);n=b.utilities.arrayToPath(r),e.each(r,function(t,i){var s,c,l,u,d=r.slice(0,t+1),m=b.utilities.arrayToPath(d),f=b.is.tab(m),p=t+1==r.length,k=b.get.tabElement(m);if(b.verbose("Looking for tab",i),f){if(b.verbose("Tab was found",i),v=m,h=b.utilities.filterArray(r,d),p?u=!0:(c=r.slice(0,t+2),l=b.utilities.arrayToPath(c),u=!b.is.tab(l),u&&b.verbose("Tab parameters found",c)),u&&a)return o?(b.debug("Ignoring remote content on first tab load",m),P=!1,b.cache.add(n,k.html()),b.activate.all(m),x.onFirstLoad.call(k[0],m,h,y),x.onLoad.call(k[0],m,h,y)):(b.activate.navigation(m),b.fetch.content(m,n)),!1;b.debug("Opened local tab",m),b.activate.all(m),b.cache.read(m)||(b.cache.add(m,!0),b.debug("First time tab loaded calling tab init"),x.onFirstLoad.call(k[0],m,h,y)),x.onLoad.call(k[0],m,h,y)}else{if(-1!=n.search("/")||""===n)return b.error(S.missingTab,R,g,m),!1;if(s=e("#"+n+', a[name="'+n+'"]'),m=s.closest("[data-tab]").data(w.tab),k=b.get.tabElement(m),s&&s.length>0&&m)return b.debug("Anchor link used, opening parent tab",k,s),k.hasClass(C.active)||setTimeout(function(){b.scrollTo(s)},0),b.activate.all(m),b.cache.read(m)||(b.cache.add(m,!0),b.debug("First time tab loaded calling tab init"),x.onFirstLoad.call(k[0],m,h,y)),x.onLoad.call(k[0],m,h,y),!1}})},scrollTo:function(t){var i=t&&t.length>0?t.offset().top:!1;i!==!1&&(b.debug("Forcing scroll to an in-page link in a hidden tab",i,t),e(n).scrollTop(i))},update:{content:function(e,t,n){var o=b.get.tabElement(e),a=o[0];n=n!==i?n:x.evaluateScripts,n?(b.debug("Updating HTML and evaluating inline scripts",e,t),o.html(t)):(b.debug("Updating HTML",e,t),a.innerHTML=t)}},fetch:{content:function(t,n){var o,a,r=b.get.tabElement(t),s={dataType:"html",encodeParameters:!1,on:"now",cache:x.alwaysRefresh,headers:{"X-Remote":!0},onSuccess:function(e){b.cache.add(n,e),b.update.content(t,e),t==v?(b.debug("Content loaded",t),b.activate.tab(t)):b.debug("Content loaded in background",t),x.onFirstLoad.call(r[0],t,h,y),x.onLoad.call(r[0],t,h,y)},urlData:{tab:n}},c=r.api("get request")||!1,l=c&&"pending"===c.state();n=n||t,a=b.cache.read(n),x.cache&&a?(b.activate.tab(t),b.debug("Adding cached content",n),"once"==x.evaluateScripts?b.update.content(t,a,!1):b.update.content(t,a),x.onLoad.call(r[0],t,h,y)):l?(b.set.loading(t),b.debug("Content is already loading",n)):e.api!==i?(o=e.extend(!0,{},x.apiSettings,s),b.debug("Retrieving remote content",n,o),b.set.loading(t),r.api(o)):b.error(S.api)}},activate:{all:function(e){b.activate.tab(e),b.activate.navigation(e)},tab:function(e){var t=b.get.tabElement(e),n=t.hasClass(C.active);b.verbose("Showing tab content for",t),n||(t.addClass(C.active).siblings(p).removeClass(C.active+" "+C.loading),t.length>0&&x.onVisible.call(t[0],e))},navigation:function(e){var t=b.get.navElement(e),n=t.hasClass(C.active);b.verbose("Activating tab navigation for",t,e),n||t.addClass(C.active).siblings(r).removeClass(C.active+" "+C.loading)}},deactivate:{all:function(){b.deactivate.navigation(),b.deactivate.tabs()},navigation:function(){r.removeClass(C.active)},tabs:function(){p.removeClass(C.active+" "+C.loading)}},is:{tab:function(e){return e!==i?b.get.tabElement(e).length>0:!1}},get:{initialPath:function(){return r.eq(0).data(w.tab)||p.eq(0).data(w.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return b.utilities.pathToArray(b.get.defaultPath(e))},defaultPath:function(e){var t=r.filter("[data-"+w.tab+'^="'+e+'/"]').eq(0),n=t.data(w.tab)||!1;if(n){if(b.debug("Found default tab",n),F<x.maxDepth)return F++,b.get.defaultPath(n);b.error(S.recursion)}else b.debug("No default tabs found for",e,p);return F=0,e},navElement:function(e){return e=e||v,r.filter("[data-"+w.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,o;return e=e||v,i=b.utilities.pathToArray(e),o=b.utilities.last(i),t=p.filter("[data-"+w.tab+'="'+e+'"]'),n=p.filter("[data-"+w.tab+'="'+o+'"]'),t.length>0?t:n},tab:function(){return v}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return e.isArray(t)?t[t.length-1]:!1},pathToArray:function(e){return e===i&&(e=v),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return e.isArray(t)?t.join("/"):!1}},setting:function(t,n){if(b.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,x,t);else{if(n===i)return x[t];x[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},debug:function(){x.debug&&(x.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,x.name+":"),b.debug.apply(console,arguments)))},verbose:function(){x.verbose&&x.debug&&(x.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,x.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,x.name+":"),b.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;x.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:D,"Execution Time":n})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,500)},display:function(){var t=x.name+":",n=0;c=!1,clearTimeout(b.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=O;return n=n||m,o=D||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(b.error(S.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(O===i&&b.initialize(),b.invoke(u)):(O!==i&&O.invoke("destroy"),b.initialize())}),a!==i?a:this},e.tab=function(){e(t).tab.apply(this,arguments)},e.fn.tab.settings={name:"Tab",namespace:"tab",debug:!1,verbose:!1,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,alwaysRefresh:!1,cache:!0,ignoreFirstLoad:!1,apiSettings:!1,evaluateScripts:"once",onFirstLoad:function(e,t,n){},onLoad:function(e,t,n){},onVisible:function(e,t,n){},onRequest:function(e,t,n){},templates:{determineTitle:function(e){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found. Tabs are case-sensitive.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",legacyInit:"onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.",legacyLoad:"onTabLoad has been renamed to onLoad in 2.0. Please adjust your code",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.transition=function(){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments,u=l[0],d=[].slice.call(arguments,1),m="string"==typeof u;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(t){var f,g,p,v,h,b,y,x,C,w=e(this),k=this;C={initialize:function(){f=C.get.settings.apply(k,l),v=f.className,p=f.error,h=f.metadata,x="."+f.namespace,y="module-"+f.namespace,g=w.data(y)||C,b=C.get.animationEndEvent(),m&&(m=C.invoke(u)),m===!1&&(C.verbose("Converted arguments into settings object",f),f.interval?C.delay(f.animate):C.animate(),C.instantiate())},instantiate:function(){C.verbose("Storing instance of module",C),g=C,w.data(y,g)},destroy:function(){C.verbose("Destroying previous module for",k),w.removeData(y)},refresh:function(){C.verbose("Refreshing display type on next animation"),delete C.displayType},forceRepaint:function(){C.verbose("Forcing element repaint");var e=w.parent(),t=w.next();0===t.length?w.detach().appendTo(e):w.detach().insertBefore(t)},repaint:function(){C.verbose("Repainting element");k.offsetWidth},delay:function(e){var n,o,r=C.get.animationDirection();r||(r=C.can.transition()?C.get.direction():"static"),e=e!==i?e:f.interval,n="auto"==f.reverse&&r==v.outward,o=n||1==f.reverse?(a.length-t)*f.interval:t*f.interval,C.debug("Delaying animation by",o),setTimeout(C.animate,o)},animate:function(e){if(f=e||f,!C.is.supported())return C.error(p.support),!1;if(C.debug("Preparing animation",f.animation),C.is.animating()){if(f.queue)return!f.allowRepeats&&C.has.direction()&&C.is.occurring()&&C.queuing!==!0?C.debug("Animation is currently occurring, preventing queueing same animation",f.animation):C.queue(f.animation),!1;if(!f.allowRepeats&&C.is.occurring())return C.debug("Animation is already occurring, will not execute repeated animation",f.animation),!1;C.debug("New animation started, completing previous early",f.animation),g.complete()}C.can.animate()?C.set.animating(f.animation):C.error(p.noAnimation,f.animation,k)},reset:function(){C.debug("Resetting animation to beginning conditions"),C.remove.animationCallbacks(),C.restore.conditions(),C.remove.animating()},queue:function(e){C.debug("Queueing animation of",e),C.queuing=!0,w.one(b+".queue"+x,function(){C.queuing=!1,C.repaint(),C.animate.apply(this,f)})},complete:function(e){C.debug("Animation complete",f.animation),C.remove.completeCallback(),C.remove.failSafe(),C.is.looping()||(C.is.outward()?(C.verbose("Animation is outward, hiding element"),C.restore.conditions(),C.hide()):C.is.inward()?(C.verbose("Animation is outward, showing element"),C.restore.conditions(),C.show()):(C.verbose("Static animation completed"),C.restore.conditions(),f.onComplete.call(k)))},force:{visible:function(){var e=w.attr("style"),t=C.get.userStyle(),n=C.get.displayType(),o=t+"display: "+n+" !important;",a=w.css("display"),r=e===i||""===e;a!==n?(C.verbose("Overriding default display to show element",n),w.attr("style",o)):r&&w.removeAttr("style")},hidden:function(){var e=w.attr("style"),t=w.css("display"),n=e===i||""===e;"none"===t||C.is.hidden()?n&&w.removeAttr("style"):(C.verbose("Overriding default display to hide element"),w.css("display","none"))}},has:{direction:function(t){var n=!1;return t=t||f.animation,"string"==typeof t&&(t=t.split(" "),e.each(t,function(e,t){(t===v.inward||t===v.outward)&&(n=!0)})),n},inlineDisplay:function(){var t=w.attr("style")||"";return e.isArray(t.match(/display.*?;/,""))}},set:{animating:function(e){var t;C.remove.completeCallback(),e=e||f.animation,t=C.get.animationClass(e),C.save.animation(t),C.force.visible(),C.remove.hidden(),C.remove.direction(),C.start.animation(t)},duration:function(e,t){t=t||f.duration,t="number"==typeof t?t+"ms":t,(t||0===t)&&(C.verbose("Setting animation duration",t),w.css({"animation-duration":t}))},direction:function(e){e=e||C.get.direction(),e==v.inward?C.set.inward():C.set.outward()},looping:function(){C.debug("Transition set to loop"),w.addClass(v.looping)},hidden:function(){w.addClass(v.transition).addClass(v.hidden)},inward:function(){C.debug("Setting direction to inward"),w.removeClass(v.outward).addClass(v.inward)},outward:function(){C.debug("Setting direction to outward"),w.removeClass(v.inward).addClass(v.outward)},visible:function(){w.addClass(v.transition).addClass(v.visible)}},start:{animation:function(e){e=e||C.get.animationClass(),C.debug("Starting tween",e),w.addClass(e).one(b+".complete"+x,C.complete),f.useFailSafe&&C.add.failSafe(),C.set.duration(f.duration),f.onStart.call(k)}},save:{animation:function(e){C.cache||(C.cache={}),C.cache.animation=e},displayType:function(e){"none"!==e&&w.data(h.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,C.verbose("Saving existence of transition",t,n)}},restore:{conditions:function(){var e=C.get.currentAnimation();e&&(w.removeClass(e),C.verbose("Removing animation class",C.cache)),C.remove.duration()}},add:{failSafe:function(){var e=C.get.duration();C.timer=setTimeout(function(){w.triggerHandler(b)},e+f.failSafeDelay),C.verbose("Adding fail safe timer",C.timer)}},remove:{animating:function(){w.removeClass(v.animating)},animationCallbacks:function(){C.remove.queueCallback(),C.remove.completeCallback()},queueCallback:function(){w.off(".queue"+x)},completeCallback:function(){w.off(".complete"+x)},display:function(){w.css("display","")},direction:function(){w.removeClass(v.inward).removeClass(v.outward)},duration:function(){w.css("animation-duration","")},failSafe:function(){C.verbose("Removing fail safe timer",C.timer),C.timer&&clearTimeout(C.timer)},hidden:function(){w.removeClass(v.hidden)},visible:function(){w.removeClass(v.visible)},looping:function(){C.debug("Transitions are no longer looping"),C.is.looping()&&(C.reset(),w.removeClass(v.looping))},transition:function(){w.removeClass(v.visible).removeClass(v.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})},animationClass:function(e){var t=e||f.animation,n=C.can.transition()&&!C.has.direction()?C.get.direction()+" ":"";return v.animating+" "+v.transition+" "+n+t},currentAnimation:function(){return C.cache&&C.cache.animation!==i?C.cache.animation:!1},currentDirection:function(){return C.is.inward()?v.inward:v.outward},direction:function(){return C.is.hidden()||!C.is.visible()?v.inward:v.outward},animationDirection:function(t){var n;return t=t||f.animation,"string"==typeof t&&(t=t.split(" "),e.each(t,function(e,t){t===v.inward?n=v.inward:t===v.outward&&(n=v.outward)})),n?n:!1},duration:function(e){return e=e||f.duration,e===!1&&(e=w.css("animation-duration")||0),"string"==typeof e?e.indexOf("ms")>-1?parseFloat(e):1e3*parseFloat(e):e},displayType:function(){return f.displayType?f.displayType:(w.data(h.displayType)===i&&C.can.transition(!0),w.data(h.displayType))},userStyle:function(e){return e=e||w.attr("style")||"",e.replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationStartEvent:function(){var e,t=n.createElement("div"),o={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationEndEvent:function(){var e,t=n.createElement("div"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(t.style[e]!==i)return o[e];return!1}},can:{transition:function(t){var n,o,a,r,s,c,l,u=f.animation,d=C.get.transitionExists(u);if(d===i||t){if(C.verbose("Determining whether animation exists"),n=w.attr("class"),o=w.prop("tagName"),a=e("<"+o+" />").addClass(n).insertAfter(w),r=a.addClass(u).removeClass(v.inward).removeClass(v.outward).addClass(v.animating).addClass(v.transition).css("animationName"),s=a.addClass(v.inward).css("animationName"),l=a.attr("class",n).removeAttr("style").removeClass(v.hidden).removeClass(v.visible).show().css("display"),C.verbose("Determining final display state",l),C.save.displayType(l),a.remove(),r!=s)C.debug("Direction exists for animation",u),c=!0;else{if("none"==r||!r)return void C.debug("No animation defined in css",u);C.debug("Static animation found",u,l),c=!1}C.save.transitionExists(u,c)}return d!==i?d:c},animate:function(){return C.can.transition()!==i}},is:{animating:function(){return w.hasClass(v.animating)},inward:function(){return w.hasClass(v.inward)},outward:function(){return w.hasClass(v.outward)},looping:function(){return w.hasClass(v.looping)},occurring:function(e){return e=e||f.animation,e="."+e.replace(" ","."),w.filter(e).length>0},visible:function(){return w.is(":visible")},hidden:function(){return"hidden"===w.css("visibility")},supported:function(){return b!==!1}},hide:function(){C.verbose("Hiding element"),C.is.animating()&&C.reset(),k.blur(),C.remove.display(),C.remove.visible(),C.set.hidden(),C.force.hidden(),f.onHide.call(k),f.onComplete.call(k)},show:function(e){C.verbose("Showing element",e),C.remove.hidden(),C.set.visible(),C.force.visible(),f.onShow.call(k),f.onComplete.call(k)},toggle:function(){C.is.visible()?C.hide():C.show()},stop:function(){C.debug("Stopping current animation"),w.triggerHandler(b)},stopAll:function(){C.debug("Stopping all animation"),C.remove.queueCallback(),w.triggerHandler(b)},clear:{queue:function(){C.debug("Clearing animation queue"),C.remove.queueCallback()}},enable:function(){C.verbose("Starting animation"),w.removeClass(v.disabled)},disable:function(){C.debug("Stopping animation"),w.addClass(v.disabled)},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){f.debug&&(f.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,f.name+":"),C.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),C.verbose.apply(console,arguments)))},error:function(){C.error=Function.prototype.bind.call(console.error,console,f.name+":"),C.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,500)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(C.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=g;return n=n||d,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s!==i?s:!1}},C.initialize()}),o!==i?o:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",debug:!1,verbose:!1,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",
hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"Element is no longer attached to DOM. Unable to animate.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.api=e.fn.api=function(n){var o,a=e(e.isFunction(this)?t:this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f,g,p,v,h=e.isPlainObject(n)?e.extend(!0,{},e.fn.api.settings,n):e.extend({},e.fn.api.settings),b=h.namespace,y=h.metadata,x=h.selector,C=h.error,w=h.className,k="."+b,S="module-"+b,T=e(this),A=T.closest(x.form),R=h.stateContext?e(h.stateContext):T,E=this,P=R[0],F=T.data(S);v={initialize:function(){u||v.bind.events(),v.instantiate()},instantiate:function(){v.verbose("Storing instance of module",v),F=v,T.data(S,F)},destroy:function(){v.verbose("Destroying previous module for",E),T.removeData(S).off(k)},bind:{events:function(){var e=v.get.event();e?(v.verbose("Attaching API events to element",e),T.on(e+k,v.event.trigger)):"now"==h.on&&(v.debug("Querying API endpoint immediately"),v.query())}},decode:{json:function(e){if(e!==i&&"string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}},read:{cachedResponse:function(e){var n;return t.Storage===i?void v.error(C.noStorage):(n=sessionStorage.getItem(e),v.debug("Using cached response",e,n),n=v.decode.json(n),!1)}},write:{cachedResponse:function(n,o){return o&&""===o?void v.debug("Response empty, not caching",o):t.Storage===i?void v.error(C.noStorage):(e.isPlainObject(o)&&(o=JSON.stringify(o)),sessionStorage.setItem(n,o),void v.verbose("Storing cached response for url",n,o))}},query:function(){if(v.is.disabled())return void v.debug("Element is disabled API request aborted");if(v.is.loading()){if(!h.interruptRequests)return void v.debug("Cancelling request, previous request is still pending");v.debug("Interrupting previous request"),v.abort()}return h.defaultData&&e.extend(!0,h.urlData,v.get.defaultData()),h.serializeForm&&(h.data=v.add.formData(h.data)),m=v.get.settings(),m===!1?(v.cancelled=!0,void v.error(C.beforeSend)):(v.cancelled=!1,f=v.get.templatedURL(),f||v.is.mocked()?(f=v.add.urlData(f),f||v.is.mocked()?(m.url=h.base+f,a=e.extend(!0,{},h,{type:h.method||h.type,data:g,url:h.base+f,beforeSend:h.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),v.debug("Querying URL",a.url),v.verbose("Using AJAX settings",a),"local"===h.cache&&v.read.cachedResponse(f)?(v.debug("Response returned from local cache"),v.request=v.create.request(),void v.request.resolveWith(P,[v.read.cachedResponse(f)])):void(h.throttle?h.throttleFirstRequest||v.timer?(v.debug("Throttling request",h.throttle),clearTimeout(v.timer),v.timer=setTimeout(function(){v.timer&&delete v.timer,v.debug("Sending throttled request",g,a.method),v.send.request()},h.throttle)):(v.debug("Sending request",g,a.method),v.send.request(),v.timer=setTimeout(function(){},h.throttle)):(v.debug("Sending request",g,a.method),v.send.request()))):void 0):void v.error(C.missingURL))},should:{removeError:function(){return h.hideError===!0||"auto"===h.hideError&&!v.is.form()}},is:{disabled:function(){return T.filter(x.disabled).length>0},form:function(){return T.is("form")||R.is("form")},mocked:function(){return h.mockResponse||h.mockResponseAsync||h.response||h.responseAsync},input:function(){return T.is("input")},loading:function(){return v.request&&"pending"==v.request.state()},abortedRequest:function(e){return e&&e.readyState!==i&&0===e.readyState?(v.verbose("XHR request determined to be aborted"),!0):(v.verbose("XHR request was not aborted"),!1)},validResponse:function(t){return"json"!==h.dataType&&"jsonp"!==h.dataType||!e.isFunction(h.successTest)?(v.verbose("Response is not JSON, skipping validation",h.successTest,t),!0):(v.debug("Checking JSON returned success",h.successTest,t),h.successTest(t)?(v.debug("Response passed success test",t),!0):(v.debug("Response failed success test",t),!1))}},was:{cancelled:function(){return v.cancelled||!1},succesful:function(){return v.request&&"resolved"==v.request.state()},failure:function(){return v.request&&"rejected"==v.request.state()},complete:function(){return v.request&&("resolved"==v.request.state()||"rejected"==v.request.state())}},add:{urlData:function(t,n){var o,a;return t&&(o=t.match(h.regExp.required),a=t.match(h.regExp.optional),n=n||h.urlData,o&&(v.debug("Looking for required URL variables",o),e.each(o,function(o,a){var r=-1!==a.indexOf("$")?a.substr(2,a.length-3):a.substr(1,a.length-2),s=e.isPlainObject(n)&&n[r]!==i?n[r]:T.data(r)!==i?T.data(r):R.data(r)!==i?R.data(r):n[r];return s===i?(v.error(C.requiredParameter,r,t),t=!1,!1):(v.verbose("Found required variable",r,s),s=h.encodeParameters?v.get.urlEncodedValue(s):s,t=t.replace(a,s),void 0)})),a&&(v.debug("Looking for optional URL variables",o),e.each(a,function(o,a){var r=-1!==a.indexOf("$")?a.substr(3,a.length-4):a.substr(2,a.length-3),s=e.isPlainObject(n)&&n[r]!==i?n[r]:T.data(r)!==i?T.data(r):R.data(r)!==i?R.data(r):n[r];s!==i?(v.verbose("Optional variable Found",r,s),t=t.replace(a,s)):(v.verbose("Optional variable not found",r),t=-1!==t.indexOf("/"+a)?t.replace("/"+a,""):t.replace(a,""))}))),t},formData:function(t){var n,o=e.fn.serializeObject!==i,a=o?A.serializeObject():A.serialize();return t=t||h.data,n=e.isPlainObject(t),n?o?(v.debug("Extending existing data with form data",t,a),t=e.extend(!0,{},t,a)):(v.error(C.missingSerialize),v.debug("Cant extend data. Replacing data with form data",t,a),t=a):(v.debug("Adding form data",a),t=a),t}},send:{request:function(){v.set.loading(),v.request=v.create.request(),v.is.mocked()?v.mockedXHR=v.create.mockedXHR():v.xhr=v.create.xhr(),h.onRequest.call(P,v.request,v.xhr)}},event:{trigger:function(e){v.query(),("submit"==e.type||"click"==e.type)&&e.preventDefault()},xhr:{always:function(){},done:function(t,n,i){var o=this,a=(new Date).getTime()-p,r=h.loadingDuration-a,s=e.isFunction(h.onResponse)?h.onResponse.call(o,e.extend(!0,{},t)):!1;r=r>0?r:0,s&&(v.debug("Modified API response in onResponse callback",h.onResponse,s,t),t=s),r>0&&v.debug("Response completed early delaying state change by",r),setTimeout(function(){v.is.validResponse(t)?v.request.resolveWith(o,[t,i]):v.request.rejectWith(o,[i,"invalid"])},r)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-p,a=h.loadingDuration-o;a=a>0?a:0,a>0&&v.debug("Response completed early delaying state change by",a),setTimeout(function(){v.is.abortedRequest(e)?v.request.rejectWith(i,[e,"aborted",n]):v.request.rejectWith(i,[e,"error",t,n])},a)}},request:{done:function(e,t){v.debug("Successful API Response",e),"local"===h.cache&&f&&(v.write.cachedResponse(f,e),v.debug("Saving server response locally",v.cache)),h.onSuccess.call(P,e,T,t)},complete:function(e,t){var n,i;v.was.succesful()?(i=e,n=t):(n=e,i=v.get.responseFromXHR(n)),v.remove.loading(),h.onComplete.call(P,i,T,n)},fail:function(e,t,n){var o=v.get.responseFromXHR(e),r=v.get.errorFromRequest(o,t,n);"aborted"==t?(v.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)",t,n),h.onAbort.call(P,t,T,e)):"invalid"==t?v.debug("JSON did not pass success test. A server-side error has most likely occurred",o):"error"==t&&e!==i&&(v.debug("XHR produced a server error",t,n),200!=e.status&&n!==i&&""!==n&&v.error(C.statusMessage+n,a.url),h.onError.call(P,r,T,e)),h.errorDuration&&"aborted"!==t&&(v.debug("Adding error state"),v.set.error(),v.should.removeError()&&setTimeout(v.remove.error,h.errorDuration)),v.debug("API Request failed",r,e),h.onFailure.call(P,o,T,e)}}},create:{request:function(){return e.Deferred().always(v.event.request.complete).done(v.event.request.done).fail(v.event.request.fail)},mockedXHR:function(){var t,n,i,o=!1,a=!1,r=!1,s=h.mockResponse||h.response,c=h.mockResponseAsync||h.responseAsync;return i=e.Deferred().always(v.event.xhr.complete).done(v.event.xhr.done).fail(v.event.xhr.fail),s?(e.isFunction(s)?(v.debug("Using specified synchronous callback",s),n=s.call(P,m)):(v.debug("Using settings specified response",s),n=s),i.resolveWith(P,[n,o,{responseText:n}])):e.isFunction(c)&&(t=function(e){v.debug("Async callback returned response",e),e?i.resolveWith(P,[e,o,{responseText:e}]):i.rejectWith(P,[{responseText:e},a,r])},v.debug("Using specified async response callback",c),c.call(P,m,t)),i},xhr:function(){var t;return t=e.ajax(a).always(v.event.xhr.always).done(v.event.xhr.done).fail(v.event.xhr.fail),v.verbose("Created server request",t),t}},set:{error:function(){v.verbose("Adding error state to element",R),R.addClass(w.error)},loading:function(){v.verbose("Adding loading state to element",R),R.addClass(w.loading),p=(new Date).getTime()}},remove:{error:function(){v.verbose("Removing error state from element",R),R.removeClass(w.error)},loading:function(){v.verbose("Removing loading state from element",R),R.removeClass(w.loading)}},get:{responseFromXHR:function(t){return e.isPlainObject(t)?"json"==h.dataType||"jsonp"==h.dataType?v.decode.json(t.responseText):t.responseText:!1},errorFromRequest:function(t,n,o){return e.isPlainObject(t)&&t.error!==i?t.error:h.error[n]!==i?h.error[n]:o},request:function(){return v.request||!1},xhr:function(){return v.xhr||!1},settings:function(){var t;return t=h.beforeSend.call(P,h),t&&(t.success!==i&&(v.debug("Legacy success callback detected",t),v.error(C.legacyParameters,t.success),t.onSuccess=t.success),t.failure!==i&&(v.debug("Legacy failure callback detected",t),v.error(C.legacyParameters,t.failure),t.onFailure=t.failure),t.complete!==i&&(v.debug("Legacy complete callback detected",t),v.error(C.legacyParameters,t.complete),t.onComplete=t.complete)),t===i&&v.error(C.noReturnedValue),t!==i?e.extend(!0,{},t):e.extend(!0,{},h)},urlEncodedValue:function(e){var n=t.decodeURIComponent(e),i=t.encodeURIComponent(e),o=n!==e;return o?(v.debug("URL value is already encoded, avoiding double encoding",e),e):(v.verbose("Encoding value using encodeURIComponent",e,i),i)},defaultData:function(){var t={};return e.isWindow(E)||(v.is.input()?t.value=T.val():v.is.form()&&(t.text=T.text())),t},event:function(){return e.isWindow(E)||"now"==h.on?(v.debug("API called without element, no events attached"),!1):"auto"==h.on?T.is("input")?E.oninput!==i?"input":E.onpropertychange!==i?"propertychange":"keyup":T.is("form")?"submit":"click":h.on},templatedURL:function(e){if(e=e||T.data(y.action)||h.action||!1,f=T.data(y.url)||h.url||!1)return v.debug("Using specified url",f),f;if(e){if(v.debug("Looking up url for action",e,h.api),h.api[e]===i&&!v.is.mocked())return void v.error(C.missingAction,h.action,h.api);f=h.api[e]}else v.is.form()&&(f=T.attr("action")||R.attr("action")||!1,v.debug("No url or action specified, defaulting to form action",f));return f}},abort:function(){var e=v.get.xhr();e&&"resolved"!==e.state()&&(v.debug("Cancelling API request"),e.abort())},reset:function(){v.remove.error(),v.remove.loading()},setting:function(t,n){if(v.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,h,t);else{if(n===i)return h[t];h[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},debug:function(){h.debug&&(h.performance?v.performance.log(arguments):(v.debug=Function.prototype.bind.call(console.info,console,h.name+":"),v.debug.apply(console,arguments)))},verbose:function(){h.verbose&&h.debug&&(h.performance?v.performance.log(arguments):(v.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),v.verbose.apply(console,arguments)))},error:function(){v.error=Function.prototype.bind.call(console.error,console,h.name+":"),v.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;h.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(v.performance.timer),v.performance.timer=setTimeout(v.performance.display,500)},display:function(){var t=h.name+":",n=0;s=!1,clearTimeout(v.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=F;return n=n||d,a=E||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(v.error(C.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(F===i&&v.initialize(),v.invoke(l)):(F!==i&&F.invoke("destroy"),v.initialize())}),o!==i?o:this},e.api.settings={name:"API",namespace:"api",debug:!1,verbose:!1,performance:!0,api:{},cache:!0,interruptRequests:!0,on:"auto",stateContext:!1,loadingDuration:0,hideError:"auto",errorDuration:2e3,encodeParameters:!0,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,throttleFirstRequest:!0,method:"get",data:{},dataType:"json",mockResponse:!1,mockResponseAsync:!1,response:!1,responseAsync:!1,beforeSend:function(e){return e},beforeXHR:function(e){},onRequest:function(e,t){},onResponse:!1,onSuccess:function(e,t){},onComplete:function(e,t){},onFailure:function(e,t){},onError:function(e,t){},onAbort:function(e,t){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"jquery-serialize-object is required to add form data to an existing data object",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",noStorage:"Caching responses locally requires session storage",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{disabled:".disabled",form:"form"},metadata:{action:"action",url:"url"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.state=function(t){var o,a=e(this),r=a.selector||"",s=("ontouchstart"in n.documentElement,(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var n,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.state.settings,t):e.extend({},e.fn.state.settings),f=m.error,g=m.metadata,p=m.className,v=m.namespace,h=m.states,b=m.text,y="."+v,x=v+"-module",C=e(this),w=this,k=C.data(x);n={initialize:function(){n.verbose("Initializing module"),m.automatic&&n.add.defaults(),m.context&&""!==r?e(m.context).on(r,"mouseenter"+y,n.change.text).on(r,"mouseleave"+y,n.reset.text).on(r,"click"+y,n.toggle.state):C.on("mouseenter"+y,n.change.text).on("mouseleave"+y,n.reset.text).on("click"+y,n.toggle.state),n.instantiate()},instantiate:function(){n.verbose("Storing instance of module",n),k=n,C.data(x,n)},destroy:function(){n.verbose("Destroying previous module",k),C.off(y).removeData(x)},refresh:function(){n.verbose("Refreshing selector cache"),C=e(w)},add:{defaults:function(){var o=t&&e.isPlainObject(t.states)?t.states:{};e.each(m.defaults,function(t,a){n.is[t]!==i&&n.is[t]()&&(n.verbose("Adding default states",t,w),e.extend(m.states,a,o))})}},is:{active:function(){return C.hasClass(p.active)},loading:function(){return C.hasClass(p.loading)},inactive:function(){return!C.hasClass(p.active)},state:function(e){return p[e]===i?!1:C.hasClass(p[e])},enabled:function(){return!C.is(m.filter.active)},disabled:function(){return C.is(m.filter.active)},textEnabled:function(){return!C.is(m.filter.text)},button:function(){return C.is(".button:not(a, .submit)")},input:function(){return C.is("input")},progress:function(){return C.is(".ui.progress")}},allow:function(e){n.debug("Now allowing state",e),h[e]=!0},disallow:function(e){n.debug("No longer allowing",e),h[e]=!1},allows:function(e){return h[e]||!1},enable:function(){C.removeClass(p.disabled)},disable:function(){C.addClass(p.disabled)},setState:function(e){n.allows(e)&&C.addClass(p[e])},removeState:function(e){n.allows(e)&&C.removeClass(p[e])},toggle:{state:function(){var t,o;if(n.allows("active")&&n.is.enabled()){if(n.refresh(),e.fn.api!==i)if(t=C.api("get request"),o=C.api("was cancelled"))n.debug("API Request cancelled by beforesend"),m.activateTest=function(){return!1},m.deactivateTest=function(){return!1};else if(t)return void n.listenTo(t);n.change.state()}}},listenTo:function(t){n.debug("API request detected, waiting for state signal",t),t&&(b.loading&&n.update.text(b.loading),e.when(t).then(function(){"resolved"==t.state()?(n.debug("API request succeeded"),m.activateTest=function(){return!0},m.deactivateTest=function(){return!0}):(n.debug("API request failed"),m.activateTest=function(){return!1},m.deactivateTest=function(){return!1}),n.change.state()}))},change:{state:function(){n.debug("Determining state change direction"),n.is.inactive()?n.activate():n.deactivate(),m.sync&&n.sync(),m.onChange.call(w)},text:function(){n.is.textEnabled()&&(n.is.disabled()?(n.verbose("Changing text to disabled text",b.hover),n.update.text(b.disabled)):n.is.active()?b.hover?(n.verbose("Changing text to hover text",b.hover),n.update.text(b.hover)):b.deactivate&&(n.verbose("Changing text to deactivating text",b.deactivate),n.update.text(b.deactivate)):b.hover?(n.verbose("Changing text to hover text",b.hover),n.update.text(b.hover)):b.activate&&(n.verbose("Changing text to activating text",b.activate),n.update.text(b.activate)))}},activate:function(){m.activateTest.call(w)&&(n.debug("Setting state to active"),C.addClass(p.active),n.update.text(b.active),m.onActivate.call(w))},deactivate:function(){m.deactivateTest.call(w)&&(n.debug("Setting state to inactive"),C.removeClass(p.active),n.update.text(b.inactive),m.onDeactivate.call(w))},sync:function(){n.verbose("Syncing other buttons to current state"),a.not(C).state(n.is.active()?"activate":"deactivate")},get:{text:function(){return m.selector.text?C.find(m.selector.text).text():C.html()},textFor:function(e){return b[e]||!1}},flash:{text:function(e,t,i){var o=n.get.text();n.debug("Flashing text message",e,t),e=e||m.text.flash,t=t||m.flashDuration,i=i||function(){},n.update.text(e),setTimeout(function(){n.update.text(o),i.call(w)},t)}},reset:{text:function(){var e=b.active||C.data(g.storedText),t=b.inactive||C.data(g.storedText);n.is.textEnabled()&&(n.is.active()&&e?(n.verbose("Resetting active text",e),n.update.text(e)):t&&(n.verbose("Resetting inactive text",e),n.update.text(t)))}},update:{text:function(e){var t=n.get.text();e&&e!==t?(n.debug("Updating text",e),m.selector.text?C.data(g.storedText,e).find(m.selector.text).text(e):C.data(g.storedText,e).html(e)):n.debug("Text is already set, ignoring update",e)}},setting:function(t,o){if(n.debug("Changing setting",t,o),e.isPlainObject(t))e.extend(!0,m,t);else{if(o===i)return m[t];m[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,n,t);else{if(o===i)return n[t];n[t]=o}},debug:function(){m.debug&&(m.performance?n.performance.log(arguments):(n.debug=Function.prototype.bind.call(console.info,console,m.name+":"),n.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?n.performance.log(arguments):(n.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),n.verbose.apply(console,arguments)))},error:function(){n.error=Function.prototype.bind.call(console.error,console,m.name+":"),n.error.apply(console,arguments)},performance:{log:function(e){var t,i,o;m.performance&&(t=(new Date).getTime(),o=s||t,i=t-o,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:w,"Execution Time":i})),clearTimeout(n.performance.timer),n.performance.timer=setTimeout(n.performance.display,500)},display:function(){var t=m.name+":",o=0;s=!1,clearTimeout(n.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,a,r){var s,c,l,u=k;return a=a||d,r=w||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(o,a){var r=o!=s?a+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(u[r])&&o!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||o==s)return u[a]!==i?(c=u[a],!1):(n.error(f.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,a):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(k===i&&n.initialize(),n.invoke(l)):(k!==i&&k.invoke("destroy"),n.initialize())}),o!==i?o:this},e.fn.state.settings={name:"State",debug:!1,verbose:!1,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{beforeSend:"The before send function has cancelled state change",method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.visibility=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return r.each(function(){var r,f,g,p=e.isPlainObject(o)?e.extend(!0,{},e.fn.visibility.settings,o):e.extend({},e.fn.visibility.settings),v=p.className,h=p.namespace,b=p.error,y=p.metadata,x="."+h,C="module-"+h,w=e(t),k=e(this),S=e(p.context),T=(k.selector||"",k.data(C)),A=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},R=this,E=!1;g={initialize:function(){g.debug("Initializing",p),g.setup.cache(),g.should.trackChanges()&&("image"==p.type&&g.setup.image(),"fixed"==p.type&&g.setup.fixed(),p.observeChanges&&g.observeChanges(),g.bind.events()),g.save.position(),g.is.visible()||g.error(b.visible,k),p.initialCheck&&g.checkVisibility(),g.instantiate()},instantiate:function(){g.debug("Storing instance",g),k.data(C,g),T=g},destroy:function(){g.verbose("Destroying previous module"),f&&f.disconnect(),w.off("load"+x,g.event.load).off("resize"+x,g.event.resize),S.off("scrollchange"+x,g.event.scrollchange),k.off(x).removeData(C)},observeChanges:function(){"MutationObserver"in t&&(f=new MutationObserver(function(e){g.verbose("DOM tree modified, updating visibility calculations"),g.timer=setTimeout(function(){g.verbose("DOM tree modified, updating sticky menu"),g.refresh()},100)}),f.observe(R,{childList:!0,subtree:!0}),g.debug("Setting up mutation observer",f))},bind:{events:function(){g.verbose("Binding visibility events to scroll and resize"),p.refreshOnLoad&&w.on("load"+x,g.event.load),w.on("resize"+x,g.event.resize),S.off("scroll"+x).on("scroll"+x,g.event.scroll).on("scrollchange"+x,g.event.scrollchange)}},event:{resize:function(){g.debug("Window resized"),p.refreshOnResize&&A(g.refresh)},load:function(){g.debug("Page finished loading"),A(g.refresh)},scroll:function(){p.throttle?(clearTimeout(g.timer),g.timer=setTimeout(function(){S.triggerHandler("scrollchange"+x,[S.scrollTop()])},p.throttle)):A(function(){S.triggerHandler("scrollchange"+x,[S.scrollTop()])})},scrollchange:function(e,t){g.checkVisibility(t)}},precache:function(t,i){t instanceof Array||(t=[t]);for(var o=t.length,a=0,r=[],s=n.createElement("img"),c=function(){a++,a>=t.length&&e.isFunction(i)&&i()};o--;)s=n.createElement("img"),s.onload=c,s.onerror=c,s.src=t[o],r.push(s)},enableCallbacks:function(){g.debug("Allowing callbacks to occur"),E=!1},disableCallbacks:function(){g.debug("Disabling all callbacks temporarily"),E=!0},should:{trackChanges:function(){return d?(g.debug("One time query, no need to bind events"),!1):(g.debug("Callbacks being attached"),!0)}},setup:{cache:function(){g.cache={occurred:{},screen:{},element:{}}},image:function(){var e=k.data(y.src);e&&(g.verbose("Lazy loading image",e),p.once=!0,p.observeChanges=!1,p.onOnScreen=function(){g.debug("Image on screen",R),g.precache(e,function(){g.set.image(e)})})},fixed:function(){g.debug("Setting up fixed"),p.once=!1,p.observeChanges=!1,p.initialCheck=!0,p.refreshOnLoad=!0,o.transition||(p.transition=!1),g.create.placeholder(),g.debug("Added placeholder",r),p.onTopPassed=function(){g.debug("Element passed, adding fixed position",k),g.show.placeholder(),g.set.fixed(),p.transition&&e.fn.transition!==i&&k.transition(p.transition,p.duration)},p.onTopPassedReverse=function(){g.debug("Element returned to position, removing fixed",k),g.hide.placeholder(),g.remove.fixed()}}},create:{placeholder:function(){g.verbose("Creating fixed position placeholder"),r=k.clone(!1).css("display","none").addClass(v.placeholder).insertAfter(k)}},show:{placeholder:function(){g.verbose("Showing placeholder"),r.css("display","block").css("visibility","hidden")}},hide:{placeholder:function(){g.verbose("Hiding placeholder"),r.css("display","none").css("visibility","")}},set:{fixed:function(){g.verbose("Setting element to fixed position"),k.addClass(v.fixed).css({position:"fixed",top:p.offset+"px",left:"auto",zIndex:"1"})},image:function(t){k.attr("src",t),p.transition?e.fn.transition!==i?k.transition(p.transition,p.duration):k.fadeIn(p.duration):k.show()}},is:{onScreen:function(){var e=g.get.elementCalculations();return e.onScreen},offScreen:function(){var e=g.get.elementCalculations();return e.offScreen},visible:function(){return g.cache&&g.cache.element?!(0===g.cache.element.width&&0===g.cache.element.offset.top):!1}},refresh:function(){g.debug("Refreshing constants (width/height)"),"fixed"==p.type&&(g.remove.fixed(),g.remove.occurred()),g.reset(),g.save.position(),p.checkOnRefresh&&g.checkVisibility(),p.onRefresh.call(R)},reset:function(){g.verbose("Reseting all cached values"),e.isPlainObject(g.cache)&&(g.cache.screen={},g.cache.element={})},checkVisibility:function(e){g.verbose("Checking visibility of element",g.cache.element),!E&&g.is.visible()&&(g.save.scroll(e),g.save.calculations(),g.passed(),g.passingReverse(),g.topVisibleReverse(),g.bottomVisibleReverse(),g.topPassedReverse(),g.bottomPassedReverse(),g.onScreen(),g.offScreen(),g.passing(),g.topVisible(),g.bottomVisible(),g.topPassed(),g.bottomPassed(),p.onUpdate&&p.onUpdate.call(R,g.get.elementCalculations()))},passed:function(t,n){var o=g.get.elementCalculations();if(t&&n)p.onPassed[t]=n;else{if(t!==i)return g.get.pixelsPassed(t)>o.pixelsPassed;o.passing&&e.each(p.onPassed,function(e,t){o.bottomVisible||o.pixelsPassed>g.get.pixelsPassed(e)?g.execute(t,e):p.once||g.remove.occurred(t)})}},onScreen:function(e){var t=g.get.elementCalculations(),n=e||p.onOnScreen,o="onScreen";return e&&(g.debug("Adding callback for onScreen",e),p.onOnScreen=e),t.onScreen?g.execute(n,o):p.once||g.remove.occurred(o),e!==i?t.onOnScreen:void 0},offScreen:function(e){var t=g.get.elementCalculations(),n=e||p.onOffScreen,o="offScreen";return e&&(g.debug("Adding callback for offScreen",e),p.onOffScreen=e),t.offScreen?g.execute(n,o):p.once||g.remove.occurred(o),e!==i?t.onOffScreen:void 0},passing:function(e){var t=g.get.elementCalculations(),n=e||p.onPassing,o="passing";return e&&(g.debug("Adding callback for passing",e),p.onPassing=e),t.passing?g.execute(n,o):p.once||g.remove.occurred(o),e!==i?t.passing:void 0},topVisible:function(e){var t=g.get.elementCalculations(),n=e||p.onTopVisible,o="topVisible";return e&&(g.debug("Adding callback for top visible",e),p.onTopVisible=e),t.topVisible?g.execute(n,o):p.once||g.remove.occurred(o),e===i?t.topVisible:void 0},bottomVisible:function(e){var t=g.get.elementCalculations(),n=e||p.onBottomVisible,o="bottomVisible";return e&&(g.debug("Adding callback for bottom visible",e),p.onBottomVisible=e),t.bottomVisible?g.execute(n,o):p.once||g.remove.occurred(o),e===i?t.bottomVisible:void 0},topPassed:function(e){var t=g.get.elementCalculations(),n=e||p.onTopPassed,o="topPassed";return e&&(g.debug("Adding callback for top passed",e),p.onTopPassed=e),t.topPassed?g.execute(n,o):p.once||g.remove.occurred(o),e===i?t.topPassed:void 0},bottomPassed:function(e){var t=g.get.elementCalculations(),n=e||p.onBottomPassed,o="bottomPassed";return e&&(g.debug("Adding callback for bottom passed",e),p.onBottomPassed=e),t.bottomPassed?g.execute(n,o):p.once||g.remove.occurred(o),e===i?t.bottomPassed:void 0},passingReverse:function(e){var t=g.get.elementCalculations(),n=e||p.onPassingReverse,o="passingReverse";return e&&(g.debug("Adding callback for passing reverse",e),p.onPassingReverse=e),t.passing?p.once||g.remove.occurred(o):g.get.occurred("passing")&&g.execute(n,o),e!==i?!t.passing:void 0},topVisibleReverse:function(e){var t=g.get.elementCalculations(),n=e||p.onTopVisibleReverse,o="topVisibleReverse";return e&&(g.debug("Adding callback for top visible reverse",e),p.onTopVisibleReverse=e),t.topVisible?p.once||g.remove.occurred(o):g.get.occurred("topVisible")&&g.execute(n,o),e===i?!t.topVisible:void 0},bottomVisibleReverse:function(e){var t=g.get.elementCalculations(),n=e||p.onBottomVisibleReverse,o="bottomVisibleReverse";return e&&(g.debug("Adding callback for bottom visible reverse",e),p.onBottomVisibleReverse=e),t.bottomVisible?p.once||g.remove.occurred(o):g.get.occurred("bottomVisible")&&g.execute(n,o),e===i?!t.bottomVisible:void 0},topPassedReverse:function(e){var t=g.get.elementCalculations(),n=e||p.onTopPassedReverse,o="topPassedReverse";return e&&(g.debug("Adding callback for top passed reverse",e),p.onTopPassedReverse=e),t.topPassed?p.once||g.remove.occurred(o):g.get.occurred("topPassed")&&g.execute(n,o),e===i?!t.onTopPassed:void 0},bottomPassedReverse:function(e){var t=g.get.elementCalculations(),n=e||p.onBottomPassedReverse,o="bottomPassedReverse";return e&&(g.debug("Adding callback for bottom passed reverse",e),p.onBottomPassedReverse=e),t.bottomPassed?p.once||g.remove.occurred(o):g.get.occurred("bottomPassed")&&g.execute(n,o),e===i?!t.bottomPassed:void 0},execute:function(e,t){var n=g.get.elementCalculations(),i=g.get.screenCalculations();e=e||!1,e&&(p.continuous?(g.debug("Callback being called continuously",t,n),e.call(R,n,i)):g.get.occurred(t)||(g.debug("Conditions met",t,n),e.call(R,n,i))),g.save.occurred(t)},remove:{fixed:function(){g.debug("Removing fixed position"),k.removeClass(v.fixed).css({position:"",top:"",left:"",zIndex:""})},occurred:function(e){if(e){var t=g.cache.occurred;t[e]!==i&&t[e]===!0&&(g.debug("Callback can now be called again",e),g.cache.occurred[e]=!1)}else g.cache.occurred={}}},save:{calculations:function(){g.verbose("Saving all calculations necessary to determine positioning"),g.save.direction(),g.save.screenCalculations(),g.save.elementCalculations();

},occurred:function(e){e&&(g.cache.occurred[e]===i||g.cache.occurred[e]!==!0)&&(g.verbose("Saving callback occurred",e),g.cache.occurred[e]=!0)},scroll:function(e){e=e+p.offset||S.scrollTop()+p.offset,g.cache.scroll=e},direction:function(){var e,t=g.get.scroll(),n=g.get.lastScroll();return e=t>n&&n?"down":n>t&&n?"up":"static",g.cache.direction=e,g.cache.direction},elementPosition:function(){var e=g.cache.element,t=g.get.screenSize();return g.verbose("Saving element position"),e.fits=e.height<t.height,e.offset=k.offset(),e.width=k.outerWidth(),e.height=k.outerHeight(),g.cache.element=e,e},elementCalculations:function(){var e=g.get.screenCalculations(),t=g.get.elementPosition();return p.includeMargin?(t.margin={},t.margin.top=parseInt(k.css("margin-top"),10),t.margin.bottom=parseInt(k.css("margin-bottom"),10),t.top=t.offset.top-t.margin.top,t.bottom=t.offset.top+t.height+t.margin.bottom):(t.top=t.offset.top,t.bottom=t.offset.top+t.height),t.topVisible=e.bottom>=t.top,t.topPassed=e.top>=t.top,t.bottomVisible=e.bottom>=t.bottom,t.bottomPassed=e.top>=t.bottom,t.pixelsPassed=0,t.percentagePassed=0,t.onScreen=t.topVisible&&!t.bottomPassed,t.passing=t.topPassed&&!t.bottomPassed,t.offScreen=!t.onScreen,t.passing&&(t.pixelsPassed=e.top-t.top,t.percentagePassed=(e.top-t.top)/t.height),g.cache.element=t,g.verbose("Updated element calculations",t),t},screenCalculations:function(){var e=g.get.scroll();return g.save.direction(),g.cache.screen.top=e,g.cache.screen.bottom=e+g.cache.screen.height,g.cache.screen},screenSize:function(){g.verbose("Saving window position"),g.cache.screen={height:S.height()}},position:function(){g.save.screenSize(),g.save.elementPosition()}},get:{pixelsPassed:function(e){var t=g.get.elementCalculations();return e.search("%")>-1?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return g.cache.occurred!==i?g.cache.occurred[e]||!1:!1},direction:function(){return g.cache.direction===i&&g.save.direction(),g.cache.direction},elementPosition:function(){return g.cache.element===i&&g.save.elementPosition(),g.cache.element},elementCalculations:function(){return g.cache.element===i&&g.save.elementCalculations(),g.cache.element},screenCalculations:function(){return g.cache.screen===i&&g.save.screenCalculations(),g.cache.screen},screenSize:function(){return g.cache.screen===i&&g.save.screenSize(),g.cache.screen},scroll:function(){return g.cache.scroll===i&&g.save.scroll(),g.cache.scroll},lastScroll:function(){return g.cache.screen===i?(g.debug("First scroll event, no last scroll could be found"),!1):g.cache.screen.top}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var t=p.name+":",n=0;c=!1,clearTimeout(g.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=T;return n=n||m,o=R||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(g.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(T===i&&g.initialize(),T.save.scroll(),T.save.calculations(),g.invoke(u)):(T!==i&&T.invoke("destroy"),g.initialize())}),a!==i?a:this},e.fn.visibility.settings={name:"Visibility",namespace:"visibility",debug:!1,verbose:!1,performance:!0,observeChanges:!0,initialCheck:!0,refreshOnLoad:!0,refreshOnResize:!0,checkOnRefresh:!0,once:!0,continuous:!1,offset:0,includeMargin:!1,context:t,throttle:!1,type:!1,transition:"fade in",duration:1e3,onPassed:{},onOnScreen:!1,onOffScreen:!1,onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,onUpdate:!1,onRefresh:function(){},metadata:{src:"src"},className:{fixed:"fixed",placeholder:"placeholder"},error:{method:"The method you called is not defined.",visible:"Element is hidden, you must call refresh after element becomes visible"}}}(jQuery,window,document);
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
//# sourceMappingURL=underscore-min.map
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







