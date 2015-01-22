// Name:        MicrosoftAjax.debug.js
// Assembly:    System.Web.Extensions
// Version:     3.5.0.0
// FileVersion: 3.5.21022.8
//!-----------------------------------------------------------------------
//! Copyright (C) Microsoft Corporation. All rights reserved.
//!-----------------------------------------------------------------------
//! MicrosoftAjax.js
//! Microsoft AJAX Framework.

// JavaScript Extensions and Type System

 
Function.__typeName = 'Function';
Function.__class = true;

Function.createCallback = function Function$createCallback(method, context) {
    /// <summary locid="M:J#Function.createCallback" />
    /// <param name="method" type="Function"></param>
    /// <param name="context" mayBeNull="true"></param>
    /// <returns type="Function"></returns>
    var e = Function._validateParams(arguments, [
        {name: "method", type: Function},
        {name: "context", mayBeNull: true}
    ]);
    if (e) throw e;

    // The method still makes sense for null context, but not if the context is omitted altogether
    // (omitted context makes the callback equivalent to the method itself, with one more level of indirection).

    return function() {
        var l = arguments.length;
        if (l > 0) {
            // arguments is not a real array, need to build a real one from it so we can add
            var args = [];
            for (var i = 0; i < l; i++) {
                args[i] = arguments[i];
            }
            args[l] = context;
            return method.apply(this, args);
        }
        return method.call(this, context);
    }
}

Function.createDelegate = function Function$createDelegate(instance, method) {
    /// <summary locid="M:J#Function.createDelegate" />
    /// <param name="instance" mayBeNull="true"></param>
    /// <param name="method" type="Function"></param>
    /// <returns type="Function"></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance", mayBeNull: true},
        {name: "method", type: Function}
    ]);
    if (e) throw e;

    // The method still makes some sense with a null instance, in the same way that createCallback still
    // makes sense with a null context.

    return function() {
        return method.apply(instance, arguments);
    }
}

Function.emptyFunction = Function.emptyMethod = function Function$emptyMethod() {
    /// <summary locid="M:J#Function.emptyMethod" />
    if (arguments.length !== 0) throw Error.parameterCount();
}

Function._validateParams = function Function$_validateParams(params, expectedParams) {
    // *DO NOT* triple-slash comment those. The double-slashes here are on purpose.
    // We don't need to document private functions and those will induce infinite loops
    // if the preprocessor generates validation code for these.
    // <summary>
    //     Validates the parameters to a method.
    // </summary>
    // <example>
    //     function foo(anyParam, stringParam, anyArrayParam, stringArrayParam,
    //                  interfaceParam, optionalStringParam) {
    //         #if DEBUG
    //         var e = Function._validateParams(arguments, [
    //             { name: "anyParam" },
    //             { name: "mayBeNullParam", mayBeNull: true },
    //             { name: "stringParam", type: String },
    //             { name: "floatParam", type: Number },
    //             { name: "intParam", type: Number, integer: true },
    //             { name: "domParam", domElement: true },
    //             { name: "anyArrayParam", type: Array },
    //             { name: "mayBeNullArrayParam", type: Array, elementMayBeNull: true },
    //             { name: "stringArrayParam", type: Array, elementType: String },
    //             { name: "intArrayParam", type: Array, elementType: Number, elementInteger: true },
    //             { name: "domElementArrayParam", type: Array, elementDomElement: true },
    //             { name: "interfaceParam", type: Sys.IFoo }
    //             { name: "optionalStringParam", type: String, optional: true }
    //             { name: "stringParamArray", type: String, parameterArray: true }
    //             { name: "mayBeNullParamArray", parameterArray: true, mayBeNull: true }
    //         ]);
    //         if (e) throw e;
    //         #endif
    //     }
    // </example>
    // <param name="params" type="Array">Array of parameter values passed to the method.</param>
    // <param name="expectedParams" type="Array" optional="true">Array of JSON objects describing the expected parameters.</param>

    var e;

    e = Function._validateParameterCount(params, expectedParams);
    if (e) {
        e.popStackFrame();
        return e;
    }

    for (var i=0; i < params.length; i++) {
        // If there are more params than expectedParams, then the last expectedParam
        // must be a paramArray.  Use the last expectedParam to validate the remaining
        // params.
        var expectedParam = expectedParams[Math.min(i, expectedParams.length - 1)];

        var paramName = expectedParam.name;
        if (expectedParam.parameterArray) {
            // Append index of parameter in parameterArray
            paramName += "[" + (i - expectedParams.length + 1) + "]";
        }

        e = Function._validateParameter(params[i], expectedParam, paramName);
        if (e) {
            e.popStackFrame();
            return e;
        }
    }


    return null;
}

Function._validateParameterCount = function Function$_validateParameterCount(params, expectedParams) {
    var maxParams = expectedParams.length;
    var minParams = 0;
    for (var i=0; i < expectedParams.length; i++) {
        if (expectedParams[i].parameterArray) {
            maxParams = Number.MAX_VALUE;
        }
        else if (!expectedParams[i].optional) {
            minParams++;
        }
    }

    if (params.length < minParams || params.length > maxParams) {
        var e = Error.parameterCount();
        e.popStackFrame();
        return e;
    }

    return null;
}

Function._validateParameter = function Function$_validateParameter(param, expectedParam, paramName) {
    var e;

    var expectedType = expectedParam.type;
    var expectedInteger = !!expectedParam.integer;
    var expectedDomElement = !!expectedParam.domElement;
    var mayBeNull = !!expectedParam.mayBeNull;

    e = Function._validateParameterType(param, expectedType, expectedInteger, expectedDomElement, mayBeNull, paramName);
    if (e) {
        e.popStackFrame();
        return e;
    }

    // If parameter is an array, and not undefined or null, validate the type of its elements
    var expectedElementType = expectedParam.elementType;
    var elementMayBeNull = !!expectedParam.elementMayBeNull;
    if (expectedType === Array && typeof(param) !== "undefined" && param !== null &&
        (expectedElementType || !elementMayBeNull)) {
        var expectedElementInteger = !!expectedParam.elementInteger;
        var expectedElementDomElement = !!expectedParam.elementDomElement;
        for (var i=0; i < param.length; i++) {
            var elem = param[i];
            e = Function._validateParameterType(elem, expectedElementType,
                expectedElementInteger, expectedElementDomElement, elementMayBeNull,
                paramName + "[" + i + "]");
            if (e) {
                e.popStackFrame();
                return e;
            }
        }
    }

    return null;
}

Function._validateParameterType = function Function$_validateParameterType(param, expectedType, expectedInteger, expectedDomElement, mayBeNull, paramName) {
    var e;

    if (typeof(param) === "undefined") {
        if (mayBeNull) {
            return null;
        }
        else {
            e = Error.argumentUndefined(paramName);
            e.popStackFrame();
            return e;
        }
    }

    if (param === null) {
        if (mayBeNull) {
            return null;
        }
        else {
            e = Error.argumentNull(paramName);
            e.popStackFrame();
            return e;
        }
    }

    if (expectedType && expectedType.__enum) {
        if (typeof(param) !== 'number') {
            e = Error.argumentType(paramName, Object.getType(param), expectedType);
            e.popStackFrame();
            return e;
        }
        if ((param % 1) === 0) {
            var values = expectedType.prototype;
            if (!expectedType.__flags || (param === 0)) {
                for (var i in values) {
                    if (values[i] === param) return null;
                }
            }
            else {
                var v = param;
                for (var i in values) {
                    var vali = values[i];
                    if (vali === 0) continue;
                    if ((vali & param) === vali) {
                        v -= vali;
                    }
                    if (v === 0) return null;
                }
            }
        }
        e = Error.argumentOutOfRange(paramName, param, String.format(Sys.Res.enumInvalidValue, param, expectedType.getName()));
        e.popStackFrame();
        return e;
    }

    // Using nodeType to check this is a DOM element for lack of a better test on IE and Safari.
    // This is not entirely foolproof ({nodeType: 1} would seem to be of type Sys.UI.DomElement)
    // but we need something that works cross-browser.
    // Opera and Firefox both have an HTMLElement type of which DOM elements are instances but
    // we're not using it here for consistency.
    // Text nodes are not considered elements.
    if (expectedDomElement) {
        var val;
        if (typeof(param.nodeType) !== 'number') {
            // Windows and documents are considered elements even though they are not strictly speaking.
            // No node type may still be window or document.
            // Try to get the document for the element, revert to param if not found:
            var doc = param.ownerDocument || param.document || param;
            if (doc != param) {
                // The parameter is not the document, but it may be window.
                // Try to get the window for the document:
                var w = doc.defaultView || doc.parentWindow;
                // On Safari 2, defaultView is not the same object as window but they have the same document.
                val = (w != param) && !(w.document && param.document && (w.document === param.document));
            }
            else {
                // doc is equal to param, but we still need to check that it's really a document.
                // Using the body property for lack of a better cross-browser test.
                val = (typeof(doc.body) === 'undefined');
            }
        }
        else {
            // Text nodes have a node type but are not considered DOM elements here.
            val = (param.nodeType === 3);
        }
        if (val) {
            e = Error.argument(paramName, Sys.Res.argumentDomElement);
            e.popStackFrame();
            return e;
        }
    }

    // If there is no expected type, any type is allowed.
    if (expectedType && !expectedType.isInstanceOfType(param)) {
        e = Error.argumentType(paramName, Object.getType(param), expectedType);
        e.popStackFrame();
        return e;
    }

    if (expectedType === Number && expectedInteger) {
        // Modulo operator is 5x faster than Math.round().
        // Modulo returns Number.NaN for Number.NaN, Number.POSITIVE_INFINITY, and Number.NEGATIVE_INFINITY.
        if ((param % 1) !== 0) {
            e = Error.argumentOutOfRange(paramName, param, Sys.Res.argumentInteger);
            e.popStackFrame();
            return e;
        }
    }

    return null;
}
 
Error.__typeName = 'Error';
Error.__class = true;

Error.create = function Error$create(message, errorInfo) {
    /// <summary locid="M:J#Error.create" />
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <param name="errorInfo" optional="true" mayBeNull="true"></param>
    /// <returns type="Error"></returns>
    var e = Function._validateParams(arguments, [
        {name: "message", type: String, mayBeNull: true, optional: true},
        {name: "errorInfo", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    // If message string can be converted to a number, IE sets e.message to the number, not the string.
    // Workaround this issue by explicitly setting e.message to the string.
    var e = new Error(message);
    e.message = message;

    if (errorInfo) {
        for (var v in errorInfo) {
            e[v] = errorInfo[v];
        }
    }

    e.popStackFrame();
    return e;
}

// The ArgumentException ctor in .NET has the message *before* paramName.  This
// is inconsistent with all the other Argument*Exception ctors in .NET.
// We feel the paramName is more important than the message, and we want all our
// argument errors to be consistent, so our Error.argument() takes the paramName
// before the message.  This is inconsistent with .NET, but overall we feel
// it is the better design.
Error.argument = function Error$argument(paramName, message) {
    /// <summary locid="M:J#Error.argument" />
    /// <param name="paramName" type="String" optional="true" mayBeNull="true"></param>
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "paramName", type: String, mayBeNull: true, optional: true},
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    var displayMessage = "Sys.ArgumentException: " + (message ? message : Sys.Res.argument);
    if (paramName) {
        displayMessage += "\n" + String.format(Sys.Res.paramName, paramName);
    }

    var e = Error.create(displayMessage, { name: "Sys.ArgumentException", paramName: paramName });
    e.popStackFrame();
    return e;
}

Error.argumentNull = function Error$argumentNull(paramName, message) {
    /// <summary locid="M:J#Error.argumentNull" />
    /// <param name="paramName" type="String" optional="true" mayBeNull="true"></param>
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "paramName", type: String, mayBeNull: true, optional: true},
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    var displayMessage = "Sys.ArgumentNullException: " + (message ? message : Sys.Res.argumentNull);
    if (paramName) {
        displayMessage += "\n" + String.format(Sys.Res.paramName, paramName);
    }

    var e = Error.create(displayMessage, { name: "Sys.ArgumentNullException", paramName: paramName });
    e.popStackFrame();
    return e;
}

Error.argumentOutOfRange = function Error$argumentOutOfRange(paramName, actualValue, message) {
    /// <summary locid="M:J#Error.argumentOutOfRange" />
    /// <param name="paramName" type="String" optional="true" mayBeNull="true"></param>
    /// <param name="actualValue" optional="true" mayBeNull="true"></param>
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "paramName", type: String, mayBeNull: true, optional: true},
        {name: "actualValue", mayBeNull: true, optional: true},
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    var displayMessage = "Sys.ArgumentOutOfRangeException: " + (message ? message : Sys.Res.argumentOutOfRange);
    if (paramName) {
        displayMessage += "\n" + String.format(Sys.Res.paramName, paramName);
    }

    // .NET implementation of ArgumentOutOfRangeException does not display actualValue if it is null.
    // For parity with .NET, we do not display if actualValue is null or undefined.  This is OK,
    // since more specific exceptions exist for null and undefined.
    if (typeof(actualValue) !== "undefined" && actualValue !== null) {
        displayMessage += "\n" + String.format(Sys.Res.actualValue, actualValue);
    }

    var e = Error.create(displayMessage, {
        name: "Sys.ArgumentOutOfRangeException",
        paramName: paramName,
        actualValue: actualValue
    });
    e.popStackFrame();
    return e;
}

Error.argumentType = function Error$argumentType(paramName, actualType, expectedType, message) {
    /// <summary locid="M:J#Error.argumentType" />
    /// <param name="paramName" type="String" optional="true" mayBeNull="true"></param>
    /// <param name="actualType" type="Type" optional="true" mayBeNull="true"></param>
    /// <param name="expectedType" type="Type" optional="true" mayBeNull="true"></param>
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "paramName", type: String, mayBeNull: true, optional: true},
        {name: "actualType", type: Type, mayBeNull: true, optional: true},
        {name: "expectedType", type: Type, mayBeNull: true, optional: true},
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    var displayMessage = "Sys.ArgumentTypeException: ";
    if (message) {
        displayMessage += message;
    }
    else if (actualType && expectedType) {
        displayMessage +=
            String.format(Sys.Res.argumentTypeWithTypes, actualType.getName(), expectedType.getName());
    }
    else {
        displayMessage += Sys.Res.argumentType;
    }

    if (paramName) {
        displayMessage += "\n" + String.format(Sys.Res.paramName, paramName);
    }

    var e = Error.create(displayMessage, {
        name: "Sys.ArgumentTypeException",
        paramName: paramName,
        actualType: actualType,
        expectedType: expectedType
    });
    e.popStackFrame();
    return e;
}

Error.argumentUndefined = function Error$argumentUndefined(paramName, message) {
    /// <summary locid="M:J#Error.argumentUndefined" />
    /// <param name="paramName" type="String" optional="true" mayBeNull="true"></param>
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "paramName", type: String, mayBeNull: true, optional: true},
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    var displayMessage = "Sys.ArgumentUndefinedException: " + (message ? message : Sys.Res.argumentUndefined);
    if (paramName) {
        displayMessage += "\n" + String.format(Sys.Res.paramName, paramName);
    }

    var e = Error.create(displayMessage, { name: "Sys.ArgumentUndefinedException", paramName: paramName });
    e.popStackFrame();
    return e;
}

Error.format = function Error$format(message) {
    /// <summary locid="M:J#Error.format" />
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    var displayMessage = "Sys.FormatException: " + (message ? message : Sys.Res.format);
    var e = Error.create(displayMessage, {name: 'Sys.FormatException'});
    e.popStackFrame();
    return e;
}

Error.invalidOperation = function Error$invalidOperation(message) {
    /// <summary locid="M:J#Error.invalidOperation" />
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    var displayMessage = "Sys.InvalidOperationException: " + (message ? message : Sys.Res.invalidOperation);

    var e = Error.create(displayMessage, {name: 'Sys.InvalidOperationException'});
    e.popStackFrame();
    return e;
}

Error.notImplemented = function Error$notImplemented(message) {
    /// <summary locid="M:J#Error.notImplemented" />
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    var displayMessage = "Sys.NotImplementedException: " + (message ? message : Sys.Res.notImplemented);

    var e = Error.create(displayMessage, {name: 'Sys.NotImplementedException'});
    e.popStackFrame();
    return e;
}

Error.parameterCount = function Error$parameterCount(message) {
    /// <summary locid="M:J#Error.parameterCount" />
    /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "message", type: String, mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    var displayMessage = "Sys.ParameterCountException: " + (message ? message : Sys.Res.parameterCount);
    var e = Error.create(displayMessage, {name: 'Sys.ParameterCountException'});
    e.popStackFrame();
    return e;
}

Error.prototype.popStackFrame = function Error$popStackFrame() {
    /// <summary locid="M:J#checkParam" />
    if (arguments.length !== 0) throw Error.parameterCount();

    // Example stack frame
    // ===================
    // Error("test error")@:0
    // createError()@http://localhost/app/Error.js:2
    // throwError()@http://localhost/app/Error.js:6
    // callThrowError()@http://localhost/app/Error.js:10
    // @http://localhost/app/Error:js:14

    if (typeof(this.stack) === "undefined" || this.stack === null ||
        typeof(this.fileName) === "undefined" || this.fileName === null ||
        typeof(this.lineNumber) === "undefined" || this.lineNumber === null) {
        return;
    }

    var stackFrames = this.stack.split("\n");

    // Find current stack frame.  It may not be the first stack frame, since the very
    // first frame when the Error is constructed does not correspond to any actual file
    // or line number.  See example stack frame above.
    var currentFrame = stackFrames[0];
    var pattern = this.fileName + ":" + this.lineNumber;
    while(typeof(currentFrame) !== "undefined" &&
          currentFrame !== null &&
          currentFrame.indexOf(pattern) === -1) {
        stackFrames.shift();
        currentFrame = stackFrames[0];
    }

    var nextFrame = stackFrames[1];

    // Special-case last stack frame, to stop shifting frames off the stack.
    if (typeof(nextFrame) === "undefined" || nextFrame === null) {
        return;
    }

    // Update fields to correspond with next stack frame
    var nextFrameParts = nextFrame.match(/@(.*):(\d+)$/);
    if (typeof(nextFrameParts) === "undefined" || nextFrameParts === null) {
        return;
    }

    this.fileName = nextFrameParts[1];

    // This should always succeed, since the regex matches "\d+"
    this.lineNumber = parseInt(nextFrameParts[2]);

    stackFrames.shift();
    this.stack = stackFrames.join("\n");
}
 
Object.__typeName = 'Object';
Object.__class = true;

Object.getType = function Object$getType(instance) {
    /// <summary locid="M:J#Object.getType" />
    /// <param name="instance"></param>
    /// <returns type="Type"></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance"}
    ]);
    if (e) throw e;
    var ctor = instance.constructor;
    if (!ctor || (typeof(ctor) !== "function") || !ctor.__typeName || (ctor.__typeName === 'Object')) {
        return Object;
    }
    return ctor;
}

Object.getTypeName = function Object$getTypeName(instance) {
    /// <summary locid="M:J#Object.getTypeName" />
    /// <param name="instance"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance"}
    ]);
    if (e) throw e;
    return Object.getType(instance).getName();
}
 
String.__typeName = 'String';
String.__class = true;

String.prototype.endsWith = function String$endsWith(suffix) {
    /// <summary locid="M:J#String.endsWith" />
    /// <param name="suffix" type="String"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "suffix", type: String}
    ]);
    if (e) throw e;
    return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.startsWith = function String$startsWith(prefix) {
    /// <summary locid="M:J#String.startsWith" />
    /// <param name="prefix" type="String"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "prefix", type: String}
    ]);
    if (e) throw e;
    return (this.substr(0, prefix.length) === prefix);
}

String.prototype.trim = function String$trim() {
    /// <summary locid="M:J#String.trim" />
    /// <returns type="String"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    return this.replace(/^\s+|\s+$/g, '');
}

String.prototype.trimEnd = function String$trimEnd() {
    /// <summary locid="M:J#String.trimEnd" />
    /// <returns type="String"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    return this.replace(/\s+$/, '');
}

String.prototype.trimStart = function String$trimStart() {
    /// <summary locid="M:J#String.trimStart" />
    /// <returns type="String"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    return this.replace(/^\s+/, '');
}

String.format = function String$format(format, args) {
    /// <summary locid="M:J#String.format" />
    /// <param name="format" type="String"></param>
    /// <param name="args" parameterArray="true" mayBeNull="true"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "format", type: String},
        {name: "args", mayBeNull: true, parameterArray: true}
    ]);
    if (e) throw e;
    return String._toFormattedString(false, arguments);
}

String.localeFormat = function String$localeFormat(format, args) {
    /// <summary locid="M:J#String.localeFormat" />
    /// <param name="format" type="String"></param>
    /// <param name="args" parameterArray="true" mayBeNull="true"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "format", type: String},
        {name: "args", mayBeNull: true, parameterArray: true}
    ]);
    if (e) throw e;
    return String._toFormattedString(true, arguments);
}

String._toFormattedString = function String$_toFormattedString(useLocale, args) {
    var result = '';
    var format = args[0];

    for (var i=0;;) {
        // Find the next opening or closing brace
        var open = format.indexOf('{', i);
        var close = format.indexOf('}', i);
        if ((open < 0) && (close < 0)) {
            // Not found: copy the end of the string and break
            result += format.slice(i);
            break;
        }
        if ((close > 0) && ((close < open) || (open < 0))) {
            // Closing brace before opening is an error
            if (format.charAt(close + 1) !== '}') {
                throw Error.argument('format', Sys.Res.stringFormatBraceMismatch);
            }
            result += format.slice(i, close + 1);
            i = close + 2;
            continue;
        }

        // Copy the string before the brace
        result += format.slice(i, open);
        i = open + 1;

        // Check for double braces (which display as one and are not arguments)
        if (format.charAt(i) === '{') {
            result += '{';
            i++;
            continue;
        }

        // at this point we have a valid opening brace, which should be matched by a closing brace.
        if (close < 0) throw Error.argument('format', Sys.Res.stringFormatBraceMismatch);

        // Find the closing brace

        // Get the string between the braces, and split it around the ':' (if any)
        var brace = format.substring(i, close);
        var colonIndex = brace.indexOf(':');
        var argNumber = parseInt((colonIndex < 0)? brace : brace.substring(0, colonIndex), 10) + 1;
        if (isNaN(argNumber)) throw Error.argument('format', Sys.Res.stringFormatInvalid);
        var argFormat = (colonIndex < 0)? '' : brace.substring(colonIndex + 1);

        var arg = args[argNumber];
        if (typeof(arg) === "undefined" || arg === null) {
            arg = '';
        }

        // If it has a toFormattedString method, call it.  Otherwise, call toString()
        if (arg.toFormattedString) {
            result += arg.toFormattedString(argFormat);
        }
        else if (useLocale && arg.localeFormat) {
            result += arg.localeFormat(argFormat);
        }
        else if (arg.format) {
            result += arg.format(argFormat);
        }
        else
            result += arg.toString();

        i = close + 1;
    }

    return result;
}
 
Boolean.__typeName = 'Boolean';
Boolean.__class = true;

Boolean.parse = function Boolean$parse(value) {
    /// <summary locid="M:J#Boolean.parse" />
    /// <param name="value" type="String"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String}
    ]);
    if (e) throw e;
    var v = value.trim().toLowerCase();
    if (v === 'false') return false;
    if (v === 'true') return true;
    throw Error.argumentOutOfRange('value', value, Sys.Res.boolTrueOrFalse);
}
 
Date.__typeName = 'Date';
Date.__class = true;

Date._appendPreOrPostMatch = function Date$_appendPreOrPostMatch(preMatch, strBuilder) {
    // appends pre- and post- token match strings while removing escaped characters.
    // Returns a single quote count which is used to determine if the token occurs
    // in a string literal.
    var quoteCount = 0;
    var escaped = false;
    for (var i = 0, il = preMatch.length; i < il; i++) {
        var c = preMatch.charAt(i);
        switch (c) {
        case '\'':
            if (escaped) strBuilder.append("'");
            else quoteCount++;
            escaped = false;
            break;
        case '\\':
            if (escaped) strBuilder.append("\\");
            escaped = !escaped;
            break;
        default:
            strBuilder.append(c);
            escaped = false;
            break;
        }
    }
    return quoteCount;
}

Date._expandFormat = function Date$_expandFormat(dtf, format) {
    // expands unspecified or single character date formats into the full pattern.
    if (!format) {
        format = "F";
    }
    if (format.length === 1) {
        switch (format) {
        case "d":
            return dtf.ShortDatePattern;
        case "D":
            return dtf.LongDatePattern;
        case "t":
            return dtf.ShortTimePattern;
        case "T":
            return dtf.LongTimePattern;
        case "F":
            return dtf.FullDateTimePattern;
        case "M": case "m":
            return dtf.MonthDayPattern;
        case "s":
            return dtf.SortableDateTimePattern;
        case "Y": case "y":
            return dtf.YearMonthPattern;
        default:
            throw Error.format(Sys.Res.formatInvalidString);
        }
    }
    return format;
}

Date._expandYear = function Date$_expandYear(dtf, year) {
    // expands 2-digit year into 4 digits.
    if (year < 100) {
        var curr = new Date().getFullYear();
        year += curr - (curr % 100);
        if (year > dtf.Calendar.TwoDigitYearMax) {
            return year - 100;
        }
    }
    return year;
}

Date._getParseRegExp = function Date$_getParseRegExp(dtf, format) {
    // converts a format string into a regular expression with groups that
    // can be used to extract date fields from a date string.
    // check for a cached parse regex.
    if (!dtf._parseRegExp) {
        dtf._parseRegExp = {};
    }
    else if (dtf._parseRegExp[format]) {
        return dtf._parseRegExp[format];
    }

    // expand single digit formats, then escape regular expression characters.
    var expFormat = Date._expandFormat(dtf, format);
    expFormat = expFormat.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1");

    var regexp = new Sys.StringBuilder("^");
    var groups = [];
    var index = 0;
    var quoteCount = 0;
    var tokenRegExp = Date._getTokenRegExp();
    var match;

    // iterate through each date token found.
    while ((match = tokenRegExp.exec(expFormat)) !== null) {
        var preMatch = expFormat.slice(index, match.index);
        index = tokenRegExp.lastIndex;

        // don't replace any matches that occur inside a string literal.
        quoteCount += Date._appendPreOrPostMatch(preMatch, regexp);
        if ((quoteCount%2) === 1) {
            regexp.append(match[0]);
            continue;
        }

        // add a regex group for the token.
        switch (match[0]) {
            case 'dddd': case 'ddd':
            case 'MMMM': case 'MMM':
                regexp.append("(\\D+)");
                break;
            case 'tt': case 't':
                regexp.append("(\\D*)");
                break;
            case 'yyyy':
                regexp.append("(\\d{4})");
                break;
            case 'fff':
                regexp.append("(\\d{3})");
                break;
            case 'ff':
                regexp.append("(\\d{2})");
                break;
            case 'f':
                regexp.append("(\\d)");
                break;
            case 'dd': case 'd':
            case 'MM': case 'M':
            case 'yy': case 'y':
            case 'HH': case 'H':
            case 'hh': case 'h':
            case 'mm': case 'm':
            case 'ss': case 's':
                regexp.append("(\\d\\d?)");
                break;
            case 'zzz':
                regexp.append("([+-]?\\d\\d?:\\d{2})");
                break;
            case 'zz': case 'z':
                regexp.append("([+-]?\\d\\d?)");
                break;
        }
        Array.add(groups, match[0]);
    }
    Date._appendPreOrPostMatch(expFormat.slice(index), regexp);
    regexp.append("$");
    // allow whitespace to differ when matching formats.
    var regexpStr = regexp.toString().replace(/\s+/g, "\\s+");
    var parseRegExp = {'regExp': regexpStr, 'groups': groups};
    // cache the regex for this format.
    dtf._parseRegExp[format] = parseRegExp;
    return parseRegExp;
}

Date._getTokenRegExp = function Date$_getTokenRegExp() {
    // regular expression for matching dateTime tokens in format strings.
    return /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;
}

Date.parseLocale = function Date$parseLocale(value, formats) {
    /// <summary locid="M:J#Date.parseLocale" />
    /// <param name="value" type="String"></param>
    /// <param name="formats" parameterArray="true" optional="true" mayBeNull="true"></param>
    /// <returns type="Date"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String},
        {name: "formats", mayBeNull: true, optional: true, parameterArray: true}
    ]);
    if (e) throw e;
    return Date._parse(value, Sys.CultureInfo.CurrentCulture, arguments);
}

Date.parseInvariant = function Date$parseInvariant(value, formats) {
    /// <summary locid="M:J#Date.parseInvariant" />
    /// <param name="value" type="String"></param>
    /// <param name="formats" parameterArray="true" optional="true" mayBeNull="true"></param>
    /// <returns type="Date"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String},
        {name: "formats", mayBeNull: true, optional: true, parameterArray: true}
    ]);
    if (e) throw e;
    return Date._parse(value, Sys.CultureInfo.InvariantCulture, arguments);
}

Date._parse = function Date$_parse(value, cultureInfo, args) {
    // args is a params array with value as the first item, followed by custom formats.
    // try parse with custom formats.
    var custom = false;
    for (var i = 1, il = args.length; i < il; i++) {
        var format = args[i];
        if (format) {
            custom = true;
            var date = Date._parseExact(value, format, cultureInfo);
            if (date) return date;
        }
    }
    // try parse with culture formats.
    if (! custom) {
        var formats = cultureInfo._getDateTimeFormats();
        for (var i = 0, il = formats.length; i < il; i++) {
            var date = Date._parseExact(value, formats[i], cultureInfo);
            if (date) return date;
        }
    }
    return null;
}

Date._parseExact = function Date$_parseExact(value, format, cultureInfo) {
    // try to parse the date string value by matching against the format string
    // while using the specified culture for date field names.
    value = value.trim();
    var dtf = cultureInfo.dateTimeFormat;

    // convert date formats into regular expressions with groupings.
    // use the regexp to determine the input format and extract the date fields.
    var parseInfo = Date._getParseRegExp(dtf, format);
    var match = new RegExp(parseInfo.regExp).exec(value);
    // DevDiv 124696: Return null to avoid Firefox warning "does not always return a value"
    if (match === null) return null;
    
    // found a date format that matches the input.
    var groups = parseInfo.groups;
    var year = null, month = null, date = null, weekDay = null;
    var hour = 0, min = 0, sec = 0, msec = 0, tzMinOffset = null;
    var pmHour = false;
    // iterate the format groups to extract and set the date fields.
    for (var j = 0, jl = groups.length; j < jl; j++) {
        var matchGroup = match[j+1];
        if (matchGroup) {
            switch (groups[j]) {
                case 'dd': case 'd':
                    // Day of month.
                    date = parseInt(matchGroup, 10);
                    // check that date is generally in valid range, also checking overflow below.
                    if ((date < 1) || (date > 31)) return null;
                    break;
                case 'MMMM':
                    // Month, long name.
                    month = cultureInfo._getMonthIndex(matchGroup);
                    if ((month < 0) || (month > 11)) return null;
                    break;
                case 'MMM':
                    // Month, short name.
                    month = cultureInfo._getAbbrMonthIndex(matchGroup);
                    if ((month < 0) || (month > 11)) return null;
                    break;
                case 'M': case 'MM':
                    // Month.
                    var month = parseInt(matchGroup, 10) - 1;
                    if ((month < 0) || (month > 11)) return null;
                    break;
                case 'y': case 'yy':
                    // 2-Digit Year.
                    year = Date._expandYear(dtf,parseInt(matchGroup, 10));
                    if ((year < 0) || (year > 9999)) return null;
                    break;
                case 'yyyy':
                    // 4-Digit Year.
                    year = parseInt(matchGroup, 10);
                    if ((year < 0) || (year > 9999)) return null;
                    break;
                case 'h': case 'hh':
                    // Hours (12-hour clock).
                    hour = parseInt(matchGroup, 10);
                    if (hour === 12) hour = 0;
                    if ((hour < 0) || (hour > 11)) return null;
                    break;
                case 'H': case 'HH':
                    // Hours (24-hour clock).
                    hour = parseInt(matchGroup, 10);
                    if ((hour < 0) || (hour > 23)) return null;
                    break;
                case 'm': case 'mm':
                    // Minutes.
                    min = parseInt(matchGroup, 10);
                    if ((min < 0) || (min > 59)) return null;
                    break;
                case 's': case 'ss':
                    // Seconds.
                    sec = parseInt(matchGroup, 10);
                    if ((sec < 0) || (sec > 59)) return null;
                    break;
                case 'tt': case 't':
                    // AM/PM designator.
                    var upperToken = matchGroup.toUpperCase();
                    pmHour = (upperToken === dtf.PMDesignator.toUpperCase());
                    if (!pmHour && (upperToken !== dtf.AMDesignator.toUpperCase())) return null;
                    break;
                case 'f':
                    // Deciseconds.
                    msec = parseInt(matchGroup, 10) * 100;
                    if ((msec < 0) || (msec > 999)) return null;
                    break;
                case 'ff':
                    // Centiseconds.
                    msec = parseInt(matchGroup, 10) * 10;
                    if ((msec < 0) || (msec > 999)) return null;
                    break;
                case 'fff':
                    // Milliseconds.
                    msec = parseInt(matchGroup, 10);
                    if ((msec < 0) || (msec > 999)) return null;
                    break;
                case 'dddd':
                    // Day of week.
                    weekDay = cultureInfo._getDayIndex(matchGroup);
                    if ((weekDay < 0) || (weekDay > 6)) return null;
                    break;
                case 'ddd':
                    // Day of week.
                    weekDay = cultureInfo._getAbbrDayIndex(matchGroup);
                    if ((weekDay < 0) || (weekDay > 6)) return null;
                    break;
                case 'zzz':
                    // Time zone offset in +/- hours:min.
                    var offsets = matchGroup.split(/:/);
                    if (offsets.length !== 2) return null;
                    var hourOffset = parseInt(offsets[0], 10);
                    if ((hourOffset < -12) || (hourOffset > 13)) return null;
                    var minOffset = parseInt(offsets[1], 10);
                    if ((minOffset < 0) || (minOffset > 59)) return null;
                    tzMinOffset = (hourOffset * 60) + (matchGroup.startsWith('-')? -minOffset : minOffset);
                    break;
                case 'z': case 'zz':
                    // Time zone offset in +/- hours.
                    var hourOffset = parseInt(matchGroup, 10);
                    if ((hourOffset < -12) || (hourOffset > 13)) return null;
                    tzMinOffset = hourOffset * 60;
                    break;
            }
        }
    }
    var result = new Date();
    if (year === null) {
        year = result.getFullYear();
    }
    if (month === null) {
        month = result.getMonth();
    }
    if (date === null) {
        date = result.getDate();
    }
    // have to set year, month and date together to avoid overflow based on current date.
    result.setFullYear(year, month, date);
    // check to see if date overflowed for specified month (only checked 1-31 above).
    if (result.getDate() !== date) return null;
    // invalid day of week.
    if ((weekDay !== null) && (result.getDay() !== weekDay)) {
        return null;
    }
    // if pm designator token was found make sure the hours fit the 24-hour clock.
    if (pmHour && (hour < 12)) {
        hour += 12;
    }
    result.setHours(hour, min, sec, msec);
    if (tzMinOffset !== null) {
        // adjust timezone to utc before applying local offset.
        var adjustedMin = result.getMinutes() - (tzMinOffset + result.getTimezoneOffset());
        // Safari limits hours and minutes to the range of -127 to 127.  We need to use setHours
        // to ensure both these fields will not exceed this range.  adjustedMin will range
        // somewhere between -1440 and 1500, so we only need to split this into hours.
        result.setHours(result.getHours() + parseInt(adjustedMin/60, 10), adjustedMin%60);
    }
    return result;
}

