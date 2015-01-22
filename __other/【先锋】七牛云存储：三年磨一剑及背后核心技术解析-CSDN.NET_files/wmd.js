;(function () {

//--------------------------------
	function _debug(o)
	{
		//alert(typeof o);
		var str = '';
		for(var i in o)
		{
			if(typeof o[i] === Object || (String(o[i])==="[object Object]"))
			{
				str += "\n"+i+" =>\n";
				str += _debug(o[i]);
			}
			else
			{
				str += i +' : '+ o[i] + "\n";
			}
		}
		return str;
	}
	
	function debug(o)
	{
		alert(_debug(o));
	}
//---------------------------------
	WMDEditor = function (options) {
		this.options = WMDEditor.util.extend({}, WMDEditor.defaults, options || {});
		
		wmdBase(this, this.options);

		this.startEditor();
	};
	window.WMDEditor = WMDEditor;
	
	var upload_path = "http://10.4.0.203/wmd2/upload/";
	
	
	WMDEditor.defaults = { // {{{
		version: 2.0,
		output_format: "markdown",
		lineLength: 40,

		button_bar: "wmd-button-bar",
		preview: "wmd-preview",
		output: "wmd-output",
		input: "wmd-input",

		// The text that appears on the upper part of the dialog box when
		// entering links.
		imageDialogText: "<p style='margin-top: 0px'><b>插入图片地址</b></p>" + "<p></p>" + "<p  style='text-align: center'>http://www.csdn.com/images/cloud1.jpg   \"Optional title\"</p>",
		linkDialogText: "<p style='margin-top: 0px'><b>插入链接地址</b></p>" + "<p></p>" + "<p style='text-align: center'>http://www.csdn.com/   \"Optional title\"</p>",

		// The default text that appears in the dialog input box when entering
		// links.
		imageDefaultText: "http://",
		linkDefaultText: "http://",
		imageDirectory: "images/",

		// The link and title for the help button
		helpLink: "http://ask.csdn.net/pages/markdown",
		helpHoverTitle: "WMD website",
		helpTarget: "_blank",

		// Some intervals in ms.  These can be adjusted to reduce the control's load.
		previewPollInterval: 500,
		pastePollInterval: 100,

		buttons: "bold italic link blockquote code image ol ul heading hr",
		
		tagFilter: {
			enabled: true,
			allowedTags: /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i,
			patternLink: /^(<a\shref="(\#\d+|(https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+)"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i,
			patternImage: /^(<img\ssrc="https?:(\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+)"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i
		}
	}; // }}}
	WMDEditor.prototype = {
		getPanels: function () {
			return {
				buttonBar: (typeof this.options.button_bar == 'string') ? document.getElementById(this.options.button_bar) : this.options.button_bar,
				preview: (typeof this.options.preview == 'string') ? document.getElementById(this.options.preview) : this.options.preview,
				output: (typeof this.options.output == 'string') ? document.getElementById(this.options.output) : this.options.output,
				input: (typeof this.options.input == 'string') ? document.getElementById(this.options.input) : this.options.input
			};
		},

		startEditor: function () {
			this.panels = this.getPanels();
			this.previewMgr = new PreviewManager(this);
			edit = new this.editor(this.previewMgr.refresh);
			this.previewMgr.refresh(true);
		}
	};


	var util = { // {{{
		// Returns true if the DOM element is visible, false if it's hidden.
		// Checks if display is anything other than none.
		isVisible: function (elem) {
			// shamelessly copied from jQuery
			return elem.offsetWidth > 0 || elem.offsetHeight > 0;
		},

		// Adds a listener callback to a DOM element which is fired on a specified
		// event.
		addEvent: function (elem, event, listener) {
			if (elem.attachEvent) {
				// IE only.  The "on" is mandatory.
				elem.attachEvent("on" + event, listener);
			}
			else {
				// Other browsers.
				elem.addEventListener(event, listener, false);
			}
		},

		// Removes a listener callback from a DOM element which is fired on a specified
		// event.
		removeEvent: function (elem, event, listener) {
			if (elem.detachEvent) {
				// IE only.  The "on" is mandatory.
				elem.detachEvent("on" + event, listener);
			}
			else {
				// Other browsers.
				elem.removeEventListener(event, listener, false);
			}
		},

		// Converts \r\n and \r to \n.
		fixEolChars: function (text) {
			text = text.replace(/\r\n/g, "\n");
			text = text.replace(/\r/g, "\n");
			return text;
		},

		// Extends a regular expression.  Returns a new RegExp
		// using pre + regex + post as the expression.
		// Used in a few functions where we have a base
		// expression and we want to pre- or append some
		// conditions to it (e.g. adding "$" to the end).
		// The flags are unchanged.
		//
		// regex is a RegExp, pre and post are strings.
		extendRegExp: function (regex, pre, post) {

			if (pre === null || pre === undefined) {
				pre = "";
			}
			if (post === null || post === undefined) {
				post = "";
			}

			var pattern = regex.toString();
			var flags = "";

			// Replace the flags with empty space and store them.
			// Technically, this can match incorrect flags like "gmm".
			var result = pattern.match(/\/([gim]*)$/);
			if (result === null) {
				flags = result[0];
			}
			else {
				flags = "";
			}

			// Remove the flags and slash delimiters from the regular expression.
			pattern = pattern.replace(/(^\/|\/[gim]*$)/g, "");
			pattern = pre + pattern + post;

			return new RegExp(pattern, flags);
		},

		// Sets the image for a button passed to the WMD editor.
		// Returns a new element with the image attached.
		// Adds several style properties to the image.
		//
		// XXX-ANAND: Is this used anywhere?
		createImage: function (img) {

			var imgPath = imageDirectory + img;

			var elem = document.createElement("img");
			elem.className = "wmd-button";
			elem.src = imgPath;

			return elem;
		},

		// This simulates a modal dialog box and asks for the URL when you
		// click the hyperlink or image buttons.
		//
		// text: The html for the input box.
		// defaultInputText: The default value that appears in the input box.
		// makeLinkMarkdown: The function which is executed when the prompt is dismissed, either via OK or Cancel
		prompt: function (text, defaultInputText, makeLinkMarkdown, uploadImage) {

			// These variables need to be declared at this level since they are used
			// in multiple functions.
			var dialog; // The dialog box.
			var background; // The background beind the dialog box.
			var input; // The text box where you enter the hyperlink.
			if (defaultInputText === undefined) {
				defaultInputText = "";
			}

			// Used as a keydown event handler. Esc dismisses the prompt.
			// Key code 27 is ESC.
			var checkEscape = function (key) {
				var code = (key.charCode || key.keyCode);
				if (code === 27) {
					close(true);
				}
			};

			// Dismisses the hyperlink input box.
			// isCancel is true if we don't care about the input text.
			// isCancel is false if we are going to keep the text.
			var close = function (isCancel) {
				util.removeEvent(document.body, "keydown", checkEscape);
				var text = input.value;

				if (isCancel) {
					text = null;
				}
				else {
					// Fixes common pasting errors.
					text = text.replace('http://http://', 'http://');
					text = text.replace('http://https://', 'https://');
					text = text.replace('http://ftp://', 'ftp://');
				}

				dialog.parentNode.removeChild(dialog);
				background.parentNode.removeChild(background);
				makeLinkMarkdown(text);
				return false;
			};

			// Creates the background behind the hyperlink text entry box.
			// Most of this has been moved to CSS but the div creation and
			// browser-specific hacks remain here.
			var createBackground = function () {
				background = document.createElement("div");
				background.className = "wmd-prompt-background";
				style = background.style;
				style.position = "absolute";
				style.top = "0";

				style.zIndex = "10000";

				// Some versions of Konqueror don't support transparent colors
				// so we make the whole window transparent.
				//
				// Is this necessary on modern konqueror browsers?
				if (browser.isKonqueror) {
					style.backgroundColor = "transparent";
				}
				else if (browser.isIE) {
					style.filter = "alpha(opacity=50)";
				}
				else {
					style.opacity = "0.5";
				}

				var pageSize = position.getPageSize();
				style.height = pageSize[1] + "px";

				/*
				if (browser.isIE) {
					style.left = document.documentElement.scrollLeft;
					style.width = document.body.clientWidth;
				}
				else {
					style.left = "0";
					style.width = "100%";
				}
				*/
				style.left = '0';
				style.width = document.body.scrollWidth +'px';

				document.body.appendChild(background);
			};

			// Create the text input box form/window.
			var createDialog = function () {

				// The main dialog box.
				dialog = document.createElement("div");
				dialog.className = "wmd-prompt-dialog";
				dialog.style.padding = "10px;";
				dialog.style.position = "absolute";
				dialog.style.width = "400px";
				dialog.style.zIndex = "10001";

				// The dialog text. �Ի����ı�title
				var question = document.createElement("div");
				question.innerHTML = text;
				question.style.padding = "5px";
				dialog.appendChild(question);

				// The web form container for the text box and buttons.
				var form = document.createElement("form");
				form.onsubmit = function () {
					return close(false);
				};
				style = form.style;
				style.padding = "0";
				style.margin = "0";
				style.cssFloat = "left";
				style.width = "100%";
				style.textAlign = "center";
				style.position = "relative";
				dialog.appendChild(form);

				// The input text box form�?��������
				input = document.createElement("input");
				input.type = "text";
				input.value = defaultInputText;
				input.className = 'dialog-input';
				style = input.style;
				style.display = "block";
				style.width = "80%";
				style.marginLeft = style.marginRight = "auto";
				form.appendChild(input);

				// The ok button
				var okButton = document.createElement("input");
				okButton.type = "button";
				okButton.onclick = function () {
					return close(false);
				};
				okButton.value = "确定";
				style = okButton.style;
				okButton.className = 'dialog-button';
				style.margin = "10px";
				style.display = "inline";
				style.width = "7em";


				// The cancel button
				var cancelButton = document.createElement("input");
				cancelButton.type = "button";
				cancelButton.className = 'dialog-button';
				cancelButton.onclick = function () {
					return close(true);
				};
				cancelButton.value = "取消";
				style = cancelButton.style;
				style.margin = "10px";
				style.display = "inline";
				style.width = "7em";

				// The order of these buttons is different on macs.
				if (/mac/.test(nav.platform.toLowerCase())) {
					form.appendChild(cancelButton);
					form.appendChild(okButton);
				}
				else {
					form.appendChild(okButton);
					form.appendChild(cancelButton);
				}

				util.addEvent(document.body, "keydown", checkEscape);
				//dialog.style.top = "50%";
				//dialog.style.left = "50%";
				var winSize = position.getWinSize();
				dialog.style.left = winSize[0] - 200 +'px';
				dialog.style.top = winSize[1] - 150 +'px';
				dialog.style.display = "block";
				/*
				if (browser.isIE_5or6) {
					dialog.style.position = "absolute";
					dialog.style.top = document.documentElement.scrollTop + 200 + "px";
					dialog.style.left = "50%";
				}
				*/
				document.body.appendChild(dialog);

				// This has to be done AFTER adding the dialog to the form if you
				// want it to be centered.
				//dialog.style.marginTop = -(position.getHeight(dialog) / 2) + "px";
				//dialog.style.marginLeft = -(position.getWidth(dialog) / 2) + "px";
			};
			
			var createUploadImageDialog = function () {
				// The main dialog box.
				dialog = document.createElement("div");
				dialog.className = "wmd-prompt-dialog";
				dialog.style.padding = "10px;";
				dialog.style.position = "absolute";
				dialog.style.width = "400px";
				dialog.style.zIndex = "10001";
				dialog.innerHTML = "<p style='padding:7px 0 0 5px; text-align:left;'><b>插入图片</b></p><p style='padding-top: 10px; height:35px; text-align:center;'>http://www.csdn.com/images/cloud1.jpg" +
                    "</p>" +
                    "<iframe id='upload-iframe' style='display:none;' src='about:blank' name='upload-iframe'></iframe><form target='upload-iframe' id='upload-image-form' action='upload.php' method='post' enctype='multipart/form-data'><div style='position: relative;display:none;' id='upload-file-input'>  <input type='file' name='upload_image' id='filename-input' value='browse' style='border:0; font-size:18px; position:relative; text-align:right; -moz-opacity:0; filter:alpha(opacity: 0); opacity: 0; z-index: 2; width:280px; height:28px;margin-left:64px;'><div style='position: absolute; top:0px; left:0px; z-index: 1;'>    <input type='input' name='shadow-filename' value='' id='shadow-filename' style='width: 180px; margin-left:64px;'>    <input type='button' name='choose-file' id='choose-file' value='Browse ...' style='width: 7em; margin-left: 5px;'>  </div></div><div id='upload-url-input' style=' text-align:center;'>    <input type='input' name='upload-url' value='http://' style='width: 250px;'></div><p id='upload-message' style='padding-top: 4px; margin:0; line-height: 16px;'></p><div class='ac_loading' id='image-upload-progress' style='display:none;'>Uploading ...</div><div style='padding:10px 0 20px; text-align:center;'><input type='button' value='确定' style='display:inline-block; width: 7em; margin:0 10px;' id='ok-dialog-button' /><input type='button' value='取消' id='close-dialog-button' style='display:inline-block; width: 7em; margin: 0 10px;'></div></form>";
				
				
				util.addEvent(document.body, "keydown", checkEscape);
				var winSize = position.getWinSize();
				dialog.style.left = winSize[0] - 200 +'px';
				dialog.style.top = winSize[1] - 150 +'px';
				dialog.style.display = "block";
				document.body.appendChild(dialog);
				var tabname = 'upload';
				input = document.getElementsByName('shadow-filename')[0];
				$('#filename-input').change(function(){
					$('#shadow-filename').val('uploading...');
					$('#image-upload-progress').show();
					$('#upload-image-form').submit();
				});
				
				$('#upload-image-button').unbind('click').click(function(){
					tabname = 'upload';
					$('.wmd-mini-button').removeClass('selected');
					$(this).addClass('selected');
					$('#upload-file-input').show();
					$('#upload-url-input').hide();
					input = document.getElementsByName('shadow-filename')[0];
				});
				$('#upload-url-button').unbind('click').click(function(){
					tabname = 'web'
					$('.wmd-mini-button').removeClass('selected');
					$(this).addClass('selected');
					$('#upload-file-input').hide();
					$('#upload-url-input').show();
					input = document.getElementsByName('upload-url')[0];
				});


				$('#ok-dialog-button').unbind('click').click(function(){
					if(tabname == 'upload')
					{
						if($.trim(input.value) != '' && input.value != 'uploading...')
						{
							input.value = upload_path + input.value;
						}
						else
						{
							input.value = 'http://';
						}
					}
					return close(false);
				});
				$('#close-dialog-button').unbind('click').click(function(){
					return close(true);
				});
				
			}
			
			createBackground();

			// Why is this in a zero-length timeout?
			// Is it working around a browser bug?
			window.setTimeout(function () {
				if(uploadImage === true)
				{
					createUploadImageDialog();
				}
				else
				{
					createDialog();
				}

				var defTextLen = defaultInputText.length;
				if (input.selectionStart !== undefined) {
					input.selectionStart = 0;
					input.selectionEnd = defTextLen;
				}
				else if (input.createTextRange) {
					var range = input.createTextRange();
					range.collapse(false);
					range.moveStart("character", -defTextLen);
					range.moveEnd("character", defTextLen);
					range.select();
				}
				input.focus();
			}, 0);
		},
		
		suggest: function (makeLinkMarkdown, c) {

			// Used as a keydown event handler. Esc dismisses the prompt.
			// Key code 27 is ESC.
			var checkEscape = function (key) {
				var code = (key.charCode || key.keyCode);
				if (code === 27) {
					close(true);
				}
			};

			// Dismisses the hyperlink input box.
			// isCancel is true if we don't care about the input text.
			// isCancel is false if we are going to keep the text.
			var close = function (isCancel) {
				util.removeEvent(document.body, "keydown", checkEscape);
				var text = $.trim($('#qlink_input').val());
				var link = $.trim($('#qlink_url').val());;

				if (isCancel) {
					text = null;
					link = null;
				}
				else {
					// Fixes common pasting errors.
					link = link.replace('http://http://', 'http://');
					link = link.replace('http://https://', 'https://');
					link = link.replace('http://ftp://', 'ftp://');
				}

				//dialog.parentNode.removeChild(dialog);
				//background.parentNode.removeChild(background);
				$("#qlink_box").remove();
				if($('#tp_hidden')){$('#tp_hidden').remove();}
				makeLinkMarkdown({text:text, link:link});
				return false;
			};
						
			if(!$('#qlink_box').length) {
				var suggestBox = $('<div id="qlink_box"><div style="margin-left:8px;">Link to Questions, Topics and People</div><input id="qlink_input" type="text" /><input id="qlink_url" type="hidden" /><div id="qlink_suggest" style="display:none;"></div></div>');
				//suggestBox.insertAfter($('#wmd-input'));
				
				var b = $("<em>...</em>");
				a = $('#wmd-input');
				//debug(a.scrollHeight);
				var tt = document.getElementById('wmd-input');
				var tscroll = false;
				var d = a.offset(),
				e = {};
				var widthHider = a.width();
				if(tt.scrollHeight > tt.clientHeight)
				{
					tscroll = true;
					widthHider -= 24;
				}
				//alert(widthHider);
				//debug(dd);

				var mentionflag = $("<div id='tp_hidden'></div>").css({
					position: "absolute",
					left: -99999,
					width: widthHider + "px",
					height: a.height() + "px",
					padding: "0 3px",
					font: "12px/18px Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif",
					"word-wrap": "break-word",
					border: "1px solid #DDD",
					"overflow": "hidden"
					//"word-break": "break-all"
				});
				mentionflag.appendTo("body");
				var text = util.fixEolChars(c.before);
				text = text.replace(/[<>]/g,function(c){return {'<':'&lt;','>':'&gt;'}[c];});
				text = text.replace(/&/ig, '&amp;');
				text = text.replace(/\n/g, '<br>');
				text = text.replace(/    /g, '<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>');
				text = text.replace(/   /g, '<span>&nbsp;&nbsp;&nbsp;</span>');
				text = text.replace(/  /g, '<span>&nbsp;&nbsp;</span>');
				text = text.replace(/ /g, '<span> </span>');
				//text = text.replace(/[\t ]/g,function(c){return {'\t':'<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',' ':'<span>&nbsp;</span>'}[c];});
				mentionflag.html(text).append(b);
				e = b.position();
				//debug(e);
				//left: e.left + d.left + 2,
				//top: e.top + d.top + 21
				var left = e.left + d.left + 2;
				//var top = (tscroll == true ? tt.scrollHeight - tt.scrollTop : e.top + d.top + 12);
				var top = tscroll == true ? e.top + d.top + 12 - tt.scrollTop : e.top + d.top + 12;
				//alert(e.left + " : " + e.top);
				suggestBox.appendTo("body");
				suggestBox.css({
							top: top + "px",
							left: left + "px"
						}).show()
				
				//suggestBox.fadeIn();
				$('#qlink_input').focus();
			}
			
			util.addEvent(document.body, "keydown", checkEscape);
			
			$('#qlink_input').unbind('blur').blur(function(){
				$('#qlink_box').fadeOut('fast', function(){$(this).remove()});
				close(false);
			});
						
			var set_active = function (j)
			{
				var dd = $('#qlink_suggest dd');
				dd.each(function(i){
					if(i == j)
					{
						$(this).addClass('active');
						$('#qlink_input').val($(this).text());
						$('#qlink_url').val($(this).attr('url'));
					}
					else
					{
						$(this).removeClass('active');
					}
				});
			}
			var j=-1;
			var timer;
			
			$('#qlink_input').unbind('keydown').keydown(function(event){
			
				var dd = $('#qlink_suggest dd');
				//alert(event.keyCode);
				if(event.keyCode == 40 || event.keyCode == 38)
				{
					if(event.keyCode == 40)
					{
						if(j < dd.length)
						{
							j++;
							if(j >= dd.length)
							{
								j=-1;
							}
						}
						if(j >= dd.length)
						{
							j=-1;
						}
					}
					if(event.keyCode == 38)
					{
						if(j >= 0)
						{
							j--;
							if(j <= -1)
							{
								j = dd.length;
							}
						}else{
							j = dd.length - 1;
						}
					}
					clearTimeout(timer);
					timer = setTimeout(function(){set_active(j)}, 10);
				}
			
				//Enter
				if(event.keyCode == 13)
				{
					clearTimeout(timer);
					timer = setTimeout(function(){close(false)}, 0);
				}
			});
			
			$('#qlink_input').unbind('keyup').keyup(function(event){
				var input = $.trim($(this).val());
				if(input)
				{
					if(event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 37 && event.keyCode != 39)
					{
						//ajax���
						var data = {};
						
						j=-1;
					
						//list
						var suggest_html = $('<dl><dd url="http://www.fanhow.com/answers/question-96135-how-to-close-teamviewer-popups">how to close teamviewer popups</dd><dd url="http://www.fanhow.com/answers/question-96133-how-do-you-import-a-slide-layout-of-powerpoint-in-mac">how do you import a slide layout of powerpoint in mac</dd><dd url="http://www.fanhow.com/answers/question-96132-how-to-open-.mpp-document">how to open .mpp document</dd><dd url="http://www.fanhow.com/answers/question-96130-how-to-cut-a-photo-in-elipse-shape-in-photoshop-cs4">how to cut a photo in elipse shape in photoshop cs4</dd><dd url="http://www.fanhow.com/answers/question-96124-how-to-add-a-scrolling-text-box-in-dreamweaver-cs5">how to add a scrolling text box in dreamweaver cs5</dd></dl>');
						$('#qlink_suggest').html(suggest_html);
						$('#qlink_suggest').show();
						$('#qlink_suggest dd').unbind('mousedown').mousedown(function(event){
							$('#qlink_input').val($(this).text());
							$('#qlink_url').val($(this).attr('url'));
							close(false)
							//clearTimeout(timer);
							//timer = setTimeout(function(){close(false)}, 0);
						});
					}
				}
				else
				{
					$('#qlink_suggest').hide();
				}
			});
			

			

			//alert('suggest dialog');
		},
		
		extend: function () {
			function _update(a, b) {
				for (var k in b) {
					a[k] = b[k];
				}
				return a;
			}

			var d = {};
			for (var i = 0; i < arguments.length; i++) {
				_update(d, arguments[i]);
			}
			return d;
		}
	}; // }}}
	var position = { // {{{ 
		// UNFINISHED
		// The assignment in the while loop makes jslint cranky.
		// I'll change it to a better loop later.
		getTop: function (elem, isInner) {
			var result = elem.offsetTop;
			if (!isInner) {
				while (elem = elem.offsetParent) {
					result += elem.offsetTop;
				}
			}
			return result;
		},

		getHeight: function (elem) {
			return elem.offsetHeight || elem.scrollHeight;
		},

		getWidth: function (elem) {
			return elem.offsetWidth || elem.scrollWidth;
		},

		getPageSize: function () {
			var scrollWidth, scrollHeight;
			var innerWidth, innerHeight;

			// It's not very clear which blocks work with which browsers.
			if (self.innerHeight && self.scrollMaxY) {
				scrollWidth = document.body.scrollWidth;
				scrollHeight = self.innerHeight + self.scrollMaxY;
			}
			else if (document.body.scrollHeight > document.body.offsetHeight) {
				scrollWidth = document.body.scrollWidth;
				scrollHeight = document.body.scrollHeight;
			}
			else {
				scrollWidth = document.body.offsetWidth;
				scrollHeight = document.body.offsetHeight;
			}

			if (self.innerHeight) {
				// Non-IE browser
				innerWidth = self.innerWidth;
				innerHeight = self.innerHeight;
			}
			else if (document.documentElement && document.documentElement.clientHeight) {
				// Some versions of IE (IE 6 w/ a DOCTYPE declaration)
				innerWidth = document.documentElement.clientWidth;
				innerHeight = document.documentElement.clientHeight;
			}
			else if (document.body) {
				// Other versions of IE
				innerWidth = document.body.clientWidth;
				innerHeight = document.body.clientHeight;
			}

			var maxWidth = Math.max(scrollWidth, innerWidth);
			var maxHeight = Math.max(scrollHeight, innerHeight);
			return [maxWidth, maxHeight, innerWidth, innerHeight];
		},
		
		getWinSize: function () {
			var left = 0, top = 0;

			try {
				top = window.innerHeight / 2 + pageYOffset;
				left = window.innerWidth / 2 + pageXOffset;
			} catch(e) {
				var _docElement = document.documentElement;
				if (!document.body.scrollTop) {
					top = _docElement.offsetHeight / 2 + _docElement.scrollTop;
					left = _docElement.offsetWidth / 2 + _docElement.scrollLeft;
				} else {
					top = _docElement.offsetHeight / 2 + document.body.scrollTop;
					left = _docElement.offsetWidth / 2 + document.body.scrollLeft;
				}
			}

			return [left, top];
		}
	}; // }}}
	// The input textarea state/contents.
	// This is used to implement undo/redo by the undo manager.
	var TextareaState = function (textarea, wmd) { // {{{
		// Aliases
		var stateObj = this;
		var inputArea = textarea;

		this.init = function () {

			if (!util.isVisible(inputArea)) {
				return;
			}

			this.setInputAreaSelectionStartEnd();
			this.scrollTop = inputArea.scrollTop;
			if (!this.text && inputArea.selectionStart || inputArea.selectionStart === 0) {
				this.text = inputArea.value;
			}
		};

		// Sets the selected text in the input box after we've performed an
		// operation.
		this.setInputAreaSelection = function () {

			if (!util.isVisible(inputArea)) {
				return;
			}

			if (inputArea.selectionStart !== undefined && !browser.isOpera) {

				inputArea.focus();
				inputArea.selectionStart = stateObj.start;
				inputArea.selectionEnd = stateObj.end;
				inputArea.scrollTop = stateObj.scrollTop;
			}
			else if (document.selection) {

				if (typeof(document.activeElement)!="unknown" && document.activeElement && document.activeElement !== inputArea) {
					return;
				}

				inputArea.focus();
				var range = inputArea.createTextRange();
				range.moveStart("character", -inputArea.value.length);
				range.moveEnd("character", -inputArea.value.length);
				range.moveEnd("character", stateObj.end);
				range.moveStart("character", stateObj.start);
				range.select();
			}
		};

		this.setInputAreaSelectionStartEnd = function () {

			if (inputArea.selectionStart || inputArea.selectionStart === 0) {

				stateObj.start = inputArea.selectionStart;
				stateObj.end = inputArea.selectionEnd;
				//debug(inputArea());
			}
			else if (document.selection) {

				stateObj.text = util.fixEolChars(inputArea.value);

				// IE loses the selection in the textarea when buttons are
				// clicked.  On IE we cache the selection and set a flag
				// which we check for here.
				var range;
				if (wmd.ieRetardedClick && wmd.ieCachedRange) {
					range = wmd.ieCachedRange;
					wmd.ieRetardedClick = false;
				}
				else {
					range = document.selection.createRange();
				}
				//debug(range);

				var fixedRange = util.fixEolChars(range.text);
				var marker = "\x07";
				var markedRange = marker + fixedRange + marker;
				range.text = markedRange;
				var inputText = util.fixEolChars(inputArea.value);

				range.moveStart("character", -markedRange.length);
				range.text = fixedRange;

				stateObj.start = inputText.indexOf(marker);
				stateObj.end = inputText.lastIndexOf(marker) - marker.length;

				var len = stateObj.text.length - util.fixEolChars(inputArea.value).length;

				if (len) {
					range.moveStart("character", -fixedRange.length);
					while (len--) {
						fixedRange += "\n";
						stateObj.end += 1;
					}
					range.text = fixedRange;
				}

				this.setInputAreaSelection();
			}
		};

		// Restore this state into the input area.
		this.restore = function () {

			if (stateObj.text != undefined && stateObj.text != inputArea.value) {
				inputArea.value = stateObj.text;
			}
			this.setInputAreaSelection();
			inputArea.scrollTop = stateObj.scrollTop;
		};

		// Gets a collection of HTML chunks from the inptut textarea.
		this.getChunks = function () {

			var chunk = new Chunks();

			chunk.before = util.fixEolChars(stateObj.text.substring(0, stateObj.start));
			chunk.startTag = "";
			chunk.selection = util.fixEolChars(stateObj.text.substring(stateObj.start, stateObj.end));
			chunk.endTag = "";
			chunk.after = util.fixEolChars(stateObj.text.substring(stateObj.end));
			chunk.scrollTop = stateObj.scrollTop;
			
			//��չ ���������λ��
			//����� ��
			
			return chunk;
		};

		// Sets the TextareaState properties given a chunk of markdown.
		this.setChunks = function (chunk) {

			chunk.before = chunk.before + chunk.startTag;
			chunk.after = chunk.endTag + chunk.after;

			if (browser.isOpera) {
				chunk.before = chunk.before.replace(/\n/g, "\r\n");
				chunk.selection = chunk.selection.replace(/\n/g, "\r\n");
				chunk.after = chunk.after.replace(/\n/g, "\r\n");
			}

			this.start = chunk.before.length;
			this.end = chunk.before.length + chunk.selection.length;
			this.text = chunk.before + chunk.selection + chunk.after;
			this.scrollTop = chunk.scrollTop;
		
		};
		
		this.init();
	}; // }}}
	// Chunks {{{
	// before: contains all the text in the input box BEFORE the selection.
	// after: contains all the text in the input box AFTER the selection.
	var Chunks = function () {};

	// startRegex: a regular expression to find the start tag
	// endRegex: a regular expresssion to find the end tag
	Chunks.prototype.findTags = function (startRegex, endRegex) {

		var chunkObj = this;
		var regex;

		if (startRegex) {

			regex = util.extendRegExp(startRegex, "", "$");

			this.before = this.before.replace(regex, function (match) {
				chunkObj.startTag = chunkObj.startTag + match;
				return "";
			});

			regex = util.extendRegExp(startRegex, "^", "");

			this.selection = this.selection.replace(regex, function (match) {
				chunkObj.startTag = chunkObj.startTag + match;
				return "";
			});
		}

		if (endRegex) {

			regex = util.extendRegExp(endRegex, "", "$");

			this.selection = this.selection.replace(regex, function (match) {
				chunkObj.endTag = match + chunkObj.endTag;
				return "";
			});

			regex = util.extendRegExp(endRegex, "^", "");

			this.after = this.after.replace(regex, function (match) {
				chunkObj.endTag = match + chunkObj.endTag;
				return "";
			});
		}
	};

	// If remove is false, the whitespace is transferred
	// to the before/after regions.
	//
	// If remove is true, the whitespace disappears.
	Chunks.prototype.trimWhitespace = function (remove) {

		this.selection = this.selection.replace(/^(\s*)/, "");

		if (!remove) {
			this.before += re.$1;
		}

		this.selection = this.selection.replace(/(\s*)$/, "");

		if (!remove) {
			this.after = re.$1 + this.after;
		}
	};


	Chunks.prototype.addBlankLines = function (nLinesBefore, nLinesAfter, findExtraNewlines) {

		if (nLinesBefore === undefined) {
			nLinesBefore = 1;
		}

		if (nLinesAfter === undefined) {
			nLinesAfter = 1;
		}

		nLinesBefore++;
		nLinesAfter++;

		var regexText;
		var replacementText;

	    // New bug discovered in Chrome, which appears to be related to use of RegExp.$1
	    // Hack it to hold the match results. Sucks because we're double matching...
		var match = /(^\n*)/.exec(this.selection);

		this.selection = this.selection.replace(/(^\n*)/, "");
		this.startTag = this.startTag + (match ? match[1] : "");
		match = /(\n*$)/.exec(this.selection);
		this.selection = this.selection.replace(/(\n*$)/, "");
		this.endTag = this.endTag + (match ? match[1] : "");
		match = /(^\n*)/.exec(this.startTag);
		this.startTag = this.startTag.replace(/(^\n*)/, "");
		this.before = this.before + (match ? match[1] : "");
		match = /(\n*$)/.exec(this.endTag);
		this.endTag = this.endTag.replace(/(\n*$)/, "");
		this.after = this.after + (match ? match[1] : "");

		if (this.before) {

			regexText = replacementText = "";

			while (nLinesBefore--) {
				regexText += "\\n?";
				replacementText += "\n";
			}

			if (findExtraNewlines) {
				regexText = "\\n*";
			}
			this.before = this.before.replace(new re(regexText + "$", ""), replacementText);
		}

		if (this.after) {

			regexText = replacementText = "";

			while (nLinesAfter--) {
				regexText += "\\n?";
				replacementText += "\n";
			}
			if (findExtraNewlines) {
				regexText = "\\n*";
			}

			this.after = this.after.replace(new re(regexText, ""), replacementText);
		}
	};
	// }}} - END CHUNKS
	// Watches the input textarea, polling at an interval and runs
	// a callback function if anything has changed.
	var InputPoller = function (textarea, callback, interval) { // {{{
		var pollerObj = this;
		var inputArea = textarea;

		// Stored start, end and text.  Used to see if there are changes to the input.
		var lastStart;
		var lastEnd;
		var markdown;

		var killHandle; // Used to cancel monitoring on destruction.
		// Checks to see if anything has changed in the textarea.
		// If so, it runs the callback.
		this.tick = function () {

			if (!util.isVisible(inputArea)) {
				return;
			}

			// Update the selection start and end, text.
			if (inputArea.selectionStart || inputArea.selectionStart === 0) {
				var start = inputArea.selectionStart;
				var end = inputArea.selectionEnd;
				if (start != lastStart || end != lastEnd) {
					lastStart = start;
					lastEnd = end;

					if (markdown != inputArea.value) {
						markdown = inputArea.value;
						return true;
					}
				}
			}
			return false;
		};


		var doTickCallback = function () {

			if (!util.isVisible(inputArea)) {
				return;
			}

			// If anything has changed, call the function.
			if (pollerObj.tick()) {
				callback();
			}
		};

		// Set how often we poll the textarea for changes.
		var assignInterval = function () {
			killHandle = window.setInterval(doTickCallback, interval);
		};

		this.destroy = function () {
			window.clearInterval(killHandle);
		};

		assignInterval();
	}; // }}}
	var PreviewManager = function (wmd) { // {{{
		var managerObj = this;
		var converter;
		var poller;
		var timeout;
		var elapsedTime;
		var oldInputText;
		var htmlOut;
		var maxDelay = 3000;
		var startType = "delayed"; // The other legal value is "manual"
		// Adds event listeners to elements and creates the input poller.
		var setupEvents = function (inputElem, listener) {

			util.addEvent(inputElem, "input", listener);
			inputElem.onpaste = listener;
			inputElem.ondrop = listener;

			util.addEvent(inputElem, "keypress", listener);
			util.addEvent(inputElem, "keydown", listener);
			// previewPollInterval is set at the top of this file.
			poller = new InputPoller(wmd.panels.input, listener, wmd.options.previewPollInterval);
		};

		var getDocScrollTop = function () {

			var result = 0;

			if (window.innerHeight) {
				result = window.pageYOffset;
			}
			else if (document.documentElement && document.documentElement.scrollTop) {
				result = document.documentElement.scrollTop;
			}
			else if (document.body) {
				result = document.body.scrollTop;
			}

			return result;
		};

		var makePreviewHtml = function () {

			// If there are no registered preview and output panels
			// there is nothing to do.
			if (!wmd.panels.preview && !wmd.panels.output) {
				return;
			}

			var text = wmd.panels.input.value;
			if (text && text == oldInputText) {
				return; // Input text hasn't changed.
			}
			else {
				oldInputText = text;
			}

			var prevTime = new Date().getTime();

			if (!converter && wmd.showdown) {
				converter = new wmd.showdown.converter();
			}

			if (converter) {
				text = converter.makeHtml(text);
			}

			// Calculate the processing time of the HTML creation.
			// It's used as the delay time in the event listener.
			var currTime = new Date().getTime();
			elapsedTime = currTime - prevTime;

			pushPreviewHtml(text);
			htmlOut = text;
		};

		// setTimeout is already used.  Used as an event listener.
		var applyTimeout = function () {

			if (timeout) {
				window.clearTimeout(timeout);
				timeout = undefined;
			}

			if (startType !== "manual") {

				var delay = 0;

				if (startType === "delayed") {
					delay = elapsedTime;
				}

				if (delay > maxDelay) {
					delay = maxDelay;
				}
				timeout = window.setTimeout(makePreviewHtml, delay);
			}
		};

		var getScaleFactor = function (panel) {
			if (panel.scrollHeight <= panel.clientHeight) {
				return 1;
			}
			return panel.scrollTop / (panel.scrollHeight - panel.clientHeight);
		};

		var setPanelScrollTops = function () {

			if (wmd.panels.preview) {
				wmd.panels.preview.scrollTop = (wmd.panels.preview.scrollHeight - wmd.panels.preview.clientHeight) * getScaleFactor(wmd.panels.preview);;
			}

			if (wmd.panels.output) {
				wmd.panels.output.scrollTop = (wmd.panels.output.scrollHeight - wmd.panels.output.clientHeight) * getScaleFactor(wmd.panels.output);;
			}
		};

		this.refresh = function (requiresRefresh) {

			if (requiresRefresh) {
				oldInputText = "";
				makePreviewHtml();
			}
			else {
				applyTimeout();
			}
		};

		this.processingTime = function () {
			return elapsedTime;
		};

		// The output HTML
		this.output = function () {
			return htmlOut;
		};

		// The mode can be "manual" or "delayed"
		this.setUpdateMode = function (mode) {
			startType = mode;
			managerObj.refresh();
		};

		var isFirstTimeFilled = true;

		var pushPreviewHtml = function (text) {

			var emptyTop = position.getTop(wmd.panels.input) - getDocScrollTop();

			// Send the encoded HTML to the output textarea/div.
			if (wmd.panels.output) {
				// The value property is only defined if the output is a textarea.
				if (wmd.panels.output.value !== undefined) {
					wmd.panels.output.value = text;
				}
				// Otherwise we are just replacing the text in a div.
				// Send the HTML wrapped in <pre><code>
				else {
					var newText = text.replace(/&/g, "&amp;");
					newText = newText.replace(/</g, "&lt;");
					wmd.panels.output.innerHTML = "<pre><code>" + newText + "</code></pre>";
				}
			}

			if (wmd.panels.preview) {
				// original WMD code allowed javascript injection, like this:
				//	  <img src="http://www.google.com/intl/en_ALL/images/srpr/logo1w.png" onload="alert('haha');"/>
				// now, we first ensure elements (and attributes of IMG and A elements) are in a whitelist
				// and if not in whitelist, replace with blanks in preview to prevent XSS attacks
				// when editing malicious markdown
				// code courtesy of https://github.com/polestarsoft/wmd/commit/e7a09c9170ea23e7e806425f46d7423af2a74641
				if (wmd.options.tagFilter.enabled) {
					text = text.replace(/<[^<>]*>?/gi, function (tag) {
						return (tag.match(wmd.options.tagFilter.allowedTags) || tag.match(wmd.options.tagFilter.patternLink) || tag.match(wmd.options.tagFilter.patternImage)) ? tag : "";
					});
				}
				
				// addeded by wangchao, to prettify code output
				text = text.replace(/<code>([^\r]*?)<\/code>/gi, function (wholeMatch, m1) {
					return '<code class="prettyprint">' + prettyPrintOne(m1) + '</code>';
				})
				
				wmd.panels.preview.innerHTML = text;
			}

			setPanelScrollTops();

			if (isFirstTimeFilled) {
				isFirstTimeFilled = false;
				return;
			}

			var fullTop = position.getTop(wmd.panels.input) - getDocScrollTop();

			if (browser.isIE) {
				window.setTimeout(function () {
					window.scrollBy(0, fullTop - emptyTop);
				}, 0);
			}
			else {
				window.scrollBy(0, fullTop - emptyTop);
			}
		};

		var init = function () {

			setupEvents(wmd.panels.input, applyTimeout);
			makePreviewHtml();

			if (wmd.panels.preview) {
				wmd.panels.preview.scrollTop = 0;
			}
			if (wmd.panels.output) {
				wmd.panels.output.scrollTop = 0;
			}
		};

		this.destroy = function () {
			if (poller) {
				poller.destroy();
			}
		};

		init();
	}; // }}}
	// Handles pushing and popping TextareaStates for undo/redo commands.
	// I should rename the stack variables to list.
	var UndoManager = function (wmd, textarea, pastePollInterval, callback) { // {{{
		var undoObj = this;
		var undoStack = []; // A stack of undo states
		var stackPtr = 0; // The index of the current state
		var mode = "none";
		var lastState; // The last state
		var poller;
		var timer; // The setTimeout handle for cancelling the timer
		var inputStateObj;

		// Set the mode for later logic steps.
		var setMode = function (newMode, noSave) {

			if (mode != newMode) {
				mode = newMode;
				if (!noSave) {
					saveState();
				}
			}

			if (!browser.isIE || mode != "moving") {
				timer = window.setTimeout(refreshState, 1);
			}
			else {
				inputStateObj = null;
			}
		};

		var refreshState = function () {
			inputStateObj = new TextareaState(textarea, wmd);
			poller.tick();
			timer = undefined;
		};

		this.setCommandMode = function () {
			mode = "command";
			saveState();
			timer = window.setTimeout(refreshState, 0);
		};

		this.canUndo = function () {
			return stackPtr > 1;
		};

		this.canRedo = function () {
			if (undoStack[stackPtr + 1]) {
				return true;
			}
			return false;
		};

		// Removes the last state and restores it.
		this.undo = function () {

			if (undoObj.canUndo()) {
				if (lastState) {
					// What about setting state -1 to null or checking for undefined?
					lastState.restore();
					lastState = null;
				}
				else {
					undoStack[stackPtr] = new TextareaState(textarea, wmd);
					undoStack[--stackPtr].restore();

					if (callback) {
						callback();
					}
				}
			}

			mode = "none";
			textarea.focus();
			refreshState();
		};

		// Redo an action.
		this.redo = function () {

			if (undoObj.canRedo()) {

				undoStack[++stackPtr].restore();

				if (callback) {
					callback();
				}
			}

			mode = "none";
			textarea.focus();
			refreshState();
		};

		// Push the input area state to the stack.
		var saveState = function () {

			var currState = inputStateObj || new TextareaState(textarea, wmd);

			if (!currState) {
				return false;
			}
			if (mode == "moving") {
				if (!lastState) {
					lastState = currState;
				}
				return;
			}
			if (lastState) {
				if (undoStack[stackPtr - 1].text != lastState.text) {
					undoStack[stackPtr++] = lastState;
				}
				lastState = null;
			}
			undoStack[stackPtr++] = currState;
			undoStack[stackPtr + 1] = null;
			if (callback) {
				callback();
			}
		};

		var handleCtrlYZ = function (event) {

			var handled = false;

			if (event.ctrlKey || event.metaKey) {

				// IE and Opera do not support charCode.
				var keyCode = event.charCode || event.keyCode;
				var keyCodeChar = String.fromCharCode(keyCode);

				switch (keyCodeChar) {

				case "y":
					undoObj.redo();
					handled = true;
					break;

				case "z":
					if (!event.shiftKey) {
						undoObj.undo();
					}
					else {
						undoObj.redo();
					}
					handled = true;
					break;
				}
			}

			if (handled) {
				if (event.preventDefault) {
					event.preventDefault();
				}
				if (window.event) {
					window.event.returnValue = false;
				}
				return;
			}
		};

		// Set the mode depending on what is going on in the input area.
		var handleModeChange = function (event) {

			if (!event.ctrlKey && !event.metaKey) {

				var keyCode = event.keyCode;

				if ((keyCode >= 33 && keyCode <= 40) || (keyCode >= 63232 && keyCode <= 63235)) {
					// 33 - 40: page up/dn and arrow keys
					// 63232 - 63235: page up/dn and arrow keys on safari
					setMode("moving");
				}
				else if (keyCode == 8 || keyCode == 46 || keyCode == 127) {
					// 8: backspace
					// 46: delete
					// 127: delete
					setMode("deleting");
				}
				else if (keyCode == 13) {
					// 13: Enter
					setMode("newlines");
				}
				else if (keyCode == 27) {
					// 27: escape
					setMode("escape");
				}
				else if ((keyCode < 16 || keyCode > 20) && keyCode != 91) {
					// 16-20 are shift, etc. 
					// 91: left window key
					// I think this might be a little messed up since there are
					// a lot of nonprinting keys above 20.
					setMode("typing");
				}
			}
		};

		var setEventHandlers = function () {

			util.addEvent(textarea, "keypress", function (event) {
				// keyCode 89: y
				// keyCode 90: z
				if ((event.ctrlKey || event.metaKey) && (event.keyCode == 89 || event.keyCode == 90)) {
					event.preventDefault();
				}
			});

			var handlePaste = function () {
				if (browser.isIE || (inputStateObj && inputStateObj.text != textarea.value)) {
					if (timer == undefined) {
						mode = "paste";
						saveState();
						refreshState();
					}
				}
			};

			poller = new InputPoller(textarea, handlePaste, pastePollInterval);

			util.addEvent(textarea, "keydown", handleCtrlYZ);
			util.addEvent(textarea, "keydown", handleModeChange);

			util.addEvent(textarea, "mousedown", function () {
				setMode("moving");
			});
			textarea.onpaste = handlePaste;
			textarea.ondrop = handlePaste;
		};

		var init = function () {
			setEventHandlers();
			refreshState();
			saveState();
		};

		this.destroy = function () {
			if (poller) {
				poller.destroy();
			}
		};

		init();
	}; //}}}
	WMDEditor.util = util;
	WMDEditor.position = position;
	WMDEditor.TextareaState = TextareaState;
	WMDEditor.InputPoller = InputPoller;
	WMDEditor.PreviewManager = PreviewManager;
	WMDEditor.UndoManager = UndoManager;

	// A few handy aliases for readability.
	var doc = window.document;
	var re = window.RegExp;
	var nav = window.navigator;

	function get_browser() {
		var b = {};
		b.isIE = /msie/.test(nav.userAgent.toLowerCase());
		b.isIE_5or6 = /msie 6/.test(nav.userAgent.toLowerCase()) || /msie 5/.test(nav.userAgent.toLowerCase());
		b.isIE_7plus = b.isIE && !b.isIE_5or6;
		b.isOpera = /opera/.test(nav.userAgent.toLowerCase());
		b.isKonqueror = /konqueror/.test(nav.userAgent.toLowerCase());
		return b;
	}

	// Used to work around some browser bugs where we can't use feature testing.
	var browser = get_browser();

	var wmdBase = function (wmd, wmd_options) { // {{{
		// Some namespaces.
		//wmd.Util = {};
		//wmd.Position = {};
		wmd.Command = {};
		wmd.Global = {};
		wmd.buttons = {};

		wmd.showdown = window.Showdown;

		var util = WMDEditor.util;
		var position = WMDEditor.position;
		var command = wmd.Command;

		// Internet explorer has problems with CSS sprite buttons that use HTML
		// lists.  When you click on the background image "button", IE will 
		// select the non-existent link text and discard the selection in the
		// textarea.  The solution to this is to cache the textarea selection
		// on the button's mousedown event and set a flag.  In the part of the
		// code where we need to grab the selection, we check for the flag
		// and, if it's set, use the cached area instead of querying the
		// textarea.
		//
		// This ONLY affects Internet Explorer (tested on versions 6, 7
		// and 8) and ONLY on button clicks.  Keyboard shortcuts work
		// normally since the focus never leaves the textarea.
		wmd.ieCachedRange = null; // cached textarea selection
		wmd.ieRetardedClick = false; // flag
		// I think my understanding of how the buttons and callbacks are stored in the array is incomplete.
		wmd.editor = function (previewRefreshCallback) { // {{{
			if (!previewRefreshCallback) {
				previewRefreshCallback = function () {};
			}

			var inputBox = wmd.panels.input;

			var offsetHeight = 0;

			var editObj = this;

			var mainDiv;
			var mainSpan;

			var div; // This name is pretty ambiguous.  I should rename this.
			// Used to cancel recurring events from setInterval.
			var creationHandle;

			var undoMgr; // The undo manager
			// Perform the button's action. ִ�а�ť����
			var doClick = function (button) {

				inputBox.focus();

				if (button.textOp) {

					if (undoMgr) {
						undoMgr.setCommandMode();
					}

					var state = new TextareaState(wmd.panels.input, wmd);

					if (!state) {
						return;
					}

					var chunks = state.getChunks();
					//debug(chunks);

					// Some commands launch a "modal" prompt dialog.  Javascript
					// can't really make a modal dialog box and the WMD code
					// will continue to execute while the dialog is displayed.
					// This prevents the dialog pattern I'm used to and means
					// I can't do something like this:
					//
					// var link = CreateLinkDialog();
					// makeMarkdownLink(link);
					// 
					// Instead of this straightforward method of handling a
					// dialog I have to pass any code which would execute
					// after the dialog is dismissed (e.g. link creation)
					// in a function parameter.
					//
					// Yes this is awkward and I think it sucks, but there's
					// no real workaround.  Only the image and link code
					// create dialogs and require the function pointers.
					var fixupInputArea = function () {

						inputBox.focus();

						if (chunks) {
							state.setChunks(chunks);
						}

						state.restore();
						previewRefreshCallback();
					};

					var useDefaultText = true;
					var noCleanup = button.textOp(chunks, fixupInputArea, useDefaultText);

					if (!noCleanup) {
						fixupInputArea();
					}

				}

				if (button.execute) {
					button.execute(editObj);
				}
			};

			var setUndoRedoButtonStates = function () {
				if (undoMgr) {
					setupButton(wmd.buttons["wmd-undo-button"], undoMgr.canUndo());
					setupButton(wmd.buttons["wmd-redo-button"], undoMgr.canRedo());
				}
			};

			var setupButton = function (button, isEnabled) {

				var normalYShift = "0px";
				var disabledYShift = "-20px";
				var highlightYShift = "-40px";

				if (isEnabled) {
					button.style.backgroundPosition = button.XShift + " " + normalYShift;
					button.onmouseover = function () {
						this.style.backgroundPosition = this.XShift + " " + highlightYShift;
					};

					button.onmouseout = function () {
						this.style.backgroundPosition = this.XShift + " " + normalYShift;
					};

					// IE tries to select the background image "button" text (it's
					// implemented in a list item) so we have to cache the selection
					// on mousedown.
					if (browser.isIE) {
						button.onmousedown = function () {
							wmd.ieRetardedClick = true;
							wmd.ieCachedRange = document.selection.createRange();
						};
					}

					if (!button.isHelp) {
						button.onclick = function () {
							if (this.onmouseout) {
								this.onmouseout();
							}
							doClick(this);
							return false;
						};
					}
				}
				else {
					button.style.backgroundPosition = button.XShift + " " + disabledYShift;
					button.onmouseover = button.onmouseout = button.onclick = function () {};
				}
			};

			//������������ť
			var makeSpritedButtonRow = function () {

				var buttonBar = (typeof wmd_options.button_bar == 'string') ? document.getElementById(wmd_options.button_bar || "wmd-button-bar") : wmd_options.button_bar;
				var normalYShift = "0px";
				var disabledYShift = "-20px";
				var highlightYShift = "-40px";

				var buttonRow = document.createElement("ul");
				buttonRow.className = "wmd-button-row";
				buttonRow = buttonBar.appendChild(buttonRow);

				var xoffset = 0;

				function createButton(name, title, textOp) {
					var button = document.createElement("li");
					wmd.buttons[name] = button;
					button.className = "wmd-button " + name;
					button.XShift = xoffset + "px";
					xoffset -= 20;

					if (title) button.title = title;

					if (textOp) button.textOp = textOp;

					return button;
				}

				function addButton(name, title, textOp) {
					//��ɰ�ťhtml
					var button = createButton(name, title, textOp);
					//��ť�������
					setupButton(button, true);
					buttonRow.appendChild(button);
					return button;
				}

				function addSpacer(className) {
					var spacer = document.createElement("li");
					spacer.className = "wmd-spacer " + className;
					buttonRow.appendChild(spacer);
					return spacer;
				}

				var boldButton = addButton("wmd-bold-button", "Strong <strong> Ctrl+B", command.doBold);
				var italicButton = addButton("wmd-italic-button", "Emphasis <em> Ctrl+I", command.doItalic);
				var spacer1 = addSpacer("wmd-spacer1");

				var linkButton = addButton("wmd-link-button", "Hyperlink <a> Ctrl+L", function (chunk, postProcessing, useDefaultText) {
					return command.doLinkOrImage(chunk, postProcessing, false);
				});
				var quoteButton = addButton("wmd-quote-button", "Blockquote <blockquote> Ctrl+Q", command.doBlockquote);
				var codeButton = addButton("wmd-code-button", "Code Sample <pre><code> Ctrl+K", command.doCode);
				var imageButton = addButton("wmd-image-button", "Image <img> Ctrl+G", function (chunk, postProcessing, useDefaultText) {
					return command.doLinkOrImage(chunk, postProcessing, true);
				});

				var spacer2 = addSpacer("wmd-spacer2");

				var olistButton = addButton("wmd-olist-button", "Numbered List <ol> Ctrl+O", function (chunk, postProcessing, useDefaultText) {
					command.doList(chunk, postProcessing, true, useDefaultText);
				});
				var ulistButton = addButton("wmd-ulist-button", "Bulleted List <ul> Ctrl+U", function (chunk, postProcessing, useDefaultText) {
					command.doList(chunk, postProcessing, false, useDefaultText);
				});
				var headingButton = addButton("wmd-heading-button", "Heading <h1>/<h2> Ctrl+H", command.doHeading);
				var hrButton = addButton("wmd-hr-button", "Horizontal Rule <hr> Ctrl+R", command.doHorizontalRule);
				var spacer3 = addSpacer("wmd-spacer3");

				var undoButton = addButton("wmd-undo-button", "Undo - Ctrl+Z");
				undoButton.execute = function (manager) {
					manager.undo();
				};

				var redo_title = null;

				var redoButton = addButton("wmd-redo-button", "Redo - Ctrl+Y");
				if (/win/.test(nav.platform.toLowerCase())) {
					redoButton.title = "Redo - Ctrl+Y";
				}
				else {
					// mac and other non-Windows platforms
					redoButton.title = "Redo - Ctrl+Shift+Z";
				}
				redoButton.execute = function (manager) {
					manager.redo();
				};
				
				var helpButton = createButton("wmd-help-button");
				helpButton.isHelp = true;
				setupButton(helpButton, true);
				buttonRow.appendChild(helpButton);

				var helpAnchor = document.createElement("a");
				helpAnchor.href = wmd_options.helpLink;
				helpAnchor.target = wmd_options.helpTarget;
				helpAnchor.title = wmd_options.helpHoverTitle;
				helpButton.appendChild(helpAnchor);
				
				var suggestButton = addButton("wmd-at-button", "Shift+@", function (chunk, postProcessing, useDefaultText) {
					return command.doSuggest(chunk, postProcessing, false);
				});

				setUndoRedoButtonStates();
			};

			//�༭����ʼ��
			var setupEditor = function () {

				if (/\?noundo/.test(document.location.href)) {
					wmd.nativeUndo = true;
				}

				if (!wmd.nativeUndo) {
					undoMgr = new UndoManager(wmd, wmd.panels.input, wmd.options.pastePollInterval, function () {
						previewRefreshCallback();
						setUndoRedoButtonStates();
					});
				}

				//��������ʼ��
				makeSpritedButtonRow();


				var keyEvent = "keydown";
				if (browser.isOpera) {
					keyEvent = "keypress";
				}

				//������̰���
				util.addEvent(inputBox, keyEvent, function (key) {
					//����@ ���qlink
					//alert(key.keyCode);
					if(key.shiftKey && key.keyCode == 50 || key.shiftKey && key.keyCode == 229)
					{
						setTimeout(function(){
							doClick(wmd.buttons["wmd-at-button"]);
						}, 100);
					}
					
					// Check to see if we have a button key and, if so execute the callback.
					if (key.ctrlKey || key.metaKey) {

						var keyCode = key.charCode || key.keyCode;
						var keyCodeStr = String.fromCharCode(keyCode).toLowerCase();
						//debug(keyCodeStr);

						switch (keyCodeStr) {
						case "b":
							doClick(wmd.buttons["wmd-bold-button"]);
							break;
						case "i":
							doClick(wmd.buttons["wmd-italic-button"]);
							break;
						case "l":
							doClick(wmd.buttons["wmd-link-button"]);
							break;
						case "q":
							doClick(wmd.buttons["wmd-quote-button"]);
							break;
						case "k":
							doClick(wmd.buttons["wmd-code-button"]);
							break;
						case "g":
							doClick(wmd.buttons["wmd-image-button"]);
							break;
						case "o":
							doClick(wmd.buttons["wmd-olist-button"]);
							break;
						case "u":
							doClick(wmd.buttons["wmd-ulist-button"]);
							break;
						case "h":
							doClick(wmd.buttons["wmd-heading-button"]);
							break;
						case "r":
							doClick(wmd.buttons["wmd-hr-button"]);
							break;
						case "y":
							doClick(wmd.buttons["wmd-redo-button"]);
							break;
						case "z":
							if (key.shiftKey) {
								doClick(wmd.buttons["wmd-redo-button"]);
							}
							else {
								doClick(wmd.buttons["wmd-undo-button"]);
							}
							break;
						default:
							return;
						}


						if (key.preventDefault) {
							key.preventDefault();
						}

						if (window.event) {
							window.event.returnValue = false;
						}
					}
				});

				// Auto-continue lists, code blocks and block quotes when
				// the enter key is pressed.
				util.addEvent(inputBox, "keyup", function (key) {
					if (!key.shiftKey && !key.ctrlKey && !key.metaKey) {
						var keyCode = key.charCode || key.keyCode;
						// Key code 13 is Enter
						if (keyCode === 13) {
							fakeButton = {};
							fakeButton.textOp = command.doAutoindent;
							doClick(fakeButton);
						}
					}
				});

				// Disable ESC clearing the input textarea on IE
				if (browser.isIE) {
					util.addEvent(inputBox, "keydown", function (key) {
						var code = key.keyCode;
						// Key code 27 is ESC
						if (code === 27) {
							return false;
						}
					});
				}
			};


			this.undo = function () {
				if (undoMgr) {
					undoMgr.undo();
				}
			};

			this.redo = function () {
				if (undoMgr) {
					undoMgr.redo();
				}
			};

			// This is pretty useless.  The setupEditor function contents
			// should just be copied here.
			var init = function () {
				setupEditor();
			};

			this.destroy = function () {
				if (undoMgr) {
					undoMgr.destroy();
				}
				if (div.parentNode) {
					div.parentNode.removeChild(div);
				}
				if (inputBox) {
					inputBox.style.marginTop = "";
				}
				window.clearInterval(creationHandle);
			};

			init();
		}; // }}}
		// command {{{
		// The markdown symbols - 4 spaces = code, > = blockquote, etc.
		command.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)";

		// Remove markdown symbols from the chunk selection.
		command.unwrap = function (chunk) {
			var txt = new re("([^\\n])\\n(?!(\\n|" + command.prefixes + "))", "g");
			chunk.selection = chunk.selection.replace(txt, "$1 $2");
		};

		command.wrap = function (chunk, len) {
			command.unwrap(chunk);
			var regex = new re("(.{1," + len + "})( +|$\\n?)", "gm");

			chunk.selection = chunk.selection.replace(regex, function (line, marked) {
				if (new re("^" + command.prefixes, "").test(line)) {
					return line;
				}
				return marked + "\n";
			});

			chunk.selection = chunk.selection.replace(/\s+$/, "");
		};

		command.doBold = function (chunk, postProcessing, useDefaultText) {
			return command.doBorI(chunk, 2, "strong text");
		};

		command.doItalic = function (chunk, postProcessing, useDefaultText) {
			return command.doBorI(chunk, 1, "emphasized text");
		};

		// chunk: The selected region that will be enclosed with */**
		// nStars: 1 for italics, 2 for bold
		// insertText: If you just click the button without highlighting text, this gets inserted
		command.doBorI = function (chunk, nStars, insertText) {

			// Get rid of whitespace and fixup newlines.
			chunk.trimWhitespace();
			chunk.selection = chunk.selection.replace(/\n{2,}/g, "\n");

			// Look for stars before and after.  Is the chunk already marked up?
			chunk.before.search(/(\**$)/);
			var starsBefore = re.$1;

			chunk.after.search(/(^\**)/);
			var starsAfter = re.$1;

			var prevStars = Math.min(starsBefore.length, starsAfter.length);

			// Remove stars if we have to since the button acts as a toggle.
			if ((prevStars >= nStars) && (prevStars != 2 || nStars != 1)) {
				chunk.before = chunk.before.replace(re("[*]{" + nStars + "}$", ""), "");
				chunk.after = chunk.after.replace(re("^[*]{" + nStars + "}", ""), "");
			}
			else if (!chunk.selection && starsAfter) {
				// It's not really clear why this code is necessary.  It just moves
				// some arbitrary stuff around.
				chunk.after = chunk.after.replace(/^([*_]*)/, "");
				chunk.before = chunk.before.replace(/(\s?)$/, "");
				var whitespace = re.$1;
				chunk.before = chunk.before + starsAfter + whitespace;
			}
			else {

				// In most cases, if you don't have any selected text and click the button
				// you'll get a selected, marked up region with the default text inserted.
				if (!chunk.selection && !starsAfter) {
					chunk.selection = insertText;
				}

				// Add the true markup.
				var markup = nStars <= 1 ? "*" : "**"; // shouldn't the test be = ?
				chunk.before = chunk.before + markup;
				chunk.after = markup + chunk.after;
			}

			return;
		};

		command.stripLinkDefs = function (text, defsToAdd) {

			text = text.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function (totalMatch, id, link, newlines, title) {
				defsToAdd[id] = totalMatch.replace(/\s*$/, "");
				if (newlines) {
					// Strip the title and return that separately.
					defsToAdd[id] = totalMatch.replace(/["(](.+?)[")]$/, "");
					return newlines + title;
				}
				return "";
			});

			return text;
		};

		command.addLinkDef = function (chunk, linkDef) {

			var refNumber = 0; // The current reference number
			var defsToAdd = {}; //
			// Start with a clean slate by removing all previous link definitions.
			chunk.before = command.stripLinkDefs(chunk.before, defsToAdd);
			chunk.selection = command.stripLinkDefs(chunk.selection, defsToAdd);
			chunk.after = command.stripLinkDefs(chunk.after, defsToAdd);

			var defs = "";
			var regex = /(\[(?:\[[^\]]*\]|[^\[\]])*\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g;

			var addDefNumber = function (def) {
				refNumber++;
				def = def.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + refNumber + "]:");
				defs += "\n" + def;
			};

			var getLink = function (wholeMatch, link, id, end) {

				if (defsToAdd[id]) {
					addDefNumber(defsToAdd[id]);
					return link + refNumber + end;

				}
				return wholeMatch;
			};

			chunk.before = chunk.before.replace(regex, getLink);

			if (linkDef) {
				addDefNumber(linkDef);
			}
			else {
				chunk.selection = chunk.selection.replace(regex, getLink);
			}

			var refOut = refNumber;

			chunk.after = chunk.after.replace(regex, getLink);

			if (chunk.after) {
				chunk.after = chunk.after.replace(/\n*$/, "");
			}
			if (!chunk.after) {
				chunk.selection = chunk.selection.replace(/\n*$/, "");
			}

			chunk.after += "\n\n" + defs;

			return refOut;
		};

		command.doLinkOrImage = function (chunk, postProcessing, isImage) {

			chunk.trimWhitespace();
			chunk.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);

			if (chunk.endTag.length > 1) {

				chunk.startTag = chunk.startTag.replace(/!?\[/, "");
				chunk.endTag = "";
				command.addLinkDef(chunk, null);

			}
			else {

				if (/\n\n/.test(chunk.selection)) {
					command.addLinkDef(chunk, null);
					return;
				}

				// The function to be executed when you enter a link and press OK or Cancel.
				// Marks up the link and adds the ref.
				var makeLinkMarkdown = function (link) {

					if (link !== null) {

						chunk.startTag = chunk.endTag = "";
						var linkDef = " [999]: " + link;

						var num = command.addLinkDef(chunk, linkDef);
						chunk.startTag = isImage ? "![" : "[";
						chunk.endTag = "][" + num + "]";

						if (!chunk.selection) {
							if (isImage) {
								chunk.selection = "alt text";
							}
							else {
								chunk.selection = "link text";
							}
						}
					}
					postProcessing();
				};

				if (isImage) {
					util.prompt(wmd_options.imageDialogText, wmd_options.imageDefaultText, makeLinkMarkdown, true);
				}
				else {
					util.prompt(wmd_options.linkDialogText, wmd_options.linkDefaultText, makeLinkMarkdown, false);
				}
				return true;
			}
		};
		
		command.doSuggest = function (chunk, postProcessing, isImage) {

			chunk.trimWhitespace();
			chunk.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);

			if (chunk.endTag.length > 1) {

				chunk.startTag = chunk.startTag.replace(/!?\[/, "");
				chunk.endTag = "";
				command.addLinkDef(chunk, null);

			}
			else {

				if (/\n\n/.test(chunk.selection)) {
					command.addLinkDef(chunk, null);
					return;
				}	

				// The function to be executed when you enter a link and press OK or Cancel.
				// Marks up the link and adds the ref.
				var makeLinkMarkdown = function (obj) {
					link = obj.link;
					text = obj.text;

					if (link != '' && text != '')
					{
						chunk.startTag = chunk.endTag = "";
						var linkDef = " [999]: " + link;

						var num = command.addLinkDef(chunk, linkDef);
						chunk.startTag = "[";
						chunk.endTag = "][" + num + "]";
						
						chunk.selection = text;
					}
					else if(text !== null)
					{
						chunk.selection = text;
					}
					postProcessing();
				};
				util.suggest(makeLinkMarkdown, chunk);
				//util.prompt(wmd_options.linkDialogText, wmd_options.linkDefaultText, makeLinkMarkdown, false);
				return true;
			}
		};

		// Moves the cursor to the next line and continues lists, quotes and code.
		command.doAutoindent = function (chunk, postProcessing, useDefaultText) {

			chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n");
			chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n");
			chunk.before = chunk.before.replace(/(\n|^)[ \t]+\n$/, "\n\n");

			useDefaultText = false;

			if (/(\n|^)[ ]{0,3}([*+-])[ \t]+.*\n$/.test(chunk.before)) {
				if (command.doList) {
					command.doList(chunk, postProcessing, false, true);
				}
			}
			if (/(\n|^)[ ]{0,3}(\d+[.])[ \t]+.*\n$/.test(chunk.before)) {
				if (command.doList) {
					command.doList(chunk, postProcessing, true, true);
				}
			}
			if (/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(chunk.before)) {
				if (command.doBlockquote) {
					command.doBlockquote(chunk, postProcessing, useDefaultText);
				}
			}
			if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)) {
				if (command.doCode) {
					command.doCode(chunk, postProcessing, useDefaultText);
				}
			}
		};

		command.doBlockquote = function (chunk, postProcessing, useDefaultText) {

			chunk.selection = chunk.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function (totalMatch, newlinesBefore, text, newlinesAfter) {
				chunk.before += newlinesBefore;
				chunk.after = newlinesAfter + chunk.after;
				return text;
			});

			chunk.before = chunk.before.replace(/(>[ \t]*)$/, function (totalMatch, blankLine) {
				chunk.selection = blankLine + chunk.selection;
				return "";
			});

			var defaultText = useDefaultText ? "Blockquote" : "";
			chunk.selection = chunk.selection.replace(/^(\s|>)+$/, "");
			chunk.selection = chunk.selection || defaultText;

			if (chunk.before) {
				chunk.before = chunk.before.replace(/\n?$/, "\n");
			}
			if (chunk.after) {
				chunk.after = chunk.after.replace(/^\n?/, "\n");
			}

			chunk.before = chunk.before.replace(/(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*$)/, function (totalMatch) {
				chunk.startTag = totalMatch;
				return "";
			});

			chunk.after = chunk.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function (totalMatch) {
				chunk.endTag = totalMatch;
				return "";
			});

			var replaceBlanksInTags = function (useBracket) {

				var replacement = useBracket ? "> " : "";

				if (chunk.startTag) {
					chunk.startTag = chunk.startTag.replace(/\n((>|\s)*)\n$/, function (totalMatch, markdown) {
						return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
					});
				}
				if (chunk.endTag) {
					chunk.endTag = chunk.endTag.replace(/^\n((>|\s)*)\n/, function (totalMatch, markdown) {
						return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
					});
				}
			};

			if (/^(?![ ]{0,3}>)/m.test(chunk.selection)) {
				command.wrap(chunk, wmd_options.lineLength - 2);
				chunk.selection = chunk.selection.replace(/^/gm, "> ");
				replaceBlanksInTags(true);
				chunk.addBlankLines();
			}
			else {
				chunk.selection = chunk.selection.replace(/^[ ]{0,3}> ?/gm, "");
				command.unwrap(chunk);
				replaceBlanksInTags(false);

				if (!/^(\n|^)[ ]{0,3}>/.test(chunk.selection) && chunk.startTag) {
					chunk.startTag = chunk.startTag.replace(/\n{0,2}$/, "\n\n");
				}

				if (!/(\n|^)[ ]{0,3}>.*$/.test(chunk.selection) && chunk.endTag) {
					chunk.endTag = chunk.endTag.replace(/^\n{0,2}/, "\n\n");
				}
			}

			if (!/\n/.test(chunk.selection)) {
				chunk.selection = chunk.selection.replace(/^(> *)/, function (wholeMatch, blanks) {
					chunk.startTag += blanks;
					return "";
				});
			}
		};

		command.doCode = function (chunk, postProcessing, useDefaultText) {

			var hasTextBefore = /\S[ ]*$/.test(chunk.before);
			var hasTextAfter = /^[ ]*\S/.test(chunk.after);

			// Use 'four space' markdown if the selection is on its own
			// line or is multiline.
			if ((!hasTextAfter && !hasTextBefore) || /\n/.test(chunk.selection)) {

				chunk.before = chunk.before.replace(/[ ]{4}$/, function (totalMatch) {
					chunk.selection = totalMatch + chunk.selection;
					return "";
				});

				var nLinesBefore = 1;
				var nLinesAfter = 1;


				if (/\n(\t|[ ]{4,}).*\n$/.test(chunk.before) || chunk.after === "") {
					nLinesBefore = 0;
				}
				if (/^\n(\t|[ ]{4,})/.test(chunk.after)) {
					nLinesAfter = 0; // This needs to happen on line 1
				}

				chunk.addBlankLines(nLinesBefore, nLinesAfter);

				if (!chunk.selection) {
					chunk.startTag = "    ";
					chunk.selection = useDefaultText ? "enter code here" : "";
				}
				else {
					if (/^[ ]{0,3}\S/m.test(chunk.selection)) {
						chunk.selection = chunk.selection.replace(/^/gm, "    ");
					}
					else {
						chunk.selection = chunk.selection.replace(/^[ ]{4}/gm, "");
					}
				}
			}
			else {
				// Use backticks (`) to delimit the code block.
				chunk.trimWhitespace();
				chunk.findTags(/`/, /`/);

				if (!chunk.startTag && !chunk.endTag) {
					chunk.startTag = chunk.endTag = "`";
					if (!chunk.selection) {
						chunk.selection = useDefaultText ? "enter code here" : "";
					}
				}
				else if (chunk.endTag && !chunk.startTag) {
					chunk.before += chunk.endTag;
					chunk.endTag = "";
				}
				else {
					chunk.startTag = chunk.endTag = "";
				}
			}
		};

		command.doList = function (chunk, postProcessing, isNumberedList, useDefaultText) {

			// These are identical except at the very beginning and end.
			// Should probably use the regex extension function to make this clearer.
			var previousItemsRegex = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;
			var nextItemsRegex = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;

			// The default bullet is a dash but others are possible.
			// This has nothing to do with the particular HTML bullet,
			// it's just a markdown bullet.
			var bullet = "-";

			// The number in a numbered list.
			var num = 1;

			// Get the item prefix - e.g. " 1. " for a numbered list, " - " for a bulleted list.
			var getItemPrefix = function () {
				var prefix;
				if (isNumberedList) {
					prefix = " " + num + ". ";
					num++;
				}
				else {
					prefix = " " + bullet + " ";
				}
				return prefix;
			};

			// Fixes the prefixes of the other list items.
			var getPrefixedItem = function (itemText) {

				// The numbering flag is unset when called by autoindent.
				if (isNumberedList === undefined) {
					isNumberedList = /^\s*\d/.test(itemText);
				}

				// Renumber/bullet the list element.
				itemText = itemText.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function (_) {
					return getItemPrefix();
				});

				return itemText;
			};

			chunk.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null);

			if (chunk.before && !/\n$/.test(chunk.before) && !/^\n/.test(chunk.startTag)) {
				chunk.before += chunk.startTag;
				chunk.startTag = "";
			}

			if (chunk.startTag) {

				var hasDigits = /\d+[.]/.test(chunk.startTag);
				chunk.startTag = "";
				chunk.selection = chunk.selection.replace(/\n[ ]{4}/g, "\n");
				command.unwrap(chunk);
				chunk.addBlankLines();

				if (hasDigits) {
					// Have to renumber the bullet points if this is a numbered list.
					chunk.after = chunk.after.replace(nextItemsRegex, getPrefixedItem);
				}
				if (isNumberedList == hasDigits) {
					return;
				}
			}

			var nLinesBefore = 1;

			chunk.before = chunk.before.replace(previousItemsRegex, function (itemText) {
				if (/^\s*([*+-])/.test(itemText)) {
					bullet = re.$1;
				}
				nLinesBefore = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
				return getPrefixedItem(itemText);
			});

			if (!chunk.selection) {
				chunk.selection = useDefaultText ? "List item" : " ";
			}

			var prefix = getItemPrefix();

			var nLinesAfter = 1;

			chunk.after = chunk.after.replace(nextItemsRegex, function (itemText) {
				nLinesAfter = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
				return getPrefixedItem(itemText);
			});

			chunk.trimWhitespace(true);
			chunk.addBlankLines(nLinesBefore, nLinesAfter, true);
			chunk.startTag = prefix;
			var spaces = prefix.replace(/./g, " ");
			command.wrap(chunk, wmd_options.lineLength - spaces.length);
			chunk.selection = chunk.selection.replace(/\n/g, "\n" + spaces);

		};

		command.doHeading = function (chunk, postProcessing, useDefaultText) {

			// Remove leading/trailing whitespace and reduce internal spaces to single spaces.
			chunk.selection = chunk.selection.replace(/\s+/g, " ");
			chunk.selection = chunk.selection.replace(/(^\s+|\s+$)/g, "");

			// If we clicked the button with no selected text, we just
			// make a level 2 hash header around some default text.
			if (!chunk.selection) {
				chunk.startTag = "## ";
				chunk.selection = "Heading";
				chunk.endTag = " ##";
				return;
			}

			var headerLevel = 0; // The existing header level of the selected text.
			// Remove any existing hash heading markdown and save the header level.
			chunk.findTags(/#+[ ]*/, /[ ]*#+/);
			if (/#+/.test(chunk.startTag)) {
				headerLevel = re.lastMatch.length;
			}
			chunk.startTag = chunk.endTag = "";

			// Try to get the current header level by looking for - and = in the line
			// below the selection.
			chunk.findTags(null, /\s?(-+|=+)/);
			if (/=+/.test(chunk.endTag)) {
				headerLevel = 1;
			}
			if (/-+/.test(chunk.endTag)) {
				headerLevel = 2;
			}

			// Skip to the next line so we can create the header markdown.
			chunk.startTag = chunk.endTag = "";
			chunk.addBlankLines(1, 1);

			// We make a level 2 header if there is no current header.
			// If there is a header level, we substract one from the header level.
			// If it's already a level 1 header, it's removed.
			var headerLevelToCreate = headerLevel == 0 ? 2 : headerLevel - 1;

			if (headerLevelToCreate > 0) {

				// The button only creates level 1 and 2 underline headers.
				// Why not have it iterate over hash header levels?  Wouldn't that be easier and cleaner?
				var headerChar = headerLevelToCreate >= 2 ? "-" : "=";
				var len = chunk.selection.length;
				if (len > wmd_options.lineLength) {
					len = wmd_options.lineLength;
				}
				chunk.endTag = "\n";
				while (len--) {
					chunk.endTag += headerChar;
				}
			}
		};

		command.doHorizontalRule = function (chunk, postProcessing, useDefaultText) {
			chunk.startTag = "----------\n";
			chunk.selection = "";
			chunk.addBlankLines(2, 1, true);
		};
		// }}}
	}; // }}}
})();

// For backward compatibility

function setup_wmd(options) {
	return new WMDEditor(options);
}