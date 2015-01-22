define(function(require, exports){


var postTagsUrl = '/userdata?huxiu_hash_code='+huxiu_hash_code
	,allowTagNum = '10'
	;
/*
* 查询标签
* 
*/
jQ(document).delegate('.add-jobs-btn','click',function(){
	var t = jQ(this)
	    ,title = '<h4>设置职业信息</h4>'
	    ,uid = t.parents('li').attr('uid')
	    ,tagsNewNum = t.parents('ul').find('li').length-1
	    ,tagSurpNum = allowTagNum-tagsNewNum
	    ,url = postTagsUrl
	    ,msg = '<form class="form-horizontal" id="set_user_info"><div class="control-group"><label class="control-label" for="companyName"><i class="i-red">*</i>单位名称</label><div class="controls"><input type="text" id="companyName" placeholder="单位名称"></div></div><div class="control-group"><label class="control-label" for="reMark"><i class="i-red">*</i>部门/名称</label><div class="controls"><input type="text" id="reMark" placeholder="部门/名称"></div></div><div class="control-group"><label class="control-label" for="place"><i class="i-red">*</i>工作地点</label><div class="controls"><input type="text" id="place" placeholder="部门/名称"></div></div><div class="control-group"><label class="control-label" for="starttime"><i class="i-red">*</i>开始时间</label><div class="controls"><select class="span2" name="startyear">'+queryYM(1900,2013,'desc')+'</select>年<select class="span1" name="startmoon">'+queryYM(1,12,'asc')+'</select>月 </div></div><div class="control-group"><label class="control-label" for="endtime"><i class="i-red">*</i>结束时间</label><div class="controls"><select class="span2" name="endtyear"><option value="this">至今</option>'+queryYM(1900,2013,'desc')+'</select>年<select class="span1" name="endmoon">'+queryYM(1,12,'asc')+'</select>月 </div></div><div class="control-group"><div class="controls"><button type="submit" class="btn">提交</button></div></div></form>'
	    ;
	showBox(title,msg)
	postTags(t,'get_user_info',url,'author',uid);
})
/*
* select 年月
* act = 'asc'/'desc'
*/
function queryYM(start,end,act){
	var sNum = isUndefined(start)?'1':start
		,eNum = isUndefined(end)?'12':end
		,num = ''
		,box = ''
		;
	if(act=='asc'){
		while(sNum <= eNum){
			if(sNum<10){
				num = '0'+sNum;
			}else{
				num = sNum;
			}
			box += '<option value="'+num+'">'+num+'</option>';
			sNum++;
		}
	}else if(act=='desc'){
		while(eNum >= sNum){
			if(eNum<10){
				num = '0'+eNum;
			}else{
				num = eNum;
			}
			box += '<option value="'+num+'">'+num+'</option>';
			eNum--;
		}
	}
	return box;
}




/*
* 修改
*/

	
/*
* 删除
*/


/*
* 删除作者标签
*/


/*
* 删除标签
*/

/*
* postTags
* uid,tagid,act,idtype,tagname
* act = 'add_user_tag/del_user_tag/add_hx_tag/del_hx_tag/get_user_info'
* idtype = 'author/member'
* data.author_tags[],.data.all_tags[]
*/
function postTags(t,act,url,idtype,uid){
	var t = jQ(t)
		,uid = isUndefined(uid)?'':uid
		,tagid = isUndefined(t.attr('tagid'))?'':t.attr('tagid')
		,random = parseInt(Math.random()*100000)
		,postUrl = url+'&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
		,ulWrap = jQ('.territory-tags-wrap ul')
		;
	if(act == 'get_user_info'){
		var postData = {
			'uid':uid
			,'act':act
			,'idtype':idtype
		}
		var author_tags = new Array();
		jQ(t.parents('ul').find('li:not(.li-btm)')).each(function(i){
			var tagid = jQ(this).attr('tagid')
				,tagname = jQ(this).find('a').text();

			author_tags[i] = {
				'tagid' : tagid
				,'tagname' : tagname
			};
		})
	}
	if(act == 'add_user_tag'){
		var tagname = jQ(t).text()
			,postData = {
			'uid':uid
			,'tagid':tagid
			,'act':act
			,'idtype':idtype
			,'tagname':tagname
		}
	}
	if(act == 'del_user_tag'){
		var tagname = jQ(t).text()
			,postData = {
			'uid':uid
			,'tagid':tagid
			,'act':act
			,'idtype':idtype
			,'tagname':tagname
		}
	}
	if(act == 'add_hx_tag'){
		var tagname = jQ(t).parents('form').find('.input').val()
			,postData = {
			'uid':uid
			,'tagid':tagid
			,'act':act
			,'idtype':idtype
			,'tagname':tagname
		}
	}
	if(act == 'del_hx_tag'){
		var postData = {
			'tagid':tagid
			,'act':act
		}
	}
	jQ.post(postUrl,postData,function(data){
		var data = eval('(' + data + ')');
		if(act == 'get_user_info'){
			if(data.is_success == '1') {
				loopDataHtml('.author-tag-ctt ul',author_tags,'1');
				loopDataHtml('.system-author-tags ul',data.all_tags);
			}else{
				alert(data.msg);
			}
		}
		if(act == 'add_user_tag'){
			if(data.is_success == '1') {
				jQ(t).addClass('disable');
				jQ('.author-tag-ctt ul').prepend('<li tagid="'+tagid+'"><a href="javascript:void(0)" class="a-tag-btn">'+tagname+'<i class="icon-remove icon-white" title="删除"></i></a></li>');
				ulWrap.prepend('<li tagid="'+tagid+'" class="clearfix"><a href="javascript:void(0)">'+tagname+'</a><i class="icon-remove icon-white tags-btn-del" title="删除" tagid="1"></i></li>');
				queryShow('#set_tags_form','添加成功','alert-success');
				//更改数量
				updataTagNum('add');
			}else{
				queryShow('#set_tags_form',data.msg,'alert-error');
			}
		}
		if(act == 'del_user_tag'){
			if(data.is_success == '1') {
				jQ(t).remove();
				jQ('.system-author-tags li[tagid='+tagid+']').removeClass('disable');
				ulWrap.find('li[tagid='+tagid+']').remove();
				queryShow('#set_tags_form','取消成功','alert-success');
				//更改数量
				updataTagNum('minus');
			}else{
				queryShow('#set_tags_form',data.msg,'alert-error');
			}
		}
		if(act == 'add_hx_tag'){
			if(data.is_success == '1') {
				jQ('.author-tag-ctt ul').prepend('<li tagid="'+data.tagid+'"><a href="javascript:void(0)" class="a-tag-btn">'+tagname+'<i class="icon-remove icon-white" title="删除"></i></a></li>');
				jQ('.system-author-tags ul').prepend('<li tagid="'+tagid+'" class="disable">'+tagname+'</li>');
				ulWrap.prepend('<li tagid="'+tagid+'" class="clearfix"><a href="javascript:void(0)">'+tagname+'</a><i class="icon-remove icon-white tags-btn-del" title="删除" tagid="1"></i></li>');
				queryShow('#set_tags_form','添加成功','alert-success');
				//更改数量
				t.siblings('input').val('');
				updataTagNum('add');
			}else{
				queryShow('#set_tags_form',data.msg,'alert-error');
			}
		}
		if(act == 'del_hx_tag'){
			if(data.is_success == '1') {
				jQ('#zzbq_list li[tagid='+tagid+']').remove();
				//更改数量
				updataTagNum('minus');
				//alert(data.msg)
			}else{
				alert(data.msg)
			}
		}
	})
}

/*
* 更新已有标签数量
* act = 'add'/'minus'
*/
function updataTagNum(act){
	var tagsNew = jQ('.tag-new-num')
		,tagsSurp = jQ('.tag-surp-num')
		,tagsNewNum = parseInt(tagsNew.text())
		,tagsSurpNum = parseInt(tagsSurp.text())
		;
	if(act=='add'){
		tagsNew.text(tagsNewNum+1);
		tagsSurp.text(tagsSurpNum-1);
	}else if(act=='minus'){
		tagsNew.text(tagsNewNum-1);
		tagsSurp.text(tagsSurpNum+1);
	}
}

function loopDataHtml(t,ctt,type){
	var htmlBox = ''
		,val = ctt
		;
	if(type == '1'){
		jQ(val).each(function(i){
			htmlBox += '<li tagid="'+val[i]['tagid']+'"><a href="javascript:void(0)" class="a-tag-btn">'+val[i]['tagname']+'<i class="icon-remove icon-white" title="删除"></i></a></li>';
		})
	}else{
		jQ(val).each(function(i){
			if(val[i]['status']=='1'){
				htmlBox += '<li tagid="'+val[i]['tagid']+'" class="disable">'+val[i]['tagname']+'</li>';
			}else{
				htmlBox += '<li tagid="'+val[i]['tagid']+'">'+val[i]['tagname']+'</li>';
			}
		})
	}
	jQ(t).html(htmlBox);
}


/*
* 表单错误展示
* type="alert-error/alert-success"
*/
function queryShow(id,s,type){
	var box = '<div class="alert '+type+'"><button type="button" class="close" data-dismiss="alert">x</button><div class="box-ctt">'+s+'</div></div>'
	;
	if(jQ('#showBoxModal .alert').length>0){
		jQ('#showBoxModal .alert').attr('class','alert '+type).find('.box-ctt').html(s);
	}else{
		jQ(id).after(box);
	}
}


/*
* 显示框
*/
function showBox(t,m){
	if(jQ('#showBoxModal').length>0){
		jQ('#showBoxModal').find('.t-h2').html(t);
		jQ('#showBoxModal').find('.modal-body').html(m);
	}else{
		var box = '<div id="showBoxModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><div class="show-box-t-h2">'+t+'</div></div><div class="modal-body">'+m+'</div><div class="modal-footer"><button type="button" class="btn" data-dismiss="modal" aria-hidden="true">关闭</button></div></div>'
		jQ('body').append(box);
	}
	jQ('#showBoxModal').modal('toggle');
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}


})