Date.prototype.format = function Date$format(format) {
    /// <summary locid="M:J#Date.format" />
    /// <param name="format" type="String"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "format", type: String}
    ]);
    if (e) throw e;
    return this._toFormattedString(format, Sys.CultureInfo.InvariantCulture);
}

Date.prototype.localeFormat = function Date$localeFormat(format) {
    /// <summary locid="M:J#Date.localeFormat" />
    /// <param name="format" type="String"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "format", type: String}
    ]);
    if (e) throw e;
    return this._toFormattedString(format, Sys.CultureInfo.CurrentCulture);
}

Date.prototype._toFormattedString = function Date$_toFormattedString(format, cultureInfo) {
    if (!format || (format.length === 0) || (format === 'i')) {
        if (cultureInfo && (cultureInfo.name.length > 0)) {
            return this.toLocaleString();
        }
        else {
            return this.toString();
        }
    }

    var dtf = cultureInfo.dateTimeFormat;
    format = Date._expandFormat(dtf, format);

    // Start with an empty string
    var ret = new Sys.StringBuilder();
    var hour;

    function addLeadingZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num.toString();
    }

    function addLeadingZeros(num) {
        if (num < 10) {
            return '00' + num;
        }
        if (num < 100) {
            return '0' + num;
        }
        return num.toString();
    }

    var quoteCount = 0;
    var tokenRegExp = Date._getTokenRegExp();
    for (;;) {

        // Save the current index
        var index = tokenRegExp.lastIndex;

        // Look for the next pattern
        var ar = tokenRegExp.exec(format);

        // Append the text before the pattern (or the end of the string if not found)
        var preMatch = format.slice(index, ar ? ar.index : format.length);
        quoteCount += Date._appendPreOrPostMatch(preMatch, ret);

        if (!ar) break;

        // do not replace any matches that occur inside a string literal.
        if ((quoteCount%2) === 1) {
            ret.append(ar[0]);
            continue;
        }

        switch (ar[0]) {
        case "dddd":
            // Day of the week, using the full name
            ret.append(dtf.DayNames[this.getDay()]);
            break;
        case "ddd":
            //Day of the week, as a three-letter abbreviation
            ret.append(dtf.AbbreviatedDayNames[this.getDay()]);
            break;
        case "dd":
            // Day of month, with leading zero for single-digit days
            ret.append(addLeadingZero(this.getDate()));
            break;
        case "d":
            // Day of month, without leading zero for single-digit days
            ret.append(this.getDate());
            break;
        case "MMMM":
            // Month, using the full name
            ret.append(dtf.MonthNames[this.getMonth()]);
            break;
        case "MMM":
            // Month, as a three-letter abbreviation
            ret.append(dtf.AbbreviatedMonthNames[this.getMonth()]);
            break;
        case "MM":
            // Month, as digits, with leading zero for single-digit months
            ret.append(addLeadingZero(this.getMonth() + 1));
            break;
        case "M":
            // Month, as digits, with no leading zero for single-digit months
            ret.append(this.getMonth() + 1);
            break;
        case "yyyy":
            // Year represented by four full digits
            ret.append(this.getFullYear());
            break;
        case "yy":
            // Year, as two digits, with leading zero for years less than 10
            ret.append(addLeadingZero(this.getFullYear() % 100));
            break;
        case "y":
            // Year, as two digits, but with no leading zero for years less than 10
            ret.append(this.getFullYear() % 100);
            break;
        case "hh":
            // Hours with leading zero for single-digit hours, using 12-hour clock
            hour = this.getHours() % 12;
            if (hour === 0) hour = 12;
            ret.append(addLeadingZero(hour));
            break;
        case "h":
            // Hours with no leading zero for single-digit hours, using 12-hour clock
            hour = this.getHours() % 12;
            if (hour === 0) hour = 12;
            ret.append(hour);
            break;
        case "HH":
            // Hours with leading zero for single-digit hours, using 24-hour clock
            ret.append(addLeadingZero(this.getHours()));
            break;
        case "H":
            // Hours with no leading zero for single-digit hours, using 24-hour clock
            ret.append(this.getHours());
            break;
        case "mm":
            // Minutes with leading zero  for single-digit minutes
            ret.append(addLeadingZero(this.getMinutes()));
            break;
        case "m":
            // Minutes with no leading zero  for single-digit minutes
            ret.append(this.getMinutes());
            break;
        case "ss":
            // Seconds with leading zero for single-digit seconds
            ret.append(addLeadingZero(this.getSeconds()));
            break;
        case "s":
            // Seconds with no leading zero for single-digit seconds
            ret.append(this.getSeconds());
            break;
        case "tt":
            // Multicharacter am/pm indicator
            ret.append((this.getHours() < 12) ? dtf.AMDesignator : dtf.PMDesignator);
            break;
        case "t":
            // One character am/pm indicator ("a" or "p")
            ret.append(((this.getHours() < 12) ? dtf.AMDesignator : dtf.PMDesignator).charAt(0));
            break;
        case "f":
            // Deciseconds
            ret.append(addLeadingZeros(this.getMilliseconds()).charAt(0));
            break;
        case "ff":
            // Centiseconds
            ret.append(addLeadingZeros(this.getMilliseconds()).substr(0, 2));
            break;
        case "fff":
            // Milliseconds
            ret.append(addLeadingZeros(this.getMilliseconds()));
            break;
        case "z":
            // Time zone offset, no leading zero
            hour = this.getTimezoneOffset() / 60;
            ret.append(((hour <= 0) ? '+' : '-') + Math.floor(Math.abs(hour)));
            break;
        case "zz":
            // Time zone offset with leading zero
            hour = this.getTimezoneOffset() / 60;
            ret.append(((hour <= 0) ? '+' : '-') + addLeadingZero(Math.floor(Math.abs(hour))));
            break;
        case "zzz":
            // Time zone offset with leading zero
            hour = this.getTimezoneOffset() / 60;
            ret.append(((hour <= 0) ? '+' : '-') + addLeadingZero(Math.floor(Math.abs(hour))) +
                dtf.TimeSeparator + addLeadingZero(Math.abs(this.getTimezoneOffset() % 60)));
            break;
        }
    }
    return ret.toString();
}
 
Number.__typeName = 'Number';
Number.__class = true;

Number.parseLocale = function Number$parseLocale(value) {
    /// <summary locid="M:J#Number.parseLocale" />
    /// <param name="value" type="String"></param>
    /// <returns type="Number"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String}
    ]);
    if (e) throw e;
    return Number._parse(value, Sys.CultureInfo.CurrentCulture);
}
Number.parseInvariant = function Number$parseInvariant(value) {
    /// <summary locid="M:J#Number.parseInvariant" />
    /// <param name="value" type="String"></param>
    /// <returns type="Number"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String}
    ]);
    if (e) throw e;
    return Number._parse(value, Sys.CultureInfo.InvariantCulture);
}
Number._parse = function Number$_parse(value, cultureInfo) {
    // <param name="value" type="String">A string that can parse to a number.</param>
    // <param name="cultureInfo" type="Sys.CultureInfo">Culture information.</param>
    // <returns type="Number">Parsed number or Number.NaN if parsing failed.</returns>
    value = value.trim();
    
    // allow infinity or hexidecimal for javascript compatability.
    if (value.match(/^[+-]?infinity$/i)) {
        return parseFloat(value);
    }
    if (value.match(/^0x[a-f0-9]+$/i)) {
        return parseInt(value);
    }

    var numFormat = cultureInfo.numberFormat;
    var signInfo = Number._parseNumberNegativePattern(value, numFormat, numFormat.NumberNegativePattern);
    var sign = signInfo[0];
    var num = signInfo[1];
    
    // support leading sign without space in addition to culture negative format for .NET compatability
    if ((sign === '') && (numFormat.NumberNegativePattern !== 1)) {
        signInfo = Number._parseNumberNegativePattern(value, numFormat, 1);
        sign = signInfo[0];
        num = signInfo[1];
    }
    if (sign === '') sign = '+';
    
    var exponent;
    var intAndFraction;
    var exponentPos = num.indexOf('e');
    if (exponentPos < 0) exponentPos = num.indexOf('E');
    if (exponentPos < 0) {
        intAndFraction = num;
        exponent = null;
    }
    else {
        intAndFraction = num.substr(0, exponentPos);
        exponent = num.substr(exponentPos + 1);
    }
    
    var integer;
    var fraction;
    var decimalPos = intAndFraction.indexOf(numFormat.NumberDecimalSeparator);
    if (decimalPos < 0) {
        integer = intAndFraction;
        fraction = null;
    }
    else {
        integer = intAndFraction.substr(0, decimalPos);
        fraction = intAndFraction.substr(decimalPos + numFormat.NumberDecimalSeparator.length);
    }
    
    // strip group separators from the integer portion
    integer = integer.split(numFormat.NumberGroupSeparator).join('');
    
    var p = sign + integer;
    if (fraction !== null) {
        p += '.' + fraction;
    }
    if (exponent !== null) {
        var expSignInfo = Number._parseNumberNegativePattern(exponent, numFormat, 1);
        if (expSignInfo[0] === '') {
            expSignInfo[0] = '+';
        }
        p += 'e' + expSignInfo[0] + expSignInfo[1];
    }

    // don't allow multiple decimals separators, group separators after decimal or trailing strings.
    if (p.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/)) {
        return parseFloat(p);
    }
    return Number.NaN;
}
Number._parseNumberNegativePattern = function Number$_parseNumberNegativePattern(value, numFormat, numberNegativePattern) {
    // <summary>
    //     Extracts the sign and number from a numeric input string using the culture-specific number format
    //     information and number negative pattern.
    // </summary>
    // <param name="value" type="String">Numerical string value.</param>
    // <param name="numFormat" type="Object">Culture-specific number formatting information.</param>
    // <param name="numberNegativePattern" type="Number">Culture-specific specifier for the negative number format.
    // </param>
    // <returns type="Array">Sign and number for the input value.  The sign is the invariant symbol or an empty
    //     string if the number was unsigned.
    // </returns>
    var neg = numFormat.NegativeSign;
    var pos = numFormat.PositiveSign;    
    switch (numberNegativePattern) {
        case 4: // trailing sign with space
            neg = ' ' + neg;
            pos = ' ' + pos;
        case 3: // trailing sign no space
            if (value.endsWith(neg)) {
                return ['-', value.substr(0, value.length - neg.length)];
            }
            else if (value.endsWith(pos)) {
                return ['+', value.substr(0, value.length - pos.length)];
            }
            break;
        case 2: // leading sign with space
            neg += ' ';
            pos += ' ';
        case 1: // leading sign no space
            if (value.startsWith(neg)) {
                return ['-', value.substr(neg.length)];
            }
            else if (value.startsWith(pos)) {
                return ['+', value.substr(pos.length)];
            }
            break;
        case 0: // parenthesis
            if (value.startsWith('(') && value.endsWith(')')) {
                return ['-', value.substr(1, value.length - 2)];
            }
            break;
    }
    return ['', value];
}

Number.prototype.format = function Number$format(format) {
    /// <summary locid="M:J#Number.format" />
    /// <param name="format" type="String"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "format", type: String}
    ]);
    if (e) throw e;
    return this._toFormattedString(format, Sys.CultureInfo.InvariantCulture);
}
Number.prototype.localeFormat = function Number$localeFormat(format) {
    /// <summary locid="M:J#Number.localeFormat" />
    /// <param name="format" type="String"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "format", type: String}
    ]);
    if (e) throw e;
    return this._toFormattedString(format, Sys.CultureInfo.CurrentCulture);
}
Number.prototype._toFormattedString = function Number$_toFormattedString(format, cultureInfo) {
    if (!format || (format.length === 0) || (format === 'i')) {
        if (cultureInfo && (cultureInfo.name.length > 0)) {
            return this.toLocaleString();
        }
        else {
            return this.toString();
        }
    }

    // All the enum patterns for the various NumberFormats
    var _percentPositivePattern = ["n %", "n%", "%n" ];
    var _percentNegativePattern = ["-n %", "-n%", "-%n"];
    var _numberNegativePattern = ["(n)","-n","- n","n-","n -"];
    var _currencyPositivePattern = ["$n","n$","$ n","n $"];
    var _currencyNegativePattern = ["($n)","-$n","$-n","$n-","(n$)","-n$","n-$","n$-","-n $","-$ n","n $-","$ n-","$ -n","n- $","($ n)","(n $)"];

    // Handles expanding numbers into some specified grouping i.e. [2, 3, 5] would be ...,XXXXX,XXXXX,XXX,XX,
    function expandNumber(number, precision, groupSizes, sep, decimalChar) {
        
        var curSize = groupSizes[0];
        var curGroupIndex = 1;

        // Make the number a string
        var numberString = number.toString();
        var right = "";
        var exponent = "";
        // Split: left is integer, right is decimal and exponent.
        var decimalSplit = numberString.split('.');
        if (decimalSplit.length > 1) {
            numberString = decimalSplit[0];
            right = decimalSplit[1];
            // Split: left is decimal, right is exponent.
            var exponentSplit = right.split(/e/i);
            if (exponentSplit.length > 1) {
                right = exponentSplit[0];
                exponent = "e" + exponentSplit[1];
            }
        }

        // now check precision, if its 0, drop right, otherwise reassemble it
        if (precision > 0) {
            // trim right down to precision size
            var rightDifference = right.length - precision;
            if (rightDifference > 0) {
                right = right.slice(0, precision);
            } else if (rightDifference < 0) {
                for (var i=0; i<Math.abs(rightDifference); i++) {
                    right += '0';
                }
            }

            // finally add the separator
            right = decimalChar + right;
        }
        else { // No precision wanted, so drop the right
            right = "";
        }
        right += exponent;

        var stringIndex = numberString.length-1;
        var ret = "";
        while (stringIndex >= 0) {

            // group size of 0 or larger than the rest of the string means take the rest of the string
            if (curSize === 0 || curSize > stringIndex) {
                if (ret.length > 0)
                    return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                else
                    return numberString.slice(0, stringIndex + 1) + right;
            }

            if (ret.length > 0)
                ret = numberString.slice(stringIndex - curSize + 1, stringIndex+1) + sep + ret;
            else
                ret = numberString.slice(stringIndex - curSize + 1, stringIndex+1);

            stringIndex -= curSize;

            if (curGroupIndex < groupSizes.length) {
                curSize = groupSizes[curGroupIndex];
                curGroupIndex++;
            }
        }
        return numberString.slice(0, stringIndex + 1) + sep + ret + right;
    }
    var nf = cultureInfo.numberFormat;

    // Number is always positive for printing purposes (negative treated separately)
    var number = Math.abs(this);

    // Default to number format
    if (!format)
        format = "D";

    var precision = -1;
    if (format.length > 1) precision = parseInt(format.slice(1), 10);

    var pattern;
    switch (format.charAt(0)) {
    case "d":
    case "D":
        pattern = 'n';

        // precision for decimal is padding
        if (precision !== -1) {
            var numberStr = ""+number;
            var zerosToAdd = precision - numberStr.length;
            if (zerosToAdd > 0) {
                for (var i=0; i<zerosToAdd; i++) {
                    numberStr = '0'+numberStr;
                }
            }
            number = numberStr;
        }

        // We do want the negative for this scenario only
        if (this < 0) number = -number;
        break;
    case "c":
    case "C":
        if (this < 0) pattern = _currencyNegativePattern[nf.CurrencyNegativePattern];
        else pattern = _currencyPositivePattern[nf.CurrencyPositivePattern];
        if (precision === -1) precision = nf.CurrencyDecimalDigits;
        number = expandNumber(Math.abs(this), precision, nf.CurrencyGroupSizes, nf.CurrencyGroupSeparator, nf.CurrencyDecimalSeparator);
        break;
    case "n":
    case "N":
        if (this < 0) pattern = _numberNegativePattern[nf.NumberNegativePattern];
        else pattern = 'n';
        if (precision === -1) precision = nf.NumberDecimalDigits;
        number = expandNumber(Math.abs(this), precision, nf.NumberGroupSizes, nf.NumberGroupSeparator, nf.NumberDecimalSeparator);
        break;
    case "p":
    case "P":
        if (this < 0) pattern = _percentNegativePattern[nf.PercentNegativePattern];
        else pattern = _percentPositivePattern[nf.PercentPositivePattern];
        if (precision === -1) precision = nf.PercentDecimalDigits;
        number = expandNumber(Math.abs(this), precision, nf.PercentGroupSizes, nf.PercentGroupSeparator, nf.PercentDecimalSeparator);
        break;
    default:
        throw Error.format(Sys.Res.formatBadFormatSpecifier);
    }

    var regex = /n|\$|-|%/g;

    // Start with an empty string
    var ret = "";

    for (;;) {

        // Save the current index
        var index = regex.lastIndex;

        // Look for the next pattern
        var ar = regex.exec(pattern);

        // Append the text before the pattern (or the end of the string if not found)
        ret += pattern.slice(index, ar ? ar.index : pattern.length);

        if (!ar)
            break;

        switch (ar[0]) {
        case "n":
            ret += number;
            break;
        case "$":
            ret += nf.CurrencySymbol;
            break;
        case "-":
            ret += nf.NegativeSign;
            break;
        case "%":
            ret += nf.PercentSymbol;
            break;
        }
    }

    return ret;
}
 
RegExp.__typeName = 'RegExp';
RegExp.__class = true;
 
Array.__typeName = 'Array';
Array.__class = true;

Array.add = Array.enqueue = function Array$enqueue(array, item) {
    /// <summary locid="M:J#Array.enqueue" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    // Setting Array[Array.length] is faster than Array.push() for a single element.
    array[array.length] = item;
}

Array.addRange = function Array$addRange(array, items) {
    /// <summary locid="M:J#Array.addRange" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="items" type="Array" elementMayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "items", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;

    // Array.push() for multiple elements is faster than setting Array[Array.length] in a loop.
    array.push.apply(array, items);
}

Array.clear = function Array$clear(array) {
    /// <summary locid="M:J#Array.clear" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;
    array.length = 0;
}

Array.clone = function Array$clone(array) {
    /// <summary locid="M:J#Array.clone" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <returns type="Array" elementMayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;
    if (array.length === 1) {
        return [array[0]];
    }
    else {
        // When the Array ctor is called with 0 or 2 or more arguments, it creates a new
        // Array with the elements from the argument list.
        return Array.apply(null, array);
    }
}

Array.contains = function Array$contains(array, item) {
    /// <summary locid="M:J#Array.contains" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;
    return (Array.indexOf(array, item) >= 0);
}

Array.dequeue = function Array$dequeue(array) {
    /// <summary locid="M:J#Array.dequeue" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <returns mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;
    return array.shift();
}

Array.forEach = function Array$forEach(array, method, instance) {
    /// <summary locid="M:J#Array.forEach" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="method" type="Function"></param>
    /// <param name="instance" optional="true" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "method", type: Function},
        {name: "instance", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    for (var i = 0, l = array.length; i < l; i++) {
        var elt = array[i];
        if (typeof(elt) !== 'undefined') method.call(instance, elt, i, array);
    }
}

Array.indexOf = function Array$indexOf(array, item, start) {
    /// <summary locid="M:J#Array.indexOf" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" optional="true" mayBeNull="true"></param>
    /// <param name="start" optional="true" mayBeNull="true"></param>
    /// <returns type="Number"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true, optional: true},
        {name: "start", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    if (typeof(item) === "undefined") return -1;
    var length = array.length;
    if (length !== 0) {
        // Coerce into number ("1a" will become NaN, which is consistent with the built-in behavior of similar Array methods)
        start = start - 0;
        // NaN becomes zero
        if (isNaN(start)) {
            start = 0;
        }
        else {
            // If start is positive or negative infinity, don't try to truncate it.
            // The infinite values will be handled correctly by the subsequent code.
            if (isFinite(start)) {
                // This is faster than doing Math.floor or Math.ceil
                start = start - (start % 1);
            }
            // Negative start indices start from the end
            if (start < 0) {
                start = Math.max(0, length + start);
            }
        }

        // A do/while loop seems to have equal performance to a for loop in this scenario
        for (var i = start; i < length; i++) {
            if ((typeof(array[i]) !== "undefined") && (array[i] === item)) {
                return i;
            }
        }
    }
    return -1;
}

Array.insert = function Array$insert(array, index, item) {
    /// <summary locid="M:J#Array.insert" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="index" mayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "index", mayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;
    array.splice(index, 0, item);
}

Array.parse = function Array$parse(value) {
    /// <summary locid="M:J#Array.parse" />
    /// <param name="value" type="String" mayBeNull="true"></param>
    /// <returns type="Array" elementMayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String, mayBeNull: true}
    ]);
    if (e) throw e;
    if (!value) return [];
    var v = eval(value);
    if (!Array.isInstanceOfType(v)) throw Error.argument('value', Sys.Res.arrayParseBadFormat);
    return v;
}

Array.remove = function Array$remove(array, item) {
    /// <summary locid="M:J#Array.remove" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;
    var index = Array.indexOf(array, item);
    if (index >= 0) {
        array.splice(index, 1);
    }
    return (index >= 0);
}

Array.removeAt = function Array$removeAt(array, index) {
    /// <summary locid="M:J#Array.removeAt" />
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="index" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "index", mayBeNull: true}
    ]);
    if (e) throw e;
    array.splice(index, 1);
}
 
// Define the root object (for non-browser hosts)
if (!window) this.window = this;

// Alias Function as Type
window.Type = Function;

// This has undistinguishable perf from compiled a RegExp.
// The regexps here are kept a little too wide to allow for Unicode characters but still
// capture the most obvious developer errors. The JavaScript parser, as well as the checks for
// eval('name') === name will take care of the other errors.
// ********************************************************************************************
// NOTE: update ScriptComponentDescriptor.cs with any change to this expression
// so server and client-side are in sync.
Type.__fullyQualifiedIdentifierRegExp = new RegExp("^[^.0-9 \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]([^ \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]*[^. \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\])?$", "i");
Type.__identifierRegExp = new RegExp("^[^.0-9 \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\][^. \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]*$", "i");

Type.prototype.callBaseMethod = function Type$callBaseMethod(instance, name, baseArguments) {
    /// <summary locid="M:J#Type.callBaseMethod" />
    /// <param name="instance"></param>
    /// <param name="name" type="String"></param>
    /// <param name="baseArguments" type="Array" optional="true" mayBeNull="true" elementMayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance"},
        {name: "name", type: String},
        {name: "baseArguments", type: Array, mayBeNull: true, optional: true, elementMayBeNull: true}
    ]);
    if (e) throw e;
    var baseMethod = this.getBaseMethod(instance, name);
    if (!baseMethod) throw Error.invalidOperation(String.format(Sys.Res.methodNotFound, name));
    if (!baseArguments) {
        return baseMethod.apply(instance);
    }
    else {
        return baseMethod.apply(instance, baseArguments);
    }
}

Type.prototype.getBaseMethod = function Type$getBaseMethod(instance, name) {
    /// <summary locid="M:J#Type.getBaseMethod" />
    /// <param name="instance"></param>
    /// <param name="name" type="String"></param>
    /// <returns type="Function" mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance"},
        {name: "name", type: String}
    ]);
    if (e) throw e;
    if (!this.isInstanceOfType(instance)) throw Error.argumentType('instance', Object.getType(instance), this);
    var baseType = this.getBaseType();
    if (baseType) {
        var baseMethod = baseType.prototype[name];
        return (baseMethod instanceof Function) ? baseMethod : null;
    }

    return null;
}

Type.prototype.getBaseType = function Type$getBaseType() {
    /// <summary locid="M:J#Type.getBaseType" />
    /// <returns type="Type" mayBeNull="true"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    return (typeof(this.__baseType) === "undefined") ? null : this.__baseType;
}

Type.prototype.getInterfaces = function Type$getInterfaces() {
    /// <summary locid="M:J#Type.getInterfaces" />
    /// <returns type="Array" elementType="Type" mayBeNull="false" elementMayBeNull="false"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    var result = [];
    var type = this;
    while(type) {
        var interfaces = type.__interfaces;
        if (interfaces) {
            for (var i = 0, l = interfaces.length; i < l; i++) {
                var interfaceType = interfaces[i];
                if (!Array.contains(result, interfaceType)) {
                    result[result.length] = interfaceType;
                }
            }
        }
        type = type.__baseType;
    }
    return result;
}

Type.prototype.getName = function Type$getName() {
    /// <summary locid="M:J#Type.getName" />
    /// <returns type="String"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    return (typeof(this.__typeName) === "undefined") ? "" : this.__typeName;
}

Type.prototype.implementsInterface = function Type$implementsInterface(interfaceType) {
    /// <summary locid="M:J#Type.implementsInterface" />
    /// <param name="interfaceType" type="Type"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "interfaceType", type: Type}
    ]);
    if (e) throw e;
    this.resolveInheritance();

    var interfaceName = interfaceType.getName();
    var cache = this.__interfaceCache;
    if (cache) {
        var cacheEntry = cache[interfaceName];
        if (typeof(cacheEntry) !== 'undefined') return cacheEntry;
    }
    else {
        cache = this.__interfaceCache = {};
    }

    var baseType = this;
    while (baseType) {
        var interfaces = baseType.__interfaces;
        if (interfaces) {
            if (Array.indexOf(interfaces, interfaceType) !== -1) {
                return cache[interfaceName] = true;
            }
        }

        baseType = baseType.__baseType;
    }

    return cache[interfaceName] = false;
}

Type.prototype.inheritsFrom = function Type$inheritsFrom(parentType) {
    /// <summary locid="M:J#Type.inheritsFrom" />
    /// <param name="parentType" type="Type"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "parentType", type: Type}
    ]);
    if (e) throw e;
    this.resolveInheritance();
    var baseType = this.__baseType;
    while (baseType) {
        if (baseType === parentType) {
            return true;
        }
        baseType = baseType.__baseType;
    }

    return false;
}

Type.prototype.initializeBase = function Type$initializeBase(instance, baseArguments) {
    /// <summary locid="M:J#Type.initializeBase" />
    /// <param name="instance"></param>
    /// <param name="baseArguments" type="Array" optional="true" mayBeNull="true" elementMayBeNull="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance"},
        {name: "baseArguments", type: Array, mayBeNull: true, optional: true, elementMayBeNull: true}
    ]);
    if (e) throw e;
    if (!this.isInstanceOfType(instance)) throw Error.argumentType('instance', Object.getType(instance), this);

    this.resolveInheritance();
    if (this.__baseType) {
        if (!baseArguments) {
            this.__baseType.apply(instance);
        }
        else {
            this.__baseType.apply(instance, baseArguments);
        }
    }

    return instance;
}

Type.prototype.isImplementedBy = function Type$isImplementedBy(instance) {
    /// <summary locid="M:J#Type.isImplementedBy" />
    /// <param name="instance" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance", mayBeNull: true}
    ]);
    if (e) throw e;
    if (typeof(instance) === "undefined" || instance === null) return false;

    var instanceType = Object.getType(instance);
    return !!(instanceType.implementsInterface && instanceType.implementsInterface(this));
}

Type.prototype.isInstanceOfType = function Type$isInstanceOfType(instance) {
    /// <summary locid="M:J#Type.isInstanceOfType" />
    /// <param name="instance" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "instance", mayBeNull: true}
    ]);
    if (e) throw e;
    if (typeof(instance) === "undefined" || instance === null) return false;

    if (instance instanceof this) return true;

    var instanceType = Object.getType(instance);
    return !!(instanceType === this) ||
           (instanceType.inheritsFrom && instanceType.inheritsFrom(this)) ||
           (instanceType.implementsInterface && instanceType.implementsInterface(this));
}

Type.prototype.registerClass = function Type$registerClass(typeName, baseType, interfaceTypes) {
    /// <summary locid="M:J#Type.registerClass" />
    /// <param name="typeName" type="String"></param>
    /// <param name="baseType" type="Type" optional="true" mayBeNull="true"></param>
    /// <param name="interfaceTypes" parameterArray="true" type="Type"></param>
    /// <returns type="Type"></returns>
    var e = Function._validateParams(arguments, [
        {name: "typeName", type: String},
        {name: "baseType", type: Type, mayBeNull: true, optional: true},
        {name: "interfaceTypes", type: Type, parameterArray: true}
    ]);
    if (e) throw e;
    if (!Type.__fullyQualifiedIdentifierRegExp.test(typeName)) throw Error.argument('typeName', Sys.Res.notATypeName);
    // Check if the type name parses to an existing object that matches this.
    var parsedName;
    try {
        parsedName = eval(typeName);
    }
    catch(e) {
        throw Error.argument('typeName', Sys.Res.argumentTypeName);
    }
    if (parsedName !== this) throw Error.argument('typeName', Sys.Res.badTypeName);
    // Check for double registrations
    if (Sys.__registeredTypes[typeName]) throw Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, typeName));

    // We never accept undefined for this parameter because this is the only way we can catch
    // registerClass("Sys.Foo", Sys.BArWithATypo, Sys.ISomeInterface).
    if ((arguments.length > 1) && (typeof(baseType) === 'undefined')) throw Error.argumentUndefined('baseType');
    if (baseType && !baseType.__class) throw Error.argument('baseType', Sys.Res.baseNotAClass);

    this.prototype.constructor = this;
    this.__typeName = typeName;
    this.__class = true;
    if (baseType) {
        this.__baseType = baseType;
        this.__basePrototypePending = true;
    }
    // Saving a case-insensitive index of the registered types on each namespace
    Sys.__upperCaseTypes[typeName.toUpperCase()] = this;

    // It is more performant to check "if (interfaceTypes)" than "if (arguments.length > 2)".
    // Accessing the arguments array is relatively expensive, so we only want to do so if there
    // are actually interface parameters.
    if (interfaceTypes) {
        this.__interfaces = [];
        this.resolveInheritance();
        for (var i = 2, l = arguments.length; i < l; i++) {
            var interfaceType = arguments[i];
            if (!interfaceType.__interface) throw Error.argument('interfaceTypes[' + (i - 2) + ']', Sys.Res.notAnInterface);
            for (var methodName in interfaceType.prototype) {
                var method = interfaceType.prototype[methodName];
                if (!this.prototype[methodName]) {
                    this.prototype[methodName] = method;
                }
            }
            this.__interfaces.push(interfaceType);
        }
    }
    Sys.__registeredTypes[typeName] = true;

    return this;
}

Type.prototype.registerInterface = function Type$registerInterface(typeName) {
    /// <summary locid="M:J#Type.registerInterface" />
    /// <param name="typeName" type="String"></param>
    /// <returns type="Type"></returns>
    var e = Function._validateParams(arguments, [
        {name: "typeName", type: String}
    ]);
    if (e) throw e;
    if (!Type.__fullyQualifiedIdentifierRegExp.test(typeName)) throw Error.argument('typeName', Sys.Res.notATypeName);
    // Check if the type name parses to an existing object that matches this.
    var parsedName;
    try {
        parsedName = eval(typeName);
    }
    catch(e) {
        throw Error.argument('typeName', Sys.Res.argumentTypeName);
    }
    if (parsedName !== this) throw Error.argument('typeName', Sys.Res.badTypeName);
    // Check for double registrations
    if (Sys.__registeredTypes[typeName]) throw Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, typeName));
    // Saving a case-insensitive index of the registered types on each namespace
    Sys.__upperCaseTypes[typeName.toUpperCase()] = this;

    this.prototype.constructor = this;
    this.__typeName = typeName;
    this.__interface = true;
    Sys.__registeredTypes[typeName] = true;

    return this;
}

