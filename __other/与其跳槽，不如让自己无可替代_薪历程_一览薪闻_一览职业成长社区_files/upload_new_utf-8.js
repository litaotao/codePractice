function createUploadFlash(op){
	
	if (typeof op.src == "undefined") op.src='/img_css/upload/swf/swfupload.swf';
	if (typeof op.id  =="undefined")  op.id='flashupload';
	if (typeof op.width =="undefined") op.width=93;
	if (typeof op.height =="undefined") op.height=26;
	if (typeof op.flashcontent =="undefined") op.flashcontent='';
	if (typeof op.base =="undefined") op.base='';
	if (typeof op.limit =="undefined") op.limit=1;
	if (typeof op.size =="undefined") op.size=2;

	/**++**/
	if(typeof op.url=="undefined") op.url='http://img105.job1001.com/save.php';
	if(typeof op.filetype=="undefined") op.filetype='*.gif;*.jpg;*.png';
	if(typeof op.filename=="undefined") op.filename='全部文件(图片文件)';;
	
	/**++**/
	if (typeof op.button_image_url =="undefined") op.button_image_url='http://img3.job1001.com/upload/searchBtn.gif';
	if (typeof op.button_text =="undefined") op.button_text='上传文件';
	if (typeof op.button_text_style =="undefined") op.button_text_style='.theFont { font-size: 14; text-align:center;}';
	
	/**++**/
	if (typeof op['delete']=='function') op.del=op['delete'];
	 

	if(op.flashcontent==''){alert('请设置你的flash容器');return '';}
	if(op.base==''){alert('输出的容器id');return '';}
	 
	
	var file_upload_number=0;//标示文件上传的个数
	var fun={};//隐藏函数库
	var file_obj_arr={};//存储fileid
	var global_swfupload={};
	
	//######################################//
	//选择文件显示函数
	fun.file_upload_select_show=function(flag,id,filename,total,cunumber,filemax){

		var flagids=flag+'_'+id;
		var filepostfixarr=filename.split(".");
		var strlen=total/1024+"";
		var st=strlen.indexOf(".");
		var obj=document.getElementById(flag);
		if(obj==null){
			//alert('请耐心等待，直到出现完成');
			return false;
		}
		var divob=document.createElement("div");
		divob.id=flagids;
		divob.innerHTML="文件："+filename+"&nbsp;大小"+parseInt(total/1024)+" K &nbsp;<span id='"+flagids+"del'></span>";
		divob.className='bar';
		obj.appendChild(divob);
		var divmsg=document.createElement("div");
		var showhtml='<div class="process-bar skin-green"><div class="pb-wrapper"><div class="pb-highlight"></div><div class="pb-container"><div class="pb-text" id="'+flagids+'spanmsg">1%</div><div class="pb-value" id="'+flagids+'span"></div></div></div>';
		divmsg.innerHTML=showhtml;
		divob.appendChild(divmsg);
	}
	//上传进度处理函数
	fun.file_upload_progress_show=function (flag,id,cu,alltol){
		var flagids=flag+'_'+id;
		var obj=document.getElementById(flagids+"span");
		var obj1=document.getElementById(flagids+"spanmsg");
		var width='';
		if(cu==alltol){
			obj.style.width='99%';
			obj1.innerHTML="99%";
		}else{
			width=parseInt((parseInt(cu)/parseInt(alltol))*100);
			obj.style.width=width+'%';
			obj1.innerHTML=parseInt((parseInt(cu)/parseInt(alltol))*100)+"%";
		}
	}
	//上传成功后的处理函数
	fun.file_upload_progressover=function(flag,id,path,file){
		
		var seid=flag.substring(0,flag.length-4);
		if(document.getElementById(seid)!=null){
			var vv=document.getElementById(seid).value;
			document.getElementById(seid).value=vv+','+path;
		}
		if(document.getElementById(seid+"_name")!=null){
			var vv=document.getElementById(seid+"_name").value;
			if(document.getElementById(seid+"_name").type!='hidden'){
				var mm=vv+','+file.name;
				var posindex=mm.lastIndexOf(".");
				mm=mm.substring(0,posindex);
				if(mm.substring(0,1)==','){
					document.getElementById(seid+"_name").value=mm.substring(1,mm.length);
				}else{
					document.getElementById(seid+"_name").value=mm;
				}
			}else{
				document.getElementById(seid+"_name").value=vv+','+file.name;
			}
		}

		if(typeof $ != 'undefined'){
			$.ajax({
				url:'/3g/upload_record.php',
				data:'file='+encodeURIComponent(path)+'&name='+encodeURIComponent(file.name)+'&savepath='+encodeURIComponent(op.url)+'&referrer='+encodeURIComponent(document.referrer),
				dataType:'txt',
				type:'post'
			});
		}
	}
	//显示处理函数
	//上传显示函数
	fun.file_upload_progressover_show=function(flag,id,path,flash_obj_tmp,file){
		
		fun.file_upload_progressover(flag,id,path,file);
		var flagids=flag+'_'+id;
		
		var divob=document.getElementById(flagids+"del");
		divob.innerHTML="&nbsp;&nbsp;<a href=\"javascript:void(0)\" id=\"dev"+flagids+"\">删除</a>";
		var obj1=document.getElementById(flagids+"spanmsg");
		obj1.innerHTML="100%";
		var obj=document.getElementById(flagids+"span");
		obj.style.width='100%';
		
		
		var delobj=document.getElementById("dev"+flagids);
		
		//删除div文件
		fun.file_upload_delfilediv=function(flag,id,path,flash_obj_tmp,file){
			var flagids=flag+'_'+id;
			
			//移除div
			var obj=document.getElementById(flag);
			if(obj=='') obj=document.body;
			var obj1=document.getElementById(flagids);
			obj.removeChild(obj1);
			
			
			var seid=flag.substring(0,flag.length-4);
			if(document.getElementById(seid)!=null&&typeof document.getElementById(seid)!='undefined'){
				var vv=document.getElementById(seid).value;
				document.getElementById(seid).value=vv.replace(','+path,'');
			}
			if(document.getElementById(seid+"_name")!=null&&typeof document.getElementById(seid+"_name")!='undefined'){
				var vv=document.getElementById(seid+"_name").value;
				document.getElementById(seid+"_name").value=vv.replace(','+file.name,'');
			}
			flash_obj_tmp.setFileUploadLimit(parseInt(flash_obj_tmp.getSetting('file_upload_limit'))+1);
		}
		
		
		if(typeof delobj!='undefined'){
			delobj.onclick=function (){
				if(typeof op.del=='function'){
					if(op.del(flag,id,path)==false)
						return false;
				}
				fun.file_upload_delfilediv(flag,id,path,flash_obj_tmp,file);
			}
		}
	}
	
	//###########################################################################################
	//选择文件
	op.file_queued_handler=function(file){
		file_upload_number++;
		file_obj_arr[file_upload_number]=file.id;
		var flash_obj=this;
		if(typeof op.start=='function'){
			if(op.start(op.base,file_upload_number,file.name,file.size)==false){
				flash_obj.stopUpload();
				return false;
			}
		}
		var flag;
		for(var m in file_obj_arr){
			if(file_obj_arr[m]==file.id){ flag=m; break;}
		}
		fun.file_upload_select_show(op.base,flag,file.name,file.size);
		
		this.startUpload();
	}
	
	
	//选择文件错误
	op.file_queue_error_handler=function(file, errorCode, message){
		try {
			if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
				alert('对不起当前允许上传的文件数量，超出系统规定的个数('+op.limit+')，请先删除');
				return;
			}
			switch (errorCode) {
				case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
					alert("上传文件太大（文件大小不超过"+op.size+"M）,本次文件大小"+parseInt(((file.size/1024)/1024))+"M");
					break;
				case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
					alert("文件太小了，小到为0");
					break;
				case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
					alert('文件类型不正确');
					break;
				default:
					alert('文件错误，请重试');
					break;
			}
		}catch(ex){
			this.debug(ex);
		}
	}
	
	
	//对话框选择完毕后
	op.file_dialog_complete_handler= function (numFilesSelected, numFilesQueued){
		try {
			//alert('===='+numFilesSelected+'===='+numFilesQueued+'++'+this.movieName);
			//this.startUpload();
		} catch (ex){this.debug(ex);}
	}
	
	op.upload_start_handler=function (file) {}
	
	//上传进度
	op.upload_progress_handler=function(file, bytesLoaded, bytesTotal){
		
		var flag;
		for(var m in file_obj_arr){
			if(file_obj_arr[m]==file.id){ flag=m; break;}
		}
		if(typeof op.progress=='function'){
			if(op.progress(flag,bytesLoaded,bytesTotal)==false){
				return false;
			}
		}
		fun.file_upload_progress_show(op.base,flag,bytesLoaded,bytesTotal);
	}
	
	//上传出错函数
	op.upload_error_handler=function (file, errorCode, message){}
	
	
	//上传成功
	op.upload_success_handler=function (file, serverData,response){
		
		var flash_obj=this;
		var flag;
		for(var m in file_obj_arr){
			if(file_obj_arr[m]==file.id){ flag=m; break;}
		}
		//自定函数
		if(typeof op.progressover=='function'){
			if(op.progressover(op.base,flag,serverData)==false){
				return false;
			}
		}
		fun.file_upload_progressover_show(op.base,flag,serverData,this,file);
	}
	

	op.upload_complete_handler=function (file){
		
		if (this.getStats().files_queued === 0) {
		}else{
			this.startUpload();
		}
	}
	op.queue_complete_handler=function (numFilesUploaded) {}
	
	//配置区
	var settings = {
			flash_url :op.src,
			upload_url:op.url,
			post_params: {"PHPSESSID" : ""},
			file_size_limit : op.size+" MB",
			file_types : op.filetype,
			file_types_description : op.filename,
			file_upload_limit : op.limit,
			file_queue_limit : op.limit,
			/*
			custom_settings : {
				progressTarget : "fsUploadProgress",
				cancelButtonId : "btnCancel"
			},
			*/
			debug: false,

			// Button settings
			button_image_url: op.button_image_url,
			button_width: op.width,
			button_height: op.height,
			button_placeholder_id: op.flashcontent,
			button_text: '<span class="theFont">'+op.button_text+'</span>',
			button_text_style: op.button_text_style,
			button_text_left_padding: 0,
			button_text_top_padding: 3,
			
			// The event handler functions are defined in handlers.js
			file_queued_handler :op.file_queued_handler,
			file_queue_error_handler :op.file_queue_error_handler,
			file_dialog_complete_handler :op.file_dialog_complete_handler,
			upload_start_handler : op.upload_start_handler,
			upload_progress_handler : op.upload_progress_handler,
			upload_error_handler : op.upload_error_handler,
			upload_success_handler : op.upload_success_handler,
			upload_complete_handler : op.upload_complete_handler,
			queue_complete_handler : op.queue_complete_handler
	};
	return new SWFUpload(settings);
}

function file_upload_defilediv_edit(flag,id,path){

		var seid=flag.substring(0,flag.length-4);

		if(document.getElementById(seid)!=null){
			var vv=document.getElementById(seid).value;
			document.getElementById(seid).value=vv.replace(','+path,'');
		}
		if(document.getElementById(seid+"_name")!=null){
			var vv=document.getElementById(seid+"_name").value;
			//document.getElementById(seid+"_name").value=vv.replace(','+fname[id],'');
		}

		var obj1=document.getElementById(id);
		obj1.parentNode.removeChild(obj1);
	}

