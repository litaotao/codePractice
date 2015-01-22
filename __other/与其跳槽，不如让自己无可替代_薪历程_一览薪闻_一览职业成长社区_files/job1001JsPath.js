(function($){
	var settings = {
		desc:'something about the project.',
		admin:{
			file_path	: '',
			script_name	: 'admin',
			script_exe	: '.php',
			abcdefg		: 1
		}
	}
	var getProjectJsPath = function(options){
		$.extend(settings, options);
		return  settings.admin.file_path + settings.admin.script_name + settings.admin.script_exe;
	}
	//×¢²áÎªjQuery²å¼þ
	$.extend({job1001JsPath:getProjectJsPath});
})(jQuery)