Type.prototype.resolveInheritance = function Type$resolveInheritance() {
    /// <summary locid="M:J#Type.resolveInheritance" />
    if (arguments.length !== 0) throw Error.parameterCount();

    if (this.__basePrototypePending) {
        var baseType = this.__baseType;

        baseType.resolveInheritance();

        for (var memberName in baseType.prototype) {
            var memberValue = baseType.prototype[memberName];
            if (!this.prototype[memberName]) {
                this.prototype[memberName] = memberValue;
            }
        }
        delete this.__basePrototypePending;
    }
}

Type.getRootNamespaces = function Type$getRootNamespaces() {
    /// <summary locid="M:J#Type.getRootNamespaces" />
    /// <returns type="Array"></returns>
    if (arguments.length !== 0) throw Error.parameterCount();
    return Array.clone(Sys.__rootNamespaces);
}

Type.isClass = function Type$isClass(type) {
    /// <summary locid="M:J#Type.isClass" />
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;
    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__class;
}

Type.isInterface = function Type$isInterface(type) {
    /// <summary locid="M:J#Type.isInterface" />
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;
    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__interface;
}

Type.isNamespace = function Type$isNamespace(object) {
    /// <summary locid="M:J#Type.isNamespace" />
    /// <param name="object" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "object", mayBeNull: true}
    ]);
    if (e) throw e;
    if ((typeof(object) === 'undefined') || (object === null)) return false;
    return !!object.__namespace;
}

Type.parse = function Type$parse(typeName, ns) {
    /// <summary locid="M:J#Type.parse" />
    /// <param name="typeName" type="String" mayBeNull="true"></param>
    /// <param name="ns" optional="true" mayBeNull="true"></param>
    /// <returns type="Type" mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "typeName", type: String, mayBeNull: true},
        {name: "ns", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    var fn;
    if (ns) {
        fn = Sys.__upperCaseTypes[ns.getName().toUpperCase() + '.' + typeName.toUpperCase()];
        return fn || null;
    }
    if (!typeName) return null;
    if (!Type.__htClasses) {
        Type.__htClasses = {};
    }
    fn = Type.__htClasses[typeName];
    if (!fn) {
        fn = eval(typeName);
        if (typeof(fn) !== 'function') throw Error.argument('typeName', Sys.Res.notATypeName);
        Type.__htClasses[typeName] = fn;
    }
    return fn;
}

Type.registerNamespace = function Type$registerNamespace(namespacePath) {
    /// <summary locid="M:J#Type.registerNamespace" />
    /// <param name="namespacePath" type="String"></param>
    var e = Function._validateParams(arguments, [
        {name: "namespacePath", type: String}
    ]);
    if (e) throw e;
    if (!Type.__fullyQualifiedIdentifierRegExp.test(namespacePath)) throw Error.argument('namespacePath', Sys.Res.invalidNameSpace);
    var rootObject = window;
    var namespaceParts = namespacePath.split('.');

    for (var i = 0; i < namespaceParts.length; i++) {
        var currentPart = namespaceParts[i];
        var ns = rootObject[currentPart];
        if (ns && !ns.__namespace) {
            throw Error.invalidOperation(String.format(Sys.Res.namespaceContainsObject, namespaceParts.splice(0, i + 1).join('.')));
        }
        if (!ns) {
            ns = rootObject[currentPart] = {
                __namespace: true,
                __typeName: namespaceParts.slice(0, i + 1).join('.')
            };
            if (i === 0) {
                Sys.__rootNamespaces[Sys.__rootNamespaces.length] = ns;
            }
            var parsedName;
            try {
                parsedName = eval(ns.__typeName);
            }
            catch(e) {
                parsedName = null;
            }
            if (parsedName !== ns) {
                delete rootObject[currentPart];
                throw Error.argument('namespacePath', Sys.Res.invalidNameSpace);
            }
            ns.getName = function ns$getName() {return this.__typeName;}
        }
        rootObject = ns;
    }
}

// Bootstrapping the Sys namespace. Can't use registerNamespace here as its code uses some of the private
// variables that moved from the global namespace onto Sys.
// Changes to registerNamespace should be checked against this bootstrapping code to keep them in sync.
window.Sys = {
    __namespace: true,
    __typeName: "Sys",
    getName: function() {return "Sys";},
    __upperCaseTypes: {}
};
Sys.__rootNamespaces = [Sys];
Sys.__registeredTypes = {};

 
Sys.IDisposable = function Sys$IDisposable() {
    throw Error.notImplemented();
}

    function Sys$IDisposable$dispose() {
        throw Error.notImplemented();
    }
Sys.IDisposable.prototype = {
    dispose: Sys$IDisposable$dispose
}
Sys.IDisposable.registerInterface('Sys.IDisposable');
 
Sys.StringBuilder = function Sys$StringBuilder(initialText) {
    /// <summary locid="M:J#Sys.StringBuilder.#ctor" />
    /// <param name="initialText" optional="true" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "initialText", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    this._parts = (typeof(initialText) !== 'undefined' && initialText !== null && initialText !== '') ?
        [initialText.toString()] : [];
    this._value = {};
    this._len = 0;
}


    function Sys$StringBuilder$append(text) {
        /// <summary locid="M:J#Sys.StringBuilder.append" />
        /// <param name="text" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "text", mayBeNull: true}
        ]);
        if (e) throw e;
        this._parts[this._parts.length] = text;
    }

    function Sys$StringBuilder$appendLine(text) {
        /// <summary locid="M:J#Sys.StringBuilder.appendLine" />
        /// <param name="text" optional="true" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "text", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        this._parts[this._parts.length] =
            ((typeof(text) === 'undefined') || (text === null) || (text === '')) ?
            '\r\n' : text + '\r\n';
    }

    function Sys$StringBuilder$clear() {
        /// <summary locid="M:J#Sys.StringBuilder.clear" />
        if (arguments.length !== 0) throw Error.parameterCount();
        this._parts = [];
        this._value = {};
        this._len = 0;
    }

    function Sys$StringBuilder$isEmpty() {
        /// <summary locid="M:J#Sys.StringBuilder.isEmpty" />
        /// <returns type="Boolean"></returns>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this._parts.length === 0) return true;
        return this.toString() === '';
    }



    function Sys$StringBuilder$toString(separator) {
        /// <summary locid="M:J#Sys.StringBuilder.toString" />
        /// <param name="separator" type="String" optional="true" mayBeNull="true"></param>
        /// <returns type="String"></returns>
        var e = Function._validateParams(arguments, [
            {name: "separator", type: String, mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        separator = separator || '';
        var parts = this._parts;
        if (this._len !== parts.length) {
            this._value = {};
            this._len = parts.length;
        }
        var val = this._value;
        if (typeof(val[separator]) === 'undefined') {
            // Need to remove empty elements before joining in the separator case
            if (separator !== '') {
                for (var i = 0; i < parts.length;) {
                    if ((typeof(parts[i]) === 'undefined') || (parts[i] === '') || (parts[i] === null)) {
                        parts.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
            }
            val[separator] = this._parts.join(separator);
        }
        return val[separator];
    }
Sys.StringBuilder.prototype = {
    append: Sys$StringBuilder$append,
    appendLine: Sys$StringBuilder$appendLine,
    clear: Sys$StringBuilder$clear,
    isEmpty: Sys$StringBuilder$isEmpty,
    // separator may be null, to match behavior of ECMA Array.join(separator) and
    // .NET String.Join(separator, value)
    toString: Sys$StringBuilder$toString
}
Sys.StringBuilder.registerClass('Sys.StringBuilder');
 
if (!window.XMLHttpRequest) {
    window.XMLHttpRequest = function window$XMLHttpRequest() {
        // DevDiv Bugs 150054: Msxml2.XMLHTTP (version independent ProgID) required for mobile IE
        var progIDs = [ 'Mxsml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP' ];
        for (var i = 0, l = progIDs.length; i < l; i++) {
            try {
                return new ActiveXObject(progIDs[i]);
            }
            catch (ex) {
            }
        }
        return null;
    }
}

// Compat
 
Sys.Browser = {};

Sys.Browser.InternetExplorer = {};
Sys.Browser.Firefox = {};
Sys.Browser.Safari = {};
Sys.Browser.Opera = {};

Sys.Browser.agent = null;
Sys.Browser.hasDebuggerStatement = false;
Sys.Browser.name = navigator.appName;
Sys.Browser.version = parseFloat(navigator.appVersion);

if (navigator.userAgent.indexOf(' MSIE ') > -1) {
    Sys.Browser.agent = Sys.Browser.InternetExplorer;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);
    Sys.Browser.hasDebuggerStatement = true;
}
else if (navigator.userAgent.indexOf(' Firefox/') > -1) {
    Sys.Browser.agent = Sys.Browser.Firefox;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/ Firefox\/(\d+\.\d+)/)[1]);
    Sys.Browser.name = 'Firefox';
    Sys.Browser.hasDebuggerStatement = true;
}
else if (navigator.userAgent.indexOf(' Safari/') > -1) {
    Sys.Browser.agent = Sys.Browser.Safari;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/ Safari\/(\d+(\.\d+)?)/)[1]);
    Sys.Browser.name = 'Safari';
}
else if (navigator.userAgent.indexOf('Opera/') > -1) {
    Sys.Browser.agent = Sys.Browser.Opera;
}

// Base Class Library

Type.registerNamespace('Sys.UI');

 
Sys._Debug = function Sys$_Debug() {
    /// <summary locid="M:J#Sys._Debug.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
}


    function Sys$_Debug$_appendConsole(text) {
        // VS script debugger output window.
        if ((typeof(Debug) !== 'undefined') && Debug.writeln) {
            Debug.writeln(text);
        }
        // FF firebug and Safari console.
        if (window.console && window.console.log) {
            window.console.log(text);
        }
        // Opera console.
        if (window.opera) {
            window.opera.postError(text);
        }
        // WebDevHelper console.
        if (window.debugService) {
            window.debugService.trace(text);
        }
    }

    function Sys$_Debug$_appendTrace(text) {
        var traceElement = document.getElementById('TraceConsole');
        if (traceElement && (traceElement.tagName.toUpperCase() === 'TEXTAREA')) {
            traceElement.value += text + '\n';
        }
    }

    function Sys$_Debug$assert(condition, message, displayCaller) {
        /// <summary locid="M:J#Sys._Debug.assert" />
        /// <param name="condition" type="Boolean"></param>
        /// <param name="message" type="String" optional="true" mayBeNull="true"></param>
        /// <param name="displayCaller" type="Boolean" optional="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "condition", type: Boolean},
            {name: "message", type: String, mayBeNull: true, optional: true},
            {name: "displayCaller", type: Boolean, optional: true}
        ]);
        if (e) throw e;
        if (!condition) {
            message = (displayCaller && this.assert.caller) ?
                String.format(Sys.Res.assertFailedCaller, message, this.assert.caller) :
                String.format(Sys.Res.assertFailed, message);

            if (confirm(String.format(Sys.Res.breakIntoDebugger, message))) {
                this.fail(message);
            }
        }
    }

    function Sys$_Debug$clearTrace() {
        var traceElement = document.getElementById('TraceConsole');
        if (traceElement && (traceElement.tagName.toUpperCase() === 'TEXTAREA')) {
            traceElement.value = '';
        }
    }

    function Sys$_Debug$fail(message) {
        /// <summary locid="M:J#Sys._Debug.fail" />
        /// <param name="message" type="String" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "message", type: String, mayBeNull: true}
        ]);
        if (e) throw e;
        this._appendConsole(message);

        // Cannot execute eval('debugger') in browsers that don't have a debugger statement, since it causes a parse error.
        if (Sys.Browser.hasDebuggerStatement) {
            eval('debugger');
        }
    }

    function Sys$_Debug$trace(text) {
        /// <summary locid="M:J#Sys._Debug.trace" />
        /// <param name="text"></param>
        var e = Function._validateParams(arguments, [
            {name: "text"}
        ]);
        if (e) throw e;
        this._appendConsole(text);
        this._appendTrace(text);
    }

    function Sys$_Debug$traceDump(object, name) {
        /// <summary locid="M:J#Sys._Debug.traceDump" />
        /// <param name="object" mayBeNull="true"></param>
        /// <param name="name" type="String" mayBeNull="true" optional="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "object", mayBeNull: true},
            {name: "name", type: String, mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        var text = this._traceDump(object, name, true);
    }

    function Sys$_Debug$_traceDump(object, name, recursive, indentationPadding, loopArray) {
        name = name? name : 'traceDump';
        indentationPadding = indentationPadding? indentationPadding : '';
        if (object === null) {
            this.trace(indentationPadding + name + ': null');
            return;
        }
        switch(typeof(object)) {
            case 'undefined':
                this.trace(indentationPadding + name + ': Undefined');
                break;
            case 'number': case 'string': case 'boolean':
                this.trace(indentationPadding + name + ': ' + object);
                break;
            default:
                if (Date.isInstanceOfType(object) || RegExp.isInstanceOfType(object)) {
                    this.trace(indentationPadding + name + ': ' + object.toString());
                    break;
                }
                if (!loopArray) {
                    loopArray = [];
                }
                else if (Array.contains(loopArray, object)) {
                    this.trace(indentationPadding + name + ': ...');
                    return;
                }
                Array.add(loopArray, object);

                // don't recurse into dom elements.
                // trace dump has to use '==' for window when it's passed as event arg in IE.
                // i.e., body onLoad="Sys.Debug.traceDump(window)"
                if ((object == window) || (object === document) ||
                    (window.HTMLElement && (object instanceof HTMLElement)) ||
                    (typeof(object.nodeName) === 'string')) {
                    var tag = object.tagName? object.tagName : 'DomElement';
                    if (object.id) {
                        tag += ' - ' + object.id;
                    }
                    this.trace(indentationPadding + name + ' {' +  tag + '}');
                }
                // objects and arrays
                else {
                    var typeName = Object.getTypeName(object);
                    this.trace(indentationPadding + name + (typeof(typeName) === 'string' ? ' {' + typeName + '}' : ''));
                    if ((indentationPadding === '') || recursive) {
                        indentationPadding += "    ";
                        var i, length, properties, p, v;
                        if (Array.isInstanceOfType(object)) {
                            length = object.length;
                            for (i = 0; i < length; i++) {
                                this._traceDump(object[i], '[' + i + ']', recursive, indentationPadding, loopArray);
                            }
                        }
                        else {
                            for (p in object) {
                                v = object[p];
                                if (!Function.isInstanceOfType(v)) {
                                    this._traceDump(v, p, recursive, indentationPadding, loopArray);
                                }
                            }
                        }
                    }
                }
                Array.remove(loopArray, object);
        }
    }
Sys._Debug.prototype = {
    _appendConsole: Sys$_Debug$_appendConsole,
    _appendTrace: Sys$_Debug$_appendTrace,
    assert: Sys$_Debug$assert,
    clearTrace: Sys$_Debug$clearTrace,
    fail: Sys$_Debug$fail,
    trace: Sys$_Debug$trace,
    traceDump: Sys$_Debug$traceDump,
    _traceDump: Sys$_Debug$_traceDump
}
Sys._Debug.registerClass('Sys._Debug');

Sys.Debug = new Sys._Debug();
    Sys.Debug.isDebug = true;
 
function Sys$Enum$parse(value, ignoreCase) {
    /// <summary locid="M:J#Sys.Enum.parse" />
    /// <param name="value" type="String"></param>
    /// <param name="ignoreCase" type="Boolean" optional="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String},
        {name: "ignoreCase", type: Boolean, optional: true}
    ]);
    if (e) throw e;
    var values, parsed, val;
    if (ignoreCase) {
        values = this.__lowerCaseValues;
        if (!values) {
            this.__lowerCaseValues = values = {};
            var prototype = this.prototype;
            for (var name in prototype) {
                values[name.toLowerCase()] = prototype[name];
            }
        }
    }
    else {
        values = this.prototype;
    }
    if (!this.__flags) {
        val = (ignoreCase ? value.toLowerCase() : value);
        parsed = values[val.trim()];
        if (typeof(parsed) !== 'number') throw Error.argument('value', String.format(Sys.Res.enumInvalidValue, value, this.__typeName));
        return parsed;
    }
    else {
        var parts = (ignoreCase ? value.toLowerCase() : value).split(',');
        var v = 0;

        for (var i = parts.length - 1; i >= 0; i--) {
            var part = parts[i].trim();
            parsed = values[part];
            if (typeof(parsed) !== 'number') throw Error.argument('value', String.format(Sys.Res.enumInvalidValue, value.split(',')[i].trim(), this.__typeName));
            v |= parsed;
        }
        return v;
    }
}

function Sys$Enum$toString(value) {
    /// <summary locid="M:J#Sys.Enum.toString" />
    /// <param name="value" optional="true" mayBeNull="true"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    // Need to do the type check manually instead of using parameter validation to be able to return
    // an error message that mentions the actual enum type that's expected instead of Number.
    if ((typeof(value) === 'undefined') || (value === null)) return this.__string;
    if ((typeof(value) != 'number') || ((value % 1) !== 0)) throw Error.argumentType('value', Object.getType(value), this);
    var values = this.prototype;
    var i;
    if (!this.__flags || (value === 0)) {
        for (i in values) {
            if (values[i] === value) {
                return i;
            }
        }
    }
    else {
        var sorted = this.__sortedValues;
        if (!sorted) {
            sorted = [];
            for (i in values) {
                sorted[sorted.length] = {key: i, value: values[i]};
            }
            sorted.sort(function(a, b) {
                return a.value - b.value;
            });
            this.__sortedValues = sorted;
        }
        var parts = [];
        var v = value;
        for (i = sorted.length - 1; i >= 0; i--) {
            var kvp = sorted[i];
            var vali = kvp.value;
            if (vali === 0) continue;
            if ((vali & value) === vali) {
                parts[parts.length] = kvp.key;
                v -= vali;
                if (v === 0) break;
            }
        }
        if (parts.length && v === 0) return parts.reverse().join(', ');
    }
    throw Error.argumentOutOfRange('value', value, String.format(Sys.Res.enumInvalidValue, value, this.__typeName));
}

Type.prototype.registerEnum = function Type$registerEnum(name, flags) {
    /// <summary locid="M:J#Sys.UI.LineType.#ctor" />
    /// <param name="name" type="String"></param>
    /// <param name="flags" type="Boolean" optional="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "name", type: String},
        {name: "flags", type: Boolean, optional: true}
    ]);
    if (e) throw e;
    if (!Type.__fullyQualifiedIdentifierRegExp.test(name)) throw Error.argument('name', Sys.Res.notATypeName);
    // Check if the type name parses to an existing object that matches this.
    var parsedName;
    try {
        parsedName = eval(name);
    }
    catch(e) {
        throw Error.argument('name', Sys.Res.argumentTypeName);
    }
    if (parsedName !== this) throw Error.argument('name', Sys.Res.badTypeName);
    if (Sys.__registeredTypes[name]) throw Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, name));
    for (var i in this.prototype) {
        var val = this.prototype[i];
        if (!Type.__identifierRegExp.test(i)) throw Error.invalidOperation(String.format(Sys.Res.enumInvalidValueName, i));
        if (typeof(val) !== 'number' || (val % 1) !== 0) throw Error.invalidOperation(Sys.Res.enumValueNotInteger);
        if (typeof(this[i]) !== 'undefined') throw Error.invalidOperation(String.format(Sys.Res.enumReservedName, i));
    }
    Sys.__upperCaseTypes[name.toUpperCase()] = this;

    for (var i in this.prototype) {
        this[i] = this.prototype[i];
    }
    this.__typeName = name;
    this.parse = Sys$Enum$parse;
    this.__string = this.toString();
    this.toString = Sys$Enum$toString;
    this.__flags = flags;
    this.__enum = true;
    Sys.__registeredTypes[name] = true;
}

Type.isEnum = function Type$isEnum(type) {
    /// <summary locid="M:J#Type.isEnum" />
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;
    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__enum;
}

Type.isFlags = function Type$isFlags(type) {
    /// <summary locid="M:J#Type.isFlags" />
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;
    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__flags;
}
 
Sys.EventHandlerList = function Sys$EventHandlerList() {
    /// <summary locid="M:J#Sys.EventHandlerList.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    this._list = {};
}


    function Sys$EventHandlerList$addHandler(id, handler) {
        /// <summary locid="M:J#Sys.EventHandlerList.addHandler" />
        /// <param name="id" type="String"></param>
        /// <param name="handler" type="Function"></param>
        var e = Function._validateParams(arguments, [
            {name: "id", type: String},
            {name: "handler", type: Function}
        ]);
        if (e) throw e;
        Array.add(this._getEvent(id, true), handler);
    }
    function Sys$EventHandlerList$removeHandler(id, handler) {
        /// <summary locid="M:J#Sys.EventHandlerList.removeHandler" />
        /// <param name="id" type="String"></param>
        /// <param name="handler" type="Function"></param>
        var e = Function._validateParams(arguments, [
            {name: "id", type: String},
            {name: "handler", type: Function}
        ]);
        if (e) throw e;
        var evt = this._getEvent(id);
        if (!evt) return;
        Array.remove(evt, handler);
    }
    function Sys$EventHandlerList$getHandler(id) {
        /// <summary locid="M:J#Sys.EventHandlerList.getHandler" />
        /// <param name="id" type="String"></param>
        /// <returns type="Function"></returns>
        var e = Function._validateParams(arguments, [
            {name: "id", type: String}
        ]);
        if (e) throw e;
        var evt = this._getEvent(id);
        if (!evt || (evt.length === 0)) return null;
        evt = Array.clone(evt);
        return function(source, args) {
            for (var i = 0, l = evt.length; i < l; i++) {
                evt[i](source, args);
            }
        };
    }

    function Sys$EventHandlerList$_getEvent(id, create) {
        if (!this._list[id]) {
            if (!create) return null;
            this._list[id] = [];
        }
        return this._list[id];
    }
Sys.EventHandlerList.prototype = {
    addHandler: Sys$EventHandlerList$addHandler,
    removeHandler: Sys$EventHandlerList$removeHandler,
    getHandler: Sys$EventHandlerList$getHandler,
    _getEvent: Sys$EventHandlerList$_getEvent
}
Sys.EventHandlerList.registerClass('Sys.EventHandlerList');
 
Sys.EventArgs = function Sys$EventArgs() {
    /// <summary locid="M:J#Sys.EventArgs.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
}
Sys.EventArgs.registerClass('Sys.EventArgs');

Sys.EventArgs.Empty = new Sys.EventArgs();
 
Sys.CancelEventArgs = function Sys$CancelEventArgs() {
    /// <summary locid="M:J#Sys.CancelEventArgs.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    Sys.CancelEventArgs.initializeBase(this);

    this._cancel = false;
}


    function Sys$CancelEventArgs$get_cancel() {
        /// <value type="Boolean" locid="P:J#Sys.CancelEventArgs.cancel"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._cancel;
    }
    function Sys$CancelEventArgs$set_cancel(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Boolean}]);
        if (e) throw e;
        this._cancel = value;
    }
Sys.CancelEventArgs.prototype = {
    get_cancel: Sys$CancelEventArgs$get_cancel,
    set_cancel: Sys$CancelEventArgs$set_cancel
}

Sys.CancelEventArgs.registerClass('Sys.CancelEventArgs', Sys.EventArgs);
 
Sys.INotifyPropertyChange = function Sys$INotifyPropertyChange() {
    /// <summary locid="M:J#Sys.INotifyPropertyChange.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    throw Error.notImplemented();
}

    function Sys$INotifyPropertyChange$add_propertyChanged(handler) {
    /// <summary locid="E:J#Sys.INotifyPropertyChange.propertyChanged" />
    var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
    if (e) throw e;
        throw Error.notImplemented();
    }
    function Sys$INotifyPropertyChange$remove_propertyChanged(handler) {
    var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
    if (e) throw e;
        throw Error.notImplemented();
    }
Sys.INotifyPropertyChange.prototype = {
    add_propertyChanged: Sys$INotifyPropertyChange$add_propertyChanged,
    remove_propertyChanged: Sys$INotifyPropertyChange$remove_propertyChanged
}
Sys.INotifyPropertyChange.registerInterface('Sys.INotifyPropertyChange');
 
Sys.PropertyChangedEventArgs = function Sys$PropertyChangedEventArgs(propertyName) {
    /// <summary locid="M:J#Sys.PropertyChangedEventArgs.#ctor" />
    /// <param name="propertyName" type="String"></param>
    var e = Function._validateParams(arguments, [
        {name: "propertyName", type: String}
    ]);
    if (e) throw e;
    Sys.PropertyChangedEventArgs.initializeBase(this);
    this._propertyName = propertyName;
}
 
    function Sys$PropertyChangedEventArgs$get_propertyName() {
        /// <value type="String" locid="P:J#Sys.PropertyChangedEventArgs.propertyName"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._propertyName;
    }
Sys.PropertyChangedEventArgs.prototype = {
    get_propertyName: Sys$PropertyChangedEventArgs$get_propertyName
}
Sys.PropertyChangedEventArgs.registerClass('Sys.PropertyChangedEventArgs', Sys.EventArgs);
 
Sys.INotifyDisposing = function Sys$INotifyDisposing() {
    /// <summary locid="M:J#Sys.INotifyDisposing.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    throw Error.notImplemented();
}

    function Sys$INotifyDisposing$add_disposing(handler) {
    /// <summary locid="E:J#Sys.INotifyDisposing.disposing" />
    var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
    if (e) throw e;
        throw Error.notImplemented();
    }
    function Sys$INotifyDisposing$remove_disposing(handler) {
    var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
    if (e) throw e;
        throw Error.notImplemented();
    }
Sys.INotifyDisposing.prototype = {
    add_disposing: Sys$INotifyDisposing$add_disposing,
    remove_disposing: Sys$INotifyDisposing$remove_disposing
}
Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");
 
Sys.Component = function Sys$Component() {
    /// <summary locid="M:J#Sys.Component.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    if (Sys.Application) Sys.Application.registerDisposableObject(this);
}





    function Sys$Component$get_events() {
        /// <value type="Sys.EventHandlerList" locid="P:J#Sys.Component.events"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._events) {
            this._events = new Sys.EventHandlerList();
        }
        return this._events;
    }
    function Sys$Component$get_id() {
        /// <value type="String" locid="P:J#Sys.Component.id"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._id;
    }
    function Sys$Component$set_id(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        if (this._idSet) throw Error.invalidOperation(Sys.Res.componentCantSetIdTwice);
        this._idSet = true;
        var oldId = this.get_id();
        if (oldId && Sys.Application.findComponent(oldId)) throw Error.invalidOperation(Sys.Res.componentCantSetIdAfterAddedToApp);
        this._id = value;
    }
    function Sys$Component$get_isInitialized() {
        /// <value type="Boolean" locid="P:J#Sys.Component.isInitialized"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._initialized;
    }
    function Sys$Component$get_isUpdating() {
        /// <value type="Boolean" locid="P:J#Sys.Component.isUpdating"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._updating;
    }
    function Sys$Component$add_disposing(handler) {
        /// <summary locid="E:J#Sys.Component.disposing" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().addHandler("disposing", handler);
    }
    function Sys$Component$remove_disposing(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().removeHandler("disposing", handler);
    }
    function Sys$Component$add_propertyChanged(handler) {
        /// <summary locid="E:J#Sys.Component.propertyChanged" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().addHandler("propertyChanged", handler);
    }
    function Sys$Component$remove_propertyChanged(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().removeHandler("propertyChanged", handler);
    }
    function Sys$Component$beginUpdate() {
        this._updating = true;
    }
    function Sys$Component$dispose() {
        if (this._events) {
            var handler = this._events.getHandler("disposing");
            if (handler) {
                handler(this, Sys.EventArgs.Empty);
            }
        }
        delete this._events;
        Sys.Application.unregisterDisposableObject(this);
        Sys.Application.removeComponent(this);
    }
    function Sys$Component$endUpdate() {
        this._updating = false;
        if (!this._initialized) this.initialize();
        this.updated();
    }
    function Sys$Component$initialize() {
        this._initialized = true;
    }
    function Sys$Component$raisePropertyChanged(propertyName) {
        /// <summary locid="M:J#Sys.Component.raisePropertyChanged" />
        /// <param name="propertyName" type="String"></param>
        var e = Function._validateParams(arguments, [
            {name: "propertyName", type: String}
        ]);
        if (e) throw e;
        if (!this._events) return;
        var handler = this._events.getHandler("propertyChanged");
        if (handler) {
            handler(this, new Sys.PropertyChangedEventArgs(propertyName));
        }
    }
    function Sys$Component$updated() {
    }
Sys.Component.prototype = {
    _id: null,
    _idSet: false,
    _initialized: false,
    _updating: false,
    get_events: Sys$Component$get_events,
    get_id: Sys$Component$get_id,
    set_id: Sys$Component$set_id,
    get_isInitialized: Sys$Component$get_isInitialized,
    get_isUpdating: Sys$Component$get_isUpdating,
    add_disposing: Sys$Component$add_disposing,
    remove_disposing: Sys$Component$remove_disposing,
    add_propertyChanged: Sys$Component$add_propertyChanged,
    remove_propertyChanged: Sys$Component$remove_propertyChanged,
    beginUpdate: Sys$Component$beginUpdate,
    dispose: Sys$Component$dispose,
    endUpdate: Sys$Component$endUpdate,
    initialize: Sys$Component$initialize,
    raisePropertyChanged: Sys$Component$raisePropertyChanged,
    updated: Sys$Component$updated
}
Sys.Component.registerClass('Sys.Component', null, Sys.IDisposable, Sys.INotifyPropertyChange, Sys.INotifyDisposing);

function Sys$Component$_setProperties(target, properties) {
    /// <summary locid="M:J#Sys.Component._setProperties" />
    /// <param name="target"></param>
    /// <param name="properties"></param>
    var e = Function._validateParams(arguments, [
        {name: "target"},
        {name: "properties"}
    ]);
    if (e) throw e;
    var current;
    var targetType = Object.getType(target);
    var isObject = (targetType === Object) || (targetType === Sys.UI.DomElement);
    var isComponent = Sys.Component.isInstanceOfType(target) && !target.get_isUpdating();
    if (isComponent) target.beginUpdate();
    for (var name in properties) {
        var val = properties[name];
        var getter = isObject ? null : target["get_" + name];
        if (isObject || typeof(getter) !== 'function') {
            // No getter, looking for an existing field.
            var targetVal = target[name];
            if (!isObject && typeof(targetVal) === 'undefined') throw Error.invalidOperation(String.format(Sys.Res.propertyUndefined, name));
            if (!val || (typeof(val) !== 'object') || (isObject && !targetVal)) {
                target[name] = val;
            }
            else {
                Sys$Component$_setProperties(targetVal, val);
            }
        }
        else {
            var setter = target["set_" + name];
            if (typeof(setter) === 'function') {
                // The setter exists, using it in all cases.
                setter.apply(target, [val]);
            }
            else if (val instanceof Array) {
                // There is a getter but no setter and the value to set is an array. Adding to the existing array.
                current = getter.apply(target);
                if (!(current instanceof Array)) throw new Error.invalidOperation(String.format(Sys.Res.propertyNotAnArray, name));
                for (var i = 0, j = current.length, l= val.length; i < l; i++, j++) {
                    current[j] = val[i];
                }
            }
            else if ((typeof(val) === 'object') && (Object.getType(val) === Object)) {
                // There is a getter but no setter and the value to set is a plain object. Adding to the existing object.
                current = getter.apply(target);
                if ((typeof(current) === 'undefined') || (current === null)) throw new Error.invalidOperation(String.format(Sys.Res.propertyNullOrUndefined, name));
                Sys$Component$_setProperties(current, val);
            }
            else {
                // No setter, and the value is not an array or object, throwing.
                throw new Error.invalidOperation(String.format(Sys.Res.propertyNotWritable, name));
            }
        }
    }
    if (isComponent) target.endUpdate();
}

function Sys$Component$_setReferences(component, references) {
    for (var name in references) {
        var setter = component["set_" + name];
        var reference = $find(references[name]);
        if (typeof(setter) !== 'function') throw new Error.invalidOperation(String.format(Sys.Res.propertyNotWritable, name));
        if (!reference) throw Error.invalidOperation(String.format(Sys.Res.referenceNotFound, references[name]));
        setter.apply(component, [reference]);
    }
}

