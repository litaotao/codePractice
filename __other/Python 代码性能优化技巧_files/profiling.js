/* $Id$ 
 * Owner		: jschaffe@us.ibm.com, Developer: logangir@in.ibm.com,jatrejo@mx1.ibm.com
 * Version 		: 1.0
 * Date			: 08/09/2013
 * Descripition	:This files is intended to provide the implicit and explicit profiling feature to the external pages.
 */
dojo.provide('ibmweb.profiling');
dojo.require("dojo.cookie");
dojo.require("dojo.io.script");

//These two global variables are declated as the anonymous user profile response is throwing error{result:success},the value success is not wrapped in 
var success="success";
var failure="failure";
/**
 *The anonymous function which contains the explicit and implicit json objects
 */
(function() {
	/**
	 * The callback function mentioned in the blackwhitelist_json file which is deployed in the EI environment
	 */
	ibmweb.data.profiling={
		list:function(data){
			ibmweb.profiling.filter.processList(data);
		}
	},
	/**
	 * The DC.Subject is checked against the filter.The DC.Subject should not be present in the blacklist
	 * and should be there in the white list.The filter check is made against the widlcard entries too. 
	 */
	ibmweb.profiling.filter={
			dcsubjectArr:[],
			result:false,
			interestList:[],
			/**
			 * The  dc subject code is verified against the black and white list json objects are verified. 
			 */
			processList:function(data){				
				
				var createRegExp = function(element) {
					return element.replace(/\*/g, ".*");
				};					
				var whiteList = dojo.map(data.whitelist, createRegExp);
				var blackList = dojo.map(data.blacklist, createRegExp);				
				/*
				 * Element should pass at least one element in the white list 
				 * and should not be present in the black list.
				 */
			//	var dcsubjectArr=[ibmweb.meta.dc_subject];
				ibmweb.profiling.filter.dcsubjectArr=ibmweb.meta.dc_subject.split(",");
				if(ibmweb.profiling.filter.dcsubjectArr.length>0){
					dojo.forEach(ibmweb.profiling.filter.dcsubjectArr, function(value) {
						var result=true;
						value=value.trim();
						var whitePassed = dojo.some(whiteList, function(whiteElement) {
							var pattern = new RegExp(whiteElement, "i");
							return pattern.test(value);
						});	
						var blackPassed = dojo.every(blackList, function(blackElement) {
							var pattern = new RegExp(blackElement, "i");
							return !pattern.test(value);
						});	
						
						if (!whitePassed&&!blackPassed){
							console.log(value+": found in the black list.");
							result=false;
						}
						ibmweb.data.profiling.result=result;
						if(result){
							ibmweb.profiling.filter.interestList.push(value);
							//Calling Implicit profiling 					 
							ibmweb.profiling.implicitprofiling.processImplicitProfiling(value);					
						}else{/*if not passed the list*/}
						
					});
				}
			}			
	},
	/** 
	 * Creates an anonymous profile.
	 * 
	 */
	ibmweb.profiling.createanonymousprofile=function(callback,value){
		/**
		 * Call the anonymous profile creation service that creates the anonymous profile cookie
		 * Will use a callback function with dojo.io.script.get once the service response JSON error is fixed and
		 * callback is supported.
		 * 
		 */
		dojo.require("dojo.io.script");
		//dojo.require("dojo.io.iframe");
		dojo.ready(function(){
			try{
				dojo.io.script.get({
				//dojo.io.iframe.send({
					url:ibmweb.config.idm.profiling.anonymousurl,
					handleAs:"text",
					load:function(){					
						if(typeof dojo.cookie("IBMISP")!="undefined"){
							setTimeout(callback(value),500);
						}				
					},
					error:function(){
						if(typeof dojo.cookie("IBMISP")!="undefined"){
							setTimeout(callback(value),500);
						}
						console.log("anonymous service is providing wrong response");
					}
				});
			}catch(error){
				console.log("anonymous service is providing wrong response");							
			}				
		});	
	},		
	/**
	 * Implicit Profiling object
	 */
	ibmweb.profiling.implicitprofiling = {
		/**
		 * Process the implicit profiling 
		 * 
		 */
		processImplicitProfiling:function(value){	
			if(ibmweb.data.profiling.result){
				/**
				 * Check for IBMSIP cookie if not present create anonymous profile
				 */	
				if(typeof dojo.cookie("IBMISP")!="undefined"){
					ibmweb.profiling.implicitprofiling.incrementInterst(value);				
				}else{					
					ibmweb.profiling.createanonymousprofile(ibmweb.profiling.implicitprofiling.incrementInterst,value);
				}	 
			}else{}
		 },
		 /**
		  * 
		  * The increment interest service call will be made by passing the dcsubject code and profile id
		  */
		 incrementInterst: function(value){
			var profileid=dojo.cookie("IBMISP").split("-")[0];
			ibmweb.config.idm.profiling.expliciturl=ibmweb.config.idm.profiling.expliciturl.replace("{INPUT_profile_id}",profileid);				
			//var impliciturl=ibmweb.config.idm.profiling.expliciturl+"increment/{interest_code}/page_views/?cb=208:ibmweb.profiling.implicitprofiling.pageviewcallback&format=json&cc=us&lc=en";
			var impliciturl=ibmweb.config.idm.profiling.expliciturl+"increment/{interest_code}/4/?cb=208:ibmweb.profiling.implicitprofiling.pageviewcallback&format=json&cc=us&lc=en";
			impliciturl=impliciturl.replace("{interest_code}",value);			
			try{
			dojo.io.script.get({
				url:impliciturl,
				content:{					
					format:"json"
				},
				load:function(){
				},
				error:function(){
				},
				preventCache:true				
			});	
			}catch(error){
				
			
			}
			//Disabling the Explicit profiling
			//ibmweb.profiling.explicitprofiling.processExplicitProfiling(value);
		 },
		 /**
		  * An empty callback function for increment service call as the service expects  a mandatory callback
		  * function to be specified.
		  */
		 pageviewcallback:function(){}		 
	},
	/**
	 * The json object that handles the explicit profiling.
	 */
	ibmweb.profiling.explicitprofiling = {
		/**
		 * This function is required only for testing purpose ,once the images are created by 17 team,we don't require this
		 */		
		addimage:function(){
			dojo.ready(function(){
				ibmweb.queue.push(function(){
					if(dojo.byId('ibm-social-tools')){
						return true;
					}else{
						return false;
					}
				},function(){
					dojo.place('<li><a id="addexplicit" style="display:none" class="ibm-add1-link" href="#"></a></li>',dojo.query("ul","ibm-social-tools")[0]);
					dojo.place('<li><a id="removeexplicit" style="display:none" class="ibm-delete-link" href="#"></a></li>',dojo.query("ul","ibm-social-tools")[0]);					
				});
			});			
		},
		/**
		 * handles the explicit profiling functionality like attaching events,and service calls 
		 */
		processExplicitProfiling:function(value){
			/**check if the sbs settings is disabled by the page owner,explicit profiling will work only
			* only if it is enabled. 
			*/
			if(ibmweb.config.sbs.enabled){
				/**
				 * The below  line of code should be commented out once the v17 team creates the add and 
				 * delete interest icons. 
				 */
				ibmweb.profiling.explicitprofiling.addimage();		
				/**
				 * Check for IBMSIP cookie if not present create anonymous profile
				 */	
				if(typeof dojo.cookie("IBMISP")!="undefined"){
					ibmweb.profiling.explicitprofiling.displayExplicitProfiling(value);				
				}else{
					ibmweb.profiling.createanonymousprofile(ibmweb.profiling.explicitprofiling.displayExplicitProfiling,value);					
				}
		     }
		},
		/**
		 * The interest code value service is called passing the profile id and dcsubject code.  
		 */
		displayExplicitProfiling:function(value){						
			 // Replace the service URL with the respective value of IBMISP cookie login id and 
			var profileid=dojo.cookie("IBMISP").split("-")[0];
			ibmweb.config.idm.profiling.expliciturl=ibmweb.config.idm.profiling.expliciturl.replace("{INPUT_profile_id}",profileid);			
		//	var expliciturl=ibmweb.config.idm.profiling.expliciturl+"by_code_source/{interest_code}/aggregate/?cb=208:ibmweb.profiling.explicitprofiling.getValueCode&format=json&cc=us&lc=en";					
			var expliciturl=ibmweb.config.idm.profiling.expliciturl+"by_code_source/{interest_code}/0/?cb=207:ibmweb.profiling.explicitprofiling.getValueCode&format=json&cc=us&lc=en";
			expliciturl=expliciturl.replace("{interest_code}",value);		
			dojo.io.script.get({
				url:expliciturl,
				content:{
					//callback:"ibmweb.profiling.explicitprofiling.getValueCode",
					format:"json"
				},
				preventCache:true				
			});			
		},
		widgetsConnect:false,
		/**
		 * The callback function that gets invoked when interest code service is called.
		 * 
		 */
		getValueCode:function(data){			
			console.log(data);
			var interestvalue="";			
			var profileid=dojo.cookie("IBMISP").split("-")[0];
			// verify if the serive respone has interest code value information or not
			if(typeof data!="undefined"&&typeof data[profileid]!="undefined"&&typeof data[profileid].common_profile!="undefined"&&
			  typeof data[profileid].common_profile.profile!="undefined"){
				var profile=data[profileid].common_profile.profile;
				if(typeof profile.interests!="undefined"){
					var interests=profile.interests;
					if(typeof interests.interest!="undefined"){
						if(typeof interests.interest.value_code!="undefined"){
							if(interestvalue<=999){
								interestvalue=interests.interest.value_code;
							}
						}
					}
				}								
			}else{				
				console.log("Error in R/W service returning interest or interest json is empty");
			}
			if(interestvalue==""||interestvalue<999){
				dojo.style("addexplicit","display","block");
			}else{
				dojo.style("removeexplicit","display","block");
			}
			if(!ibmweb.profiling.explicitprofiling.widgetsConnect){
				ibmweb.profiling.explicitprofiling.widgetsConnect=true;
				ibmweb.profiling.explicitprofiling.connectWidgets();
			}
		},
		/**
		  * An empty callback function for add interest service call as the service expects  a mandatory callback
		  * function to be specified.
		  */
		addInterestCallBack:function(){},
		/**
		  * An empty callback function for remove interest service call as the service expects  a mandatory callback
		  * function to be specified.
		  */
		removeInterestCallBack:function(){},
		/**
		 * Add interest call is made for all the dcsubject codes.
		 */
		addinterestcall:function(){
			dojo.forEach(ibmweb.profiling.filter.interestList,function(interestcode){
				//var addinteresturl=ibmweb.config.idm.profiling.expliciturl+"add/{interest_code}/online/?cb=208:ibmweb.profiling.explicitprofiling.addInterestCallBack&cc=us&lc=en&format=json";
				var addinteresturl=ibmweb.config.idm.profiling.expliciturl+"add/{interest_code}/1/?cb=208:ibmweb.profiling.explicitprofiling.addInterestCallBack&cc=us&lc=en&format=json";
				addinteresturl=addinteresturl.replace("{interest_code}",interestcode);
				dojo.io.script.get({
					url:addinteresturl			
				});	
		    });
		},
		/**
		 * Remove interest call is made for all the dcsubject codes. 
		 */
		removeinterestcall:function(){
			dojo.forEach(ibmweb.profiling.filter.interestList,function(interestcode){
				//var removeinteresturl=ibmweb.config.idm.profiling.expliciturl+"remove/{interest_code}/online/?cb=208:ibmweb.profiling.explicitprofiling.removeInterestCallBack&cc=us&lc=en&format=json";
				var removeinteresturl=ibmweb.config.idm.profiling.expliciturl+"remove/{interest_code}/1/?cb=208:ibmweb.profiling.explicitprofiling.removeInterestCallBack&cc=us&lc=en&format=json";
				removeinteresturl=removeinteresturl.replace("{interest_code}",interestcode);						
				dojo.io.script.get({						
					url:removeinteresturl			
				});
			});			
		},
		/**
		 * Attaches the onclick event over the add interest icons and remove interest icons and the corresponding 
		 * service calls are made accordingly when user click on them on the floating page tool columns(sbs icons)
		 */
		connectWidgets:function(){			
			/*
			 * Attaches the onclick  event for add interest icons
			 */
			dojo.connect(dojo.byId("addexplicit"),"onclick",function(evt){
				if(evt.target.id=="addexplicit"){
					dojo.stopEvent(evt);
					ibmweb.profiling.explicitprofiling.addinterestcall();									
					dojo.style("removeexplicit","display","block");
					dojo.style("addexplicit","display","none");
				}
			});
			/*
			 * Attaches the onclick  event for remove interest icons
			 */
			dojo.connect(dojo.byId("removeexplicit"),"onclick",function(evt){
				if(evt.target.id=="removeexplicit"){
					dojo.stopEvent(evt);			
					ibmweb.profiling.explicitprofiling.removeinterestcall();
					dojo.style("addexplicit","display","block");
					dojo.style("removeexplicit","display","none");	
				}
			});						
		},				
		/**
		 * Loads the white and black lists of Interests.
		 */
		loadFilterJSON:function(){		
			if(typeof ibmweb.meta.dc_subject!="undefined"&&ibmweb.meta.dc_subject!=""){
				dojo.io.script.get({url:ibmweb.config.idm.profiling.filter}); 	
			}
		}
	};		
	ibmweb.profiling.explicitprofiling.loadFilterJSON();
})();