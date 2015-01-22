var LS={
    item : function(name,value){
        var val = null;
        if(LS.isSupportLocalStorage()){
			if(value !== undefined && value !== null){
                localStorage.setItem(name,value);
                val = value;
            }else{
                val = localStorage.getItem(name);
            }
        }else{
            if(value !== undefined && value !== null){
				UserData.save(name,value);
				val=value;
			}else{
				val=UserData.load(name);
			}
        }
        return val;
    },
    removeItem : function(name){
        if(LS.isSupportLocalStorage()){
            localStorage.removeItem(name);
        }else{
            UserData.remove(name);
        }
        return true;
    },
    isSupportLocalStorage : function(){
        var ls = LS,is = ls.IS_HAS_LOCAL_STORAGE;
        if(is == null){
            if(window.localStorage){
                is =ls.IS_HAS_LOCAL_STORAGE =true;
            }
        }
        return is;
    },
    IS_HAS_LOCAL_STORAGE : null
};


//UserData方法
var UserData = {
    // 定义userdata对象
    o : null,
    // 设置文件过期时间
    defExps : 365,
    // 初始化userdate对象
    init : function(){
        if(!UserData.o){
           try{
                UserData.o = document.createElement('input');
                UserData.o.type = "hidden";
                //UserData.o.style.behavior = "url('#default#userData')" ;
                UserData.o.addBehavior ("#default#userData");
                document.body.appendChild(UserData.o);
            }catch(e){
                return false;
            }
        };
        return true;
    },
    // 保存文件到userdata文件夹中 f-文件名，c-文件内容，e-过期时间
    save : function(f, c, e){
        if(UserData.init()){
            var o = UserData.o;     
            // 保持对象的一致
            o.load(f);  
            // 将传入的内容当作属性存储
            if(c) o.setAttribute("code", c);    
            // 设置文件过期时间
            var d = new Date(), e = (arguments.length == 3) ? e : UserData.defExps;
            d.setDate(d.getDate()+e);
            o.expires = d.toUTCString();       
            // 存储为制定的文件名
            o.save(f);
        }
    },
    // 从uerdata文件夹中读取指定文件，并以字符串形式返回。f-文件名
    load : function(f){
        if(UserData.init()){
            var o = UserData.o;
            // 读取文件
            o.load(f);      
            // 返回文件内容
            return o.getAttribute("code");
        }
    },
    // 检查userdata文件是否存在 f-文件名
    exist : function(f){
        return UserData.load(f) != null;
    },
    // 删除userdata文件夹中的指定文件 f-文件名
    remove : function(f){
        UserData.save(f, false, -UserData.defExps);
    }
    // UserData函数定义结束
}; 