var $create = Sys.Component.create = function Sys$Component$create(type, properties, events, references, element) {
    /// <summary locid="M:J#Sys.Component.create" />
    /// <param name="type" type="Type"></param>
    /// <param name="properties" optional="true" mayBeNull="true"></param>
    /// <param name="events" optional="true" mayBeNull="true"></param>
    /// <param name="references" optional="true" mayBeNull="true"></param>
    /// <param name="element" domElement="true" optional="true" mayBeNull="true"></param>
    /// <returns type="Sys.UI.Component"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", type: Type},
        {name: "properties", mayBeNull: true, optional: true},
        {name: "events", mayBeNull: true, optional: true},
        {name: "references", mayBeNull: true, optional: true},
        {name: "element", mayBeNull: true, domElement: true, optional: true}
    ]);
    if (e) throw e;
    if (!type.inheritsFrom(Sys.Component)) {
        throw Error.argument('type', String.format(Sys.Res.createNotComponent, type.getName()));
    }
    if (type.inheritsFrom(Sys.UI.Behavior) || type.inheritsFrom(Sys.UI.Control)) {
        if (!element) throw Error.argument('element', Sys.Res.createNoDom);
    }
    else if (element) throw Error.argument('element', Sys.Res.createComponentOnDom);
    var component = (element ? new type(element): new type());
    var app = Sys.Application;
    var creatingComponents = app.get_isCreatingComponents();

    component.beginUpdate();
    if (properties) {
        Sys$Component$_setProperties(component, properties);
    }
    if (events) {
        for (var name in events) {
            if (!(component["add_" + name] instanceof Function)) throw new Error.invalidOperation(String.format(Sys.Res.undefinedEvent, name));
            if (!(events[name] instanceof Function)) throw new Error.invalidOperation(Sys.Res.eventHandlerNotFunction);
            component["add_" + name](events[name]);
        }
    }

    if (component.get_id()) {
        app.addComponent(component);
    }
    if (creatingComponents) {
        // DevDiv 81690: Do not add to createdComponent list unless we are in 2 pass mode,
        // which is during the first GET and on partial updates. 
        app._createdComponents[app._createdComponents.length] = component;
        if (references) {
            app._addComponentToSecondPass(component, references);
        }
        else {
            component.endUpdate();
        }
    }
    else {
        if (references) {
            Sys$Component$_setReferences(component, references);
        }
        component.endUpdate();
    }

    return component;
}
 
Sys.UI.MouseButton = function Sys$UI$MouseButton() {
    /// <summary locid="M:J#Sys.UI.MouseButton.#ctor" />
    /// <field name="leftButton" type="Number" integer="true" static="true" locid="F:J#Sys.UI.MouseButton.leftButton"></field>
    /// <field name="middleButton" type="Number" integer="true" static="true" locid="F:J#Sys.UI.MouseButton.middleButton"></field>
    /// <field name="rightButton" type="Number" integer="true" static="true" locid="F:J#Sys.UI.MouseButton.rightButton"></field>
    if (arguments.length !== 0) throw Error.parameterCount();
    throw Error.notImplemented();
}




Sys.UI.MouseButton.prototype = {
    leftButton: 0,
    middleButton: 1,
    rightButton: 2
}
Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");
 
Sys.UI.Key = function Sys$UI$Key() {
    /// <summary locid="M:J#Sys.UI.Key.#ctor" />
    /// <field name="backspace" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.backspace"></field>
    /// <field name="tab" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.tab"></field>
    /// <field name="enter" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.enter"></field>
    /// <field name="esc" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.esc"></field>
    /// <field name="space" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.space"></field>
    /// <field name="pageUp" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.pageUp"></field>
    /// <field name="pageDown" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.pageDown"></field>
    /// <field name="end" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.end"></field>
    /// <field name="home" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.home"></field>
    /// <field name="left" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.left"></field>
    /// <field name="up" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.up"></field>
    /// <field name="right" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.right"></field>
    /// <field name="down" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.down"></field>
    /// <field name="del" type="Number" integer="true" static="true" locid="F:J#Sys.UI.Key.del"></field>
    if (arguments.length !== 0) throw Error.parameterCount();
    throw Error.notImplemented();
}















Sys.UI.Key.prototype = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 127
}
Sys.UI.Key.registerEnum("Sys.UI.Key");
 
Sys.UI.Point = function Sys$UI$Point(x, y) {
    /// <summary locid="M:J#Sys.UI.Point.#ctor" />
    /// <param name="x" type="Number" integer="true"></param>
    /// <param name="y" type="Number" integer="true"></param>
    /// <field name="x" type="Number" integer="true" locid="F:J#Sys.UI.Point.x"></field>
    /// <field name="y" type="Number" integer="true" locid="F:J#Sys.UI.Point.y"></field>
    var e = Function._validateParams(arguments, [
        {name: "x", type: Number, integer: true},
        {name: "y", type: Number, integer: true}
    ]);
    if (e) throw e;
    this.x = x;
    this.y = y;
}
Sys.UI.Point.registerClass('Sys.UI.Point');
 
Sys.UI.Bounds = function Sys$UI$Bounds(x, y, width, height) {
    /// <summary locid="M:J#Sys.UI.Bounds.#ctor" />
    /// <param name="x" type="Number" integer="true"></param>
    /// <param name="y" type="Number" integer="true"></param>
    /// <param name="height" type="Number" integer="true"></param>
    /// <param name="width" type="Number" integer="true"></param>
    /// <field name="x" type="Number" integer="true" locid="F:J#Sys.UI.Bounds.x"></field>
    /// <field name="y" type="Number" integer="true" locid="F:J#Sys.UI.Bounds.y"></field>
    /// <field name="height" type="Number" integer="true" locid="F:J#Sys.UI.Bounds.height"></field>
    /// <field name="width" type="Number" integer="true" locid="F:J#Sys.UI.Bounds.width"></field>
    var e = Function._validateParams(arguments, [
        {name: "x", type: Number, integer: true},
        {name: "y", type: Number, integer: true},
        {name: "height", type: Number, integer: true},
        {name: "width", type: Number, integer: true}
    ]);
    if (e) throw e;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
}
Sys.UI.Bounds.registerClass('Sys.UI.Bounds');
 
Sys.UI.DomEvent = function Sys$UI$DomEvent(eventObject) {
    /// <summary locid="M:J#Sys.UI.DomEvent.#ctor" />
    /// <param name="eventObject"></param>
    /// <field name="altKey" type="Boolean" locid="F:J#Sys.UI.DomEvent.altKey"></field>
    /// <field name="button" type="Sys.UI.MouseButton" locid="F:J#Sys.UI.DomEvent.button"></field>
    /// <field name="charCode" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.charCode"></field>
    /// <field name="clientX" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.clientX"></field>
    /// <field name="clientY" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.clientY"></field>
    /// <field name="ctrlKey" type="Boolean" locid="F:J#Sys.UI.DomEvent.ctrlKey"></field>
    /// <field name="keyCode" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.keyCode"></field>
    /// <field name="offsetX" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.offsetX"></field>
    /// <field name="offsetY" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.offsetY"></field>
    /// <field name="screenX" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.screenX"></field>
    /// <field name="screenY" type="Number" integer="true" locid="F:J#Sys.UI.DomEvent.screenY"></field>
    /// <field name="shiftKey" type="Boolean" locid="F:J#Sys.UI.DomEvent.shiftKey"></field>
    /// <field name="target" locid="F:J#Sys.UI.DomEvent.target"></field>
    /// <field name="type" type="String" locid="F:J#Sys.UI.DomEvent.type"></field>
    var e = Function._validateParams(arguments, [
        {name: "eventObject"}
    ]);
    if (e) throw e;
    var e = eventObject;
    this.rawEvent = e;
    this.altKey = e.altKey;
    if (typeof(e.button) !== 'undefined') {
        this.button = (typeof(e.which) !== 'undefined') ? e.button :
            (e.button === 4) ? Sys.UI.MouseButton.middleButton :
            (e.button === 2) ? Sys.UI.MouseButton.rightButton :
            Sys.UI.MouseButton.leftButton;
    }
    if (e.type === 'keypress') {
        this.charCode = e.charCode || e.keyCode;
    }
    else if (e.keyCode && (e.keyCode === 46)) {
        this.keyCode = 127;
    }
    else {
        this.keyCode = e.keyCode;
    }
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.ctrlKey = e.ctrlKey;
    this.target = e.target ? e.target : e.srcElement;
    if ((typeof(e.offsetX) !== 'undefined') && (typeof(e.offsetY) !== 'undefined')) {
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
    }
    else if (this.target && (this.target.nodeType !== 3) && (typeof(e.clientX) === 'number')) {
        var loc = Sys.UI.DomElement.getLocation(this.target);
        var w = Sys.UI.DomElement._getWindow(this.target);
        this.offsetX = (w.pageXOffset || 0) + e.clientX - loc.x;
        this.offsetY = (w.pageYOffset || 0) + e.clientY - loc.y;
    }
    this.screenX = e.screenX;
    this.screenY = e.screenY;
    this.shiftKey = e.shiftKey;
    this.type = e.type;
}

    function Sys$UI$DomEvent$preventDefault() {
        /// <summary locid="M:J#Sys.UI.DomEvent.preventDefault" />
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this.rawEvent.preventDefault) {
            this.rawEvent.preventDefault();
        }
        else if (window.event) {
            this.rawEvent.returnValue = false;
        }
    }
    function Sys$UI$DomEvent$stopPropagation() {
        /// <summary locid="M:J#Sys.UI.DomEvent.stopPropagation" />
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this.rawEvent.stopPropagation) {
            this.rawEvent.stopPropagation();
        }
        else if (window.event) {
            this.rawEvent.cancelBubble = true;
        }
    }
Sys.UI.DomEvent.prototype = {
    preventDefault: Sys$UI$DomEvent$preventDefault,
    stopPropagation: Sys$UI$DomEvent$stopPropagation
}
Sys.UI.DomEvent.registerClass('Sys.UI.DomEvent');

var $addHandler = Sys.UI.DomEvent.addHandler = function Sys$UI$DomEvent$addHandler(element, eventName, handler) {
    /// <summary locid="M:J#Sys.UI.DomEvent.addHandler" />
    /// <param name="element"></param>
    /// <param name="eventName" type="String"></param>
    /// <param name="handler" type="Function"></param>
    var e = Function._validateParams(arguments, [
        {name: "element"},
        {name: "eventName", type: String},
        {name: "handler", type: Function}
    ]);
    if (e) throw e;
    Sys.UI.DomEvent._ensureDomNode(element);
    if (eventName === "error") throw Error.invalidOperation(Sys.Res.addHandlerCantBeUsedForError);
    if (!element._events) {
        element._events = {};
    }
    var eventCache = element._events[eventName];
    if (!eventCache) {
        element._events[eventName] = eventCache = [];
    }
    var browserHandler;
    if (element.addEventListener) {
        browserHandler = function(e) {
            return handler.call(element, new Sys.UI.DomEvent(e));
        }
        element.addEventListener(eventName, browserHandler, false);
    }
    else if (element.attachEvent) {
        browserHandler = function() {
            // window.event can be denied access in some rare circumstances (DevDiv 68929)
            var e = {};
            // We want to use the window for the event element, not the window for this script (DevDiv 63167)
            try {e = Sys.UI.DomElement._getWindow(element).event} catch(ex) {}
            return handler.call(element, new Sys.UI.DomEvent(e));
        }
        element.attachEvent('on' + eventName, browserHandler);
    }
    eventCache[eventCache.length] = {handler: handler, browserHandler: browserHandler};
}

var $addHandlers = Sys.UI.DomEvent.addHandlers = function Sys$UI$DomEvent$addHandlers(element, events, handlerOwner) {
    /// <summary locid="M:J#Sys.UI.DomEvent.addHandlers" />
    /// <param name="element"></param>
    /// <param name="events" type="Object"></param>
    /// <param name="handlerOwner" optional="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "element"},
        {name: "events", type: Object},
        {name: "handlerOwner", optional: true}
    ]);
    if (e) throw e;
    Sys.UI.DomEvent._ensureDomNode(element);
    for (var name in events) {
        var handler = events[name];
        if (typeof(handler) !== 'function') throw Error.invalidOperation(Sys.Res.cantAddNonFunctionhandler);
        if (handlerOwner) {
            handler = Function.createDelegate(handlerOwner, handler);
        }
        $addHandler(element, name, handler);
    }
}

var $clearHandlers = Sys.UI.DomEvent.clearHandlers = function Sys$UI$DomEvent$clearHandlers(element) {
    /// <summary locid="M:J#Sys.UI.DomEvent.clearHandlers" />
    /// <param name="element"></param>
    var e = Function._validateParams(arguments, [
        {name: "element"}
    ]);
    if (e) throw e;
    Sys.UI.DomEvent._ensureDomNode(element);
    if (element._events) {
        var cache = element._events;
        for (var name in cache) {
            var handlers = cache[name];
            for (var i = handlers.length - 1; i >= 0; i--) {
                $removeHandler(element, name, handlers[i].handler);
            }
        }
        element._events = null;
    }
}

var $removeHandler = Sys.UI.DomEvent.removeHandler = function Sys$UI$DomEvent$removeHandler(element, eventName, handler) {
    /// <summary locid="M:J#Sys.UI.DomEvent.removeHandler" />
    /// <param name="element"></param>
    /// <param name="eventName" type="String"></param>
    /// <param name="handler" type="Function"></param>
    var e = Function._validateParams(arguments, [
        {name: "element"},
        {name: "eventName", type: String},
        {name: "handler", type: Function}
    ]);
    if (e) throw e;
    Sys.UI.DomEvent._ensureDomNode(element);
    var browserHandler = null;
    if ((typeof(element._events) !== 'object') || (element._events == null)) throw Error.invalidOperation(Sys.Res.eventHandlerInvalid);
    var cache = element._events[eventName];
    if (!(cache instanceof Array)) throw Error.invalidOperation(Sys.Res.eventHandlerInvalid);
    for (var i = 0, l = cache.length; i < l; i++) {
        if (cache[i].handler === handler) {
            browserHandler = cache[i].browserHandler;
            break;
        }
    }
    if (typeof(browserHandler) !== 'function') throw Error.invalidOperation(Sys.Res.eventHandlerInvalid);
    if (element.removeEventListener) {
        element.removeEventListener(eventName, browserHandler, false);
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + eventName, browserHandler);
    }
    cache.splice(i, 1);
}

Sys.UI.DomEvent._ensureDomNode = function Sys$UI$DomEvent$_ensureDomNode(element) {
    // DevDiv Bugs 100697: Accessing element.document causes dynamic script nodes to load prematurely.
    // DevDiv Bugs 124696: Firefox warns on undefined property element.tagName, added first part of IF
    if (element.tagName && (element.tagName === "SCRIPT")) return;
    
    var doc = element.ownerDocument || element.document || element;
    // Can't use _getWindow here and compare to the element to check if it's a window
    // because the object Safari exposes as document.defaultView is not the window (DevDiv 100229)
    // Looking at the document property instead to include window in DOM nodes, then comparing to the
    // document for this element and finally look for the nodeType property.
    if ((typeof(element.document) !== 'object') && (element != doc) && (typeof(element.nodeType) !== 'number')) {
        throw Error.argument("element", Sys.Res.argumentDomNode);
    }
}
 
Sys.UI.DomElement = function Sys$UI$DomElement() {
    /// <summary locid="M:J#Sys.UI.DomElement.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    throw Error.notImplemented();
}
Sys.UI.DomElement.registerClass('Sys.UI.DomElement');

Sys.UI.DomElement.addCssClass = function Sys$UI$DomElement$addCssClass(element, className) {
    /// <summary locid="M:J#Sys.UI.DomElement.addCssClass" />
    /// <param name="element" domElement="true"></param>
    /// <param name="className" type="String"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "className", type: String}
    ]);
    if (e) throw e;
    if (!Sys.UI.DomElement.containsCssClass(element, className)) {
        if (element.className === '') {
            element.className = className;
        }
        else {
            element.className += ' ' + className;
        }
    }
}

Sys.UI.DomElement.containsCssClass = function Sys$UI$DomElement$containsCssClass(element, className) {
    /// <summary locid="M:J#Sys.UI.DomElement.containsCssClass" />
    /// <param name="element" domElement="true"></param>
    /// <param name="className" type="String"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "className", type: String}
    ]);
    if (e) throw e;
    return Array.contains(element.className.split(' '), className);
}

Sys.UI.DomElement.getBounds = function Sys$UI$DomElement$getBounds(element) {
    /// <summary locid="M:J#Sys.UI.DomElement.getBounds" />
    /// <param name="element" domElement="true"></param>
    /// <returns type="Sys.UI.Bounds"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true}
    ]);
    if (e) throw e;
    var offset = Sys.UI.DomElement.getLocation(element);

    return new Sys.UI.Bounds(offset.x, offset.y, element.offsetWidth || 0, element.offsetHeight || 0);
}

var $get = Sys.UI.DomElement.getElementById = function Sys$UI$DomElement$getElementById(id, element) {
    /// <summary locid="M:J#Sys.UI.DomElement.getElementById" />
    /// <param name="id" type="String"></param>
    /// <param name="element" domElement="true" optional="true" mayBeNull="true"></param>
    /// <returns domElement="true" mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "id", type: String},
        {name: "element", mayBeNull: true, domElement: true, optional: true}
    ]);
    if (e) throw e;
    if (!element) return document.getElementById(id);
    if (element.getElementById) return element.getElementById(id);

    // Implementation for browsers that don't have getElementById on elements:
    var nodeQueue = [];
    var childNodes = element.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var node = childNodes[i];
        if (node.nodeType == 1) {
            nodeQueue[nodeQueue.length] = node;
        }
    }

    while (nodeQueue.length) {
        node = nodeQueue.shift();
        if (node.id == id) {
            return node;
        }
        childNodes = node.childNodes;
        for (i = 0; i < childNodes.length; i++) {
            node = childNodes[i];
            if (node.nodeType == 1) {
                nodeQueue[nodeQueue.length] = node;
            }
        }
    }

    return null;
}



switch(Sys.Browser.agent) {
    case Sys.Browser.InternetExplorer:
        Sys.UI.DomElement.getLocation = function Sys$UI$DomElement$getLocation(element) {
            /// <summary locid="M:J#Sys.UI.DomElement.getLocation" />
            /// <param name="element" domElement="true"></param>
            /// <returns type="Sys.UI.Point"></returns>
            var e = Function._validateParams(arguments, [
                {name: "element", domElement: true}
            ]);
            if (e) throw e;
            // For a document element, return zero.
            if (element.self || element.nodeType === 9) return new Sys.UI.Point(0,0);
            // Here there is a small inconsistency with what other browsers would give for wrapping elements:
            // the bounding rect can be different from the first rectangle. getBoundingRect is used here
            // because it's more consistent and because clientRects need to be offset by the coordinates
            // of the frame in the parent window, which is not always accessible to script (if it's in a different
            // domain in particular).
            var clientRect = element.getBoundingClientRect();
            if (!clientRect) {
                return new Sys.UI.Point(0,0);
            }
            var documentElement = element.ownerDocument.documentElement;
            // Substracting 2px for the border of the viewport. This can be changed in IE6 by applyting a border
            // to the HTML element but this is not supported by Atlas. It cannot be changed in IE7.
            var offsetX = clientRect.left - 2 + documentElement.scrollLeft,
                offsetY = clientRect.top - 2 + documentElement.scrollTop;
            
            // When the window is an iframe, the frameborder needs to be added. This is only available from
            // script when the parent window is in the same domain as the frame, hence the try/catch.
            try {
                var f = element.ownerDocument.parentWindow.frameElement || null;
                if (f) {
                    // frameBorder has a default of "1" so undefined must map to 0, and "0" and "no" to 2.
                    var offset = (f.frameBorder === "0" || f.frameBorder === "no") ? 2 : 0;
                    offsetX += offset;
                    offsetY += offset;
                }
            }
            catch(ex) {
            }    
            
            return new Sys.UI.Point(offsetX, offsetY);
        }
        break;
    case Sys.Browser.Safari:
        Sys.UI.DomElement.getLocation = function Sys$UI$DomElement$getLocation(element) {
            /// <summary locid="M:J#Sys.UI.DomElement.getLocation" />
            /// <param name="element" domElement="true"></param>
            /// <returns type="Sys.UI.Point"></returns>
            var e = Function._validateParams(arguments, [
                {name: "element", domElement: true}
            ]);
            if (e) throw e;
            // For a document element, return zero.
            if ((element.window && (element.window === element)) || element.nodeType === 9) return new Sys.UI.Point(0,0);

            // Note (to document): in IE, if the elements are not explicitly dimensioned to contain
            // relatively positioned elements they contain, there are bugs in the measured dimensions of elements
            // that can't be worked around and which break this function.
            var offsetX = 0;
            var offsetY = 0;

            var previous = null;
            var previousStyle = null;
            var currentStyle;
            for (var parent = element; parent; previous = parent, previousStyle = currentStyle, parent = parent.offsetParent) {
                currentStyle = Sys.UI.DomElement._getCurrentStyle(parent);
                var tagName = parent.tagName;

                // Safari has a bug that double-counts the body offset for absolutely positioned elements
                // that are direct children of body.
                // Firefox has its own quirk, which is that non-absolutely positioned elements that are
                // direct children of body get the body offset counted twice.
                if ((parent.offsetLeft || parent.offsetTop) &&
                    ((tagName !== "BODY") || (!previousStyle || previousStyle.position !== "absolute"))) {

                    offsetX += parent.offsetLeft;
                    offsetY += parent.offsetTop;
                }
            }

            currentStyle = Sys.UI.DomElement._getCurrentStyle(element);
            var elementPosition = currentStyle ? currentStyle.position : null;
            // If an element is absolutely positioned, its parent's scroll should not be subtracted
            if (!elementPosition || (elementPosition !== "absolute")) {
                // In Firefox and Safari, all parent's scroll values must be taken into account.
                for (var parent = element.parentNode; parent; parent = parent.parentNode) {
                    tagName = parent.tagName;

                    if ((tagName !== "BODY") && (tagName !== "HTML") && (parent.scrollLeft || parent.scrollTop)) {
                        offsetX -= (parent.scrollLeft || 0);
                        offsetY -= (parent.scrollTop || 0);
                    }
                    currentStyle = Sys.UI.DomElement._getCurrentStyle(parent);
                    var parentPosition = currentStyle ? currentStyle.position : null;

                    // If an element is absolutely positioned, its parent's scroll should not be subtracted
                    if (parentPosition && (parentPosition === "absolute")) break;
                }
            }

            return new Sys.UI.Point(offsetX, offsetY);
        }
        break;
    case Sys.Browser.Opera:
        Sys.UI.DomElement.getLocation = function Sys$UI$DomElement$getLocation(element) {
            /// <summary locid="M:J#Sys.UI.DomElement.getLocation" />
            /// <param name="element" domElement="true"></param>
            /// <returns type="Sys.UI.Point"></returns>
            var e = Function._validateParams(arguments, [
                {name: "element", domElement: true}
            ]);
            if (e) throw e;
            // For a document element, return zero.
            if ((element.window && (element.window === element)) || element.nodeType === 9) return new Sys.UI.Point(0,0);

            // Note (to document): in IE, if the elements are not explicitly dimensioned to contain
            // relatively positioned elements they contain, there are bugs in the measured dimensions of elements
            // that can't be worked around and which break this function.
            var offsetX = 0;
            var offsetY = 0;

            var previous = null;
            for (var parent = element; parent; previous = parent, parent = parent.offsetParent) {

                var tagName = parent.tagName;

                offsetX += parent.offsetLeft || 0;
                offsetY += parent.offsetTop || 0;
            }

            // Opera already includes the scrolling into the offsets except for positioned contents.
            var elementPosition = element.style.position;
            var elementPositioned = elementPosition && (elementPosition !== "static");

            // If an element is absolutely positioned, its parent's scroll should not be subtracted, except on Opera.
            for (var parent = element.parentNode; parent; parent = parent.parentNode) {
                tagName = parent.tagName;

                if ((tagName !== "BODY") && (tagName !== "HTML") && (parent.scrollLeft || parent.scrollTop) &&
                    ((elementPositioned &&
                    ((parent.style.overflow === "scroll") || (parent.style.overflow === "auto"))))) {
                    // Opera has scroll values on elements that are not scrolled, like table rows so we
                    // need to explicitly check for overflow mode.

                    offsetX -= (parent.scrollLeft || 0);
                    offsetY -= (parent.scrollTop || 0);
                }
                var parentPosition = (parent && parent.style) ? parent.style.position : null;

                // Opera already includes the scrolling into the offsets except for positioned contents.
                elementPositioned = elementPositioned || (parentPosition && (parentPosition !== "static"));
            }


            return new Sys.UI.Point(offsetX, offsetY);
        }
        break;
    default:
        Sys.UI.DomElement.getLocation = function Sys$UI$DomElement$getLocation(element) {
            /// <summary locid="M:J#Sys.UI.DomElement.getLocation" />
            /// <param name="element" domElement="true"></param>
            /// <returns type="Sys.UI.Point"></returns>
            var e = Function._validateParams(arguments, [
                {name: "element", domElement: true}
            ]);
            if (e) throw e;
            // For a document element, return zero.
            if ((element.window && (element.window === element)) || element.nodeType === 9) return new Sys.UI.Point(0,0);

            var offsetX = 0;
            var offsetY = 0;
            var previous = null;
            var previousStyle = null;
            var currentStyle = null;
            for (var parent = element; parent; previous = parent, previousStyle = currentStyle, parent = parent.offsetParent) {
                var tagName = parent.tagName;
                currentStyle = Sys.UI.DomElement._getCurrentStyle(parent);

                // Firefox has its own quirk, which is that non-absolutely positioned elements that are
                // direct children of body get the body offset counted twice.
                if ((parent.offsetLeft || parent.offsetTop) &&
                    !((tagName === "BODY") &&
                    (!previousStyle || previousStyle.position !== "absolute"))) {

                    offsetX += parent.offsetLeft;
                    offsetY += parent.offsetTop;
                }

                // This code works around a difference in behavior in Opera and Safari which includes
                // clientLeft and clientTop in the computedstyle offset.
                if (previous !== null && currentStyle) {
                    // This is to workaround a known bug in IE and Firefox:
                    // <table> and <td> have strange behavior with offsetLeft/offsetTop and clientLeft/clientTop.
                    // Say you have the following html: <table style="border-width:25px"><tr><td></table>
                    // The offsetLeft and offsetTop for the <td> will be 25, but the client/borderLeft and
                    // client/borderTop for the <table> will also be 25.  So if you count the client/borderLeft and
                    // client/borderTop for the <table>, you will be double-counting the table border.
                    if ((tagName !== "TABLE") && (tagName !== "TD") && (tagName !== "HTML")) {
                        offsetX += parseInt(currentStyle.borderLeftWidth) || 0;
                        offsetY += parseInt(currentStyle.borderTopWidth) || 0;
                    }
                    if (tagName === "TABLE" &&
                        (currentStyle.position === "relative" || currentStyle.position === "absolute")) {
                        offsetX += parseInt(currentStyle.marginLeft) || 0;
                        offsetY += parseInt(currentStyle.marginTop) || 0;
                    }
                }
            }

            currentStyle = Sys.UI.DomElement._getCurrentStyle(element);
            var elementPosition = currentStyle ? currentStyle.position : null;
            // If an element is absolutely positioned, its parent's scroll should not be subtracted, except on Opera.
            if (!elementPosition || (elementPosition !== "absolute")) {
                // In Firefox and Safari, all parent's scroll values must be taken into account.
                // In IE, only the offset parent's because positioned elements are offset-parented to BODY and
                // don't need scroll substraction. Non-positioned elements are offset-parented to their parent,
                // which may be scrolled.
                for (var parent = element.parentNode; parent; parent = parent.parentNode) {
                    // In IE quirks mode, the <body> element has bogus values for scrollLeft and scrollTop.
                    // So we do not use the scrollLeft and scrollTop for the <body> element.  This does not
                    // break the standards mode behavior. (VSWhidbey 426176)
                    tagName = parent.tagName;

                    if ((tagName !== "BODY") && (tagName !== "HTML") && (parent.scrollLeft || parent.scrollTop)) {

                        offsetX -= (parent.scrollLeft || 0);
                        offsetY -= (parent.scrollTop || 0);

                        currentStyle = Sys.UI.DomElement._getCurrentStyle(parent);
                        if (currentStyle) {
                            offsetX += parseInt(currentStyle.borderLeftWidth) || 0;
                            offsetY += parseInt(currentStyle.borderTopWidth) || 0;
                        }
                    }
                }
            }

            return new Sys.UI.Point(offsetX, offsetY);
        }
        break;

}


Sys.UI.DomElement.removeCssClass = function Sys$UI$DomElement$removeCssClass(element, className) {
    /// <summary locid="M:J#Sys.UI.DomElement.removeCssClass" />
    /// <param name="element" domElement="true"></param>
    /// <param name="className" type="String"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "className", type: String}
    ]);
    if (e) throw e;
    var currentClassName = ' ' + element.className + ' ';
    var index = currentClassName.indexOf(' ' + className + ' ');
    if (index >= 0) {
        element.className = (currentClassName.substr(0, index) + ' ' +
            currentClassName.substring(index + className.length + 1, currentClassName.length)).trim();
    }
}

Sys.UI.DomElement.setLocation = function Sys$UI$DomElement$setLocation(element, x, y) {
    /// <summary locid="M:J#Sys.UI.DomElement.setLocation" />
    /// <param name="element" domElement="true"></param>
    /// <param name="x" type="Number" integer="true"></param>
    /// <param name="y" type="Number" integer="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "x", type: Number, integer: true},
        {name: "y", type: Number, integer: true}
    ]);
    if (e) throw e;
    var style = element.style;
    style.position = 'absolute';
    style.left = x + "px";
    style.top = y + "px";
}

Sys.UI.DomElement.toggleCssClass = function Sys$UI$DomElement$toggleCssClass(element, className) {
    /// <summary locid="M:J#Sys.UI.DomElement.toggleCssClass" />
    /// <param name="element" domElement="true"></param>
    /// <param name="className" type="String"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "className", type: String}
    ]);
    if (e) throw e;
    if (Sys.UI.DomElement.containsCssClass(element, className)) {
        Sys.UI.DomElement.removeCssClass(element, className);
    }
    else {
        Sys.UI.DomElement.addCssClass(element, className);
    }
}

Sys.UI.DomElement.getVisibilityMode = function Sys$UI$DomElement$getVisibilityMode(element) {
    /// <summary locid="M:J#Sys.UI.DomElement.getVisibilityMode" />
    /// <param name="element" domElement="true"></param>
    /// <returns type="Sys.UI.VisibilityMode"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true}
    ]);
    if (e) throw e;
    return (element._visibilityMode === Sys.UI.VisibilityMode.hide) ?
        Sys.UI.VisibilityMode.hide :
        Sys.UI.VisibilityMode.collapse;
}
Sys.UI.DomElement.setVisibilityMode = function Sys$UI$DomElement$setVisibilityMode(element, value) {
    /// <summary locid="M:J#Sys.UI.DomElement.setVisibilityMode" />
    /// <param name="element" domElement="true"></param>
    /// <param name="value" type="Sys.UI.VisibilityMode"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "value", type: Sys.UI.VisibilityMode}
    ]);
    if (e) throw e;
    Sys.UI.DomElement._ensureOldDisplayMode(element);
    if (element._visibilityMode !== value) {
        element._visibilityMode = value;
        if (Sys.UI.DomElement.getVisible(element) === false) {
            if (element._visibilityMode === Sys.UI.VisibilityMode.hide) {
                element.style.display = element._oldDisplayMode;
            }
            else {
                element.style.display = 'none';
            }
        }
        element._visibilityMode = value;
    }
}

Sys.UI.DomElement.getVisible = function Sys$UI$DomElement$getVisible(element) {
    /// <summary locid="M:J#Sys.UI.DomElement.getVisible" />
    /// <param name="element" domElement="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true}
    ]);
    if (e) throw e;
    var style = element.currentStyle || Sys.UI.DomElement._getCurrentStyle(element);
    if (!style) return true;
    return (style.visibility !== 'hidden') && (style.display !== 'none');
}
Sys.UI.DomElement.setVisible = function Sys$UI$DomElement$setVisible(element, value) {
    /// <summary locid="M:J#Sys.UI.DomElement.setVisible" />
    /// <param name="element" domElement="true"></param>
    /// <param name="value" type="Boolean"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "value", type: Boolean}
    ]);
    if (e) throw e;
    if (value !== Sys.UI.DomElement.getVisible(element)) {
        Sys.UI.DomElement._ensureOldDisplayMode(element);
        element.style.visibility = value ? 'visible' : 'hidden';
        if (value || (element._visibilityMode === Sys.UI.VisibilityMode.hide)) {
            element.style.display = element._oldDisplayMode;
        }
        else {
            element.style.display = 'none';
        }
    }
}

Sys.UI.DomElement._ensureOldDisplayMode = function Sys$UI$DomElement$_ensureOldDisplayMode(element) {
    if (!element._oldDisplayMode) {
        var style = element.currentStyle || Sys.UI.DomElement._getCurrentStyle(element);
        element._oldDisplayMode = style ? style.display : null;
        if (!element._oldDisplayMode || element._oldDisplayMode === 'none') {
            // Default is different depending on the tag name (omitting deprecated and non-standard tags)
            switch(element.tagName.toUpperCase()) {
                case 'DIV': case 'P': case 'ADDRESS': case 'BLOCKQUOTE': case 'BODY': case 'COL':
                case 'COLGROUP': case 'DD': case 'DL': case 'DT': case 'FIELDSET': case 'FORM':
                case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6': case 'HR':
                case 'IFRAME': case 'LEGEND': case 'OL': case 'PRE': case 'TABLE': case 'TD':
                case 'TH': case 'TR': case 'UL':
                    element._oldDisplayMode = 'block';
                    break;
                case 'LI':
                    element._oldDisplayMode = 'list-item';
                    break;
                default:
                    element._oldDisplayMode = 'inline';
            }
        }
    }
}

