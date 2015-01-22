// JavaScript Document
var domain = "http://"+location.host;

var forms = {
	init: function () {
        this.loadProvince();
		this.loadFuncs();
		this.checkEmail();
		this.checkPass();
		this.checkNick();
		this.checkFuncs();
		this.checkExperTitle();
		this.checkLocation();
		this.checkValidation();
		//company
		this.checkLicense();
		this.checkPublicity();
		this.checkComLocation();
		this.checkContact();
		this.checkTitle();
		this.checkPhone();
		this.checkComEmail();
		this.checkAreaCode();
		//apply
		this.checkCompanyIntro();
		this.checkCompanyNature();
		this.checkCompanyScale();
		this.checkEstablishTime();
		this.checkCompanyPhone();
		this.checkLocationAddress();
		//COMPANY
		this.loadIndustry();
		this.loadCompanyNature();
		this.loadCompanyScale();

    },
	provinceChange:function(){
		$("#province").bind('change',function(){
			forms.loadCity($("#province").val());
		});
	},
	loadProvince:function(selected){
		$.get(domain+"/api/getProvince/orderbyField/sort/orderbyType/desc",function(data){
			$.each(data,function(i,province){
				if(province.provinceName!=''){
					if(selected == province.provinceCode){
						$("<option value='" + province.provinceCode + "' selected='selected'>" + province.provinceName + "</option>").appendTo($("#province"));
						$("#search_condition").removeClass("hide").find(".condition_province").append("<span>" + province.provinceName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','province');\"></a>");
						$("#search_condition_people").removeClass("hide").find(".condition_province").append("<span>" + province.provinceName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.people('province');\"></a>");
						$("#search_condition_company").removeClass("hide").find(".condition_province").append("<span>" + province.provinceName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.company('province');\"></a>");
					}else{
						$("<option value='" + province.provinceCode + "'>" + province.provinceName + "</option>").appendTo($("#province"));
					}
				}
			});
		},'json');
	},
	loadCity:function(pCode,cCode){
		if(pCode==0){
			$("#city").empty();
			$("<option value='0'>市/区</option>").appendTo($("#city"));
			return false;
		}
		$.get(domain+"/api/getCitys/pCode/"+pCode+"/orderbyField/cityCode/orderbyType/asc",function(data){
			$("#city").empty();
			$.each(data,function(i,city){
				if(city.cityName!=''){
					if(cCode==city.cityCode){
						$("<option value='" + city.cityCode + "' selected>" + city.cityName + "</option>").appendTo($("#city"));
					}else{
						$("<option value='" + city.cityCode + "'>" + city.cityName + "</option>").appendTo($("#city"));
					}
				}
			});
		},'json');
	},
	loadFuncs:function(selected){
		$.get(domain+"/api/getFuncs/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,funcs){
				if(funcs.funcName!=''){
					if(selected == funcs.funcId){
						$("<option value='" + funcs.funcId + "' selected='selected'>" + funcs.funcName + "</option>").appendTo($("#funcs"));
						$("#search_condition").removeClass("hide").find(".condition_function").append("<span>" + funcs.funcName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','functions');\"></a>");
						$("#search_condition_people").removeClass("hide").find(".condition_function").append("<span>" + funcs.funcName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.people('functions');\"></a>");
					}else{
						$("<option value='" + funcs.funcId + "'>" + funcs.funcName + "</option>").appendTo($("#funcs"));
					}
				}
			});
		},'json');
	},
	loadSalaryRange:function(selected){
		$.get(domain+"/api/getSalaryRange/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,range){
				if(range.content!=''){
					if(selected == range.srId){
						$("#search_condition").removeClass("hide").find(".condition_salaryrange").append("<span>" + range.content + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','salaryRange');\"></a>");
						$("<option value='" + range.srId + "' selected>" + range.content + "</option>").appendTo($("#salary_range"));
					}else{
						$("<option value='" + range.srId + "'>" + range.content + "</option>").appendTo($("#salary_range"));
					}
				}
			});
		},'json');
	},
	loadJobLevels:function(check){
		$.get(domain+"/api/getJobLevels/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,jobLevel){
				if(jobLevel.content!=''){
					if(check == jobLevel.jlId){
						$("#search_condition").removeClass("hide").find(".condition_joblevel").append("<span>" + jobLevel.content + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','jobLevels');\"></a>");
						$("<li><input name='jobLevels' value='" + jobLevel.jlId + "' checked type=\"radio\" id=\"joblevel_"+jobLevel.jlId+"\"><label for=\"joblevel_"+jobLevel.jlId+"\">" + jobLevel.content + "</label></li>").appendTo($("#job_levels"));
					}else{
						$("<li><input name='jobLevels' value='" + jobLevel.jlId + "' type=\"radio\" id=\"joblevel_"+jobLevel.jlId+"\"><label for=\"joblevel_"+jobLevel.jlId+"\">" + jobLevel.content + "</label></li>").appendTo($("#job_levels"));
					}
				}
			});
		},'json');
	},
	loadJobLevelsSelect:function(check){
		$.get(domain+"/api/getJobLevels/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,jobLevel){
				if(jobLevel.content!=''){
					if(check == jobLevel.jlId){
						$("#search_condition").removeClass("hide").find(".condition_joblevel").append("<span>" + jobLevel.content + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','jobLevels');\"></a>");
						$("<option value='" + jobLevel.jlId + "' selected='selected'>" + jobLevel.content + "</option>").appendTo($("#job_levels"));
					}else{
						$("<option value='" + jobLevel.jlId + "'>" + jobLevel.content + "</option>").appendTo($("#job_levels"));
					}
				}
			});
		},'json');
	},
	loadJobTypesSelect:function(check){
		$.get(domain+"/api/getJobTypes/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,jobType){
				if(jobType.content!=''){
					if(check == jobType.jtId){
						$("#search_condition").removeClass("hide").find(".condition_jobtype").append("<span>" + jobType.content + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','jobTypes');\"></a>");
						$("<option value='" + jobType.jtId + "' selected='selected'>" + jobType.content + "</option>").appendTo($("#job_types"));
					}else{
						$("<option value='" + jobType.jtId + "'>" + jobType.content + "</option>").appendTo($("#job_types"));
					}
				}
			});
		},'json');
	},
	loadJobTypes:function(check){
		$.get(domain+"/api/getJobTypes/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,jobType){
				if(jobType.content!=''){
					if(check == jobType.jtId){
						$("<li><input name='jobTypes' value='" + jobType.jtId + "' checked type=\"radio\" id=\"jobType_"+jobType.jtId+"\"><label for=\"jobType_"+jobType.jtId+"\">" + jobType.content + "</label></li>").appendTo($("#job_types"));
					}else{
						$("<li><input name='jobTypes' value='" + jobType.jtId + "' type=\"radio\" id=\"jobType_"+jobType.jtId+"\"><label for=\"jobType_"+jobType.jtId+"\">" + jobType.content + "</label></li>").appendTo($("#job_types"));
					}
				}
			});
		},'json');
	},
	loadJobToolers:function(check){
		$.get(domain+"/api/getJobToolers/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,jobTooler){
				if(jobTooler.content!=''){
					if(check == jobTooler.jtId){
						$("<input name='jobToolers' value='" + jobTooler.jtId + "' checked type=\"radio\" id=\"jobTooler_"+jobTooler.jtId+"\"><label for=\"jobTooler_"+jobTooler.jtId+"\"><i class='icon " + jobTooler.content + "_icon'></i></label>").appendTo($("#job_toolers"));
					}else{
						$("<input name='jobToolers' value='" + jobTooler.jtId + "' type=\"radio\" id=\"jobTooler_"+jobTooler.jtId+"\"><label for=\"jobTooler_"+jobTooler.jtId+"\"><i class='icon " + jobTooler.content + "_icon'></i></label>").appendTo($("#job_toolers"));
					}
				}
			});
		},'json');
	},
	loadJobPubTime:function(check){
		$.get(domain+"/api/getJobPubTime/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,jobPubTime){
				if(jobPubTime.content!=''){
					if(check == jobPubTime.keyValue){
						$("#search_condition").removeClass("hide").find(".condition_publish").append("<span>" + jobPubTime.content + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','pubTime');\"></a>");
						$("<option value='" + jobPubTime.keyValue + "' selected='selected'>" + jobPubTime.content + "</option>").appendTo($("#pubTime"));
					}else{
						$("<option value='" + jobPubTime.keyValue + "'>" + jobPubTime.content + "</option>").appendTo($("#pubTime"));
					}
				}
			});
		},'json');
	},
	loadIndustry:function(){
		$.get(domain+"/api/getIndustry/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,industry){
				if(industry.insustryName!=''){
					if(i < 2 ){
						$("<option class='def_option' value='" + industry.inId + "'>" + industry.insustryName + "</option>").appendTo($("#industry"));
					}else{
						$("<option value='" + industry.inId + "'>" + industry.insustryName + "</option>").appendTo($("#industry"));
					}
				}
			});
		},'json');
	},
	loadIndu:function(selected){
		$.get(domain+"/api/getIndustry/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,industry){
				if(industry.insustryName!=''){
					if(selected == industry.inId){
						$("#search_condition_company").removeClass("hide").find(".condition_industry").append("<span>" + industry.insustryName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.company('industry');\"></a>");
						$("<option value='" + industry.inId + "' selected='selected'>" + industry.insustryName + "</option>").appendTo($("#industry"));
					}else{
						$("<option value='" + industry.inId + "'>" + industry.insustryName + "</option>").appendTo($("#industry"));
					}
				}
			});
		},'json');
	},
	loadRadioIndustry:function(check){
		$.get(domain+"/api/getIndustry/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,industry){
				if(industry.insustryName!=''){
					if(check == industry.inId){
						$("#search_condition").removeClass("hide").find(".condition_industry").append("<span>" + industry.insustryName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','industry');\"></a>");
						if(i < 2 ){
							$("<li><input type='radio' name='industry' value='" + industry.inId + "' checked id='industry_"+industry.inId+"'/><label for='industry_"+industry.inId+"'>"+industry.insustryName+"</label></li>").appendTo($("#industry"));
						}else if(i == 3){
							$("<li><input type='radio' name='industry' value='100' checked id='industry_100'/><label for='industry_100'>其它行业</label></li>").appendTo($("#industry"));
						}
					}else{
						if(i < 2 ){
							$("<li><input type='radio' name='industry' value='" + industry.inId + "' id='industry_"+industry.inId+"'/><label for='industry_"+industry.inId+"'>"+industry.insustryName+"</label></li>").appendTo($("#industry"));
						}else if(i == 3){
							$("<li><input type='radio' name='industry' value='100' id='industry_100'/><label for='industry_100'>其它行业</label></li>").appendTo($("#industry"));
						}
					}
				}
			});
		},'json');
	},
	loadPopIndustry:function(id){
		$.get(domain+"/api/getIndustry/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,industry){
				if(industry.insustryName!=''){
					$("<option value='" + industry.inId + "'>" + industry.insustryName + "</option>").appendTo($("#"+id));
				}
			});
		},'json');
	},
	industryChange:function(types){
		$("#industry").bind('change',function(){
			forms.loadCompanyType($("#industry").val(),types);
		});
	},
	loadCompanyType:function(inid,types){
		$.get(domain+"/api/getCompanyTypeByinId/id/"+inid+"/orderbyField/sort/orderbyType/asc",function(data){
			if(data.isSuccess == 1){
				$("#companyTypeBox").removeClass("hide");
				$("#companyType").empty();
				if(types==''){
					$.each(data.content,function(i,companyType){
						$("<li><input type=\"checkbox\" class='company_type' name='company_type' value='"+companyType.ctId+"' id=\"cotype_"+i+"\"><label for=\"cotype_"+i+"\">"+companyType.typeName+"</label></li>").appendTo($("#companyType"));
					});
				}else{
					comType = new Array;
					comType = types.split(",");
					function in_array(a, v) {
						var i;
						for (i = 0; i < a.length; i++) {
							if (v === a[i]) { return 1;}
						}
						return 0;
					}
					$.each(data.content,function(i,companyType){
						var checks = in_array(comType,companyType.ctId);
						if(checks==1){
							$("<li><input type=\"checkbox\" class='company_type' name='company_type' value='"+companyType.ctId+"' checked id=\"cotype_"+i+"\"><label for=\"cotype_"+i+"\">"+companyType.typeName+"</label></li>").appendTo($("#companyType"));
						}else{
							$("<li><input type=\"checkbox\" class='company_type' name='company_type' value='"+companyType.ctId+"' id=\"cotype_"+i+"\"><label for=\"cotype_"+i+"\">"+companyType.typeName+"</label></li>").appendTo($("#companyType"));
						}
					});
				}
				
			}else{
				$("#companyTypeBox").addClass("hide");
			}
		},'json');
	},	
	loadCompanyNature:function(selected){
		$.get(domain+"/api/getCompanyNature/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,nature){
				if(nature.natureName!=''){
					if(selected == nature.cnId){
						$("<option value='" + nature.cnId + "' selected='selected'>" + nature.natureName + "</option>").appendTo($("#companyNature"));
					}else{
						$("<option value='" + nature.cnId + "'>" + nature.natureName + "</option>").appendTo($("#companyNature"));
					}
				}
			});
		},'json');
	},
	loadCompanyScale:function(check){
		$.get(domain+"/api/getCompanyScale/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,scale){
				if(scale.scaleName!=''){
					if(check == scale.csId){
						$("#search_condition").removeClass("hide").find(".condition_companysale").append("<span>" + scale.scaleName + "</span><a class=\"icon del_tip_icon\"  href=\"javascript:void(0);\" onClick=\"searchs.jobs('advanced','companyScale');\"></a>");
						$("<option value='" + scale.csId + "' selected='selected'>" + scale.scaleName + "</option>").appendTo($("#companyScale"));
					}else{
						$("<option value='" + scale.csId + "'>" + scale.scaleName + "</option>").appendTo($("#companyScale"));
					}
				}
			});
		},'json');
	},
	loadPorjectRoles:function(id){
		$.get(domain+"/api/getProjectRoles/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,pRoles){
				if(pRoles.pRoleName!=''){
				    $("<p><label><input type=\"checkbox\" name='" + id + "'  value='" + pRoles.prrId + "' class=\"v_m mg_r_5 " + id + "\"><em class=\"v_m\">" + pRoles.pRoleName + "</em></label></p>").appendTo($("#" + id));
				}
			});
		},'json');
	},
	loadSelectRoles: function (id,select) {
	    $.get(domain + "/api/getProjectRoles/orderbyField/sort/orderbyType/asc", function (data) {
	        $.each(data, function (i, pRoles) {
	            if (pRoles.pRoleName != '') {
	                if (select == pRoles.prrId) {
	                    $("<option value='" + pRoles.prrId + "' selected='selected'>" + pRoles.pRoleName + "</option>").appendTo($("#" + id));
	                } else {
	                    $("<option value='" + pRoles.prrId + "'>" + pRoles.pRoleName + "</option>").appendTo($("#" + id));
	                }
	            }
	            
	        });
	    }, 'json');
	},
	checkEmail:function(){
		$("#register_mail").focusout(function(){
			//alert();
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
			}else{
				var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test($(this).val())){
					var data = {email:$(this).val()};
					if(!$("#register_mail").parents(".register_panel").hasClass("right_panel")){//如果验证正确的邮箱则不会再次请求接口
						$.post(domain+"/api/checkEmail/userType/user",data,function(data){
							if(data.isSuccess == 1){
								if (data.userAct == "1") {
									$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
								}else{
									$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该账户还没有被激活");
								}
								$("#register_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#register_mail").parents(".register_panel").find(".yellow_popup_box").hide();
							}else{
								$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱已被注册了");
							}
						},'json');
					}
				}else{
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
				}
			}
		});
	},//end check email
	checkPass:function(){
		$("#register_password").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
			}else{
				if($(this).val().length>=21 || $(this).val().length<=5){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check password
	checkConfirmPass:function(){
		$("#confirm_password").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("确认密码不能为空");
			}else{
				if($(this).val().length>=21 || $(this).val().length<=5){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("确认密码长度不符合要求");
				}else{
					if($(this).val() == $("#register_password").val()){
						$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
						$(this).parents(".register_panel").find(".yellow_popup_box").hide();
					}else{
						$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
						$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("两次输入的密码不相同");
					}
				}
			}
		});
	},//end check confirm password
	checkNick:function(){
		$("#register_nickname").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("昵称不能为空");
			}else{
				if($(this).val().length>=20 || $(this).val().length<=1){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("昵称长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check nick name
	checkExperTitle:function(){
		$("#add_exper_title").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("担任职位不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check exper title
	checkExperCom:function(){
		if($("#add_exper_company").val() == ''){
			$("#add_exper_company").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#add_exper_company").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请添加企业名称");
		}else{
			$("#add_exper_company").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#add_exper_company").parents(".register_panel").find(".yellow_popup_box").hide();
		}
	},//end check exper title
	checkFuncs:function(){
		$("#funcs").change(function(){
			if($(this).val() == 0){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请选择工作所属职能");
				return false;
			}else{
				//alert($(this).val());
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check functions
	checkLocation:function(){
		$("#province").change(function(){
			if($(this).val() == 0){
				$(this).parents(".register_select").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择所在地域");
				return false;
			}else{
				$(this).parents(".register_select").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_select").find(".yellow_popup_box").hide();
			}//end check location
		});
	},//end check location
	checkValidation:function(){
		$("#register_validation").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("验证码不能为空");
			}else{
				if($(this).val().length!=5){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("验证码长度不符合要求");
				}else{
					$.get(domain+"/api/captchavocode",function(data){
						if(data.content==$("#register_validation").val()){
							$("#register_validation").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
							$("#register_validation").parents(".register_panel").find(".yellow_popup_box").hide();
						}else{
							$("#register_validation").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#register_validation").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("验证码不正确");
						}
					},'json');
				}
			}
		});
		
		$("#register_validation").focusin(function(){
			if($("#getCode").hasClass("hide")){
				$("#changeCodeText").text("输入验证码");
				$("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
				$("#getCode").removeClass("hide");
			}
		});
		
	},//end check validation
	/*company apply*/
	checkLicense:function(){
		$("#license_name").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业名称不能为空");
			}else{
				if($(this).val().length>=100 || $(this).val().length<=1){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业名称长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check company license
	/*company apply*/
	checkLocationAddress:function(){
		$("#locationAddress").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("街道地址不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company location address
	/*company apply*/
	checkCompanyPhone:function(){
		$("#companyPhone").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("总机电话不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company telphone
	/*company apply*/
	checkEstablishTime:function(){
		$("#establishTime").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("成立年份不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company establish time
	/*company apply*/
	checkCompanyScale:function(){
		$("#companyScale").change(function(){
			if($(this).val() == 0){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请选择企业规模");
				return false;
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company scale
	/*company apply*/
	checkCompanyNature:function(){
		$("#companyNature").change(function(){
			if($(this).val() == 0){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请选择企业性质");
				return false;
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company scale
	/*company apply*/
	checkCompanyIntro:function(){
		$("#companyIntro").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业介绍不能为空");
			}else{
				if($(this).val().length>=600 || $(this).val().length<=20){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业介绍长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check company intro
	checkPublicity:function(){
		$("#publicity_name").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("宣传名不能为空");
			}else{
				if($(this).val().length>=100 || $(this).val().length<=1){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("宣传名长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check company publicity
	checkComLocation:function(){
		$("#company_location").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("通讯地址不能为空");
			}else{
				if($(this).val().length>=200 || $(this).val().length<=1){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("通讯地址长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check company location
	checkContact:function(){
		$("#contact_person").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系人不能为空");
			}else{
				if($(this).val().length>=20 || $(this).val().length<=1){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系人长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
	},//end check company contact
	checkTitle:function(){
		$("#contact_title").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系人职称不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company contact title
	checkAreaCode:function(){
		$("#contact_area").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("区号不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company area code
	checkPhone:function(){
		$("#contact_phone").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系电话不能为空");
			}else{
				$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").hide();
			}
		});
	},//end check company contact phone
	checkComEmail:function(){
		$("#contact_mail").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
			}else{
				var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test($("#contact_mail").val())){
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}else{
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
				}
			}
		});
	}//end check company email
}//end form
var captcha = {
	reflash:function(){
		$("#captchaflash").click(function(){
			$("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
			$("#register_validation").attr("value","");
			$(this).parents(".register_panel").removeClass("right_panel");
		});
	},
	loadCaptcha:function(id){
		$("#"+id).attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
	}
}//end captcha

var forgetpwd = {
    init:function () {
        vmplaceholder();
        this.checkemail();
        this.checkValidation();
        this.getNewPwd();
    },
	checkemail:function(){
		$("#user_email").focusout(function(){
			if($(this).val() == ''){
				$("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">不能为空</em>');
				return false;
			}else{
				var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test($(this).val())){
					var data = { email: $("#user_email").val() };
				    $.post(domain+"/api/checkEmail/userType/user",data,function(data){
					    if(data.isSuccess == 0){
						    if (data.userAct == "1") {
							    $("#forget_email_error").html('<i class="icon correct_icon"></i>');
								$("#changeCodeText").text("输入验证码");
								$("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
								$("#getCode").removeClass("hide");
								$("#forget_email_hide").val(0);
						    }else{
							    $("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">该账户还没有被激活</em>');
								$("#forget_email_hide").val(1);
							    return false;
						    }
					    }else{
						    $("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">该邮箱不存在,去 <a class="color_blue font_b" href="'+domain+'/reg">注册</a> ？</em>');
							$("#forget_email_hide").val(1);
						    return false;
					    }
				    },'json');
				}else{
					$("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">邮箱格式不正确</em>');
					return false;
				}
			}
		});
	},
	checkValidation:function () {
	    $("#register_validation").focusout(function () {
	        if ($("#register_validation").val() == '') {
	            $("#forget_captcha_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">验证码不能为空</em>');
	            return false;
	        } else {
	            if ($("#register_validation").val().length != 5) {
	                $("#forget_captcha_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">验证码长度不符合要求</em>');
	                return false;
	            } else {
	                $("#forget_captcha_error").html('<i class="icon correct_icon"></i>');
	            }
	        }
	    });
		$("#register_validation").focusin(function(){
			if($("#getCode").hasClass("hide")){
				$("#changeCodeText").text("输入验证码");
				$("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
				$("#getCode").removeClass("hide");
			}
		});
	},//end check validation
	getNewPwd:function () {
	    $('#submit_btn').click(function () {
	        if ($("#user_email").val() == '') {
			    $("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">不能为空</em>');
			    return false;
		    }else{
			    var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			    if (myreg.test($("#user_email").val())) {
			        var data = { email: $("#user_email").val() };
				    $.post(domain+"/api/checkEmail/userType/user",data,function(data){
					    if(data.isSuccess == 0){
						    if (data.userAct == "1") {
							    $("#forget_email_error").html('<i class="icon correct_icon"></i>');
						    }else{
							    $("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">该账户还没有被激活</em>');
							    return false;
						    }
					    }else{
						    $("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">该邮箱不存在,去 <a class="color_blue font_b" href="'+domain+'/reg">注册</a> ？</em>');
						    return false;
					    }
				    },'json');
			    }else{
				    $("#forget_email_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">邮箱格式不正确</em>');
				    return false;
			    }
	        }//end check email
	        if ($("#register_validation").val() == '') {
			    $("#forget_captcha_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">验证码不能为空</em>');
			    return false;
		    }else{
			    if($("#register_validation").val().length!=5){
				    $("#forget_captcha_error").html('<i class="icon uncorrect_icon mg_r_5"></i><em class="v_m font_12">验证码长度不符合要求</em>');
				    return false;
			    }else{
				    $("#forget_captcha_error").html('<i class="icon correct_icon"></i>');
			    }
		    }//end check validation
		    var username = $("#user_email").val()
		    var captcha = $("#register_validation").val();
			if($("#forget_email_hide").val()==1){
				return false;
			}
		    var data = {username:username,captcha:captcha};
		    $.post(domain+"/api/getpwd/userType/user",data,function(data){
			    switch(data.isSuccess){
				    case 1:
					    var mail_domain = username.split("@");
					    $("#getpwd_mailto").attr("href","http://mail."+mail_domain[1]);
					    openPopup("280","popup_getpwd_info");
				    break;
				    case 5:
					    $("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
				    break;
			    }
		    }, "json");
	    })
	}
}

var reg = {
	personal:function(){
		$("#register").click(function(){
			if($("#register_nickname").val() == ''){
				$("#register_nickname").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_nickname").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("昵称不能为空");
				return false;
			}else{
				if($("#register_nickname").val().length>=20 || $("#register_nickname").val().length<=1){
					$("#register_nickname").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_nickname").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("昵称长度不符合要求");
					return false;
				}else{
					$("#register_nickname").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$("#register_nickname").parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}//end check nick name
			//check email
			if($("#register_mail").val() == ''){
				$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
				return false;
			}else{
				var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test($("#register_mail").val())){
					var data = {email:$("#register_mail").val()};
					if(!$("#register_mail").parents(".register_panel").hasClass("right_panel")){//如果验证正确的邮箱则不会再次请求接口
						$.post(domain+"/api/checkEmail/userType/user",data,function(data){
							if(data.isSuccess == 1){
								$("#register_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#register_mail").parents(".register_panel").find(".yellow_popup_box").hide();
							}else{
								$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱已被注册了");
								return false;
							}
						},'json');
					}
				}else{
					$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
					return false;
				}
			}//end check email
			if($("#register_password").val() == ''){
				$("#register_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
				return false;
			}else{
				if($("#register_password").val().length>=21 || $("#register_password").val().length<=5){
					$("#register_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
					return false;
				}else{
					$("#register_password").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$("#register_password").parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}//end check password
			if($("#register_validation").val() == ''){
				$("#register_validation").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_validation").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("验证码不能为空");
				return false;
			}else{
				if($("#register_validation").val().length!=5){
					$("#register_validation").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_validation").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("验证码长度不符合要求");
					return false;
				}else{
					$("#register_validation").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$("#register_validation").parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}//end check validation
			//post datas
			if($("#registe_box .right_panel").length == 4){
				var nickname     = $("#register_nickname").val();
				var username     = $("#register_mail").val();
				var email        = $("#register_mail").val();
				var password     = $("#register_password").val();
				var gender       = $("#register_gender input:radio[name=sex]:checked").val();
				var captcha      = $("#register_validation").val();
				var fToken       = $("#fToken").val();
				var data = {datas:{nickname:nickname,username:username,email:email,password:password,gender:gender},captcha:captcha,fToken:fToken};
				$.post(domain+"/api/reg/userType/user",data,function(data){
					switch(data.isSuccess){
						case 1:
							location.href = "/reg/step2";
						break;
						case 5:
							$("#register_validation").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#register_validation").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("验证码不正确");
							$("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
						break;
					}
				},"json");
			}//end check right panel
		});
	},//end reg personal
	persns:function(){
		$("#register").click(function(){
			//check nickname
			if($("#register_nickname").val() == ''){
				$("#register_nickname").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_nickname").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("昵称不能为空");
				return false;
			}else{
				if($("#register_nickname").val().length>=20 || $("#register_nickname").val().length<=1){
					$("#register_nickname").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_nickname").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("昵称长度不符合要求");
					return false;
				}else{
					$("#register_nickname").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$("#register_nickname").parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}//end check nick name
			//check email
			if($("#register_mail").val() == ''){
				$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
				return false;
			}else{
				var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test($("#register_mail").val())){
					var data = {email:$("#register_mail").val()};
					if(!$("#register_mail").parents(".register_panel").hasClass("right_panel")){//如果验证正确的邮箱则不会再次请求接口
						$.post(domain+"/api/checkEmail/userType/user",data,function(data){
							if(data.isSuccess == 1){
								$("#register_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#register_mail").parents(".register_panel").find(".yellow_popup_box").hide();
							}else{
								$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱已被注册了");
								return false;
							}
						},'json');
					}
				}else{
					$("#register_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
					return false;
				}
			}//end check email
			if($("#register_password").val() == ''){
				$("#register_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#register_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
				return false;
			}else{
				if($("#register_password").val().length>=21 || $("#register_password").val().length<=5){
					$("#register_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$("#register_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
					return false;
				}else{
					$("#register_password").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$("#register_password").parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}//end check password			
			//post datas
			if($("#registe_box .right_panel").length == 3){
				var username     = $("#register_mail").val();
				var email        = $("#register_mail").val();
				var nickname     = $("#register_nickname").val();
				var password     = $("#register_password").val();
				var gender       = $("#register_gender input:radio[name=sex]:checked").val();
				var token        = $("#userToken").val();
				var data = {datas:{username:username,email:email,nickname:nickname,password:password,gender:gender,token:token}};
				$.post(domain+"/api/regsns/userType/user",data,function(data){
					switch(data.isSuccess){
						case 1:
							location.href = "/reg/step2";
						break;
						default:
							location.href = "/reg";
						break;
					}
				},"json");
			}//end check right panel
		});
	},//end reg sns personal
	companies:function(){
		if($("#license_name").val() == ''){
			$("#license_name").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#license_name").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业名称不能为空");
			$("#license_name").focus();
			$("#popup_form_check .error_msg").text("企业名称不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			if($("#license_name").val().length>=100 || $("#license_name").val().length<=1){
				$("#license_name").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#license_name").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业名称长度不符合要求");
				$("#license_name").focus();
				$("#popup_form_check .error_msg").text("企业名称长度不符合要求");
				openPopup("280","popup_form_check");
				return false;
			}else{
				$("#license_name").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$("#license_name").parents(".register_panel").find(".yellow_popup_box").hide();
			}
		}//end check license
		if($("#publicity_name").val() == ''){
			$("#publicity_name").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#publicity_name").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("宣传名不能为空");
			$("#publicity_name").focus();
			$("#popup_form_check .error_msg").text("宣传名不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			if($("#publicity_name").val().length>=100 || $("#publicity_name").val().length<=1){
				$("#publicity_name").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#publicity_name").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("宣传名长度不符合要求");
				$("#publicity_name").focus();
				$("#popup_form_check .error_msg").text("宣传名长度不符合要求");
				openPopup("280","popup_form_check");
				return false;
			}else{
				$("#publicity_name").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$("#publicity_name").parents(".register_panel").find(".yellow_popup_box").hide();
			}
		}//end check publicity
		if($("#province").val() == 0){
			$("#province").parents(".register_select").removeClass("right_panel").addClass("error_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择所在地域");
			$("#popup_form_check .error_msg").text("请选择所在地域");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#province").parents(".register_select").removeClass("error_panel").addClass("right_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").hide();
		}//end check province
		if($("#company_location").val() == ''){
			$("#company_location").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#company_location").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("街道地址不能为空");
			$("#company_location").focus();
			$("#popup_form_check .error_msg").text("街道地址不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			if($("#company_location").val().length>=200 || $("#company_location").val().length<=1){
				$("#company_location").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#company_location").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("街道地址长度不符合要求");
				$("#company_location").focus();
				$("#popup_form_check .error_msg").text("街道地址长度不符合要求");
				openPopup("280","popup_form_check");
				return false;
			}else{
				$("#company_location").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$("#company_location").parents(".register_panel").find(".yellow_popup_box").hide();
			}
		}//end check company location
		if($("#companyPhone").val() == ''){
			$("#companyPhone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#companyPhone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("总机电话不能为空");
			$("#companyPhone").focus();
			$("#popup_form_check .error_msg").text("总机电话不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#companyPhone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#companyPhone").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check companyPhone
		if($("#establishTime").val() == ''){
			$("#establishTime").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#establishTime").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("成立年份不能为空");
			$("#establishTime").focus();
			$("#popup_form_check .error_msg").text("成立年份不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#establishTime").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#establishTime").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check establishTime
		if($("#companyScale").val() == 0){
			$("#companyScale").parents(".register_select").removeClass("right_panel").addClass("error_panel");
			$("#companyScale").parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择企业规模");
			$("#popup_form_check .error_msg").text("请选择企业规模");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#companyScale").parents(".register_select").removeClass("error_panel").addClass("right_panel");
			$("#companyScale").parents(".register_select").find(".yellow_popup_box").hide();
		}//end check companyScale
		if($("#companyNature").val() == 0){
			$("#companyNature").parents(".register_select").removeClass("right_panel").addClass("error_panel");
			$("#companyNature").parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择企业性质");
			$("#popup_form_check .error_msg").text("请选择企业性质");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#companyNature").parents(".register_select").removeClass("error_panel").addClass("right_panel");
			$("#companyNature").parents(".register_select").find(".yellow_popup_box").hide();
		}//end check companyNature
		if($("#com_logo").attr("src") == 'http://file.digitaling.com/images/avatar/brand_l_320x320.jpg'){
			$("#com_logo").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#com_logo").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请上传企业LOGO");
			$("#popup_form_check .error_msg").text("请上传企业LOGO");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#com_logo").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#com_logo").parents(".register_panel").find(".yellow_popup_box").hide();
		}//com_logo
		if($("#companyIntro").val() == ''){
			$("#companyIntro").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#companyIntro").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业介绍不能为空");
			$("#companyIntro").focus();
			$("#popup_form_check .error_msg").text("企业介绍不能为空");
			openPopup("280","popup_form_check");
		}else{
			if($("#companyIntro").val().length>=600 || $("#companyIntro").val().length<=20){
				$("#companyIntro").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#companyIntro").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业介绍长度不符合要求");
				$("#companyIntro").focus();
				$("#popup_form_check .error_msg").text("企业介绍长度不符合要求");
				openPopup("280","popup_form_check");
			}else{
				$("#companyIntro").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$("#companyIntro").parents(".register_panel").find(".yellow_popup_box").hide();
			}
		}
		if($("#contact_person").val() == ''){
			$("#contact_person").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#contact_person").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系人不能为空");
			$("#contact_person").focus();
			$("#popup_form_check .error_msg").text("联系人不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			if($("#contact_person").val().length>=20 || $("#contact_person").val().length<=1){
				$("#contact_person").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#contact_person").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系人长度不符合要求");
				$("#contact_person").focus();
				$("#popup_form_check .error_msg").text("联系人长度不符合要求");
				openPopup("280","popup_form_check");
				return false;
			}else{
				$("#contact_person").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$("#contact_person").parents(".register_panel").find(".yellow_popup_box").hide();
			}
		}//end check publicity
		if($("#contact_title").val() == ''){
			$("#contact_title").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#contact_title").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系人职称不能为空");
			$("#contact_title").focus();
			$("#popup_form_check .error_msg").text("联系人职称不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#contact_title").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#contact_title").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check contact title
		if($("#contact_phone").val() == '电话'){
			$("#contact_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#contact_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("联系电话不能为空");
			$("#contact_phone").focus();
			$("#popup_form_check .error_msg").text("联系电话不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			$("#contact_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#contact_phone").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check contact phone
		if($("#contact_mail").val() == ''){
			$("#contact_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#contact_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
			$("#contact_mail").focus();
			$("#popup_form_check .error_msg").text("邮箱不能为空");
			openPopup("280","popup_form_check");
			return false;
		}else{
			var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(myreg.test($("#contact_mail").val())){
				$("#contact_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
				$("#contact_mail").parents(".register_panel").find(".yellow_popup_box").hide();
			}else{
				$("#contact_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$("#contact_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
				$("#contact_mail").focus();
				$("#popup_form_check .error_msg").text("邮箱格式不正确");
				openPopup("280","popup_form_check");
				return false;
			}
		}//end check contact mail
		if ($("#registe_box .right_panel").length == 14) {
			var companyName       = $("#license_name").val();
			var promoteName       = checktag($("#publicity_name").val());
			var firstLetter       = $("#firstLetter").val();
			var provinceCode      = $("#province").val();
			var provinceName      = $("#province").find("option:selected").text();
			var cityCode          = $("#city").val();
			var cityName          = $("#city").find("option:selected").text();
			var location          = $("#company_location").val();
			var companyPhone      = $("#companyPhone").val();
			var establishTime     = $("#establishTime").val();
			var companyScale      = $("#companyScale").val();
			var companyNature     = $("#companyNature").val();
			var companyLogo       = $("#com_logo").attr("src");
			var companyIntro      = replace_br($("#companyIntro").val());
			var linkUrl_website   = $("#linkUrl_website").val();
			var linkUrl_blog      = $("#linkUrl_blog").val();
			var linkUrl_weibo     = $("#linkUrl_weibo").val();
			var contacter         = $("#contact_person").val();
			var contacterTitle    = $("#contact_title").val();
			var contactPhone      = $("#contact_phone").val();
			var contactEmail      = $("#contact_mail").val();
			var data = {datas:{companyName:companyName,promoteName:promoteName,firstLetter:firstLetter,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,location:location,companyPhone:companyPhone,establishTime:establishTime,companyScale:companyScale,companyNature:companyNature,companyLogo:companyLogo,companyIntro:companyIntro,contacter:contacter,contacterTitle:contacterTitle,contactPhone:contactPhone,contactEmail:contactEmail},linkUrl:{website:linkUrl_website,blog:linkUrl_blog,weibo:linkUrl_weibo}};
			$.post(domain+"/datas/comApply",data,function(data){
				switch(data.isSuccess){
					case 1:
						window.location.href = domain+"/apply/active";
					break;
				}
			},"json");
		}//end check right panel
	},//end company apply
	tempCompany:function(type,interface){
		var interface         = interface?interface:"datas";
		var companyName       = $("#apply_company_name").val();
		var companyinderstry  = $("#apply_inderstry").val();
		var companyWebsite    = $("#apply_company_website").val();
		if(companyName==''){
			$("#apply_company_name").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#apply_company_name").animate({
				backgroundColor:"#ffffff"
			}, 100);
			$("#apply_company_name").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#apply_company_name").animate({
				backgroundColor:"#ffffff"
			}, 100);
			return false;
		}
		if(companyinderstry==0){
			$("#apply_inderstry").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#apply_inderstry").animate({
				backgroundColor:"#ffffff"
			}, 100);
			$("#apply_inderstry").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#apply_inderstry").animate({
				backgroundColor:"#ffffff"
			}, 100);
			return false;
		}
		var data = {datas:{companyName:companyName,industry:companyinderstry,website:companyWebsite}};
		$.post(domain+"/"+interface+"/addTempCompany",data,function(data){
			switch(data.isSuccess){
				case 1:
					if(type=='add_company'||type=='add_brand'){
						company.chooseCompany('',companyName,type,companyinderstry);
					}else{
						profile.chooseCompany('',companyName,'','','','','','');
					}
					$.closePopupLayer('popup_add_brand');
					openCloseTips('success_icon', '添加成功', 'color_green', '280');
				break;
				case 0:
					$.closePopupLayer('popup_add_brand');
					openCloseTips('uncurrent_b_icon', '添加失败', 'color_red', '280');
				break;
			}
		},"json");
	},//end add temp company
	comUpdate:function(){
		$("#updateCompany").click(function(){
		    if ($("#tags").val() == '') {
		        $("#tags_error").removeClass("hide").find("em").text("企业搜索关键字不能为空");
				$("#tags_correct").addClass("hide");
				$("#tags").focus();
				return false;
			}else{
				//alert($("#tags").val());
				$("#tags_error").addClass("hide");
				$("#tags_correct").removeClass("hide");
			}// tags
			if($("#companyIntro").val() == ''){
			    $("#companyIntro_error").removeClass("hide").find("em").text("企业介绍不能为空");
				$("#companyIntro_correct").addClass("hide");
				$("#companyIntro").focus();
				return false;
			} else if ($("#companyIntro").hasClass('error_ele')) {
			    $("#companyIntro_error").removeClass("hide").find("em").text("输入企业介绍超出限制");
			    $("#companyIntro_correct").addClass("hide");
			    $("#companyIntro").focus();
			    return false;
			} else {
				$("#companyIntro_error").addClass("hide");
				$("#companyIntro_correct").removeClass("hide");
			}// companyIntro
			
			if($("#company_password").val() == ''){
				$("#company_password_correct").addClass("hide");
				$("#company_password_error").removeClass("hide").find("em").text("密码不能为空");
				$("#company_password").focus();
				return false;
			}else{
				if($("#company_password").val().length>=21 || $("#company_password").val().length<=5){
					$("#company_password_correct").addClass("hide");
					$("#company_password_error").removeClass("hide").find("em").text("长度不符合要求6-20位");
					$("#company_password").focus();
					return false;
				}else{
					$("#company_password_error").addClass("hide");
					$("#company_password_correct").removeClass("hide");
				}
			}//password
			if($("#confirm_password").val() == ''){
				$("#confirm_password_correct").addClass("hide");
				$("#confirm_password_error").removeClass("hide").find("em").text("确认密码不能为空");
				$("#confirm_password").focus();
				return false;
			}else{
				if($("#confirm_password").val().length>=21 || $("#confirm_password").val().length<=5){
					$("#confirm_password_correct").addClass("hide");
					$("#confirm_password_error").removeClass("hide").find("em").text("长度不符合要求6-20位");
					$("#confirm_password").focus();
					return false;
				}else{
					if($("#confirm_password").val() == $("#company_password").val()){
						$("#confirm_password_error").addClass("hide");
						$("#confirm_password_correct").removeClass("hide");
					}else{
						$("#confirm_password_correct").addClass("hide");
						$("#confirm_password_error").removeClass("hide").find("em").text("两次密码不相同");
						$("#confirm_password").focus();
						return false;
					}
				}
			}// confirm password
			
			if($("#contacterMobile").val() == '手机'){
			    $("#contacterMobile_error").addClass("hide");
			}else{
				if($("#contacterMobile").val().length>=14 || $("#contacterMobile").val().length<=10){
					$("#contacterMobile_correct").addClass("hide");
					$("#contacterMobile_error").removeClass("hide").find("em").text("手机号码长度不正确");
					$("#contacterMobile").focus();
					return false;
				}else{
					$("#contacterMobile_error").addClass("hide");
					$("#contacterMobile_correct").removeClass("hide");
				}
			}// contacterMobile
			if ($("#company_location").val() == '') {
			    $("#location_error").removeClass("hide").find("em").text("通讯地址地址不能为空");
				$("#location_correct").addClass("hide");
				$("#location").focus();
				return false;
			}else{
				$("#location_error").addClass("hide");
				$("#location_correct").removeClass("hide");
			}// location
			if($("#companyPhone").val() == '总机'){
				$("#companyPhone_error").removeClass("hide").find("em").text("总机号码不能为空");
				$("#companyPhone_correct").addClass("hide");
				$("#companyPhone").focus();
				return false;
			}else{
				$("#companyPhone_error").addClass("hide");
				$("#companyPhone_correct").removeClass("hide");
			}// companyPhone
			if($("#companyNature").val() == '0'){
				$("#companyNature_error").removeClass("hide").find("em").text("企业性质不能为空");
				$("#companyNature_correct").addClass("hide");
				return false;
			}else{
				$("#companyNature_error").addClass("hide");
				$("#companyNature_correct").removeClass("hide");
			}// companyNature
			if($("#licensePic").attr("src") == 'http://file.digitaling.com/images/common/license_320x200.jpg'){
				$("#licensePic_error").removeClass("hide").find("em").text("请上传营业执照");
				$("#licensePic_correct").addClass("hide");
				return false;
			}else{
				$("#licensePic_error").addClass("hide");
				$("#licensePic_correct").removeClass("hide");
			}// licensePic
			if($("#businessLicense").val() == '营业执照号码'){
				$("#businessLicense_error").removeClass("hide").find("em").text("营业执照号码不能为空");
				$("#businessLicense_correct").addClass("hide");
				$("#businessLicense").focus();
				return false;
			}else{
				$("#businessLicense_error").addClass("hide");
				$("#businessLicense_correct").removeClass("hide");
			}// businessLicense
			if($("#establishTime").val() == '0'){
				$("#establishTime_error").removeClass("hide").find("em").text("成立年份不能为空");
				$("#establishTime_correct").addClass("hide");
				return false;
			}else{
				$("#establishTime_error").addClass("hide");
				$("#establishTime_correct").removeClass("hide");
			}// establishTime
			if($("#companyScale").val() == '0'){
				$("#companyScale_error").removeClass("hide").find("em").text("请选择企业规模");
				$("#companyScale_correct").addClass("hide");
				return false;
			}else{
				$("#companyScale_error").addClass("hide");
				$("#companyScale_correct").removeClass("hide");
			}// companyScale
			if($("#industry").val() == '0'){
				$("#industry_error").removeClass("hide").find("em").text("请选择企业所属行业");
				$("#industry_correct").addClass("hide");
				return false;
			}else{
				$("#industry_error").addClass("hide");
				$("#industry_correct").removeClass("hide");
			}// industry
			if($("#register_validation").val() == ''){
				$("#register_validation_error").removeClass("hide").find("em").text("验证码不能为空");
				$("#register_validation_correct").addClass("hide");
				return false;
			}else{
				if($("#register_validation").val().length!=5){
					$("#register_validation_error").removeClass("hide").find("em").text("验证码长度不正确");
					$("#register_validation_correct").addClass("hide");
				}else{
					$("#register_validation_error").addClass("hide");
					$("#register_validation_correct").removeClass("hide");
				}
			}// register_validation
			
			//get datas
			var tags               = $("#tags").val();
			var companyIntro       = replace_br($("#companyIntro").val());
			var company_password   = $("#company_password").val();
			var contacterMobile    = $("#contacterMobile").val();
			var contactQQ          = $("#contactQQ").val();
			var postCode           = $("#postCode").val();
			var companyPhone       = $("#companyPhone").val();
			var companyFax         = $("#companyFax").val();
			var companyNature      = $("#companyNature").val();
			var licensePic         = $("#licensePic").attr("src");
			var businessLicense    = $("#businessLicense").val();
			var establishTime      = $("#establishTime").val();
			var companyScale       = $("#companyScale").val();
			var industry           = $("#industry").val();
			var companyType        = $.getBoxRadioValue('company_type');
			var captcha            = $("#register_validation").val();
			var comId              = $("#comId").val();
			var token              = $("#register_token").val();
			var data = {datas:{tags:tags,companyIntro:companyIntro,password:company_password,contacterMobile:contacterMobile,contactQQ:contactQQ,postCode:postCode,companyPhone:companyPhone,companyFax:companyFax,companyNature:companyNature,licensePic:licensePic,businessLicense:businessLicense,establishTime:establishTime,companyScale:companyScale,industry:industry,companyType:companyType},captcha:captcha,where:{companyId:comId,token:token}};
			$.post(domain+"/api/createCompany",data,function(data){
				switch(data.isSuccess){
					case 1:
						location.href = domain+"/login/";
					break;
					case 5:
						$("#register_validation_correct").addClass("hide");
						$("#register_validation_error").removeClass("hide").find("em").text("验证码输入不正确");
						$("#captcha").attr("src",domain+"/api/captcha/"+Math.round(Math.random()*888));
					break;
				}
			},"json");
		});
	
	},
	addCompany:function(){
		$("#addCompany").click(function(){
			var companyName        = $("#companyName").val();
			var companyLevel       = $("#companyLevel").val();
			var companyLevelName   = $("#companyLevel").find("option:selected").text();
			var firstLetter        = $("#firstLetter").val();
			var ifBrand            = $("#ifBrand").val();
			var promoteName        = checktag($("#promoteName").val());
			var linkUrl_website    = $("#linkUrl_website").val();
			var linkUrl_blog       = $("#linkUrl_blog").val();
			var linkUrl_weibo      = $("#linkUrl_weibo").val();
			var companyIntro       = replace_br($("#companyIntro").val());
			//企业帐号信息
			var username           = $("#company_username").val();
			var password           = $("#company_password").val();
			//联系人信息
			var contacter          = $("#contacter").val();
			var contacterTitle     = $("#contacterTitle").val();
			var contacterMobile    = $("#contacterMobile").val();
			if(contacterMobile=="手机"){ contacterMobile=="";}
			var phoneCode          = $("#phoneCode").val();
			if(phoneCode=="区号"){ phoneCode=="";}
			var contactPhone       = $("#contactPhone").val();
			var phoneCord          = $("#phoneCord").val();
			var contactEmail       = $("#contactEmail").val();
			var contactQQ          = $("#contactQQ").val();
			if(contactQQ=="QQ号码"){ contacterMobile=="";}
			//企业联系信息
			var provinceCode       = $("#province").val();
			var provinceName       = $("#province").find("option:selected").text();
			var cityCode           = $("#city").val();
			var cityName           = $("#city").find("option:selected").text();
			var locations          = $("#locationAddress").val();
			var postCode           = $("#postCode").val();
			var companyPhone       = $("#companyPhone").val();
			var companyFax         = $("#companyFax").val();
			//企业基本信息
			var fullname           = $("#fullname").val();
			var companyNature      = $("#companyNature").val();
			var companyNatureName  = $("#companyNature").find("option:selected").text();
			var licensePic         = $("#licensePic").attr("src");
			var businessLicense    = $("#businessLicense").val();
			var establishTime      = $("#establishTime").val();
			var companyScale       = $("#companyScale").val();
			var companyScaleName   = $("#companyScale").find("option:selected").text();
			var underGroup         = $("#underGroup").val();
			var brands             = checktag($("#brands").val());
			var industry           = $("#industry").val();
			var industryName       = $("#industry").find("option:selected").text();
				
			var data = {datas:{companyName:companyName,companyLevel:companyLevel,companyLevelName:companyLevelName,firstLetter:firstLetter,ifBrand:ifBrand,promoteName:promoteName,username:username,password:password,companyIntro:companyIntro,contacter:contacter,contacterTitle:contacterTitle,contacterMobile:contacterMobile,phoneCode:phoneCode,contactPhone:contactPhone,phoneCord:phoneCord,contactEmail:contactEmail,contactQQ:contactQQ,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,locations:locations,postCode:postCode,companyPhone:companyPhone,companyFax:companyFax,fullname:fullname,companyNature:companyNature,companyNatureName:companyNatureName,licensePic:licensePic,businessLicense:businessLicense,establishTime:establishTime,companyScale:companyScale,companyScaleName:companyScaleName,underGroup:underGroup,brands:brands,industry:industry,industryName:industryName},linkUrl:{website:linkUrl_website,blog:linkUrl_blog,weibo:linkUrl_weibo}};
			$.post(domain+"/datas/addCompany",data,function(data){
				switch(data.isSuccess){
				    case 1:
						//openCloseTips('success_icon', '企业创建成功', 'color_green', '280');
						alert("企业创建成功");
						location.reload();
					break;
					case 0:
						alert("企业创建失败");
					    //openCloseTips('uncurrent_b_icon', '企业创建失败', 'color_red', '280');
					break;
				}
			},"json");
		});
	},
	addUserExper: function () {
		if($("#province").val() == 0){
			$("#province").parents(".register_select").removeClass("right_panel").addClass("error_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择所在地域");
			return false;
		}else{
			$("#province").parents(".register_select").removeClass("error_panel").addClass("right_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").hide();
		}//end check location
		if($("#funcs").val() == 0){
			$("#funcs").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#funcs").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请选择工作所属职能");
			return false;
		}else{
			$("#funcs").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#funcs").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check functions
		if($("#add_exper_title").val() == 0){
			$("#add_exper_title").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#add_exper_title").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("担任职位不能为空");
			return false;
		}else{
			$("#add_exper_title").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#add_exper_title").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check title
		if($("#add_exper_company").val() == 0){
			$("#add_exper_company").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#add_exper_company").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("企业名称不能为空");
			return false;
		}else{
			$("#add_exper_company").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#add_exper_company").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check company
	    var _startWorkTimeYear = parseInt($("#add_exper_start_year").val());
	    var _startWorkTimeMonth = parseInt($("#add_exper_start_month").val());
	    var _endWorkTimeYear = parseInt($("#add_exper_end_year").val());
	    var _endWorkTimeMonth = parseInt($("#add_exper_end_month").val());
	    var _untilNow = $("#add_exper_end_now").attr("checked") ? 1 : 0;
	    if (_startWorkTimeYear > _endWorkTimeYear && _untilNow==0) {
			$("#add_exper_start_year").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#add_exper_start_year").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("在职时间年份大于结束年份");
	        return false;
	    } else if (_startWorkTimeYear == _endWorkTimeYear && _startWorkTimeMonth > _endWorkTimeMonth && _untilNow == 0) {
			$("#add_exper_start_year").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#add_exper_start_year").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("在职时间月份大于结束月份");
			return false;
	    }
		//user data
		var funcId              = $("#funcs").val();
		var funcName            = $("#funcs").find("option:selected").text();
		var uprovinceCode       = $("#province").val();
		var uprovinceName       = $("#province").find("option:selected").text();
		var ucityCode           = $("#city").val();
		var ucityName           = $("#city").find("option:selected").text();
		//experience data
		var companyId           = $("#add_exper_company_id").val();
		var companyName         = $("#add_exper_company").val();
		var provinceCode        = $("#add_exper_company_province").val();
		var provinceName        = $("#add_exper_company_province_name").val();
		var cityCode            = $("#add_exper_company_city").val();
		var cityName            = $("#add_exper_company_city_name").val();
		var companyLogo         = $("#exper_company_logo").val();
		var title               = $("#add_exper_title").val();
		var clients             = "";
		var startWorkTimeYear   = $("#add_exper_start_year").val();
		var startWorkTimeMonth  = $("#add_exper_start_month").val();
		var endWorkTimeYear     = $("#add_exper_end_year").val();
		var endWorkTimeMonth    = $("#add_exper_end_month").val();
		var untilNow            = $("#add_exper_end_now").attr("checked")?1:0;
		var data                = {datas:{companyId:companyId,companyName:companyName,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,companyLogo:companyLogo,title:title,clients:clients,startWorkTimeYear:startWorkTimeYear,startWorkTimeMonth:startWorkTimeMonth,endWorkTimeYear:endWorkTimeYear,endWorkTimeMonth:endWorkTimeMonth,untilNow:untilNow},users:{funcId:funcId,funcName:funcName,provinceCode:uprovinceCode,provinceName:uprovinceName,cityCode:ucityCode,cityName:ucityName}};
		$.post(domain+"/datas/regUserExper",data,function(data){
			switch(data.isSuccess){
				case 0:
					openCloseTips('uncurrent_b_icon', '数英职业档案创建失败！', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '数英职业档案创建成功！', 'color_green', '280');
					location.href=domain+"/reg/step3";
				break;
			}
		},"json");
	},
	updateUser: function () {
		if($("#province").val() == 0){
			$("#province").parents(".register_select").removeClass("right_panel").addClass("error_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择所在地域");
			return false;
		}else{
			$("#province").parents(".register_select").removeClass("error_panel").addClass("right_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").hide();
		}//end check location
		if($("#funcs").val() == 0){
			$("#funcs").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#funcs").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请选择工作所属职能");
			return false;
		}else{
			$("#funcs").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#funcs").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check functions
		//user data
		var funcId              = $("#funcs").val();
		var funcName            = $("#funcs").find("option:selected").text();
		var uprovinceCode       = $("#province").val();
		var uprovinceName       = $("#province").find("option:selected").text();
		var ucityCode           = $("#city").val();
		var ucityName           = $("#city").find("option:selected").text();
		var data                = {datas:{funcId:funcId,funcName:funcName,provinceCode:uprovinceCode,provinceName:uprovinceName,cityCode:ucityCode,cityName:ucityName}};
		$.post(domain+"/datas/regUpdateUser",data,function(data){
			switch(data.isSuccess){
				case 0:
					openCloseTips('uncurrent_b_icon', '数英职业档案创建失败！', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '数英职业档案创建成功！', 'color_green', '280');
					location.href=domain+"/reg/step3";
				break;
			}
		},"json");
	},
	regUserEdu: function () {
		if($("#province").val() == 0){
			$("#province").parents(".register_select").removeClass("right_panel").addClass("error_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").show().find(".red_text").text("请选择所在地域");
			return false;
		}else{
			$("#province").parents(".register_select").removeClass("error_panel").addClass("right_panel");
			$("#province").parents(".register_select").find(".yellow_popup_box").hide();
		}//end check location
		if($("#funcs").val() == 0){
			$("#funcs").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#funcs").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("请选择工作所属职能");
			return false;
		}else{
			$("#funcs").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
			$("#funcs").parents(".register_panel").find(".yellow_popup_box").hide();
		}//end check functions
		if ($("#add_school_name_college").val() == '') {
			openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
			return false;
		}
		//user data
		var funcId              = $("#funcs").val();
		var funcName            = $("#funcs").find("option:selected").text();
		var uprovinceCode       = $("#province").val();
		var uprovinceName       = $("#province").find("option:selected").text();
		var ucityCode           = $("#city").val();
		var ucityName           = $("#city").find("option:selected").text();
		//education data
	    var type                = 1;
		var schoolType          = $("#add_school_type_college input:radio[name=c_edu]:checked").val();
		var schoolId            = $("#add_school_id_college").val();
		var schoolName          = $("#add_school_name_college").val();
		var startStudy          = $("#add_school_time_college").val();
		var department          = $("#add_school_name_department").val();
		var data                = {datas:{type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department},users:{funcId:funcId,funcName:funcName,provinceCode:uprovinceCode,provinceName:uprovinceName,cityCode:ucityCode,cityName:ucityName}};
		$.post(domain+"/datas/regUserEdu",data,function(data){
			switch(data.isSuccess){
				case 0:
					openCloseTips('uncurrent_b_icon', '数英职业档案创建失败！', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '数英职业档案创建成功！', 'color_green', '280');
					location.href=domain+"/reg/step4";
				break;
			}
		},"json");
	},
	addUserEdu:function(type){
	    if (type == "college") {
	        if ($("#add_school_name_college").val() == '') {
	            openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
	            return false;
	        }
			var type       = 1;
			var schoolType = $("#add_school_type_college input:radio[name=c_edu]:checked").val();
			var schoolId   = $("#add_school_id_college").val();
			var schoolName = $("#add_school_name_college").val();
			var startStudy = $("#add_school_time_college").val();
			var department = $("#add_school_name_department").val();
			var data       = {datas:{type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department}};
	    } else {
	        if ($("#add_highschool_name").val() == '') {
	            openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
	            return false;
	        }
			var type       = 2;
			var schoolType = $("#add_highschool_type input:radio[name=h_edu]:checked").val();
			var schoolId   = $("#add_highschool_id").val();
			var schoolName = $("#add_highschool_name").val();
			var startStudy = $("#add_highschool_time").val();
			var department = '';
			var data       = {datas:{type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department}};
		}
		$.post(domain+"/datas/addUserEdu/",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '教育信息添加失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '教育信息添加成功', 'color_green', '280');
					location.href=domain+"/reg/step4";
				break;
				case 2:
					location.href=domain+"/reg/step4";
				break;
			}
		},"json");
	}
}//end reg
//个人登录
function personLogin(index) {
    if ($("#login_mail").val() == '') {
        $("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
        return false;
    } else {
        var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (myreg.test($("#login_mail").val())) {
            var data = { email: $("#login_mail").val() };
            if (!$("#login_mail").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
                $.post(domain + "/api/checkEmail/userType/user", data, function (data) {
                    if (data.isSuccess == 0) {
						$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
                       	$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
						if (data.userBlock == "0") {
							$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
                       		$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
						}else{
							$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该账户已被冻结了");
						}
                    } else {
                        $("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                        $("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该邮箱不存在");
                        return false;
                    }
                }, 'json');
            }
        } else {
            $("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
            return false;
        }
    }//end check email
    if ($("#login_password").val() == '') {
        $("#login_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
        return false;
    } else {
        if ($("#login_password").val().length >= 21 || $("#login_password").val().length <= 5) {
            $("#login_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求（6-16个字符）");
            return false;
        } else {
            $("#login_password").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
            $("#login_password").parents(".register_panel").find(".yellow_popup_box").hide();
        }
    }//end check password

    if ($("#personal_login .right_panel").length == 2) {
        //change login btn
        $("#user_login").find(".login_btn").removeClass("login_btn").text("登录...").addClass("login_grey_btn");
        var username = $("#login_mail").val();
        var password = $("#login_password").val();
        if ($("#user_remmber").attr("checked") == 'checked') {
            var remember = "true";
        } else {
            var remember = "false";
        }
        var redirectUrl = $('#redirectUrl').val();
        var data = { datas: { username: username, password: password }, userType: "user", remmber: remember, redirectUrl: redirectUrl };
        $.post(domain + "/api/login", data, function (data) {
            switch (data.isSuccess) {
                case 0:
                    $("#login_password").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_password").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码错误，请重新输入");
                    $("#user_login").find(".login_grey_btn").removeClass("login_grey_btn").text("登录").addClass("login_btn");
                    break;
                case 1:
                    if (index == 0) {
                        if (data.go == '') {
                            location.href = domain;
                        } else {
                            location.href = data.go;
                        }
                    } else if (index == 1) {
                        location.reload();
                    }
                    break;
            }
        }, "json");
    }//end right panel
};
//企业登录
function companyLogin(index) {
    if ($("#login_username").val() == '') {
        $("#login_username").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_username").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("用户名不能为空");
        return false;
    } else {
        var data = { username: $("#login_username").val() };
        if (!$("#login_username").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
            $.post(domain + "/api/checkUsername", data, function (data) {
                if (data.isSuccess == 1) {
                    $("#login_username").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
                    $("#login_username").parents(".register_panel").find(".yellow_popup_box").hide();
                } else {
                    $("#login_username").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_username").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该用户名不存在");
                    return false;
                }
            }, 'json');
        }
    }
    if ($("#login_c_pass").val() == '') {
        $("#login_c_pass").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_c_pass").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
        return false;
    } else {
        if ($("#login_c_pass").val().length >= 21 || $("#login_c_pass").val().length <= 5) {
            $("#login_c_pass").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_c_pass").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
            return false;
        } else {
            $("#login_c_pass").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
            $("#login_c_pass").parents(".register_panel").find(".yellow_popup_box").hide();
        }
    }
    if ($("#company_login .right_panel").length == 2) {
        $("#com_login").find(".login_btn").removeClass("login_btn").text("登录...").addClass("login_grey_btn");
        var username = $("#login_username").val();
        var password = $("#login_c_pass").val();
        if ($("#com_remmber").attr("checked") == 'checked') {
            var remember = "true";
        } else {
            var remember = "false";
        }
        var redirectUrl = $('#redirectUrl').val();
        var data = { datas: { username: username, password: password }, userType: "company", remmber: remember, redirectUrl: redirectUrl };
        $.post(domain + "/api/login", data, function (data) {
            switch (data.isSuccess) {
                case 0:
                    $("#login_c_pass").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_c_pass").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码错误，请重新输入");
                    $("#com_login").find(".login_grey_btn").removeClass("login_grey_btn").text("登录").addClass("login_btn");
                    break;
                case 1:
                    if (index == 0) {
                        if (data.go == '') {
                            location.href = domain;
                        } else {
                            location.href = data.go;
                        }
                    } else if (index == 1) {
                        location.reload();
                    }
                    //$("#user_login").find(".login_grey_btn").removeClass("login_grey_btn").text("登录").addClass("login_btn");
                    break;
            }
        }, "json");
    }//end right panel
};
//个人用户专用
function userLogin(index) {
    if ($("#login_mail_user").val() == '') {
        $("#login_mail_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_mail_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
        return false;
    } else {
        var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (myreg.test($("#login_mail_user").val())) {
            var data = { email: $("#login_mail_user").val() };
            if (!$("#login_mail_user").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
                $.post(domain + "/api/checkEmail/userType/user", data, function (data) {
                    if (data.isSuccess == 0) {
						$("#login_mail_user").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
                        $("#login_mail_user").parents(".register_panel").find(".yellow_popup_box").hide();
                        if (data.userBlock == "0") {
							$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
                       		$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
						}else{
							$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该账户已被冻结了");
						}
                    } else {
                        $("#login_mail_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                        $("#login_mail_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该邮箱不存在");
                        return false;
                    }
                }, 'json');
            }
        } else {
            $("#login_mail_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_mail_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
            return false;
        }
    }//end check email
    if ($("#login_password_user").val() == '') {
        $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
        return false;
    } else {
        if ($("#login_password_user").val().length >= 21 || $("#login_password_user").val().length <= 5) {
            $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求（6-16个字符）");
            return false;
        } else {
            $("#login_password_user").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
            $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").hide();
        }
    }//end check password

    if ($("#personal_login_user .right_panel").length == 2) {
        //change login btn
        $("#user_login_user").find(".login_btn").removeClass("login_btn").text("登录...").addClass("login_grey_btn");
        var username = $("#login_mail_user").val();
        var password = $("#login_password_user").val();
        if ($("#user_remmber_user").attr("checked") == 'checked') {
            var remember = "true";
        } else {
            var remember = "false";
        }
        var data = { datas: { username: username, password: password }, userType: "user", remmber: remember };
        $.post(domain + "/api/login", data, function (data) {
            switch (data.isSuccess) {
                case 0:
                    $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码错误，请重新输入");
                    $("#user_login_user").find(".login_grey_btn").removeClass("login_grey_btn").text("登录").addClass("login_btn");
                    break;
                case 1:
                    if (index == 0) {
                        location.href = domain;
                    } else if (index == 1) {
                        location.reload();
                    }
                    //$("#user_login").find(".login_grey_btn").removeClass("login_grey_btn").text("登录").addClass("login_btn");
                    break;
            }
        }, "json");
    }//end right panel
};
//企业用户专用
function comLogin(index) {
    if ($("#login_username_com").val() == '') {
        $("#login_username_com").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_username_com").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("用户名不能为空");
        return false;
    } else {
        var data = { username: $("#login_username_com").val() };
        if (!$("#login_username_com").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
            $.post(domain + "/api/checkUsername", data, function (data) {
                if (data.isSuccess == 1) {
                    $("#login_username_com").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
                    $("#login_username_com").parents(".register_panel").find(".yellow_popup_box").hide();
                } else {
                    $("#login_username_com").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_username_com").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该用户名不存在");
                    return false;
                }
            }, 'json');
        }
    }
    if ($("#login_c_pass_com").val() == '') {
        $("#login_c_pass_com").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_c_pass_com").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
        return false;
    } else {
        if ($("#login_c_pass_com").val().length >= 21 || $("#login_c_pass_com").val().length <= 5) {
            $("#login_c_pass_com").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_c_pass_com").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
            return false;
        } else {
            $("#login_c_pass_com").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
            $("#login_c_pass_com").parents(".register_panel").find(".yellow_popup_box").hide();
        }
    }
    if ($("#company_login_com .right_panel").length == 2) {
        $("#com_login_com").find(".login_btn").removeClass("login_btn").text("登录...").addClass("login_grey_btn");
        var username = $("#login_username_com").val();
        var password = $("#login_c_pass_com").val();
        if ($("#com_remmber_com").attr("checked") == 'checked') {
            var remember = "true";
        } else {
            var remember = "false";
        }
        var data = { datas: { username: username, password: password }, userType: "company", remmber: remember };
        $.post(domain + "/api/login", data, function (data) {
            switch (data.isSuccess) {
                case 0:
                    $("#login_c_pass_com").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_c_pass_com").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码错误，请重新输入");
                    $("#com_login_com").find(".login_grey_btn").removeClass("login_grey_btn").text("登录").addClass("login_btn");
                    break;
                case 1:
                    if (index == 0) {
                        location.href = domain;
                    } else if (index == 1) {
                        location.reload();
                    }
                    break;
            }
        }, "json");
    }//end right panel
};
//登录
var sign = {
    init: function () {
        this.personal();
        this.company();
        //enter login
        //选中激活enter
        $('#personal_login input').keydown(function (e) {
            if (e.which == 13) {
                personLogin(0);
            }
        });
        $('#company_login input').keydown(function (e) {
            if (e.which == 13) {
                companyLogin(0);
            }
        });
    },
    popupLogin: function () {
        this.popupPersonal();
        this.popupCompany();
        this.popupUser();
        this.popupCom();
        //enter login
        $(document).live('keypress', function (e) {
            e = e || window.event;
            var keyCode = e.which || e.keyCode;
            if (keyCode == 13) {
                if ($('#personal_login').hasClass('show')) {
                    personLogin(1);
                } else if ($('#company_login').hasClass('show')) {
                    companyLogin(1);
                }
                //个人用户登录popup
                if ($('#personal_login_user').hasClass('show')) {
                    userLogin(1);
                }
                //企业用户登录popup
                if ($('#company_login_com').hasClass('show')) {
                    comLogin(1);
                }
            }
        });
    },
	personal:function(){
		$("#login_mail").focusout(function(){
			//alert();
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
			}else{
				var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test($(this).val())){
					var data = {email:$(this).val()};
					if(!$("#login_mail").parents(".register_panel").hasClass("right_panel")){//如果验证正确的邮箱则不会再次请求接口
						$.post(domain+"/api/checkEmail/userType/user",data,function(data){
							if(data.isSuccess == 0){
								$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
								if (data.userBlock == "0") {
									$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
								}else{
									$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该账户已被冻结了");
								}
							}else{
								$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该邮箱不存在");
							}
						},'json');
					}
				}else{
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
				}
			}
		});
		$("#login_password").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
			}else{
				if($(this).val().length>=21 || $(this).val().length<=5){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
        //click login
		$("#user_login .login_btn").click(function () {
		    personLogin(0);
		});
	},//end personal login
	company:function(){
		$("#login_username").focusout(function(){
			//alert();
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("用户名不能为空");
			}else{
				var data = {username:$(this).val()};
				if(!$("#login_username").parents(".register_panel").hasClass("right_panel")){//如果验证正确的邮箱则不会再次请求接口
					$.post(domain+"/api/checkUsername",data,function(data){
						if(data.isSuccess == 1){
							$("#login_username").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
							$("#login_username").parents(".register_panel").find(".yellow_popup_box").hide();
						}else{
							$("#login_username").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#login_username").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该用户名不存在");
						}
					},'json');
				}
			}
		});
		$("#login_c_pass").focusout(function(){
			if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
			}else{
				if($(this).val().length>=21 || $(this).val().length<=5){
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
				}else{
					$(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").hide();
				}
			}
		});
		$("#com_login .login_btn").click(function(){
		    companyLogin(0);
		});
	},//end company login
	popupPersonal: function () {
	    $("#login_mail").live('focusout', function () {
	        //alert();
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
	        } else {
	            var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	            if (myreg.test($(this).val())) {
	                var data = { email: $(this).val() };
	                if (!$("#login_mail").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
	                    $.post(domain + "/api/checkEmail/userType/user", data, function (data) {
	                        if (data.isSuccess == 0) {
								$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
								if (data.userBlock == "0") {
									$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
								}else{
									$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该账户已被冻结了");
								}								
	                        } else {
	                            $("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                            $("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该邮箱不存在");
	                        }
	                    }, 'json');
	                }
	            } else {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
	            }
	        }
	    });
	    $("#login_password").live('focusout', function () {
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
	        } else {
	            if ($(this).val().length >= 21 || $(this).val().length <= 5) {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
	            } else {
	                $(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").hide();
	            }
	        }
	    });
	    //click login
	    $("#user_login .login_btn").live('click', function () {
	        personLogin(1);
	    });
	},//end personal login
	popupCompany: function () {
	    $("#login_username").live('focusout', function () {
	        //alert();
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("用户名不能为空");
	        } else {
	            var data = { username: $(this).val() };
	            if (!$("#login_username").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
	                $.post(domain + "/api/checkUsername", data, function (data) {
	                    if (data.isSuccess == 1) {
	                        $("#login_username").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                        $("#login_username").parents(".register_panel").find(".yellow_popup_box").hide();
	                    } else {
	                        $("#login_username").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                        $("#login_username").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该用户名不存在");
	                    }
	                }, 'json');
	            }
	        }
	    });
	    $("#login_c_pass").live('focusout', function () {
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
	        } else {
	            if ($(this).val().length >= 21 || $(this).val().length <= 5) {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
	            } else {
	                $(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").hide();
	            }
	        }
	    });
	    $("#com_login .login_btn").live('click',function () {
	        companyLogin(1);
	    });
	},//end company login
	popupUser: function () {
	    $("#login_mail_user").live('focusout', function () {
	        //alert();
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱不能为空");
	        } else {
	            var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	            if (myreg.test($(this).val())) {
	                var data = { email: $(this).val() };
	                if (!$("#login_mail_user").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
	                    $.post(domain + "/api/checkEmail/userType/user", data, function (data) {
	                        if (data.isSuccess == 0) {
								$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
	                            if (data.userBlock == "0") {
									$("#login_mail").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").hide();
								}else{
									$("#login_mail").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
									$("#login_mail").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该账户已被冻结了");
								}
	                        } else {
	                            $("#login_mail_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                            $("#login_mail_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该邮箱不存在");
	                        }
	                    }, 'json');
	                }
	            } else {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("邮箱格式不正确");
	            }
	        }
	    });
	    $("#login_password_user").live('focusout', function () {
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
	        } else {
	            if ($(this).val().length >= 21 || $(this).val().length <= 5) {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
	            } else {
	                $(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").hide();
	            }
	        }
	    });
	    //click login
	    $("#user_login_user .login_btn").live('click', function () {
	        userLogin(1);
	    });
	},//end personal login
	popupCom: function () {
	    $("#login_username_com").live('focusout', function () {
	        //alert();
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("用户名不能为空");
	        } else {
	            var data = { username: $(this).val() };
	            if (!$("#login_username_com").parents(".register_panel").hasClass("right_panel")) {//如果验证正确的邮箱则不会再次请求接口
	                $.post(domain + "/api/checkUsername", data, function (data) {
	                    if (data.isSuccess == 1) {
	                        $("#login_username_com").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                        $("#login_username_com").parents(".register_panel").find(".yellow_popup_box").hide();
	                    } else {
	                        $("#login_username_com").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                        $("#login_username_com").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("该用户名不存在");
	                    }
	                }, 'json');
	            }
	        }
	    });
	    $("#login_c_pass_com").live('focusout', function () {
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码不能为空");
	        } else {
	            if ($(this).val().length >= 21 || $(this).val().length <= 5) {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("密码长度不符合要求");
	            } else {
	                $(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").hide();
	            }
	        }
	    });
	    $("#com_login_com .login_btn").live('click', function () {
	        comLogin(1);
	    });
	}//end company login
}
var profile = {
	init:function(){
		this.editLink();
		this.editIntro();
		this.editBasic();
		this.editSkill();
		this.loadCountry(0);
		this.resumeStatus();
	},
	avatarPreview:function (img, selection) {
		var scaleX30  = 30 / selection.width; 
		var scaleY30  = 30 / selection.height; 
		var scaleX50  = 50 / selection.width; 
		var scaleY50  = 50 / selection.height; 
		var scaleX100 = 100 / selection.width; 
		var scaleY100 = 100 / selection.height; 
		var scaleX156 = 156 / selection.width; 
		var scaleY156 = 156 / selection.height; 
		var scaleX320 = 320 / selection.width; 
		var scaleY320 = 320 / selection.height; 
		$('#preview_30 > img').css({ 
			width: Math.round(scaleX30 * $("#thumbnail").width()) + 'px', 
			height: Math.round(scaleY30 * $("#thumbnail").height()) + 'px',
			marginLeft: '-' + Math.round(scaleX30 * selection.x1) + 'px', 
			marginTop: '-' + Math.round(scaleY30 * selection.y1) + 'px' 
		});
		$('#preview_50 > img').css({ 
			width: Math.round(scaleX50 * $("#thumbnail").width()) + 'px', 
			height: Math.round(scaleY50 * $("#thumbnail").height()) + 'px',
			marginLeft: '-' + Math.round(scaleX50 * selection.x1) + 'px', 
			marginTop: '-' + Math.round(scaleY50 * selection.y1) + 'px' 
		});
		$('#preview_100 > img').css({ 
			width: Math.round(scaleX100 * $("#thumbnail").width()) + 'px', 
			height: Math.round(scaleY100 * $("#thumbnail").height()) + 'px',
			marginLeft: '-' + Math.round(scaleX100 * selection.x1) + 'px', 
			marginTop: '-' + Math.round(scaleY100 * selection.y1) + 'px' 
		});
		$('#preview_156 > img').css({ 
			width: Math.round(scaleX156 *  $("#thumbnail").width()) + 'px', 
			height: Math.round(scaleY156 * $("#thumbnail").height()) + 'px',
			marginLeft: '-' + Math.round(scaleX156 * selection.x1) + 'px', 
			marginTop: '-' + Math.round(scaleY156 * selection.y1) + 'px' 
		});
		$('#preview_320 > img').css({ 
			width: Math.round(scaleX320 *  $("#thumbnail").width()) + 'px', 
			height: Math.round(scaleY320 * $("#thumbnail").height()) + 'px',
			marginLeft: '-' + Math.round(scaleX320 * selection.x1) + 'px', 
			marginTop: '-' + Math.round(scaleY320 * selection.y1) + 'px' 
		});
		$('#x1').val(selection.x1);
		$('#y1').val(selection.y1);
		$('#x2').val(selection.x2);
		$('#y2').val(selection.y2);
		$('#w').val(selection.width);
		$('#h').val(selection.height);
	},
	avatarLoad:function () {
		$(window).load(function () { 
			$('#thumbnail').imgAreaSelect({aspectRatio: '1:1',x1: 100, y1: 100, x2: 250, y2: 250, onSelectChange: profile.avatarPreview}); 
		});
	},
	saveAvatar:function(){
		var x1 = $('#x1').val();
		var y1 = $('#y1').val();
		var x2 = $('#x2').val();
		var y2 = $('#y2').val();
		var w = $('#w').val();
		var h = $('#h').val();
		var data = {datas:{x1:x1,y1:y1,x2:x2,y2:y2,w:w,h:h},file:$("#thumbnail").attr("src")}
		$.post(domain+"/datas/saveAvatar/",
			data,
			function(data){
				if(data.isSuccess == 1){
				    //$("#introduce_text").html(replace_br($("#edit_introduce_text").val()));
					openCloseTips('success_icon', '头像更新成功', 'color_green', '280');
					location.href=domain+"/user/profile";
				}else{
					alert(data.content);
				}
			},
			'json'
		);
	},
	saveLogo:function(){
		var x1 = $('#x1').val();
		var y1 = $('#y1').val();
		var x2 = $('#x2').val();
		var y2 = $('#y2').val();
		var w = $('#w').val();
		var h = $('#h').val();
		var data = {datas:{x1:x1,y1:y1,x2:x2,y2:y2,w:w,h:h},file:$("#thumbnail").attr("src")}
		$.post(domain+"/datas/saveLogo/",
			data,
			function(data){
				if(data.isSuccess == 1){
				    //$("#introduce_text").html(replace_br($("#edit_introduce_text").val()));
					openCloseTips('success_icon', 'LOGO更新成功', 'color_green', '280');
					location.href=domain+"/company/profile";
				}else{
					alert(data.content);
				}
			},
			'json'
		);
	},
	countryChange:function(countryCode){
			if(countryCode == 0){
				$("#edit_school_province").parent("span").show();
				profile.loadProvince();
				$("#edit_school_cn_list").removeClass("hide");
				$("#edit_school_en_list").addClass("hide");
				$("#search_school_box").removeClass("hide");
			}else{
				profile.loadEnShool(countryCode,3);
				$("#edit_school_province").parent("span").hide();
				$("#edit_school_cn_list").addClass("hide");
				$("#edit_school_en_list").removeClass("hide");
				$("#choose_condition li").removeClass("selected");//清空字母过滤
				$("#choose_condition li.choose_all").addClass("selected");
				$("#search_school_box").addClass("hide");
			}
	},
	provinceChange:function(){
		$("#edit_basic_province").bind('change',function(){
			profile.loadCity($(this).val());
		});
	},
	loadCountry:function(cCode){
		$.get(domain+"/api/getCountry/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,country){
				if(country.countryName!=''){

					if(cCode==country.countryCode){
						$("<option value='" + country.countryCode + "' selected>" + country.countryName + "</option>").appendTo($("#edit_school_country"));
					}else{
						$("<option value='" + country.countryCode + "' >" + country.countryName + "</option>").appendTo($("#edit_school_country"));
					}
				}
			});
		},'json');
	},
	loadProvince:function(pCode){
		$.get(domain+"/api/getProvince/orderbyField/provinceCode/orderbyType/asc",function(data){
			$.each(data,function(i,province){
				if(province.provinceName!=''){
					if(pCode==province.provinceCode){
						$("<option value='" + province.provinceCode + "' selected>" + province.provinceName + "</option>").appendTo($("#edit_basic_province,#edit_school_province"));
					}else{
						$("<option value='" + province.provinceCode + "' >" + province.provinceName + "</option>").appendTo($("#edit_basic_province,#edit_school_province"));
					}
				}
			});
		},'json');
	},
	chooseSchool:function(id,name,type,editId){
		if(type==3){
			//college
			if(editId>0){
				$("#edit_school_name_college_"+editId).val(name);
				$("#edit_school_id_college_"+editId).val(id);
			}else{
				$("#add_school_name_college").val(name);
				$("#add_school_id_college").val(id);
			}
		}else{
			//highschool
			if(editId>0){
				$("#edit_highschool_name_"+editId).val(name);
				$("#edit_highschool_id_"+editId).val(id);
			}else{
				$("#add_highschool_name").val(name);
				$("#add_highschool_id").val(id);
			}
		}
		$.closePopupLayer('popup_choose');
	},
	loadCnShool:function(pCode,type,editId){
		if(type==2){
			$("#edit_school_province").attr("onchange","profile.loadCity($(this).val());");
			$("#edit_school_country").parent("span").hide();
			$("#edit_school_city").parent("span").show();
			$("#edit_school_area").parent("span").show();
		}else{
			$("#edit_school_city").parent("span").hide();
			$("#edit_school_area").parent("span").hide();
			$("#edit_school_country").parent("span").show();
			$("#edit_school_province").attr("onchange","profile.loadCnShool($(this).val(),"+type+","+editId+");");
		}
		//for search
		$("#searchSchoolBykw").attr("onclick","profile.searchSchoolBykw("+type+","+editId+");");
		//end for search
		$("#choose_condition li").removeClass("selected");//清空字母过滤
		$("#choose_condition li.choose_all").addClass("selected");
		$("#edit_school_cn_list").empty();
		$("#edit_school_loading").removeClass("hide");//show loading icon
		$.get(domain+"/api/getCnShool/pCode/"+pCode+"/type/"+type+"/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,cnSchool){
				if(cnSchool.schoolName!=''){
					$("<li class=letter_"+cnSchool.firstLetter+"><a href='javascript:void(0);' onclick=\"profile.chooseSchool('"+cnSchool.schoolId+"','"+cnSchool.schoolName+"','"+type+"','"+editId+"');\"><b>·</b>"+cnSchool.schoolName+"</a></li>").appendTo($("#edit_school_cn_list"));
				}
			});
			$("#edit_school_loading").addClass("hide");//hide loading icon
			$("#edit_school_none").addClass("hide");
		},'json');
	},
	searchSchoolBykw:function(type,editId){
		$("#choose_condition li").removeClass("selected");//清空字母过滤
		$("#choose_condition li.choose_all").addClass("selected");
		$("#edit_school_cn_list").empty();
		$("#edit_school_loading").removeClass("hide");//show loading icon
		var pCode  = $("#edit_school_province").val();
		var kw     = $("#search_school").val();
		if(kw==''){
			openCloseTips('uncurrent_b_icon', '请输入关键字', 'color_red', '280');
			$("#search_school").focus();
			return false;
		}
		var data = {pCode:pCode,type:type,kw:kw}
		$.post(domain+"/api/searchCnShool",data,function(data){
			if (data.isSuccess == 1) {
				$.each(data.content,function(i,cnSchool){
					if(cnSchool.schoolName!=''){
						$("<li class=letter_"+cnSchool.firstLetter+"><a href='javascript:void(0);' onclick=\"profile.chooseSchool('"+cnSchool.schoolId+"','"+cnSchool.schoolName+"','"+type+"','"+editId+"');\"><b>·</b>"+cnSchool.schoolName+"</a></li>").appendTo($("#edit_school_cn_list"));
					}
				});
				$("#edit_school_none").addClass("hide");
                $("#edit_school_loading").addClass("hide");
            } else {
                $("#edit_school_loading").addClass("hide");
                $("#edit_school_none").removeClass("hide");
				$("#get_all_school").attr("onclick", "profile.loadCnShool("+pCode+","+type+","+editId+");").text("返回");
            }
		},'json');
	},
	loadCnShoolaCode:function(aCode,type,editId){
		$("#choose_condition li").removeClass("selected");//清空字母过滤
		$("#choose_condition li.choose_all").addClass("selected");
		$("#edit_school_cn_list").empty();
		$("#edit_school_loading").removeClass("hide");//show loading icon
		$.get(domain+"/api/getCnShoolaCode/aCode/"+aCode+"/type/"+type+"/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,cnSchool){
				if(cnSchool.schoolName!=''){
					$("<li class=letter_"+cnSchool.firstLetter+"><a href='javascript:void(0);' onclick=\"profile.chooseSchool('"+cnSchool.schoolId+"','"+cnSchool.schoolName+"','"+type+"','"+editId+"');\"><b>·</b>"+cnSchool.schoolName+"</a></li>").appendTo($("#edit_school_cn_list"));
				}
			});
			$("#edit_school_loading").addClass("hide");//hide loading icon
		},'json');
	},
	loadEnShool:function(cCode,type,editId){
		$("#edit_school_en_list").empty();
		$("#edit_school_loading").removeClass("hide");//show loading icon
		$.get(domain+"/api/getEnShool/cCode/"+cCode+"/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,enSchool){
				if(enSchool.schoolName!=''){
					$("<li class=letter_"+enSchool.firstLetter+"><a href='javascript:void(0);' onclick=\"profile.chooseSchool('"+enSchool.schoolId+"','"+enSchool.schoolName+"','"+type+"','"+editId+"');\"><b>·</b>"+enSchool.schoolName+"</a></li>").appendTo($("#edit_school_en_list"));
				}
			});
			$("#edit_school_loading").addClass("hide");//hide loading icon
		},'json');
	},
	letterFilter:function(letter){
		if($("#edit_school_country").val()==0){
			lan = "cn";
		}else{
			lan = "en";
		}
		$("#choose_condition li").removeClass("selected");
		$("#choose_condition .choose_" + letter).addClass("selected");
        //for company
		$("#choose_condition_company li").removeClass("selected");
		$("#choose_condition_company .choose_" + letter).addClass("selected");
		if(letter == "all"){
			$("#edit_school_cn_list li").removeClass("hide");
			$("#edit_school_en_list li").removeClass("hide");
			$("#edit_company_list li").removeClass("hide");
		}else{
			if($("#edit_school_"+lan+"_list .letter_"+letter).length == 0){
				$("#edit_school_none").removeClass("hide");
			}else{
				$("#edit_school_none").addClass("hide");
			}
			$("#edit_school_cn_list li").addClass("hide");
			$("#edit_school_cn_list .letter_"+letter).removeClass("hide");
			$("#edit_school_en_list li").addClass("hide");
			$("#edit_school_en_list .letter_"+letter).removeClass("hide");
			$("#edit_company_list li").addClass("hide");
			$("#edit_company_list .letter_"+letter).removeClass("hide");
		}
	},
	loadFuncs:function(selected){
		$.get(domain+"/api/getFuncs/orderbyField/sort/orderbyType/asc",function(data){
			$.each(data,function(i,funcs){
				if(funcs.funcName!=''){
					if(selected == funcs.funcId){
						$("<option value='" + funcs.funcId + "' selected='selected'>" + funcs.funcName + "</option>").appendTo($("#edit_basic_function"));
					}else{
						$("<option value='" + funcs.funcId + "'>" + funcs.funcName + "</option>").appendTo($("#edit_basic_function"));
					}
				}
			});
		},'json');
	},
	loadCity:function(pCode,cCode){
		if(pCode==0){
			$("#edit_basic_city,#edit_school_city").empty();
			$("<option value='0'>市/区</option>").appendTo($("#edit_basic_city,#edit_school_city"));
			return false;
		}
		$.get(domain+"/api/getCitys/pCode/"+pCode+"/orderbyField/cityCode/orderbyType/asc",function(data){
			$("#edit_basic_city,#edit_school_city").empty();
			$.each(data,function(i,city){
				if(city.cityName!=''){
					if(cCode==city.cityCode){
						$("<option value='" + city.cityCode + "' selected>" + city.cityName + "</option>").appendTo($("#edit_basic_city,#edit_school_city"));
					}else{
						$("<option value='" + city.cityCode + "'>" + city.cityName + "</option>").appendTo($("#edit_basic_city,#edit_school_city"));
					}
				}
			});
			profile.loadArea($("#edit_school_city").val());
		},'json');
	},
	loadArea:function(cCode){
		if(cCode==0){
			$("#edit_school_area").empty();
			$("<option value='0'>县/县级市</option>").appendTo($("#edit_school_area"));
			return false;
		}
		$.get(domain+"/api/getAreas/cCode/"+cCode+"/orderbyField/cityCode/orderbyType/asc",function(data){
			$("#edit_school_area").empty();
			$.each(data,function(i,area){
				if(area.areaName!=''){
					$("<option value='" + area.areaCode + "'>" + area.areaName + "</option>").appendTo($("#edit_school_area"));
				}
			});
			profile.loadCnShoolaCode($("#edit_school_area").val(),2);
		},'json');
	},
	loadCompanyByinid: function (inid,editId) {
        $("#choose_condition_company li").removeClass("selected");//清空字母过滤
        $("#choose_condition_company li.choose_all").addClass("selected");
        $("#edit_company_list").empty();
        $("#edit_company_loading").removeClass("hide");//show loading icon
        $.get(domain + "/api/getCompanyByinId/id/" + inid + "/orderbyField/companyLevel/orderbyType/desc", function (data) {
            if (data.isSuccess == 1) {
                $.each(data.content, function (i, company) {
                    if (company.companyName != '') {
						if(company.logo!=''){
							var companyLogo = eval('('+company.logo +')');//转意php保存的json格式数据
						}else{
							var companyLogo = "";
						}
						$("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"profile.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + company.provinceCode + "','" + company.provinceName + "','" + company.cityCode + "','" + company.cityName + "','" + companyLogo.avatar_156 + "','" + editId + "','" + company.promoteName + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
                    }
                });
                $("#edit_company_none").addClass("hide");
                $("#edit_company_loading").addClass("hide");
            } else {
                $("#edit_company_loading").addClass("hide");
                $("#edit_company_none").removeClass("hide");
            }
        }, 'json');
    },
	searchCompanyBykw: function (editId) {
		var kw   = $("#search_company").val();
		var inId = $("#inderstry").val();
		if(kw==''){
			openCloseTips('uncurrent_b_icon', '请输入关键字', 'color_red', '280');
			$("#search_company").focus();
			return false;
		}
        $("#choose_condition_company li").removeClass("selected");//清空字母过滤
        $("#choose_condition_company li.choose_all").addClass("selected");
        $("#edit_company_list").empty();
        $("#edit_company_loading").removeClass("hide");//show loading icon
		var data = {inId:inId,kw:kw}
		$.post(domain+"/api/searchCompanyBykw",data,function(data){
        //$.post(domain + "/api/getCompanyByinId/id/" + inid + "/orderbyField/companyLevel/orderbyType/desc", function (data) {
            if (data.isSuccess == 1) {
                $.each(data.content, function (i, company) {
                    if (company.companyName != '') {
						if(company.logo!=''){
							var companyLogo = eval('('+company.logo +')');//转意php保存的json格式数据
						}else{
							var companyLogo = "";
						}
						$("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"profile.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + company.provinceCode + "','" + company.provinceName + "','" + company.cityCode + "','" + company.cityName + "','" + companyLogo.avatar_156 + "','" + editId + "','" + company.promoteName + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
                    }
                });
                $("#edit_company_none").addClass("hide");
                $("#edit_company_loading").addClass("hide");
            } else {
                $("#edit_company_loading").addClass("hide");
                $("#edit_company_none").removeClass("hide");
				$("#get_all_company").attr("onclick", "profile.loadCompanyByinid("+inId+","+editId+");").text("返回");
            }
        }, 'json');
    },	
	openCompany:function(pop_width,pop_name,editId){
		openPopup(pop_width,pop_name);
		if(editId!=''){
			//var inId = $("#inderstry").val();
			profile.loadCompanyByinid(0,editId);
			$("#searchCompanyBykw").attr("onclick", "profile.searchCompanyBykw("+editId+");");
			$("#inderstry").attr("onchange", "profile.loadCompanyByinid($(this).val(),'" + editId + "');");
		}
	},
	chooseCompany: function (id, name, provinceCode,provinceName,cityCode,cityName,logo,editId,promoteName) {
        if(editId>0){
			$("#edit_school_name_college_"+editId).val(name);
			$("#edit_school_id_college_"+editId).val(id);
			$("#edit_exper_company_"+editId).val(name);
			$("#edit_exper_company_id_"+editId).val(id);
			$("#edit_exper_company_province_"+editId).val(provinceCode);
			$("#edit_exper_company_province_name_"+editId).val(provinceName);
			$("#edit_exper_company_city_"+editId).val(cityCode);
			$("#edit_exper_company_city_name_"+editId).val(cityName);
			$("#edit_exper_company_promote_name_"+editId).val(promoteName);
			if(logo!=''){
				$("#edit_exper_company_logo_"+editId).attr("src",logo).removeClass("hide");
			}else{
				$("#edit_exper_company_logo_"+editId).attr("src","http://file.digitaling.com/images/avatar/brand_l_156x156.jpg").addClass("hide");
			}
		}else{
			$("#add_exper_company").val(name);
			$("#add_exper_company_id").val(id);
			$("#add_exper_company_province").val(provinceCode);
			$("#add_exper_company_province_name").val(provinceName);
			$("#add_exper_company_city").val(cityCode);
			$("#add_exper_company_city_name").val(cityName);
			$("#add_exper_company_promote_name").val(promoteName);
			if(logo!=''){
				$("#add_exper_company_logo").attr("src",logo).removeClass("hide");
				$("#exper_company_logo").val(logo);
			}else{
				$("#add_exper_company_logo").attr("src","http://file.digitaling.com/images/avatar/brand_l_156x156.jpg").addClass("hide");
			}
			// reg step2
			forms.checkExperCom();
		}
        $.closePopupLayer('popup_choose_company');
    },
	editLink:function(){
		$("#edit_link").click(function(){
			var data = {datas:{website:$("#edit_link_website").val(),blog:$("#edit_link_blog").val(),weibo:$("#edit_link_weibo").val()},format:"json",field:"linkUrl"};
			$.post(domain+"/datas/updateUser",data,function(data){
				switch(data.isSuccess){
				    case 0:
						openCloseTips('uncurrent_b_icon', '资料更新失败', 'color_red', '280');
					break;
				    case 1:
				        var _website=linkHttp($("#edit_link_website").val());
				        var _blog = linkHttp($("#edit_link_blog").val());
				        var _weibo = linkHttp($("#edit_link_weibo").val());
				        $("#link_website").attr("href", _website).text($("#edit_link_website").val());//更新websiteurl地址
				        $("#link_blog").attr("href", _blog).text($("#edit_link_blog").val());//更新blogurl地址
				        $("#link_weibo").attr("href", _weibo).text($("#edit_link_weibo").val());//更新weibourl地址
						openCloseTips('success_icon', '资料更新成功', 'color_green', '280');
						proPrecent();//资料进度
					break;
				}
			},"json");
		});
	},//end edit link
	editIntro:function(){
	    $("#edit_intro").click(function () {
	        if ($("#edit_introduce_text").val() == '') {
	            return false;
	        } else if ($("#edit_introduce_text").hasClass('error_ele')) {
	            return false;
	        }
	        var descriptions = replace_br($("#edit_introduce_text").val());
	        var data = { datas: { description: descriptions } };
			$.post(domain+"/datas/updateUser",data,function(data){
				switch(data.isSuccess){
				    case 0:
						openCloseTips('uncurrent_b_icon', '自我描述更新失败', 'color_red', '280');
					break;
					case 1:
					    $("#introduce_text").html(descriptions);//更新自我介绍
					    $("#edit_introduce_text").val(replace_ng(descriptions));
						openCloseTips('success_icon', '自我描述更新成功', 'color_green', '280');
						proPrecent();//资料进度
					break;
				}
			},"json");
		});
	},//end edit intro
	editBasic:function(){
	    $("#edit_basic").click(function () {
	        //nickname
	        if ($("#edit_basic_nickname").val() == '') {
	            return false;
	        }
	        //mobile
	        if ($("#edit_basic_mobile").val() != '') {
	            if ($("#edit_basic_mobile").val().length >= 14 || $("#edit_basic_mobile").val().length <= 10) {
	                return false;
	            }
	        }
	        //mail
	        if ($("#edit_basic_email").val() != '') {
	            var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	            if (!myreg.test($("#edit_basic_email").val())) {
	                return false;
	            }
	        }
			var nickname          = $("#edit_basic_nickname").val();
			var searchName        = nickname+','+$("#edit_basic_searchname").val();
			var name              = $("#edit_basic_name").val();
			var gender            = $("#edit_basic_gender input:radio[name=sex]:checked").val();
			var funcId            = $("#edit_basic_function").val();
			var funcName          = $("#edit_basic_function").find("option:selected").text();
			var provinceCode      = $("#edit_basic_province").val();
			var provinceName      = $("#edit_basic_province").find("option:selected").text();
			var cityCode          = $("#edit_basic_city").val();
			var cityName          = $("#edit_basic_city").find("option:selected").text();
			var mobile            = $("#edit_basic_mobile").val();
			var qq                = $("#edit_basic_qq").val();
			var email             = $("#edit_basic_email").val();
			var birthYear         = $("#edit_basic_birthYear").val();
			var birthMonth        = $("#edit_basic_birthMonth").val();
			var maritalStatus     = $("#edit_basic_marital").val();
			var hobbies           = checktag($("#edit_basic_hobbies").val());
			//permission
			var permissionMobile  = $("#permission_mobile").val();
			var permissionQq      = $("#permission_qq").val();
			var permissionEmail   = $("#permission_email").val();
			var permissionBirth   = $("#permission_birth").val();
			var permissionMarry   = $("#permission_marry").val();
			var data = {datas:{nickname:nickname,searchName:searchName,name:name,gender:gender,funcId:funcId,funcName:funcName,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,mobile:mobile,qq:qq,email:email,birthYear:birthYear,birthMonth:birthMonth,maritalStatus:maritalStatus,hobbies:hobbies,permissionMobile:permissionMobile,permissionQq:permissionQq,permissionEmail:permissionEmail,permissionBirth:permissionBirth,permissionMarry:permissionMarry}};
			$.post(domain+"/datas/updateUser",data,function(data){
				switch(data.isSuccess){
				    case 0:
						openCloseTips('uncurrent_b_icon', '基本信息更新失败', 'color_red', '280');
					break;
					case 1:
						$("#basic_nickname").text(nickname);
						$("#basic_name").text(name);
						if(gender == "m"){
							$("#basic_gender").text("男");
						}else{
							$("#basic_gender").text("女");
						}
						$("#basic_function").text(funcName);
						$("#basic_loaction").text(provinceName+" "+cityName);
						$("#basic_mobile").text(mobile);
						$("#basic_qq").text(qq);
						$("#basic_email").text(email);
						$("#basic_birth").text(birthYear+"年"+birthMonth+"月");
						if(maritalStatus == "y"){
							$("#basic_marital").text("已婚");
						}else{
							$("#basic_marital").text("单身");
						}
						tagtoli("#basic_hobbies", hobbies);
						openCloseTips('success_icon', '基本信息更新成功', 'color_green', '280');
						proPrecent();//资料进度
					break;
				}
			},"json");
		});
	},//end edit basic
	editSkill:function(){
		$("#edit_skill").click(function(){
		    var skills = checktag($("#edit_skill_con").val());
			var data    = {datas:{skills:skills}};
			$.post(domain+"/datas/updateUser",data,function(data){
				switch(data.isSuccess){
				    case 0:
						openCloseTips('uncurrent_b_icon', '特长/技能更新失败', 'color_red', '280');
					break;
					case 1:
					    tagtoli("#skill_con", skills);
						openCloseTips('success_icon', '特长/技能更新成功', 'color_green', '280');
						proPrecent();//资料进度
					break;
				}
			},"json");
		});
	},
	addUntilNow:function(){
		if($("#add_exper_end_now").attr("checked")){
			$("#add_exper_end").addClass("hide");
			$("#add_exper_end_show").removeClass("hide");
		}else{
			$("#add_exper_end").removeClass("hide");
			$("#add_exper_end_show").addClass("hide");
		}
	},
	editUntilNow:function(editId){
		if($("#edit_exper_end_now_"+editId).attr("checked")){
			$("#edit_exper_end_"+editId).addClass("hide");
			$("#edit_exper_end_show_"+editId).removeClass("hide");
		}else{
			$("#edit_exper_end_"+editId).removeClass("hide");
			$("#edit_exper_end_show_"+editId).addClass("hide");
		}
	},
	addExper: function () {
	    if ($("#add_exper_company").val() == '' || $("#add_exper_title").val() == '') {
	        if ($('#popupLayer_popup_joinCompany #add_exper_title').val() == '') {
	            openCloseTips('warn_icon', '担任职位不能为空', 'color_666', '280');
	        }
	        return false;
	    }
	    var _startWorkTimeYear = parseInt($("#add_exper_start_year").val());
	    var _startWorkTimeMonth = parseInt($("#add_exper_start_month").val());
	    var _endWorkTimeYear = parseInt($("#add_exper_end_year").val());
	    var _endWorkTimeMonth = parseInt($("#add_exper_end_month").val());
	    var _untilNow = $("#add_exper_end_now").attr("checked") ? 1 : 0;
	    if (_startWorkTimeYear > _endWorkTimeYear && _untilNow == 0) {
	        return false;
	    } else if (_startWorkTimeYear == _endWorkTimeYear && _startWorkTimeMonth > _endWorkTimeMonth && _untilNow == 0) {
	        return false;
	    }
		var companyId           = $("#add_exper_company_id").val();
		var companyName         = $("#add_exper_company").val();
		var provinceCode        = $("#add_exper_company_province").val();
		var provinceName        = $("#add_exper_company_province_name").val();
		var cityCode            = $("#add_exper_company_city").val();
		var cityName            = $("#add_exper_company_city_name").val();
		var promoteName         = $("#add_exper_company_promote_name").val();
		var companyLogo         = $("#add_exper_company_logo").attr("src");
		var title               = $("#add_exper_title").val();
		var clients             = checktag($("#add_exper_clients").val());
		var startWorkTimeYear   = $("#add_exper_start_year").val();
		var startWorkTimeMonth  = $("#add_exper_start_month").val();
		var endWorkTimeYear     = $("#add_exper_end_year").val();
		var endWorkTimeMonth    = $("#add_exper_end_month").val();
		var untilNow            = $("#add_exper_end_now").attr("checked")?1:0;
		var data                = {datas:{companyId:companyId,companyName:companyName,promoteName:promoteName,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,companyLogo:companyLogo,title:title,clients:clients,startWorkTimeYear:startWorkTimeYear,startWorkTimeMonth:startWorkTimeMonth,endWorkTimeYear:endWorkTimeYear,endWorkTimeMonth:endWorkTimeMonth,untilNow:untilNow}};
		$.post(domain+"/datas/addUserExper",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '添加失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '添加成功', 'color_green', '280');
					location.reload();
				break;
			}
		},"json");
	},
	editExper: function (editId) {
	    if ($("#edit_exper_company_" + editId).val() == '' || $("#edit_exper_title_" + editId).val() == '') {
	        return false;
	    }
	    var _startWorkTimeYear = parseInt($("#edit_exper_start_year_" + editId).val());
	    var _startWorkTimeMonth = parseInt($("#edit_exper_start_month_" + editId).val());
	    var _endWorkTimeYear = parseInt($("#edit_exper_end_year_" + editId).val());
	    var _endWorkTimeMonth = parseInt($("#edit_exper_end_month_" + editId).val());
	    var _untilNow = $("#edit_exper_end_now_" + editId).attr("checked") ? 1 : 0;
	    if (_startWorkTimeYear > _endWorkTimeYear && _untilNow == 0) {
	        return false;
	    } else if (_startWorkTimeYear == _endWorkTimeYear && _startWorkTimeMonth > _endWorkTimeMonth && _untilNow == 0) {
	        return false;
	    }
		var companyId           = $("#edit_exper_company_id_"+editId).val();
		var companyName         = $("#edit_exper_company_"+editId).val();
		var provinceCode        = $("#edit_exper_company_province_"+editId).val();
		var provinceName        = $("#edit_exper_company_province_name_"+editId).val();
		var cityCode            = $("#edit_exper_company_city_"+editId).val();
		var cityName            = $("#edit_exper_company_city_name_"+editId).val();
		var promoteName         = $("#edit_exper_company_promote_name_"+editId).val();
		var companyLogo         = $("#edit_exper_company_logo_"+editId).attr("src");
		var title               = $("#edit_exper_title_"+editId).val();
		var clients             = checktag($("#edit_exper_clients_"+editId).val());
		var startWorkTimeYear   = $("#edit_exper_start_year_"+editId).val();
		var startWorkTimeMonth  = $("#edit_exper_start_month_"+editId).val();
		var endWorkTimeYear     = $("#edit_exper_end_year_"+editId).val();
		var endWorkTimeMonth    = $("#edit_exper_end_month_"+editId).val();
		var untilNow            = $("#edit_exper_end_now_"+editId).attr("checked")?1:0;
		var data                = {datas:{ueId:editId,companyId:companyId,companyName:companyName,promoteName:promoteName,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,companyLogo:companyLogo,title:title,clients:clients,startWorkTimeYear:startWorkTimeYear,startWorkTimeMonth:startWorkTimeMonth,endWorkTimeYear:endWorkTimeYear,endWorkTimeMonth:endWorkTimeMonth,untilNow:untilNow}};
		$.post(domain+"/datas/editUserExper",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '工作履历编辑失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '工作履历编辑成功', 'color_green', '280');
					location.reload();
					proPrecent();//资料进度
				break;
			}
		},"json");
	},
	addEdu:function(type){
	    if (type == "college") {
	        if ($("#add_school_name_college").val() == '') {
	            return false;
	        }
			var type       = 1;
			var schoolType = $("#add_school_type_college input:radio[name=c_edu]:checked").val();
			var schoolId   = $("#add_school_id_college").val();
			var schoolName = $("#add_school_name_college").val();
			var startStudy = $("#add_school_time_college").val();
			var department = $("#add_school_name_department").val();
			var data       = {datas:{type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department}};
	    } else {
	        if ($("#add_highschool_name").val() == '') {
	            return false;
	        }
			var type       = 2;
			var schoolType = $("#add_highschool_type input:radio[name=h_edu]:checked").val();
			var schoolId   = $("#add_highschool_id").val();
			var schoolName = $("#add_highschool_name").val();
			var startStudy = $("#add_highschool_time").val();
			var department = '';
			var data       = {datas:{type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department}};
		}
		$.post(domain+"/datas/addUserEdu",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '教育信息添加失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '教育信息添加成功', 'color_green', '280');
					location.reload();
				break;
			    case 2:
			        openCloseTips('warn_icon', '同一个学校不能添加两次', 'color_666', '280');
				break;
			}
		},"json");
	},
	editEdu:function(type,editId){
	    if (type == "college") {
	        if ($("#edit_school_name_college_" + editId).val() == '') {
	            return false;
	        }
			var type       = 1;
			var schoolType = $("#edit_school_type_college_"+editId+" input:radio[name=edit_edu_"+editId+"]:checked").val();
			var schoolId   = $("#edit_school_id_college_"+editId).val();
			var schoolName = $("#edit_school_name_college_"+editId).val();
			var startStudy = $("#edit_school_time_college_"+editId).val();
			var department = $("#edit_school_name_department_"+editId).val();
			var data       = {datas:{uEduId:editId,type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department}};
	    } else {
	        if ($("#edit_highschool_name_" + editId).val() == '') {
	            return false;
	        }
			var type       = 2;
			var schoolType = $("#edit_highschool_type_"+editId+" input:radio[name=h_edu_"+editId+"]:checked").val();
			var schoolId   = $("#edit_highschool_id_"+editId+"").val();
			var schoolName = $("#edit_highschool_name_"+editId+"").val();
			var startStudy = $("#edit_highschool_time_"+editId+"").val();
			var department = '';
			var data       = {datas:{uEduId:editId,type:type,schoolType:schoolType,schoolId:schoolId,schoolName:schoolName,startStudy:startStudy,department:department}};
		}
		$.post(domain+"/datas/editUserEdu",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '教育信息编辑失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '教育信息编辑成功', 'color_green', '280');
					location.reload();
					proPrecent();//资料进度
				break;
			}
		},"json");
	},//edn edit education
	delEdu:function(editId){
		if(editId == ''){return false;};
		var data       = {datas:{uEduId:editId}};
		$.post(domain+"/datas/delUserEdu",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '教育信息删除失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '教育信息删除成功', 'color_green', '280');
					location.reload();
				break;
			}
		},"json");
	},//end delete education
	delExper:function(editId){
		if(editId == ''){return false;};
		var data       = {datas:{ueId:editId}};
		$.post(domain+"/datas/delUserExper",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '工作履历删除失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '工作履历删除成功', 'color_green', '280');
					location.reload();
				break;
			}
		},"json");
	},//end delete education
	addAward: function () {
	    if ($("#add_user_award_name").val() == '' || $("#add_user_award_level").val() == '') {
	        return false;
	    }

		var awardYear  = $("#add_user_award_time").val();
		var awardName  = $("#add_user_award_name").val();
		var awardLevel = $("#add_user_award_level").val();
		var awardLogo  = '0';
		var data       = {datas:{awardYear:awardYear,awardName:awardName,awardLevel:awardLevel,awardLogo:awardLogo}};
		$.post(domain+"/datas/addUserAward",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '获奖信息添加失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '获奖信息添加成功', 'color_green', '280');
					location.reload();
				break;
			}
		},"json");
	},//end add user award
	editAward: function (editId) {
	    if ($("#edit_user_award_name_" + editId).val() == '' || $("#edit_user_award_level_" + editId).val() == '') {
	        return false;
	    }
		var awardYear  = $("#edit_user_award_time_"+editId).val();
		var awardName  = $("#edit_user_award_name_"+editId).val();
		var awardLevel = $("#edit_user_award_level_"+editId).val();
		var awardLogo  = '0';
		var data       = {datas:{uaId:editId,awardYear:awardYear,awardName:awardName,awardLevel:awardLevel,awardLogo:awardLogo}};
		$.post(domain+"/datas/editUserAward",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '获奖信息编辑失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '获奖信息编辑成功', 'color_green', '280');
					location.reload();
				break;
			}
		},"json");
	},//end edit user award
	delAward:function(editId){
		if(editId == ''){return false;};
		var data       = {datas:{uaId:editId}};
		$.post(domain+"/datas/delUserAward",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '获奖信息删除失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '获奖信息删除成功', 'color_green', '280');
					location.reload();
				break;
			}
		},"json");
	},//end delete user award
	comUpdate:function(){
		$("#updateCompany").click(function(){
			
			if ($("#companyName").val() == '') {
			    $("#popup_form_check .error_msg").text("企业宣传名不能为空");
				openPopup("280","popup_form_check");
				//$("#companyName").focus();
                return false;
            }
			if ($("#promoteName").val() == '') {
			    $("#popup_form_check .error_msg").text("企业搜索关键字不能为空");
				openPopup("280","popup_form_check");
			    //$("#promoteName").focus();
                return false;
            }
			if($("#companyIntro").val() == ''){
			    $("#popup_form_check .error_msg").text("企业介绍不能为空");
				openPopup("280","popup_form_check");
			    //$("#promoteName").focus();
                return false;
			} else if ($("#companyIntro").hasClass('error_ele')) {
			    $("#popup_form_check .error_msg").text("输入企业介绍超出限制");
			    openPopup("300", "popup_form_check");
			    //$("#companyIntro").focus();
			    return false;
			}
		    // companyIntro
			if($("#contacter").val() == ''){
			    $("#popup_form_check .error_msg").text("联系人姓名不能为空");
				openPopup("280","popup_form_check");
			    //$("#contacter").focus();
                return false;
			}// contacter
			if($("#contacterTitle").val() == ''){
			    $("#popup_form_check .error_msg").text("联系人职称不能为空");
				openPopup("280","popup_form_check");
			    //$("#contacterTitle").focus();
                return false;
			}// contacterTitle
			if ($("#contacterMobile").val() != '') {
			    if ($("#contacterMobile").val().length >= 14 || $("#contacterMobile").val().length <= 10) {
			        $("#popup_form_check .error_msg").text("手机号码输入有误");
			        openPopup("280", "popup_form_check");
			        return false;
			    }
			}// contacterMobile
			if($("#phoneCode").val() == ''){
			    $("#popup_form_check .error_msg").text("联系电话区号不能为空");
				openPopup("280","popup_form_check");
			    //$("#phoneCode").focus();
                return false;
			}// phoneCode
			if($("#contactPhone").val() == ''){
			    $("#popup_form_check .error_msg").text("联系电话不能为空");
				openPopup("280","popup_form_check");
			    //$("#contactPhone").focus();
                return false;
			}// contactPhone
			if($("#contactEmail").val() == ''){
			    $("#popup_form_check .error_msg").text("联系邮箱不能为空");
				openPopup("280","popup_form_check");
			    //$("#contactEmail").focus();
                return false;
			}// contactEmail
			if($("#province").val() == 0){
			    $("#popup_form_check .error_msg").text("请选择省份");
				openPopup("280","popup_form_check");
                return false;
			}// province
			if($("#city").val() == 0){
			    $("#popup_form_check .error_msg").text("请选择城市");
				openPopup("280","popup_form_check");
                return false;
			}// city
			if($("#locationAddress").val() == ''){
			    $("#popup_form_check .error_msg").text("通讯地址不能为空");
				openPopup("280","popup_form_check");
                return false;
			}// location
			if ($("#postCode").val() != '') {
			    if ($("#postCode").val().length != 6) {
			        $("#popup_form_check .error_msg").text("邮编输入有误");
			        openPopup("280", "popup_form_check");
			        return false;
			    }
			}// postCode
			if($("#companyPhone").val() == ''){
			    $("#popup_form_check .error_msg").text("企业总机不能为空");
				openPopup("280","popup_form_check");
			    //$("#companyPhone").focus();
                return false;
			}// companyPhone
			if($("#businessLicense").val() == ''){
			    $("#popup_form_check .error_msg").text("营业执照号码不能为空");
				openPopup("280","popup_form_check");
			    //$("#businessLicense").focus();
                return false;
			}// businessLicense
			if($("#establishTime").val() == 0){
			    $("#popup_form_check .error_msg").text("成立年份不能为空");
				openPopup("280","popup_form_check");
                return false;
			}// city
			if($("#companyScale").val() == 0){
			    $("#popup_form_check .error_msg").text("请选择企业规模");
				openPopup("280","popup_form_check");
                return false;
			}// city
			
			//if($("#brands").val() == ''){
		    //	$("#popup_form_check .error_msg").text("请填写旗下子品牌");
			//	openPopup("280","popup_form_check");
			//    //$("#brands").focus();
            //    return false;
			//}// postCode
			if($("#industry").val() == 0){
			    $("#popup_form_check .error_msg").text("请选择所属行业");
				openPopup("280","popup_form_check");
                return false;
			}// city
			if($.getBoxRadioValue('company_type') == '' && $("#industry").val()<3){
			    $("#popup_form_check .error_msg").text("请选择企业类型");
				openPopup("280","popup_form_check");
                return false;
			}// company_type
			//get datas
			var companyName        = $("#companyName").val();
			var promoteName        = checktag($("#promoteName").val());
			var linkUrl_website    = $("#linkUrl_website").val();
			var linkUrl_blog       = $("#linkUrl_blog").val();
			var linkUrl_weibo      = $("#linkUrl_weibo").val();
			var companyIntro       = replace_br($("#companyIntro").val());
			var contacter          = $("#contacter").val();
			var contacterTitle     = $("#contacterTitle").val();
			var contacterMobile    = $("#contacterMobile").val();
			var phoneCode          = $("#phoneCode").val();
			var contactPhone       = $("#contactPhone").val();
			var phoneCord          = $("#phoneCord").val();
			var contactEmail       = $("#contactEmail").val();
			var contactQQ          = $("#contactQQ").val();
			var provinceCode       = $("#province").val();
			var provinceName       = $("#province").find("option:selected").text();
			var cityCode           = $("#city").val();
			var cityName           = $("#city").find("option:selected").text();
			var locations          = $("#locationAddress").val();
			var postCode           = $("#postCode").val();
			var companyPhone       = $("#companyPhone").val();
			var companyFax         = $("#companyFax").val();
			var fullname           = $("#fullname").val();
			var companyNature      = $("#companyNature").val();
			var companyNatureName  = $("#companyNature").find("option:selected").text();
			var licensePic         = $("#licensePic").attr("src");
			var businessLicense    = $("#businessLicense").val();
			var establishTime      = $("#establishTime").val();
			var companyScale       = $("#companyScale").val();
			var companyScaleName   = $("#companyScale").find("option:selected").text();
			var underGroup         = $("#underGroup").val();
			var brands             = checktag($("#brands").val());
			var industry           = $("#industry").val();
			var industryName       = $("#industry").find("option:selected").text();
			var companyType        = $.getBoxRadioValue('company_type');			
			
			var data = {datas:{companyName:companyName,promoteName:promoteName,companyIntro:companyIntro,contacter:contacter,contacterTitle:contacterTitle,contacterMobile:contacterMobile,phoneCode:phoneCode,contactPhone:contactPhone,phoneCord:phoneCord,contactEmail:contactEmail,contactQQ:contactQQ,provinceCode:provinceCode,provinceName:provinceName,cityCode:cityCode,cityName:cityName,locations:locations,postCode:postCode,companyPhone:companyPhone,companyFax:companyFax,fullname:fullname,companyNature:companyNature,companyNatureName:companyNatureName,licensePic:licensePic,businessLicense:businessLicense,establishTime:establishTime,companyScale:companyScale,companyScaleName:companyScaleName,underGroup:underGroup,brands:brands,industry:industry,industryName:industryName,companyType:companyType},linkUrl:{website:linkUrl_website,blog:linkUrl_blog,weibo:linkUrl_weibo}};
			$.post(domain+"/datas/updateCompany",data,function(data){
				switch(data.isSuccess){
				    case 1:
						openCloseTips('success_icon', '企业资料更新成功', 'color_green', '280');
						location.reload();
					break;
					case 0:
					    openCloseTips('uncurrent_b_icon', '企业资料更新失败', 'color_red', '280');
					break;
				}
			},"json");
		});
	},//end company update
	resumeStatus: function () {
	    $('#save_resume_btn').live('click',function () {
	        $.closePopupLayer('popup_resume_state');
	        var rval = $('input[name=resume_state]:checked').val();
	        var rtxt = $('#resume_status');
			$('input[name=resume_state]:checked').attr("checked",'checked');
			if(rval == ''){return false;};
			var data  = {datas:{resumeStatus:rval}};
			$.post(domain+"/datas/updateUser",data,function(data){
				switch(data.isSuccess){
					case 0:
						openCloseTips('uncurrent_b_icon', '简历状态更新失败', 'color_red', '280');
					break;
					case 1:
						if (rval == 1) {
							$('#resume_status').text('我不需要求职');
							$("#resume_status_r2").attr("checked","checked");
							$("#resume_status_r1").attr("checked",false);
						} else {
							$('#resume_status').text('我正在求职');
							$("#resume_status_r1").attr("checked","checked");
							$("#resume_status_r2").attr("checked",false);
						}
					break;
				}
			},"json");
	    })
	}
}
//hs_select
searchs = {
	jobs:function(searchType,par){
		var keywords  = $("#keywords").val();
		var province  = $("#province").val();
		var functions  = $("#funcs").val();
		var jobLevels  = $("#job_levels").val();
		var salaryRange  = $("#salary_range").val();
		var companyScale  = $("#companyScale").val();
		var pubTime  = $("#pubTime").val();
		var jobTypes  = $("#job_types").val();
		var industry  = $.getBoxRadioValue('industry')?$.getBoxRadioValue('industry'):0;
		switch(par){
			case "province":
				province=0;
			break;
			case "functions":
				functions=0;
			break;
			case "keywords":
				keywords='';
			break;
			case "jobLevels":
				jobLevels=0;
			break;
			case "companyScale":
				companyScale=0;
			break;
			case "salaryRange":
				salaryRange=0;
			break;
			case "pubTime":
				pubTime=0;
			break;
			case "jobTypes":
				jobTypes=0;
			break;
			case "industry":
				industry=0;
			break;
		}
		if(searchType == "simple"){
			if(keywords == ''|| keywords=="输入职位名称或企业名称搜索"){
				var searchUrl = domain+"/jobs/search?pc="+province+"&func="+functions+"&st="+searchType;
			}else{
				var searchUrl = domain+"/jobs/search?pc="+province+"&func="+functions+"&kw="+keywords+"&st="+searchType;
			}
			location.href = searchUrl;
		}
		if(searchType == "advanced"){
			if(keywords == ''|| keywords=="输入职位名称或企业名称搜索"){
				var searchUrl = domain+"/jobs/search?pc="+province+"&func="+functions+"&jl="+jobLevels+"&sr="+salaryRange+"&cs="+companyScale+"&pt="+pubTime+"&jt="+jobTypes+"&in="+industry+"&st="+searchType;
			}else{
				var searchUrl = domain+"/jobs/search?pc="+province+"&func="+functions+"&jl="+jobLevels+"&sr="+salaryRange+"&cs="+companyScale+"&pt="+pubTime+"&jt="+jobTypes+"&in="+industry+"&kw="+keywords+"&st="+searchType;
			}
			location.href = searchUrl;
		}
	},
	people:function(par){
		var keywords   = $("#keywords").val();
		var province   = $("#province").val();
		var functions  = $("#funcs").val();
		switch(par){
			case "province":
				province=0;
			break;
			case "functions":
				functions=0;
			break;
			case "keywords":
				keywords='';
			break;
		}
		if(keywords == ''|| keywords=="输入昵称或企业名称搜索"){
			var searchUrl = domain+"/people/search?pc="+province+"&func="+functions;
		}else{
			var searchUrl = domain+"/people/search?pc="+province+"&func="+functions+"&kw="+keywords;
		}
		location.href = searchUrl;
	},
	company:function(par){
		var keywords   = $("#keywords").val();
		var province   = $("#province").val();
		var industry  = $("#industry").val();
		switch(par){
			case "province":
				province=0;
			break;
			case "industry":
				industry=0;
			break;
			case "keywords":
				keywords='';
			break;
		}
		if(keywords == ''|| keywords=="输入企业名称搜索"){
			var searchUrl = domain+"/company/search?pc="+province+"&in="+industry;
		}else{
			var searchUrl = domain+"/company/search?pc="+province+"&in="+industry+"&kw="+keywords;
		}
		location.href = searchUrl;
	},
	global:function(head){
		if(head=='head'){
			var keywords   = $("#keywords"+head).val();
			var cat        = $("#cat"+head).val();
		}else{
			var keywords   = $("#keywords").val();
			var cat        = $("#cat").val();
		}
		if (keywords == "" || keywords == "输入搜索关键字") {
			var searchUrl = domain+"/search/"+cat;
		}else{
			var searchUrl = domain+"/search/"+cat+"/?kw="+keywords;
		}
		location.href = searchUrl;
	}
}
//头部搜索
$('#keywordshead').keydown(function (e) {
    if (e.which == 13) {
        searchs.global('head');
    }
});
//文章分类
$('#keywords').keydown(function (e) {
    if (e.which == 13) {
        if ($(this).hasClass('key_jobs')) {
            searchs.jobs('simple');
        } else if ($(this).hasClass('key_people')) {
            searchs.people();
        } else if ($(this).hasClass('key_company')) {
            searchs.company();
        } else {
            searchs.global('global');
        }
    }
});
favorite = {
	article:function(id){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
		    openPopup("400", "popup_login_user");
			return false;
		}
		var cTitle = $("#cTitle").val();
		var cCover = $("#cCover").val();
		var data = {datas:{conId:id},synch:{conId:id,cTitle:cTitle,cCover:cCover}}
		$.post(domain+"/datas/favArticle",data,function(data){
			switch(data.isSuccess){
				case 1:
					$("#collectCount_top,#collectCount_bom").text("收藏 "+data.collectCount);
					$("#popup_favorite .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">收藏成功！</b><label class="color_666">收藏文章<b class="inline_bk mg_r_10">' + data.favCount + '</b>  剩余可收藏数<b>' + data.reminFavCount + '</b></label></span>');
					$("#popup_favorite .popup_con .tips_btn").html('<a class="blue_btn" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_favorite\');">确定</a>');
					openPopup("380", "popup_favorite");
				break;
				case 0:
				    openCloseTips('uncurrent_b_icon', '收藏失败', 'color_red', '280');
				break;
				case 2:
					openCloseTips('warn_icon', '已收藏该文章', 'color_666', '280');
				break;
				case 3:
				    $("#popup_favorite .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">文章收藏夹已满！</b><label class="color_666">删除管理后再收藏！</label></span>');
				    $("#popup_favorite .popup_con .tips_btn").html('<a class="yellow_btn mg_r_20 v_m" href="' + domain + '/favorite/articles">管理</a><a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_favorite\');">关闭</a>');
				    openPopup("380", "popup_favorite");
				break;
			}
		},"json");
	},
	project:function(id){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
		    openPopup("400", "popup_login_user");
			return false;
		}
		var cTitle = $("#cTitle").val();
		var cCover = $("#cCover").val();
		var data = {datas:{conId:id},synch:{conId:id,cTitle:cTitle,cCover:cCover}}
		$.post(domain+"/datas/favProject",data,function(data){
			switch(data.isSuccess){
				case 1:
					$("#collectCount_top,#collectCount_bom").text("收藏 "+data.collectCount);
					$("#popup_favorite .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">收藏成功！</b><label class="color_666">收藏项目<b class="inline_bk mg_r_10">' + data.favCount + '</b>  剩余可收藏数<b>' + data.reminFavCount + '</b></label></span>');
					$("#popup_favorite .popup_con .tips_btn").html('<a class="blue_btn" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_favorite\');">确定</a>');
					openPopup("380", "popup_favorite");
				break;
			    case 0:
			        openCloseTips('uncurrent_b_icon', '收藏失败', 'color_red', '280');
				break;
			    case 2:
			        openCloseTips('warn_icon', '已收藏该项目', 'color_666', '280');
				break;
				case 3:
				    $("#popup_favorite .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">项目收藏夹已满！</b><label class="color_666">删除管理后再收藏！</label></span>');
				    $("#popup_favorite .popup_con .tips_btn").html('<a class="yellow_btn mg_r_20 v_m" href="' + domain + '/favorite/projects">管理</a><a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_favorite\');">关闭</a>');
					openPopup("380", "popup_favorite");
				break;
			}
		},"json");
	},
	jobs:function(id){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
		    openPopup("400", "popup_login_user");
			return false;
		}
		var data = {datas:{conId:id}}
		$.post(domain+"/datas/favJob",data,function(data){
			switch(data.isSuccess){
				case 1:
					$("#popup_favorite .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">收藏成功！</b><label class="color_666">收藏职位<b class="inline_bk mg_r_10">'+data.favCount+'</b>  剩余可收藏数<b>'+data.reminFavCount+'</b></label></span>');
					$("#popup_favorite .popup_con .tips_btn").html('<a class="blue_btn" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_favorite\');">确定</a>');
					openPopup("380","popup_favorite");
					$("#regjob_btn_"+id).attr('onclick','').removeClass("regjob_btn").addClass("faved_link_btn").text("已收藏");
					
				break;
			    case 0:
			        openCloseTips('uncurrent_b_icon', '收藏失败', 'color_red', '280');
				break;
			    case 2:
			        openCloseTips('warn_icon', '已收藏该职位', 'color_666', '280');
					$("#regjob_btn_"+id).attr('onclick','').removeClass("regjob_btn").addClass("faved_link_btn").text("已收藏");
				break;
				case 3:
				    $("#popup_favorite .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">职位收藏夹已满！</b><label class="color_666">删除管理后再收藏！</label></span>');
				    $("#popup_favorite .popup_con .tips_btn").html('<a class="yellow_btn mg_r_20 v_m" href="' + domain + '/favorite/jobs">管理</a><a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_favorite\');">关闭</a>');
					openPopup("380","popup_favorite");
				break;
			}
		},"json");
	},
	poptips:function(type,key){
		switch(type){
			case "article":
				if(key==''||key==1){
					openCloseTips('warn_icon', '不能收藏自己的文章', 'color_666', '300');
				}else{
				    openCloseTips('warn_icon', '企业不能收藏文章', 'color_666', '300');
				}
			break;
			case "project":
				if(key==''||key==1){
					openCloseTips('warn_icon', '不能收藏自己的项目', 'color_666', '300');
				}else{
					openCloseTips('warn_icon', '企业不能收藏项目', 'color_666', '300');
				}
			break;
			case "jobs":
			    //$("#popup_favorite .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_yellow mg_r_10">企业不能收藏职位！</b></span>');
				//$("#popup_favorite .popup_con .blue_btn").attr("href",domain+"/favorite/jobs");
				//openPopup("380", "popup_favorite");
				openCloseTips('warn_icon', '企业不能收藏职位', 'color_666', '300');
			break;
			default:
				openCloseTips('warn_icon', '企业不能收藏职位', 'color_666', '300');
			break;
		}
	}	
}
claim = {
	openClaim:function(){
		var userType = $("#userType").val();
		if(userType==''){
		    openPopup("400", "popup_login");
			return false;
		}
		openPopup("440","popup_claim");
	},
	project:function(id){
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var userTitle = $("#userTitle").val();
		if($("#userTitle").val()==''){
			$("#userTitle").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#userTitle").animate({
				backgroundColor:"#ffffff"
			}, 100);
			$("#userTitle").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#userTitle").animate({
				backgroundColor:"#ffffff"
			}, 100);
			return false;
		}
		var data = {datas:{conId:$("#conId").val(),userTitle:userTitle},exper:{}}
		$.closePopupLayer("popup_claim");
		$.post(domain+"/datas/claimProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '认领项目失败', 'color_red', '280');
				break;
				case 3:
					openCloseTips('uncurrent_b_icon', '自己的项目不可以认领', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '认领项目成功', 'color_green', '280');
					if(data.ifexit==1){
						$("#teamMember_"+data.userId).html(userTitle+" :");
						$("#userTitle").attr("value",userTitle);
					}else{
						$('<p><label id="teamMember_'+data.userId+'">'+userTitle+':</label><span><a href="'+domain+'/people/'+data.userId+'">'+data.userNickname+'</a></span></p>').appendTo($("#credits"));
						$("#popup_claim .popup_head").find("em").html('<span class="color_red">您已认领</span>,您还可以更新职位名称！');
						$("#popup_claim .popup_head .icon").removeClass("claim_icon").addClass("error_icon");;
						$("#popup_claim .yellow_btn").text("更新");
						$("#userTitle").attr("value",userTitle);
					}
				break;
			}
		},"json");
	},
	agencyMember:function(id){
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var comRoleId       = $("#project_roles").val();
		var comProjectRoles = $("#project_roles").find("option:selected").text();
		var data = {datas:{conId:$("#conId").val(),userId:$("#comId").val(),comRoleId:comRoleId,comProjectRoles:comProjectRoles}}
		$.closePopupLayer("popup_claim");
		$.post(domain+"/datas/agencyProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '认领项目失败', 'color_red', '280');
				break;
				case 3:
					openCloseTips('uncurrent_b_icon', '自己的项目不能认领', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '认领项目成功', 'color_green', '280');
				break;
			}
		},"json");
	}
}
zan = {
	article:function(id){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var cTitle = $("#cTitle").val();
		var cCover = $("#cCover").val();
		var data = {datas:{conId:id},synch:{conId:id,cTitle:cTitle,cCover:cCover}}
		$.post(domain+"/datas/zanArticle",data,function(data){
			switch(data.isSuccess){
				case 1:
				    //$("#popup_zan .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">谢谢！</b></span>');
					$("#zan_top,#zan_bom").text(data.zan);
				    //openPopup("280","popup_zan");
					openCloseTips('success_icon', '谢谢', 'color_green', '280');
				break;
				case 0:
					//$("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">失败了！</b></span>');
				    //openPopup("280", "popup_zan");
				    openCloseTips('uncurrent_b_icon', '失败了', 'color_red', '280');
				break;
				case 2:
					//$("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_yellow mg_r_10">已经赞过！</span>');
					//openPopup("280", "popup_zan");
				    openCloseTips('warn_icon', '您已赞过了', 'color_666', '280');
				break;
			}
		},"json");
	},
	poptips:function(type){
		//$("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_yellow mg_r_10">不能赞自己的文章！</b></span>');
		//openPopup("280", "popup_zan");
	    openCloseTips('warn_icon', '不能赞自己的文章', 'color_666', '280');
	}	
}//end favorite
apply = {
	jobs:function(id,comId){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var data = {datas:{conId:id,comId:comId}}
		$.post(domain + "/datas/applyJob", data, function (data) {
		    //alert(data.jobUserApply);
			$.closePopupLayer("popup_job_apply");
			switch(data.isSuccess){
				case 1:
				    $("#popup_apply .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">申请成功！</b><label class="color_666">申请职位<b class="inline_bk mg_r_10">' + data.applyUserCount + '</b>  剩余可申请数<b>' + data.jobUserApply + '</b></label></span>');
					$("#popup_apply .popup_con .tips_btn").html('<a class="blue_btn" href="javascript:void(0);" onclick="$.closePopupLayer(\'popup_apply\');">确定</a>');
					openPopup("380","popup_apply");
				break;
			    case 0:
			        openCloseTips('uncurrent_b_icon', '申请失败', 'color_red', '280');
				break;
			    case 2:
			        openCloseTips('warn_icon', '已申请该职位', 'color_666', '280');
				break;
			}
		},"json");
	},
    //jobs talent invite 
	talentInvite: function (id) {
	    openPopup('720', 'popup_talent_invite');
	    $('#send_invite_btn').attr('onclick', 'apply.invite(' + id + ');');
	},
	invite:function(id){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var conId = $.getBoxRadioValue("jobname");
		if(conId==''){
		    //$("#popup_alert .popup_con .tips").html('<i class="icon warn_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_666 mg_r_10">请选择职位，再发送邀请！</b></span>');
		    //$("#popup_alert .popup_con .tips_btn").html('<a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick=\'$.closePopupLayer("popup_alert");\'>关闭</a>');
		    //openPopup("280", "popup_alert");
		    openCloseTips('warn_icon', '请选择职位，再发送邀请', 'color_666', '320');
			return false;
		}
		var data  = {datas:{conId:conId,userId:id}}
		$.post(domain+"/datas/invite",data,function(data){
			switch(data.isSuccess){
				case 1:
				    $("#popup_alert .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">邀请成功!</b><label class="color_666">职位邀请<b class="inline_bk mg_r_10">' + data.inviteComCount + '</b> 剩余邀请数<b>' + data.remainInvite + '</b></label></span>');
					$("#popup_alert .popup_con .tips_btn").html('<a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick=\'$.closePopupLayer("popup_alert");\'>关闭</a>');
					$.closePopupLayer("popup_talent_invite");
					openPopup("380","popup_alert");
				break;
				case 0:
				    //$("#popup_alert .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">邀请失败！</b><label class="color_666">职位邀请<b class="inline_bk mg_r_10">'+data.inviteComCount+'</b> 剩余邀请数<b>'+data.remainInvite+'</b></label></span>');
					//$("#popup_alert .popup_con .tips_btn").html('<a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick=\'$.closePopupLayer("popup_alert");\'>关闭</a>');
					//openPopup("380", "popup_alert");
					openCloseTips('uncurrent_b_icon', '邀请失败', 'color_red', '280');
				break;
				case 3:
				    $("#popup_alert .popup_con .tips").html('<i class="icon warn_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_666 mg_r_10">职位邀请数为 0,请去广告刊例中购买！</b></span>');
				    $("#popup_alert .popup_con .tips_btn").html('<a class="yellow_btn v_m mg_r_20" href="' + domain + '/company/advertisement#buy">购买</a><a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick=\'$.closePopupLayer("popup_alert");\'>关闭</a>');
					openPopup("380","popup_alert");
				break;
				case 2:
				    //$("#popup_alert .popup_con .tips").html('<i class="icon warn_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_666 mg_r_10">该职位已邀请该用户！</b><label class="color_666">职位邀请<b class="inline_bk mg_r_10">'+data.inviteComCount+'</b>  剩余邀请数<b>'+data.remainInvite+'</b></label></span>');
					//$("#popup_alert .popup_con .tips_btn").html('<a class="cancel_attention_btn v_m" href="javascript:void(0);" onclick=\'$.closePopupLayer("popup_alert");\'>关闭</a>');
					//openPopup("380", "popup_alert");
				    openCloseTips('warn_icon', '该职位已邀请该用户', 'color_666', '280');
				break;
			}
		},"json");
	},
	jobInvite:function(jaId,conId,userId,response){
		if(jaId==''||conId==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var data  = {datas:{conId:conId,jaId:jaId,response:response},remUserId:userId}
		$.post(domain+"/datas/updateInvite",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('uncurrent_b_icon', '操作失败', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('success_icon', '操作成功', 'color_green', '280');
					switch(response){
						case 5:
							$("#manage_job_"+jaId).addClass("bg_green");
							$("#manage_job_"+jaId+" .loose_right").html('<p class="pd_t_10"><i class="icon correct_icon mg_r_5"></i><span class="v_m inline_bk mg_r_10 color_green">您已接受</span></p>');
						break;
						case 1:
							$("#manage_job_"+jaId).addClass("bg_f6");
							$("#manage_job_"+jaId+" .loose_right").html('<p class="pd_t_10"> <i class="icon disabled_icon mg_r_5"></i><a class="inline_bk mg_r_10 color_999">你已拒绝</a></p>');
						break;
						case 2:
							$("#manage_job_"+jaId).addClass("bg_pink");
							$("#manage_job_"+jaId+" .loose_right").html('<p class="pd_t_10"><i class="icon tips_yellow_icon mg_r_5"></i><span class="v_m inline_bk mg_r_10 color_999">考虑中...</span></p>');
						break;
						case 3:
							$("#manage_job_"+jaId+" .loose_right").html('<p class="pd_t_10"><i class="icon correct_icon mg_r_5"></i><span class="v_m inline_bk mg_r_10 color_green">第二次邀请</span><span><i class="icon time_icon mg_r_5"></i><em>等待对方应答...</em></span></p>');
						break;
					}
				break;
			}
		},"json");
	},
	jobApply:function(jaId,conId,userId,response){
		if(jaId==''||conId==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		var data  = {datas:{conId:conId,jaId:jaId,response:response},remUserId:userId}
		$.post(domain+"/datas/updateApply",data,function(data){
			switch(data.isSuccess){
			    case 0:
			        openCloseTips('uncurrent_b_icon', '操作失败', 'color_red', '280');
				break;
				case 1:
					switch(response){
						case 5:
							$("#manage_job_"+jaId+" .apply_status").html('<p class="pd_t_45"><i class="icon correct_icon mg_r_5"></i><span class="v_m inline_bk mg_r_10 color_green">您已接受</span></p>');
						break;
						case 1:
							$("#manage_job_"+jaId+" .apply_status").html('<p class="pd_t_45"> <i class="icon disabled_icon mg_r_5"></i><a class="inline_bk mg_r_10 color_999">你已直言拒绝</a></p>');
							$("#manage_job_" + jaId + " .scan_resume_box").html('');
						break;
						case 2:
							$("#manage_job_"+jaId+" .apply_status").html('<p class="pd_t_45"><i class="icon time_icon mg_r_5"></i><span class="v_m inline_bk mg_r_10 color_999">等待对方完善简历</span></p>');
						break;
						case 3:
							$("#manage_job_"+jaId).addClass("bg_pink");
							$("#manage_job_"+jaId+" .loose_right").html('<p class="pd_t_10"><i class="icon correct_icon mg_r_5"></i><span class="v_m inline_bk mg_r_10 color_green">第二次申请</span><span><i class="icon time_icon mg_r_5"></i><em>等待对方应答...</em></span></p>');
						break;
					}
				break;
			}
		},"json");
	},	
	jobMark:function(jaId,conId){
		if(jaId==''||conId==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400","popup_login");
			return false;
		}
		if($("#manage_job_"+jaId).hasClass("bg_pink")){ var mark = 0;}else{ var mark = 1;}
		var data  = {datas:{conId:conId,jaId:jaId,mark:mark}}
		$.post(domain+"/datas/updateMark",data,function(data){
			switch(data.isSuccess){
			    case 0:
			        openCloseTips('uncurrent_b_icon', '操作失败', 'color_red', '280');
				break;
				case 1:
					switch(mark){
						case 0:
							$("#manage_job_"+jaId).removeClass("bg_pink");
							$("#manage_job_"+jaId+" .red_flag_icon").addClass("grey_flag_icon").removeClass("red_flag_icon");
						break;
						case 1:
							$("#manage_job_"+jaId).addClass("bg_pink");
							$("#manage_job_"+jaId+" .grey_flag_icon").addClass("red_flag_icon").removeClass("grey_flag_icon");
						break;
					}
				break;
			}
		},"json");
	}
}
talent = {
	addTalent:function(id){
		if(id==''){return false;}
		var data = {datas:{userId:id}}
		$.post(domain+"/datas/addTalent",data,function(data){
			switch(data.isSuccess){
				case 1:
					$("#popup_talent .popup_con .tips").html('<i class="icon success_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_green mg_r_10">收藏成功！</b><label class="color_666">人才库 <b class="inline_bk mg_r_10">'+data.talentsCount+'</b></label></span>');
					openPopup("380","popup_talent");
				break;
				case 0:
					//$("#popup_talent .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">收藏失败！</b><label class="color_666">人才库<b class="inline_bk mg_r_10">'+data.talentsCount+'</b></label></span>');
				    //openPopup("380","popup_talent");
				    openCloseTips('uncurrent_b_icon', '收藏失败', 'color_red', '280');
				break;
				case 2:
					//$("#popup_talent .popup_con .tips").html('<i class="icon warn_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_666 mg_r_10">已收藏该人才！</b><label class="color_666">人才库<b class="inline_bk mg_r_10">'+data.talentsCount+'</b></label></span>');
					//openPopup("380", "popup_talent");
				    openCloseTips('warn_icon', '已收藏该人才', 'color_666', '280');
				break;
			}
		},"json");
	},
	delTalent: function (editId) {
	    if (editId == '') { return false; };
	    var data = { datas: { taId: editId } };
	    $.post(domain + "/datas/delTalent", data, function (data) {
	        switch (data.isSuccess) {
	            case 0:
	                openCloseTips('uncurrent_b_icon', '删除人才失败', 'color_red', '280');
	                break;
	            case 1:
	                //openCloseTips('success_icon', '删除人才成功', 'color_green', '280');
	                //location.reload();
	                closeDel('deltal_' + editId);
	                $("#talent_" + editId).slideUp();
	                break;
	        }
	    }, "json");
	}//end delete user award
}
jobManage = {
	offshelf:function(id){
		if(id==''){return false;}
		var data = {jobId:id}
		$.post(domain+"/datas/jobOffshelf",data,function(data){
			switch(data.isSuccess){
			    case 1:
			        closeCancel(id);
			        $('#vacancy_li_' + id).slideUp(300);
				break;
				case 0:
				    $("#tip_" + id).slideDown().removeClass('tip_act');
				    disTime('#tip_' + id);
				break;
			}
		},"json");
	}
}
feedback = {
    advise: function () {
        var content = $("#feedback_content").val();
		if(content==''){
			$("#feedback_content").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#feedback_content").animate({
				backgroundColor:"#ffffff"
			}, 100);
			$("#feedback_content").animate({
				backgroundColor:"#FF3F6E"
			}, 100);
			$("#feedback_content").animate({
				backgroundColor:"#ffffff"
			}, 100);
			return false;
		}
		var attachment = $("#feedback_pic").val();
		var data = {datas:{content:content,attachment:attachment}};
		$.post(domain + "/datas/advise",data,function(data) {
			switch (data.isSuccess) {
			    case 0:
					openCloseTips('uncurrent_b_icon', '提交失败，稍后重试', 'color_red', '280');
				break
			    case 1:
					openCloseTips('success_icon', '提交成功,非常感谢', 'color_green', '320');
					$("#feedback_content").val("");
					$("#feedback_pic").val(0);
					$('#feedback_pic').parent('.upload_attach_box').show();
            		$('#feedback_pic').parent('.upload_attach_box').next('.delete_attach_box').html("");
				break;
			    case 2:
					openCloseTips('warn_icon', '您今天已经给我们提了好多建议，明天再来吧', 'color_666', '420');
					$("#feedback_content").val("");
					$("#feedback_pic").val(0);
					$('#feedback_pic').parent('.upload_attach_box').show();
            		$('#feedback_pic').parent('.upload_attach_box').next('.delete_attach_box').html("");
				break
			}
		}, "json");
	}
}
