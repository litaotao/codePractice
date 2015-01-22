(function($){
	$.expBlock = {};
	var IMG_DOMAIN = 'http://img.jiemian.com/static/jmw';
	var 
		//表情图片树的json格式
		EXP_DATA = [
					{
						name: '默认',
						icons:[
							//{url:IMG_DOMAIN+"/plugins/bq/img/zz2_thumb.gif",title:"/织"},
							{url:IMG_DOMAIN+"/plugins/bq/img/horse2_thumb.gif",title:"/神马"},
							{url:IMG_DOMAIN+"/plugins/bq/img/fuyun_thumb.gif",title:"/浮云"},
							{url:IMG_DOMAIN+"/plugins/bq/img/geili_thumb.gif",title:"/给力"},
							{url:IMG_DOMAIN+"/plugins/bq/img/wg_thumb.gif",title:"/围观"},
							{url:IMG_DOMAIN+"/plugins/bq/img/vw_thumb.gif",title:"/威武"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/panda_thumb.gif",title:"/熊猫"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/rabbit_thumb.gif",title:"/兔子"},
							{url:IMG_DOMAIN+"/plugins/bq/img/otm_thumb.gif",title:"/奥特曼"},
							{url:IMG_DOMAIN+"/plugins/bq/img/j_thumb.gif",title:"/囧"},
							{url:IMG_DOMAIN+"/plugins/bq/img/hufen_thumb.gif",title:"/互粉"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/liwu_thumb.gif",title:"/礼物"},
							{url:IMG_DOMAIN+"/plugins/bq/img/smilea_thumb.gif",title:"/呵呵"},
							{url:IMG_DOMAIN+"/plugins/bq/img/tootha_thumb.gif",title:"/嘻嘻"},
							{url:IMG_DOMAIN+"/plugins/bq/img/laugh.gif",title:"/哈哈"},
							{url:IMG_DOMAIN+"/plugins/bq/img/tza_thumb.gif",title:"/可爱"},
							{url:IMG_DOMAIN+"/plugins/bq/img/kl_thumb.gif",title:"/可怜"},
							{url:IMG_DOMAIN+"/plugins/bq/img/kbsa_thumb.gif",title:"/挖鼻屎"},
							{url:IMG_DOMAIN+"/plugins/bq/img/cj_thumb.gif",title:"/吃惊"},
							{url:IMG_DOMAIN+"/plugins/bq/img/shamea_thumb.gif",title:"/害羞"},
							{url:IMG_DOMAIN+"/plugins/bq/img/zy_thumb.gif",title:"/挤眼"},
							{url:IMG_DOMAIN+"/plugins/bq/img/bz_thumb.gif",title:"/闭嘴"},
							{url:IMG_DOMAIN+"/plugins/bq/img/bs2_thumb.gif",title:"/鄙视"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/lovea_thumb.gif",title:"/爱你"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sada_thumb.gif",title:"/泪"},
							{url:IMG_DOMAIN+"/plugins/bq/img/heia_thumb.gif",title:"/偷笑"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/qq_thumb.gif",title:"/亲亲"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sb_thumb.gif",title:"/生病"},
							{url:IMG_DOMAIN+"/plugins/bq/img/mb_thumb.gif",title:"/太开心"},
							{url:IMG_DOMAIN+"/plugins/bq/img/ldln_thumb.gif",title:"/懒得理你"},
							{url:IMG_DOMAIN+"/plugins/bq/img/yhh_thumb.gif",title:"/右哼哼"},
							{url:IMG_DOMAIN+"/plugins/bq/img/zhh_thumb.gif",title:"/左哼哼"},
							{url:IMG_DOMAIN+"/plugins/bq/img/x_thumb.gif",title:"/嘘"},
							{url:IMG_DOMAIN+"/plugins/bq/img/cry.gif",title:"/衰"},
							{url:IMG_DOMAIN+"/plugins/bq/img/wq_thumb.gif",title:"/委屈"},
							{url:IMG_DOMAIN+"/plugins/bq/img/t_thumb.gif",title:"/吐"},
							{url:IMG_DOMAIN+"/plugins/bq/img/k_thumb.gif",title:"/打哈气"},
							{url:IMG_DOMAIN+"/plugins/bq/img/bba_thumb.gif",title:"/抱抱"},
							{url:IMG_DOMAIN+"/plugins/bq/img/angrya_thumb.gif",title:"/怒"},
							{url:IMG_DOMAIN+"/plugins/bq/img/yw_thumb.gif",title:"/疑问"},
							{url:IMG_DOMAIN+"/plugins/bq/img/cza_thumb.gif",title:"/馋嘴"},
							{url:IMG_DOMAIN+"/plugins/bq/img/88_thumb.gif",title:"/拜拜"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sk_thumb.gif",title:"/思考"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sweata_thumb.gif",title:"/汗"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sleepya_thumb.gif",title:"/困"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sleepa_thumb.gif",title:"/睡觉"},
							{url:IMG_DOMAIN+"/plugins/bq/img/money_thumb.gif",title:"/钱"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sw_thumb.gif",title:"/失望"},
							{url:IMG_DOMAIN+"/plugins/bq/img/cool_thumb.gif",title:"/酷"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/hsa_thumb.gif",title:"/花心"},
							{url:IMG_DOMAIN+"/plugins/bq/img/hatea_thumb.gif",title:"/哼"},
							{url:IMG_DOMAIN+"/plugins/bq/img/gza_thumb.gif",title:"/鼓掌"},
							{url:IMG_DOMAIN+"/plugins/bq/img/dizzya_thumb.gif",title:"/晕"},
							{url:IMG_DOMAIN+"/plugins/bq/img/bs_thumb.gif",title:"/悲伤"},
							{url:IMG_DOMAIN+"/plugins/bq/img/crazya_thumb.gif",title:"/抓狂"},
							{url:IMG_DOMAIN+"/plugins/bq/img/h_thumb.gif",title:"/黑线"},
							{url:IMG_DOMAIN+"/plugins/bq/img/yx_thumb.gif",title:"/阴险"},
							{url:IMG_DOMAIN+"/plugins/bq/img/nm_thumb.gif",title:"/怒骂"},
							{url:IMG_DOMAIN+"/plugins/bq/img/hearta_thumb.gif",title:"/心"},
							{url:IMG_DOMAIN+"/plugins/bq/img/unheart.gif",title:"/伤心"},
							{url:IMG_DOMAIN+"/plugins/bq/img/pig.gif",title:"/猪头"},
							{url:IMG_DOMAIN+"/plugins/bq/img/ok_thumb.gif",title:"/ok"},
							{url:IMG_DOMAIN+"/plugins/bq/img/ye_thumb.gif",title:"/耶"},
							{url:IMG_DOMAIN+"/plugins/bq/img/good_thumb.gif",title:"/赞"},
							{url:IMG_DOMAIN+"/plugins/bq/img/no_thumb.gif",title:"/不要"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/z2_thumb.gif",title:"/赞"},
							{url:IMG_DOMAIN+"/plugins/bq/img/come_thumb.gif",title:"/来"},
							{url:IMG_DOMAIN+"/plugins/bq/img/sad_thumb.gif",title:"/弱"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/lazu_thumb.gif",title:"/蜡烛"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/clock_thumb.gif",title:"/钟"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/cake.gif",title:"/蛋糕"},
							//{url:IMG_DOMAIN+"/plugins/bq/img/m_thumb.gif",title:"/话筒"}
						]
					}
				],
		//图片数组，用于表情从代号到图片的便捷转化
		IMGS_DATA = [],		
		//表情的控制参数
		expEnable = true,
		//配置
		config = {
			//用户表情结构数据
			expData: null,
			//包含textarea和表情触发的exp-holder
			holder: '.exp-holder',
			//exp-holder中的textarea输入dom，默认为textarea
			textarea : 'textarea',
			//触发dom
			trigger : '.exp-block-trigger',
			//每页显示表情的组数
			grpNum : 5,
			//位置相对页面固定(absolute)||窗口固定(fixed)
			posType : 'absolute',
			//表情层数
			zIndex : '100'
		},
		//矫正插件位置偏离
		pos_correct_left = 30,
		//关闭triggerpos_correct_left
		exp_close_tri = '.exp-close',
		//group panel可容纳的最发group数量
		grp_num_per_panel = 1,
		win = window || document,
		bd = 'body';

	/**
	 * 初始化表情插件
	 */
	function init(cfg){
		//参数整合
		$.extend(config,cfg);
		if(config.expData != null) EXP_DATA = config.expData;
		_getImgData();
		var triggers = $(config.trigger);
		
		triggers.each(function(){
			$(this).on('click',function(){
				//大量参数预定义,获取
				var me = $(this),
					holder = $(me.parent().siblings(config.holder)[0]),
					ta = $(holder.find(config.textarea)[0]),
					exp = $(_genrt_html()),
					off = me.offset(), me_l = off.left - 50, me_t = off.top, me_w = me.width(), me_h = me.height(),
					exp_t = me_t + me_h, exp_l = me_l + (me_w + pos_correct_left)/2,
					exp_close = exp.find(exp_close_tri),
					exp_sub_tab = exp.find('.exp-sub-tab'), sub_tab_items = exp_sub_tab.children('.group-name'), sub_tab_pre = exp_sub_tab.find('.pre'),sub_tab_next = exp_sub_tab.find('.next'), curGroup = null,
					grpCnt = EXP_DATA.length,
					grpPgCnt = (function(){
						var p = Math.floor(grpCnt / config.grpNum);
						if(grpCnt % config.grpNum != 0){
							return p +1;
						}else{
							return p;
						}
					})(), curGrpPg = 1,
					expUl = exp.find('.exp-detail');
				//功能函数准备	
				var 
					/**
					 * 显示第i组的表情
					 */
					showXGroupExp = function(i){
						var expList = '', listDOM;
						if(curGroup != null && curGroup != i){
							sub_tab_items.eq(curGroup).removeClass('slct');
							curGroup = i;
							sub_tab_items.eq(i).addClass('slct');
							sub_tab_items.eq(i).addClass('slct');
							for(var j = 0; j < EXP_DATA[i].icons.length; j++){
								expList += '<li action-data="['+EXP_DATA[i].icons[j].title+']"><img title="'+EXP_DATA[i].icons[j].title+'" alt="'+EXP_DATA[i].icons[j].title+'" src="'+EXP_DATA[i].icons[j].url+'"></li>';
							}
							listDOM = $(expList);
							//alert(listDOM.length);
							listDOM.each(function(){
								$(this).click(function(){
									var me = $(this),
                                        actData = me.attr('action-data'),

                                        taVal = ta.val();
									ta.val(taVal+actData).change();
                                    $(bd).off('click');
									me.off('mouseout');
									$(win).off('resize');
									exp.remove();
								});
							});
							expUl.children().remove();
							expUl.append(listDOM);
						}
						else if(curGroup == null){
							curGroup = i;
							sub_tab_items.eq(i).addClass('slct');
							for(var j = 0; j < EXP_DATA[i].icons.length; j++){
								expList += '<li action-data="['+EXP_DATA[i].icons[j].title+']"><img title="'+EXP_DATA[i].icons[j].title+'" alt="'+EXP_DATA[i].icons[j].title+'" src="'+EXP_DATA[i].icons[j].url+'"></li>';
							}
							listDOM = $(expList);
							//alert(listDOM.length);
							listDOM.each(function(){
								$(this).click(function(){
									var me = $(this), actData = me.attr('action-data'),taVal = ta.val();
                                    ta.focus();
									ta.val(taVal+actData).change();
                                    $(bd).off('click');
									me.off('mouseout');
									$(win).off('resize');
									exp.remove();
								});
							});
							expUl.children().remove();
							expUl.append(listDOM);
						}else if(curGroup !=null && curGroup == i){
						}
					},
					/**
					 * 显示第i页的group
					 */
					showGrp = function(i){
						var range = {};
						range.left = (i-1)*config.grpNum;
						range.left = Math.max(0,range.left);
						range.right = (i)*config.grpNum - 1;
						range.right = Math.min(range.right,grpCnt-1);
						sub_tab_items.hide();
						for(var j = range.left; j <= range.right; j++){
							sub_tab_items.eq(j).show();
						}
						curGrpPg  = i;
						
						
						if(curGrpPg == 1){
							sub_tab_pre.addClass('pre-disable');
						}
						else{
							sub_tab_pre.removeClass('pre-disable');
						}
						if(curGrpPg >= grpPgCnt){
							sub_tab_next.addClass('next-disalbe');
						}
						else{
							sub_tab_next.removeClass('next-disalbe');
						}
						
					};

				if(config.posType == 'fixed'){
					me_t = off.top - $(win).scrollTop();
					exp_t = me_t + me_h;
				}

				//如果允许表情
				if(expEnable){
					//确定表情插件的位置
					exp.css({position: config.posType, zIndex: config.zIndex, left:exp_l+'px', top: exp_t+'px'});
					//窗口重置时重新调整插件位置
					$(win).resize(function(){
						off = me.offset(), me_l = off.left - 50, me_t = off.top;
						exp_t = me_t + me_h, exp_l = me_l + (me_w + pos_correct_left)/2;
						exp.css({left:exp_l+'px', top: exp_t+'px'});
					});
					
					/*各种事件绑定*/
					
					//关闭X事件
					exp_close.click(function(){
						$(bd).off('click');
						me.off('mouseout');
						$(win).off('resize');
						exp.remove();
					});
					
					//trigger的鼠标移出事件（点击之后就删除）
					me.mouseout(function(){
						$(bd).click(function(e){
							var clickDOM = $(e.target);
							var a = clickDOM.parents('.exp-layer');
							if(!a.hasClass('exp-layer')){
								exp.remove();
								$(bd).off('click');
								me.off('mouseout');
								$(win).off('resize');
							}
						})
					});
					
					showGrp(1);
					//设置group—panel的翻页切换事件
					sub_tab_pre.click(function(){
						var p = curGrpPg -1, rg;
						p = (p < 1)?1 : p;
						showGrp(p);
						
					});
					sub_tab_next.click(function(){
						var p = curGrpPg + 1, rg;
						p = (p > grpPgCnt)? curGrpPg : p;
							showGrp(p);
						
					})
					
					//默认打开第一组表情
					showXGroupExp(0);
					//group点击事件
					sub_tab_items.each(function(){
						$(this).click(function(){
							var me = $(this), groupIndex = me.attr('grp-index');
							showXGroupExp(groupIndex);
						});
					});
					
					
					//往页面插入dom
					$('body').append(exp);
					exp.show();
				}
			});
		})
	}
	/**
	 * 使所有的添加了表情触发类的click事件在表情上失效
	 */
	function disableExp(){
		expEnable = false;
	}
	/**
	 * 重新启用表情
	 */
	function enableExp(){
		expEnable = true;
	}
	/**
	 * 获取远程表情的数据结构，必须返回符合规定数据格式的json数据，ajax形式传入
	 * 数据格式如：[{name: groupname,icons:[{url:'imgurl',title:"iconname"},{url:'imgurl',title:"iconname"}]},{name: groupname,icons:[{url:'imgurl',title:"iconname"},{url:'imgurl',title:"iconname"}]},...]
	 */
	function getRemoteNewExp(data_url){
		$.ajax({
			url: data_url,
			success : function(data){
				EXP_DATA = eval(data);
				_getImgData();
			},
			error: function(){
				('传入的url错误');
			}
		})
	}
	
	/**
	 * 将字符串中的表情代号以图片标签代替
	 */
	function textFormat(str){
		var reg = /\[([^\]\[\/ ]+)\]/g,
			src = str,
			rslt,
			temp;
		_getImgData();
		while(temp =reg.exec(src)){
			var s = _switchImg(temp[1]),
				creg,
				t =  "\\[("+temp[1]+")\\]" ; 
			creg = new RegExp(t,"g");
			if(src.match(temp[0]) && s != temp[1]){
				src = src.replace(creg,s);
			}
		}
		return src;	
	}
	//私有函数
	
	/**
	 * 生成表情的html代码
	 */
	function _genrt_html(){
		var html = '<div class="exp-layer">' +
                        '<div class="holder">' +
                            '<div class="content">' +
                                '<div class="exp-tab clearfix">' +
                                    '<a href="javascript:;">表情</a>' +
                                '</div>' +
                            //'<div class="exp-sub-tab clearfix">';
                            //    for(var i = 0; i < EXP_DATA.length; i++){
                            //
                            //            html += '<a class="group-name" grp-index="'+i+'" href="javascript:;">'+ EXP_DATA[i].name+'</a>';
                            //    }
                            //    html += '<div class="sub-tab-pagination">' +
                            //                '<a class="pre"></a>' +
                            //                '<a class="next"></a>' +
                            //            '</div>' +
                            //'</div>' +
                            '<ul class="exp-detail clearfix">'+
                                /*
                                for(var j = 0; j < EXP_DATA[0].icons.length; j++){
                                            html += '<li action-data="['+EXP_DATA[0].icons[i].title+']"><img title="'+EXP_DATA[0].icons[i].title+'" alt="'+EXP_DATA[0].icons[i].title+'" src="'+EXP_DATA[0].icons[i].url+'"></li>';
                                        }*/

                                //html +=
                            '</ul>' +
                        '</div>' +
                        '<a class="exp-close" href="javascript:;"></a>' +
                    '</div>' +
                    '<a class="exp-tri" href="javascript:;"></a>' +
                    '</div>';
                                return html;
	}
	
	/**
	 * 图片转换，目的是将表情代号转化成图片地址
	 * 如:[微笑] == > <img src='smile.png' />
	 */
	function _switchImg(str){
		for(var i = 0; i < IMGS_DATA.length; i++){
			if(IMGS_DATA[i].title == str){
				return '<img src="'+IMGS_DATA[i].url+'" width="20" height="20" class="emoji-img"/>';
			}
		}
		return str;
	}
	
	/**
	 * 集中生成图片数据,根据EXP_DATA生成提取里面的图片数组
	 */
	function _getImgData(){
		for(var i = 0 ; i < EXP_DATA.length; i++){
			IMGS_DATA.push(EXP_DATA[i].icons);
			for(var j = 0; j < EXP_DATA[i].icons.length; j++){
				IMGS_DATA.push(EXP_DATA[i].icons[j]);
			}
		}
	}
		
	//扩展到jquery
	$.expBlock = {
			initExp : init,
			disableExp : disableExp,
			enableExp : enableExp,
			getRemoteExp : getRemoteNewExp,
			textFormat : textFormat
	};
				
})(jQuery)