Sys.UI.DomElement._getWindow = function Sys$UI$DomElement$_getWindow(element) {
    var doc = element.ownerDocument || element.document || element;
    return doc.defaultView || doc.parentWindow;
}

Sys.UI.DomElement._getCurrentStyle = function Sys$UI$DomElement$_getCurrentStyle(element) {
    if (element.nodeType === 3) return null;
    var w = Sys.UI.DomElement._getWindow(element);
    if (element.documentElement) element = element.documentElement;
    var computedStyle = (w && (element !== w) && w.getComputedStyle) ?
        w.getComputedStyle(element, null) :
        element.currentStyle || element.style;
    if (!computedStyle && (Sys.Browser.agent === Sys.Browser.Safari) && element.style) {
        // Safari has an interesting bug (fixed in WebKit) where an element with display:none will have a null computed style.
        var oldDisplay = element.style.display;
        var oldPosition = element.style.position;
        element.style.position = 'absolute';
        element.style.display = 'block';
        var style = w.getComputedStyle(element, null);
        element.style.display = oldDisplay;
        element.style.position = oldPosition;
        // Need a clone as the display property may be wrong and can't be fixed on the original object.
        computedStyle = {};
        for (var n in style) {
            computedStyle[n] = style[n];
        }
        computedStyle.display = 'none';
    }
    return computedStyle;
}
 
Sys.IContainer = function Sys$IContainer() {
    throw Error.notImplemented();
}

    function Sys$IContainer$addComponent(component) {
        /// <summary locid="M:J#Sys.IContainer.addComponent" />
        /// <param name="component" type="Sys.Component"></param>
        var e = Function._validateParams(arguments, [
            {name: "component", type: Sys.Component}
        ]);
        if (e) throw e;
        throw Error.notImplemented();
    }
    function Sys$IContainer$removeComponent(component) {
        /// <summary locid="M:J#Sys.IContainer.removeComponent" />
        /// <param name="component" type="Sys.Component"></param>
        var e = Function._validateParams(arguments, [
            {name: "component", type: Sys.Component}
        ]);
        if (e) throw e;
        throw Error.notImplemented();
    }
    function Sys$IContainer$findComponent(id) {
        /// <summary locid="M:J#Sys.IContainer.findComponent" />
        /// <param name="id" type="String"></param>
        /// <returns type="Sys.Component"></returns>
        var e = Function._validateParams(arguments, [
            {name: "id", type: String}
        ]);
        if (e) throw e;
        throw Error.notImplemented();
    }
    function Sys$IContainer$getComponents() {
        /// <summary locid="M:J#Sys.IContainer.getComponents" />
        /// <returns type="Array" elementType="Sys.Component"></returns>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
Sys.IContainer.prototype = {
    addComponent: Sys$IContainer$addComponent,
    removeComponent: Sys$IContainer$removeComponent,
    findComponent: Sys$IContainer$findComponent,
    getComponents: Sys$IContainer$getComponents
}
Sys.IContainer.registerInterface("Sys.IContainer");

 
// This ScriptLoader works by injecting script tags into the DOM sequentially, waiting for each script
// to finish loading before proceeding to the next one.
// It supports a timeout which applies to ALL scripts.
// A call to Sys.Application.notifyScriptLoaded() must be at the bottom of each script, as that is 
// the only reliable way to know when the script has finished loading in all browsers.
// It does however attach to the loaded, readystatechange, and error events on the script element, and it uses
// these event handlers to know when the script has loaded but the call to notifyScriptLoaded may not have been
// executed, which is treated as an error.

Sys._ScriptLoader = function Sys$_ScriptLoader() {
    this._scriptsToLoad = null;
    this._scriptLoadedDelegate = Function.createDelegate(this, this._scriptLoadedHandler);
}

    function Sys$_ScriptLoader$dispose() {
        this._stopLoading();
        if(this._events) {
            delete this._events;
        }
        this._scriptLoadedDelegate = null;        
    }

    function Sys$_ScriptLoader$loadScripts(scriptTimeout, allScriptsLoadedCallback, scriptLoadFailedCallback, scriptLoadTimeoutCallback) {
        /// <summary locid="M:J#Sys._ScriptLoader.loadScripts" />
        /// <param name="scriptTimeout" type="Number" integer="true"></param>
        /// <param name="allScriptsLoadedCallback" type="Function" mayBeNull="true"></param>
        /// <param name="scriptLoadFailedCallback" type="Function" mayBeNull="true"></param>
        /// <param name="scriptLoadTimeoutCallback" type="Function" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "scriptTimeout", type: Number, integer: true},
            {name: "allScriptsLoadedCallback", type: Function, mayBeNull: true},
            {name: "scriptLoadFailedCallback", type: Function, mayBeNull: true},
            {name: "scriptLoadTimeoutCallback", type: Function, mayBeNull: true}
        ]);
        if (e) throw e;
        if(this._loading) {
            throw Error.invalidOperation(Sys.Res.scriptLoaderAlreadyLoading);
        }
        this._loading = true;
        this._allScriptsLoadedCallback = allScriptsLoadedCallback;
        this._scriptLoadFailedCallback = scriptLoadFailedCallback;
        this._scriptLoadTimeoutCallback = scriptLoadTimeoutCallback;
        
        this._loadScriptsInternal();
    }

    function Sys$_ScriptLoader$notifyScriptLoaded() {
        /// <summary locid="M:J#Sys._ScriptLoader.notifyScriptLoaded" />
        if (arguments.length !== 0) throw Error.parameterCount();
        
        // called at the bottom of scripts that have been loaded. This is how we know the script is finished
        // mainly for Safari which doesn't support the load event.
        if(!this._loading) {
            // this can happen if someone disposes() the Script Loader while it is loading scripts
            // OR if someone includes a reference inline -- which should be a no-op
            return;
        }

        this._currentTask._notified++;
        
        if(Sys.Browser.agent === Sys.Browser.Safari) {           
            if(this._currentTask._notified === 1) {
                // the loaded event is never going to happen in Safari. But once we know that script within the loaded script
                // is executing, we can know when it is finished by setting a 0 timeout, it will run after the loaded script
                // is finished.
                // On the first (and only the first) notification for this script, set a timeout that processes the script
                // as if its loaded event fired. Only the first notification because if we did it for all we'd get one loaded event
                // for each call.
                window.setTimeout(Function.createDelegate(this, function() {
                    this._scriptLoadedHandler(this._currentTask.get_scriptElement(), true);
                }), 0);
            }
        }

        // in other browsers, the loaded handler will be called natively by the loaded/readystatechange event.
        // Waiting rather than processing the next script immediately means we can detect scripts that incorrectly contain
        // multiple notifyScriptLoaded() callbacks.
    }

    function Sys$_ScriptLoader$queueCustomScriptTag(scriptAttributes) {
        /// <summary locid="M:J#Sys._ScriptLoader.queueCustomScriptTag" />
        /// <param name="scriptAttributes" mayBeNull="false"></param>
        var e = Function._validateParams(arguments, [
            {name: "scriptAttributes"}
        ]);
        if (e) throw e;
        if(!this._scriptsToLoad) {
            this._scriptsToLoad = [];
        }
        Array.add(this._scriptsToLoad, scriptAttributes);
    }

    function Sys$_ScriptLoader$queueScriptBlock(scriptContent) {
        /// <summary locid="M:J#Sys._ScriptLoader.queueScriptBlock" />
        /// <param name="scriptContent" type="String" mayBeNull="false"></param>
        var e = Function._validateParams(arguments, [
            {name: "scriptContent", type: String}
        ]);
        if (e) throw e;
        if(!this._scriptsToLoad) {
            this._scriptsToLoad = [];
        }
        Array.add(this._scriptsToLoad, {text: scriptContent});
    }

    function Sys$_ScriptLoader$queueScriptReference(scriptUrl) {
        /// <summary locid="M:J#Sys._ScriptLoader.queueScriptReference" />
        /// <param name="scriptUrl" type="String" mayBeNull="false"></param>
        var e = Function._validateParams(arguments, [
            {name: "scriptUrl", type: String}
        ]);
        if (e) throw e;
        if(!this._scriptsToLoad) {
            this._scriptsToLoad = [];
        }
        Array.add(this._scriptsToLoad, {src: scriptUrl});
    }

    function Sys$_ScriptLoader$_createScriptElement(queuedScript) {
        var scriptElement = document.createElement('SCRIPT');

        // Initialize default script type to JavaScript - but it might get overwritten
        // if a custom script tag has a different type attribute.
        scriptElement.type = 'text/javascript';

        // Apply script element attributes
        for (var attr in queuedScript) {
            scriptElement[attr] = queuedScript[attr];
        }
        
        return scriptElement;
    }

    function Sys$_ScriptLoader$_loadScriptsInternal() {
        // Load up the next script in the list
        if (this._scriptsToLoad && this._scriptsToLoad.length > 0) {
            var nextScript = Array.dequeue(this._scriptsToLoad);
            // Inject a script element into the DOM
            var scriptElement = this._createScriptElement(nextScript);
            
            if (scriptElement.text && Sys.Browser.agent === Sys.Browser.Safari) {
                // Safari requires the inline script to be in the innerHTML attribute
                scriptElement.innerHTML = scriptElement.text;
                delete scriptElement.text;
            }            

            // AtlasWhidbey 36149: If they queue an empty script block "", we can't tell the difference between
            //                     a script block queue entry and a src entry with just if(!element.text).
            // dont use scriptElement.src --> FF resolves that to the current directory, IE leaves it blank.
            // nextScript.src is always a string if it's a non block script.
            if (typeof(nextScript.src) === "string") {
                // We only need to worry about timing out and loading if the script tag has a 'src'.
                this._currentTask = new Sys._ScriptLoaderTask(scriptElement, this._scriptLoadedDelegate);
                // note: task is responsible for disposing of _itself_. This is necessary so that the ScriptLoader can continue
                //       with script loading after a script notifies it has loaded. The task sticks around until the dom element finishes
                //       completely, and disposes itself automatically.
                // note: its possible for notify to occur before this method even returns in IE! So it should remain the last possible statement.
                this._currentTask.execute();
            }
            else {
                // script is literal script, so just load the script by adding the new element to the DOM
                document.getElementsByTagName('HEAD')[0].appendChild(scriptElement);
                
                // DevDiv 74151: Do not assume the script executes synchronously. Use a setTimeout to delay
                // proceeding, which ensures the script executes before we continue. This was first introduced
                // as a workaround for a Firefox bug, but we do it for all browsers in order to avoid making
                // an assumption that may be wrong in the future. Executing the script synchronously is not
                // in any spec or recommendation.
                var scriptLoader = this; // used in the setTimeout closure
                window.setTimeout(function() {
                    // cleanup (removes the script element in release mode).
                    Sys._ScriptLoader._clearScript(scriptElement);
                    // Resume script loading progress.
                    scriptLoader._loadScriptsInternal();
                }, 0);
            }
        }
        else {
            // When there are no more scripts to load, call the final event
            var callback = this._allScriptsLoadedCallback;
            this._stopLoading();
            if(callback) {
                callback(this);
            }
        }
    }

    function Sys$_ScriptLoader$_raiseError(multipleCallbacks) {
        // Abort script loading and raise an error.
        var callback = this._scriptLoadFailedCallback;
        var scriptElement = this._currentTask.get_scriptElement();
        this._stopLoading();
        
        if(callback) {
            callback(this, scriptElement, multipleCallbacks);
        }
        else {
            throw Sys._ScriptLoader._errorScriptLoadFailed(scriptElement.src, multipleCallbacks);
        }
    }

    function Sys$_ScriptLoader$_scriptLoadedHandler(scriptElement, loaded) {
        // called by the ScriptLoaderTask when the script element has finished loading, which could be because it loaded or
        // errored out (for browsers that support the error event).
        // In Safari this is called indirectly via a setTimeout in the notifyScriptLoaded method.
        if(loaded && this._currentTask._notified) {
            if(this._currentTask._notified > 1) {
                // the script contained more than one notify callback
                this._raiseError(true);
            }
            else {
                // script loaded and contained a single notify callback, move on to next script
                // DevDiv Bugs 123213: Note that scriptElement.src is read as un-htmlencoded, even if it was html encoded originally
                Array.add(Sys._ScriptLoader._getLoadedScripts(), scriptElement.src);
                this._currentTask.dispose();
                this._currentTask = null;
                this._loadScriptsInternal();
            }
        }
        else {
            // script loaded with an error or it did not contain a notify callback.
            this._raiseError(false);
        }
    }

    function Sys$_ScriptLoader$_scriptLoadTimeoutHandler() {
        var callback = this._scriptLoadTimeoutCallback;
        this._stopLoading();

        if(callback) {
            callback(this);
        }
    }

    function Sys$_ScriptLoader$_stopLoading() {
        if(this._timeoutCookie) {
            window.clearTimeout(this._timeoutCookie);
            this._timeoutCookie = null;
        }

        if(this._currentTask) {
            this._currentTask.dispose();
            this._currentTask = null;
        }

        this._scriptsToLoad = null;
        this._loading = null;
        
        this._allScriptsLoadedCallback = null;
        this._scriptLoadFailedCallback = null;
        this._scriptLoadTimeoutCallback = null;
    }
Sys._ScriptLoader.prototype = {
    dispose: Sys$_ScriptLoader$dispose,
    loadScripts: Sys$_ScriptLoader$loadScripts,
    notifyScriptLoaded: Sys$_ScriptLoader$notifyScriptLoaded,
    queueCustomScriptTag: Sys$_ScriptLoader$queueCustomScriptTag,
    queueScriptBlock: Sys$_ScriptLoader$queueScriptBlock,
    queueScriptReference: Sys$_ScriptLoader$queueScriptReference,
    _createScriptElement: Sys$_ScriptLoader$_createScriptElement,   
    _loadScriptsInternal: Sys$_ScriptLoader$_loadScriptsInternal,
    _raiseError: Sys$_ScriptLoader$_raiseError,
    _scriptLoadedHandler: Sys$_ScriptLoader$_scriptLoadedHandler,
    _scriptLoadTimeoutHandler: Sys$_ScriptLoader$_scriptLoadTimeoutHandler,
    _stopLoading: Sys$_ScriptLoader$_stopLoading    
}
Sys._ScriptLoader.registerClass('Sys._ScriptLoader', null, Sys.IDisposable);

Sys._ScriptLoader.getInstance = function Sys$_ScriptLoader$getInstance() {
    var sl = Sys._ScriptLoader._activeInstance;
    if(!sl) {
        sl = Sys._ScriptLoader._activeInstance = new Sys._ScriptLoader();
    }
    return sl;
}

Sys._ScriptLoader.isScriptLoaded = function Sys$_ScriptLoader$isScriptLoaded(scriptSrc) {
    // For Firefox we need to resolve the script src attribute
    // since the script elements already in the DOM are always
    // resolved. To do this we create a dummy element to see
    // what it would resolve to.
    var dummyScript = document.createElement('script');
    dummyScript.src = scriptSrc;
    return Array.contains(Sys._ScriptLoader._getLoadedScripts(), dummyScript.src);
}

Sys._ScriptLoader.readLoadedScripts = function Sys$_ScriptLoader$readLoadedScripts() {
    // enumerates the SCRIPT elements in the DOM and ensures we have their SRC's in the referencedScripts array.
    if(!Sys._ScriptLoader._referencedScripts) {
        var referencedScripts = Sys._ScriptLoader._referencedScripts = [];

        var existingScripts = document.getElementsByTagName('SCRIPT');
        for (i = existingScripts.length - 1; i >= 0; i--) {
            var scriptNode = existingScripts[i];
            var scriptSrc = scriptNode.src;
            if (scriptSrc.length) {
                if (!Array.contains(referencedScripts, scriptSrc)) {
                    Array.add(referencedScripts, scriptSrc);
                }
            }
        }
    }
}

Sys._ScriptLoader._clearScript = function Sys$_ScriptLoader$_clearScript(scriptElement) {
    if (!Sys.Debug.isDebug) {
        // In release mode we clear out the script elements that we add
        // so that they don't clutter up the DOM.
        scriptElement.parentNode.removeChild(scriptElement);
    }
}

Sys._ScriptLoader._errorScriptLoadFailed = function Sys$_ScriptLoader$_errorScriptLoadFailed(scriptUrl, multipleCallbacks) {
    var errorMessage;
    if(multipleCallbacks) {
        errorMessage = Sys.Res.scriptLoadMultipleCallbacks;
    }
    else {
        // a much more detailed message is displayed in debug mode
        errorMessage = Sys.Res.scriptLoadFailedDebug;
    }

    var displayMessage = "Sys.ScriptLoadFailedException: " + String.format(errorMessage, scriptUrl);
    var e = Error.create(displayMessage, {name: 'Sys.ScriptLoadFailedException', 'scriptUrl': scriptUrl });
    e.popStackFrame();
    return e;
}

Sys._ScriptLoader._getLoadedScripts = function Sys$_ScriptLoader$_getLoadedScripts() {
    if(!Sys._ScriptLoader._referencedScripts) {
        Sys._ScriptLoader._referencedScripts = [];
        Sys._ScriptLoader.readLoadedScripts();
    }
    return Sys._ScriptLoader._referencedScripts;
}
 
// ScriptLoaderTask loads a single script by injecting a dynamic script tag into the DOM.
// It calls the completed callback when the script element's load/readystatechange or error event occus.
// The ScriptLoader itself increments the _notified field each time notifyScriptLoaded is called from
// within the script (it should only be once). When the completed callback is called, ScriptLoader ensures
// the script was successfully loaded and contained exactly 1 notifyScriptLoaded callback.
// The task should be disposed of after use, as it contains references to the script element.

Sys._ScriptLoaderTask = function Sys$_ScriptLoaderTask(scriptElement, completedCallback) {
    /// <summary locid="M:J#Sys._ScriptLoaderTask.#ctor" />
    /// <param name="scriptElement" domElement="true"></param>
    /// <param name="completedCallback" type="Function"></param>
    var e = Function._validateParams(arguments, [
        {name: "scriptElement", domElement: true},
        {name: "completedCallback", type: Function}
    ]);
    if (e) throw e;
    this._scriptElement = scriptElement;
    this._completedCallback = completedCallback;
    this._notified = 0;
}

    function Sys$_ScriptLoaderTask$get_scriptElement() {
        /// <value domElement="true" locid="P:J#Sys._ScriptLoaderTask.scriptElement"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._scriptElement;
    }

    function Sys$_ScriptLoaderTask$dispose() {
        // disposes of the task by removing the load handlers, aborting the window timeout, and releasing the ref to the dom element
        if(this._disposed) {
            // already disposed
            return;
        }
        this._disposed = true;
        this._removeScriptElementHandlers();
        // remove script element from DOM
        Sys._ScriptLoader._clearScript(this._scriptElement);
        this._scriptElement = null;
    }

    function Sys$_ScriptLoaderTask$execute() {
        /// <summary locid="M:J#Sys._ScriptLoaderTask.execute" />
        if (arguments.length !== 0) throw Error.parameterCount();
        this._addScriptElementHandlers();
        document.getElementsByTagName('HEAD')[0].appendChild(this._scriptElement);
    }

    function Sys$_ScriptLoaderTask$_addScriptElementHandlers() {
        // adds the necessary event handlers to the script node to know when it is finished loading
        this._scriptLoadDelegate = Function.createDelegate(this, this._scriptLoadHandler);
        
        if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) {
            this._scriptElement.readyState = 'loaded';
            $addHandler(this._scriptElement, 'load', this._scriptLoadDelegate);
        }
        else {
            $addHandler(this._scriptElement, 'readystatechange', this._scriptLoadDelegate);
        }    
        // FF throws onerror if the script doesn't exist, not loaded.
        // DevDev Bugs 86101 -- cant use DomElement.addHandler because it throws for 'error' events.
        if (this._scriptElement.addEventListener) {
            this._scriptErrorDelegate = Function.createDelegate(this, this._scriptErrorHandler);
            this._scriptElement.addEventListener('error', this._scriptErrorDelegate, false);
        }
    }

    function Sys$_ScriptLoaderTask$_removeScriptElementHandlers() {
        // removes the load and error handlers from the script element
        if(this._scriptLoadDelegate) {
            var scriptElement = this.get_scriptElement();
            if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) {
                $removeHandler(scriptElement, 'load', this._scriptLoadDelegate);
            }
            else {
                $removeHandler(scriptElement, 'readystatechange', this._scriptLoadDelegate);
            }
            if (this._scriptErrorDelegate) {
                // DevDev Bugs 86101 -- cant use DomElement.removeHandler because addHandler throws for 'error' events.
                this._scriptElement.removeEventListener('error', this._scriptErrorDelegate, false);
                this._scriptErrorDelegate = null;
            }
            this._scriptLoadDelegate = null;
        }
    }

    function Sys$_ScriptLoaderTask$_scriptErrorHandler() {
        // handler for when the script element's error event occurs
        if(this._disposed) {
            return;
        }
        
        // false == did not load successfully (404, etc)
        this._completedCallback(this.get_scriptElement(), false);
    }

    function Sys$_ScriptLoaderTask$_scriptLoadHandler() {
        // handler for when the script element's load/readystatechange event occurs
        if(this._disposed) {
            return;
        }

        var scriptElement = this.get_scriptElement();
        if ((scriptElement.readyState !== 'loaded') &&
            (scriptElement.readyState !== 'complete')) {
            return;
        }
        
        // process the loaded event on a timeout so it is queued behind the task that executes the referenced script.
        // Without this, if there is an alert open, the loaded event can occur BEFORE the script itself executes, leading
        // us to believe the script did not contain the notify callback when really it just hasn't executed yet.
        // The timeout ensures we don't run that logic until after the script has a chance to execute.
        var _this = this;
        window.setTimeout(function() {
            _this._completedCallback(scriptElement, true);
        }, 0);
    }
Sys._ScriptLoaderTask.prototype = {
    get_scriptElement: Sys$_ScriptLoaderTask$get_scriptElement,
    dispose: Sys$_ScriptLoaderTask$dispose,
    execute: Sys$_ScriptLoaderTask$execute,
    _addScriptElementHandlers: Sys$_ScriptLoaderTask$_addScriptElementHandlers,    
    _removeScriptElementHandlers: Sys$_ScriptLoaderTask$_removeScriptElementHandlers,    
    _scriptErrorHandler: Sys$_ScriptLoaderTask$_scriptErrorHandler,
    _scriptLoadHandler: Sys$_ScriptLoaderTask$_scriptLoadHandler  
}
Sys._ScriptLoaderTask.registerClass("Sys._ScriptLoaderTask", null, Sys.IDisposable);
 
Sys.ApplicationLoadEventArgs = function Sys$ApplicationLoadEventArgs(components, isPartialLoad) {
    /// <summary locid="M:J#Sys.ApplicationLoadEventArgs.#ctor" />
    /// <param name="components" type="Array" elementType="Sys.Component"></param>
    /// <param name="isPartialLoad" type="Boolean"></param>
    var e = Function._validateParams(arguments, [
        {name: "components", type: Array, elementType: Sys.Component},
        {name: "isPartialLoad", type: Boolean}
    ]);
    if (e) throw e;
    Sys.ApplicationLoadEventArgs.initializeBase(this);
    this._components = components;
    this._isPartialLoad = isPartialLoad;
}
 
    function Sys$ApplicationLoadEventArgs$get_components() {
        /// <value type="Array" elementType="Sys.Component" locid="P:J#Sys.ApplicationLoadEventArgs.components"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._components;
    }
    function Sys$ApplicationLoadEventArgs$get_isPartialLoad() {
        /// <value type="Boolean" locid="P:J#Sys.ApplicationLoadEventArgs.isPartialLoad"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._isPartialLoad;
    }
Sys.ApplicationLoadEventArgs.prototype = {
    get_components: Sys$ApplicationLoadEventArgs$get_components,
    get_isPartialLoad: Sys$ApplicationLoadEventArgs$get_isPartialLoad
}
Sys.ApplicationLoadEventArgs.registerClass('Sys.ApplicationLoadEventArgs', Sys.EventArgs);
 
