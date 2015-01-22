/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit._DialogMixin"],["require","dijit._Widget"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit._DialogMixin"]){_4._hasResource["dijit._DialogMixin"]=true;_4.provide("dijit._DialogMixin");_4.require("dijit._Widget");_4.declare("dijit._DialogMixin",null,{attributeMap:_5._Widget.prototype.attributeMap,execute:function(_7){},onCancel:function(){},onExecute:function(){},_onSubmit:function(){this.onExecute();this.execute(this.get("value"));},_getFocusItems:function(){var _8=_5._getTabNavigable(this.containerNode);this._firstFocusItem=_8.lowest||_8.first||this.closeButtonNode||this.domNode;this._lastFocusItem=_8.last||_8.highest||this._firstFocusItem;}});}}};});