Sys._Application = function Sys$_Application() {
    Sys._Application.initializeBase(this);

    this._disposableObjects = [];
    this._components = {};
    this._createdComponents = [];
    this._secondPassComponents = [];

    this._unloadHandlerDelegate = Function.createDelegate(this, this._unloadHandler);
    this._loadHandlerDelegate = Function.createDelegate(this, this._loadHandler);

    Sys.UI.DomEvent.addHandler(window, "unload", this._unloadHandlerDelegate);
    Sys.UI.DomEvent.addHandler(window, "load", this._loadHandlerDelegate);
}




    function Sys$_Application$get_isCreatingComponents() {
        /// <value type="Boolean" locid="P:J#Sys._Application.isCreatingComponents"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._creatingComponents;
    }
    function Sys$_Application$add_load(handler) {
        /// <summary locid="E:J#Sys._Application.load" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().addHandler("load", handler);
    }
    function Sys$_Application$remove_load(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().removeHandler("load", handler);
    }
    function Sys$_Application$add_init(handler) {
        /// <summary locid="E:J#Sys._Application.init" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        if (this._initialized) {
            handler(this, Sys.EventArgs.Empty);
        }
        else {
            this.get_events().addHandler("init", handler);
        }
    }
    function Sys$_Application$remove_init(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().removeHandler("init", handler);
    }
    function Sys$_Application$add_unload(handler) {
        /// <summary locid="E:J#Sys._Application.unload" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().addHandler("unload", handler);
    }
    function Sys$_Application$remove_unload(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this.get_events().removeHandler("unload", handler);
    }
    function Sys$_Application$addComponent(component) {
        /// <summary locid="M:J#Sys._Application.addComponent" />
        /// <param name="component" type="Sys.Component"></param>
        var e = Function._validateParams(arguments, [
            {name: "component", type: Sys.Component}
        ]);
        if (e) throw e;
        var id = component.get_id();
        if (!id) throw Error.invalidOperation(Sys.Res.cantAddWithoutId);
        if (typeof(this._components[id]) !== 'undefined') throw Error.invalidOperation(String.format(Sys.Res.appDuplicateComponent, id));
        this._components[id] = component;
    }
    function Sys$_Application$beginCreateComponents() {
        this._creatingComponents = true;
    }
    function Sys$_Application$dispose() {
        if (!this._disposing) {
            this._disposing = true;
            if (window.pageUnload) {
                window.pageUnload(this, Sys.EventArgs.Empty);
            }
            var unloadHandler = this.get_events().getHandler("unload");
            if (unloadHandler) {
                unloadHandler(this, Sys.EventArgs.Empty);
            }
            var disposableObjects = Array.clone(this._disposableObjects);
            for (var i = 0, l = disposableObjects.length; i < l; i++) {
                disposableObjects[i].dispose();
            }
            Array.clear(this._disposableObjects);

            Sys.UI.DomEvent.removeHandler(window, "unload", this._unloadHandlerDelegate);
            if(this._loadHandlerDelegate) {
                Sys.UI.DomEvent.removeHandler(window, "load", this._loadHandlerDelegate);
                this._loadHandlerDelegate = null;
            }

            var sl = Sys._ScriptLoader.getInstance();
            if(sl) {
                sl.dispose();
            }

            Sys._Application.callBaseMethod(this, 'dispose');
        }
    }
    function Sys$_Application$endCreateComponents() {
        var components = this._secondPassComponents;
        for (var i = 0, l = components.length; i < l; i++) {
            var component = components[i].component;
            Sys$Component$_setReferences(component, components[i].references);
            component.endUpdate();
        }
        this._secondPassComponents = [];
        this._creatingComponents = false;
    }
    function Sys$_Application$findComponent(id, parent) {
        /// <summary locid="M:J#Sys._Application.findComponent" />
        /// <param name="id" type="String"></param>
        /// <param name="parent" optional="true" mayBeNull="true"></param>
        /// <returns type="Sys.Component" mayBeNull="true"></returns>
        var e = Function._validateParams(arguments, [
            {name: "id", type: String},
            {name: "parent", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        // Need to reference the application singleton directly beause the $find alias
        // points to the instance function without context. The 'this' pointer won't work here.
        return (parent ?
            ((Sys.IContainer.isInstanceOfType(parent)) ?
                parent.findComponent(id) :
                parent[id] || null) :
            Sys.Application._components[id] || null);
    }
    function Sys$_Application$getComponents() {
        /// <summary locid="M:J#Sys._Application.getComponents" />
        /// <returns type="Array" elementType="Sys.Component"></returns>
        if (arguments.length !== 0) throw Error.parameterCount();
        var res = [];
        var components = this._components;
        for (var name in components) {
            res[res.length] = components[name];
        }
        return res;
    }
    function Sys$_Application$initialize() {
        if(!this._initialized && !this._initializing) {
            this._initializing = true;
            // Raise the init events on a timeout so it is queued. This delays the component creation until after the body is
            // is ready for use. Without this, if a component adds a dom element to body it will be modifying the body before
            // window.onload, which causes an "operation aborted" error in IE. We use this trick for all browsers for consistency.
            window.setTimeout(Function.createDelegate(this, this._doInitialize), 0);
        }
    }
    function Sys$_Application$notifyScriptLoaded() {
        /// <summary locid="M:J#Sys._Application.notifyScriptLoaded" />
        if (arguments.length !== 0) throw Error.parameterCount();
        var sl = Sys._ScriptLoader.getInstance();
        if(sl) {
            sl.notifyScriptLoaded();
        }
    }
    function Sys$_Application$registerDisposableObject(object) {
        /// <summary locid="M:J#Sys._Application.registerDisposableObject" />
        /// <param name="object" type="Sys.IDisposable"></param>
        var e = Function._validateParams(arguments, [
            {name: "object", type: Sys.IDisposable}
        ]);
        if (e) throw e;
        if (!this._disposing) {
            this._disposableObjects[this._disposableObjects.length] = object;
        }
    }
    function Sys$_Application$raiseLoad() {
        var h = this.get_events().getHandler("load");
        var args = new Sys.ApplicationLoadEventArgs(Array.clone(this._createdComponents), !this._initializing);
        if (h) {
            h(this, args);
        }

        if (window.pageLoad) {
            window.pageLoad(this, args);
        }
        this._createdComponents = [];
    }
    function Sys$_Application$removeComponent(component) {
        /// <summary locid="M:J#Sys._Application.removeComponent" />
        /// <param name="component" type="Sys.Component"></param>
        var e = Function._validateParams(arguments, [
            {name: "component", type: Sys.Component}
        ]);
        if (e) throw e;
        var id = component.get_id();
        if (id) delete this._components[id];
    }
    function Sys$_Application$unregisterDisposableObject(object) {
        /// <summary locid="M:J#Sys._Application.unregisterDisposableObject" />
        /// <param name="object" type="Sys.IDisposable"></param>
        var e = Function._validateParams(arguments, [
            {name: "object", type: Sys.IDisposable}
        ]);
        if (e) throw e;
        if (!this._disposing) {
            Array.remove(this._disposableObjects, object);
        }
    }
    function Sys$_Application$_addComponentToSecondPass(component, references) {
        this._secondPassComponents[this._secondPassComponents.length] = {component: component, references: references};
    }
    function Sys$_Application$_doInitialize() {
        Sys._Application.callBaseMethod(this, 'initialize');

        var handler = this.get_events().getHandler("init");
        if (handler) {
            this.beginCreateComponents();
            handler(this, Sys.EventArgs.Empty);
            this.endCreateComponents();
        }
        this.raiseLoad();
        this._initializing = false;
    }
    function Sys$_Application$_loadHandler() {
        // Called from window.onload. Note that the app may already be initialized because SM inlines a call to app.initialize.
        // Who ever calls it first, wins.
        if(this._loadHandlerDelegate) {
            Sys.UI.DomEvent.removeHandler(window, "load", this._loadHandlerDelegate);
            this._loadHandlerDelegate = null;
        }
        this.initialize();
    }
    function Sys$_Application$_unloadHandler(event) {
        this.dispose();
    }
Sys._Application.prototype = {
    _creatingComponents: false,
    _disposing: false,
    get_isCreatingComponents: Sys$_Application$get_isCreatingComponents,
    add_load: Sys$_Application$add_load,
    remove_load: Sys$_Application$remove_load,
    add_init: Sys$_Application$add_init,
    remove_init: Sys$_Application$remove_init,
    add_unload: Sys$_Application$add_unload,
    remove_unload: Sys$_Application$remove_unload,
    addComponent: Sys$_Application$addComponent,
    beginCreateComponents: Sys$_Application$beginCreateComponents,
    dispose: Sys$_Application$dispose,
    endCreateComponents: Sys$_Application$endCreateComponents,
    findComponent: Sys$_Application$findComponent,
    getComponents: Sys$_Application$getComponents,
    initialize: Sys$_Application$initialize,
    notifyScriptLoaded: Sys$_Application$notifyScriptLoaded,
    registerDisposableObject: Sys$_Application$registerDisposableObject,
    raiseLoad: Sys$_Application$raiseLoad,
    removeComponent: Sys$_Application$removeComponent,
    unregisterDisposableObject: Sys$_Application$unregisterDisposableObject,
    _addComponentToSecondPass: Sys$_Application$_addComponentToSecondPass,
    _doInitialize: Sys$_Application$_doInitialize,    
    _loadHandler: Sys$_Application$_loadHandler,
    _unloadHandler: Sys$_Application$_unloadHandler
}
Sys._Application.registerClass('Sys._Application', Sys.Component, Sys.IContainer);

Sys.Application = new Sys._Application();

var $find = Sys.Application.findComponent;

Type.registerNamespace('Sys.Net');

 
Sys.Net.WebRequestExecutor = function Sys$Net$WebRequestExecutor() {
    /// <summary locid="M:J#Sys.Net.WebRequestExecutor.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    this._webRequest = null;
    this._resultObject = null;
}


    function Sys$Net$WebRequestExecutor$get_webRequest() {
        /// <value type="Sys.Net.WebRequest" locid="P:J#Sys.Net.WebRequestExecutor.webRequest"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._webRequest;
    }

    function Sys$Net$WebRequestExecutor$_set_webRequest(value) {
        if (this.get_started()) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOnceStarted, 'set_webRequest'));
        }

        this._webRequest = value;
    }


    function Sys$Net$WebRequestExecutor$get_started() {
        /// <value type="Boolean" locid="P:J#Sys.Net.WebRequestExecutor.started"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }

    function Sys$Net$WebRequestExecutor$get_responseAvailable() {
        /// <value type="Boolean" locid="P:J#Sys.Net.WebRequestExecutor.responseAvailable"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }

    function Sys$Net$WebRequestExecutor$get_timedOut() {
        /// <value type="Boolean" locid="P:J#Sys.Net.WebRequestExecutor.timedOut"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$get_aborted() {
        /// <value type="Boolean" locid="P:J#Sys.Net.WebRequestExecutor.aborted"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$get_responseData() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequestExecutor.responseData"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$get_statusCode() {
        /// <value type="Number" locid="P:J#Sys.Net.WebRequestExecutor.statusCode"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$get_statusText() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequestExecutor.statusText"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$get_xml() {
        /// <value locid="P:J#Sys.Net.WebRequestExecutor.xml"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$get_object() {
        /// <value locid="P:J#Sys.Net.WebRequestExecutor.object"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._resultObject) {
            this._resultObject = Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());
        }
        return this._resultObject;
    }


    function Sys$Net$WebRequestExecutor$executeRequest() {
        /// <summary locid="M:J#Sys.Net.WebRequestExecutor.executeRequest" />
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$abort() {
        /// <summary locid="M:J#Sys.Net.WebRequestExecutor.abort" />
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$getResponseHeader(header) {
        /// <summary locid="M:J#Sys.Net.WebRequestExecutor.getResponseHeader" />
        /// <param name="header" type="String"></param>
        var e = Function._validateParams(arguments, [
            {name: "header", type: String}
        ]);
        if (e) throw e;
        throw Error.notImplemented();
    }
    function Sys$Net$WebRequestExecutor$getAllResponseHeaders() {
        /// <summary locid="M:J#Sys.Net.WebRequestExecutor.getAllResponseHeaders" />
        if (arguments.length !== 0) throw Error.parameterCount();
        throw Error.notImplemented();
    }
Sys.Net.WebRequestExecutor.prototype = {
    get_webRequest: Sys$Net$WebRequestExecutor$get_webRequest,
    _set_webRequest: Sys$Net$WebRequestExecutor$_set_webRequest,
    // properties
    get_started: Sys$Net$WebRequestExecutor$get_started,
    get_responseAvailable: Sys$Net$WebRequestExecutor$get_responseAvailable,
    get_timedOut: Sys$Net$WebRequestExecutor$get_timedOut,
    get_aborted: Sys$Net$WebRequestExecutor$get_aborted,
    get_responseData: Sys$Net$WebRequestExecutor$get_responseData,
    get_statusCode: Sys$Net$WebRequestExecutor$get_statusCode,
    get_statusText: Sys$Net$WebRequestExecutor$get_statusText,
    get_xml: Sys$Net$WebRequestExecutor$get_xml,
    get_object: Sys$Net$WebRequestExecutor$get_object,
    // methods
    executeRequest: Sys$Net$WebRequestExecutor$executeRequest,
    abort: Sys$Net$WebRequestExecutor$abort,
    getResponseHeader: Sys$Net$WebRequestExecutor$getResponseHeader,
    getAllResponseHeaders: Sys$Net$WebRequestExecutor$getAllResponseHeaders
}
Sys.Net.WebRequestExecutor.registerClass('Sys.Net.WebRequestExecutor');
 
Sys.Net.XMLDOM = function Sys$Net$XMLDOM(markup) {
    if (!window.DOMParser) {
        // DevDiv Bugs 150054: Msxml2.DOMDocument (version independent ProgID) required for mobile IE
        var progIDs = [ 'Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument' ];
        for (var i = 0, l = progIDs.length; i < l; i++) {
            try {
                var xmlDOM = new ActiveXObject(progIDs[i]);
                xmlDOM.async = false;
                xmlDOM.loadXML(markup);
                xmlDOM.setProperty('SelectionLanguage', 'XPath');
                return xmlDOM;
            }
            catch (ex) {
            }
        }
    }
    else {
        // Mozilla browsers have a DOMParser
        try {
            var domParser = new window.DOMParser();
            return domParser.parseFromString(markup, 'text/xml');
        }
        catch (ex) {
        }
    }
    return null;
}

Sys.Net.XMLHttpExecutor = function Sys$Net$XMLHttpExecutor() {
    /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();

    Sys.Net.XMLHttpExecutor.initializeBase(this);

    var _this = this;
    this._xmlHttpRequest = null;
    this._webRequest = null;
    this._responseAvailable = false;
    this._timedOut = false;
    this._timer = null;
    this._aborted = false;
    this._started = false;

    this._onReadyStateChange = function this$_onReadyStateChange() {
        /*
            readyState values:
            0 = uninitialized
            1 = loading
            2 = loaded
            3 = interactive
            4 = complete
        */
        if (_this._xmlHttpRequest.readyState === 4 /*complete*/) {
            // DevDiv 58581:
            // When a request is pending when the page is closed (navigated away, postback, etc)
            // in FF and Safari, the request is aborted just as if abort() was called on the 
            // xmlhttprequest object.
            // However, even aborted requests have a readyState of 4, which we treat as successful.
            // This happened for example if a regular postback occurred during a partial update request.
            // In FF if you access the 'status' field on an aborted request, an error is thrown,
            // so the error console displayed an error when this happened.
            // On Safari it isn't an error, but status is undefined. That caused PRM to get the completed
            // event, and since the status is not 200, it raises an error.
            // IE and Opera ignore pending requests, or their readyState isn't 4.
            try {
                if (typeof(_this._xmlHttpRequest.status) === "undefined") {
                    // its an aborted request in Safari, ignore it
                    return;
                }
            }
            catch(ex) {
                // its an aborted request in Firefox, ignore it
                return;
            }
            
            _this._clearTimer();
            _this._responseAvailable = true;
            _this._webRequest.completed(Sys.EventArgs.Empty);
            if (_this._xmlHttpRequest != null) {
                _this._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
                _this._xmlHttpRequest = null;
            }
        }
    }

    this._clearTimer = function this$_clearTimer() {
        if (_this._timer != null) {
            window.clearTimeout(_this._timer);
            _this._timer = null;
        }
    }

    this._onTimeout = function this$_onTimeout() {
        if (!_this._responseAvailable) {
            _this._clearTimer();
            _this._timedOut = true;
            _this._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            _this._xmlHttpRequest.abort();
            _this._webRequest.completed(Sys.EventArgs.Empty);
            _this._xmlHttpRequest = null;
        }
    }

}



    function Sys$Net$XMLHttpExecutor$get_timedOut() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.timedOut"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._timedOut;
    }

    function Sys$Net$XMLHttpExecutor$get_started() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.started"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._started;
    }

    function Sys$Net$XMLHttpExecutor$get_responseAvailable() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.responseAvailable"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._responseAvailable;
    }

    function Sys$Net$XMLHttpExecutor$get_aborted() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.aborted"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._aborted;
    }

    function Sys$Net$XMLHttpExecutor$executeRequest() {
        /// <summary locid="M:J#this._onTimeout" />
        if (arguments.length !== 0) throw Error.parameterCount();
        this._webRequest = this.get_webRequest();

        if (this._started) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOnceStarted, 'executeRequest'));
        }
        if (this._webRequest === null) {
            throw Error.invalidOperation(Sys.Res.nullWebRequest);
        }

        var body = this._webRequest.get_body();
        var headers = this._webRequest.get_headers();
        this._xmlHttpRequest = new XMLHttpRequest();
        this._xmlHttpRequest.onreadystatechange = this._onReadyStateChange;
        var verb = this._webRequest.get_httpVerb();
        this._xmlHttpRequest.open(verb, this._webRequest.getResolvedUrl(), true /*async*/);
        if (headers) {
            for (var header in headers) {
                var val = headers[header];
                if (typeof(val) !== "function")
                    this._xmlHttpRequest.setRequestHeader(header, val);
            }
        }

        if (verb.toLowerCase() === "post") {
            // If it's a POST but no Content-Type was specified, default to application/x-www-form-urlencoded; charset=utf-8
            if ((headers === null) || !headers['Content-Type']) {
                // DevDiv 109456: Include charset=utf-8. Javascript encoding methods always use utf-8, server may be set to assume other encoding.
                this._xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            }

            // DevDiv 15893: If POST with no body, default to ""(FireFox needs this)
            if (!body) {
                body = "";
            }
        }

        var timeout = this._webRequest.get_timeout();
        if (timeout > 0) {
            this._timer = window.setTimeout(Function.createDelegate(this, this._onTimeout), timeout);
        }
        this._xmlHttpRequest.send(body);
        this._started = true;
    }

    function Sys$Net$XMLHttpExecutor$getResponseHeader(header) {
        /// <summary locid="M:J#this._onTimeout" />
        /// <param name="header" type="String"></param>
        /// <returns type="String"></returns>
        var e = Function._validateParams(arguments, [
            {name: "header", type: String}
        ]);
        if (e) throw e;
        if (!this._responseAvailable) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallBeforeResponse, 'getResponseHeader'));
        }
        if (!this._xmlHttpRequest) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOutsideHandler, 'getResponseHeader'));
        }

        var result;
        try {
            result = this._xmlHttpRequest.getResponseHeader(header);
        } catch (e) {
        }
        if (!result) result = "";
        return result;
    }

    function Sys$Net$XMLHttpExecutor$getAllResponseHeaders() {
        /// <summary locid="M:J#this._onTimeout" />
        /// <returns type="String"></returns>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._responseAvailable) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallBeforeResponse, 'getAllResponseHeaders'));
        }
        if (!this._xmlHttpRequest) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOutsideHandler, 'getAllResponseHeaders'));
        }

        return this._xmlHttpRequest.getAllResponseHeaders();
    }

    function Sys$Net$XMLHttpExecutor$get_responseData() {
        /// <value type="String" locid="P:J#Sys.Net.XMLHttpExecutor.responseData"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._responseAvailable) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallBeforeResponse, 'get_responseData'));
        }
        if (!this._xmlHttpRequest) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOutsideHandler, 'get_responseData'));
        }

        return this._xmlHttpRequest.responseText;
    }

    function Sys$Net$XMLHttpExecutor$get_statusCode() {
        /// <value type="Number" locid="P:J#Sys.Net.XMLHttpExecutor.statusCode"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._responseAvailable) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallBeforeResponse, 'get_statusCode'));
        }
        if (!this._xmlHttpRequest) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOutsideHandler, 'get_statusCode'));
        }
        var result = 0;
        try {
            result = this._xmlHttpRequest.status;
        }
        catch(ex) {
        }
        return result;
    }

    function Sys$Net$XMLHttpExecutor$get_statusText() {
        /// <value type="String" locid="P:J#Sys.Net.XMLHttpExecutor.statusText"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._responseAvailable) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallBeforeResponse, 'get_statusText'));
        }
        if (!this._xmlHttpRequest) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOutsideHandler, 'get_statusText'));
        }

        return this._xmlHttpRequest.statusText;
    }

    function Sys$Net$XMLHttpExecutor$get_xml() {
        /// <value locid="P:J#Sys.Net.XMLHttpExecutor.xml"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._responseAvailable) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallBeforeResponse, 'get_xml'));
        }
        if (!this._xmlHttpRequest) {
            throw Error.invalidOperation(String.format(Sys.Res.cannotCallOutsideHandler, 'get_xml'));
        }

        var xml = this._xmlHttpRequest.responseXML;
        if (!xml || !xml.documentElement) {

            // This happens if the server doesn't set the content type to text/xml.
            xml = Sys.Net.XMLDOM(this._xmlHttpRequest.responseText);

            // If we still couldn't get an XML DOM, the data is probably not XML
            if (!xml || !xml.documentElement)
                return null;
        }
        // REVIEW: todo this used to use Sys.Runtime get_hostType
        else if (navigator.userAgent.indexOf('MSIE') !== -1) {
            xml.setProperty('SelectionLanguage', 'XPath');
        }

        // For Firefox parser errors have document elements of parser error
        if (xml.documentElement.namespaceURI === "http://www.mozilla.org/newlayout/xml/parsererror.xml" &&
            xml.documentElement.tagName === "parsererror") {
            return null;
        }
        
        // For Safari, parser errors are always the first child of the root
        if (xml.documentElement.firstChild && xml.documentElement.firstChild.tagName === "parsererror") {
            return null;
        }
        
        return xml;
    }

    function Sys$Net$XMLHttpExecutor$abort() {
        /// <summary locid="M:J#this._onTimeout" />
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._started) {
            throw Error.invalidOperation(Sys.Res.cannotAbortBeforeStart);
        }

        // aborts are no ops if we are done, timedout, or aborted already
        if (this._aborted || this._responseAvailable || this._timedOut)
            return;

        this._aborted = true;

        this._clearTimer();

        if (this._xmlHttpRequest && !this._responseAvailable) {

            // Remove the onreadystatechange first otherwise abort would trigger readyState to become 4
            this._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            this._xmlHttpRequest.abort();
            
            this._xmlHttpRequest = null;            

            // DevDiv 59229: Call completed on the request instead of raising the event directly
            this._webRequest.completed(Sys.EventArgs.Empty);
        }
    }
Sys.Net.XMLHttpExecutor.prototype = {
    get_timedOut: Sys$Net$XMLHttpExecutor$get_timedOut,
    get_started: Sys$Net$XMLHttpExecutor$get_started,
    get_responseAvailable: Sys$Net$XMLHttpExecutor$get_responseAvailable,
    get_aborted: Sys$Net$XMLHttpExecutor$get_aborted,
    executeRequest: Sys$Net$XMLHttpExecutor$executeRequest,
    getResponseHeader: Sys$Net$XMLHttpExecutor$getResponseHeader,
    getAllResponseHeaders: Sys$Net$XMLHttpExecutor$getAllResponseHeaders,
    get_responseData: Sys$Net$XMLHttpExecutor$get_responseData,
    get_statusCode: Sys$Net$XMLHttpExecutor$get_statusCode,
    get_statusText: Sys$Net$XMLHttpExecutor$get_statusText,
    get_xml: Sys$Net$XMLHttpExecutor$get_xml,
    abort: Sys$Net$XMLHttpExecutor$abort
}
Sys.Net.XMLHttpExecutor.registerClass('Sys.Net.XMLHttpExecutor', Sys.Net.WebRequestExecutor);
 
Sys.Net._WebRequestManager = function Sys$Net$_WebRequestManager() {
    this._this = this;
    this._defaultTimeout = 0;
    this._defaultExecutorType = "Sys.Net.XMLHttpExecutor";
}


    function Sys$Net$_WebRequestManager$add_invokingRequest(handler) {
        /// <summary locid="E:J#Sys.Net._WebRequestManager.invokingRequest" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this._get_eventHandlerList().addHandler("invokingRequest", handler);
    }
    function Sys$Net$_WebRequestManager$remove_invokingRequest(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this._get_eventHandlerList().removeHandler("invokingRequest", handler);
    }

    function Sys$Net$_WebRequestManager$add_completedRequest(handler) {
        /// <summary locid="E:J#Sys.Net._WebRequestManager.completedRequest" />
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this._get_eventHandlerList().addHandler("completedRequest", handler);
    }
    function Sys$Net$_WebRequestManager$remove_completedRequest(handler) {
        var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
        if (e) throw e;
        this._get_eventHandlerList().removeHandler("completedRequest", handler);
    }

    function Sys$Net$_WebRequestManager$_get_eventHandlerList() {
        if (!this._events) {
            this._events = new Sys.EventHandlerList();
        }
        return this._events;
    }

    function Sys$Net$_WebRequestManager$get_defaultTimeout() {
        /// <value type="Number" locid="P:J#Sys.Net._WebRequestManager.defaultTimeout"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultTimeout;
    }
    function Sys$Net$_WebRequestManager$set_defaultTimeout(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Number}]);
        if (e) throw e;
        if (value < 0) {
            throw Error.argumentOutOfRange("value", value, Sys.Res.invalidTimeout);
        }

        this._defaultTimeout = value;
    }

    function Sys$Net$_WebRequestManager$get_defaultExecutorType() {
        /// <value type="String" locid="P:J#Sys.Net._WebRequestManager.defaultExecutorType"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultExecutorType;
    }
    function Sys$Net$_WebRequestManager$set_defaultExecutorType(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        this._defaultExecutorType = value;
    }

    function Sys$Net$_WebRequestManager$executeRequest(webRequest) {
        /// <summary locid="M:J#Sys.Net._WebRequestManager.executeRequest" />
        /// <param name="webRequest" type="Sys.Net.WebRequest"></param>
        var e = Function._validateParams(arguments, [
            {name: "webRequest", type: Sys.Net.WebRequest}
        ]);
        if (e) throw e;
        var executor = webRequest.get_executor();
        // if the request didn't set an executor, use the request manager default executor
        if (!executor) {
            // TODO: Optimize this by caching the type

            var failed = false;
            try {
                var executorType = eval(this._defaultExecutorType);
                executor = new executorType();
            } catch (e) {
                failed = true;
            }

            if (failed  || !Sys.Net.WebRequestExecutor.isInstanceOfType(executor) || !executor) {
                throw Error.argument("defaultExecutorType", String.format(Sys.Res.invalidExecutorType, this._defaultExecutorType));
            }

            webRequest.set_executor(executor);
        }

        // skip the request if it has been aborted;
        if (executor.get_aborted()) {
            return;
        }

        var evArgs = new Sys.Net.NetworkRequestEventArgs(webRequest);
        var handler = this._get_eventHandlerList().getHandler("invokingRequest");
        if (handler) {
            handler(this, evArgs);
        }

        if (!evArgs.get_cancel()) {
            executor.executeRequest();
        }
    }
Sys.Net._WebRequestManager.prototype = {
    add_invokingRequest: Sys$Net$_WebRequestManager$add_invokingRequest,
    remove_invokingRequest: Sys$Net$_WebRequestManager$remove_invokingRequest,
    add_completedRequest: Sys$Net$_WebRequestManager$add_completedRequest,
    remove_completedRequest: Sys$Net$_WebRequestManager$remove_completedRequest,
    _get_eventHandlerList: Sys$Net$_WebRequestManager$_get_eventHandlerList,
    get_defaultTimeout: Sys$Net$_WebRequestManager$get_defaultTimeout,
    set_defaultTimeout: Sys$Net$_WebRequestManager$set_defaultTimeout,
    get_defaultExecutorType: Sys$Net$_WebRequestManager$get_defaultExecutorType,
    set_defaultExecutorType: Sys$Net$_WebRequestManager$set_defaultExecutorType,
    executeRequest: Sys$Net$_WebRequestManager$executeRequest
}

Sys.Net._WebRequestManager.registerClass('Sys.Net._WebRequestManager');

// Create a single instance of the class
Sys.Net.WebRequestManager = new Sys.Net._WebRequestManager();
 
Sys.Net.NetworkRequestEventArgs = function Sys$Net$NetworkRequestEventArgs(webRequest) {
    /// <summary locid="M:J#Sys.Net.NetworkRequestEventArgs.#ctor" />
    /// <param name="webRequest" type="Sys.Net.WebRequest"></param>
    var e = Function._validateParams(arguments, [
        {name: "webRequest", type: Sys.Net.WebRequest}
    ]);
    if (e) throw e;
    Sys.Net.NetworkRequestEventArgs.initializeBase(this);
    this._webRequest = webRequest;
}


    function Sys$Net$NetworkRequestEventArgs$get_webRequest() {
        /// <value type="Sys.Net.WebRequest" locid="P:J#Sys.Net.NetworkRequestEventArgs.webRequest"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._webRequest;
    }
Sys.Net.NetworkRequestEventArgs.prototype = {
    get_webRequest: Sys$Net$NetworkRequestEventArgs$get_webRequest
}

Sys.Net.NetworkRequestEventArgs.registerClass('Sys.Net.NetworkRequestEventArgs', Sys.CancelEventArgs);
 
Sys.Net.WebRequest = function Sys$Net$WebRequest() {
    /// <summary locid="M:J#Sys.Net.WebRequest.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    this._url = "";
    this._headers = { };
    this._body = null;
    this._userContext = null;
    this._httpVerb = null;
    this._executor = null;
    this._invokeCalled = false;
    this._timeout = 0;
}

// Properties about the request data

    function Sys$Net$WebRequest$add_completed(handler) {
    /// <summary locid="E:J#Sys.Net.WebRequest.completed" />
    var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
    if (e) throw e;
        this._get_eventHandlerList().addHandler("completed", handler);
    }
    function Sys$Net$WebRequest$remove_completed(handler) {
    var e = Function._validateParams(arguments, [{name: "handler", type: Function}]);
    if (e) throw e;
        this._get_eventHandlerList().removeHandler("completed", handler);
    }

    function Sys$Net$WebRequest$completed(eventArgs) {
        /// <summary locid="M:J#Sys.Net.WebRequest.completed" />
        /// <param name="eventArgs" type="Sys.EventArgs"></param>
        var e = Function._validateParams(arguments, [
            {name: "eventArgs", type: Sys.EventArgs}
        ]);
        if (e) throw e;
        var handler = Sys.Net.WebRequestManager._get_eventHandlerList().getHandler("completedRequest");
        if (handler) {
            handler(this._executor, eventArgs);
        }

        handler = this._get_eventHandlerList().getHandler("completed");
        if (handler) {
            handler(this._executor, eventArgs);
        }
    }

    function Sys$Net$WebRequest$_get_eventHandlerList() {
        if (!this._events) {
            this._events = new Sys.EventHandlerList();
        }
        return this._events;
    }

    function Sys$Net$WebRequest$get_url() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequest.url"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._url;
    }
    function Sys$Net$WebRequest$set_url(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        this._url = value;
    }

    function Sys$Net$WebRequest$get_headers() {
        /// <value locid="P:J#Sys.Net.WebRequest.headers"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._headers;
    }

    function Sys$Net$WebRequest$get_httpVerb() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequest.httpVerb"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        // Default is GET if no body, and POST otherwise
        if (this._httpVerb === null) {
            if (this._body === null) {
                return "GET";
            }
            return "POST";
        }
        return this._httpVerb;
    }
    function Sys$Net$WebRequest$set_httpVerb(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        if (value.length === 0) {
            throw Error.argument('value', Sys.Res.invalidHttpVerb);
        }

        this._httpVerb = value;
    }

    function Sys$Net$WebRequest$get_body() {
        /// <value mayBeNull="true" locid="P:J#Sys.Net.WebRequest.body"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._body;
    }
    function Sys$Net$WebRequest$set_body(value) {
        var e = Function._validateParams(arguments, [{name: "value", mayBeNull: true}]);
        if (e) throw e;
        this._body = value;
    }

    function Sys$Net$WebRequest$get_userContext() {
        /// <value mayBeNull="true" locid="P:J#Sys.Net.WebRequest.userContext"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._userContext;
    }
    function Sys$Net$WebRequest$set_userContext(value) {
        var e = Function._validateParams(arguments, [{name: "value", mayBeNull: true}]);
        if (e) throw e;
        this._userContext = value;
    }

    function Sys$Net$WebRequest$get_executor() {
        /// <value type="Sys.Net.WebRequestExecutor" locid="P:J#Sys.Net.WebRequest.executor"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._executor;
    }
    function Sys$Net$WebRequest$set_executor(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Sys.Net.WebRequestExecutor}]);
        if (e) throw e;
        if (this._executor !== null && this._executor.get_started()) {
            throw Error.invalidOperation(Sys.Res.setExecutorAfterActive);
        }

        this._executor = value;
        this._executor._set_webRequest(this);
    }

    function Sys$Net$WebRequest$get_timeout() {
        /// <value type="Number" locid="P:J#Sys.Net.WebRequest.timeout"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this._timeout === 0) {
            return Sys.Net.WebRequestManager.get_defaultTimeout();
        }
        return this._timeout;
    }
    function Sys$Net$WebRequest$set_timeout(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Number}]);
        if (e) throw e;
        if (value < 0) {
            throw Error.argumentOutOfRange("value", value, Sys.Res.invalidTimeout);
        }

        this._timeout = value;
    }

    function Sys$Net$WebRequest$getResolvedUrl() {
        /// <summary locid="M:J#Sys.Net.WebRequest.getResolvedUrl" />
        /// <returns type="String"></returns>
        if (arguments.length !== 0) throw Error.parameterCount();
        return Sys.Net.WebRequest._resolveUrl(this._url);
    }

    function Sys$Net$WebRequest$invoke() {
        /// <summary locid="M:J#Sys.Net.WebRequest.invoke" />
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this._invokeCalled) {
            throw Error.invalidOperation(Sys.Res.invokeCalledTwice);
        }

        Sys.Net.WebRequestManager.executeRequest(this);
        this._invokeCalled = true;
    }
Sys.Net.WebRequest.prototype = {
    add_completed: Sys$Net$WebRequest$add_completed,
    remove_completed: Sys$Net$WebRequest$remove_completed,
    completed: Sys$Net$WebRequest$completed,
    _get_eventHandlerList: Sys$Net$WebRequest$_get_eventHandlerList,
    get_url: Sys$Net$WebRequest$get_url,
    set_url: Sys$Net$WebRequest$set_url,
    get_headers: Sys$Net$WebRequest$get_headers,
    get_httpVerb: Sys$Net$WebRequest$get_httpVerb,
    set_httpVerb: Sys$Net$WebRequest$set_httpVerb,
    get_body: Sys$Net$WebRequest$get_body,
    set_body: Sys$Net$WebRequest$set_body,
    get_userContext: Sys$Net$WebRequest$get_userContext,
    set_userContext: Sys$Net$WebRequest$set_userContext,
    get_executor: Sys$Net$WebRequest$get_executor,
    set_executor: Sys$Net$WebRequest$set_executor,
    get_timeout: Sys$Net$WebRequest$get_timeout,
    set_timeout: Sys$Net$WebRequest$set_timeout,
    getResolvedUrl: Sys$Net$WebRequest$getResolvedUrl,
    invoke: Sys$Net$WebRequest$invoke
}

// Given a url and an optional base url, return an absolute url combining the url and base url
Sys.Net.WebRequest._resolveUrl = function Sys$Net$WebRequest$_resolveUrl(url, baseUrl) {
    // If the url contains a host, we are done
    if (url && url.indexOf('://') !== -1) {
        return url;
    }

    // If a base url isn't passed in, we use either the base element if specified or the URL from the browser
    if (!baseUrl || baseUrl.length === 0) {
        var baseElement = document.getElementsByTagName('base')[0];
        if (baseElement && baseElement.href && baseElement.href.length > 0) {
            baseUrl = baseElement.href;
        }
        else {
            baseUrl = document.URL;
        }
    }

    // strip off any querystrings
    var qsStart = baseUrl.indexOf('?');
    if (qsStart !== -1) {
        baseUrl = baseUrl.substr(0, qsStart);
    }
    baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1);

    // If a url wasn't specified, we just use the base
    if (!url || url.length === 0) {
        return baseUrl;
    }

    // For absolute path url, we need to rebase it against the base url, stripping off everything after the http://host
    if (url.charAt(0) === '/') {
        var slashslash = baseUrl.indexOf('://');
        if (slashslash === -1) {
            throw Error.argument("baseUrl", Sys.Res.badBaseUrl1);
        }

        var nextSlash = baseUrl.indexOf('/', slashslash + 3);
        if (nextSlash === -1) {
            throw Error.argument("baseUrl", Sys.Res.badBaseUrl2);
        }

        return baseUrl.substr(0, nextSlash) + url;
    }
    // Otherwise for relative urls we just combine with the base url stripping off the last path component (filename typically)
    // Note the app path always contains a trailing slash so when resolving app paths, we never strip off anything important
    else {
        var lastSlash = baseUrl.lastIndexOf('/');
        if (lastSlash === -1) {
            throw Error.argument("baseUrl", Sys.Res.badBaseUrl3);
        }

        return baseUrl.substr(0, lastSlash+1) + url;
    }
}

Sys.Net.WebRequest._createQueryString = function Sys$Net$WebRequest$_createQueryString(queryString, encodeMethod) {
    // By default, use URI encoding
    if (!encodeMethod)
        encodeMethod = encodeURIComponent;

    var sb = new Sys.StringBuilder();

    var i = 0;
    for (var arg in queryString) {
        var obj = queryString[arg];
        if (typeof(obj) === "function") continue;
        var val = Sys.Serialization.JavaScriptSerializer.serialize(obj);
        if (i !== 0) {
            sb.append('&');
        }

        sb.append(arg);
        sb.append('=');
        sb.append(encodeMethod(val));

        i++;
    }

    return sb.toString();
}

Sys.Net.WebRequest._createUrl = function Sys$Net$WebRequest$_createUrl(url, queryString) {
    if (!queryString) {
        return url;
    }

    var qs = Sys.Net.WebRequest._createQueryString(queryString);
    if (qs.length > 0) {
        var sep = '?';
        if (url && url.indexOf('?') !== -1)
            sep = '&';
        return url + sep + qs;
    } else {
        return url;
    }
}

Sys.Net.WebRequest.registerClass('Sys.Net.WebRequest');
 
Sys.Net.WebServiceProxy = function Sys$Net$WebServiceProxy() {
}


    function Sys$Net$WebServiceProxy$get_timeout() {
        /// <value type="Number" locid="P:J#Sys.Net.WebServiceProxy.timeout"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._timeout;
    }
    function Sys$Net$WebServiceProxy$set_timeout(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Number}]);
        if (e) throw e;
        if (value < 0) { throw Error.argumentOutOfRange('value', value, Sys.Res.invalidTimeout); }
        this._timeout = value;
    }
    function Sys$Net$WebServiceProxy$get_defaultUserContext() {
        /// <value mayBeNull="true" locid="P:J#Sys.Net.WebServiceProxy.defaultUserContext"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._userContext;
    }
    function Sys$Net$WebServiceProxy$set_defaultUserContext(value) {
        var e = Function._validateParams(arguments, [{name: "value", mayBeNull: true}]);
        if (e) throw e;
        this._userContext = value;
    }
    function Sys$Net$WebServiceProxy$get_defaultSucceededCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Net.WebServiceProxy.defaultSucceededCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._succeeded;
    }
    function Sys$Net$WebServiceProxy$set_defaultSucceededCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._succeeded = value;
    }
    function Sys$Net$WebServiceProxy$get_defaultFailedCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Net.WebServiceProxy.defaultFailedCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._failed;
    }
    function Sys$Net$WebServiceProxy$set_defaultFailedCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._failed = value;
    }
    function Sys$Net$WebServiceProxy$get_path() {
        /// <value type="String" locid="P:J#Sys.Net.WebServiceProxy.path"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._path;
    }
    function Sys$Net$WebServiceProxy$set_path(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        this._path = value;
    }

    function Sys$Net$WebServiceProxy$_invoke(servicePath, methodName, useGet, params, onSuccess, onFailure, userContext) {
        /// <summary locid="M:J#Sys.Net.WebServiceProxy._invoke" />
        /// <param name="servicePath" type="String"></param>
        /// <param name="methodName" type="String"></param>
        /// <param name="useGet" type="Boolean"></param>
        /// <param name="params"></param>
        /// <param name="onSuccess" type="Function" mayBeNull="true" optional="true"></param>
        /// <param name="onFailure" type="Function" mayBeNull="true" optional="true"></param>
        /// <param name="userContext" mayBeNull="true" optional="true"></param>
        /// <returns type="Sys.Net.WebRequest"></returns>
        var e = Function._validateParams(arguments, [
            {name: "servicePath", type: String},
            {name: "methodName", type: String},
            {name: "useGet", type: Boolean},
            {name: "params"},
            {name: "onSuccess", type: Function, mayBeNull: true, optional: true},
            {name: "onFailure", type: Function, mayBeNull: true, optional: true},
            {name: "userContext", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;

        // Resolve against the defaults callbacks/context
        if (onSuccess === null || typeof onSuccess === 'undefined') onSuccess = this.get_defaultSucceededCallback();
        if (onFailure === null || typeof onFailure === 'undefined') onFailure = this.get_defaultFailedCallback();
        if (userContext === null || typeof userContext === 'undefined') userContext = this.get_defaultUserContext();
        
        return Sys.Net.WebServiceProxy.invoke(servicePath, methodName, useGet, params, onSuccess, onFailure, userContext, this.get_timeout());
    }
Sys.Net.WebServiceProxy.prototype = {
    get_timeout: Sys$Net$WebServiceProxy$get_timeout,
    set_timeout: Sys$Net$WebServiceProxy$set_timeout,
    get_defaultUserContext: Sys$Net$WebServiceProxy$get_defaultUserContext,
    set_defaultUserContext: Sys$Net$WebServiceProxy$set_defaultUserContext,
    get_defaultSucceededCallback: Sys$Net$WebServiceProxy$get_defaultSucceededCallback,
    set_defaultSucceededCallback: Sys$Net$WebServiceProxy$set_defaultSucceededCallback,
    get_defaultFailedCallback: Sys$Net$WebServiceProxy$get_defaultFailedCallback,
    set_defaultFailedCallback: Sys$Net$WebServiceProxy$set_defaultFailedCallback,
    get_path: Sys$Net$WebServiceProxy$get_path,
    set_path: Sys$Net$WebServiceProxy$set_path,
    _invoke: Sys$Net$WebServiceProxy$_invoke
}
Sys.Net.WebServiceProxy.registerClass('Sys.Net.WebServiceProxy');

Sys.Net.WebServiceProxy.invoke = function Sys$Net$WebServiceProxy$invoke(servicePath, methodName, useGet, params, onSuccess, onFailure, userContext, timeout) {
    /// <summary locid="M:J#Sys.Net.WebServiceProxy.invoke" />
    /// <param name="servicePath" type="String"></param>
    /// <param name="methodName" type="String"></param>
    /// <param name="useGet" type="Boolean" optional="true"></param>
    /// <param name="params" mayBeNull="true" optional="true"></param>
    /// <param name="onSuccess" type="Function" mayBeNull="true" optional="true"></param>
    /// <param name="onFailure" type="Function" mayBeNull="true" optional="true"></param>
    /// <param name="userContext" mayBeNull="true" optional="true"></param>
    /// <param name="timeout" type="Number" optional="true"></param>
    /// <returns type="Sys.Net.WebRequest"></returns>
    var e = Function._validateParams(arguments, [
        {name: "servicePath", type: String},
        {name: "methodName", type: String},
        {name: "useGet", type: Boolean, optional: true},
        {name: "params", mayBeNull: true, optional: true},
        {name: "onSuccess", type: Function, mayBeNull: true, optional: true},
        {name: "onFailure", type: Function, mayBeNull: true, optional: true},
        {name: "userContext", mayBeNull: true, optional: true},
        {name: "timeout", type: Number, optional: true}
    ]);
    if (e) throw e;

    // Create a web request to make the method call
    var request = new Sys.Net.WebRequest();

    request.get_headers()['Content-Type'] = 'application/json; charset=utf-8';
    if (!params) params = {};
    var urlParams = params;
    // If using POST, or we don't have any paramaters, start with a blank dictionary
    if (!useGet || !urlParams) urlParams = {};
    request.set_url(Sys.Net.WebRequest._createUrl(servicePath+"/"+encodeURIComponent(methodName), urlParams));

    var body = null;
    // No body when using GET
    if (!useGet) {
        body = Sys.Serialization.JavaScriptSerializer.serialize(params);

        // If there are no parameters, send an empty body (though it will still be a POST)
        if (body === "{}") body = "";
    }

    // Put together the body as a JSON string
    request.set_body(body);
    request.add_completed(onComplete);
    if (timeout && timeout > 0) request.set_timeout(timeout);
    request.invoke();

    function onComplete(response, eventArgs) {
        if (response.get_responseAvailable()) {
            var statusCode = response.get_statusCode();
            var result = null;
           
            try {
                var contentType = response.getResponseHeader("Content-Type");
                if (contentType.startsWith("application/json")) {
                    result = response.get_object();
                }
                else if (contentType.startsWith("text/xml")) {
                    result = response.get_xml();
                }
                // Default to the response text
                else {
                    result = response.get_responseData();
                }
            } catch (ex) {
            }

            var error = response.getResponseHeader("jsonerror");
            var errorObj = (error === "true");
            if (errorObj) {
                if (result) {
                    result = new Sys.Net.WebServiceError(false, result.Message, result.StackTrace, result.ExceptionType);
                }
            }
            else if (contentType.startsWith("application/json")) {
                //DevDiv 88409: Change JSON wire format to prevent CSRF attack
                //The return value is wrapped inside an object with , 'd' field set to return value 
                if (!result || typeof(result.d) === "undefined") {
                    throw Sys.Net.WebServiceProxy._createFailedError(methodName, String.format(Sys.Res.webServiceInvalidJsonWrapper, methodName));
                }
                result = result.d;
            }
            if (((statusCode < 200) || (statusCode >= 300)) || errorObj) {
                if (onFailure) {
                    if (!result || !errorObj) {
                        result = new Sys.Net.WebServiceError(false /*timedout*/, String.format(Sys.Res.webServiceFailedNoMsg, methodName), "", "");
                    }
                    result._statusCode = statusCode;
                    onFailure(result, userContext, methodName);
                }
                else {
                    // In debug mode, if no error was registered, display some trace information
                    var error;
                    if (result && errorObj) {
                        // If we got a result, we're likely dealing with an error in the method itself
                        error = result.get_exceptionType() + "-- " + result.get_message();
                    }
                    else {
                        // Otherwise, it's probably a 'top-level' error, in which case we dump the
                        // whole response in the trace
                        error = response.get_responseData();
                    }
                    // DevDiv 89485: throw, not alert()
                    throw Sys.Net.WebServiceProxy._createFailedError(methodName, String.format(Sys.Res.webServiceFailed, methodName, error));
                }
            }
            else if (onSuccess) {
                onSuccess(result, userContext, methodName);
            }
        }
        else {
            var msg;
            if (response.get_timedOut()) {
                msg = String.format(Sys.Res.webServiceTimedOut, methodName);
            }
            else {
                msg = String.format(Sys.Res.webServiceFailedNoMsg, methodName)
            }
            if (onFailure) {
                onFailure(new Sys.Net.WebServiceError(response.get_timedOut(), msg, "", ""), userContext, methodName);
            }
            else {
                // In debug mode, if no error was registered, display some trace information
                // DevDiv 89485: throw, don't alert()
                throw Sys.Net.WebServiceProxy._createFailedError(methodName, msg);
            }
        }
    }

    return request;
}

Sys.Net.WebServiceProxy._createFailedError = function Sys$Net$WebServiceProxy$_createFailedError(methodName, errorMessage) {
    var displayMessage = "Sys.Net.WebServiceFailedException: " + errorMessage;
    var e = Error.create(displayMessage, { 'name': 'Sys.Net.WebServiceFailedException', 'methodName': methodName });
    e.popStackFrame();
    return e;
}

Sys.Net.WebServiceProxy._defaultFailedCallback = function Sys$Net$WebServiceProxy$_defaultFailedCallback(err, methodName) {
    var error = err.get_exceptionType() + "-- " + err.get_message();
    throw Sys.Net.WebServiceProxy._createFailedError(methodName, String.format(Sys.Res.webServiceFailed, methodName, error));
}

// Generate a constructor that knows how to build objects of a particular server type,
// and then initialize it from the fields of an arbitrary object.
Sys.Net.WebServiceProxy._generateTypedConstructor = function Sys$Net$WebServiceProxy$_generateTypedConstructor(type) {
    return function(properties) {
        // If an object was passed in, copy all its fields
        if (properties) {
            for (var name in properties) {
                this[name] = properties[name];
            }
        }
        this.__type = type;
    }
}
 
// Class returned to client if server throws an exception during ProcessRequest
Sys.Net.WebServiceError = function Sys$Net$WebServiceError(timedOut, message, stackTrace, exceptionType) {
    /// <summary locid="M:J#Sys.Net.WebServiceError.#ctor" />
    /// <param name="timedOut" type="Boolean"></param>
    /// <param name="message" type="String" mayBeNull="true"></param>
    /// <param name="stackTrace" type="String" mayBeNull="true"></param>
    /// <param name="exceptionType" type="String" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "timedOut", type: Boolean},
        {name: "message", type: String, mayBeNull: true},
        {name: "stackTrace", type: String, mayBeNull: true},
        {name: "exceptionType", type: String, mayBeNull: true}
    ]);
    if (e) throw e;
    this._timedOut = timedOut;
    this._message = message;
    this._stackTrace = stackTrace;
    this._exceptionType = exceptionType;
    this._statusCode = -1;
}


    function Sys$Net$WebServiceError$get_timedOut() {
        /// <value type="Boolean" locid="P:J#Sys.Net.WebServiceError.timedOut"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._timedOut;
    }

    function Sys$Net$WebServiceError$get_statusCode() {
        /// <value type="Number" locid="P:J#Sys.Net.WebServiceError.statusCode"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._statusCode;
    }

    function Sys$Net$WebServiceError$get_message() {
        /// <value type="String" locid="P:J#Sys.Net.WebServiceError.message"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._message;
    }

    function Sys$Net$WebServiceError$get_stackTrace() {
        /// <value type="String" locid="P:J#Sys.Net.WebServiceError.stackTrace"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._stackTrace;
    }

    function Sys$Net$WebServiceError$get_exceptionType() {
        /// <value type="String" locid="P:J#Sys.Net.WebServiceError.exceptionType"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._exceptionType;
    }
Sys.Net.WebServiceError.prototype = {
    get_timedOut: Sys$Net$WebServiceError$get_timedOut,
    get_statusCode: Sys$Net$WebServiceError$get_statusCode,
    get_message: Sys$Net$WebServiceError$get_message,
    get_stackTrace: Sys$Net$WebServiceError$get_stackTrace,
    get_exceptionType: Sys$Net$WebServiceError$get_exceptionType
}
Sys.Net.WebServiceError.registerClass('Sys.Net.WebServiceError');

Type.registerNamespace('Sys.Services');


Sys.Services._ProfileService = function Sys$Services$_ProfileService() {
    Sys.Services._ProfileService.initializeBase(this);
    this.properties = {};
}
Sys.Services._ProfileService.DefaultWebServicePath = '';







    function Sys$Services$_ProfileService$get_defaultLoadCompletedCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Services._ProfileService.defaultLoadCompletedCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultLoadCompletedCallback;
    }
    function Sys$Services$_ProfileService$set_defaultLoadCompletedCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._defaultLoadCompletedCallback = value;
    }

    function Sys$Services$_ProfileService$get_defaultSaveCompletedCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Services._ProfileService.defaultSaveCompletedCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultSaveCompletedCallback;
    }
    function Sys$Services$_ProfileService$set_defaultSaveCompletedCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._defaultSaveCompletedCallback = value;
    }

    function Sys$Services$_ProfileService$get_path() {
        /// <value type="String" mayBeNull="true" locid="P:J#Sys.Services._ProfileService.path"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        // override from base to ensure returned value is '' even if usercode sets to null.
        // also refactored from v1 to ensure empty string on getter instead of setter.
        return this._path || '';
    }

    function Sys$Services$_ProfileService$load(propertyNames, loadCompletedCallback, failedCallback, userContext) {
        /// <summary locid="M:J#Sys.Services._ProfileService.load" />
        /// <param name="propertyNames" type="Array" elementType="String" optional="true" elementMayBeNull="false" mayBeNull="true"></param>
        /// <param name="loadCompletedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="userContext" optional="true" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "propertyNames", type: Array, mayBeNull: true, optional: true, elementType: String},
            {name: "loadCompletedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "failedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "userContext", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        var parameters;
        var methodName;
        if (!propertyNames) {
            methodName = "GetAllPropertiesForCurrentUser";
            parameters = { authenticatedUserOnly: false };
        }
        else {
            methodName = "GetPropertiesForCurrentUser";
            parameters = { properties: this._clonePropertyNames(propertyNames), authenticatedUserOnly: false };
        }

        this._invoke(this._get_path(),
                                        methodName,
                                        false,
                                        parameters,
                                        Function.createDelegate(this, this._onLoadComplete),
                                        Function.createDelegate(this, this._onLoadFailed),
                                        [loadCompletedCallback, failedCallback, userContext]);
    }

    function Sys$Services$_ProfileService$save(propertyNames, saveCompletedCallback, failedCallback, userContext) {
        /// <summary locid="M:J#Sys.Services._ProfileService.save" />
        /// <param name="propertyNames" type="Array" elementType="String" optional="true" elementMayBeNull="false" mayBeNull="true"></param>
        /// <param name="saveCompletedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="userContext" optional="true" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "propertyNames", type: Array, mayBeNull: true, optional: true, elementType: String},
            {name: "saveCompletedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "failedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "userContext", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        var flattenedProperties = this._flattenProperties(propertyNames, this.properties);
        this._invoke(this._get_path(),
                                        "SetPropertiesForCurrentUser",
                                        false,
                                        { values: flattenedProperties.value, authenticatedUserOnly: false },
                                        Function.createDelegate(this, this._onSaveComplete),
                                        Function.createDelegate(this, this._onSaveFailed),
                                        [saveCompletedCallback, failedCallback, userContext, flattenedProperties.count]);
    }


    function Sys$Services$_ProfileService$_clonePropertyNames(arr) {
        var nodups = [];
        var seen = {};
        for (var i=0; i < arr.length; i++) {
            var prop = arr[i];
            if(!seen[prop]) { Array.add(nodups, prop); seen[prop]=true; };
        }
        return nodups;
    }





    function Sys$Services$_ProfileService$_flattenProperties(/*string[]*/propertyNames, properties, groupName) {
        var flattenedProperties = {};
        var val;
        var key;
        var count = 0;
        if (propertyNames && propertyNames.length === 0) {
            return { value: flattenedProperties, count: 0 };
        }

        for (var property in properties) {
            val = properties[property];
            key = groupName ? groupName + "." + property : property;
            // is it a property group?
            if(Sys.Services.ProfileGroup.isInstanceOfType(val)) {
                var obj = this._flattenProperties(propertyNames, val, key);
                var groupProperties = obj.value;
                count += obj.count; // count all the group's properties we're about to merge in
                // merge in group's properties
                // NOTE: We don't use Array.addRange because flattenedProperties is not an Array.
                //       It can't be an array because it polutes the associative array and we need it to be purely properties.
                //       Array.prototype.addRange.apply() doesn't work either.
                // NOTE: In the case where a group exists but has no inner properties of its own, the for loop will short out
                //       and there will be no keys added to the collection, as expected.
                for(var subKey in groupProperties) {
                    var subVal = groupProperties[subKey];
                    flattenedProperties[subKey] = subVal;
                }
            }
            else {
                // is this a specified property (or use all properties)?
                if(!propertyNames || Array.indexOf(propertyNames, key) !== -1) {
                    flattenedProperties[key] = val;
                    count++; // keep track of how many properties are in the flattened dictionary
                }
            }
        }
        return { value: flattenedProperties, count: count };
    }

    function Sys$Services$_ProfileService$_get_path() {
        var path = this.get_path();
        if (!path.length) {
            path = Sys.Services._ProfileService.DefaultWebServicePath;
        }
        if (!path || !path.length) {
            throw Error.invalidOperation(Sys.Res.servicePathNotSet);
        }
        return path;
    }

    function Sys$Services$_ProfileService$_onLoadComplete(result, context, methodName) {
        if (typeof(result) !== "object") {
            throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, methodName, "Object"));
        }

        var unflattened = this._unflattenProperties(result);
        for (var name in unflattened) {
            this.properties[name] = unflattened[name];
        }
        
        var callback = context[0] || this.get_defaultLoadCompletedCallback() || this.get_defaultSucceededCallback();
        if (callback) {
            var userContext = context[2] || this.get_defaultUserContext();        
            callback(result.length, userContext, "Sys.Services.ProfileService.load");
        }
    }

    function Sys$Services$_ProfileService$_onLoadFailed(err, context, methodName) {
        var callback = context[1] || this.get_defaultFailedCallback();
        if (callback) {
            var userContext = context[2] || this.get_defaultUserContext();        
            callback(err, userContext, "Sys.Services.ProfileService.load");
        }
        else {
            Sys.Net.WebServiceProxy._defaultFailedCallback(err, methodName);
        }
    }

    function Sys$Services$_ProfileService$_onSaveComplete(result, context, methodName) {
        // context[3] is the number of properties we sent to the server.
        var count = context[3];
        if (result !== null) { // dont use if(result), might be number 0
            if (result instanceof Array) {
                // result is a list of properties that failed. Subtract the count to get the # succeeded
                count -= result.length;
            }
            else if (typeof(result) === 'number') {
                // legacy server API -- the number of successful properties is returned directly
                count = result;
            }
            else {
                // no other types allowed
                throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, methodName, "Array"));
            }
        }
        // else: if result is null, treat as an empty array (no failures)
        
        var callback = context[0] || this.get_defaultSaveCompletedCallback() || this.get_defaultSucceededCallback();
        if (callback) {
            var userContext = context[2] || this.get_defaultUserContext();
            callback(count, userContext, "Sys.Services.ProfileService.save");
        }
    }

    function Sys$Services$_ProfileService$_onSaveFailed(err, context, methodName) {
        var callback = context[1] || this.get_defaultFailedCallback();
        if (callback) {
            var userContext = context[2] || this.get_defaultUserContext();
            callback(err, userContext, "Sys.Services.ProfileService.save");
        }
        else {
            Sys.Net.WebServiceProxy._defaultFailedCallback(err, methodName);
        }
    }

    function Sys$Services$_ProfileService$_unflattenProperties(properties) {
        var unflattenedProperties = {};
        var dotIndex;
        var val;
        var count = 0;
        for (var key in properties) {
            count++;
            val = properties[key];

            dotIndex = key.indexOf('.');
            if (dotIndex !== -1) {
                var groupName = key.substr(0, dotIndex);
                key = key.substr(dotIndex+1);
                var group = unflattenedProperties[groupName];
                if (!group || !Sys.Services.ProfileGroup.isInstanceOfType(group)) {
                    group = new Sys.Services.ProfileGroup();
                    unflattenedProperties[groupName] = group;
                }
                group[key] = val;
            }
            else {
                unflattenedProperties[key] = val;
            }
        }
        properties.length = count;
        return unflattenedProperties;
    }
Sys.Services._ProfileService.prototype = {
    _defaultLoadCompletedCallback: null,
    _defaultSaveCompletedCallback: null,
    _path: '',
    _timeout: 0,
    get_defaultLoadCompletedCallback: Sys$Services$_ProfileService$get_defaultLoadCompletedCallback,
    set_defaultLoadCompletedCallback: Sys$Services$_ProfileService$set_defaultLoadCompletedCallback,
    get_defaultSaveCompletedCallback: Sys$Services$_ProfileService$get_defaultSaveCompletedCallback,
    set_defaultSaveCompletedCallback: Sys$Services$_ProfileService$set_defaultSaveCompletedCallback,
    get_path: Sys$Services$_ProfileService$get_path,
    load: Sys$Services$_ProfileService$load,
    save: Sys$Services$_ProfileService$save,
    // DevDiv 31283: calling load with two of the same property names throws an error, so we strip dups
    _clonePropertyNames: Sys$Services$_ProfileService$_clonePropertyNames,    
    // convert properties like properties.ProfileGroup.ProfileSetting to properties["ProfileGroup.ProfileSetting"].
    // propertyNames: list of properties that should be included in the flattened list (others are excluded)
    // properties: object containing properties to flatten
    // groupName: current group name used for recursion
    _flattenProperties: Sys$Services$_ProfileService$_flattenProperties,
    _get_path: Sys$Services$_ProfileService$_get_path,    
    _onLoadComplete: Sys$Services$_ProfileService$_onLoadComplete,
    _onLoadFailed: Sys$Services$_ProfileService$_onLoadFailed,
    _onSaveComplete: Sys$Services$_ProfileService$_onSaveComplete,
    _onSaveFailed: Sys$Services$_ProfileService$_onSaveFailed,
    _unflattenProperties: Sys$Services$_ProfileService$_unflattenProperties
}
Sys.Services._ProfileService.registerClass('Sys.Services._ProfileService', Sys.Net.WebServiceProxy);
Sys.Services.ProfileService = new Sys.Services._ProfileService();

Sys.Services.ProfileGroup = function Sys$Services$ProfileGroup(properties) {
    /// <summary locid="M:J#Sys.Services.ProfileGroup.#ctor" />
    /// <param name="properties" optional="true" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "properties", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;
    if (properties) {
        for (var property in properties) {
            this[property] = properties[property];
        }
    }
}
Sys.Services.ProfileGroup.registerClass('Sys.Services.ProfileGroup');

Sys.Services._AuthenticationService = function Sys$Services$_AuthenticationService() {
    /// <summary locid="M:J#Sys.Services._AuthenticationService.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    Sys.Services._AuthenticationService.initializeBase(this);
}
Sys.Services._AuthenticationService.DefaultWebServicePath = '';







    function Sys$Services$_AuthenticationService$get_defaultLoginCompletedCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Services._AuthenticationService.defaultLoginCompletedCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultLoginCompletedCallback;
    }
    function Sys$Services$_AuthenticationService$set_defaultLoginCompletedCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._defaultLoginCompletedCallback = value;
    }

    function Sys$Services$_AuthenticationService$get_defaultLogoutCompletedCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Services._AuthenticationService.defaultLogoutCompletedCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultLogoutCompletedCallback;
    }
    function Sys$Services$_AuthenticationService$set_defaultLogoutCompletedCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._defaultLogoutCompletedCallback = value;
    }

    function Sys$Services$_AuthenticationService$get_isLoggedIn() {
        /// <value type="Boolean" locid="P:J#Sys.Services._AuthenticationService.isLoggedIn"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._authenticated;
    }

    function Sys$Services$_AuthenticationService$get_path() {
        /// <value type="String" mayBeNull="true" locid="P:J#Sys.Services._AuthenticationService.path"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        // override from base to ensure returned value is '' even if usercode sets to null.
        // also refactored from v1 to ensure empty string on getter instead of setter.
        return this._path || '';
    }

    function Sys$Services$_AuthenticationService$login(username, password, isPersistent, customInfo, redirectUrl, loginCompletedCallback, failedCallback, userContext) {
        /// <summary locid="M:J#Sys.Services._AuthenticationService.login" />
        /// <param name="username" type="String" mayBeNull="false"></param>
        /// <param name="password" type="String" mayBeNull="true"></param>
        /// <param name="isPersistent" type="Boolean" optional="true" mayBeNull="true"></param>
        /// <param name="customInfo" type="String" optional="true" mayBeNull="true"></param>
        /// <param name="redirectUrl" type="String" optional="true" mayBeNull="true"></param>
        /// <param name="loginCompletedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="userContext" optional="true" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "username", type: String},
            {name: "password", type: String, mayBeNull: true},
            {name: "isPersistent", type: Boolean, mayBeNull: true, optional: true},
            {name: "customInfo", type: String, mayBeNull: true, optional: true},
            {name: "redirectUrl", type: String, mayBeNull: true, optional: true},
            {name: "loginCompletedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "failedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "userContext", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        // note: use of internal type here, but theres no other way
        this._invoke(this._get_path(), "Login", false,
                                        { userName: username, password: password, createPersistentCookie: isPersistent },
                                        Function.createDelegate(this, this._onLoginComplete),
                                        Function.createDelegate(this, this._onLoginFailed),
                                        [username, password, isPersistent, customInfo, redirectUrl, loginCompletedCallback, failedCallback, userContext]);
    }

    function Sys$Services$_AuthenticationService$logout(redirectUrl, logoutCompletedCallback, failedCallback, userContext) {
        /// <summary locid="M:J#Sys.Services._AuthenticationService.logout" />
        /// <param name="redirectUrl" type="String" optional="true" mayBeNull="true"></param>
        /// <param name="logoutCompletedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="userContext" optional="true" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "redirectUrl", type: String, mayBeNull: true, optional: true},
            {name: "logoutCompletedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "failedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "userContext", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        // note: use of internal type here, but theres no other way
        this._invoke(this._get_path(), "Logout", false, {}, 
                                        Function.createDelegate(this, this._onLogoutComplete),
                                        Function.createDelegate(this, this._onLogoutFailed),
                                        [redirectUrl, logoutCompletedCallback, failedCallback, userContext]);
    }

    function Sys$Services$_AuthenticationService$_get_path() {
        var path = this.get_path();
        if(!path.length) {
            path = Sys.Services._AuthenticationService.DefaultWebServicePath;
        }
        if(!path || !path.length) {
            throw Error.invalidOperation(Sys.Res.servicePathNotSet);
        }
        return path;
    }

    function Sys$Services$_AuthenticationService$_onLoginComplete(result, /*login param list*/context, methodName) {
        if(typeof(result) !== "boolean") {
            throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, methodName, "Boolean"));
        }
        
        var redirectUrl = context[4];
        var userContext = context[7] || this.get_defaultUserContext();
        var callback = context[5] || this.get_defaultLoginCompletedCallback() || this.get_defaultSucceededCallback();
        
        if(result) {
            this._authenticated = true;

            if (callback) {
                callback(true, userContext, "Sys.Services.AuthenticationService.login");
            }
            
            if (typeof(redirectUrl) !== "undefined" && redirectUrl !== null) {
                // url may be empty which is a valid link
                window.location.href = redirectUrl;
            }
        }
        else if (callback) {
            callback(false, userContext, "Sys.Services.AuthenticationService.login");
        }
    }

    function Sys$Services$_AuthenticationService$_onLoginFailed(err, context, methodName) {
        var callback = context[6] || this.get_defaultFailedCallback();
        if (callback) {
            var userContext = context[7] || this.get_defaultUserContext();
            callback(err, userContext, "Sys.Services.AuthenticationService.login");
        }
        else {
            Sys.Net.WebServiceProxy._defaultFailedCallback(err, methodName);
        }
    }

    function Sys$Services$_AuthenticationService$_onLogoutComplete(result, context, methodName) {
        if(result !== null) {
            throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, methodName, "null"));
        }
        
        var redirectUrl = context[0];
        var userContext = context[3] || this.get_defaultUserContext();
        var callback = context[1] || this.get_defaultLogoutCompletedCallback() || this.get_defaultSucceededCallback();

        this._authenticated = false;
        
        if (callback) {
            callback(null, userContext, "Sys.Services.AuthenticationService.logout");
        }
        
        // always redirect when logging out
        if(!redirectUrl) {
            window.location.reload();
        }
        else {
            window.location.href = redirectUrl;
        }
    }

    function Sys$Services$_AuthenticationService$_onLogoutFailed(err, context, methodName) {
        var callback = context[2] || this.get_defaultFailedCallback();
        if (callback) {
            callback(err, context[3], "Sys.Services.AuthenticationService.logout");
        }
        else {
            Sys.Net.WebServiceProxy._defaultFailedCallback(err, methodName);
        }
    }

    function Sys$Services$_AuthenticationService$_setAuthenticated(authenticated) {
        this._authenticated = authenticated;
    }
Sys.Services._AuthenticationService.prototype = {
    _defaultLoginCompletedCallback: null,
    _defaultLogoutCompletedCallback: null,
    _path: '',
    _timeout: 0,
    _authenticated: false,
    get_defaultLoginCompletedCallback: Sys$Services$_AuthenticationService$get_defaultLoginCompletedCallback,
    set_defaultLoginCompletedCallback: Sys$Services$_AuthenticationService$set_defaultLoginCompletedCallback,
    get_defaultLogoutCompletedCallback: Sys$Services$_AuthenticationService$get_defaultLogoutCompletedCallback,
    set_defaultLogoutCompletedCallback: Sys$Services$_AuthenticationService$set_defaultLogoutCompletedCallback,
    get_isLoggedIn: Sys$Services$_AuthenticationService$get_isLoggedIn,
    get_path: Sys$Services$_AuthenticationService$get_path,  
    login: Sys$Services$_AuthenticationService$login,
    logout: Sys$Services$_AuthenticationService$logout,
    _get_path: Sys$Services$_AuthenticationService$_get_path,
    _onLoginComplete: Sys$Services$_AuthenticationService$_onLoginComplete,
    _onLoginFailed: Sys$Services$_AuthenticationService$_onLoginFailed,
    _onLogoutComplete: Sys$Services$_AuthenticationService$_onLogoutComplete,
    _onLogoutFailed: Sys$Services$_AuthenticationService$_onLogoutFailed,
    _setAuthenticated: Sys$Services$_AuthenticationService$_setAuthenticated    
}

Sys.Services._AuthenticationService.registerClass('Sys.Services._AuthenticationService', Sys.Net.WebServiceProxy);
Sys.Services.AuthenticationService = new Sys.Services._AuthenticationService();

Sys.Services._RoleService = function Sys$Services$_RoleService() {
    Sys.Services._RoleService.initializeBase(this);
    this._roles = [];
}
Sys.Services._RoleService.DefaultWebServicePath = '';






    function Sys$Services$_RoleService$get_defaultLoadCompletedCallback() {
        /// <value type="Function" mayBeNull="true" locid="P:J#Sys.Services._RoleService.defaultLoadCompletedCallback"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._defaultLoadCompletedCallback;
    }
    function Sys$Services$_RoleService$set_defaultLoadCompletedCallback(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Function, mayBeNull: true}]);
        if (e) throw e;
        this._defaultLoadCompletedCallback = value;
    }

    function Sys$Services$_RoleService$get_path() {
        /// <value type="String" mayBeNull="true" locid="P:J#Sys.Services._RoleService.path"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        // override from base to ensure returned value is '' even if usercode sets to null, consistent with other appservices in v1.
        return this._path || '';
    }

    function Sys$Services$_RoleService$get_roles() {
        /// <value type="Array" elementType="String" mayBeNull="false" locid="P:J#Sys.Services._RoleService.roles"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return Array.clone(this._roles);
    }

    function Sys$Services$_RoleService$isUserInRole(role) {
        /// <summary locid="M:J#Sys.Services._RoleService.isUserInRole" />
        /// <param name="role" type="String" mayBeNull="false"></param>
        var e = Function._validateParams(arguments, [
            {name: "role", type: String}
        ]);
        if (e) throw e;
        var v = this._get_rolesIndex()[role.trim().toLowerCase()];
        return !!v;
    }

    function Sys$Services$_RoleService$load(loadCompletedCallback, failedCallback, userContext) {
        /// <summary locid="M:J#Sys.Services._RoleService.load" />
        /// <param name="loadCompletedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
        /// <param name="userContext" optional="true" mayBeNull="true"></param>
        var e = Function._validateParams(arguments, [
            {name: "loadCompletedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "failedCallback", type: Function, mayBeNull: true, optional: true},
            {name: "userContext", mayBeNull: true, optional: true}
        ]);
        if (e) throw e;
        Sys.Net.WebServiceProxy.invoke(
                    this._get_path(),
                    "GetRolesForCurrentUser",
                    false,
                    {} /* no params*/,
                    Function.createDelegate(this, this._onLoadComplete),
                    Function.createDelegate(this, this._onLoadFailed),
                    [loadCompletedCallback, failedCallback, userContext],
                    this.get_timeout());
    }

    function Sys$Services$_RoleService$_get_path() {
        var path = this.get_path();
        if(!path || !path.length) {
            path = Sys.Services._RoleService.DefaultWebServicePath;
        }
        if(!path || !path.length) {
            throw Error.invalidOperation(Sys.Res.servicePathNotSet);
        }
        return path;
    }

    function Sys$Services$_RoleService$_get_rolesIndex() {
        if (!this._rolesIndex) {
            var index = {};
            for(var i=0; i < this._roles.length; i++) {
                index[this._roles[i].toLowerCase()] = true;
            }
            this._rolesIndex = index;
        }
        return this._rolesIndex;
    }

    function Sys$Services$_RoleService$_onLoadComplete(result, context, methodName) {
        if(result && !(result instanceof Array)) {
            throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, methodName, "Array"));
        }

        this._roles = result;
        this._rolesIndex = null;

        var callback = context[0] || this.get_defaultLoadCompletedCallback() || this.get_defaultSucceededCallback();
        if (callback) {
            var userContext = context[2] || this.get_defaultUserContext();
            var clonedResult = Array.clone(result);
            callback(clonedResult, userContext, "Sys.Services.RoleService.load");
        }
    }

    function Sys$Services$_RoleService$_onLoadFailed(err, context, methodName) {
        var callback = context[1] || this.get_defaultFailedCallback();
        if (callback) {
            var userContext = context[2] || this.get_defaultUserContext();
            callback(err, userContext, "Sys.Services.RoleService.load");
        }
        else {
            Sys.Net.WebServiceProxy._defaultFailedCallback(err, methodName);
        }
    }
Sys.Services._RoleService.prototype = {
    _defaultLoadCompletedCallback: null,
    _rolesIndex: null,
    _timeout: 0,
    _path: '',
    get_defaultLoadCompletedCallback: Sys$Services$_RoleService$get_defaultLoadCompletedCallback,
    set_defaultLoadCompletedCallback: Sys$Services$_RoleService$set_defaultLoadCompletedCallback,
    get_path: Sys$Services$_RoleService$get_path,
    get_roles: Sys$Services$_RoleService$get_roles,
    isUserInRole: Sys$Services$_RoleService$isUserInRole,
    load: Sys$Services$_RoleService$load,
    _get_path: Sys$Services$_RoleService$_get_path,  
    _get_rolesIndex: Sys$Services$_RoleService$_get_rolesIndex,
    _onLoadComplete: Sys$Services$_RoleService$_onLoadComplete,
    _onLoadFailed: Sys$Services$_RoleService$_onLoadFailed
}

Sys.Services._RoleService.registerClass('Sys.Services._RoleService', Sys.Net.WebServiceProxy);
Sys.Services.RoleService = new Sys.Services._RoleService();

Type.registerNamespace('Sys.Serialization');


Sys.Serialization.JavaScriptSerializer = function Sys$Serialization$JavaScriptSerializer() {
    /// <summary locid="M:J#Sys.Serialization.JavaScriptSerializer.#ctor" />
    if (arguments.length !== 0) throw Error.parameterCount();
    // DevDiv #62350: Considered making all methods static and removing this constructor,
    // but this would have been a breaking change from Atlas 1.0 to Atlas Orcas so was rejected.
}
Sys.Serialization.JavaScriptSerializer.registerClass('Sys.Serialization.JavaScriptSerializer');

Sys.Serialization.JavaScriptSerializer._serverTypeFieldName = '__type';

// DevDiv Bugs 139383:
// Escape the backslashes so to _stringRegEx so we pass an escape sequence to the RegExp,
// not the literal character. Safari does not support the literal characters, and it fails on iPhone 1.01.
Sys.Serialization.JavaScriptSerializer._stringRegEx = new RegExp('["\\b\\f\\n\\r\\t\\\\\\x00-\\x1F]', 'i');
Sys.Serialization.JavaScriptSerializer._dateRegEx = new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"', 'g');
Sys.Serialization.JavaScriptSerializer._jsonRegEx = new RegExp('[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]', 'g');
Sys.Serialization.JavaScriptSerializer._jsonStringRegEx = new RegExp('"(\\\\.|[^"\\\\])*"', 'g');

Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder = function Sys$Serialization$JavaScriptSerializer$_serializeBooleanWithBuilder(object, stringBuilder) {
    stringBuilder.append(object.toString());
}

Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder = function Sys$Serialization$JavaScriptSerializer$_serializeNumberWithBuilder(object, stringBuilder) {
    if (isFinite(object)) {
        stringBuilder.append(String(object));
    }
    else {
        throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers);
    }
}

Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder = function Sys$Serialization$JavaScriptSerializer$_serializeStringWithBuilder(object, stringBuilder) {
    stringBuilder.append('"');

    // DevDiv 139383: Removed Safari check here.
    // Safari 2 supports \x## escapes in regular expressions as long as they are escaped in the regex pattern
    if (Sys.Serialization.JavaScriptSerializer._stringRegEx.test(object)) {
        var length = object.length;
        for (i = 0; i < length; ++i) {
            var curChar = object.charAt(i);
            // currently '/u001f' or below are escaped
            if (curChar >= ' ') {
                // Handle backslashes and quotes by escaping
                if (curChar === '\\' || curChar === '"') {
                    stringBuilder.append('\\');
                }
                stringBuilder.append(curChar);
            }
            else {
                switch (curChar) {
                    case '\b':
                        stringBuilder.append('\\b');
                        break;
                    case '\f':
                        stringBuilder.append('\\f');
                        break;
                    case '\n':
                        stringBuilder.append('\\n');
                        break;
                    case '\r':
                        stringBuilder.append('\\r');
                        break;
                    case '\t':
                        stringBuilder.append('\\t');
                        break;
                    default:
                        // Add the escaped code
                        stringBuilder.append('\\u00');
                        if (curChar.charCodeAt() < 16) stringBuilder.append('0');
                        stringBuilder.append(curChar.charCodeAt().toString(16));
                }
            }
        }
    } else {
        stringBuilder.append(object);
    }
    stringBuilder.append('"');    
}

Sys.Serialization.JavaScriptSerializer._serializeWithBuilder = function Sys$Serialization$JavaScriptSerializer$_serializeWithBuilder(object, stringBuilder, sort, prevObjects) {
    var i;
    switch (typeof object) {
    case 'object':
        if (object) {
            if (prevObjects){
                // The loop below makes serilzation O(n^2) worst case for linked list like struture
                // where in depth of graph is in linear proportion to number of elements.
                // However the depth of graph is limited by call stack size(less than 1000 in IE7) hence 
                // the performance hit is within reasonable bounds for debug mode
                for( var j = 0; j < prevObjects.length; j++) {
                    if (prevObjects[j] === object) {
                        throw Error.invalidOperation(Sys.Res.cannotSerializeObjectWithCycle);
                    }
                }
            }
            else {
                prevObjects = new Array();
            }
            try {
                Array.add(prevObjects, object);
                
                if (Number.isInstanceOfType(object)){
                    Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(object, stringBuilder);
                }
                else if (Boolean.isInstanceOfType(object)){
                    Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(object, stringBuilder);
                }
                else if (String.isInstanceOfType(object)){
                    Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(object, stringBuilder);
                }
            
                // Arrays
                else if (Array.isInstanceOfType(object)) {
                    stringBuilder.append('[');
                   
                    for (i = 0; i < object.length; ++i) {
                        if (i > 0) {
                            stringBuilder.append(',');
                        }
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(object[i], stringBuilder,false,prevObjects);
                    }
                    stringBuilder.append(']');
                }
                else {
                    // DivDev 41125: Do not confuse atlas serialized strings with dates
                    // Currently it always serialize as \/Date({milliseconds from 1970/1/1})\/
                    // For example \/Date(123)\/
                    if (Date.isInstanceOfType(object)) {
                        stringBuilder.append('"\\/Date(');
                        stringBuilder.append(object.getTime());
                        stringBuilder.append(')\\/"');
                        break;
                    }

                    var properties = [];
                    var propertyCount = 0;
                    for (var name in object) {
                        // skip internal properties that should not be serialized.
                        if (name.startsWith('$')) {
                            continue;
                        }
                        //DevDiv 74427 : Need to make sure that _type is first item on JSON serialization
                        if (name === Sys.Serialization.JavaScriptSerializer._serverTypeFieldName && propertyCount !== 0){
                            // if current propery Name is __type, swap it with the first element on property array.
                            properties[propertyCount++] = properties[0];
                            properties[0] = name;
                        }
                        else{
                            properties[propertyCount++] = name;
                        }
                    }
                    if (sort) properties.sort();

                    stringBuilder.append('{');
                    var needComma = false;
                     
                    for (i=0; i<propertyCount; i++) {
                        var value = object[properties[i]];
                        if (typeof value !== 'undefined' && typeof value !== 'function') {
                            if (needComma) {
                                stringBuilder.append(',');
                            }
                            else {
                                needComma = true;
                            }
                           
                            // Serialize the name of the object property, then the value
                            Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(properties[i], stringBuilder, sort, prevObjects);
                            stringBuilder.append(':');
                            Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(value, stringBuilder, sort, prevObjects);
                          
                        }
                    }
                stringBuilder.append('}');
                }
            }
            finally {
                Array.removeAt(prevObjects, prevObjects.length - 1);
            }
        }
        else {
            stringBuilder.append('null');
        }
        break;

    case 'number':
        Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(object, stringBuilder);
        break;

    case 'string':
        Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(object, stringBuilder);
        break;

    case 'boolean':
        Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(object, stringBuilder);
        break;

    default:
        stringBuilder.append('null');
        break;
    }
}

Sys.Serialization.JavaScriptSerializer.serialize = function Sys$Serialization$JavaScriptSerializer$serialize(object) {
    /// <summary locid="M:J#Sys.Serialization.JavaScriptSerializer.serialize" />
    /// <param name="object" mayBeNull="true"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "object", mayBeNull: true}
    ]);
    if (e) throw e;
    var stringBuilder = new Sys.StringBuilder();
    Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(object, stringBuilder, false);
    return stringBuilder.toString();
}

Sys.Serialization.JavaScriptSerializer.deserialize = function Sys$Serialization$JavaScriptSerializer$deserialize(data, secure) {
    /// <summary locid="M:J#Sys.Serialization.JavaScriptSerializer.deserialize" />
    /// <param name="data" type="String"></param>
    /// <param name="secure" type="Boolean" optional="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "data", type: String},
        {name: "secure", type: Boolean, optional: true}
    ]);
    if (e) throw e;
    
    if (data.length === 0) throw Error.argument('data', Sys.Res.cannotDeserializeEmptyString);
    // DevDiv 41127: Never confuse atlas serialized strings with dates.
    // DevDiv 74430: JavasciptSerializer will need to handle date time offset - following WCF design
    // serilzed dates might look like "\/Date(123)\/" or "\/Date(123A)" or "Date(123+4567)" or Date(123-4567)"
    // the regex escaped version of this pattern is \"\\/Date\(123(?:[a-zA-Z]|(?:\+|-)[0-9]{4})?\)\\/\"
    // but we must also do js escaping to put it in the string. Escape all \ with \\
    // Result: \\"\\\\/Date\\(123(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"
    // The 123 can really be any number with an optional -, and we want to capture it.
    // Regex for that is: (-?[0-9]+)
    // Result: \\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"
    // We want to avoid replacing serialized strings that happen to contain this string as a substring.
    // We can do that by excluding matches that start with a slash \ since that means the first quote is escaped.
    // The first quote of a real date string will never be escaped and so will never be preceeded with \
    // So we want to add regex pattern (^|[^\\]) to the beginning, which means "beginning of string or anything but slash".
    // JS Escaped version: (^|[^\\\\])
    // Result: (^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"
    // Finally, the replace string is $1new Date($2). We must include $1 so we put back the potentially matched character we captured.

    try {    
        var exp = data.replace(Sys.Serialization.JavaScriptSerializer._dateRegEx, "$1new Date($2)");
        
        if (secure && Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(
             exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx, ''))) throw null;

        return eval('(' + exp + ')');
    }
    catch (e) {
         throw Error.argument('data', Sys.Res.cannotDeserializeInvalidJson);
    }
}

// CultureInfo must go after JavaScriptSerializer since it deserializes the __cultureInfo object inline.
 
Sys.CultureInfo = function Sys$CultureInfo(name, numberFormat, dateTimeFormat) {
    /// <summary locid="M:J#Sys.CultureInfo.#ctor" />
    /// <param name="name" type="String"></param>
    /// <param name="numberFormat" type="Object"></param>
    /// <param name="dateTimeFormat" type="Object"></param>
    var e = Function._validateParams(arguments, [
        {name: "name", type: String},
        {name: "numberFormat", type: Object},
        {name: "dateTimeFormat", type: Object}
    ]);
    if (e) throw e;
    this.name = name;
    this.numberFormat = numberFormat;
    this.dateTimeFormat = dateTimeFormat;
}

    function Sys$CultureInfo$_getDateTimeFormats() {
        if (! this._dateTimeFormats) {
            var dtf = this.dateTimeFormat;
            this._dateTimeFormats =
              [ dtf.MonthDayPattern,
                dtf.YearMonthPattern,
                dtf.ShortDatePattern,
                dtf.ShortTimePattern,
                dtf.LongDatePattern,
                dtf.LongTimePattern,
                dtf.FullDateTimePattern,
                dtf.RFC1123Pattern,
                dtf.SortableDateTimePattern,
                dtf.UniversalSortableDateTimePattern ];
        }
        return this._dateTimeFormats;
    }
    function Sys$CultureInfo$_getMonthIndex(value) {
        if (!this._upperMonths) {
            this._upperMonths = this._toUpperArray(this.dateTimeFormat.MonthNames);
        }
        return Array.indexOf(this._upperMonths, this._toUpper(value));
    }
    function Sys$CultureInfo$_getAbbrMonthIndex(value) {
        if (!this._upperAbbrMonths) {
            this._upperAbbrMonths = this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthNames);
        }
        return Array.indexOf(this._upperAbbrMonths, this._toUpper(value));
    }
    function Sys$CultureInfo$_getDayIndex(value) {
        if (!this._upperDays) {
            this._upperDays = this._toUpperArray(this.dateTimeFormat.DayNames);
        }
        return Array.indexOf(this._upperDays, this._toUpper(value));
    }
    function Sys$CultureInfo$_getAbbrDayIndex(value) {
        if (!this._upperAbbrDays) {
            this._upperAbbrDays = this._toUpperArray(this.dateTimeFormat.AbbreviatedDayNames);
        }
        return Array.indexOf(this._upperAbbrDays, this._toUpper(value));
    }
    function Sys$CultureInfo$_toUpperArray(arr) {
        var result = [];
        for (var i = 0, il = arr.length; i < il; i++) {
            result[i] = this._toUpper(arr[i]);
        }
        return result;
    }
    function Sys$CultureInfo$_toUpper(value) {
        // 'he-IL' has non-breaking space (\u00A0) in weekday names.  In this case replace
        // didn't work using the space escape code ('\s'), so must match the exact character.
        return value.split("\u00A0").join(' ').toUpperCase();
    }
Sys.CultureInfo.prototype = {
    _getDateTimeFormats: Sys$CultureInfo$_getDateTimeFormats,
    _getMonthIndex: Sys$CultureInfo$_getMonthIndex,
    _getAbbrMonthIndex: Sys$CultureInfo$_getAbbrMonthIndex,
    _getDayIndex: Sys$CultureInfo$_getDayIndex,
    _getAbbrDayIndex: Sys$CultureInfo$_getAbbrDayIndex,
    _toUpperArray: Sys$CultureInfo$_toUpperArray,
    _toUpper: Sys$CultureInfo$_toUpper
}
Sys.CultureInfo._parse = function Sys$CultureInfo$_parse(value) {
    var cultureInfo = Sys.Serialization.JavaScriptSerializer.deserialize(value);
    return new Sys.CultureInfo(cultureInfo.name, cultureInfo.numberFormat, cultureInfo.dateTimeFormat);
}
Sys.CultureInfo.registerClass('Sys.CultureInfo');

// Make sure the invariant and 'en-US' cultureInfos contained in this file contain unicode in
// place of the non-ascii characters so it matches the encoding of the MicrosoftAjax.js script.
// This is especially required when jsCrunch builds the release script, because it will not
// convert non-ascii characters to unicode correctly for the current MicrosoftAjax.js encoding.
Sys.CultureInfo.InvariantCulture = Sys.CultureInfo._parse('{"name":"","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":true,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"\u00A4","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":true},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, dd MMMM yyyy HH:mm:ss","LongDatePattern":"dddd, dd MMMM yyyy","LongTimePattern":"HH:mm:ss","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"MM/dd/yyyy","ShortTimePattern":"HH:mm","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"yyyy MMMM","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":true,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}');

if (typeof(__cultureInfo) === 'undefined') {
    var __cultureInfo = '{"name":"en-US","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":false,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"$","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":false},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, MMMM dd, yyyy h:mm:ss tt","LongDatePattern":"dddd, MMMM dd, yyyy","LongTimePattern":"h:mm:ss tt","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"M/d/yyyy","ShortTimePattern":"h:mm tt","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"MMMM, yyyy","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":false,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}';
}
Sys.CultureInfo.CurrentCulture = Sys.CultureInfo._parse(__cultureInfo);
delete __cultureInfo;

 
Sys.UI.Behavior = function Sys$UI$Behavior(element) {
    /// <summary locid="M:J#Sys.UI.Behavior.#ctor" />
    /// <param name="element" domElement="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true}
    ]);
    if (e) throw e;
    Sys.UI.Behavior.initializeBase(this);

    this._element = element;

    var behaviors = element._behaviors;
    if (!behaviors) {
        element._behaviors = [this];
    }
    else {
        behaviors[behaviors.length] = this;
    }
}


    function Sys$UI$Behavior$get_element() {
        /// <value domElement="true" locid="P:J#Sys.UI.Behavior.element"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._element;
    }
    function Sys$UI$Behavior$get_id() {
        /// <value type="String" locid="P:J#Sys.UI.Behavior.id"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        var baseId = Sys.UI.Behavior.callBaseMethod(this, 'get_id');
        if (baseId) return baseId;
        if (!this._element || !this._element.id) return '';
        return this._element.id + '$' + this.get_name();
    }
    function Sys$UI$Behavior$get_name() {
        /// <value type="String" locid="P:J#Sys.UI.Behavior.name"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this._name) return this._name;
        var name = Object.getTypeName(this);
        var i = name.lastIndexOf('.');
        if (i != -1) name = name.substr(i + 1);
        if (!this.get_isInitialized()) this._name = name;
        return name;
    }
    function Sys$UI$Behavior$set_name(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        if ((value === '') || (value.charAt(0) === ' ') || (value.charAt(value.length - 1) === ' '))
            throw Error.argument('value', Sys.Res.invalidId);
        if (typeof(this._element[value]) !== 'undefined')
            throw Error.invalidOperation(String.format(Sys.Res.behaviorDuplicateName, value));
        if (this.get_isInitialized()) throw Error.invalidOperation(Sys.Res.cantSetNameAfterInit);
        this._name = value;
    }
    function Sys$UI$Behavior$initialize() {
        Sys.UI.Behavior.callBaseMethod(this, 'initialize');
        var name = this.get_name();
        if (name) this._element[name] = this;
    }
    function Sys$UI$Behavior$dispose() {
        Sys.UI.Behavior.callBaseMethod(this, 'dispose');
        if (this._element) {
            var name = this.get_name();
            if (name) {
                this._element[name] = null;
            }
            Array.remove(this._element._behaviors, this);
            delete this._element;
        }
    }
Sys.UI.Behavior.prototype = {
    _name: null,
    get_element: Sys$UI$Behavior$get_element,
    get_id: Sys$UI$Behavior$get_id,
    get_name: Sys$UI$Behavior$get_name,
    set_name: Sys$UI$Behavior$set_name,
    initialize: Sys$UI$Behavior$initialize,
    dispose: Sys$UI$Behavior$dispose
}
Sys.UI.Behavior.registerClass('Sys.UI.Behavior', Sys.Component);

Sys.UI.Behavior.getBehaviorByName = function Sys$UI$Behavior$getBehaviorByName(element, name) {
    /// <summary locid="M:J#Sys.UI.Behavior.getBehaviorByName" />
    /// <param name="element" domElement="true"></param>
    /// <param name="name" type="String"></param>
    /// <returns type="Sys.UI.Behavior" mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "name", type: String}
    ]);
    if (e) throw e;
    var b = element[name];
    return (b && Sys.UI.Behavior.isInstanceOfType(b)) ? b : null;
}

Sys.UI.Behavior.getBehaviors = function Sys$UI$Behavior$getBehaviors(element) {
    /// <summary locid="M:J#Sys.UI.Behavior.getBehaviors" />
    /// <param name="element" domElement="true"></param>
    /// <returns type="Array" elementType="Sys.UI.Behavior"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true}
    ]);
    if (e) throw e;
    if (!element._behaviors) return [];
    return Array.clone(element._behaviors);
}

Sys.UI.Behavior.getBehaviorsByType = function Sys$UI$Behavior$getBehaviorsByType(element, type) {
    /// <summary locid="M:J#Sys.UI.Behavior.getBehaviorsByType" />
    /// <param name="element" domElement="true"></param>
    /// <param name="type" type="Type"></param>
    /// <returns type="Array" elementType="Sys.UI.Behavior"></returns>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true},
        {name: "type", type: Type}
    ]);
    if (e) throw e;
    var behaviors = element._behaviors;
    var results = [];
    if (behaviors) {
        for (var i = 0, l = behaviors.length; i < l; i++) {
            if (type.isInstanceOfType(behaviors[i])) {
                results[results.length] = behaviors[i];
            }
        }
    }
    return results;
}
 
Sys.UI.VisibilityMode = function Sys$UI$VisibilityMode() {
    /// <summary locid="M:J#Sys.UI.VisibilityMode.#ctor" />
    /// <field name="hide" type="Number" integer="true" static="true" locid="F:J#Sys.UI.VisibilityMode.hide"></field>
    /// <field name="collapse" type="Number" integer="true" static="true" locid="F:J#Sys.UI.VisibilityMode.collapse"></field>
    if (arguments.length !== 0) throw Error.parameterCount();
    throw Error.notImplemented();
}



Sys.UI.VisibilityMode.prototype = {
    hide: 0,
    collapse: 1
}
Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");

 
Sys.UI.Control = function Sys$UI$Control(element) {
    /// <summary locid="M:J#Sys.UI.Control.#ctor" />
    /// <param name="element" domElement="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "element", domElement: true}
    ]);
    if (e) throw e;
    if (typeof(element.control) != 'undefined') throw Error.invalidOperation(Sys.Res.controlAlreadyDefined);
    Sys.UI.Control.initializeBase(this);

    this._element = element;
    element.control = this;
}




    function Sys$UI$Control$get_element() {
        /// <value domElement="true" locid="P:J#Sys.UI.Control.element"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        return this._element;
    }
    function Sys$UI$Control$get_id() {
        /// <value type="String" locid="P:J#Sys.UI.Control.id"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._element) return '';
        return this._element.id;
    }
    function Sys$UI$Control$set_id(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: String}]);
        if (e) throw e;
        throw Error.invalidOperation(Sys.Res.cantSetId);
    }
    function Sys$UI$Control$get_parent() {
        /// <value type="Sys.UI.Control" locid="P:J#Sys.UI.Control.parent"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (this._parent) return this._parent;
        if (!this._element) return null;
        
        var parentElement = this._element.parentNode;
        while (parentElement) {
            if (parentElement.control) {
                return parentElement.control;
            }
            parentElement = parentElement.parentNode;
        }
        return null;
    }
    function Sys$UI$Control$set_parent(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Sys.UI.Control}]);
        if (e) throw e;
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        var parents = [this];
        var current = value;
        while (current) {
            if (Array.contains(parents, current)) throw Error.invalidOperation(Sys.Res.circularParentChain);
            parents[parents.length] = current;
            current = current.get_parent();
        }
        this._parent = value;
    }
    function Sys$UI$Control$get_visibilityMode() {
        /// <value type="Sys.UI.VisibilityMode" locid="P:J#Sys.UI.Control.visibilityMode"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        return Sys.UI.DomElement.getVisibilityMode(this._element);
    }
    function Sys$UI$Control$set_visibilityMode(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Sys.UI.VisibilityMode}]);
        if (e) throw e;
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        Sys.UI.DomElement.setVisibilityMode(this._element, value);
    }
    function Sys$UI$Control$get_visible() {
        /// <value type="Boolean" locid="P:J#Sys.UI.Control.visible"></value>
        if (arguments.length !== 0) throw Error.parameterCount();
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        return Sys.UI.DomElement.getVisible(this._element);
    }
    function Sys$UI$Control$set_visible(value) {
        var e = Function._validateParams(arguments, [{name: "value", type: Boolean}]);
        if (e) throw e;
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        Sys.UI.DomElement.setVisible(this._element, value)
    }
    function Sys$UI$Control$addCssClass(className) {
        /// <summary locid="M:J#Sys.UI.Control.addCssClass" />
        /// <param name="className" type="String"></param>
        var e = Function._validateParams(arguments, [
            {name: "className", type: String}
        ]);
        if (e) throw e;
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        Sys.UI.DomElement.addCssClass(this._element, className);
    }
    function Sys$UI$Control$dispose() {
        Sys.UI.Control.callBaseMethod(this, 'dispose');
        if (this._element) {
            this._element.control = undefined;
            delete this._element;
        }
        if (this._parent) delete this._parent;
    }
    function Sys$UI$Control$onBubbleEvent(source, args) {
        /// <summary locid="M:J#Sys.UI.Control.onBubbleEvent" />
        /// <param name="source"></param>
        /// <param name="args" type="Sys.EventArgs"></param>
        /// <returns type="Boolean"></returns>
        var e = Function._validateParams(arguments, [
            {name: "source"},
            {name: "args", type: Sys.EventArgs}
        ]);
        if (e) throw e;
        return false;
    }
    function Sys$UI$Control$raiseBubbleEvent(source, args) {
        /// <summary locid="M:J#Sys.UI.Control.raiseBubbleEvent" />
        /// <param name="source"></param>
        /// <param name="args" type="Sys.EventArgs"></param>
        var e = Function._validateParams(arguments, [
            {name: "source"},
            {name: "args", type: Sys.EventArgs}
        ]);
        if (e) throw e;
        var currentTarget = this.get_parent();
        while (currentTarget) {
            if (currentTarget.onBubbleEvent(source, args)) {
                return;
            }
            currentTarget = currentTarget.get_parent();
        }
    }
    function Sys$UI$Control$removeCssClass(className) {
        /// <summary locid="M:J#Sys.UI.Control.removeCssClass" />
        /// <param name="className" type="String"></param>
        var e = Function._validateParams(arguments, [
            {name: "className", type: String}
        ]);
        if (e) throw e;
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        Sys.UI.DomElement.removeCssClass(this._element, className);
    }
    function Sys$UI$Control$toggleCssClass(className) {
        /// <summary locid="M:J#Sys.UI.Control.toggleCssClass" />
        /// <param name="className" type="String"></param>
        var e = Function._validateParams(arguments, [
            {name: "className", type: String}
        ]);
        if (e) throw e;
        if (!this._element) throw Error.invalidOperation(Sys.Res.cantBeCalledAfterDispose);
        Sys.UI.DomElement.toggleCssClass(this._element, className);
    }
Sys.UI.Control.prototype = {
    _parent: null,
    _visibilityMode: Sys.UI.VisibilityMode.hide,
    get_element: Sys$UI$Control$get_element,
    get_id: Sys$UI$Control$get_id,
    set_id: Sys$UI$Control$set_id,
    get_parent: Sys$UI$Control$get_parent,
    set_parent: Sys$UI$Control$set_parent,
    get_visibilityMode: Sys$UI$Control$get_visibilityMode,
    set_visibilityMode: Sys$UI$Control$set_visibilityMode,
    get_visible: Sys$UI$Control$get_visible,
    set_visible: Sys$UI$Control$set_visible,
    addCssClass: Sys$UI$Control$addCssClass,
    dispose: Sys$UI$Control$dispose,
    onBubbleEvent: Sys$UI$Control$onBubbleEvent,
    raiseBubbleEvent: Sys$UI$Control$raiseBubbleEvent,
    removeCssClass: Sys$UI$Control$removeCssClass,
    toggleCssClass: Sys$UI$Control$toggleCssClass
}
Sys.UI.Control.registerClass('Sys.UI.Control', Sys.Component);

Type.registerNamespace('Sys');
Sys.Res={
"argumentTypeName":"值不是现有类型的名称。",
"methodRegisteredTwice":"方法 {0} 已经被注册。",
"cantSetIdAfterInit":"初始化后无法在此对象上设置 ID 属性。",
"cantBeCalledAfterDispose":"无法在释放之后调用。",
"componentCantSetIdAfterAddedToApp":"在组件已添加到 Application 对象后，将无法设置组件的 ID 属性。",
"behaviorDuplicateName":"名称为“{0}”的行为已存在，或者它是目标元素上现有属性的名称。",
"notATypeName":"值不是有效的类型名称。",
"typeShouldBeTypeOrString":"值不是有效的类型或有效的类型名称。",
"boolTrueOrFalse":"值必须为“true”或“false”。",
"stringFormatInvalid":"格式字符串无效。",
"referenceNotFound":"找不到组件“{0}”。",
"enumReservedName":"“{0}”是不能用作枚举值名称的保留名称。",
"eventHandlerNotFound":"找不到处理程序。",
"circularParentChain":"控件父项链不能具有循环引用。",
"undefinedEvent":"“{0}”不是事件。",
"notAMethod":"{0} 不是方法。",
"propertyUndefined":"“{0}”不是属性或现有字段。",
"eventHandlerInvalid":"未通过 Sys.UI.DomEvent.addHandler 方法添加处理程序。",
"scriptLoadFailedDebug":"脚本“{0}”未能加载。请检查:\r\n 不可访问的路径。\r\n 脚本错误。(IE)在高级设置下启用“显示每个脚本错误的通知”。\r\n 缺少对 Sys.Application.notifyScriptLoaded() 的调用。",
"propertyNotWritable":"“{0}”不是可写的属性。",
"enumInvalidValueName":"对于枚举值，“{0}”不是有效的名称。",
"controlAlreadyDefined":"控件已与元素关联。",
"addHandlerCantBeUsedForError":"不能使用此方法添加错误事件的处理程序。请改为设置 window.onerror 属性。",
"namespaceContainsObject":"对象 {0} 已存在，并且不是命名空间。",
"cantAddNonFunctionhandler":"无法添加不是函数的处理程序。",
"scriptLoaderAlreadyLoading":"当 ScriptLoader 已经在加载脚本时，无法调用 ScriptLoader.loadScripts。",
"invalidNameSpace":"值不是有效的命名空间标识符。",
"notAnInterface":"值不是有效的接口。",
"eventHandlerNotFunction":"处理程序必须为函数。",
"propertyNotAnArray":"“{0}”不是数组属性。",
"typeRegisteredTwice":"类型 {0} 已经被注册。可以已定义了类型多次，或者定义类型的脚本文件可能已加载。原因可能是在不完全更新过程中更改了设置。",
"cantSetNameAfterInit":"初始化后无法在此对象上设置名称属性。",
"appDuplicateComponent":"无法将具有相同 ID“{0}”的两个组件添加到应用程序。",
"appComponentMustBeInitialized":"必须先初始化组件，然后才能将它们添加到 Application 对象。",
"baseNotAClass":"值不是类。",
"methodNotFound":"找不到名为“{0}”的方法。",
"arrayParseBadFormat":"值必须是数组的有效字符串表示形式。它必须以“[”开头并以“]”结尾。",
"cantSetId":"无法在此对象上设置 ID 属性。",
"stringFormatBraceMismatch":"格式字符串包含不匹配的左大括号或右大括号。",
"enumValueNotInteger":"枚举定义只能包含整数值。",
"propertyNullOrUndefined":"无法设置“{0}”的属性，因为它返回了 null 值。",
"argumentDomNode":"值必须为 DOM 元素或文本节点。",
"componentCantSetIdTwice":"无法多次设置组件的 ID 属性。",
"createComponentOnDom":"对于不是控件或行为的组件，值必须为 null。",
"createNotComponent":"{0} 不从 Sys.Component 派生。",
"createNoDom":"对于控件和行为，值不能为 null。",
"cantAddWithoutId":"无法添加没有 ID 的组件。",
"badTypeName":"值不是所注册类型的名称，或者名称是保留字。",
"argumentInteger":"值必须为整数。",
"scriptLoadMultipleCallbacks":"脚本“{0}”包含对 Sys.Application.notifyScriptLoaded() 的多个调用。只允许一个调用。",
"invokeCalledTwice":"无法调用 invoke 多次。",
"webServiceFailed":"服务器方法“{0}”失败，并发生以下错误: {1}",
"webServiceInvalidJsonWrapper":"服务器方法“{0}”返回的数据无效。JSON 包装缺少“d”属性。",
"argumentType":"无法将对象转换为所需类型。",
"argumentNull":"值不能为 null。",
"controlCantSetId":"无法在控件上设置 ID 属性。",
"formatBadFormatSpecifier":"格式说明符无效。",
"webServiceFailedNoMsg":"服务器方法“{0}”失败。",
"argumentDomElement":"值必须为 DOM 元素。",
"invalidExecutorType":"无法从 {0} 中创建有效的 Sys.Net.WebRequestExecutor。",
"cannotCallBeforeResponse":"responseAvailable 为 false 时无法调用 {0}。",
"actualValue":"实际值是 {0}。",
"enumInvalidValue":"“{0}”对于枚举 {1} 不是有效的值。",
"scriptLoadFailed":"无法加载脚本“{0}”。",
"parameterCount":"参数计数不匹配。",
"cannotDeserializeEmptyString":"无法反序列化空字符串。",
"formatInvalidString":"输入字符串的格式不正确。",
"invalidTimeout":"值必须大于或等于零。",
"cannotAbortBeforeStart":"执行器尚未启动时无法中止。",
"argument":"值不在预期的范围内。",
"cannotDeserializeInvalidJson":"无法反序列化。数据未对应于有效的 JSON。",
"invalidHttpVerb":"httpVerb 不能设置为空字符串或 null 字符串。",
"nullWebRequest":"无法调用带有 null webRequest 的 executeRequest。",
"eventHandlerInvalid":"未通过 Sys.UI.DomEvent.addHandler 方法添加处理程序。",
"cannotSerializeNonFiniteNumbers":"无法序列化无限数。",
"argumentUndefined":"值不能是未定义的。",
"webServiceInvalidReturnType":"服务器方法“{0}”返回了无效类型。期望的类型: {1}",
"servicePathNotSet":"尚未设置 Web 服务的路径。",
"argumentTypeWithTypes":"类型“{0}”的对象无法转换为类型“{1}”。",
"cannotCallOnceStarted":"启动后将无法调用 {0}。",
"badBaseUrl1":"基 URL 不包含 ://。",
"badBaseUrl2":"基 URL 不包含另一个 /。",
"badBaseUrl3":"在基 URL 中找不到最后一个 /。",
"setExecutorAfterActive":"无法在执行器已激活之后对其进行设置。",
"paramName":"参数名: {0}",
"cannotCallOutsideHandler":"无法在完成的事件处理程序外部调用 {0}。",
"cannotSerializeObjectWithCycle":"无法序列化子属性中具有循环引用的对象。",
"format":"已标识项中有一项的格式无效。",
"assertFailedCaller":"断言失败: {0}\r\n位置为 {1}",
"argumentOutOfRange":"指定的参数已超出有效值的范围。",
"webServiceTimedOut":"服务器方法“{0}”已超时。",
"notImplemented":"方法或操作未实现。",
"assertFailed":"断言失败: {0}",
"invalidOperation":"对象的当前状态使该操作无效。",
"breakIntoDebugger":"{0}\r\n\r\n是否中断至调试器?"
};

if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();